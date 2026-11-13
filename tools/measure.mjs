// Measures what a trust really costs, using the compiled contracts. Run: node tools/measure.mjs

import { near, STORAGE_BYTE_COST, toNear } from './localnet/chain.mjs';
import { ask, mint, rails, setup, verdict, b64 } from '../tests/harness.mjs';

const bytesOf = (acct) => {
  let bytes = 100 + acct.codeBytes;
  for (const [k, v] of acct.storage) bytes += k.length / 2 + v.length + 40;
  return bytes;
};
const cost = (bytes) => toNear(BigInt(bytes) * STORAGE_BYTE_COST);

const ctx = setup();
const { chain, enclave } = ctx;
const wishes = 'x'.repeat(1_000);
const trust = mint(ctx, {
  wishes: b64(wishes),
  letters: [{ title: 'When you graduate', gift: '0', cipher: b64('y'.repeat(1_000)) }],
  rails: rails({ principal_floor: near(1).toString() }),
});

const fresh = bytesOf(chain.get(trust));
console.log(`a new trust with 1 KB of wishes and a 1 KB letter: ${fresh} bytes, ${cost(fresh)} NEAR locked`);

let full = fresh;
for (let i = 0; i < 40; i++) {
  ask(chain, trust);
  const r = enclave.last();
  enclave.answer(r, verdict(r.input, 'refuse', 0, { reply: 'R'.repeat(1148), memo: b64('m'.repeat(860)) }));
  chain.advance(1_000_000_000n);
  full = bytesOf(chain.get(trust));
}
console.log(`the same trust after 40 decisions, with the ring full: ${full} bytes, ${cost(full)} NEAR locked`);
console.log(`trust wasm as ordinary code in every account would add ${cost(259_500)} NEAR per trust`);
