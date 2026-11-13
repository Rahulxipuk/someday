// The verification ladder. Each forgery from the draft has a test.
// With LIVE=1 it also reads House of Stake's real collection on mainnet. Read-only.

import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  checkIndex,
  checkNamespace,
  checkPair,
  checkProvenance,
  reader,
  Refusal,
  SPEC,
} from '../packages/sharded-item/index.mjs';
import { nakamotoCoefficient, rankValidators } from '../packages/validators/validators.mjs';
import { COLLECTION, mint, setup } from './harness.mjs';

const ITEM = 'maya.registry.test';
const REGISTRY = 'registry.test';

const goodItem = (over = {}) => ({
  spec: SPEC,
  init: true,
  status: 'Active',
  collection_id: REGISTRY,
  token_id: ITEM,
  owner_id: 'maya.testnet',
  rotation_seq: '3',
  rotation_epoch: 0,
  ...over,
});
const goodToken = (over = {}) => ({ token_id: ITEM, owner_id: 'maya.testnet', ...over });

function client({ item = goodItem(), token = goodToken(), seq, keys = [], epoch = 4 } = {}) {
  const heights = [];
  return {
    heights,
    async finalHeight() {
      return 100;
    },
    async call(_account, method, _args, height) {
      heights.push(height);
      if (method === 'nft_item_info') return typeof item === 'function' ? item() : item;
      if (method === 'nft_token') return typeof token === 'function' ? token() : token;
      if (method === 'seq') return seq;
      if (method === 'config_epoch') return epoch;
      throw new Error('unknown');
    },
    async accessKeys() {
      return keys;
    },
  };
}

const pair = (c, options) => checkPair(c, { collection: REGISTRY, item: ITEM }, { delayMs: 1, ...options });

test('T0: only a direct child of the parent passes', () => {
  assert.equal(checkNamespace('maya.registry.hos', 'registry.hos'), true);
  assert.equal(checkNamespace('a.maya.registry.hos', 'registry.hos'), false, 'a grandchild');
  assert.equal(checkNamespace('evilregistry.hos', 'registry.hos'), false, 'a lookalike');
  assert.equal(checkNamespace('registry.hos', 'registry.hos'), false);
  assert.equal(checkNamespace('.registry.hos', 'registry.hos'), false);
});

test('T1 reports the index and claims nothing more', async () => {
  const r = await checkIndex(client(), { collection: REGISTRY, item: ITEM });
  assert.deepEqual([r.tier, r.member, r.owner], ['T1', true, 'maya.testnet']);
});

test('T2 passes when the pair agrees, and every read uses one block height', async () => {
  const c = client();
  const r = await pair(c);
  assert.equal(r.ok, true);
  assert.equal(r.owner, 'maya.testnet');
  assert.equal(r.status, 'Active');
  assert.ok(c.heights.every((h) => h === 100));
});

test('authentic is not the same as usable: status comes back for the caller to read', async () => {
  const r = await pair(client({ item: goodItem({ status: 'Frozen' }) }));
  assert.equal(r.ok, true);
  assert.equal(r.status, 'Frozen');
});

test('a contract that does not implement the view is refused', async () => {
  const c = client({
    item: () => {
      throw new Error('MethodNotFound');
    },
  });
  assert.equal((await pair(c)).refusal, Refusal.NO_ITEM_INFO);
});

test('an unknown spec is refused', async () => {
  assert.equal((await pair(client({ item: goodItem({ spec: 'other-1' }) }))).refusal, Refusal.UNKNOWN_SPEC);
});

test('a forgery naming another collection is refused', async () => {
  const r = await pair(client({ item: goodItem({ collection_id: 'evil.testnet' }) }));
  assert.equal(r.refusal, Refusal.WRONG_COLLECTION);
});

test('the collection is pinned by the caller: an attacker cannot supply both halves', async () => {
  const forged = goodItem({ collection_id: 'evil.testnet' });
  const r = await checkPair(client({ item: forged }), { collection: REGISTRY, item: ITEM });
  assert.equal(r.ok, false);
  assert.equal(r.refusal, Refusal.WRONG_COLLECTION);
});

test('an item answering for a token it is not is refused', async () => {
  const r = await pair(client({ item: goodItem({ token_id: 'other.registry.test' }) }));
  assert.equal(r.refusal, Refusal.WRONG_IDENTITY);
});

test('a parked item is refused', async () => {
  assert.equal((await pair(client({ item: goodItem({ init: false }) }))).refusal, Refusal.NOT_INITIALISED);
});

test('an account the collection never minted is refused', async () => {
  assert.equal((await pair(client({ token: null }))).refusal, Refusal.NOT_IN_COLLECTION);
});

test('a collection answering about another token is refused', async () => {
  const r = await pair(client({ token: goodToken({ token_id: 'other.registry.test' }) }));
  assert.equal(r.refusal, Refusal.TOKEN_MISMATCH);
});

test('an index that is catching up gets a bounded retry and then passes', async () => {
  let reads = 0;
  const c = client({
    item: goodItem({ owner_id: 'noah.testnet', rotation_seq: '4' }),
    token: () => goodToken({ owner_id: ++reads > 1 ? 'noah.testnet' : 'maya.testnet' }),
    seq: '3',
  });
  const r = await pair(c, { indexSequence: 'seq' });
  assert.equal(r.ok, true);
  assert.equal(r.attempts, 2);
});

test('an index that never catches up is refused once the bound runs out', async () => {
  const c = client({ item: goodItem({ owner_id: 'noah.testnet', rotation_seq: '4' }), seq: '3' });
  const r = await pair(c, { indexSequence: 'seq', retries: 2 });
  assert.equal(r.refusal, Refusal.DID_NOT_CONVERGE);
});

test('an index claiming a rotation the account never made is refused without retrying', async () => {
  const c = client({ item: goodItem({ owner_id: 'noah.testnet', rotation_seq: '2' }), seq: '3' });
  assert.equal((await pair(c, { indexSequence: 'seq' })).refusal, Refusal.INDEX_AHEAD);
});

test('equal sequences with different owners are corruption, refused without retrying', async () => {
  const c = client({ item: goodItem({ owner_id: 'noah.testnet' }), seq: '3' });
  assert.equal((await pair(c, { indexSequence: 'seq' })).refusal, Refusal.CORRUPT);
});

test('with no sequence to compare, a disagreement is retried and then refused', async () => {
  const c = client({ item: goodItem({ owner_id: 'noah.testnet' }) });
  assert.equal((await pair(c, { retries: 1 })).refusal, Refusal.DID_NOT_CONVERGE);
});

test('T3: a keyless parent is sealed, and a moved config_epoch marks a cached proof stale', async () => {
  const fresh = await checkProvenance(client({ keys: [] }), { parent: REGISTRY });
  assert.deepEqual([fresh.sealed, fresh.configEpoch, fresh.stale], [true, 4, false]);
  const later = await checkProvenance(client({ keys: [], epoch: 5 }), { parent: REGISTRY, cached: fresh });
  assert.equal(later.stale, true);
  const keyed = await checkProvenance(client({ keys: [{}] }), { parent: REGISTRY });
  assert.equal(keyed.sealed, false);
});

test('a real Someday trust passes the full pair check', async () => {
  const ctx = setup();
  const trust = mint(ctx);
  const local = {
    finalHeight: async () => 1,
    call: async (account, method, args) => ctx.chain.view(account, method, args),
    accessKeys: async (account) => Array.from({ length: ctx.chain.keys(account) }),
  };
  const r = await checkPair(local, { collection: COLLECTION, item: trust }, { indexSequence: 'nft_item_rotation' });
  assert.equal(r.ok, true, r.refusal);
  assert.equal(r.owner, 'maya.testnet');
  assert.equal(checkNamespace(trust, COLLECTION), true);
});

test('live: House of Stake names pass on mainnet', { skip: !process.env.LIVE }, async () => {
  const hos = reader('https://rpc.mainnet.fastnear.com');
  const item = 'ak-hog-hos.mainnet';
  const r = await checkPair(hos, { collection: 'registry.hos', item });
  assert.equal(r.ok, true, r.refusal);
  console.log(`  ${item}: owner ${r.owner}, status ${r.status}, block ${r.height}`);
  const forged = await checkPair(hos, { collection: 'registry.hos', item: 'nonexistent-name.hos' }, { retries: 0 });
  assert.equal(forged.ok, false);
  console.log(`  a name it never minted: refused (${forged.refusal})`);
});

// ---- validator choice ----

const NEAR = 10n ** 24n;
const v = (account_id, stake, produced = 100, expected = 100, fee) => ({
  account_id,
  stake: (BigInt(stake) * NEAR).toString(),
  num_produced_blocks: produced,
  num_expected_blocks: expected,
  fee,
});

test('stake goes to healthy smaller validators, never to the largest group', () => {
  const ranked = rankValidators([
    v('giant', 500),
    v('large', 300),
    v('mid', 100),
    v('small', 60),
    v('tiny-down', 40, 50, 100),
  ]);
  assert.equal(ranked[0].account_id, 'small', 'the smallest healthy validator comes first');
  assert.equal(ranked[1].account_id, 'mid');
  assert.equal(ranked.find((x) => x.account_id === 'giant').recommended, false);
  assert.equal(ranked.find((x) => x.account_id === 'tiny-down').recommended, false, 'unhealthy');
});

test('a high commission is not recommended, however small the validator', () => {
  const ranked = rankValidators([v('giant', 900), v('greedy', 50, 100, 100, 40), v('fair', 50, 100, 100, 5)]);
  assert.equal(ranked[0].account_id, 'fair');
  assert.equal(ranked.find((x) => x.account_id === 'greedy').recommended, false);
});

test('the Nakamoto coefficient counts how many validators reach a third of the stake', () => {
  assert.equal(nakamotoCoefficient([v('a', 500), v('b', 300), v('c', 200)]), 1);
  assert.equal(nakamotoCoefficient([v('a', 25), v('b', 25), v('c', 25), v('d', 25)]), 2);
});
