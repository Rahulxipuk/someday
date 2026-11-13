// NEAR testnet: reads go straight to FastNEAR, signing goes through the person's wallet.

import { sha256 } from '@noble/hashes/sha2.js';
import { Account, FailoverRpcProvider, JsonRpcProvider, KeyPairSigner, type KeyPairString } from 'near-api-js';
import { NearProvider, useNearWallet } from 'near-connect-hooks';
import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { fromHex, toHex } from '../../../packages/sealbox/sealbox.mjs';
import { reader } from '../../../packages/sharded-item/index.mjs';
import { fetchValidators } from '../../../packages/validators/validators.mjs';
import { config } from '../config';
import { store } from '../lib/store';
import { ChainContext } from './context';
import type { CallResult, Chain, NearEvent, RawValidator, ViewFn } from './types';

/** All of a transaction's gas, because trust methods wait on OutLayer and on a staking pool. */
const GAS = '300000000000000';
const OFFICIAL_POOL_SUFFIX = '.pool.f863973.m0';
const WALLET_CONFIG = {
  network: 'testnet' as const,
  providers: { testnet: [config.rpcUrl], mainnet: [] as string[] },
};

const ENDPOINTS = [config.rpcUrl, 'https://near-testnet.drpc.org', 'https://test.rpc.fastnear.com'];

/** Public endpoints rate-limit a busy page, so a refused request moves on to the next one. */
const failover: typeof fetch = async (_url, init) => {
  let lastError: unknown;
  for (const url of ENDPOINTS) {
    try {
      const response = await fetch(url, init);
      if (response.ok) return response;
      lastError = new Error(`The chain answered ${response.status}`);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
};

const encoder = new TextEncoder();
const client = reader(config.rpcUrl, failover);
const signing = new FailoverRpcProvider(ENDPOINTS.map((url) => new JsonRpcProvider({ url })));

async function rpc<T>(method: string, params: unknown): Promise<T> {
  const response = await failover(config.rpcUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 'someday', method, params }),
  });
  const reply = await response.json();
  if (reply.error) throw new Error(reply.error.data ?? reply.error.message ?? 'RPC error');
  if (reply.result?.error) throw new Error(reply.result.error);
  return reply.result as T;
}

function viewAt(reference: object): ViewFn {
  return async <T,>(account: string, method: string, args: object = {}) => {
    const result = await rpc<{ result: number[] }>('query', {
      request_type: 'call_function',
      account_id: account,
      method_name: method,
      args_base64: btoa(JSON.stringify(args)),
      ...reference,
    });
    return JSON.parse(new TextDecoder().decode(Uint8Array.from(result.result))) as T;
  };
}

const view = viewAt({ finality: 'final' });

async function pinned() {
  const block = await rpc<{ header: { height: number; timestamp_nanosec: string } }>('block', {
    finality: 'final',
  });
  return {
    view: viewAt({ block_id: block.header.height }),
    nowNs: BigInt(block.header.timestamp_nanosec),
  };
}

async function accessKeys(account: string) {
  const result = await rpc<{ keys: unknown[] }>('query', {
    request_type: 'view_access_key_list',
    finality: 'final',
    account_id: account,
  });
  return result.keys.length;
}

type Outcome = {
  status?: { SuccessValue?: string; Failure?: unknown } | string;
  transaction_outcome?: { outcome: { logs: string[] } };
  receipts_outcome?: { outcome: { logs: string[]; status?: { Failure?: unknown } } }[];
};

function failureText(failure: unknown): string {
  const execution = (failure as { ActionError?: { kind?: { FunctionCallError?: { ExecutionError?: string } } } })
    ?.ActionError?.kind?.FunctionCallError?.ExecutionError;
  return (execution ?? JSON.stringify(failure)).replace(/^Smart contract panicked: /, '');
}

function fromOutcome(outcome: Outcome): CallResult {
  const receipts = outcome.receipts_outcome ?? [];
  const logs = [
    ...(outcome.transaction_outcome?.outcome.logs ?? []),
    ...receipts.flatMap((r) => r.outcome.logs),
  ];
  const events = logs
    .filter((l) => l.startsWith('EVENT_JSON:'))
    .map((l) => JSON.parse(l.slice('EVENT_JSON:'.length)) as NearEvent);

  const status = typeof outcome.status === 'object' ? outcome.status : undefined;
  if (status?.Failure) return { ok: false, value: null, error: failureText(status.Failure), events };

  let value: unknown = null;
  if (status?.SuccessValue) {
    try {
      value = JSON.parse(atob(status.SuccessValue));
    } catch {
      value = null;
    }
  }
  // Creating or moving a trust reports failure as `false`, with the reason in an earlier receipt.
  if (value === false) {
    const failed = receipts.find((r) => r.outcome.status?.Failure);
    const error = failed ? failureText(failed.outcome.status?.Failure) : 'It did not go through';
    return { ok: false, value, error, events };
  }
  return { ok: true, value, error: null, events };
}

/**
 * Every current validator, because which ones hold a third of the stake depends on all of them.
 * Official pools also report their commission, read from their own contracts.
 */
async function validators(): Promise<RawValidator[]> {
  const current = await fetchValidators(config.rpcUrl, failover);
  return Promise.all(
    current.map(async (validator) => {
      if (!validator.account_id.endsWith(OFFICIAL_POOL_SUFFIX)) return validator;
      const fee = await view<{ numerator: number; denominator: number }>(
        validator.account_id,
        'get_reward_fee_fraction',
      ).catch(() => null);
      return fee ? { ...validator, fee: (fee.numerator / fee.denominator) * 100 } : validator;
    }),
  );
}

/** The trust has taken the message once its first receipt has logged it. The answer comes later. */
async function untilTaken(hash: string, sender: string): Promise<Outcome | null> {
  for (let i = 0; i < 20; i += 1) {
    const outcome = await rpc<Outcome>('tx', {
      tx_hash: hash,
      sender_account_id: sender,
      wait_until: 'NONE',
    }).catch(() => null);
    const receipts = outcome?.receipts_outcome ?? [];
    if (receipts.some((r) => r.outcome.logs.some((l) => l.includes('"request_received"')))) {
      return { ...outcome, status: undefined };
    }
    const failed = receipts.find((r) => r.outcome.status?.Failure);
    if (failed) return { ...outcome, status: { Failure: failed.outcome.status?.Failure } };
    await new Promise((done) => setTimeout(done, 1500));
  }
  return null;
}

/**
 * A person with no wallet cannot sign for the public holder, so this site carries a few published
 * keys. Each one can only call `request` on the public trust and spend a small gas allowance.
 */
async function publicAsk(trust: string, holder: string, amount: string, message: string) {
  const key = config.publicKeys[Math.floor(Math.random() * config.publicKeys.length)];
  if (!key) throw new Error('This site has no published keys for the public trust.');
  const account = new Account(holder, signing, KeyPairSigner.fromSecretKey(key as KeyPairString));
  try {
    const sent = await account.callFunctionRaw({
      contractId: trust,
      methodName: 'request',
      args: {
        kind: 'Ask',
        amount,
        category: 7,
        payee: holder,
        message: btoa(String.fromCharCode(...encoder.encode(message))),
        reply_key: null,
      },
      gas: BigInt(GAS),
      deposit: 0n,
      waitUntil: 'INCLUDED_FINAL',
    });
    const outcome = await untilTaken(sent.transaction_outcome?.id ?? sent.transaction.hash, holder);
    if (!outcome) return { ok: false, value: null, error: 'The chain did not confirm it in time.', events: [] };
    return fromOutcome(outcome);
  } catch (err) {
    const error = (err as Error).message.replace(/^.*panicked: /s, '');
    return { ok: false, value: null, error, events: [] };
  }
}

function WalletBridge({ children }: { children: ReactNode }) {
  const wallet = useNearWallet();
  const [version, setVersion] = useState(0);
  const accountId = wallet.signedAccountId || null;

  const call = useCallback(
    async (receiver: string, method: string, args: object = {}, deposit = '0') => {
      const outcome = await wallet.callFunctionRaw({
        contractId: receiver,
        method,
        args: args as Record<string, unknown>,
        gas: GAS,
        deposit,
      });
      setVersion((v) => v + 1);
      return fromOutcome(outcome as unknown as Outcome);
    },
    [wallet],
  );

  /**
   * Signing the same message gives the same signature, so the same wallet always rebuilds the same
   * room key. The nonce is fixed for that reason. It costs nothing and never leaves the browser.
   * A wallet that cannot sign messages falls back to a random key kept in this browser only.
   */
  const roomSeed = useCallback(
    async (trust: string) => {
      const slot = `someday:room-seed:${accountId}:${trust}`;
      const kept = store.session.get(slot) ?? store.get(slot);
      if (kept) return fromHex(kept);
      try {
        const signed = await wallet.signNEP413Message({
          message: `Open my Someday room for ${trust}`,
          recipient: config.collection,
          nonce: sha256(encoder.encode(`someday/room/v1:${trust}`)),
        });
        const seed = encoder.encode(signed.signature);
        store.session.set(slot, toHex(seed));
        return seed;
      } catch {
        const seed = crypto.getRandomValues(new Uint8Array(32));
        store.set(slot, toHex(seed));
        return seed;
      }
    },
    [wallet, accountId],
  );

  const chain = useMemo<Chain>(
    () => ({
      network: 'testnet',
      accountId,
      version,
      scope: `testnet:${config.collection}`,
      online: true,
      view,
      pinned,
      call,
      accessKeys,
      client,
      publicAsk,
      validators,
      roomSeed,
      signIn: () => wallet.signIn(),
      signOut: () => wallet.signOut(),
      dev: null,
    }),
    [accountId, version, call, roomSeed, wallet],
  );

  return <ChainContext.Provider value={chain}>{children}</ChainContext.Provider>;
}

export default function TestnetChain({ children }: { children: ReactNode }) {
  return (
    <NearProvider config={WALLET_CONFIG}>
      <WalletBridge>{children}</WalletBridge>
    </NearProvider>
  );
}
