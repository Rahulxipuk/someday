// The holder's side of the sealed conversation. Keys and plain text stay in this browser.

import { sha256 } from '@noble/hashes/sha2.js';
import {
  contexts,
  fromBase64,
  openText,
  publicKeyOf,
  seal,
  toBase64,
} from '../../../packages/sealbox/sealbox.mjs';
import type { Chain } from '../chain/types';
import { store } from './store';

export type RoomKey = { secret: Uint8Array; publicHex: string };

export async function roomKey(chain: Chain, trust: string): Promise<RoomKey> {
  const secret = sha256(await chain.roomSeed(trust));
  return { secret, publicHex: publicKeyOf(secret) };
}

export const sealMessage = (sealingKey: string, trust: string, holder: string, text: string) =>
  toBase64(seal(sealingKey, contexts.message(trust, holder), text));

/** Null when this key cannot open it: the reply was sealed to someone else, or to an older key. */
export function openReply(key: RoomKey, trust: string, id: string, reply: string): string | null {
  try {
    return openText(key.secret, contexts.reply(trust, id), fromBase64(reply));
  } catch {
    return null;
  }
}

export function openLetter(key: RoomKey, trust: string, index: number, box: string): string | null {
  try {
    return openText(key.secret, contexts.opened(trust, index), fromBase64(box));
  } catch {
    return null;
  }
}

// A person's own words never go on chain in the clear, so this browser remembers them.

const WORDS = 'someday:words:';
const wordsKey = (scope: string, trust: string, id: string) => `${WORDS}${scope}:${trust}:${id}`;

export const rememberWords = (scope: string, trust: string, id: string, text: string) =>
  store.set(wordsKey(scope, trust, id), text);

export const recallWords = (scope: string, trust: string, id: string) =>
  store.get(wordsKey(scope, trust, id));

export function forgetAllWords() {
  store.keys().filter((key) => key.startsWith(WORDS)).forEach((key) => store.remove(key));
}
