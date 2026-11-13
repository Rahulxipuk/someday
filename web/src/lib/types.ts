// The contract's JSON, as it comes back from views. U128 and U64 values are decimal strings.

export type PayeePolicy =
  | 'Holder'
  | { Providers: string[] }
  | { HolderOrProviders: string[] };

export type Rails = {
  max_per_request: string;
  max_per_period: string;
  period_ns: string;
  cooldown_ns: string;
  max_requests_per_period: number;
  principal_floor: string;
  categories: number;
  payees: PayeePolicy;
};

export type TrusteeConfig = {
  outlayer: string;
  wasm_url: string;
  wasm_hash: string;
  secrets_owner: string;
  secrets_profile: string;
  deposit: string;
  max_instructions: number;
  max_memory_mb: number;
  max_execution_seconds: number;
};

export type Kind = 'Ask' | { Milestone: { index: number } };

export type Outcome =
  | 'Approved'
  | 'Clamped'
  | 'Refused'
  | 'NeedsMore'
  | 'Voided'
  | 'NoAnswer'
  | 'PayoutFailed';

export type Decision = {
  id: string;
  at_ns: string;
  holder: string;
  rotation_seq: string;
  kind: Kind;
  asked: string;
  decided: string;
  granted: string;
  payee: string;
  category: number;
  outcome: Outcome;
  reason: number;
  reply: string | null;
  said: string | null;
};

export type Pending = {
  id: string;
  holder: string;
  rotation_seq: string;
  kind: Kind;
  asked: string;
  payee: string;
  category: number;
  said: string | null;
  at_ns: string;
};

export type Money = {
  deposits: string;
  liquid: string;
  in_pool: string;
  assets: string;
  spendable: string;
  distributed: string;
  yield_earned: string;
  fees_paid: string;
  pool: string;
  pool_synced_ns: string;
};

export type WorstCase = {
  per_period: string;
  period_ns: string;
  one_time_gifts: string;
  floor: string;
  matures_at_ns: string;
  until_maturity: string;
};

export type Counts = {
  approved: number;
  refused: number;
  needs_more: number;
  voided: number;
  unanswered: number;
};

export type Overview = {
  title: string;
  collection: string;
  creator: string;
  holder: string;
  rotation_seq: string;
  payout_nonce: string;
  stage: 'Live' | 'Matured';
  created_ns: string;
  transfer: 'Free' | 'Locked';
  public_room: boolean;
  rails: Rails;
  trustee: TrusteeConfig;
  wishes_sha256: string;
  pending: Pending | null;
  window_spent: string;
  window_requests: number;
  window_ends_ns: string;
  next_request_ns: string;
  blocked: string | null;
  counts: Counts;
  money: Money;
  worst_case: WorstCase;
};

export type LetterView = {
  index: number;
  title: string;
  gift: string;
  is_open: boolean;
  opened: string | null;
};

export type HolderRecord = {
  holder: string;
  from_ns: string;
  to_ns: string | null;
  received: string;
};

export type ItemStatus = 'Parked' | 'Suspended' | 'Expired' | 'Frozen' | 'Active';

export type ItemInfo = {
  spec: string;
  init: boolean;
  status: ItemStatus;
  collection_id: string;
  token_id: string;
  owner_id: string;
  rotation_seq: string;
  rotation_epoch: number;
};

export type Token = {
  token_id: string;
  owner_id: string;
  metadata: {
    title: string | null;
    description: string | null;
    media: string | null;
  } | null;
};

export type Entry = {
  title: string;
  created_ns: string;
  rotation_seq: string;
  card: {
    approved: number;
    refused: number;
    letters_total: number;
    letters_opened: number;
    given: string;
    matured: boolean;
  };
  listed: string | null;
  moving: boolean;
};

export type CollectionConfig = {
  trust_code: string;
  trustee: TrusteeConfig;
  pool_suffix: string;
  sealing_key: string | null;
  config_epoch: number;
  ops: string | null;
};
