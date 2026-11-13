// Takes Someday to NEAR testnet, one step at a time. Nothing runs unless you run it.
//
//   node scripts/testnet/setup.mjs check        reads only: what is ready and what is missing
//   node scripts/testnet/setup.mjs code         publishes the trust as a global contract
//   node scripts/testnet/setup.mjs collection   deploys and initialises the collection
//   node scripts/testnet/setup.mjs secrets      has the enclave generate the master secret
//   node scripts/testnet/setup.mjs key          fetches the sealing key from a real enclave run
//   node scripts/testnet/setup.mjs trusts       mints the demo trusts, Maya's and the public one
//   node scripts/testnet/setup.mjs trustee      points the collection at a new trustee build (before lock)
//   node scripts/testnet/setup.mjs publickeys   adds the limited keys that make the public trust wallet-free
//
// SOMEDAY_LABELS="for-maya,nani-purse" names the demo trusts. Trusts already minted keep the
// trustee they were made with, so a new build needs new trusts.
//   node scripts/testnet/setup.mjs lock --i-understand   ends setup for good
//
// Needs in .env: NEAR_AI_API_KEY, and TRUSTEE_WASM_URL (any https host serving
// .local/trustee-real.wasm, because the hash makes the host untrusted).
//
// The master secret is generated inside OutLayer's keystore enclave. No person, including whoever
// runs this script, ever sees it. The access rule below only releases it to a run of this exact
// wasm whose caller is the collection or one of its trusts.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { chacha20poly1305 } from '@noble/ciphers/chacha.js';
import { x25519 } from '@noble/curves/ed25519.js';
import { hkdf } from '@noble/hashes/hkdf.js';
import { sha256 } from '@noble/hashes/sha2.js';
import { randomBytes } from '@noble/hashes/utils.js';
import { baseEncode, KeyPair } from 'near-api-js';
import { contexts, seal, toBase64 } from '../../packages/sealbox/sealbox.mjs';
import { fetchValidators, rankValidators } from '../../packages/validators/validators.mjs';
import { MAYA_LETTERS, MAYA_WISHES, NANI_WISHES, sealLetters } from '../../tools/localnet/demo-data.mjs';
import { account, actions, balance, near, outcome, OUTLAYER, OUTLAYER_API, RPC, sha256hex, view } from './lib.mjs';

const COLLECTION = process.env.SOMEDAY_COLLECTION ?? 'someday-trust.testnet';
const CODE_ACCOUNT = process.env.SOMEDAY_CODE ?? 'someday-code.testnet';
const POOL_SUFFIX = '.pool.f863973.m0';
const PROFILE = 'someday';
const MASTER = 'PROTECTED_SOMEDAY_MASTER';
const STATE = 'deployments/testnet.json';
const TGAS = 10n ** 12n;

const TRUST_WASM = 'target/near/someday_trust/someday_trust.wasm';
const COLLECTION_WASM = 'target/near/someday_collection/someday_collection.wasm';
const TRUSTEE_WASM = '.local/trustee-real.wasm';

if (existsSync('.env')) process.loadEnvFile('.env');

const state = existsSync(STATE) ? JSON.parse(readFileSync(STATE, 'utf8')) : {};
function save(update) {
  Object.assign(state, update);
  mkdirSync('deployments', { recursive: true });
  writeFileSync(STATE, `${JSON.stringify(state, null, 2)}\n`);
}

const CREATOR = 'someday-grandpa.testnet';
const PUBLIC_HOLDER = 'someday-public.testnet';
const PUBLIC_KEY_COUNT = 5;

/** Healthy smaller validators from the official factory, the same ranking the app uses. */
async function pickPools() {
  const ranked = rankValidators(await fetchValidators(RPC))
    .filter((v) => v.account_id.endsWith(POOL_SUFFIX) && v.recommended);
  const picked = [];
  for (const v of ranked.slice(0, 8)) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const fee = await view(v.account_id, 'get_reward_fee_fraction').catch(() => null);
    if (fee && fee.numerator / fee.denominator <= 0.1) picked.push(v.account_id);
    if (picked.length === 2) break;
  }
  if (!picked.length) throw new Error('No healthy pool found');
  console.log(`pools: ${picked.join(', ')}`);
  return picked;
}

const nearText = (y) => (Number(y / 10n ** 18n) / 1e6).toFixed(3);
const accessRule = () => {
  const escaped = COLLECTION.replaceAll('.', '\\.');
  return { Predecessor: { condition: { AccountPattern: { pattern: `(?:[a-z0-9-]+\\.)?${escaped}` } } } };
};

function trusteeConfig() {
  const url = process.env.TRUSTEE_WASM_URL;
  if (!url) throw new Error('Set TRUSTEE_WASM_URL in .env');
  return {
    outlayer: OUTLAYER,
    wasm_url: url,
    wasm_hash: sha256hex(readFileSync(TRUSTEE_WASM)),
    secrets_owner: COLLECTION,
    secrets_profile: PROFILE,
    deposit: near(0.05).toString(),
    max_instructions: 3_000_000_000,
    max_memory_mb: 256,
    max_execution_seconds: 90,
  };
}

/** Same scheme as the keystore: X25519, HKDF-SHA256, ChaCha20-Poly1305, no salt, fixed info. */
function encryptForKeystore(publicKeyHex, text) {
  const ephemeral = randomBytes(32);
  const nonce = randomBytes(12);
  const shared = x25519.getSharedSecret(ephemeral, Buffer.from(publicKeyHex, 'hex'));
  const key = hkdf(sha256, shared, undefined, new TextEncoder().encode('outlayer-keystore-v1'), 32);
  const body = chacha20poly1305(key, nonce).encrypt(new TextEncoder().encode(text));
  return Buffer.concat([Buffer.from([1]), x25519.getPublicKey(ephemeral), nonce, body]).toString('base64');
}

async function post(path, body) {
  const response = await fetch(`${OUTLAYER_API}${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`${path} answered ${response.status}: ${text.slice(0, 200)}`);
  return JSON.parse(text);
}

function report(tx, label) {
  const o = outcome(tx);
  console.log(`${label}: ${o.ok ? 'ok' : 'FAILED'} ${o.hash ?? ''}`);
  for (const failure of o.failures) console.log(`  ${failure}`);
  if (o.failures.length) throw new Error(`${label} failed`);
  return o;
}

const steps = {
  async check() {
    for (const file of [TRUST_WASM, COLLECTION_WASM, TRUSTEE_WASM]) {
      if (!existsSync(file)) {
        console.log(`missing ${file}. Run: npm run build`);
        continue;
      }
      const bytes = readFileSync(file);
      console.log(`${file}: ${(bytes.length / 1024).toFixed(1)} KB, sha256 ${sha256hex(bytes).slice(0, 16)}...`);
    }
    const trust = readFileSync(TRUST_WASM).length;
    const collection = readFileSync(COLLECTION_WASM).length;
    const needCode = (BigInt(trust) * 10n ** 20n) + near(0.1);
    const needCollection = (BigInt(collection) * 10n ** 19n) + near(1);
    for (const [id, need] of [[CODE_ACCOUNT, needCode], [COLLECTION, needCollection]]) {
      const have = await balance(id).catch(() => 0n);
      console.log(`${id}: has ${nearText(have)} NEAR, needs about ${nearText(need)}${have < need ? '  SHORT' : ''}`);
    }
    console.log(`NEAR_AI_API_KEY ${process.env.NEAR_AI_API_KEY ? 'is set' : 'is MISSING'}`);
    const url = process.env.TRUSTEE_WASM_URL;
    if (!url) {
      console.log('TRUSTEE_WASM_URL is MISSING');
      return;
    }
    const hosted = Buffer.from(await (await fetch(url)).arrayBuffer());
    const matches = sha256hex(hosted) === sha256hex(readFileSync(TRUSTEE_WASM));
    console.log(`hosted wasm ${matches ? 'matches' : 'DOES NOT MATCH'} the local build`);
  },

  async code() {
    const wasm = readFileSync(TRUST_WASM);
    report(await account(CODE_ACCOUNT).deployGlobalContract(wasm, 'codeHash'), 'publish global trust code');
    save({ trust_code: baseEncode(sha256(wasm)) });
  },

  async collection() {
    if (!state.trust_code) throw new Error('Run the code step first');
    const args = {
      ops: COLLECTION,
      trust_code: state.trust_code,
      trustee: trusteeConfig(),
      pool_suffix: POOL_SUFFIX,
    };
    const tx = await account(COLLECTION).signAndSendTransaction({
      receiverId: COLLECTION,
      actions: [
        actions.deployContract(readFileSync(COLLECTION_WASM)),
        actions.functionCall('new', args, 100n * TGAS, 0n),
      ],
    });
    report(tx, 'deploy collection');
    save({ collection: COLLECTION, wasm_hash: args.trustee.wasm_hash, wasm_url: args.trustee.wasm_url });
  },

  async secrets() {
    const key = process.env.NEAR_AI_API_KEY;
    if (!key) throw new Error('Set NEAR_AI_API_KEY in .env');
    const hash = trusteeConfig().wasm_hash;
    const accessor = { type: 'WasmHash', hash };
    const plain = JSON.stringify({ NEAR_AI_API_KEY: key });
    const { pubkey } = await post('/secrets/pubkey', {
      accessor,
      owner: COLLECTION,
      profile: PROFILE,
      secrets_json: plain,
    });
    const generated = await post('/secrets/add_generated_secret', {
      accessor,
      owner: COLLECTION,
      profile: PROFILE,
      encrypted_secrets_base64: encryptForKeystore(pubkey, plain),
      new_secrets: [{ name: MASTER, generation_type: 'hex32' }],
    });
    const tx = await account(COLLECTION).callFunctionRaw({
      contractId: OUTLAYER,
      methodName: 'store_secrets',
      args: {
        accessor: { WasmHash: { hash } },
        profile: PROFILE,
        encrypted_secrets_base64: generated.encrypted_data_base64,
        access: accessRule(),
        vault_id: null,
      },
      gas: 50n * TGAS,
      deposit: near(0.1),
    });
    report(tx, 'store secrets');
    console.log('The enclave generated the master secret. Nobody has seen it.');
  },

  async key() {
    const before = await view(COLLECTION, 'config');
    if (before.sealing_key) {
      save({ sealing_key: before.sealing_key });
      console.log(`sealing key already set: ${before.sealing_key}`);
      return;
    }
    const tx = await account(COLLECTION).callFunctionRaw({
      contractId: COLLECTION,
      methodName: 'request_sealing_key',
      args: {},
      gas: 300n * TGAS,
      deposit: near(0.05),
    });
    report(tx, 'request sealing key');
    // The enclave answers a few blocks later, through yield and resume.
    let sealingKey = null;
    for (let i = 0; i < 18 && !sealingKey; i += 1) {
      sealingKey = (await view(COLLECTION, 'config')).sealing_key;
      if (!sealingKey) await new Promise((resolve) => setTimeout(resolve, 5_000));
    }
    if (!sealingKey) throw new Error('The enclave did not answer. Check the transaction logs');
    save({ sealing_key: sealingKey });
    console.log(`sealing key ${sealingKey}`);
  },

  async trusts() {
    const { sealing_key: key } = await view(COLLECTION, 'config');
    if (!key) throw new Error('Run the key step first');
    const pools = await pickPools();
    const now = BigInt(Date.now()) * 1_000_000n;
    const day = 86_400n * 1_000_000_000n;
    const yocto = (n) => near(n).toString();
    const rails = (over) => ({
      max_per_request: yocto(1),
      max_per_period: yocto(2),
      period_ns: (30n * day).toString(),
      cooldown_ns: '0',
      max_requests_per_period: 10,
      principal_floor: yocto(2),
      categories: 0b11,
      payees: 'Holder',
      ...over,
    });
    const [mayaLabel, naniLabel] = (process.env.SOMEDAY_LABELS ?? 'maya,nani').split(',');
    const maya = `${mayaLabel}.${COLLECTION}`;
    const nani = `${naniLabel}.${COLLECTION}`;
    const plans = [
      {
        label: mayaLabel,
        funding: near(6),
        terms: {
          title: 'For Maya',
          holder: 'someday-maya.testnet',
          rails: rails({ payees: { HolderOrProviders: ['someday-school.testnet'] } }),
          maturity_ns: (now + 3650n * day).toString(),
          transfer: 'Free',
          pool: pools[0],
          liquid_target: yocto(3),
          public_room: false,
          wishes: toBase64(seal(key, contexts.wishes(maya), MAYA_WISHES)),
          letters: sealLetters(
            key,
            maya,
            MAYA_LETTERS.map((letter, i) => ({ ...letter, gift: i === 0 ? yocto(0.5) : '0' })),
          ),
        },
      },
      {
        label: naniLabel,
        funding: near(3.5),
        terms: {
          title: "Nani's Purse",
          holder: 'someday-public.testnet',
          rails: rails({
            max_per_request: yocto(0.2),
            max_per_period: yocto(0.6),
            max_requests_per_period: 1_000_000,
            categories: 0xff,
          }),
          maturity_ns: (now + 3650n * day).toString(),
          transfer: 'Locked',
          pool: pools[1] ?? pools[0],
          liquid_target: yocto(1.4),
          public_room: true,
          wishes: toBase64(seal(key, contexts.wishes(nani), NANI_WISHES)),
          letters: [],
        },
      },
    ];
    const minted = state.trusts ?? {};
    for (const plan of plans) {
      const id = `${plan.label}.${COLLECTION}`;
      // Safe to run again: a trust that already exists is kept, never minted twice.
      if (await view(COLLECTION, 'nft_token', { token_id: id })) {
        console.log(`${id} already exists`);
        minted[plan.label] ??= { id, pool: plan.terms.pool };
        continue;
      }
      await new Promise((resolve) => setTimeout(resolve, 2_000));
      const tx = await account(CREATOR).callFunctionRaw({
        contractId: COLLECTION,
        methodName: 'create_trust',
        args: { label: plan.label, terms: plan.terms },
        gas: 300n * TGAS,
        deposit: plan.funding,
      });
      const o = report(tx, `mint ${plan.label}`);
      if (o.value !== true) throw new Error(`mint ${plan.label} returned ${JSON.stringify(o.value)}`);
      minted[plan.label] = { id: `${plan.label}.${COLLECTION}`, tx: o.hash, pool: plan.terms.pool };
    }
    save({ trusts: minted });
  },

  async trustee() {
    const config = trusteeConfig();
    const tx = await account(COLLECTION).callFunctionRaw({
      contractId: COLLECTION,
      methodName: 'set_trustee',
      args: { trustee: config, clear_key: true },
      gas: 30n * TGAS,
      deposit: 0n,
    });
    report(tx, 'set trustee');
    const earlier = state.earlier ?? [];
    if (state.wasm_hash && state.wasm_hash !== config.wasm_hash) {
      earlier.push({ wasm_hash: state.wasm_hash, wasm_url: state.wasm_url, sealing_key: state.sealing_key, trusts: state.trusts });
    }
    save({ earlier, wasm_hash: config.wasm_hash, wasm_url: config.wasm_url, sealing_key: null, trusts: {} });
  },

  /**
   * Published on purpose, so anyone can try the public trust with no wallet. Each key can only call
   * `request` on that one trust, and can only spend its own small gas allowance.
   */
  async publickeys() {
    const label = process.argv[3] ?? Object.keys(state.trusts ?? {})[1];
    if (!label) throw new Error('Mint the trusts first');
    const holder = account(PUBLIC_HOLDER);
    const pairs = [];
    for (let i = 0; i < PUBLIC_KEY_COUNT; i += 1) {
      const pair = KeyPair.fromRandom('ed25519');
      const tx = await holder.addFunctionCallAccessKey({
        publicKey: pair.getPublicKey(),
        contractId: `${label}.${COLLECTION}`,
        methodNames: ['request'],
        allowance: near(0.5),
      });
      report(tx, `public key ${i + 1}`);
      pairs.push(pair);
    }
    // The site's bundle carries these. They stay out of the repository like any other .env file.
    writeFileSync(
      'web/.env.testnet',
      [
        'VITE_NETWORK=testnet',
        `VITE_COLLECTION_ID=${COLLECTION}`,
        `VITE_PUBLIC_TRUST=${label}`,
        `VITE_PUBLIC_KEYS=${pairs.map((pair) => pair.toString()).join(',')}`,
        '',
      ].join('\n'),
    );
    save({
      public_trust: `${label}.${COLLECTION}`,
      public_holder: PUBLIC_HOLDER,
      public_keys: pairs.map((pair) => pair.getPublicKey().toString()),
    });
    console.log('Wrote web/.env.testnet');
  },

  /** Irreversible: afterwards nobody can change the collection or read the secrets row. */
  async lock() {
    if (!process.argv.includes('--i-understand')) {
      throw new Error('This cannot be undone. Add --i-understand to proceed');
    }
    const me = account(COLLECTION);
    report(
      await me.callFunctionRaw({
        contractId: COLLECTION,
        methodName: 'seal_config',
        args: {},
        gas: 30n * TGAS,
        deposit: 0n,
      }),
      'seal config',
    );
    const keys = await me.provider.query({
      request_type: 'view_access_key_list',
      finality: 'final',
      account_id: COLLECTION,
    });
    for (const { public_key: publicKey } of keys.keys) {
      report(await me.deleteKey(publicKey), `delete key ${publicKey.slice(0, 18)}...`);
    }
    save({ locked: true });
  },
};

const step = steps[process.argv[2]];
if (!step) {
  console.log(`Steps: ${Object.keys(steps).join(', ')}`);
  process.exitCode = 1;
} else {
  await step();
}
