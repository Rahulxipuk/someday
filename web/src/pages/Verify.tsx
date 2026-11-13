import { sha256 } from '@noble/hashes/sha2.js';
import { Link } from 'react-router';
import { fromBase64, toHex } from '../../../packages/sealbox/sealbox.mjs';
import { checkNamespace, checkPair, checkProvenance } from '../../../packages/sharded-item/index.mjs';
import { useChain } from '../chain/context';
import type { Chain } from '../chain/types';
import { WaxSeal } from '../components/Seal';
import { ErrorNote, Loading, NoTrust, Stamp } from '../components/States';
import { config, tokenId } from '../config';
import { near } from '../lib/format';
import type { CollectionConfig, ItemInfo, ItemStatus, LetterView, Overview } from '../lib/types';
import { useLoad } from '../lib/useLoad';
import { useTitle } from '../lib/useTitle';
import { worstCase } from '../lib/worst';

/** A decision older than this was lost. Same value as STALE_NS in the contract. */
const STALE_NS = 30n * 60n * 1_000_000_000n;
/** 10,000 bytes of storage. The same margin the contract holds back from every spend. */
const FLOOR_MARGIN = 100_000_000_000_000_000_000_000n;
/** version byte, ephemeral key, nonce and tag */
const SEALED_OVERHEAD = 61;
const HASH = /^[0-9a-f]{64}$/;

type Check = {
  title: string;
  proves: string;
  pass: boolean;
  raw: [string, string][];
};

/** What the contract's own rule says the status must be, worked out here from public numbers. */
function expectedStatus(o: Overview, nowNs: bigint): ItemStatus {
  const deposit = BigInt(o.trustee.deposit);
  if (o.stage !== 'Live') return 'Expired';
  if (o.pending && nowNs < BigInt(o.pending.at_ns) + STALE_NS) return 'Suspended';
  if (nowNs < BigInt(o.next_request_ns)) return 'Suspended';
  if (nowNs < BigInt(o.window_ends_ns) && o.window_requests >= o.rails.max_requests_per_period) return 'Suspended';
  if (BigInt(o.money.liquid) < deposit) return 'Frozen';
  if (BigInt(o.money.spendable) < deposit + FLOOR_MARGIN) return 'Frozen';
  return 'Active';
}

/** Readable text has long runs of printable bytes. Ciphertext does not. */
function longestPrintableRun(bytes: Uint8Array) {
  let longest = 0;
  let run = 0;
  for (const byte of bytes) {
    run = byte >= 0x20 && byte < 0x7f ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  return longest;
}

async function hashOfUrl(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) return { error: `HTTP ${response.status}` };
    const bytes = new Uint8Array(await response.arrayBuffer());
    return { hash: toHex(sha256(bytes)), size: bytes.length };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'could not be fetched' };
  }
}

const short = (hex: string) => (hex.length > 24 ? `${hex.slice(0, 16)}…${hex.slice(-8)}` : hex);

async function runChecks(chain: Chain, token: string): Promise<Check[]> {
  const { collection } = config;
  const { view, nowNs } = await chain.pinned();

  const overview = await view<Overview>(token, 'overview');
  // The T2 and T3 checks come from packages/sharded-item, the same code an outside consumer runs.
  const [pair, provenance, letters, item, sealed, settings, sequence, keys, trusteeBytes] = await Promise.all([
    checkPair(chain.client, { collection, item: token }, { indexSequence: 'nft_item_rotation' }),
    checkProvenance(chain.client, { parent: collection }),
    view<LetterView[]>(token, 'letters'),
    view<ItemInfo>(token, 'nft_item_info'),
    view<string>(token, 'sealed_wishes'),
    view<CollectionConfig>(collection, 'config'),
    view<string | null>(collection, 'nft_item_rotation', { token_id: token }),
    chain.accessKeys(token),
    hashOfUrl(overview.trustee.wasm_url),
  ]);

  const { rails, money, worst_case: worst, trustee } = overview;
  const wishes = fromBase64(sealed);
  const wishesHash = toHex(sha256(wishes));
  const printable = longestPrintableRun(wishes);

  const expected = expectedStatus(overview, nowNs);
  const gifts = letters.filter((l) => !l.is_open).reduce((sum, l) => sum + BigInt(l.gift), 0n);
  const again = worstCase({
    perPeriod: BigInt(rails.max_per_period),
    periodNs: BigInt(rails.period_ns),
    gifts,
    floor: BigInt(rails.principal_floor),
    assets: BigInt(money.assets),
    maturityNs: BigInt(worst.matures_at_ns),
    nowNs,
  });

  const perRequest = BigInt(rails.max_per_request);
  const perPeriod = BigInt(rails.max_per_period);
  const assets = BigInt(money.assets);
  const floor = BigInt(rails.principal_floor);
  const matured = overview.stage === 'Matured';

  return [
    {
      title: 'Only the collection could have made this account',
      proves: 'On NEAR, only a parent can create its sub-accounts. This needs no network at all.',
      pass: checkNamespace(token, collection),
      raw: [
        ['account', token],
        ['parent, from this app’s config', collection],
      ],
    },
    {
      title: 'Nobody holds a key to this account',
      proves: 'With no keys, nobody can sign for it. Its code is the only thing that can move its money.',
      pass: keys === 0,
      raw: [['access keys', String(keys)]],
    },
    {
      title: 'The collection and the trust agree on the holder',
      proves: 'The pair check reads both at one final block, so it cannot straddle a transfer.',
      pass: pair.ok && pair.item?.owner_id === pair.token?.owner_id,
      raw: [
        ['nft_item_info.owner_id', pair.item?.owner_id ?? 'none'],
        ['nft_token.owner_id', pair.token?.owner_id ?? 'none'],
        ['read at block', String(pair.height ?? 'none')],
        ...(pair.refusal ? ([['refused', pair.refusal]] as [string, string][]) : []),
      ],
    },
    {
      title: 'They agree on how many times it has moved',
      proves: 'The rotation sequence goes up with every transfer, so an old holder can never be mistaken for the new one.',
      pass: !!sequence && item.rotation_seq === sequence && overview.rotation_seq === sequence,
      raw: [
        ['nft_item_info.rotation_seq', item.rotation_seq],
        ['nft_item_rotation', String(sequence)],
        ['overview.rotation_seq', overview.rotation_seq],
      ],
    },
    {
      title: 'The collection cannot be changed',
      proves: 'A parent with no keys and no setup role can only do what its code says, for good.',
      pass: provenance.sealed && provenance.supported && settings.ops === null,
      raw: [
        ['keys on the collection', provenance.sealed ? '0' : 'some'],
        ['setup role', settings.ops ?? 'ended'],
        ['config_epoch', String(provenance.configEpoch)],
      ],
    },
    {
      title: 'The status tells the truth',
      proves: 'Worked out again here, from public numbers, by the contract’s own rule.',
      pass: item.status === expected,
      raw: [
        ['nft_item_info.status', item.status],
        ['worked out in this browser', expected],
        ['reason', overview.blocked ?? 'requests are open'],
      ],
    },
    {
      title: 'The trustee program is pinned',
      proves: 'The hash was fixed when this trust was made, and nothing can replace it.',
      pass: HASH.test(trustee.wasm_hash) && trustee.wasm_hash === settings.trustee.wasm_hash,
      raw: [
        ['pinned by this trust', short(trustee.wasm_hash)],
        ['published by the collection', short(settings.trustee.wasm_hash)],
        ['url', trustee.wasm_url],
      ],
    },
    {
      title: 'The program at that URL is the pinned one',
      proves: 'This browser downloaded the program and hashed it.',
      pass: trusteeBytes.hash === trustee.wasm_hash,
      raw: [
        ['sha256 of the download', trusteeBytes.hash ? short(trusteeBytes.hash) : (trusteeBytes.error ?? 'none')],
        ['size', trusteeBytes.size ? `${trusteeBytes.size.toLocaleString('en-US')} bytes` : 'unknown'],
      ],
    },
    {
      title: 'The wishes are ciphertext',
      proves: 'They are a sealed box, committed to when the trust was made, with nothing readable in them.',
      pass:
        wishes[0] === 1 &&
        wishes.length > SEALED_OVERHEAD &&
        wishesHash === overview.wishes_sha256 &&
        printable < 16,
      raw: [
        ['first bytes', short(toHex(wishes.subarray(0, 24)))],
        ['size', `${wishes.length.toLocaleString('en-US')} bytes`],
        ['sha256, here', short(wishesHash)],
        ['sha256, on chain', short(overview.wishes_sha256)],
        ['longest readable run', `${printable} bytes`],
      ],
    },
    {
      title: 'The limits make sense',
      proves: 'One request cannot take more than a period allows, and the numbers on the token are the real rails.',
      pass:
        perRequest <= perPeriod &&
        BigInt(rails.period_ns) > 0n &&
        rails.max_requests_per_period > 0 &&
        rails.categories !== 0 &&
        worst.per_period === rails.max_per_period &&
        worst.floor === rails.principal_floor,
      raw: [
        ['one request', `${near(perRequest)} NEAR`],
        ['one period', `${near(perPeriod)} NEAR`],
        ['floor', `${near(floor)} NEAR`],
        ['requests in a period', String(rails.max_requests_per_period)],
      ],
    },
    {
      title: 'The worst case adds up',
      proves: 'Periods left, times the period limit, plus unopened gifts, and never more than what sits above the floor.',
      pass:
        again.untilMaturity === BigInt(worst.until_maturity) &&
        gifts === BigInt(worst.one_time_gifts),
      raw: [
        ['periods left', again.periods.toLocaleString('en-US')],
        ['periods × limit + gifts', `${near(again.cap)} NEAR`],
        ['above the floor', `${near(again.spendable)} NEAR`],
        ['worked out in this browser', `${near(again.untilMaturity)} NEAR`],
        ['worst_case.until_maturity', `${near(worst.until_maturity)} NEAR`],
      ],
    },
    {
      title: matured ? 'The floor has done its job' : 'The assets are above the floor',
      proves: matured
        ? 'After maturity the holder has control, so the floor no longer applies.'
        : 'Neither payouts nor fees can take the trust below this number before it matures.',
      pass: matured || assets >= floor,
      raw: [
        ['assets', `${near(assets)} NEAR`],
        ['floor', `${near(floor)} NEAR`],
      ],
    },
  ];
}

export function Verify({ id }: { id: string }) {
  const chain = useChain();
  const token = tokenId(id);
  useTitle('Check it yourself');
  const checks = useLoad(() => runChecks(chain, token), [token]);

  const passed = checks.data?.filter((c) => c.pass).length ?? 0;
  const total = checks.data?.length ?? 0;
  const allPass = total > 0 && passed === total;

  if (checks.error && !checks.data && /DoesNotExist|does not exist|UNKNOWN_ACCOUNT/i.test(checks.error)) return <NoTrust id={id} />;

  return (
    <div className="page verify">
      <header className="page-head verify-head">
        <div>
          <p className="kicker">For anyone who wants proof</p>
          <h1>Check this trust yourself.</h1>
          <p className="lede">
            Every line here is worked out in your browser, from what the chain says right now, using the same checks as
            the <code>sharded-item</code> SDK. The raw values are shown, so you need not take the page's word for it.
          </p>
          <p className="acct verify-id">{token}</p>
        </div>
        {checks.data && (
          <div className={allPass ? 'verdict is-pass' : 'verdict is-fail'} role="status">
            <WaxSeal size={84} gold={allPass} />
            <p>
              <strong>
                {passed} of {total}
              </strong>{' '}
              checks pass
            </p>
          </div>
        )}
      </header>

      {checks.loading && !checks.data && <Loading what="Running the checks" />}
      {checks.error && !checks.data && <ErrorNote message={checks.error} onRetry={() => void checks.reload()} />}

      {checks.data && (
        <ol className="checks">
          {checks.data.map((check) => (
            <li key={check.title} className="check">
              <Stamp tone={check.pass ? 'leaf' : 'wax'}>{check.pass ? 'Pass' : 'Fail'}</Stamp>
              <div className="check-body">
                <h2>{check.title}</h2>
                <p>{check.proves}</p>
                <dl className="raw">
                  {check.raw.map(([key, value]) => (
                    <div key={key}>
                      <dt>{key}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </li>
          ))}
        </ol>
      )}

      <div className="actions">
        <button type="button" className="btn" onClick={() => void checks.reload()}>
          Run them again
        </button>
        <Link className="btn" to={`/t/${id}`}>
          Back to the trust
        </Link>
      </div>
    </div>
  );
}
