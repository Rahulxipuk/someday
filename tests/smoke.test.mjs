import assert from 'node:assert/strict';
import { test } from 'node:test';
import { near, toNear } from '../tools/localnet/chain.mjs';
import { ask, COLLECTION, mint, setup, verdict } from './harness.mjs';

test('smoke: mint, ask, approve, pay', () => {
  const ctx = setup();
  const { chain, enclave, pool } = ctx;
  const trust = mint(ctx);

  assert.equal(chain.keys(trust), 0, 'a trust has no access keys');
  const token = chain.view(COLLECTION, 'nft_token', { token_id: trust });
  assert.equal(token.owner_id, 'maya.testnet');
  assert.ok(pool.staked(trust) > 0n, 'the endowment was staked');

  const asked = ask(chain, trust);
  assert.ok(asked.pending, 'waiting for the enclave');

  const before = chain.balance('maya.testnet');
  const request = enclave.last();
  const done = enclave.answer(request, verdict(request.input, 'approve', near(3)));
  assert.ok(chain.balance('maya.testnet') > before, 'holder was paid');
  console.log('paid', toNear(chain.balance('maya.testnet') - before), 'logs', done.logs.length);

  const overview = chain.view(trust, 'overview');
  assert.equal(overview.counts.approved, 1);
});
