// Stores one file on FastFS with one NEAR transaction.
//
// The transaction is meant to "fail": it carries 1 gas, because nothing needs to run. The indexer
// reads the file from the transaction arguments. That is how OutLayer's own CLI does it.

import { account, actions } from './lib.mjs';

const MAX_PAYLOAD = 1_400_000;

const u32 = (n) => {
  const b = Buffer.alloc(4);
  b.writeUInt32LE(n);
  return b;
};
const string = (s) => Buffer.concat([u32(Buffer.byteLength(s)), Buffer.from(s)]);

export const fastfsUrl = (sender, receiver, path) => `https://test.fastfs.io/${sender}/${receiver}/${path}`;

export async function upload({ sender, receiver, path, mime, content }) {
  const payload = Buffer.concat([
    Buffer.from([0]), // FastfsData::Simple
    string(path),
    Buffer.from([1]), // Some(content)
    string(mime),
    u32(content.length),
    content,
  ]);
  if (payload.length > MAX_PAYLOAD) throw new Error(`${path} is too large for one transaction`);
  try {
    const tx = await account(sender).signAndSendTransaction({
      receiverId: receiver,
      actions: [actions.functionCall('__fastdata_fastfs', payload, 1n, 0n)],
      waitUntil: 'INCLUDED_FINAL',
      throwOnFailure: false,
    });
    return tx.transaction?.hash ?? tx.transaction_outcome?.id;
  } catch (error) {
    // Expected: "Exceeded the prepaid gas". The data is on chain regardless. Anything else, such
    // as a rate limit, means the transaction may never have been sent.
    const message = String(error.message ?? error);
    if (!/prepaid gas/i.test(message)) throw error;
    return `finished with ${message.slice(0, 160)}`;
  }
}
