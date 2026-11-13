// The trust's promises, tested against the real compiled wasm.
// Each test names the property it protects.

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { near } from '../tools/localnet/chain.mjs';
import {
  ask,
  b64,
  CATEGORY,
  COLLECTION,
  DAY,
  mint,
  POOL,
  rails,
  setup,
  verdict,
} from './harness.mjs';

const decide = (ctx, name, amount, extra) => {
  const request = ctx.enclave.last();
  return ctx.enclave.answer(request, verdict(request.input, name, amount, extra));
};
const money = (ctx, trust) => ctx.chain.view(trust, 'money');
const overview = (ctx, trust) => ctx.chain.view(trust, 'overview');
const latest = (ctx, trust) => ctx.chain.view(trust, 'decisions', { limit: 1 })[0];

// ---- who can ask ----

test('only the current holder can ask', () => {
  const ctx = setup();
  const trust = mint(ctx);
  const r = ask(ctx.chain, trust, 'stranger.testnet', { payee: 'stranger.testnet' });
  assert.equal(r.ok, false);
  assert.match(r.error, /Only the current holder/);
  assert.equal(ctx.enclave.state.requests.length - 1, 0, 'the enclave was never called');
});

test('a category outside the rails is refused before the enclave is paid', () => {
  const ctx = setup();
  const trust = mint(ctx);
  const r = ask(ctx.chain, trust, 'maya.testnet', { category: CATEGORY.business });
  assert.match(r.error, /category is not allowed/);
});

test('a payee outside the rails is refused, so a fooled trustee cannot redirect money', () => {
  const ctx = setup();
  const trust = mint(ctx);
  const r = ask(ctx.chain, trust, 'maya.testnet', { payee: 'stranger.testnet' });
  assert.match(r.error, /payee is not allowed/);
});

test('a provider-only trust pays the provider, never the holder', () => {
  const ctx = setup();
  const trust = mint(ctx, { rails: rails({ payees: { Providers: ['school.testnet'] } }) });
  assert.match(ask(ctx.chain, trust).error, /payee is not allowed/);

  const before = ctx.chain.balance('school.testnet');
  ask(ctx.chain, trust, 'maya.testnet', { payee: 'school.testnet' });
  decide(ctx, 'approve', near(3));
  assert.equal(ctx.chain.balance('school.testnet') - before, near(3));
});

test('the cooldown and the request limit hold', () => {
  const ctx = setup();
  const trust = mint(ctx, {
    rails: rails({ cooldown_ns: DAY.toString(), max_requests_per_period: 2 }),
  });
  ask(ctx.chain, trust);
  decide(ctx, 'refuse', 0);
  assert.match(ask(ctx.chain, trust).error, /cooldown/);

  ctx.chain.advance(DAY);
  ask(ctx.chain, trust);
  decide(ctx, 'refuse', 0);
  ctx.chain.advance(DAY);
  assert.match(ask(ctx.chain, trust).error, /No more requests/);

  ctx.chain.advance(30n * DAY);
  assert.equal(ask(ctx.chain, trust).pending, true, 'a new period resets the limit');
});

test('one decision at a time', () => {
  const ctx = setup();
  const trust = mint(ctx);
  ask(ctx.chain, trust);
  assert.match(ask(ctx.chain, trust).error, /still deciding/);
});

// ---- the trustee is bounded ----

test('a refusal moves nothing', () => {
  const ctx = setup();
  const trust = mint(ctx);
  const before = ctx.chain.balance('maya.testnet');
  ask(ctx.chain, trust);
  decide(ctx, 'refuse', near(3));
  assert.equal(ctx.chain.balance('maya.testnet'), before);
  assert.equal(latest(ctx, trust).outcome, 'Refused');
  assert.equal(overview(ctx, trust).counts.refused, 1);
});

test('asking for more detail moves nothing', () => {
  const ctx = setup();
  const trust = mint(ctx);
  const before = ctx.chain.balance('maya.testnet');
  ask(ctx.chain, trust);
  decide(ctx, 'more', 0);
  assert.equal(ctx.chain.balance('maya.testnet'), before);
  assert.equal(latest(ctx, trust).outcome, 'NeedsMore');
});

test('a fully fooled trustee approving everything is clamped to max_per_request', () => {
  const ctx = setup();
  const trust = mint(ctx);
  const before = ctx.chain.balance('maya.testnet');
  ask(ctx.chain, trust, 'maya.testnet', { amount: near(1000).toString() });
  decide(ctx, 'approve', near(1000));
  assert.equal(ctx.chain.balance('maya.testnet') - before, near(5));
  const d = latest(ctx, trust);
  assert.equal(d.outcome, 'Clamped');
  assert.equal(d.decided, near(1000).toString());
  assert.equal(d.granted, near(5).toString());
});

test('the trustee can never grant more than was asked', () => {
  const ctx = setup();
  const trust = mint(ctx);
  const before = ctx.chain.balance('maya.testnet');
  ask(ctx.chain, trust, 'maya.testnet', { amount: near(1).toString() });
  decide(ctx, 'approve', near(5));
  assert.equal(ctx.chain.balance('maya.testnet') - before, near(1));
});

test('repeated approvals stop at max_per_period', () => {
  const ctx = setup();
  const trust = mint(ctx, { liquid_target: near(14).toString() });
  const before = ctx.chain.balance('maya.testnet');
  for (let i = 0; i < 3; i++) {
    ask(ctx.chain, trust, 'maya.testnet', { amount: near(5).toString() });
    decide(ctx, 'approve', near(5));
  }
  assert.equal(ctx.chain.balance('maya.testnet') - before, near(8), 'only 8 of 15 was paid');
  assert.equal(overview(ctx, trust).window_spent, near(8).toString());
});

test('the floor holds: the trust never pays below it, even when the trustee approves', () => {
  const ctx = setup();
  const trust = mint(ctx, {
    rails: rails({
      principal_floor: near(10).toString(),
      max_per_request: near(30).toString(),
      max_per_period: near(30).toString(),
    }),
    liquid_target: near(24).toString(),
  }, { funding: near(25) });
  const start = money(ctx, trust);
  ask(ctx.chain, trust, 'maya.testnet', { amount: near(30).toString() });
  decide(ctx, 'approve', near(30));
  const after = money(ctx, trust);
  assert.ok(BigInt(after.assets) >= near(10), `assets ${after.assets} fell below the floor`);
  assert.ok(BigInt(after.distributed) < BigInt(start.assets), 'not everything left');
});

test('with nothing above the floor the trust waits for yield instead of eating principal', () => {
  const ctx = setup();
  const trust = mint(ctx, {
    rails: rails({ principal_floor: near(25).toString() }),
    liquid_target: near(24).toString(),
  });
  assert.match(ask(ctx.chain, trust).error, /Nothing above the floor/);
  const info = ctx.chain.view(trust, 'nft_item_info');
  assert.equal(info.status, 'Frozen');
});

test('a null answer moves nothing, and the deposit returns', () => {
  const ctx = setup();
  const trust = mint(ctx);
  const before = money(ctx, trust).liquid;
  ask(ctx.chain, trust);
  ctx.enclave.answer(ctx.enclave.last(), null);
  assert.equal(latest(ctx, trust).outcome, 'NoAnswer');
  assert.equal(overview(ctx, trust).pending, null);
  const lost = BigInt(before) - BigInt(money(ctx, trust).liquid);
  assert.ok(lost < near(0.01), `lost ${lost}`);
});

test('garbage from the enclave is treated as no answer', () => {
  const ctx = setup();
  const trust = mint(ctx);
  ask(ctx.chain, trust);
  ctx.enclave.answer(ctx.enclave.last(), { hello: 'world' });
  assert.equal(latest(ctx, trust).outcome, 'NoAnswer');
});

test('an answer for another trust or another request is refused', () => {
  const ctx = setup();
  const trust = mint(ctx);
  ask(ctx.chain, trust);
  const r = ctx.enclave.last();
  ctx.enclave.answer(r, verdict({ ...r.input, id: '999' }, 'approve', near(3)));
  assert.equal(latest(ctx, trust).outcome, 'NoAnswer');

  ask(ctx.chain, trust);
  const r2 = ctx.enclave.last();
  ctx.enclave.answer(r2, verdict({ ...r2.input, trust: 'other.testnet' }, 'approve', near(3)));
  assert.equal(latest(ctx, trust).outcome, 'NoAnswer');
});

test('nobody can call the callback directly', () => {
  const ctx = setup();
  const trust = mint(ctx);
  for (const who of ['maya.testnet', 'stranger.testnet']) {
    const r = ctx.chain.call(who, trust, 'on_decision', { id: '1' });
    assert.equal(r.ok, false);
    assert.match(r.error, /private/i);
  }
});

test('a bounced payment keeps the money and the books stay true', () => {
  const ctx = setup();
  const trust = mint(ctx, { rails: rails({ payees: { HolderOrProviders: ['ghost.testnet'] } }) });
  const before = money(ctx, trust);
  ask(ctx.chain, trust, 'maya.testnet', { payee: 'ghost.testnet' });
  decide(ctx, 'approve', near(3));
  const after = money(ctx, trust);
  assert.equal(latest(ctx, trust).outcome, 'PayoutFailed');
  assert.equal(after.distributed, '0');
  assert.equal(overview(ctx, trust).window_spent, '0');
  assert.ok(BigInt(after.assets) > BigInt(before.assets) - near(0.1));
});

test('a stuck decision cannot freeze the trust forever', () => {
  const ctx = setup();
  const trust = mint(ctx);
  ask(ctx.chain, trust);
  const lost = ctx.enclave.last();
  ctx.chain.advance(31n * 60n * 1_000_000_000n);
  assert.equal(ask(ctx.chain, trust).pending, true, 'a new request is accepted');

  ctx.enclave.answer(lost, verdict(lost.input, 'approve', near(3)));
  assert.equal(money(ctx, trust).distributed, '0', 'the lost answer pays nothing');
  assert.ok(overview(ctx, trust).pending, 'the newer decision is still pending');
});

// ---- status never lies ----

test('nft_item_info reports Active exactly when a request would be accepted', () => {
  const ctx = setup();
  const trust = mint(ctx, { rails: rails({ cooldown_ns: DAY.toString() }) });
  assert.equal(ctx.chain.view(trust, 'nft_item_info').status, 'Active');
  ask(ctx.chain, trust);
  assert.equal(ctx.chain.view(trust, 'nft_item_info').status, 'Suspended');
  decide(ctx, 'refuse', 0);
  assert.equal(ctx.chain.view(trust, 'nft_item_info').status, 'Suspended');
  ctx.chain.advance(DAY);
  assert.equal(ctx.chain.view(trust, 'nft_item_info').status, 'Active');
  assert.equal(ask(ctx.chain, trust).pending, true);
});

// ---- sealed letters ----

const LETTERS = [
  { title: 'When you graduate', gift: near(2).toString(), cipher: b64('sealed letter one') },
  { title: 'When you need courage', gift: '0', cipher: b64('sealed letter two') },
];

test('a milestone opens its letter once and pays its gift once', () => {
  const ctx = setup();
  const trust = mint(ctx, { letters: LETTERS });
  const before = ctx.chain.balance('maya.testnet');
  ask(ctx.chain, trust, 'maya.testnet', { kind: { Milestone: { index: 0 } } });
  assert.equal(ctx.enclave.last().input.letter, b64('sealed letter one'), 'only this letter is sent');
  decide(ctx, 'approve', 0, { letter: 'opened for maya' });

  assert.equal(ctx.chain.balance('maya.testnet') - before, near(2));
  const [first, second] = ctx.chain.view(trust, 'letters');
  assert.equal(first.opened, 'opened for maya');
  assert.equal(second.is_open, false);

  const again = ask(ctx.chain, trust, 'maya.testnet', { kind: { Milestone: { index: 0 } } });
  assert.match(again.error, /already been opened/);
});

test('a refused milestone stays sealed', () => {
  const ctx = setup();
  const trust = mint(ctx, { letters: LETTERS });
  ask(ctx.chain, trust, 'maya.testnet', { kind: { Milestone: { index: 0 } } });
  decide(ctx, 'refuse', 0);
  assert.equal(ctx.chain.view(trust, 'letters')[0].is_open, false);
});

test('an approval with no letter releases nothing', () => {
  const ctx = setup();
  const trust = mint(ctx, { letters: LETTERS });
  const before = ctx.chain.balance('maya.testnet');
  ask(ctx.chain, trust, 'maya.testnet', { kind: { Milestone: { index: 0 } } });
  decide(ctx, 'approve', 0);
  assert.equal(ctx.chain.balance('maya.testnet'), before);
  assert.equal(ctx.chain.view(trust, 'letters')[0].is_open, false);
});

test('opening the largest letter never runs the trust out of storage', () => {
  const ctx = setup();
  const big = 'x'.repeat(2900);
  const trust = mint(ctx, {
    letters: Array.from({ length: 8 }, (_, i) => ({
      title: `Letter ${i}`,
      gift: '0',
      cipher: b64(big),
    })),
    rails: rails({ principal_floor: '0' }),
  });
  for (let i = 0; i < 8; i++) {
    ask(ctx.chain, trust, 'maya.testnet', { kind: { Milestone: { index: i } }, amount: '0' });
    const r = decide(ctx, 'approve', 0, { letter: 'L'.repeat(5400), reply: 'R'.repeat(1400) });
    assert.deepEqual(r.failures, [], `letter ${i}`);
  }
  assert.equal(ctx.chain.view(trust, 'letters').filter((l) => l.is_open).length, 8);
});

// ---- money and yield ----

test('money stakes on creation and yield is counted from the pool alone', () => {
  const ctx = setup();
  const trust = mint(ctx);
  assert.ok(ctx.pool.staked(trust) >= near(18), 'most of the endowment works');

  ctx.pool.accrue(trust, near(1));
  ctx.chain.call('stranger.testnet', trust, 'rebalance');
  assert.equal(money(ctx, trust).yield_earned, near(1).toString());

  // A refund from the enclave must not look like income.
  ask(ctx.chain, trust);
  decide(ctx, 'refuse', 0);
  assert.equal(money(ctx, trust).yield_earned, near(1).toString());
});

test('the fees shown are what the enclave actually charged, not what was attached', () => {
  const ctx = setup();
  const trust = mint(ctx);
  const before = BigInt(money(ctx, trust).fees_paid);
  for (let i = 0; i < 3; i++) {
    ask(ctx.chain, trust);
    decide(ctx, 'refuse', 0);
  }
  const fees = BigInt(money(ctx, trust).fees_paid) - before;
  assert.ok(fees === near(0.006), `charged 3 x 0.002 NEAR, books say ${fees}`);
});

test('anyone can rebalance: idle money gets staked', () => {
  const ctx = setup();
  const trust = mint(ctx);
  const before = ctx.pool.staked(trust);
  ctx.chain.call('stranger.testnet', trust, 'contribute', {}, { deposit: near(10) });
  ctx.chain.call('stranger.testnet', trust, 'rebalance');
  assert.ok(ctx.pool.staked(trust) - before >= near(10));
  assert.equal(money(ctx, trust).deposits, near(24.95 + 10).toString());
});

test('when the liquid sleeve runs low, anyone can top it up from the pool', () => {
  const ctx = setup();
  const trust = mint(ctx);
  for (let i = 0; i < 2; i++) {
    ask(ctx.chain, trust, 'maya.testnet', { amount: near(5).toString() });
    decide(ctx, 'approve', i === 0 ? near(5) : near(3));
    ctx.chain.advance(31n * DAY);
  }
  assert.ok(BigInt(money(ctx, trust).liquid) < near(1), 'the sleeve is low');

  ctx.chain.call('stranger.testnet', trust, 'rebalance');
  assert.ok(ctx.pool.unstaked(trust) > 0n, 'unstaking began');

  ctx.chain.call('stranger.testnet', trust, 'rebalance');
  assert.ok(ctx.pool.unstaked(trust) > 0n, 'it cannot be withdrawn early');

  ctx.chain.advance(3n * DAY);
  ctx.chain.call('stranger.testnet', trust, 'rebalance');
  assert.equal(ctx.pool.unstaked(trust), 0n);
  assert.ok(BigInt(money(ctx, trust).liquid) > near(4), 'the sleeve is full again');
});

test('a failing pool loses nothing', () => {
  const ctx = setup();
  ctx.pool.broken = true;
  const trust = mint(ctx);
  const m = money(ctx, trust);
  assert.equal(m.in_pool, '0');
  assert.ok(BigInt(m.liquid) > near(24), 'the money stayed liquid');
  ctx.pool.broken = false;
  ctx.chain.call('stranger.testnet', trust, 'rebalance');
  assert.ok(ctx.pool.staked(trust) >= near(18));
});

// ---- maturity ----

test('nobody can stop maturity, and nobody can trigger it early', () => {
  const ctx = setup();
  const trust = mint(ctx);
  assert.match(ctx.chain.call('stranger.testnet', trust, 'mature').error, /has not arrived/);
  ctx.chain.advance(3651n * DAY);
  assert.equal(ctx.chain.call('stranger.testnet', trust, 'mature').ok, true);
  assert.equal(overview(ctx, trust).stage, 'Matured');
  assert.match(ask(ctx.chain, trust).error, /matured/);
});

test('after maturity the holder gets everything, staked money included', () => {
  const ctx = setup();
  const trust = mint(ctx);
  ctx.pool.accrue(trust, near(1));
  ctx.chain.advance(3651n * DAY);
  ctx.chain.call('stranger.testnet', trust, 'mature');
  ctx.chain.call('stranger.testnet', trust, 'rebalance'); // unstake everything
  ctx.chain.advance(3n * DAY);
  ctx.chain.call('stranger.testnet', trust, 'rebalance'); // withdraw it

  const before = ctx.chain.balance('maya.testnet');
  assert.equal(ctx.chain.call('maya.testnet', trust, 'claim').ok, true);
  const got = ctx.chain.balance('maya.testnet') - before;
  assert.ok(got > near(25), `got ${got}`);
  assert.ok(ctx.chain.balance(trust) < near(0.5), 'only the storage reserve remains');
});

test('claiming before maturity is refused, for everyone', () => {
  const ctx = setup();
  const trust = mint(ctx);
  assert.match(ctx.chain.call('maya.testnet', trust, 'claim').error, /has not matured/);
});

// ---- worst case ----

test('worst_case tells the truth: a full attack cannot lose more than it says', () => {
  const ctx = setup();
  const trust = mint(ctx, {
    maturity_ns: (ctx.chain.now + 60n * DAY).toString(),
    letters: [LETTERS[0]],
    liquid_target: near(24).toString(),
    rails: rails({ principal_floor: near(4).toString() }),
  });
  const wc = ctx.chain.view(trust, 'worst_case');
  assert.equal(wc.per_period, near(8).toString());
  assert.equal(wc.one_time_gifts, near(2).toString());
  assert.equal(wc.until_maturity, (near(8) * 2n + near(2)).toString());

  const start = BigInt(money(ctx, trust).assets);
  let spent = 0n;
  for (let period = 0; period < 2; period++) {
    for (let i = 0; i < 4; i++) {
      const before = ctx.chain.balance('maya.testnet');
      ask(ctx.chain, trust, 'maya.testnet', { amount: near(5).toString() });
      decide(ctx, 'approve', near(5));
      spent += ctx.chain.balance('maya.testnet') - before;
    }
    ctx.chain.advance(30n * DAY);
  }
  assert.ok(spent <= near(16), `drained ${spent}`);
  assert.ok(BigInt(money(ctx, trust).assets) >= start - near(16) - near(1));
});

test('the trust names its pool and only official pools are accepted', () => {
  const ctx = setup();
  assert.equal(money(ctx, mint(ctx)).pool, POOL);
  const r = ctx.chain.call(
    'grandpa.testnet',
    COLLECTION,
    'create_trust',
    {
      label: 'fake',
      terms: {
        title: 'x',
        holder: 'maya.testnet',
        rails: rails(),
        maturity_ns: (ctx.chain.now + DAY).toString(),
        transfer: 'Free',
        pool: 'evil.testnet',
        liquid_target: near(1).toString(),
        public_room: false,
        wishes: b64('x'),
        letters: [],
      },
    },
    { deposit: near(5) },
  );
  assert.match(r.error, /official staking pool/);
});

test('rails cannot be set inconsistently', () => {
  const ctx = setup();
  const bad = rails({ max_per_request: near(9).toString(), max_per_period: near(8).toString() });
  assert.throws(() => mint(ctx, { rails: bad }), /mint failed/);
  assert.equal(ctx.chain.exists(`maya.${COLLECTION}`), false, 'the failed account never existed');
});
