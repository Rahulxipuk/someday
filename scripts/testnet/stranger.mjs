// A stranger runs the real trustee directly and names the collection's secrets. The keystore's
// `Predecessor` rule must refuse them, so the program never gets the master secret.
//
//   node scripts/testnet/stranger.mjs [signer]
//
// It asks only for the public key, so no model is called. The run prints what OutLayer reported.

import { readFileSync } from 'node:fs';
import { account, near, OUTLAYER, RPC } from './lib.mjs';

const { wasm_url: url, wasm_hash: hash, collection } = JSON.parse(readFileSync('deployments/testnet.json', 'utf8'));
const stranger = process.argv[2] ?? 'someday-noah.testnet';

const sent = await account(stranger).callFunctionRaw({
  contractId: OUTLAYER,
  methodName: 'request_execution',
  args: {
    source: { WasmUrl: { url, hash, build_target: 'wasm32-wasip2' } },
    resource_limits: { max_instructions: 3_000_000_000, max_memory_mb: 256, max_execution_seconds: 30 },
    input_data: JSON.stringify({ v: 1, action: 'pubkey' }),
    secrets_ref: { profile: 'someday', account_id: collection },
    response_format: 'Json',
  },
  gas: 300n * 10n ** 12n,
  deposit: near(0.05),
});
const txHash = sent.transaction?.hash ?? sent.transaction_outcome?.id;
console.log(`signer ${stranger}, tx ${txHash}`);

async function status() {
  const response = await fetch(RPC, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tx',
      params: { tx_hash: txHash, sender_account_id: stranger, wait_until: 'NONE' },
    }),
  });
  return (await response.json()).result;
}

for (let i = 0; i < 40; i += 1) {
  await new Promise((resolve) => setTimeout(resolve, 3_000));
  const receipts = (await status().catch(() => null))?.receipts_outcome ?? [];
  const logs = receipts.flatMap((r) => r.outcome.logs).filter((l) => !l.startsWith('EVENT_JSON') && !l.includes('yNEAR'));
  const answered = receipts.find((r) => r.outcome.executor_id === OUTLAYER && r.outcome.status?.SuccessValue !== undefined && r.outcome.logs.length);
  if (answered) {
    const value = Buffer.from(answered.outcome.status.SuccessValue, 'base64').toString();
    console.log(`output: ${value.slice(0, 200) || '(none)'}`);
    logs.forEach((line) => console.log(`log: ${line.slice(0, 300)}`));
    process.exit(0);
  }
}
console.log('OutLayer did not answer in time');
process.exit(1);
