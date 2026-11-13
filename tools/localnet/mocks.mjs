// Stand-ins for the two contracts outside this repo, written from their real sources: the NEAR
// staking pool and outlayer.near. They reproduce only the behaviour Someday depends on.

import { Chain, near, Panic } from './chain.mjs';

const UNSTAKE_DELAY_NS = 4n * 12n * 3_600n * 1_000_000_000n; // 4 epochs of 12 hours

/** A staking pool with the same methods as the official contract, plus test-only `accrue`. */
export function stakingPool(chain, id) {
  const stakers = new Map();
  const get = (who) => {
    if (!stakers.has(who)) stakers.set(who, { staked: 0n, unstaked: 0n, availableAt: 0n });
    return stakers.get(who);
  };
  const pool = {
    id,
    broken: false,
    /** Rewards arrive by the pool's share price rising, so the staked balance simply grows. */
    accrue(who, amount) {
      get(who).staked += amount;
      chain.get(id).balance += amount;
    },
    staked: (who) => get(who).staked,
    unstaked: (who) => get(who).unstaked,
  };
  chain.mock(id, (ctx) => {
    const { method, args, predecessor, deposit } = ctx;
    if (pool.broken && !ctx.view) throw new Panic('pool down');
    if (method === 'get_account') {
      const s = get(args.account_id);
      return {
        account_id: args.account_id,
        unstaked_balance: s.unstaked.toString(),
        staked_balance: s.staked.toString(),
        can_withdraw: chain.now >= s.availableAt,
      };
    }
    if (method === 'get_account_total_balance') {
      const s = get(args.account_id);
      return (s.staked + s.unstaked).toString();
    }
    const s = get(predecessor);
    if (method === 'deposit_and_stake') {
      s.staked += deposit;
      return undefined;
    }
    if (method === 'unstake') {
      const amount = BigInt(args.amount);
      s.staked -= amount;
      s.unstaked += amount;
      s.availableAt = chain.now + UNSTAKE_DELAY_NS;
      return undefined;
    }
    if (method === 'unstake_all') {
      s.unstaked += s.staked;
      s.staked = 0n;
      s.availableAt = chain.now + UNSTAKE_DELAY_NS;
      return undefined;
    }
    if (method === 'withdraw_all') {
      const amount = s.unstaked;
      s.unstaked = 0n;
      ctx.self.balance -= amount;
      const r = chain.receipt({
        predecessor: id,
        signer: ctx.signer,
        receiver: predecessor,
        actions: [{ type: 'transfer', amount }],
        tx: ctx.tx,
      });
      chain.queue.push(r);
      return undefined;
    }
    throw new Error(`pool method not modelled: ${method}`);
  }, { balance: near(1000) });
  return pool;
}

/**
 * OutLayer's request_execution: holds the payment, yields, and later returns the output. As in the
 * real contract, every failure reaches the caller as a successful `null`, and the unused payment
 * is refunded to `payer_account_id`.
 */
export function outlayer(chain, id = 'outlayer.testnet') {
  const state = { requests: [], next: 1 };
  const refund = (req, cost) => {
    const amount = req.payment > cost ? req.payment - cost : 0n;
    if (amount === 0n) return;
    chain.get(id).balance -= amount;
    chain.queue.push(
      chain.receipt({
        predecessor: id,
        signer: req.signer,
        receiver: req.args.payer_account_id ?? req.predecessor,
        actions: [{ type: 'transfer', amount }],
        tx: req.receipt.tx,
      }),
    );
  };
  chain.mock(id, (ctx) => {
    if (ctx.method !== 'request_execution') throw new Error(`not modelled: ${ctx.method}`);
    const request = {
      id: state.next++,
      predecessor: ctx.predecessor,
      signer: ctx.signer,
      args: ctx.args,
      input: JSON.parse(ctx.args.input_data),
      payment: ctx.deposit,
      receipt: ctx.receipt,
      done: false,
    };
    state.requests.push(request);
    return Chain.PENDING;
  });
  return {
    id,
    state,
    last: () => state.requests[state.requests.length - 1],
    pending: () => state.requests.filter((r) => !r.done),
    /** Returns the enclave's output, or `null` as every failure does. */
    answer(request, output, { cost = near(0.002) } = {}) {
      request.done = true;
      return chain.resume(request.receipt, output, () => refund(request, cost));
    },
  };
}
