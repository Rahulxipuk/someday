// Sealed boxes, in the browser and in Node. Same format as enclave/trustee/src/sealbox.rs.
//
//   box  = 0x01 | ephemeral public key (32) | nonce (12) | ciphertext and tag
//   key  = HKDF-SHA256(ikm = X25519(ephemeral, recipient), salt = "someday/v1", info = context)
//   aead = ChaCha20-Poly1305 with aad = context

import { chacha20poly1305 } from '@noble/ciphers/chacha.js';
import { x25519 } from '@noble/curves/ed25519.js';
import { hkdf } from '@noble/hashes/hkdf.js';
import { sha256 } from '@noble/hashes/sha2.js';
import { randomBytes } from '@noble/hashes/utils.js';

const VERSION = 1;
const SALT = new TextEncoder().encode('someday/v1');
const HEADER = 1 + 32 + 12;

const utf8 = (text) => new TextEncoder().encode(text);

export const toHex = (bytes) =>
  Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');

export const fromHex = (hex) =>
  Uint8Array.from(hex.match(/.{2}/g) ?? [], (byte) => parseInt(byte, 16));

export const toBase64 = (bytes) => {
  let text = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    text += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(text);
};

export const fromBase64 = (b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

/** Each box is bound to one purpose on one trust. Moved anywhere else, it fails to open. */
export const contexts = {
  wishes: (trust) => `wishes:${trust}`,
  letter: (trust, index) => `letter:${trust}:${index}`,
  message: (trust, holder) => `message:${trust}:${holder}`,
  reply: (trust, id) => `reply:${trust}:${id}`,
  opened: (trust, index) => `opened:${trust}:${index}`,
};

function cipher(shared, context, nonce) {
  const info = utf8(context);
  return chacha20poly1305(hkdf(sha256, shared, SALT, info, 32), nonce, info);
}

export function newKeyPair() {
  const secret = randomBytes(32);
  return { secret, publicHex: toHex(x25519.getPublicKey(secret)) };
}

export function publicKeyOf(secret) {
  return toHex(x25519.getPublicKey(secret));
}

/** Seals text or bytes to a public key given as hex. */
export function seal(recipientHex, context, plain) {
  const message = typeof plain === 'string' ? utf8(plain) : plain;
  const ephemeral = randomBytes(32);
  const nonce = randomBytes(12);
  const shared = x25519.getSharedSecret(ephemeral, fromHex(recipientHex));
  const body = cipher(shared, context, nonce).encrypt(message);
  const out = new Uint8Array(HEADER + body.length);
  out[0] = VERSION;
  out.set(x25519.getPublicKey(ephemeral), 1);
  out.set(nonce, 33);
  out.set(body, HEADER);
  return out;
}

export function open(secret, context, box) {
  if (box.length < HEADER + 16 || box[0] !== VERSION) throw new Error('not a sealed box');
  const shared = x25519.getSharedSecret(secret, box.subarray(1, 33));
  return cipher(shared, context, box.subarray(33, 45)).decrypt(box.subarray(HEADER));
}

export const openText = (secret, context, box) =>
  new TextDecoder().decode(open(secret, context, box));
