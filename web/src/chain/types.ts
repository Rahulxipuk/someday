export type NearEvent = {
  standard: string;
  version: string;
  event: string;
  data: unknown;
};

export type CallResult = {
  ok: boolean;
  value: unknown;
  error: string | null;
  events: NearEvent[];
};

export type ViewFn = <T = unknown>(account: string, method: string, args?: object) => Promise<T>;

/** As the `validators` RPC reports one, plus its commission in percent when known. */
export type RawValidator = {
  account_id: string;
  stake: string;
  num_produced_blocks?: number;
  num_expected_blocks?: number;
  fee?: number;
};

/** The read client packages/sharded-item expects, so the app and the SDK run the same checks. */
export type ItemClient = {
  finalHeight(): Promise<number>;
  call(account: string, method: string, args?: object, blockId?: number): Promise<any>;
  accessKeys(account: string, blockId?: number): Promise<unknown[]>;
};

export type Persona = {
  id: string;
  name: string;
  balance: string;
  keys: number;
};

/** Only the local chain has these. They do not exist on a real network. */
export type DevControls = {
  personas: Persona[];
  setPersona(id: string): void;
  nowNs: bigint;
  advance(days: number): Promise<void>;
  reset(): Promise<void>;
  fooled: boolean;
  /** Whether the trustee is using the real model or the local keyword stand-in. */
  model: 'real' | 'stub';
  setFooled(on: boolean): Promise<void>;
};

/** Everything the app needs from a chain. Pages never talk to an RPC or a wallet directly. */
export type Chain = {
  network: 'local' | 'testnet';
  /** Who is acting. Null when nobody is signed in. */
  accountId: string | null;
  /** Bumps after every write, so pages reload what they show. */
  version: number;
  /** Names this chain's history, so browser caches never mix two chains. */
  scope: string;
  /** False when the chain cannot be reached. */
  online: boolean;

  view: ViewFn;
  /** One consistent reading: every view from it sees the same block, at the time it returns. */
  pinned(): Promise<{ view: ViewFn; nowNs: bigint }>;
  call(receiver: string, method: string, args?: object, deposit?: string): Promise<CallResult>;
  accessKeys(account: string): Promise<number>;
  client: ItemClient;

  /** Sends a public trust's request with no wallet. */
  publicAsk(trust: string, holder: string, amount: string, message: string): Promise<CallResult>;
  validators(): Promise<RawValidator[]>;
  /** Bytes the room key is derived from. Only this person can produce them. */
  roomSeed(trust: string): Promise<Uint8Array>;

  signIn(): Promise<void>;
  signOut(): Promise<void>;
  dev: DevControls | null;
};
