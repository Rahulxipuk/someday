// Signing helpers for testnet scripts. Keys stay in the local NEAR keychain, never in this repo.

import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { Account, actions, FailoverRpcProvider, JsonRpcProvider, KeyPairSigner } from 'near-api-js';

/** Public endpoints rate-limit a busy machine, so requests fall over from one to the next. */
export const RPCS = (process.env.NEAR_RPC_URLS ?? 'https://rpc.testnet.fastnear.com,https://near-testnet.drpc.org,https://test.rpc.fastnear.com').split(',');
export const RPC = RPCS[0];
export const OUTLAYER = 'outlayer.testnet';
export const OUTLAYER_API = 'https://testnet-api.outlayer.ai';
export const provider = new FailoverRpcProvider(RPCS.map((url) => new JsonRpcProvider({ url })));
export { actions };

/** This machine's keychain also holds other projects' accounts, and none of those may sign here. */
const OUR_ACCOUNTS = /^someday-[a-z0-9-]+\.testnet$/;

export function secretKeyOf(id) {
  if (!OUR_ACCOUNTS.test(id)) throw new Error(`${id} is not one of this project's accounts`);
  const file = join(homedir(), '.near-credentials', 'testnet', `${id}.json`);
  return JSON.parse(readFileSync(file, 'utf8')).private_key;
}

export function account(id) {
  return new Account(id, provider, KeyPairSigner.fromSecretKey(secretKeyOf(id)));
}

export const sha256hex = (bytes) => createHash('sha256').update(bytes).digest('hex');

export const near = (n) => (BigInt(Math.round(Number(n) * 1e6)) * 10n ** 24n) / 1_000_000n;

export async function view(accountId, method, args = {}) {
  const r = await provider.query({
    request_type: 'call_function',
    finality: 'final',
    account_id: accountId,
    method_name: method,
    args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
  });
  return JSON.parse(Buffer.from(r.result).toString());
}

export async function balance(accountId) {
  const r = await provider.query({
    request_type: 'view_account',
    finality: 'final',
    account_id: accountId,
  });
  return BigInt(r.amount);
}

/** Pulls the useful parts out of a transaction result, including every failure. */
export function outcome(tx) {
  const receipts = tx.receipts_outcome ?? [];
  const logs = receipts.flatMap((r) => r.outcome.logs);
  const failures = receipts
    .map((r) => r.outcome.status?.Failure)
    .filter(Boolean)
    .map((f) => JSON.stringify(f).slice(0, 300));
  const success = tx.status?.SuccessValue;
  let value;
  if (success !== undefined) {
    const text = Buffer.from(success, 'base64').toString();
    try {
      value = text ? JSON.parse(text) : undefined;
    } catch {
      value = text;
    }
  }
  return {
    hash: tx.transaction_outcome?.id ?? tx.transaction?.hash,
    ok: tx.status?.SuccessValue !== undefined,
    value,
    logs,
    failures,
    gas: receipts.reduce((sum, r) => sum + r.outcome.gas_burnt, 0),
  };
}
