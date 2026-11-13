// Shared set-up: a local chain with the real compiled contracts, a mock pool and a mock OutLayer.

import { readFileSync } from 'node:fs';
import { Chain, near } from '../tools/localnet/chain.mjs';
import { outlayer, stakingPool } from '../tools/localnet/mocks.mjs';

const TRUST_WASM = readFileSync('target/near/someday_trust/someday_trust.wasm');
const COLLECTION_WASM = readFileSync('target/near/someday_collection/someday_collection.wasm');

export const COLLECTION = 'someday.testnet';
export const POOL = 'small.pool.f863973.m0';
export const SEALING_KEY = 'ab'.repeat(32);
export const DAY = 86_400n * 1_000_000_000n;
export const b64 = (s) => Buffer.from(s).toString('base64');

export const TRUSTEE = {
  outlayer: 'outlayer.testnet',
  wasm_url: 'https://example.test/trustee.wasm',
  wasm_hash: 'c0'.repeat(32),
  secrets_owner: COLLECTION,
  secrets_profile: 'someday',
  deposit: near(0.05).toString(),
  max_instructions: 3_000_000_000,
  max_memory_mb: 256,
  max_execution_seconds: 90,
};

export const CATEGORY = { learning: 0, health: 1, housing: 2, business: 3, emergency: 4 };

export function rails(overrides = {}) {
  return {
    max_per_request: near(5).toString(),
    max_per_period: near(8).toString(),
    period_ns: (30n * DAY).toString(),
    cooldown_ns: '0',
    max_requests_per_period: 10,
    principal_floor: near(10).toString(),
    categories: 0b11,
    payees: 'Holder',
    ...overrides,
  };
}

export function terms(chain, overrides = {}) {
  return {
    title: 'For Maya',
    holder: 'maya.testnet',
    rails: rails(),
    maturity_ns: (chain.now + 3650n * DAY).toString(),
    transfer: 'Free',
    pool: POOL,
    liquid_target: near(6).toString(),
    public_room: false,
    wishes: b64('sealed wishes ciphertext'),
    letters: [],
    ...overrides,
  };
}

/** A chain with the collection deployed and its sealing key set by a real enclave round trip. */
export function setup() {
  const chain = new Chain();
  for (const id of ['ops.testnet', 'grandpa.testnet', 'maya.testnet', 'noah.testnet', 'stranger.testnet', 'school.testnet']) {
    chain.account(id, near(500));
  }
  const pool = stakingPool(chain, POOL);
  const enclave = outlayer(chain);
  const trustCode = chain.publishGlobal(TRUST_WASM);

  chain.deploy(COLLECTION, COLLECTION_WASM);
  chain.get(COLLECTION).balance = near(50);
  const init = chain.call('ops.testnet', COLLECTION, 'new', {
    ops: 'ops.testnet',
    trust_code: trustCode,
    trustee: TRUSTEE,
    pool_suffix: '.pool.f863973.m0',
  });
  if (!init.ok) throw new Error(`collection init failed: ${init.error}`);

  chain.call('ops.testnet', COLLECTION, 'request_sealing_key', {}, { deposit: near(0.05) });
  enclave.answer(enclave.last(), { public_key: SEALING_KEY });

  return { chain, pool, enclave, trustCode };
}

/** Mints a trust and returns its account id. */
export function mint(ctx, overrides = {}, { label = 'maya', funding = near(25) } = {}) {
  const { chain } = ctx;
  const result = chain.call(
    'grandpa.testnet',
    COLLECTION,
    'create_trust',
    { label, terms: terms(chain, overrides) },
    { deposit: funding },
  );
  if (!result.ok || result.value !== true) {
    throw new Error(`mint failed: ${result.error ?? JSON.stringify(result.failures)}`);
  }
  return `${label}.${COLLECTION}`;
}

export function ask(chain, trust, from = 'maya.testnet', overrides = {}) {
  return chain.call(from, trust, 'request', {
    kind: 'Ask',
    amount: near(3).toString(),
    category: CATEGORY.learning,
    payee: from,
    message: b64('sealed message'),
    reply_key: null,
    ...overrides,
  });
}

export function verdict(input, verdictName, amount, extra = {}) {
  return {
    trust: input.trust,
    id: input.id,
    verdict: verdictName,
    amount: amount.toString(),
    reason: 1,
    reply: 'sealed reply',
    memo: null,
    letter: null,
    ...extra,
  };
}
