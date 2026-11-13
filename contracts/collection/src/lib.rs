//! The Someday collection: the NEP-171 index over trusts, and the parent account that creates them.
//!
//! Every token is a real NEAR account, `<label>.<collection>`, running one immutable global
//! contract with no access keys. The trust is the authority on who holds it. This index follows,
//! and the two are compared by the T2 pair check in the Sharded NFT Items draft.

use base64::Engine;
use near_contract_standards::non_fungible_token::events::{NftMint, NftTransfer};
use near_contract_standards::non_fungible_token::metadata::{
    NFTContractMetadata, TokenMetadata, NFT_METADATA_SPEC,
};
use near_contract_standards::non_fungible_token::Token;
use near_sdk::json_types::{Base58CryptoHash, U128, U64};
use near_sdk::store::{IterableMap, IterableSet, LookupMap};
use near_sdk::{
    assert_one_yocto, env, ext_contract, near, require, AccountId, BorshStorageKey, CryptoHash,
    Gas, NearToken, PanicOnDefault, Promise,
};
use serde_json::json;
use someday_shared::{Card, TrustTerms, TrusteeConfig};

mod art;

const MIN_FUNDING: NearToken = NearToken::from_near(1);
/// Kept by the collection for the index entry. Everything else funds the trust.
const INDEX_FEE: NearToken = NearToken::from_millinear(50);
const MAX_LABEL: usize = 32;

const GAS_INIT: Gas = Gas::from_tgas(150);
const GAS_ON_CREATED: Gas = Gas::from_tgas(20);
const GAS_ROTATE: Gas = Gas::from_tgas(30);
const GAS_ON_ROTATED: Gas = Gas::from_tgas(20);
const GAS_REQUEST_EXECUTION: Gas = Gas::from_tgas(150);
const GAS_ON_SEALING_KEY: Gas = Gas::from_tgas(15);

#[derive(BorshStorageKey)]
#[near]
enum Key {
    Owners,
    ByOwner,
    OwnerTokens { hash: Vec<u8> },
    Entries,
}

#[near(serializers = [borsh, json])]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Entry {
    pub title: String,
    pub created_ns: U64,
    pub rotation_seq: U64,
    pub card: Card,
    pub listed: Option<U128>,
    pub moving: bool,
}

#[near(serializers = [json])]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct CollectionConfig {
    pub trust_code: Base58CryptoHash,
    pub trustee: TrusteeConfig,
    pub pool_suffix: String,
    pub sealing_key: Option<String>,
    pub config_epoch: u32,
    pub ops: Option<AccountId>,
}

#[ext_contract(ext_trust)]
pub trait Trust {
    fn rotate(
        &mut self,
        new_holder: AccountId,
        expected_seq: U64,
        expected_nonce: Option<U64>,
    ) -> U64;
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

#[near(contract_state)]
#[derive(PanicOnDefault)]
pub struct Collection {
    metadata: NFTContractMetadata,
    /// Can configure the collection until it is sealed. Then this is `None` for good.
    ops: Option<AccountId>,
    trust_code: CryptoHash,
    trustee: TrusteeConfig,
    pool_suffix: String,
    /// The enclave's public key. Set once, from an enclave run, never by a person.
    sealing_key: Option<String>,
    config_epoch: u32,
    owners: IterableMap<String, AccountId>,
    by_owner: LookupMap<AccountId, IterableSet<String>>,
    entries: LookupMap<String, Entry>,
}

#[near]
impl Collection {
    #[init]
    pub fn new(
        ops: AccountId,
        trust_code: Base58CryptoHash,
        trustee: TrusteeConfig,
        pool_suffix: String,
    ) -> Self {
        require!(pool_suffix.starts_with('.'), "pool_suffix must start with a dot");
        Self {
            metadata: NFTContractMetadata {
                spec: NFT_METADATA_SPEC.to_string(),
                name: "Someday".to_string(),
                symbol: "SOMEDAY".to_string(),
                icon: None,
                base_uri: None,
                reference: None,
                reference_hash: None,
            },
            ops: Some(ops),
            trust_code: trust_code.into(),
            trustee,
            pool_suffix,
            sealing_key: None,
            config_epoch: 0,
            owners: IterableMap::new(Key::Owners),
            by_owner: LookupMap::new(Key::ByOwner),
            entries: LookupMap::new(Key::Entries),
        }
    }

    // ---- setup, only before sealing ----

    /// Ask the enclave for its public key. The answer arrives through the same pinned path as every
    /// decision, so no person ever chooses the key that wishes are sealed to.
    #[payable]
    pub fn request_sealing_key(&mut self) -> Promise {
        self.assert_ops();
        require!(self.sealing_key.is_none(), "The sealing key is already set");
        let t = &self.trustee;
        ext_outlayer::ext(t.outlayer.clone())
            .with_attached_deposit(env::attached_deposit())
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
                    "max_execution_seconds": 30,
                })),
                Some(json!({ "v": 1, "action": "pubkey" }).to_string()),
                Some(json!({ "profile": t.secrets_profile, "account_id": t.secrets_owner })),
                Some("Json".to_string()),
                Some(env::predecessor_account_id()),
            )
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(GAS_ON_SEALING_KEY)
                    .on_sealing_key(),
            )
    }

    #[private]
    pub fn on_sealing_key(&mut self) -> bool {
        let key = env::promise_result_checked(0, 512)
            .ok()
            .and_then(|b| serde_json::from_slice::<serde_json::Value>(&b).ok())
            .and_then(|v| v.get("public_key").and_then(|k| k.as_str()).map(str::to_string))
            .filter(|k| k.len() == 64 && k.bytes().all(|b| b.is_ascii_hexdigit()));
        match key {
            Some(k) => {
                self.sealing_key = Some(k.to_lowercase());
                self.config_epoch += 1;
                true
            }
            None => false,
        }
    }

    pub fn set_trustee(&mut self, trustee: TrusteeConfig, clear_key: bool) {
        self.assert_ops();
        self.trustee = trustee;
        if clear_key {
            self.sealing_key = None;
        }
        self.config_epoch += 1;
    }

    /// Ends the setup role. Together with deleting this account's keys, it makes the configuration
    /// permanent, which is what lets a consumer cache the T3 proof.
    pub fn seal_config(&mut self) {
        self.assert_ops();
        require!(self.sealing_key.is_some(), "Set the sealing key first");
        self.ops = None;
        self.config_epoch += 1;
    }

    // ---- minting ----

    /// Creates the trust's account in one receipt: no key is ever added, and if `init` fails the
    /// account never exists and the money comes back.
    #[payable]
    pub fn create_trust(&mut self, label: String, terms: TrustTerms) -> Promise {
        let attached = env::attached_deposit();
        require!(attached >= MIN_FUNDING, "A trust needs at least 1 NEAR");
        require!(self.sealing_key.is_some(), "The collection is not ready");
        validate_label(&label);
        require!(
            terms.pool.as_str().ends_with(self.pool_suffix.as_str()),
            "The pool must come from the official staking pool factory"
        );

        let me = env::current_account_id();
        let token_id = format!("{label}.{me}");
        require!(!self.owners.contains_key(&token_id), "That name is taken");
        let account: AccountId = token_id.parse().unwrap();

        let creator = env::predecessor_account_id();
        let funded = attached.saturating_sub(INDEX_FEE);
        let title = terms.title.clone();
        let holder = terms.holder.clone();
        let letters = terms.letters.len() as u32;

        let init_args = json!({
            "creator": creator,
            "deposit": U128(funded.as_yoctonear()),
            "terms": terms,
            "trustee": self.trustee,
        })
        .to_string()
        .into_bytes();

        Promise::new(account)
            .create_account()
            .transfer(funded)
            .use_global_contract(self.trust_code)
            .function_call("init".to_string(), init_args, NearToken::from_yoctonear(0), GAS_INIT)
            .then(Self::ext(me).with_static_gas(GAS_ON_CREATED).on_created(
                token_id,
                holder,
                creator,
                title,
                letters,
                U128(attached.as_yoctonear()),
            ))
    }

    #[private]
    pub fn on_created(
        &mut self,
        token_id: String,
        holder: AccountId,
        creator: AccountId,
        title: String,
        letters: u32,
        attached: U128,
    ) -> bool {
        if env::promise_result_checked(0, 256).is_err() {
            Promise::new(creator).transfer(NearToken::from_yoctonear(attached.0)).detach();
            return false;
        }
        self.owners.insert(token_id.clone(), holder.clone());
        self.add_to_owner(&holder, &token_id);
        self.entries.insert(
            token_id.clone(),
            Entry {
                title,
                created_ns: U64(env::block_timestamp()),
                rotation_seq: U64(0),
                card: Card { letters_total: letters, ..Card::default() },
                listed: None,
                moving: false,
            },
        );
        NftMint { owner_id: &holder, token_ids: &[token_id.as_str()], memo: None }.emit();
        true
    }

    /// A trust reports what it has done. Only a minted trust can write its own card.
    pub fn push_card(&mut self, card: Card) {
        let token_id = env::predecessor_account_id().to_string();
        let entry = self
            .entries
            .get_mut(&token_id)
            .unwrap_or_else(|| env::panic_str("Not a trust in this collection"));
        entry.card = card;
    }

    // ---- NEP-171 ----

    #[payable]
    pub fn nft_transfer(
        &mut self,
        receiver_id: AccountId,
        token_id: String,
        approval_id: Option<u64>,
        memo: Option<String>,
    ) -> Promise {
        assert_one_yocto();
        require!(approval_id.is_none(), "Approvals are not supported");
        let _ = memo;
        let owner = self.owner_of(&token_id);
        require!(env::predecessor_account_id() == owner, "Only the holder can transfer");
        require!(receiver_id != owner, "Already the holder");
        self.begin_move(token_id, owner, receiver_id, None, U128(0))
    }

    /// Refused on purpose: a receiver contract must not hold a trust between two receipts.
    #[payable]
    pub fn nft_transfer_call(
        &mut self,
        receiver_id: AccountId,
        token_id: String,
        approval_id: Option<u64>,
        memo: Option<String>,
        msg: String,
    ) {
        let _ = (receiver_id, token_id, approval_id, memo, msg);
        env::panic_str("nft_transfer_call is disabled for trusts. Use nft_transfer");
    }

    pub fn nft_token(&self, token_id: String) -> Option<Token> {
        let owner_id = self.owners.get(&token_id)?.clone();
        let entry = self.entries.get(&token_id)?;
        Some(Token {
            metadata: Some(token_metadata(&token_id, entry)),
            token_id,
            owner_id,
            approved_account_ids: None,
        })
    }

    pub fn nft_metadata(&self) -> NFTContractMetadata {
        self.metadata.clone()
    }

    pub fn nft_total_supply(&self) -> U128 {
        U128(self.owners.len() as u128)
    }

    pub fn nft_tokens(&self, from_index: Option<U128>, limit: Option<u64>) -> Vec<Token> {
        self.owners
            .keys()
            .skip(from_index.map_or(0, |i| i.0 as usize))
            .take(limit.unwrap_or(50).min(100) as usize)
            .filter_map(|id| self.nft_token(id.clone()))
            .collect()
    }

    pub fn nft_supply_for_owner(&self, account_id: AccountId) -> U128 {
        U128(self.by_owner.get(&account_id).map_or(0, |s| s.len() as u128))
    }

    pub fn nft_tokens_for_owner(
        &self,
        account_id: AccountId,
        from_index: Option<U128>,
        limit: Option<u64>,
    ) -> Vec<Token> {
        let Some(set) = self.by_owner.get(&account_id) else { return vec![] };
        set.iter()
            .skip(from_index.map_or(0, |i| i.0 as usize))
            .take(limit.unwrap_or(50).min(100) as usize)
            .filter_map(|id| self.nft_token(id.clone()))
            .collect()
    }

    // ---- a simple sale ----

    #[payable]
    pub fn list(&mut self, token_id: String, price: U128) {
        assert_one_yocto();
        require!(price.0 > 0, "Price must not be zero");
        require!(env::predecessor_account_id() == self.owner_of(&token_id), "Only the holder");
        self.entries.get_mut(&token_id).unwrap().listed = Some(price);
    }

    #[payable]
    pub fn unlist(&mut self, token_id: String) {
        assert_one_yocto();
        require!(env::predecessor_account_id() == self.owner_of(&token_id), "Only the holder");
        self.entries.get_mut(&token_id).unwrap().listed = None;
    }

    /// `expected_nonce` is the trust's `payout_nonce` the buyer saw. If a payout happened since,
    /// the purchase aborts and the buyer's money comes back.
    #[payable]
    pub fn buy(&mut self, token_id: String, expected_nonce: U64) -> Promise {
        let price = self
            .entries
            .get(&token_id)
            .and_then(|e| e.listed)
            .unwrap_or_else(|| env::panic_str("Not for sale"));
        require!(env::attached_deposit().as_yoctonear() == price.0, "Attach exactly the price");
        let owner = self.owner_of(&token_id);
        let buyer = env::predecessor_account_id();
        require!(buyer != owner, "Already the holder");
        self.begin_move(token_id, owner, buyer, Some(expected_nonce), price)
    }

    #[private]
    pub fn on_rotated(
        &mut self,
        token_id: String,
        from: AccountId,
        to: AccountId,
        price: U128,
    ) -> bool {
        let ok = env::promise_result_checked(0, 64).is_ok();
        let entry = self.entries.get_mut(&token_id).unwrap();
        entry.moving = false;
        if !ok {
            if price.0 > 0 {
                Promise::new(to).transfer(NearToken::from_yoctonear(price.0)).detach();
            }
            return false;
        }
        entry.rotation_seq = U64(entry.rotation_seq.0 + 1);
        self.owners.insert(token_id.clone(), to.clone());
        self.remove_from_owner(&from, &token_id);
        self.add_to_owner(&to, &token_id);
        NftTransfer {
            old_owner_id: &from,
            new_owner_id: &to,
            token_ids: &[token_id.as_str()],
            authorized_id: None,
            memo: None,
        }
        .emit();
        if price.0 > 0 {
            Promise::new(from).transfer(NearToken::from_yoctonear(price.0)).detach();
        }
        true
    }

    // ---- views ----

    pub fn config(&self) -> CollectionConfig {
        CollectionConfig {
            trust_code: self.trust_code.into(),
            trustee: self.trustee.clone(),
            pool_suffix: self.pool_suffix.clone(),
            sealing_key: self.sealing_key.clone(),
            config_epoch: self.config_epoch,
            ops: self.ops.clone(),
        }
    }

    /// Sharded NFT Items draft, parent interface.
    pub fn config_epoch(&self) -> u32 {
        self.config_epoch
    }

    /// Sharded NFT Items draft: the collection's own sequence, so a consumer can tell an index that
    /// is catching up from one that is wrong.
    pub fn nft_item_rotation(&self, token_id: String) -> Option<U64> {
        self.entries.get(&token_id).map(|e| e.rotation_seq)
    }

    pub fn entry(&self, token_id: String) -> Option<Entry> {
        self.entries.get(&token_id).cloned()
    }
}

impl Collection {
    fn assert_ops(&self) {
        require!(
            self.ops.as_ref() == Some(&env::predecessor_account_id()),
            "Only the setup account, and only before sealing"
        );
    }

    fn owner_of(&self, token_id: &String) -> AccountId {
        self.owners
            .get(token_id)
            .cloned()
            .unwrap_or_else(|| env::panic_str("No such trust"))
    }

    fn begin_move(
        &mut self,
        token_id: String,
        from: AccountId,
        to: AccountId,
        expected_nonce: Option<U64>,
        price: U128,
    ) -> Promise {
        let entry = self.entries.get_mut(&token_id).unwrap();
        require!(!entry.moving, "This trust is already moving");
        entry.moving = true;
        entry.listed = None;
        let seq = entry.rotation_seq;
        let account: AccountId = token_id.parse().unwrap();
        ext_trust::ext(account)
            .with_static_gas(GAS_ROTATE)
            .rotate(to.clone(), seq, expected_nonce)
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(GAS_ON_ROTATED)
                    .on_rotated(token_id, from, to, price),
            )
    }

    fn add_to_owner(&mut self, owner: &AccountId, token_id: &String) {
        if !self.by_owner.contains_key(owner) {
            let hash = env::sha256(owner.as_bytes());
            self.by_owner.insert(owner.clone(), IterableSet::new(Key::OwnerTokens { hash }));
        }
        self.by_owner.get_mut(owner).unwrap().insert(token_id.clone());
    }

    fn remove_from_owner(&mut self, owner: &AccountId, token_id: &String) {
        if let Some(set) = self.by_owner.get_mut(owner) {
            set.remove(token_id);
            if set.is_empty() {
                self.by_owner.remove(owner);
            }
        }
    }
}

fn validate_label(label: &str) {
    require!(
        (2..=MAX_LABEL).contains(&label.len())
            && label.bytes().all(|b| b.is_ascii_lowercase() || b.is_ascii_digit() || b == b'-'),
        "Names are 2 to 32 lowercase letters, digits or hyphens"
    );
    require!(!label.starts_with('-') && !label.ends_with('-'), "Names cannot start or end with -");
}

fn token_metadata(token_id: &str, entry: &Entry) -> TokenMetadata {
    let svg = art::draw(token_id, entry);
    let encoded = base64::engine::general_purpose::STANDARD.encode(svg);
    TokenMetadata {
        title: Some(entry.title.clone()),
        description: Some(art::describe(entry)),
        media: Some(format!("data:image/svg+xml;base64,{encoded}")),
        media_hash: None,
        copies: Some(1),
        issued_at: Some(entry.created_ns.0.to_string()),
        expires_at: None,
        starts_at: None,
        updated_at: None,
        extra: None,
        reference: None,
        reference_hash: None,
    }
}
