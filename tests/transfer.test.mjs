// Every way a seller could try to keep something after the NFT moves.

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { near } from '../tools/localnet/chain.mjs';
import { ask, COLLECTION, DAY, mint, rails, setup, verdict, b64 } from './harness.mjs';

const YOCTO1 = 1n;
const transfer = (ctx, from, token_id, receiver_id) =>
  ctx.chain.call(from, COLLECTION, 'nft_transfer', { receiver_id, token_id }, { deposit: YOCTO1 });
const answer = (ctx, name, amount, extra) => {
  const r = ctx.enclave.last();
  return ctx.enclave.answer(r, verdict(r.input, name, amount, extra));
};
const pair = (ctx, trust) => ({
  item: ctx.chain.view(trust, 'nft_item_info'),
  token: ctx.chain.view(COLLECTION, 'nft_token', { token_id: trust }),
});

test('control passes on transfer: the old holder is refused, the new one is not', () => {
  const ctx = setup();
  const trust = mint(ctx);
  assert.equal(transfer(ctx, 'maya.testnet', trust, 'noah.testnet').value, true);

  assert.match(ask(ctx.chain, trust, 'maya.testnet').error, /Only the current holder/);
  assert.equal(ask(ctx.chain, trust, 'noah.testnet').pending, true);
});

test('the T2 pair agrees before and after a transfer', () => {
  const ctx = setup();
  const trust = mint(ctx);
  transfer(ctx, 'maya.testnet', trust, 'noah.testnet');
  const { item, token } = pair(ctx, trust);
  assert.equal(item.spec, 'sharded-item-1.0.0');
  assert.equal(item.collection_id, COLLECTION);
  assert.equal(item.token_id, trust);
  assert.equal(item.owner_id, token.owner_id);
  assert.equal(item.owner_id, 'noah.testnet');
  assert.equal(item.rotation_seq, '1');
  assert.equal(
    ctx.chain.view(COLLECTION, 'nft_item_rotation', { token_id: trust }),
    '1',
    'the collection reports the same sequence',
  );
});

test('a sale in the middle of a payout: the decision dies with the old holder', () => {
  const ctx = setup();
  const trust = mint(ctx);

  // Maya asks. While the trustee is deciding, she transfers the NFT.
  ask(ctx.chain, trust, 'maya.testnet');
  transfer(ctx, 'maya.testnet', trust, 'noah.testnet');

  const mayaBefore = ctx.chain.balance('maya.testnet');
  const noahBefore = ctx.chain.balance('noah.testnet');
  answer(ctx, 'approve', near(3));

  assert.equal(ctx.chain.balance('maya.testnet'), mayaBefore, 'the seller got nothing');
  assert.equal(ctx.chain.balance('noah.testnet'), noahBefore, 'and neither did the buyer');
  assert.equal(ctx.chain.view(trust, 'money').distributed, '0');
  const [d] = ctx.chain.view(trust, 'decisions', { limit: 1 });
  assert.equal(d.outcome, 'Voided');
  assert.equal(ctx.chain.view(trust, 'overview').counts.voided, 1);
});

test('the sealed memo about the last holder does not pass to the next', () => {
  const ctx = setup();
  const trust = mint(ctx);
  ask(ctx.chain, trust, 'maya.testnet');
  answer(ctx, 'refuse', 0, { memo: b64('notes about maya') });
  ask(ctx.chain, trust, 'maya.testnet');
  assert.equal(ctx.enclave.last().input.memo, b64('notes about maya'), 'the memo persists');
  answer(ctx, 'refuse', 0);

  transfer(ctx, 'maya.testnet', trust, 'noah.testnet');
  ask(ctx.chain, trust, 'noah.testnet');
  assert.equal(ctx.enclave.last().input.memo, null, 'the memo was wiped');
});

test('the seller cannot drain the trust: there is no method that pays them', () => {
  const ctx = setup();
  const trust = mint(ctx);
  for (const [method, args] of [
    ['withdraw', { amount: near(1).toString() }],
    ['set_holder', { holder: 'maya.testnet' }],
    ['rotate', { new_holder: 'maya.testnet', expected_seq: '0', expected_nonce: null }],
    ['init', {}],
  ]) {
    assert.equal(ctx.chain.call('maya.testnet', trust, method, args).ok, false, method);
  }
});

test('a trust has no access keys, so nothing can be planted before a sale', () => {
  const ctx = setup();
  assert.equal(ctx.chain.keys(mint(ctx)), 0);
});

test('a locked trust cannot move before maturity, and the index does not move either', () => {
  const ctx = setup();
  const trust = mint(ctx, { transfer: 'Locked' });
  assert.equal(transfer(ctx, 'maya.testnet', trust, 'noah.testnet').value, false);
  const { item, token } = pair(ctx, trust);
  assert.equal(item.owner_id, 'maya.testnet');
  assert.equal(token.owner_id, 'maya.testnet');
  assert.equal(ctx.chain.view(COLLECTION, 'entry', { token_id: trust }).moving, false);
});

test('after maturity a locked trust can move', () => {
  const ctx = setup();
  const trust = mint(ctx, { transfer: 'Locked', maturity_ns: (ctx.chain.now + DAY).toString() });
  ctx.chain.advance(2n * DAY);
  ctx.chain.call('stranger.testnet', trust, 'mature');
  assert.equal(transfer(ctx, 'maya.testnet', trust, 'noah.testnet').value, true);
});

test('only the holder can transfer, and it needs a 1 yocto confirmation', () => {
  const ctx = setup();
  const trust = mint(ctx);
  assert.match(transfer(ctx, 'stranger.testnet', trust, 'stranger.testnet').error, /Only the holder/);
  const noYocto = ctx.chain.call('maya.testnet', COLLECTION, 'nft_transfer', {
    receiver_id: 'noah.testnet',
    token_id: trust,
  });
  assert.equal(noYocto.ok, false);
});

test('nft_transfer_call is refused, so no contract can hold a trust between receipts', () => {
  const ctx = setup();
  const trust = mint(ctx);
  const r = ctx.chain.call(
    'maya.testnet',
    COLLECTION,
    'nft_transfer_call',
    { receiver_id: 'noah.testnet', token_id: trust, msg: '' },
    { deposit: YOCTO1 },
  );
  assert.match(r.error, /disabled/);
});

test('a sale is atomic: the buyer gets the trust and the seller gets paid', () => {
  const ctx = setup();
  const trust = mint(ctx);
  ctx.chain.call('maya.testnet', COLLECTION, 'list', { token_id: trust, price: near(7).toString() }, { deposit: YOCTO1 });

  const seller = ctx.chain.balance('maya.testnet');
  const buyer = ctx.chain.balance('noah.testnet');
  const r = ctx.chain.call(
    'noah.testnet',
    COLLECTION,
    'buy',
    { token_id: trust, expected_nonce: '0' },
    { deposit: near(7) },
  );
  assert.equal(r.value, true);
  assert.equal(ctx.chain.balance('maya.testnet') - seller, near(7));
  assert.equal(buyer - ctx.chain.balance('noah.testnet'), near(7));
  assert.equal(pair(ctx, trust).item.owner_id, 'noah.testnet');
});

test('a buyer is protected: a payout after they checked aborts the sale and refunds them', () => {
  const ctx = setup();
  const trust = mint(ctx);
  ctx.chain.call('maya.testnet', COLLECTION, 'list', { token_id: trust, price: near(7).toString() }, { deposit: YOCTO1 });
  const seen = ctx.chain.view(trust, 'overview').payout_nonce;

  // After the buyer looked, the seller takes a distribution.
  ask(ctx.chain, trust, 'maya.testnet');
  answer(ctx, 'approve', near(3));

  const before = ctx.chain.balance('noah.testnet');
  const r = ctx.chain.call(
    'noah.testnet',
    COLLECTION,
    'buy',
    { token_id: trust, expected_nonce: seen },
    { deposit: near(7) },
  );
  assert.equal(r.value, false);
  assert.equal(ctx.chain.balance('noah.testnet'), before, 'the buyer got their money back');
  assert.equal(pair(ctx, trust).item.owner_id, 'maya.testnet');
});

test('a sale pays the exact price and only while listed', () => {
  const ctx = setup();
  const trust = mint(ctx);
  const buy = (deposit) =>
    ctx.chain.call('noah.testnet', COLLECTION, 'buy', { token_id: trust, expected_nonce: '0' }, { deposit });
  assert.match(buy(near(7)).error, /Not for sale/);
  ctx.chain.call('maya.testnet', COLLECTION, 'list', { token_id: trust, price: near(7).toString() }, { deposit: YOCTO1 });
  assert.match(buy(near(6)).error, /exactly the price/);
  ctx.chain.call('maya.testnet', COLLECTION, 'unlist', { token_id: trust }, { deposit: YOCTO1 });
  assert.match(buy(near(7)).error, /Not for sale/);
});

test('a listing dies with a transfer, so an old price cannot be used later', () => {
  const ctx = setup();
  const trust = mint(ctx);
  ctx.chain.call('maya.testnet', COLLECTION, 'list', { token_id: trust, price: near(7).toString() }, { deposit: YOCTO1 });
  transfer(ctx, 'maya.testnet', trust, 'noah.testnet');
  assert.equal(ctx.chain.view(COLLECTION, 'entry', { token_id: trust }).listed, null);
});

test('the history records who held it and what each holder received', () => {
  const ctx = setup();
  const trust = mint(ctx);
  ask(ctx.chain, trust, 'maya.testnet');
  answer(ctx, 'approve', near(3));
  transfer(ctx, 'maya.testnet', trust, 'noah.testnet');
  ask(ctx.chain, trust, 'noah.testnet', { amount: near(2).toString() });
  answer(ctx, 'approve', near(2));

  const holders = ctx.chain.view(trust, 'holders');
  assert.equal(holders.length, 2);
  assert.equal(holders[0].holder, 'maya.testnet');
  assert.equal(holders[0].received, near(3).toString());
  assert.ok(holders[0].to_ns);
  assert.equal(holders[1].holder, 'noah.testnet');
  assert.equal(holders[1].received, near(2).toString());
  assert.equal(holders[1].to_ns, null);
});

test('the index follows the owner for enumeration', () => {
  const ctx = setup();
  const a = mint(ctx, {}, { label: 'one' });
  const b = mint(ctx, {}, { label: 'two' });
  assert.equal(ctx.chain.view(COLLECTION, 'nft_total_supply'), '2');
  assert.equal(ctx.chain.view(COLLECTION, 'nft_supply_for_owner', { account_id: 'maya.testnet' }), '2');
  transfer(ctx, 'maya.testnet', a, 'noah.testnet');
  const mine = ctx.chain.view(COLLECTION, 'nft_tokens_for_owner', { account_id: 'maya.testnet' });
  assert.deepEqual(mine.map((t) => t.token_id), [b]);
  const noah = ctx.chain.view(COLLECTION, 'nft_tokens_for_owner', { account_id: 'noah.testnet' });
  assert.deepEqual(noah.map((t) => t.token_id), [a]);
});

test('the NFT picture is drawn on chain and follows what the trust does', () => {
  const ctx = setup();
  const trust = mint(ctx);
  ask(ctx.chain, trust);
  answer(ctx, 'refuse', 0);
  const { token } = pair(ctx, trust);
  const svg = Buffer.from(token.metadata.media.split(',')[1], 'base64').toString();
  assert.match(svg, /^<svg/);
  assert.match(svg, /0 approved, 1 refused/);
  assert.match(token.metadata.description, /refused 1/);
});

test('titles cannot inject markup into the NFT picture', () => {
  const ctx = setup();
  const trust = mint(ctx, { title: '<script>alert(1)</script>' });
  const { token } = pair(ctx, trust);
  const svg = Buffer.from(token.metadata.media.split(',')[1], 'base64').toString();
  assert.doesNotMatch(svg, /<script>/);
});

test('only a real trust can write its card', () => {
  const ctx = setup();
  const r = ctx.chain.call('stranger.testnet', COLLECTION, 'push_card', {
    card: { approved: 99, refused: 0, letters_total: 0, letters_opened: 0, given: '0', matured: false },
  });
  assert.match(r.error, /Not a trust/);
});

test('a name cannot be taken twice, and a failed mint refunds the creator', () => {
  const ctx = setup();
  mint(ctx);
  const before = ctx.chain.balance('grandpa.testnet');
  assert.throws(() => mint(ctx), /name is taken/);
  assert.equal(ctx.chain.balance('grandpa.testnet'), before);

  assert.throws(
    () => mint(ctx, { rails: rails({ categories: 0 }) }, { label: 'other' }),
    /mint failed/,
  );
  assert.equal(ctx.chain.balance('grandpa.testnet'), before, 'the bad mint refunded in full');
  assert.equal(ctx.chain.view(COLLECTION, 'nft_total_supply'), '1');
});

test('invalid names are refused', () => {
  const ctx = setup();
  for (const label of ['A', 'has.dot', '-edge', 'edge-', 'UPPER', 'x'.repeat(33)]) {
    assert.throws(() => mint(ctx, {}, { label }), /mint failed/, label);
  }
});

test('the sealing key can only come from the enclave, and only once', () => {
  const ctx = setup();
  assert.equal(ctx.chain.view(COLLECTION, 'config').sealing_key, 'ab'.repeat(32));
  const again = ctx.chain.call('ops.testnet', COLLECTION, 'request_sealing_key', {}, { deposit: near(0.05) });
  assert.match(again.error, /already set/);
  const fake = ctx.chain.call('stranger.testnet', COLLECTION, 'on_sealing_key', {});
  assert.equal(fake.ok, false);
});

test('sealing the configuration ends the setup role for good', () => {
  const ctx = setup();
  const before = ctx.chain.view(COLLECTION, 'config_epoch');
  ctx.chain.call('ops.testnet', COLLECTION, 'seal_config');
  assert.equal(ctx.chain.view(COLLECTION, 'config').ops, null);
  assert.ok(ctx.chain.view(COLLECTION, 'config_epoch') > before);
  const cfg = ctx.chain.view(COLLECTION, 'config');
  const r = ctx.chain.call('ops.testnet', COLLECTION, 'set_trustee', { trustee: cfg.trustee, clear_key: true });
  assert.match(r.error, /before sealing/);
});

test('a trust stays pinned to the trustee it was created with', () => {
  const ctx = setup();
  const trust = mint(ctx);
  const cfg = ctx.chain.view(COLLECTION, 'config');
  ctx.chain.call('ops.testnet', COLLECTION, 'set_trustee', {
    trustee: { ...cfg.trustee, wasm_hash: 'ff'.repeat(32) },
    clear_key: false,
  });
  ask(ctx.chain, trust);
  assert.equal(ctx.enclave.last().args.source.WasmUrl.hash, 'c0'.repeat(32));
});
