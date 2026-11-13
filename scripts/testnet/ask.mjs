// Sends one real request to a trust on testnet and waits for the enclave's decision.
//
//   node scripts/testnet/ask.mjs <trust> <signer> <amount NEAR> <payee> "<message>" [milestone index]
//
// The message is sealed here, as the browser would seal it. The reply comes back sealed to a key
// made for this one request, and is opened here. The key is thrown away afterwards.

import { contexts, fromBase64, newKeyPair, openText, seal, toBase64 } from '../../packages/sealbox/sealbox.mjs';
import { account, near, outcome, view } from './lib.mjs';

const [trust, signer, amount, payee, message, milestone] = process.argv.slice(2);
if (!message) {
  console.log('usage: ask.mjs <trust> <signer> <amount> <payee> "<message>" [milestone index]');
  process.exit(1);
}

const collection = trust.slice(trust.indexOf('.') + 1);
const { sealing_key: key } = await view(collection, 'config');
const overview = await view(trust, 'overview');
const keys = newKeyPair();
const sealed = overview.public_room
  ? Buffer.from(message).toString('base64')
  : toBase64(seal(key, contexts.message(trust, signer), message));
const before = (await view(trust, 'decisions', { limit: 1 }))[0]?.id ?? '0';

const started = Date.now();
const tx = await account(signer).callFunctionRaw({
  contractId: trust,
  methodName: 'request',
  args: {
    kind: milestone === undefined ? 'Ask' : { Milestone: { index: Number(milestone) } },
    amount: near(amount).toString(),
    category: 0,
    payee,
    message: sealed,
    reply_key: overview.public_room ? null : keys.publicHex,
  },
  gas: 300n * 10n ** 12n,
  deposit: 0n,
});
const sent = outcome(tx);
console.log(`request tx ${sent.hash}${sent.failures.length ? ` FAILED ${sent.failures.join(' ')}` : ''}`);

// The enclave answers a few blocks later, through yield and resume.
let decision = null;
for (let i = 0; i < 40 && !decision; i += 1) {
  const [latest] = await view(trust, 'decisions', { limit: 1 });
  if (latest && BigInt(latest.id) > BigInt(before)) decision = latest;
  else await new Promise((resolve) => setTimeout(resolve, 3_000));
}
if (!decision) {
  console.log('no decision after two minutes');
  process.exit(1);
}

const reply = !decision.reply
  ? '(no reply)'
  : overview.public_room
    ? decision.reply
    : openText(keys.secret, contexts.reply(trust, decision.id), fromBase64(decision.reply));
const yoctoToNear = (y) => Number(BigInt(y) / 10n ** 21n) / 1000;
console.log(
  `decision ${decision.id}: ${decision.outcome}, reason ${decision.reason}, decided ${yoctoToNear(decision.decided)} NEAR, granted ${yoctoToNear(decision.granted)} NEAR to ${decision.payee}, after ${Math.round((Date.now() - started) / 1000)} s`,
);
console.log(`reply: ${reply}`);

if (milestone !== undefined) {
  const letter = (await view(trust, 'letters'))[Number(milestone)];
  if (letter?.opened) {
    const text = overview.public_room
      ? letter.opened
      : openText(keys.secret, contexts.opened(trust, milestone), fromBase64(letter.opened));
    console.log(`letter "${letter.title}" opened: ${text.replace(/\s+/g, ' ').slice(0, 160)}...`);
  } else {
    console.log('the letter stays sealed');
  }
}
