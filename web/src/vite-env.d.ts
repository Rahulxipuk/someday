/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NETWORK?: string;
  readonly VITE_COLLECTION_ID?: string;
  readonly VITE_PUBLIC_TRUST?: string;
  readonly VITE_LOCAL_RPC?: string;
  readonly VITE_RPC_URL?: string;
  readonly VITE_RELAY_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** The verification ladder, shared with anyone else who consumes NFT accounts. */
declare module '*/packages/sharded-item/index.mjs' {
  type Client = import('./chain/types').ItemClient;
  export const Refusal: Readonly<Record<string, string>>;
  export type Pair = {
    ok: boolean;
    tier: 'T2';
    height?: number;
    refusal?: string;
    detail?: string;
    owner?: string;
    status?: string;
    rotationSeq?: string;
    item?: { owner_id: string; rotation_seq: string };
    token?: { owner_id: string; token_id: string } | null;
  };
  export function checkNamespace(tokenId: string, parent: string): boolean;
  export function checkPair(
    client: Client,
    target: { collection: string; item: string },
    options?: { retries?: number; delayMs?: number; indexSequence?: string | null },
  ): Promise<Pair>;
  export function checkProvenance(
    client: Client,
    target: { parent: string; cached?: { configEpoch: number } | null },
  ): Promise<{ sealed: boolean; configEpoch: number | null; supported: boolean; stale: boolean; horizon: string }>;
  export function reader(rpcUrl: string, fetchImpl?: typeof fetch): Client;
}

/** Chooses where a trust's stake goes, in NEAR's favour. */
declare module '*/packages/validators/validators.mjs' {
  type Raw = import('./chain/types').RawValidator;
  export type Ranked = {
    account_id: string;
    stakeNear: number;
    share: number;
    uptime: number | null;
    fee: number | null;
    inBlockingSet: boolean;
    healthy: boolean;
    recommended: boolean;
  };
  export function rankValidators(validators: Raw[], options?: { minUptime?: number; maxFee?: number }): Ranked[];
  export function fetchValidators(rpcUrl: string, fetchImpl?: typeof fetch): Promise<Raw[]>;
}

/** The browser crypto is plain JavaScript in packages/sealbox, shared with the tests. */
declare module '*/packages/sealbox/sealbox.mjs' {
  export const contexts: {
    wishes(trust: string): string;
    letter(trust: string, index: number): string;
    message(trust: string, holder: string): string;
    reply(trust: string, id: string): string;
    opened(trust: string, index: number): string;
  };
  export function seal(recipientHex: string, context: string, plain: string | Uint8Array): Uint8Array;
  export function open(secret: Uint8Array, context: string, box: Uint8Array): Uint8Array;
  export function openText(secret: Uint8Array, context: string, box: Uint8Array): string;
  export function newKeyPair(): { secret: Uint8Array; publicHex: string };
  export function publicKeyOf(secret: Uint8Array): string;
  export function toHex(bytes: Uint8Array): string;
  export function fromHex(hex: string): Uint8Array;
  export function toBase64(bytes: Uint8Array): string;
  export function fromBase64(b64: string): Uint8Array;
}
