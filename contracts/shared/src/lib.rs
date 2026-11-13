//! Types shared by the collection (the NEP-171 index) and each trust (the account that is the NFT).

use near_sdk::json_types::{Base64VecU8, U128, U64};
use near_sdk::{near, AccountId};

/// Revision of the Sharded NFT Items draft this contract answers to.
pub const ITEM_SPEC: &str = "sharded-item-1.0.0";

pub const MAX_TITLE: usize = 64;
pub const MAX_WISHES: usize = 6_000;
pub const MAX_LETTERS: usize = 8;
pub const MAX_LETTER: usize = 4_000;

/// Who may receive a distribution. The trustee never names the payee: it comes from the request and
/// is checked here, so a fooled trustee cannot redirect money.
#[near(serializers = [borsh, json])]
#[derive(Clone, Debug, PartialEq, Eq)]
pub enum PayeePolicy {
    /// Only the current holder.
    Holder,
    /// Only these providers (a school, a clinic). The holder is not paid directly.
    Providers(Vec<AccountId>),
    /// The holder, or one of these providers.
    HolderOrProviders(Vec<AccountId>),
}

impl PayeePolicy {
    pub fn allows(&self, payee: &AccountId, holder: &AccountId) -> bool {
        match self {
            PayeePolicy::Holder => payee == holder,
            PayeePolicy::Providers(list) => list.contains(payee),
            PayeePolicy::HolderOrProviders(list) => payee == holder || list.contains(payee),
        }
    }
}

/// The hard limits. They are enforced by the contract, are public, and can never change. The
/// trustee can only ever release less than they allow, so a fully compromised trustee is bounded by
/// these numbers.
#[near(serializers = [borsh, json])]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Rails {
    pub max_per_request: U128,
    pub max_per_period: U128,
    pub period_ns: U64,
    pub cooldown_ns: U64,
    pub max_requests_per_period: u32,
    /// Assets may never fall below this before maturity, for distributions or for fees.
    pub principal_floor: U128,
    /// Bit `n` set means category `n` may be requested.
    pub categories: u32,
    pub payees: PayeePolicy,
}

impl Rails {
    pub fn allows_category(&self, category: u8) -> bool {
        category < 32 && self.categories & (1u32 << category) != 0
    }
}

#[near(serializers = [borsh, json])]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum TransferPolicy {
    /// Like a spendthrift clause: the NFT cannot move until maturity.
    Locked,
    /// The holder may transfer or sell it.
    Free,
}

/// Passed to `outlayer.request_execution`. Pinned by hash and fixed when a trust is created.
#[near(serializers = [borsh, json])]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct TrusteeConfig {
    pub outlayer: AccountId,
    pub wasm_url: String,
    pub wasm_hash: String,
    pub secrets_owner: AccountId,
    pub secrets_profile: String,
    /// Attached per decision. Whatever the run did not use is refunded to the trust.
    pub deposit: U128,
    pub max_instructions: u64,
    pub max_memory_mb: u32,
    pub max_execution_seconds: u64,
}

#[near(serializers = [borsh, json])]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct LetterInput {
    /// Public, for example "When you graduate".
    pub title: String,
    /// Paid once when the trustee accepts the milestone. Included in the worst case.
    pub gift: U128,
    /// Sealed condition and text, encrypted to the enclave.
    pub cipher: Base64VecU8,
}

#[near(serializers = [borsh, json])]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct TrustTerms {
    pub title: String,
    pub holder: AccountId,
    pub rails: Rails,
    pub maturity_ns: U64,
    pub transfer: TransferPolicy,
    /// The validator pool the endowment is staked with.
    pub pool: AccountId,
    /// How much stays unstaked for distributions and fees.
    pub liquid_target: U128,
    /// A public trust keeps requests and replies in the clear, as a public wall.
    pub public_room: bool,
    /// The creator's wishes, encrypted to the enclave.
    pub wishes: Base64VecU8,
    pub letters: Vec<LetterInput>,
}

/// What the collection needs to draw the NFT. Pushed by the trust after each decision.
#[near(serializers = [borsh, json])]
#[derive(Clone, Debug, PartialEq, Eq, Default)]
pub struct Card {
    pub approved: u32,
    pub refused: u32,
    pub letters_total: u32,
    pub letters_opened: u32,
    pub given: U128,
    pub matured: bool,
}

/// `nft_item_info` status, from the Sharded NFT Items draft.
#[near(serializers = [json])]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum ItemStatus {
    Parked,
    Suspended,
    Expired,
    Frozen,
    Active,
}

/// The item half of the T2 pair check in the Sharded NFT Items draft.
#[near(serializers = [json])]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct NftItemInfo {
    pub spec: String,
    pub init: bool,
    pub status: ItemStatus,
    pub collection_id: AccountId,
    pub token_id: String,
    pub owner_id: AccountId,
    pub rotation_seq: U64,
    pub rotation_epoch: u32,
}
