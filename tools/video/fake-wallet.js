// Stands in for near-connect-hooks while filming, so no wallet popup covers the screen.
// Everything above the wallet is the real app, and every transaction is real and goes to testnet.
// The recorder passes the demo account's key in through window.__RECORD__. It never touches disk here.

import { Account, FailoverRpcProvider, JsonRpcProvider, KeyPairSigner } from 'near-api-js';

const { accountId, secretKey, rpcUrls } = window.__RECORD__;
const signer = KeyPairSigner.fromSecretKey(secretKey);
const provider = new FailoverRpcProvider(rpcUrls.map((url) => new JsonRpcProvider({ url })));
const account = new Account(accountId, provider, signer);

async function txStatus(hash) {
  for (const url of rpcUrls) {
    const reply = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'film',
        method: 'tx',
        params: { tx_hash: hash, sender_account_id: accountId, wait_until: 'NONE' },
      }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);
    if (reply?.result) return reply.result;
  }
  return null;
}

/** A decision arrives later through yield and resume, so `request` returns once it is taken. */
async function untilTaken(hash) {
  for (let i = 0; i < 40; i += 1) {
    const outcome = await txStatus(hash);
    const receipts = outcome?.receipts_outcome ?? [];
    if (receipts.some((r) => r.outcome.logs.some((l) => l.includes('"request_received"')))) {
      return { ...outcome, status: undefined };
    }
    const failed = receipts.find((r) => r.outcome.status?.Failure);
    if (failed) return { ...outcome, status: { Failure: failed.outcome.status.Failure } };
    await new Promise((done) => setTimeout(done, 1200));
  }
  throw new Error('The chain did not confirm the request in time.');
}

const wallet = {
  signedAccountId: accountId,
  async callFunctionRaw({ contractId, method, args, gas, deposit }) {
    const call = { contractId, methodName: method, args, gas: BigInt(gas), deposit: BigInt(deposit) };
    if (method === 'request') {
      const sent = await account.callFunctionRaw({ ...call, waitUntil: 'INCLUDED_FINAL' });
      return untilTaken(sent.transaction_outcome?.id ?? sent.transaction.hash);
    }
    return account.callFunctionRaw({ ...call, waitUntil: 'EXECUTED_OPTIMISTIC' });
  },
  async signNEP413Message({ message, recipient, nonce }) {
    const signed = await signer.signNep413Message(accountId, { message, recipient, nonce });
    return { ...signed, signature: btoa(String.fromCharCode(...signed.signature)) };
  },
  signIn() {},
  signOut() {},
};

export const NearProvider = ({ children }) => children;
export const useNearWallet = () => wallet;
