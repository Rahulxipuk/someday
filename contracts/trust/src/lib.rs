//! One Someday trust: a keyless NEAR account that is an NFT.
//!
//! The account holds and stakes its own money and keeps the creator's sealed wishes and letters in
//! its own state. Its holder cannot withdraw. The holder asks, a pinned program in an OutLayer
//! enclave decides, and this contract pays only what the rails allow.
//!
//! The trustee is never trusted with the money. Every number it returns is clamped here, so a
//! fooled or fully compromised trustee is bounded by `worst_case()`.

use near_sdk::json_types::{Base64VecU8, U128, U64};
use near_sdk::store::{LazyOption, Vector};
use near_sdk::{
    env, ext_contract, near, require, AccountId, BorshStorageKey, CryptoHash, Gas, NearToken,
    PanicOnDefault, Promise, PromiseError,
};
use serde_json::json;
use someday_shared::{
    Card, ItemStatus, LetterInput, NftItemInfo, Rails, TransferPolicy, TrustTerms, TrusteeConfig,
    ITEM_SPEC, MAX_LETTER, MAX_LETTERS, MAX_TITLE, MAX_WISHES,
};

const MAX_MESSAGE: usize = 2_048;
const MAX_REPLY: usize = 1_400;
const MAX_SAID: usize = 500;
const MAX_MEMO: usize = 1_500;
const MAX_OPENED_LETTER: usize = 5_400;
const MAX_OUTPUT: usize = 12_288;
const MAX_DECISIONS: u32 = 32;

/// Spare bytes kept funded so a decision can always be recorded. A callback that cannot pay for its
/// own state would fail and leave the trust stuck, so this covers the largest possible decision: a
/// reply, a public message, a memo and an opened letter, plus the record around them.
const STORAGE_PAD_BYTES: u128 = 10_000;
/// A decision or pool move older than this was lost. The trust must never stay stuck behind one.
const STALE_NS: u64 = 30 * 60 * 1_000_000_000;
const MIN_POOL_MOVE: u128 = 500_000_000_000_000_000_000_000; // 0.5 NEAR

const GAS_POOL_VIEW: Gas = Gas::from_tgas(10);
const GAS_POOL_MOVE: Gas = Gas::from_tgas(75);
const GAS_ON_MOVE: Gas = Gas::from_tgas(10);
const GAS_ON_POOL: Gas = Gas::from_tgas(100);
const GAS_ON_DECISION: Gas = Gas::from_tgas(70);
const GAS_ON_PAYOUT: Gas = Gas::from_tgas(8);
const GAS_PUSH_CARD: Gas = Gas::from_tgas(8);
const GAS_REQUEST_EXECUTION: Gas = Gas::from_tgas(100);

#[derive(BorshStorageKey)]
#[near]
enum Key {
    Wishes,
    Memo,
    Letters,
    Decisions,
    Holders,
}

#[near(serializers = [borsh, json])]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Stage {
    Live,
    Matured,
}

#[near(serializers = [borsh, json])]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum RequestKind {
    /// Ask for a distribution, or just talk (amount 0).
    Ask,
    /// Claim that a sealed letter's milestone has been reached.
    Milestone { index: u32 },
}

#[near(serializers = [borsh, json])]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Outcome {
    /// Paid what the trustee decided.
    Approved,
    /// The trustee approved, and the rails reduced the amount.
    Clamped,
    Refused,
    NeedsMore,
    /// The holder changed while the trustee was deciding, so the decision died with them.
    Voided,
    /// The enclave did not answer. Nothing moved.
    NoAnswer,
    /// Payment bounced. The money stayed in the trust.
    PayoutFailed,
}

#[near(serializers = [json])]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
#[serde(rename_all = "lowercase")]
pub enum Verdict {
    Approve,
    Refuse,
    More,
}

/// The shape the trustee must print. Anything else is treated as no answer.
#[near(serializers = [json])]
#[derive(Clone, Debug)]
pub struct TrusteeOutput {
    pub trust: AccountId,
    pub id: U64,
    pub verdict: Verdict,
    pub amount: U128,
    pub reason: u8,
    pub reply: String,
    pub memo: Option<Base64VecU8>,
    pub letter: Option<String>,
}

#[near(serializers = [borsh, json])]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Pending {
    pub id: U64,
    pub holder: AccountId,
    pub rotation_seq: U64,
    pub kind: RequestKind,
    pub asked: U128,
    pub payee: AccountId,
    pub category: u8,
    pub said: Option<String>,
    pub at_ns: U64,
}

#[near(serializers = [borsh, json])]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Decision {
    pub id: U64,
    pub at_ns: U64,
    pub holder: AccountId,
    pub rotation_seq: U64,
    pub kind: RequestKind,
    pub asked: U128,
    /// What the trustee wanted to give.
    pub decided: U128,
    /// What the contract actually paid.
    pub granted: U128,
    pub payee: AccountId,
    pub category: u8,
    pub outcome: Outcome,
    pub reason: u8,
    pub reply: Option<String>,
    /// Public trusts only: what the person said.
    pub said: Option<String>,
}

#[near(serializers = [borsh, json])]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct HolderRecord {
    pub holder: AccountId,
    pub from_ns: U64,
    pub to_ns: Option<U64>,
    pub received: U128,
}

#[near(serializers = [borsh])]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Letter {
    pub title: String,
    pub gift: U128,
    pub cipher: Vec<u8>,
    pub opened: Option<String>,
}

#[near(serializers = [json])]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct LetterView {
    pub index: u32,
    pub title: String,
    pub gift: U128,
    pub is_open: bool,
    /// Encrypted to the holder who opened it. Plain text in a public trust.
    pub opened: Option<String>,
}

/// The money, in plain terms. `yield_earned` comes from the pool alone, so a refund from the
/// enclave can never be mistaken for income.
#[near(serializers = [json])]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Money {
    pub deposits: U128,
    pub liquid: U128,
    pub in_pool: U128,
    pub assets: U128,
    pub spendable: U128,
    pub distributed: U128,
    pub yield_earned: U128,
    pub fees_paid: U128,
    pub pool: AccountId,
    pub pool_synced_ns: U64,
}

/// The most this trust can lose, whatever the trustee does. Printed on the page and on the NFT.
#[near(serializers = [json])]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct WorstCase {
    pub per_period: U128,
    pub period_ns: U64,
    pub one_time_gifts: U128,
    pub floor: U128,
    pub matures_at_ns: U64,
    /// `min(spendable, periods left * per_period + gifts)`.
    pub until_maturity: U128,
}

#[near(serializers = [json])]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Overview {
    pub title: String,
    pub collection: AccountId,
    pub creator: AccountId,
    pub holder: AccountId,
    pub rotation_seq: U64,
    pub payout_nonce: U64,
    pub stage: Stage,
    pub created_ns: U64,
    pub transfer: TransferPolicy,
    pub public_room: bool,
    pub rails: Rails,
    pub trustee: TrusteeConfig,
    pub wishes_sha256: String,
    pub pending: Option<Pending>,
    pub window_spent: U128,
    pub window_requests: u32,
    pub window_ends_ns: U64,
    pub next_request_ns: U64,
    pub blocked: Option<String>,
    pub counts: Counts,
    pub money: Money,
    pub worst_case: WorstCase,
}

#[near(serializers = [borsh, json])]
#[derive(Clone, Debug, PartialEq, Eq, Default)]
pub struct Counts {
    pub approved: u32,
    pub refused: u32,
    pub needs_more: u32,
    pub voided: u32,
    pub unanswered: u32,
}

#[near(serializers = [json])]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct PoolAccount {
    pub account_id: AccountId,
    pub unstaked_balance: U128,
    pub staked_balance: U128,
    pub can_withdraw: bool,
}

#[near(event_json(standard = "someday"))]
pub enum Event {
    #[event_version("1.0.0")]
    RequestReceived { id: U64, holder: AccountId, kind: RequestKind, asked: U128, payee: AccountId },
    #[event_version("1.0.0")]
    DecisionMade {
        id: U64,
        holder: AccountId,
        outcome: Outcome,
        reason: u8,
        decided: U128,
        granted: U128,
        payee: AccountId,
    },
    #[event_version("1.0.0")]
    PayoutFailed { id: U64, amount: U128, payee: AccountId },
    #[event_version("1.0.0")]
    LetterOpened { index: u32, holder: AccountId },
    #[event_version("1.0.0")]
    HolderRotated { from: AccountId, to: AccountId, rotation_seq: U64 },
    #[event_version("1.0.0")]
    Contributed { from: AccountId, amount: U128 },
    #[event_version("1.0.0")]
    Staked { amount: U128, pool: AccountId },
    #[event_version("1.0.0")]
    Unstaking { amount: U128, pool: AccountId },
    #[event_version("1.0.0")]
    Withdrawn { amount: U128, pool: AccountId },
    #[event_version("1.0.0")]
    Matured { holder: AccountId },
    #[event_version("1.0.0")]
    Claimed { holder: AccountId, amount: U128 },
}

#[ext_contract(ext_outlayer)]
pub trait OutLayer {
    fn request_execution(
        &mut self,
        source: serde_json::Value,
        resource_limits: Option<serde_json::Value>,
        input_data: Option<String>,
        secrets_ref: Option<serde_json::Value>,
        response_format: Option<String>,
        payer_account_id: Option<AccountId>,
    );
}

#[ext_contract(ext_pool)]
pub trait StakingPool {
    fn get_account(&self, account_id: AccountId) -> PoolAccount;
    fn deposit_and_stake(&mut self);
    fn unstake(&mut self, amount: U128);
    fn unstake_all(&mut self);
    fn withdraw_all(&mut self);
}

#[ext_contract(ext_collection)]
pub trait Collection {
    fn push_card(&mut self, card: Card);
}

/// Why a request would be refused right now. The only source of both `request`'s refusal and
/// `nft_item_info().status`, so the status can never claim `Active` while requests are refused.
struct Block {
    status: ItemStatus,
    why: &'static str,
}

#[near(contract_state)]
#[derive(PanicOnDefault)]
pub struct Trust {
    collection: AccountId,
    creator: AccountId,
    title: String,
    created_ns: u64,
    maturity_ns: u64,
    transfer: TransferPolicy,
    public_room: bool,
    rails: Rails,
    trustee: TrusteeConfig,

    holder: AccountId,
    rotation_seq: u64,
    /// Bumped by every payout, so a buyer can bind a purchase to the state they checked.
    payout_nonce: u64,
    stage: Stage,

    deposits: u128,
    distributed: u128,
    pool: AccountId,
    liquid_target: u128,
    staked_in: u128,
    unstaked_out: u128,
    pool_total: u128,
    pool_unstaked: u128,
    pool_can_withdraw: bool,
    pool_synced_ns: u64,
    /// When the current pool move began, or zero.
    pool_busy_ns: u64,

    wishes: LazyOption<Vec<u8>>,
    wishes_sha256: Vec<u8>,
    /// The trustee's own notes, sealed. Wiped when the holder changes.
    memo: LazyOption<Vec<u8>>,
    letters: Vector<Letter>,

    window_start_ns: u64,
    window_spent: u128,
    window_requests: u32,
    last_request_ns: u64,

    next_id: u64,
    pending: Option<Pending>,
    /// A ring of the latest decisions. Older ones remain in the event log.
    decisions: Vector<Decision>,
    counts: Counts,
    holders: Vector<HolderRecord>,
}

/// The collection is the account's parent. Taken from the name, not from an argument: on NEAR only
/// a parent can create its sub-accounts, so this cannot be forged.
fn parent_of(id: &AccountId) -> AccountId {
    let s = id.as_str();
    let dot = s.find('.').unwrap_or_else(|| env::panic_str("a trust must be a sub-account"));
    s[dot + 1..].parse().unwrap()
}

fn yocto(n: u128) -> NearToken {
    NearToken::from_yoctonear(n)
}

#[near]
impl Trust {
    #[init]
    pub fn init(
        creator: AccountId,
        deposit: U128,
        terms: TrustTerms,
        trustee: TrusteeConfig,
    ) -> Self {
        let me = env::current_account_id();
        let collection = parent_of(&me);
        require!(
            env::predecessor_account_id() == collection,
            "only the collection can create a trust"
        );
        validate_terms(&terms);

        let now = env::block_timestamp();
        let mut letters = Vector::new(Key::Letters);
        let mut reserved_bytes: u128 = 4_000 + terms.wishes.0.len() as u128;
        for l in &terms.letters {
            reserved_bytes += l.title.len() as u128 + l.cipher.0.len() as u128 + 100;
            letters.push(Letter {
                title: l.title.clone(),
                gift: l.gift,
                cipher: l.cipher.0.clone(),
                opened: None,
            });
        }

        let mut holders = Vector::new(Key::Holders);
        holders.push(HolderRecord {
            holder: terms.holder.clone(),
            from_ns: U64(now),
            to_ns: None,
            received: U128(0),
        });

        let mut this = Self {
            collection,
            creator,
            title: terms.title,
            created_ns: now,
            maturity_ns: terms.maturity_ns.0,
            transfer: terms.transfer,
            public_room: terms.public_room,
            rails: terms.rails,
            trustee,
            holder: terms.holder,
            rotation_seq: 0,
            payout_nonce: 0,
            stage: Stage::Live,
            deposits: deposit.0,
            distributed: 0,
            pool: terms.pool,
            liquid_target: terms.liquid_target.0,
            staked_in: 0,
            unstaked_out: 0,
            pool_total: 0,
            pool_unstaked: 0,
            pool_can_withdraw: false,
            pool_synced_ns: now,
            pool_busy_ns: 0,
            wishes_sha256: env::sha256(&terms.wishes.0),
            wishes: LazyOption::new(Key::Wishes, Some(terms.wishes.0)),
            memo: LazyOption::new(Key::Memo, None),
            letters,
            window_start_ns: now,
            window_spent: 0,
            window_requests: 0,
            last_request_ns: 0,
            next_id: 1,
            pending: None,
            decisions: Vector::new(Key::Decisions),
            counts: Counts::default(),
            holders,
        };

        let storage = (env::storage_usage() as u128 + reserved_bytes + STORAGE_PAD_BYTES)
            * env::storage_byte_cost().as_yoctonear();
        let to_stake = deposit.0.saturating_sub(storage).saturating_sub(this.liquid_target);
        if to_stake >= MIN_POOL_MOVE {
            this.pool_busy_ns = now;
            this.stake(to_stake);
        }
        this
    }

    /// The holder asks. The trustee answers in a callback, in the same transaction.
    pub fn request(
        &mut self,
        kind: RequestKind,
        amount: U128,
        category: u8,
        payee: AccountId,
        message: Base64VecU8,
        reply_key: Option<String>,
    ) -> Promise {
        require!(
            env::predecessor_account_id() == self.holder,
            "Only the current holder can ask"
        );
        require!(message.0.len() <= MAX_MESSAGE, "Message is too long");
        if let Some(key) = &reply_key {
            require!(
                key.len() == 64 && key.bytes().all(|b| b.is_ascii_hexdigit()),
                "reply_key must be 32 bytes of hex"
            );
        }
        if let Some(block) = self.blocking_condition() {
            env::panic_str(block.why);
        }
        require!(self.rails.allows_category(category), "That category is not allowed");
        require!(self.rails.payees.allows(&payee, &self.holder), "That payee is not allowed");

        let mut asked = amount;
        if let RequestKind::Milestone { index } = kind {
            let letter = self
                .letters
                .get(index)
                .unwrap_or_else(|| env::panic_str("No such letter"));
            require!(letter.opened.is_none(), "That letter has already been opened");
            asked = letter.gift;
        }

        self.roll_window();
        self.window_requests += 1;
        self.last_request_ns = env::block_timestamp();

        let id = self.next_id;
        self.next_id += 1;

        let said = (self.public_room && message.0.len() <= MAX_SAID)
            .then(|| String::from_utf8(message.0.clone()).ok())
            .flatten();
        let pending = Pending {
            id: U64(id),
            holder: self.holder.clone(),
            rotation_seq: U64(self.rotation_seq),
            kind,
            asked,
            payee: payee.clone(),
            category,
            said,
            at_ns: U64(env::block_timestamp()),
        };
        let input = self.trustee_input(&pending, &message.0, &reply_key);
        self.pending = Some(pending);

        Event::RequestReceived { id: U64(id), holder: self.holder.clone(), kind, asked, payee }
            .emit();

        self.call_trustee(input)
            .then(Self::ext(env::current_account_id()).with_static_gas(GAS_ON_DECISION).on_decision(U64(id)))
    }

    /// Applies the trustee's answer. Every number in it is clamped here.
    #[private]
    pub fn on_decision(&mut self, id: U64) {
        let Some(p) = self.pending.take() else { return };
        if p.id != id {
            self.pending = Some(p);
            return;
        }

        let answer = env::promise_result_checked(0, MAX_OUTPUT)
            .ok()
            .and_then(|bytes| serde_json::from_slice::<TrusteeOutput>(&bytes).ok())
            .filter(|o| o.trust == env::current_account_id() && o.id == id);

        let Some(out) = answer else {
            self.counts.unanswered += 1;
            self.finish(&p, Outcome::NoAnswer, 0, 0, 0, None);
            return;
        };

        // The holder changed while the trustee was deciding. The decision belonged to them.
        if p.rotation_seq.0 != self.rotation_seq || p.holder != self.holder {
            self.counts.voided += 1;
            self.finish(&p, Outcome::Voided, out.reason, out.amount.0, 0, None);
            return;
        }

        if let Some(memo) = &out.memo {
            if memo.0.len() <= MAX_MEMO {
                self.memo.set(Some(memo.0.clone()));
            }
        }
        let reply = (out.reply.len() <= MAX_REPLY).then_some(out.reply.clone());

        match out.verdict {
            Verdict::Refuse => {
                self.counts.refused += 1;
                self.finish(&p, Outcome::Refused, out.reason, 0, 0, reply);
            }
            Verdict::More => {
                self.counts.needs_more += 1;
                self.finish(&p, Outcome::NeedsMore, out.reason, 0, 0, reply);
            }
            Verdict::Approve => self.approve(p, out, reply),
        }
    }

    /// Bounced payments return here, so the books stay true.
    #[private]
    pub fn on_payout(&mut self, id: U64, amount: U128, counted_in_window: bool, epoch_start_ns: U64) {
        if env::promise_result_checked(0, 16).is_ok() {
            return;
        }
        self.distributed = self.distributed.saturating_sub(amount.0);
        if counted_in_window && self.window_start_ns == epoch_start_ns.0 {
            self.window_spent = self.window_spent.saturating_sub(amount.0);
        }
        let slot = ((id.0 - 1) % MAX_DECISIONS as u64) as u32;
        if let Some(rec) = self.decisions.get(slot).cloned() {
            if rec.id == id {
                let holder = rec.holder.clone();
                self.adjust_received(&holder, amount.0);
                self.decisions.replace(
                    slot,
                    Decision { outcome: Outcome::PayoutFailed, granted: U128(0), ..rec.clone() },
                );
                Event::PayoutFailed { id, amount, payee: rec.payee }.emit();
            }
        }
    }

    /// Anyone can add to the trust. A grandparent's cousin, say.
    #[payable]
    pub fn contribute(&mut self) {
        let amount = env::attached_deposit().as_yoctonear();
        require!(amount > 0, "Attach the amount to contribute");
        self.deposits += amount;
        Event::Contributed { from: env::predecessor_account_id(), amount: U128(amount) }.emit();
    }

    /// Reads the pool, then does the one useful move: withdraw what is ready, stake what is idle,
    /// or unstake what the liquid sleeve needs. Anyone can call it, so no keeper is required.
    pub fn rebalance(&mut self) -> Promise {
        let now = env::block_timestamp();
        require!(
            self.pool_busy_ns == 0 || now >= self.pool_busy_ns + STALE_NS,
            "The pool is already being updated"
        );
        self.pool_busy_ns = now;
        ext_pool::ext(self.pool.clone())
            .with_static_gas(GAS_POOL_VIEW)
            .get_account(env::current_account_id())
            .then(Self::ext(env::current_account_id()).with_static_gas(GAS_ON_POOL).on_pool_state())
    }

    #[private]
    pub fn on_pool_state(
        &mut self,
        #[callback_result] state: Result<PoolAccount, PromiseError>,
    ) {
        let Ok(state) = state else {
            self.pool_busy_ns = 0;
            return;
        };
        self.pool_total = state.staked_balance.0 + state.unstaked_balance.0;
        self.pool_unstaked = state.unstaked_balance.0;
        self.pool_can_withdraw = state.can_withdraw;
        self.pool_synced_ns = env::block_timestamp();

        let liquid = self.liquid();
        let me = env::current_account_id();
        if state.unstaked_balance.0 > 0 && state.can_withdraw {
            ext_pool::ext(self.pool.clone())
                .with_static_gas(GAS_POOL_MOVE)
                .withdraw_all()
                .then(Self::ext(me).with_static_gas(GAS_ON_MOVE).on_withdrawn(state.unstaked_balance))
                .detach();
        } else if self.stage == Stage::Matured {
            if state.staked_balance.0 > 0 {
                ext_pool::ext(self.pool.clone())
                    .with_static_gas(GAS_POOL_MOVE)
                    .unstake_all()
                    .then(Self::ext(me).with_static_gas(GAS_ON_MOVE).on_unstaking(state.staked_balance))
                    .detach();
            } else {
                self.pool_busy_ns = 0;
            }
        } else if liquid > self.liquid_target + MIN_POOL_MOVE {
            self.stake(liquid - self.liquid_target);
        } else if liquid < self.liquid_target / 2
            && state.unstaked_balance.0 == 0
            && state.staked_balance.0 > 0
        {
            let amount = (self.liquid_target - liquid).min(state.staked_balance.0);
            ext_pool::ext(self.pool.clone())
                .with_static_gas(GAS_POOL_MOVE)
                .unstake(U128(amount))
                .then(Self::ext(me).with_static_gas(GAS_ON_MOVE).on_unstaking(U128(amount)))
                .detach();
        } else {
            self.pool_busy_ns = 0;
        }
    }

    #[private]
    pub fn on_staked(&mut self, amount: U128) {
        self.pool_busy_ns = 0;
        if env::promise_result_checked(0, 256).is_ok() {
            self.staked_in += amount.0;
            self.pool_total += amount.0;
            Event::Staked { amount, pool: self.pool.clone() }.emit();
        }
    }

    #[private]
    pub fn on_unstaking(&mut self, amount: U128) {
        self.pool_busy_ns = 0;
        if env::promise_result_checked(0, 256).is_ok() {
            self.pool_unstaked += amount.0;
            Event::Unstaking { amount, pool: self.pool.clone() }.emit();
        }
    }

    #[private]
    pub fn on_withdrawn(&mut self, amount: U128) {
        self.pool_busy_ns = 0;
        if env::promise_result_checked(0, 256).is_ok() {
            self.unstaked_out += amount.0;
            self.pool_total = self.pool_total.saturating_sub(amount.0);
            self.pool_unstaked = 0;
            Event::Withdrawn { amount, pool: self.pool.clone() }.emit();
        }
    }

    /// Past the maturity date anyone can call this. Nobody can stop it, including the creator.
    pub fn mature(&mut self) {
        require!(self.stage == Stage::Live, "Already matured");
        require!(env::block_timestamp() >= self.maturity_ns, "The maturity date has not arrived");
        self.stage = Stage::Matured;
        Event::Matured { holder: self.holder.clone() }.emit();
        self.push_card();
    }

    /// After maturity the holder has full control of whatever is liquid.
    pub fn claim(&mut self) -> Promise {
        require!(self.stage == Stage::Matured, "The trust has not matured");
        require!(env::predecessor_account_id() == self.holder, "Only the holder can claim");
        require!(!self.deciding(env::block_timestamp()), "A decision is still in progress");
        let amount = self.liquid();
        require!(amount > 0, "Nothing is liquid yet. Call rebalance to unstake");
        self.distributed += amount;
        Event::Claimed { holder: self.holder.clone(), amount: U128(amount) }.emit();
        Promise::new(self.holder.clone()).transfer(yocto(amount))
    }

    /// Called by the collection when the NFT moves. `expected_nonce` lets a buyer bind the purchase
    /// to the state they checked.
    pub fn rotate(
        &mut self,
        new_holder: AccountId,
        expected_seq: U64,
        expected_nonce: Option<U64>,
    ) -> U64 {
        require!(env::predecessor_account_id() == self.collection, "Only the collection");
        require!(expected_seq.0 == self.rotation_seq, "The holder has already changed");
        if let Some(nonce) = expected_nonce {
            require!(nonce.0 == self.payout_nonce, "A payout happened after you checked");
        }
        require!(
            self.transfer == TransferPolicy::Free || self.stage == Stage::Matured,
            "This trust cannot be transferred before maturity"
        );

        let now = env::block_timestamp();
        let from = self.holder.clone();
        let last = self.holders.len() - 1;
        if let Some(rec) = self.holders.get_mut(last) {
            rec.to_ns = Some(U64(now));
        }
        self.holders.push(HolderRecord {
            holder: new_holder.clone(),
            from_ns: U64(now),
            to_ns: None,
            received: U128(0),
        });

        self.rotation_seq += 1;
        self.holder = new_holder.clone();
        // The trustee's private notes were about the last holder. They do not pass on.
        self.memo.set(None);
        Event::HolderRotated { from, to: new_holder, rotation_seq: U64(self.rotation_seq) }.emit();
        U64(self.rotation_seq)
    }

    // ---- views ----

    pub fn nft_item_info(&self) -> NftItemInfo {
        NftItemInfo {
            spec: ITEM_SPEC.to_string(),
            init: true,
            status: self.blocking_condition().map_or(ItemStatus::Active, |b| b.status),
            collection_id: self.collection.clone(),
            token_id: env::current_account_id().to_string(),
            owner_id: self.holder.clone(),
            rotation_seq: U64(self.rotation_seq),
            rotation_epoch: 0,
        }
    }

    pub fn overview(&self) -> Overview {
        let now = env::block_timestamp();
        let expired = self.window_expired(now);
        Overview {
            title: self.title.clone(),
            collection: self.collection.clone(),
            creator: self.creator.clone(),
            holder: self.holder.clone(),
            rotation_seq: U64(self.rotation_seq),
            payout_nonce: U64(self.payout_nonce),
            stage: self.stage,
            created_ns: U64(self.created_ns),
            transfer: self.transfer,
            public_room: self.public_room,
            rails: self.rails.clone(),
            trustee: self.trustee.clone(),
            wishes_sha256: hex_of(&self.wishes_sha256),
            pending: self.pending.clone(),
            window_spent: U128(if expired { 0 } else { self.window_spent }),
            window_requests: if expired { 0 } else { self.window_requests },
            window_ends_ns: U64(self.window_start_ns + self.rails.period_ns.0),
            next_request_ns: U64(self.last_request_ns + self.rails.cooldown_ns.0),
            blocked: self.blocking_condition().map(|b| b.why.to_string()),
            counts: self.counts.clone(),
            money: self.money(),
            worst_case: self.worst_case(),
        }
    }

    pub fn money(&self) -> Money {
        let assets = self.assets();
        let yield_earned = (self.pool_total + self.unstaked_out).saturating_sub(self.staked_in);
        Money {
            deposits: U128(self.deposits),
            liquid: U128(self.liquid()),
            in_pool: U128(self.pool_total),
            assets: U128(assets),
            spendable: U128(self.spendable()),
            distributed: U128(self.distributed),
            yield_earned: U128(yield_earned),
            fees_paid: U128(
                (self.deposits + yield_earned)
                    .saturating_sub(self.distributed + assets + self.storage_locked()),
            ),
            pool: self.pool.clone(),
            pool_synced_ns: U64(self.pool_synced_ns),
        }
    }

    pub fn worst_case(&self) -> WorstCase {
        let now = env::block_timestamp();
        let per_period = self.rails.max_per_period.0;
        let period = self.rails.period_ns.0.max(1) as u128;
        let left = self.maturity_ns.saturating_sub(now) as u128;
        let periods = left.div_ceil(period);
        let gifts: u128 =
            self.letters.iter().filter(|l| l.opened.is_none()).map(|l| l.gift.0).sum();
        let cap = periods.saturating_mul(per_period).saturating_add(gifts);
        WorstCase {
            per_period: U128(per_period),
            period_ns: self.rails.period_ns,
            one_time_gifts: U128(gifts),
            floor: self.rails.principal_floor,
            matures_at_ns: U64(self.maturity_ns),
            until_maturity: U128(cap.min(self.spendable())),
        }
    }

    pub fn letters(&self) -> Vec<LetterView> {
        self.letters
            .iter()
            .enumerate()
            .map(|(i, l)| LetterView {
                index: i as u32,
                title: l.title.clone(),
                gift: l.gift,
                is_open: l.opened.is_some(),
                opened: l.opened.clone(),
            })
            .collect()
    }

    /// Newest first.
    pub fn decisions(&self, limit: Option<u32>) -> Vec<Decision> {
        let mut all: Vec<Decision> = self.decisions.iter().cloned().collect();
        all.sort_by(|a, b| b.id.0.cmp(&a.id.0));
        all.truncate(limit.unwrap_or(MAX_DECISIONS) as usize);
        all
    }

    pub fn holders(&self) -> Vec<HolderRecord> {
        self.holders.iter().cloned().collect()
    }

    /// The trustee's code hash and the ciphertext commitment. Nothing sealed is exposed in the
    /// clear, and the ciphertext itself is public on purpose: anyone can see it cannot be read.
    pub fn sealed_wishes(&self) -> Base64VecU8 {
        Base64VecU8(self.wishes.get().clone().unwrap_or_default())
    }
}

impl Trust {
    /// Held back for storage. This is not a cost: NEAR returns it if the data is ever deleted.
    fn storage_locked(&self) -> u128 {
        (env::storage_usage() as u128 + STORAGE_PAD_BYTES) * env::storage_byte_cost().as_yoctonear()
    }

    fn liquid(&self) -> u128 {
        env::account_balance().as_yoctonear().saturating_sub(self.storage_locked())
    }

    fn assets(&self) -> u128 {
        self.liquid() + self.pool_total
    }

    /// Above the floor, and therefore available for distributions and for the trustee's fees.
    fn spendable(&self) -> u128 {
        self.assets().saturating_sub(self.rails.principal_floor.0)
    }

    /// Recording a decision locks a little more storage, which lowers `assets`. Holding this much
    /// back from every spend keeps the floor strict: assets never dip below it, not even by that.
    fn floor_margin(&self) -> u128 {
        STORAGE_PAD_BYTES * env::storage_byte_cost().as_yoctonear()
    }

    fn deciding(&self, now: u64) -> bool {
        self.pending.as_ref().is_some_and(|p| now < p.at_ns.0.saturating_add(STALE_NS))
    }

    fn window_expired(&self, now: u64) -> bool {
        now >= self.window_start_ns.saturating_add(self.rails.period_ns.0)
    }

    fn roll_window(&mut self) {
        let now = env::block_timestamp();
        if self.window_expired(now) {
            self.window_start_ns = now;
            self.window_spent = 0;
            self.window_requests = 0;
        }
    }

    fn blocking_condition(&self) -> Option<Block> {
        let now = env::block_timestamp();
        let deposit = self.trustee.deposit.0;
        if self.stage != Stage::Live {
            return Some(Block { status: ItemStatus::Expired, why: "This trust has matured" });
        }
        if self.deciding(now) {
            return Some(Block {
                status: ItemStatus::Suspended,
                why: "The trustee is still deciding",
            });
        }
        if self.last_request_ns != 0
            && now < self.last_request_ns.saturating_add(self.rails.cooldown_ns.0)
        {
            return Some(Block {
                status: ItemStatus::Suspended,
                why: "Too soon. The cooldown has not passed",
            });
        }
        if !self.window_expired(now) && self.window_requests >= self.rails.max_requests_per_period {
            return Some(Block {
                status: ItemStatus::Suspended,
                why: "No more requests this period",
            });
        }
        if self.liquid() < deposit {
            return Some(Block {
                status: ItemStatus::Frozen,
                why: "Not enough liquid funds to pay the trustee. Call rebalance",
            });
        }
        if self.spendable() < deposit + self.floor_margin() {
            return Some(Block {
                status: ItemStatus::Frozen,
                why: "Nothing above the floor to pay the trustee. Waiting for yield",
            });
        }
        None
    }

    fn stake(&mut self, amount: u128) {
        ext_pool::ext(self.pool.clone())
            .with_attached_deposit(yocto(amount))
            .with_static_gas(GAS_POOL_MOVE)
            .deposit_and_stake()
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(GAS_ON_MOVE)
                    .on_staked(U128(amount)),
            )
            .detach();
    }

    fn call_trustee(&self, input: String) -> Promise {
        let t = &self.trustee;
        ext_outlayer::ext(t.outlayer.clone())
            .with_attached_deposit(yocto(t.deposit.0))
            .with_static_gas(GAS_REQUEST_EXECUTION)
            .with_unused_gas_weight(1)
            .request_execution(
                json!({ "WasmUrl": {
                    "url": t.wasm_url,
                    "hash": t.wasm_hash,
                    "build_target": "wasm32-wasip2",
                }}),
                Some(json!({
                    "max_instructions": t.max_instructions,
                    "max_memory_mb": t.max_memory_mb,
                    "max_execution_seconds": t.max_execution_seconds,
                })),
                Some(input),
                Some(json!({ "profile": t.secrets_profile, "account_id": t.secrets_owner })),
                Some("Json".to_string()),
                Some(env::current_account_id()),
            )
    }

    fn trustee_input(&self, p: &Pending, message: &[u8], reply_key: &Option<String>) -> String {
        let letter = match p.kind {
            RequestKind::Ask => None,
            RequestKind::Milestone { index } => self.letters.get(index),
        };
        json!({
            "v": 1,
            "action": "decide",
            "trust": env::current_account_id(),
            "id": p.id,
            "title": self.title,
            "holder": p.holder,
            "kind": p.kind,
            "asked": p.asked,
            "category": p.category,
            "payee": p.payee,
            "public": self.public_room,
            "categories": self.rails.categories,
            "max_per_request": self.rails.max_per_request,
            "wishes": Base64VecU8(self.wishes.get().clone().unwrap_or_default()),
            "memo": self.memo.get().clone().map(Base64VecU8),
            "letter": letter.map(|l| Base64VecU8(l.cipher.clone())),
            "letter_title": letter.map(|l| l.title.clone()),
            "message": Base64VecU8(message.to_vec()),
            "reply_key": reply_key,
        })
        .to_string()
    }

    fn approve(&mut self, p: Pending, out: TrusteeOutput, reply: Option<String>) {
        let limit = self.liquid().min(self.spendable().saturating_sub(self.floor_margin()));
        let window_left = self.rails.max_per_period.0.saturating_sub(self.window_spent);

        let (wanted, ceiling, counted_in_window) = match p.kind {
            RequestKind::Ask => (
                out.amount.0.min(p.asked.0),
                limit.min(self.rails.max_per_request.0).min(window_left),
                true,
            ),
            // A gift is fixed at creation and pays once, so it stays outside the period limit.
            RequestKind::Milestone { .. } => (p.asked.0, limit, false),
        };
        let granted = wanted.min(ceiling);

        if let RequestKind::Milestone { index } = p.kind {
            let opened = out.letter.filter(|l| l.len() <= MAX_OPENED_LETTER);
            let Some(opened) = opened else {
                // Approved with no letter to show: nothing is released.
                self.counts.unanswered += 1;
                self.finish(&p, Outcome::NoAnswer, out.reason, 0, 0, reply);
                return;
            };
            if let Some(letter) = self.letters.get_mut(index) {
                letter.opened = Some(opened);
            }
            Event::LetterOpened { index, holder: p.holder.clone() }.emit();
        }

        self.counts.approved += 1;
        let outcome = if granted < wanted { Outcome::Clamped } else { Outcome::Approved };
        self.finish(&p, outcome, out.reason, wanted, granted, reply);

        if granted > 0 {
            self.distributed += granted;
            self.payout_nonce += 1;
            if counted_in_window {
                self.window_spent += granted;
            }
            self.adjust_received_up(granted);
            Promise::new(p.payee.clone())
                .transfer(yocto(granted))
                .then(Self::ext(env::current_account_id()).with_static_gas(GAS_ON_PAYOUT).on_payout(
                    p.id,
                    U128(granted),
                    counted_in_window,
                    U64(self.window_start_ns),
                ))
                .detach();
        }
    }

    fn finish(
        &mut self,
        p: &Pending,
        outcome: Outcome,
        reason: u8,
        decided: u128,
        granted: u128,
        reply: Option<String>,
    ) {
        Event::DecisionMade {
            id: p.id,
            holder: p.holder.clone(),
            outcome,
            reason,
            decided: U128(decided),
            granted: U128(granted),
            payee: p.payee.clone(),
        }
        .emit();

        let rec = Decision {
            id: p.id,
            at_ns: U64(env::block_timestamp()),
            holder: p.holder.clone(),
            rotation_seq: p.rotation_seq,
            kind: p.kind,
            asked: p.asked,
            decided: U128(decided),
            granted: U128(granted),
            payee: p.payee.clone(),
            category: p.category,
            outcome,
            reason,
            reply,
            said: p.said.clone(),
        };
        let slot = ((p.id.0 - 1) % MAX_DECISIONS as u64) as u32;
        if slot < self.decisions.len() {
            self.decisions.replace(slot, rec);
        } else {
            self.decisions.push(rec);
        }
        self.push_card();
    }

    fn adjust_received_up(&mut self, amount: u128) {
        let last = self.holders.len() - 1;
        if let Some(rec) = self.holders.get_mut(last) {
            rec.received = U128(rec.received.0 + amount);
        }
    }

    fn adjust_received(&mut self, holder: &AccountId, amount: u128) {
        for i in (0..self.holders.len()).rev() {
            if let Some(rec) = self.holders.get_mut(i) {
                if &rec.holder == holder {
                    rec.received = U128(rec.received.0.saturating_sub(amount));
                    return;
                }
            }
        }
    }

    fn push_card(&self) {
        let card = Card {
            approved: self.counts.approved,
            refused: self.counts.refused,
            letters_total: self.letters.len(),
            letters_opened: self.letters.iter().filter(|l| l.opened.is_some()).count() as u32,
            given: U128(self.distributed),
            matured: self.stage == Stage::Matured,
        };
        ext_collection::ext(self.collection.clone())
            .with_static_gas(GAS_PUSH_CARD)
            .push_card(card)
            .detach();
    }
}

fn validate_terms(t: &TrustTerms) {
    require!(!t.title.is_empty() && t.title.len() <= MAX_TITLE, "Title must be 1 to 64 bytes");
    require!(t.wishes.0.len() <= MAX_WISHES, "Sealed wishes are too long");
    require!(!t.wishes.0.is_empty(), "A trust needs sealed wishes");
    require!(t.letters.len() <= MAX_LETTERS, "Too many letters");
    t.letters.iter().for_each(validate_letter);
    let r = &t.rails;
    require!(r.max_per_request.0 <= r.max_per_period.0, "max_per_request is above max_per_period");
    require!(r.period_ns.0 > 0, "The period must not be zero");
    require!(r.max_requests_per_period > 0, "At least one request per period is needed");
    require!(r.categories != 0, "At least one category is needed");
    require!(t.maturity_ns.0 > env::block_timestamp(), "Maturity must be in the future");
}

fn validate_letter(l: &LetterInput) {
    require!(!l.title.is_empty() && l.title.len() <= MAX_TITLE, "Letter title must be 1 to 64 bytes");
    require!(l.cipher.0.len() <= MAX_LETTER, "A sealed letter is too long");
}

fn hex_of(bytes: &[u8]) -> String {
    const HEX: &[u8; 16] = b"0123456789abcdef";
    let mut s = String::with_capacity(bytes.len() * 2);
    for b in bytes {
        s.push(HEX[(b >> 4) as usize] as char);
        s.push(HEX[(b & 15) as usize] as char);
    }
    s
}

/// A code hash, for callers that pin the trust's global contract.
pub type CodeHash = CryptoHash;
