// A small NEAR-compatible host that runs the real compiled contracts in Node, with no neard.
//
// What it models: registers, storage, promises and callbacks, receipts that run one at a time,
// failed receipts refunding their deposit, batch actions that roll back together, storage staking,
// access keys, global contracts, and an execution that can stay pending (like OutLayer's yield).
//
// What it does not model: gas metering, shards, or block-level receipt timing. Gas limits are only
// checked on a real network.

import { createHash } from 'node:crypto';

const enc = new TextEncoder();
const dec = new TextDecoder();
const U64_MAX = (1n << 64n) - 1n;

export const STORAGE_BYTE_COST = 10_000_000_000_000_000_000n;
export const YOCTO = 10n ** 24n;
export const near = (n) => (BigInt(Math.round(Number(n) * 1e6)) * YOCTO) / 1_000_000n;
export const toNear = (y) => Number(BigInt(y) / 10n ** 18n) / 1e6;

const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

export function base58encode(bytes) {
  let n = 0n;
  for (const b of bytes) n = n * 256n + BigInt(b);
  let out = '';
  while (n > 0n) {
    out = ALPHABET[Number(n % 58n)] + out;
    n /= 58n;
  }
  for (const b of bytes) {
    if (b !== 0) break;
    out = '1' + out;
  }
  return out;
}

export class Panic extends Error {}

const hex = (u8) => Buffer.from(u8).toString('hex');
const toBytes = (value) => {
  if (value === undefined) return new Uint8Array();
  if (value instanceof Uint8Array) return value;
  return enc.encode(JSON.stringify(value));
};

/** One run of a contract method: its registers, its storage overlay and the promises it creates. */
class Execution {
  constructor(chain, account, ctx) {
    this.chain = chain;
    this.account = account;
    this.ctx = ctx;
    this.registers = new Map();
    this.storage = new Map(account.storage);
    this.balance = account.balance;
    this.promises = [];
    this.logs = [];
    this.returned = undefined;
    this.returnPromise = null;
    this.memory = null;
  }

  mem() {
    return new Uint8Array(this.memory.buffer);
  }

  read(len, ptr) {
    const start = Number(ptr);
    return this.mem().slice(start, start + Number(len));
  }

  text(len, ptr) {
    return dec.decode(this.read(len, ptr));
  }

  writeU128(ptr, value) {
    const view = new DataView(this.memory.buffer, Number(ptr), 16);
    view.setBigUint64(0, value & U64_MAX, true);
    view.setBigUint64(8, value >> 64n, true);
  }

  readU128(ptr) {
    const view = new DataView(this.memory.buffer, Number(ptr), 16);
    return view.getBigUint64(0, true) + (view.getBigUint64(8, true) << 64n);
  }

  storageUsage() {
    let bytes = 100 + this.account.codeBytes;
    for (const [k, v] of this.storage) bytes += k.length / 2 + v.length + 40;
    return bytes;
  }

  promise(index) {
    const p = this.promises[Number(index)];
    if (!p) throw new Panic(`invalid promise index ${index}`);
    return p;
  }

  charge(amount) {
    if (amount > this.balance) {
      throw new Panic(`BalanceExceeded: ${this.account.id} has ${this.balance}, needs ${amount}`);
    }
    this.balance -= amount;
  }

  imports() {
    const self = this;
    const view = !!this.ctx.view;
    const refuseInView = (name) => {
      if (view) throw new Panic(`ProhibitedInView: ${name}`);
    };
    const impl = {
      read_register(id, ptr) {
        const reg = self.registers.get(id);
        if (!reg) throw new Panic(`InvalidRegisterId ${id}`);
        self.mem().set(reg, Number(ptr));
      },
      register_len(id) {
        const reg = self.registers.get(id);
        return reg ? BigInt(reg.length) : U64_MAX;
      },
      input(id) {
        self.registers.set(id, self.ctx.input);
      },
      current_account_id(id) {
        self.registers.set(id, enc.encode(self.account.id));
      },
      predecessor_account_id(id) {
        refuseInView('predecessor_account_id');
        self.registers.set(id, enc.encode(self.ctx.predecessor));
      },
      signer_account_id(id) {
        refuseInView('signer_account_id');
        self.registers.set(id, enc.encode(self.ctx.signer));
      },
      block_timestamp: () => self.chain.now,
      block_index: () => self.chain.height,
      storage_usage: () => BigInt(self.storageUsage()),
      account_balance: (ptr) => self.writeU128(ptr, self.balance),
      attached_deposit: (ptr) => self.writeU128(ptr, view ? 0n : self.ctx.deposit),
      sha256(len, ptr, id) {
        self.registers.set(id, createHash('sha256').update(self.read(len, ptr)).digest());
      },
      value_return(len, ptr) {
        self.returned = self.read(len, ptr);
      },
      panic_utf8(len, ptr) {
        throw new Panic(self.text(len, ptr));
      },
      log_utf8(len, ptr) {
        self.logs.push(self.text(len, ptr));
      },
      storage_write(klen, kptr, vlen, vptr, id) {
        refuseInView('storage_write');
        const key = hex(self.read(klen, kptr));
        const old = self.storage.get(key);
        self.storage.set(key, self.read(vlen, vptr));
        if (old) self.registers.set(id, old);
        return old ? 1n : 0n;
      },
      storage_read(klen, kptr, id) {
        const value = self.storage.get(hex(self.read(klen, kptr)));
        if (!value) return 0n;
        self.registers.set(id, value);
        return 1n;
      },
      storage_remove(klen, kptr, id) {
        refuseInView('storage_remove');
        const key = hex(self.read(klen, kptr));
        const old = self.storage.get(key);
        if (!old) return 0n;
        self.storage.delete(key);
        self.registers.set(id, old);
        return 1n;
      },
      storage_has_key(klen, kptr) {
        return self.storage.has(hex(self.read(klen, kptr))) ? 1n : 0n;
      },
      promise_batch_create(len, ptr) {
        refuseInView('promise_batch_create');
        self.promises.push({ receiver: self.text(len, ptr), actions: [], after: [] });
        return BigInt(self.promises.length - 1);
      },
      promise_batch_then(index, len, ptr) {
        refuseInView('promise_batch_then');
        self.promise(index);
        self.promises.push({ receiver: self.text(len, ptr), actions: [], after: [Number(index)] });
        return BigInt(self.promises.length - 1);
      },
      promise_and(ptr, count) {
        const view64 = new DataView(self.memory.buffer, Number(ptr), Number(count) * 8);
        const after = [];
        for (let i = 0; i < Number(count); i++) after.push(Number(view64.getBigUint64(i * 8, true)));
        self.promises.push({ receiver: null, actions: [], after, joint: true });
        return BigInt(self.promises.length - 1);
      },
      promise_return(index) {
        self.promise(index);
        self.returnPromise = Number(index);
      },
      promise_result(index, id) {
        const result = self.ctx.results?.[Number(index)];
        if (!result) throw new Panic(`InvalidPromiseResultIndex ${index}`);
        if (result.ok) {
          self.registers.set(id, result.value);
          return 1n;
        }
        return 2n;
      },
      promise_batch_action_create_account(index) {
        self.promise(index).actions.push({ type: 'create' });
      },
      promise_batch_action_transfer(index, amountPtr) {
        const amount = self.readU128(amountPtr);
        self.charge(amount);
        self.promise(index).actions.push({ type: 'transfer', amount });
      },
      promise_batch_action_use_global_contract(index, len, ptr) {
        self.promise(index).actions.push({ type: 'use_global', hash: hex(self.read(len, ptr)) });
      },
      promise_batch_action_function_call(index, mlen, mptr, alen, aptr, amountPtr, gas) {
        const amount = self.readU128(amountPtr);
        self.charge(amount);
        self.promise(index).actions.push({
          type: 'call',
          method: self.text(mlen, mptr),
          args: self.read(alen, aptr),
          deposit: amount,
          gas,
        });
      },
      promise_batch_action_function_call_weight(i, ml, mp, al, ap, amountPtr, gas) {
        impl.promise_batch_action_function_call(i, ml, mp, al, ap, amountPtr, gas);
      },
    };
    const env = new Proxy(impl, {
      get(target, name) {
        return (
          target[name] ??
          (() => {
            throw new Panic(`host function not implemented: ${String(name)}`);
          })
        );
      },
    });
    return { env };
  }

  run(method) {
    const module = this.account.code;
    if (!module) throw new Panic(`CodeDoesNotExist: ${this.account.id}`);
    const instance = new WebAssembly.Instance(module, this.imports());
    this.memory = instance.exports.memory;
    const fn = instance.exports[method];
    if (!fn) throw new Panic(`MethodNotFound: ${method}`);
    try {
      fn();
    } catch (err) {
      if (err instanceof Panic) throw err;
      throw new Panic(`wasm trap in ${this.account.id}.${method}: ${err.message}`);
    }
  }
}

export class Chain {
  constructor({ now = 1_800_000_000_000_000_000n } = {}) {
    this.accounts = new Map();
    this.globals = new Map();
    this.now = now;
    this.height = 1_000n;
    this.queue = [];
    this.nextReceipt = 1;
    this.txCounter = 0;
    this.current = null;
  }

  // ---- setup ----

  account(id, balance = near(100), { keys = 1 } = {}) {
    if (this.accounts.has(id)) throw new Error(`account exists: ${id}`);
    const acct = {
      id,
      balance,
      storage: new Map(),
      code: null,
      codeBytes: 0,
      mock: null,
      keys,
    };
    this.accounts.set(id, acct);
    return acct;
  }

  get(id) {
    return this.accounts.get(id);
  }

  exists(id) {
    return this.accounts.has(id);
  }

  balance(id) {
    return this.accounts.get(id)?.balance ?? 0n;
  }

  keys(id) {
    return this.accounts.get(id)?.keys ?? 0;
  }

  deploy(id, wasm) {
    const acct = this.accounts.get(id) ?? this.account(id, near(1000));
    acct.code = new WebAssembly.Module(wasm);
    acct.codeBytes = wasm.length;
    acct.mock = null;
  }

  publishGlobal(wasm) {
    const hash = createHash('sha256').update(wasm).digest();
    this.globals.set(hash.toString('hex'), new WebAssembly.Module(wasm));
    return base58encode(hash);
  }

  /** A contract written in JS, for the things outside this repo: the pool and OutLayer. */
  mock(id, handler, { balance = near(0) } = {}) {
    const acct = this.accounts.get(id) ?? this.account(id, balance);
    acct.mock = handler;
    return acct;
  }

  advance(ns) {
    this.now += BigInt(ns);
    this.height += 1n;
  }

  // ---- reading ----

  view(account, method, args = {}) {
    const acct = this.accounts.get(account);
    if (!acct) throw new Panic(`AccountDoesNotExist: ${account}`);
    if (acct.mock) {
      const out = acct.mock({
        method,
        args,
        view: true,
        predecessor: '',
        signer: '',
        deposit: 0n,
        chain: this,
        self: acct,
      });
      return out;
    }
    const exec = new Execution(this, acct, { input: toBytes(args), view: true });
    exec.run(method);
    return exec.returned?.length ? JSON.parse(dec.decode(exec.returned)) : undefined;
  }

  // ---- writing ----

  /**
   * Sends a transaction and runs receipts until nothing can run. If something is still waiting
   * (an enclave run, say), the result has `pending: true` until `resume` finishes it.
   */
  call(signer, receiver, method, args = {}, { deposit = 0n, gas = 300n * 10n ** 12n } = {}) {
    const from = this.accounts.get(signer);
    if (!from) throw new Panic(`signer does not exist: ${signer}`);
    if (deposit > from.balance) throw new Panic(`NotEnoughBalance: ${signer}`);
    from.balance -= deposit;
    const tx = { id: ++this.txCounter, logs: [], failures: [], signer };
    const root = this.receipt({
      predecessor: signer,
      signer,
      receiver,
      actions: [{ type: 'call', method, args: toBytes(args), deposit, gas }],
      tx,
    });
    this.queue.push(root);
    this.drain();
    return this.summary(tx, root);
  }

  /** Plain NEAR transfer from a signer. */
  send(signer, receiver, amount) {
    const from = this.accounts.get(signer);
    if (amount > from.balance) throw new Panic(`NotEnoughBalance: ${signer}`);
    from.balance -= amount;
    const tx = { id: ++this.txCounter, logs: [], failures: [], signer };
    const root = this.receipt({
      predecessor: signer,
      signer,
      receiver,
      actions: [{ type: 'transfer', amount }],
      tx,
    });
    this.queue.push(root);
    this.drain();
    return this.summary(tx, root);
  }

  /** Finishes an execution a mock left pending, as OutLayer's yield resume does. */
  resume(receipt, value, extra = () => {}) {
    extra();
    this.finish(receipt, { ok: true, value: toBytes(value) });
    this.drain();
    return this.summary(receipt.tx, receipt.tx.root ?? receipt);
  }

  summary(tx, root) {
    let at = root;
    while (at.outcome?.forward) at = at.outcome.forward;
    const outcome = at.outcome;
    const pending = !outcome || outcome.pending;
    let value;
    if (outcome?.ok && outcome.value?.length) {
      try {
        value = JSON.parse(dec.decode(outcome.value));
      } catch {
        value = dec.decode(outcome.value);
      }
    }
    return {
      ok: !!outcome?.ok,
      pending: !!pending,
      value,
      error: outcome?.ok === false ? outcome.error : undefined,
      logs: tx.logs,
      failures: tx.failures,
      events: tx.logs
        .filter((l) => l.log.startsWith('EVENT_JSON:'))
        .map((l) => JSON.parse(l.log.slice('EVENT_JSON:'.length))),
    };
  }

  receipt({ predecessor, signer, receiver, actions, tx, deps = 0 }) {
    const r = {
      id: this.nextReceipt++,
      predecessor,
      signer,
      receiver,
      actions,
      tx,
      results: [],
      waiting: deps,
      waiters: [],
      outcome: null,
    };
    if (!tx.root) tx.root = r;
    return r;
  }

  drain() {
    while (this.queue.length) this.execute(this.queue.shift());
  }

  refund(receipt) {
    for (const action of receipt.actions) {
      const amount = action.type === 'transfer' ? action.amount : action.deposit;
      if (!amount) continue;
      const payer = this.accounts.get(receipt.predecessor);
      if (payer) payer.balance += amount;
    }
  }

  execute(r) {
    const tx = r.tx;
    this.current = r;
    const creating = r.actions[0]?.type === 'create';
    if (!creating && !this.accounts.has(r.receiver)) {
      this.refund(r);
      tx.failures.push({ receipt: r.id, error: `AccountDoesNotExist: ${r.receiver}` });
      this.finish(r, { ok: false, error: `AccountDoesNotExist: ${r.receiver}` });
      return;
    }
    if (creating && this.accounts.has(r.receiver)) {
      this.refund(r);
      tx.failures.push({ receipt: r.id, error: `AccountAlreadyExists: ${r.receiver}` });
      this.finish(r, { ok: false, error: `AccountAlreadyExists: ${r.receiver}` });
      return;
    }

    let acct = this.accounts.get(r.receiver);
    const before = acct ? { balance: acct.balance, code: acct.code } : null;
    let created = false;
    let result = { ok: true, value: new Uint8Array() };
    const spawned = [];
    try {
      for (const action of r.actions) {
        if (action.type === 'create') {
          acct = this.account(r.receiver, 0n, { keys: 0 });
          created = true;
        } else if (action.type === 'transfer') {
          acct.balance += action.amount;
        } else if (action.type === 'use_global') {
          const module = this.globals.get(action.hash);
          if (!module) throw new Panic(`GlobalContractDoesNotExist: ${action.hash}`);
          acct.code = module;
          acct.codeBytes = 0;
        } else if (action.type === 'call') {
          const out = this.runCall(r, acct, action, spawned);
          if (out !== undefined) result = out;
        }
      }
    } catch (err) {
      if (!(err instanceof Panic)) throw err;
      if (created) this.accounts.delete(r.receiver);
      else if (before) {
        acct.balance = before.balance;
        acct.code = before.code;
      }
      this.refund(r);
      tx.failures.push({ receipt: r.id, account: r.receiver, error: err.message });
      this.finish(r, { ok: false, error: err.message });
      return;
    }
    this.finish(r, result);
  }

  runCall(r, acct, action, spawned) {
    const tx = r.tx;
    if (acct.mock) {
      acct.balance += action.deposit;
      const args = action.args.length ? JSON.parse(dec.decode(action.args)) : {};
      const out = acct.mock({
        method: action.method,
        args,
        view: false,
        predecessor: r.predecessor,
        signer: r.signer,
        deposit: action.deposit,
        chain: this,
        self: acct,
        receipt: r,
        tx,
      });
      if (out === Chain.PENDING) return { pending: true };
      return { ok: true, value: toBytes(out) };
    }

    acct.balance += action.deposit;
    const exec = new Execution(this, acct, {
      input: action.args,
      predecessor: r.predecessor,
      signer: r.signer,
      deposit: action.deposit,
      results: r.results,
    });
    exec.run(action.method);

    const required = BigInt(exec.storageUsage()) * STORAGE_BYTE_COST;
    if (exec.balance < required) {
      throw new Panic(
        `LackBalanceForState: ${acct.id} has ${exec.balance}, needs ${required} for storage`,
      );
    }

    acct.storage = exec.storage;
    acct.balance = exec.balance;
    for (const log of exec.logs) tx.logs.push({ account: acct.id, log });

    // Promises become receipts only now that the call has succeeded.
    const receipts = exec.promises.map((p) =>
      p.joint
        ? { joint: p.after }
        : this.receipt({
            predecessor: acct.id,
            signer: r.signer,
            receiver: p.receiver,
            actions: p.actions,
            tx,
          }),
    );
    exec.promises.forEach((p, i) => {
      if (p.joint) return;
      const sources = p.after.flatMap((a) =>
        receipts[a].joint ? receipts[a].joint.map((j) => receipts[j]) : [receipts[a]],
      );
      receipts[i].waiting = sources.length;
      sources.forEach((source, slot) => source.waiters.push({ receipt: receipts[i], slot }));
      if (sources.length === 0) spawned.push(receipts[i]);
    });
    for (const receipt of spawned.splice(0)) this.queue.push(receipt);

    if (exec.returnPromise !== null) return { forward: receipts[exec.returnPromise] };
    return { ok: true, value: exec.returned ?? new Uint8Array() };
  }

  finish(r, outcome) {
    if (outcome.pending) {
      r.outcome = { pending: true };
      return;
    }
    r.outcome = outcome;
    if (outcome.forward) {
      outcome.forward.waiters.push(...r.waiters);
      r.waiters = [];
      return;
    }
    for (const { receipt, slot } of r.waiters) {
      receipt.results[slot] = outcome.ok ? { ok: true, value: outcome.value } : { ok: false };
      receipt.waiting -= 1;
      if (receipt.waiting === 0) this.queue.push(receipt);
    }
    r.waiters = [];
  }
}

Chain.PENDING = Symbol('pending');
