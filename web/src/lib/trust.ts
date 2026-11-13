import { checkPair, Refusal } from '../../../packages/sharded-item/index.mjs';
import type { Chain } from '../chain/types';
import { config } from '../config';
import type {
  CollectionConfig,
  Decision,
  Entry,
  HolderRecord,
  ItemInfo,
  LetterView,
  Overview,
  Token,
} from './types';

export type TrustState = {
  token: Token;
  overview: Overview;
  letters: LetterView[];
  decisions: Decision[];
  holders: HolderRecord[];
  item: ItemInfo;
  entry: Entry;
  nowNs: bigint;
};

export class NoSuchTrust extends Error {
  constructor(id: string) {
    super(`There is no trust called ${id}.`);
  }
}

/** Everything a page shows about one trust, read at one moment. */
export async function readTrust(chain: Chain, id: string): Promise<TrustState> {
  const { view, nowNs } = await chain.pinned();
  const token = await view<Token | null>(config.collection, 'nft_token', { token_id: id });
  if (!token) throw new NoSuchTrust(id);
  const [overview, letters, decisions, holders, item, entry] = await Promise.all([
    view<Overview>(id, 'overview'),
    view<LetterView[]>(id, 'letters'),
    view<Decision[]>(id, 'decisions', { limit: 32 }),
    view<HolderRecord[]>(id, 'holders'),
    view<ItemInfo>(id, 'nft_item_info'),
    view<Entry>(config.collection, 'entry', { token_id: id }),
  ]);
  return { token, overview, letters, decisions, holders, item, entry, nowNs };
}

export type Gate =
  | { state: 'missing' }
  /** The item and the collection disagree for a moment, while a transfer settles. */
  | { state: 'moving' }
  /** The pair check refused it for good. A room never opens on this. */
  | { state: 'refused'; refusal: string }
  | { state: 'signed-out'; holder: string }
  | { state: 'open'; holder: string; rotation: string }
  | { state: 'locked'; holder: string }
  | { state: 'moved'; holder: string; record: HolderRecord };

/**
 * Who may enter the room, read fresh from the chain with the SDK's T2 check. The trust and the
 * collection are read at one final block and must agree, so an ownership read can never straddle a
 * transfer, and the collection comes from this app's config, never from the item.
 */
export async function readGate(chain: Chain, id: string): Promise<Gate> {
  const pair = await checkPair(
    chain.client,
    { collection: config.collection, item: id },
    { indexSequence: 'nft_item_rotation', retries: 2, delayMs: 600 },
  );
  if (!pair.ok) {
    if (pair.refusal === Refusal.RPC_ERROR) throw new Error('The chain did not answer.');
    if (pair.refusal === Refusal.NO_ITEM_INFO || pair.refusal === Refusal.NOT_IN_COLLECTION) {
      return { state: 'missing' };
    }
    if (pair.refusal === Refusal.DID_NOT_CONVERGE) return { state: 'moving' };
    return { state: 'refused', refusal: pair.refusal ?? 'unknown' };
  }

  const holder = pair.owner as string;
  const me = chain.accountId;
  if (!me) return { state: 'signed-out', holder };
  if (me === holder) return { state: 'open', holder, rotation: pair.rotationSeq as string };

  const history = await chain.view<HolderRecord[]>(id, 'holders');
  const record = [...history].reverse().find((h) => h.holder === me);
  return record ? { state: 'moved', holder, record } : { state: 'locked', holder };
}

export type Stats = {
  trusts: { id: string; title: string; holder: string; media: string | null; public: boolean }[];
  held: bigint;
  earned: bigint;
  given: bigint;
  decisions: number;
  refused: number;
};

export const decisionsTotal = (o: Overview) =>
  o.counts.approved + o.counts.refused + o.counts.needs_more + o.counts.voided + o.counts.unanswered;

/**
 * The numbers on the home page, added up from the trusts on the current trustee. A trust keeps the
 * trustee it was made with, so trusts from earlier builds stay on chain and are left out here.
 */
export async function readStats(chain: Chain): Promise<Stats> {
  const [tokens, settings] = await Promise.all([
    chain.view<Token[]>(config.collection, 'nft_tokens', { limit: 50 }),
    chain.view<CollectionConfig>(config.collection, 'config'),
  ]);
  const overviews = await Promise.all(tokens.map((t) => chain.view<Overview>(t.token_id, 'overview')));
  const current = tokens
    .map((token, i) => ({ token, overview: overviews[i] }))
    .filter(({ overview }) => overview.trustee.wasm_hash === settings.trustee.wasm_hash);
  const all = current.map(({ overview }) => overview);
  const sum = (pick: (o: Overview) => string) => all.reduce((n, o) => n + BigInt(pick(o)), 0n);
  return {
    trusts: current.map(({ token, overview }) => ({
      id: token.token_id,
      title: overview.title,
      holder: token.owner_id,
      media: token.metadata?.media ?? null,
      public: overview.public_room,
    })),
    held: sum((o) => o.money.assets),
    earned: sum((o) => o.money.yield_earned),
    given: sum((o) => o.money.distributed),
    decisions: all.reduce((n, o) => n + decisionsTotal(o), 0),
    refused: all.reduce((n, o) => n + o.counts.refused, 0),
  };
}

/** For a read that must succeed once the money has moved, such as fetching a letter that just opened. */
export async function patiently<T>(read: () => Promise<T>, tries = 8): Promise<T> {
  for (let left = tries; ; left -= 1) {
    try {
      return await read();
    } catch (err) {
      if (left <= 1) throw err;
      await new Promise((done) => setTimeout(done, 1500));
    }
  }
}

/** A decision lands a little after the request on a real network, so this waits for it. */
export async function waitForDecision(chain: Chain, id: string, decisionId: string, timeoutMs = 120_000) {
  const until = Date.now() + timeoutMs;
  for (;;) {
    // Public endpoints refuse reads under load. One refused read says nothing about the decision.
    const decisions = await chain.view<Decision[]>(id, 'decisions', { limit: 8 }).catch(() => []);
    const found = decisions.find((d) => d.id === decisionId);
    if (found) return found;
    if (Date.now() > until) return null;
    await new Promise((done) => setTimeout(done, 2000));
  }
}
