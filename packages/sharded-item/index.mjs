// The verification ladder from the Sharded NFT Items draft (T0 to T3), for anyone consuming NFTs
// whose tokens are NEAR accounts: House of Stake's leased names, Someday trusts, and others.
//
// https://github.com/houseofstake/tla-contracts/blob/main/docs/sharded-nft-items.md
//
// The two mistakes the draft warns about are made hard here. The collection is always pinned by the
// caller and never read from the item, and both halves of the pair are read at one final block.

export const SPEC = 'sharded-item-1.0.0';

export const Refusal = Object.freeze({
  NO_ITEM_INFO: 'no-item-info',
  UNKNOWN_SPEC: 'unknown-spec',
  WRONG_COLLECTION: 'wrong-collection',
  WRONG_IDENTITY: 'wrong-identity',
  NOT_INITIALISED: 'not-initialised',
  NOT_IN_COLLECTION: 'not-in-collection',
  TOKEN_MISMATCH: 'token-mismatch',
  /** The index claims a rotation the account never made. Do not retry. */
  INDEX_AHEAD: 'index-ahead',
  /** Same sequence, different owners. Do not retry. */
  CORRUPT: 'corrupt',
  /** The bound ran out while the two halves still disagreed. */
  DID_NOT_CONVERGE: 'did-not-converge',
  RPC_ERROR: 'rpc-error',
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** A small read-only client. Pass your own object with the same three methods to use another. */
export function reader(rpcUrl, fetchImpl = globalThis.fetch) {
  async function rpc(method, params) {
    const response = await fetchImpl(rpcUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 'sharded-item', method, params }),
    });
    const body = await response.json();
    if (body.error) throw new Error(body.error.data ?? body.error.message ?? 'rpc error');
    if (body.result?.error) throw new Error(body.result.error);
    return body.result;
  }
  const at = (blockId) => (blockId ? { block_id: blockId } : { finality: 'final' });
  return {
    async finalHeight() {
      return (await rpc('block', { finality: 'final' })).header.height;
    },
    async call(account, method, args = {}, blockId) {
      const result = await rpc('query', {
        request_type: 'call_function',
        account_id: account,
        method_name: method,
        args_base64: btoa(JSON.stringify(args)),
        ...at(blockId),
      });
      const text = new TextDecoder().decode(Uint8Array.from(result.result));
      return text ? JSON.parse(text) : null;
    },
    async accessKeys(account, blockId) {
      const result = await rpc('query', {
        request_type: 'view_access_key_list',
        account_id: account,
        ...at(blockId),
      });
      return result.keys;
    },
  };
}

/**
 * T0, free and offline. True if only `parent` could have created this id.
 * Enough for display and routing, and never for moving value.
 */
export function checkNamespace(tokenId, parent) {
  const suffix = `.${parent}`;
  if (!tokenId.endsWith(suffix)) return false;
  const label = tokenId.slice(0, -suffix.length);
  return label.length > 0 && !label.includes('.');
}

/** T1, one call. The collection's word only. Enough for listing, not for proof of ownership. */
export async function checkIndex(client, { collection, item }) {
  const token = await client.call(collection, 'nft_token', { token_id: item });
  return { tier: 'T1', member: token !== null, owner: token?.owner_id ?? null, token };
}

function compare(item, token, indexSeq, pinned, account) {
  if (item.spec !== SPEC) return { refusal: Refusal.UNKNOWN_SPEC };
  if (item.collection_id !== pinned) return { refusal: Refusal.WRONG_COLLECTION };
  if (item.token_id !== account) return { refusal: Refusal.WRONG_IDENTITY };
  if (!item.init) return { refusal: Refusal.NOT_INITIALISED };
  if (!token) return { refusal: Refusal.NOT_IN_COLLECTION };
  if (token.token_id !== item.token_id) return { refusal: Refusal.TOKEN_MISMATCH };
  if (token.owner_id === item.owner_id) return { agree: true };

  // The halves update in separate receipts, so a disagreement can be normal. Its direction decides.
  if (indexSeq === undefined || indexSeq === null) return { retry: true };
  const itemSeq = BigInt(item.rotation_seq);
  const seq = BigInt(indexSeq);
  if (itemSeq > seq) return { retry: true };
  if (itemSeq < seq) return { refusal: Refusal.INDEX_AHEAD };
  return { refusal: Refusal.CORRUPT };
}

/**
 * T2, the pair. Required before anything that moves value or grants authority.
 *
 * `collection` must come from your own configuration. Reading it from the item would let an
 * attacker supply both halves, and they would agree.
 *
 * `indexSequence` optionally names a collection view that returns its rotation_seq for a token, so
 * a disagreement can be typed by direction. Only use it if the collection and the item share a
 * rotation_epoch. Someday's collection calls this view `nft_item_rotation`.
 *
 * A pass says the account is authentic. `status` says whether it can currently act. Read both.
 */
export async function checkPair(client, { collection, item }, options = {}) {
  const { retries = 3, delayMs = 800, indexSequence = null } = options;
  for (let attempt = 0; ; attempt += 1) {
    let height;
    let info;
    let token;
    let indexSeq;
    try {
      height = await client.finalHeight();
      [info, token, indexSeq] = await Promise.all([
        client.call(item, 'nft_item_info', {}, height).catch(() => undefined),
        client.call(collection, 'nft_token', { token_id: item }, height),
        indexSequence
          ? client.call(collection, indexSequence, { token_id: item }, height).catch(() => undefined)
          : undefined,
      ]);
    } catch (error) {
      return { ok: false, tier: 'T2', refusal: Refusal.RPC_ERROR, detail: String(error) };
    }
    if (info === undefined || info === null) {
      return { ok: false, tier: 'T2', height, refusal: Refusal.NO_ITEM_INFO };
    }
    const verdict = compare(info, token, indexSeq, collection, item);
    if (verdict.refusal) {
      return { ok: false, tier: 'T2', height, refusal: verdict.refusal, item: info, token };
    }
    if (verdict.agree) {
      return {
        ok: true,
        tier: 'T2',
        height,
        owner: info.owner_id,
        status: info.status,
        rotationSeq: info.rotation_seq,
        item: info,
        token,
        attempts: attempt + 1,
      };
    }
    if (attempt >= retries) {
      return { ok: false, tier: 'T2', height, refusal: Refusal.DID_NOT_CONVERGE, item: info, token };
    }
    await sleep(delayMs);
  }
}

/**
 * T3, provenance. If the parent holds no key, its code alone decides what it can create, and a
 * parent with no keys can never gain one. That half of the proof is permanent. The other half can
 * change whenever the parent upgrades, which is what `config_epoch` makes visible, so a cached
 * proof must be re-checked whenever that number moves.
 */
export async function checkProvenance(client, { parent, cached = null }) {
  const keys = await client.accessKeys(parent);
  const sealed = keys.length === 0;
  const configEpoch = await client.call(parent, 'config_epoch').catch(() => null);
  return {
    tier: 'T3',
    parent,
    sealed,
    configEpoch,
    supported: configEpoch !== null,
    stale: cached !== null && cached.configEpoch !== configEpoch,
    horizon: sealed ? 're-read config_epoch' : 're-read keys and config_epoch',
  };
}
