import { useState, type FormEvent } from 'react';
import { Link, useLocation } from 'react-router';
import { useChain } from '../chain/context';
import { Field } from '../components/Field';
import { Empty, ErrorNote, Loading, NoTrust, SignInNote, Stamp } from '../components/States';
import { config, tokenId } from '../config';
import { categoriesIn, outcomeLine, payeesText, REASONS, stampOf } from '../lib/copy';
import { ago, amountOf, count, dateText, DAY_NS, HOUR_NS, messageOf, nearText, toYocto } from '../lib/format';
import { readTrust, type TrustState } from '../lib/trust';
import type { Decision, ItemStatus } from '../lib/types';
import { useLoad } from '../lib/useLoad';
import { useTitle } from '../lib/useTitle';
import { periodName, worstSentence } from '../lib/worst';

function statusOf(status: ItemStatus, blocked: string | null) {
  if (status === 'Active') return { tone: 'leaf' as const, label: 'Open', detail: 'The holder can ask.' };
  if (status === 'Expired') {
    return { tone: 'gold' as const, label: 'Matured', detail: 'It has passed to the holder.' };
  }
  return { tone: 'ink' as const, label: status === 'Frozen' ? 'Waiting' : 'Paused', detail: blocked ? `${blocked}.` : '' };
}

function cooldownText(ns: string) {
  const value = BigInt(ns);
  if (value === 0n) return 'None';
  if (value % DAY_NS === 0n) return count(Number(value / DAY_NS), 'day');
  return count(Math.ceil(Number(value) / Number(HOUR_NS)), 'hour');
}

function DecisionRow({ decision: d, nowNs }: { decision: Decision; nowNs: bigint }) {
  const stamp = stampOf(d);
  const milestone = d.kind !== 'Ask';
  return (
    <li className="decision">
      <Stamp tone={stamp.tone}>{stamp.label}</Stamp>
      <div>
        <p>
          {milestone ? 'A milestone claim' : `Asked for ${nearText(d.asked)}`}. {outcomeLine(d)}
        </p>
        <p className="decision-why">{REASONS[d.reason]}</p>
        {d.said && <p className="decision-said">"{d.said}"</p>}
      </div>
      <time>{ago(d.at_ns, nowNs)}</time>
    </li>
  );
}

type Notice = { ok: boolean; text: string } | null;

function useAction(reload: () => Promise<void>) {
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice>(null);

  const run = async (name: string, action: () => Promise<string>) => {
    setBusy(name);
    setNotice(null);
    try {
      setNotice({ ok: true, text: await action() });
      await reload();
    } catch (err) {
      setNotice({ ok: false, text: messageOf(err) });
    } finally {
      setBusy(null);
    }
  };

  return { busy, notice, run };
}

function Anyone({ state, token, reload }: { state: TrustState; token: string; reload: () => Promise<void> }) {
  const chain = useChain();
  const { busy, notice, run } = useAction(reload);
  const [amount, setAmount] = useState('1');
  const { overview, nowNs } = state;
  const dateHasPassed = nowNs >= BigInt(overview.worst_case.matures_at_ns);
  const canMature = overview.stage === 'Live' && dateHasPassed;

  const done = async (receiver: string, method: string, ok: string, deposit = '0') => {
    const result = await chain.call(receiver, method, {}, deposit);
    if (!result.ok) throw new Error(result.error ?? 'It did not go through.');
    return ok;
  };

  return (
    <section className="panel" aria-labelledby="anyone">
      <h2 id="anyone" className="section-title">
        Anyone can do these
      </h2>
      {!chain.accountId ? (
        <SignInNote doing="do these" />
      ) : (
        <div className="panel-actions">
          <div className="panel-action">
            <p>
              <strong>Bring the books up to date.</strong> Reads the pool, collects any yield and moves money between
              the pool and the liquid part. No keeper is needed.
            </p>
            <button
              type="button"
              className="btn"
              disabled={!!busy}
              onClick={() => void run('rebalance', () => done(token, 'rebalance', 'Updated from the pool.'))}
            >
              {busy === 'rebalance' ? 'Updating' : 'Rebalance'}
            </button>
          </div>

          <form
            className="panel-action"
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              if (amountOf(amount) === null || amountOf(amount) === 0n) return;
              void run('contribute', () =>
                done(token, 'contribute', `Added ${amount} NEAR to the trust.`, toYocto(amount)),
              );
            }}
          >
            <p>
              <strong>Add to this trust.</strong> A cousin, say. The money follows the same rules as the rest.
            </p>
            <div className="inline-form">
              <Field label="Amount (NEAR)" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} />
              <button type="submit" className="btn" disabled={!!busy}>
                {busy === 'contribute' ? 'Adding' : 'Contribute'}
              </button>
            </div>
          </form>

          <div className="panel-action">
            <p>
              <strong>Trigger maturity.</strong>{' '}
              {overview.stage === 'Matured'
                ? 'This trust has matured.'
                : canMature
                  ? 'The date has passed. Anyone can press this, and nobody can stop it.'
                  : `Possible from ${dateText(overview.worst_case.matures_at_ns)}. Nobody can do it sooner, or stop it after.`}
            </p>
            <button
              type="button"
              className="btn"
              disabled={!canMature || !!busy}
              onClick={() => void run('mature', () => done(token, 'mature', 'The trust has matured.'))}
            >
              {busy === 'mature' ? 'Maturing' : 'Mature'}
            </button>
          </div>
        </div>
      )}
      {notice && <Result notice={notice} />}
    </section>
  );
}

function Result({ notice }: { notice: NonNullable<Notice> }) {
  return (
    <p className={notice.ok ? 'result result-ok' : 'result result-error'} role="status">
      {notice.text}
    </p>
  );
}

function Ownership({ state, token, reload }: { state: TrustState; token: string; reload: () => Promise<void> }) {
  const chain = useChain();
  const { busy, notice, run } = useAction(reload);
  const [receiver, setReceiver] = useState('');
  const [price, setPrice] = useState('');
  const { overview, entry } = state;
  const me = chain.accountId;
  const isHolder = me === overview.holder;
  const canMove = overview.transfer === 'Free' || overview.stage === 'Matured';
  const listed = entry.listed;

  const collection = async (method: string, args: object, deposit: string, ok: string) => {
    const result = await chain.call(config.collection, method, args, deposit);
    if (!result.ok) throw new Error(result.error ?? 'It did not go through.');
    return ok;
  };

  if (!isHolder && !listed) {
    return notice ? <Result notice={notice} /> : null;
  }

  return (
    <section className="panel" aria-labelledby="ownership">
      <h2 id="ownership" className="section-title">
        {isHolder ? 'You hold this trust' : 'For sale'}
      </h2>

      {isHolder && !canMove && (
        <p>This trust cannot move until {dateText(overview.worst_case.matures_at_ns)}. Its creator locked it.</p>
      )}

      {isHolder && canMove && (
        <div className="panel-actions">
          <form
            className="panel-action"
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              const to = receiver.trim();
              if (!to) return;
              void run('transfer', async () => {
                const ok = await collection(
                  'nft_transfer',
                  { receiver_id: to, token_id: token },
                  '1',
                  `This trust now belongs to ${to}.`,
                );
                setReceiver('');
                return ok;
              });
            }}
          >
            <p>
              <strong>Pass it on.</strong> The next holder takes everything. The trustee's private notes about you are
              wiped, and any decision still in progress dies.
            </p>
            <div className="inline-form">
              <Field
                label="To account"
                value={receiver}
                placeholder="noah.testnet"
                autoCapitalize="none"
                spellCheck={false}
                onChange={(e) => setReceiver(e.target.value)}
              />
              <button type="submit" className="btn" disabled={!!busy || !receiver.trim()}>
                {busy === 'transfer' ? 'Passing it on' : 'Transfer'}
              </button>
            </div>
          </form>

          {listed ? (
            <div className="panel-action">
              <p>
                <strong>Listed for {nearText(listed)}.</strong> A buyer pays you, and the trust moves in one step.
              </p>
              <button
                type="button"
                className="btn"
                disabled={!!busy}
                onClick={() =>
                  void run('unlist', () => collection('unlist', { token_id: token }, '1', 'Taken off sale.'))
                }
              >
                {busy === 'unlist' ? 'Taking it off' : 'Take off sale'}
              </button>
            </div>
          ) : (
            <form
              className="panel-action"
              onSubmit={(e: FormEvent) => {
                e.preventDefault();
                if (!amountOf(price)) return;
                void run('list', async () => {
                  const ok = await collection(
                    'list',
                    { token_id: token, price: toYocto(price) },
                    '1',
                    `Listed for ${price} NEAR.`,
                  );
                  setPrice('');
                  return ok;
                });
              }}
            >
              <p>
                <strong>List it for sale.</strong> A sale cannot take the money with you. Nothing leaves the trust.
              </p>
              <div className="inline-form">
                <Field label="Price (NEAR)" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
                <button type="submit" className="btn" disabled={!!busy || !amountOf(price)}>
                  {busy === 'list' ? 'Listing' : 'List'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {!isHolder && listed && (
        <div className="panel-action">
          <p>
            <strong>{overview.holder} is selling this trust for {nearText(listed)}.</strong> What you see here is bound
            to your purchase. If a payout happens first, the sale stops and your money comes back.
          </p>
          {me ? (
            <button
              type="button"
              className="btn btn-wax"
              disabled={!!busy}
              onClick={() =>
                void run('buy', () =>
                  collection(
                    'buy',
                    { token_id: token, expected_nonce: overview.payout_nonce },
                    listed,
                    'It is yours. The room now opens for you.',
                  ),
                )
              }
            >
              {busy === 'buy' ? 'Buying' : `Buy for ${nearText(listed)}`}
            </button>
          ) : (
            <SignInNote doing="buy it" />
          )}
        </div>
      )}
      {notice && <Result notice={notice} />}
    </section>
  );
}

export function TrustPage({ id }: { id: string }) {
  const chain = useChain();
  const token = tokenId(id);
  const location = useLocation();
  const state = useLoad(() => readTrust(chain, token), [token], { poll: 6000 });
  useTitle(state.data?.overview.title ?? 'Trust');

  if (state.loading && !state.data) {
    return (
      <div className="page narrow">
        <Loading />
      </div>
    );
  }
  if (!state.data) {
    if (state.error && /no trust|DoesNotExist|does not exist|UNKNOWN_ACCOUNT/i.test(state.error)) return <NoTrust id={id} />;
    return (
      <div className="page narrow">
        <ErrorNote message={state.error ?? 'The chain did not answer.'} onRetry={() => void state.reload()} />
      </div>
    );
  }

  const { token: nft, overview, letters, decisions, holders, item, nowNs } = state.data;
  const { rails, money, worst_case: worst } = overview;
  const status = statusOf(item.status, overview.blocked);
  const categories = categoriesIn(rails.categories).map((c) => c.name);
  const created = (location.state as { created?: boolean } | null)?.created;

  return (
    <div className="page">
      {created && (
        <p className="result result-ok" role="status">
          The trust exists. Its wishes and letters are sealed, and nobody can change them now.
        </p>
      )}
      <section className="trust-head">
        <div className="trust-picture">
          {nft.metadata?.media && (
            <img src={nft.metadata.media} alt={`The NFT for ${overview.title}, drawn on chain from live state.`} />
          )}
          <p className="caption">Drawn on chain from live state.</p>
        </div>
        <div className="trust-title">
          <h1>{overview.title}</h1>
          <p className="trust-id acct">{token}</p>
          <dl className="trust-facts">
            <div>
              <dt>Held by</dt>
              <dd className="acct">{overview.holder}</dd>
            </div>
            <div>
              <dt>Created by</dt>
              <dd className="acct">{overview.creator}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                <Stamp tone={status.tone}>{status.label}</Stamp> {status.detail}
              </dd>
            </div>
          </dl>

          <div className="worst">
            {overview.stage === 'Matured' ? (
              <>
                <p className="worst-line">This trust has matured. What is left belongs to its holder.</p>
                <p className="worst-more">The limits ended on {dateText(worst.matures_at_ns)}, as they were written.</p>
              </>
            ) : (
              <>
                <p className="worst-line">{worstSentence(worst.per_period, worst.period_ns, worst.floor)}</p>
                <p className="worst-more">
                  {nowNs >= BigInt(worst.matures_at_ns) ? (
                    <>Its date, {dateText(worst.matures_at_ns)}, has passed. Anyone can trigger maturity now.</>
                  ) : (
                    <>
                      Until it matures on {dateText(worst.matures_at_ns)}, the most it can lose in total is{' '}
                      {nearText(worst.until_maturity)}
                      {BigInt(worst.one_time_gifts) > 0n
                        ? `, including ${nearText(worst.one_time_gifts)} in one-time gifts`
                        : ''}
                      . The contract enforces this, not the AI.
                    </>
                  )}
                </p>
              </>
            )}
          </div>

          <div className="actions">
            {overview.public_room ? (
              <Link className="btn btn-wax" to="/try">
                Talk to the trustee
              </Link>
            ) : (
              <Link className="btn btn-wax" to={`/t/${id}/room`}>
                Open the room
              </Link>
            )}
            <Link className="btn" to={`/verify/${id}`}>
              Check it yourself
            </Link>
          </div>
        </div>
      </section>

      <div className="trust-grid">
        <section aria-labelledby="money">
          <h2 id="money" className="section-title">
            The money
          </h2>
          <dl className="ledger">
            <div>
              <dt>Assets</dt>
              <dd>{nearText(money.assets)}</dd>
              <dd className="ledger-note">Everything it holds.</dd>
            </div>
            <div>
              <dt>Staked</dt>
              <dd>{nearText(money.in_pool)}</dd>
              <dd className="ledger-note">
                With <span className="acct">{money.pool}</span>, last read {ago(money.pool_synced_ns, nowNs)}.
              </dd>
            </div>
            <div>
              <dt>Earned from yield</dt>
              <dd>{nearText(money.yield_earned)}</dd>
              <dd className="ledger-note">Paid by the staking pool.</dd>
            </div>
            <div>
              <dt>Paid in fees</dt>
              <dd>{nearText(money.fees_paid)}</dd>
              <dd className="ledger-note">What the trustee's runs have cost.</dd>
            </div>
            <div>
              <dt>Given out</dt>
              <dd>{nearText(money.distributed)}</dd>
              <dd className="ledger-note">Paid to the holder or to providers.</dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="limits">
          <h2 id="limits" className="section-title">
            The limits
          </h2>
          <dl className="ledger">
            <div>
              <dt>In one request</dt>
              <dd>At most {nearText(rails.max_per_request)}</dd>
            </div>
            <div>
              <dt>In one {periodName(rails.period_ns)}</dt>
              <dd>At most {nearText(rails.max_per_period)}</dd>
              <dd className="ledger-note">{count(rails.max_requests_per_period, 'request')} at most.</dd>
            </div>
            <div>
              <dt>Wait between requests</dt>
              <dd>{cooldownText(rails.cooldown_ns)}</dd>
            </div>
            <div>
              <dt>Never below</dt>
              <dd>{nearText(rails.principal_floor)}</dd>
              <dd className="ledger-note">Not for payouts, not for fees, until it matures.</dd>
            </div>
            <div>
              <dt>Only for</dt>
              <dd>{categories.join(', ')}</dd>
            </div>
            <div>
              <dt>Paid to</dt>
              <dd>{payeesText(rails.payees)}</dd>
            </div>
            <div>
              <dt>Can it move?</dt>
              <dd>{overview.transfer === 'Free' ? 'Yes, the holder may pass it on' : 'Not before it matures'}</dd>
            </div>
          </dl>
        </section>
      </div>

      <section aria-labelledby="letters">
        <h2 id="letters" className="section-title">
          Letters
        </h2>
        {letters.length === 0 ? (
          <Empty title="No letters in this trust." />
        ) : (
          <ul className="letters-row">
            {letters.map((letter) => (
              <li key={letter.index} className={letter.is_open ? 'letter-card is-open' : 'letter-card'}>
                <h3>{letter.title}</h3>
                <p>
                  {letter.is_open ? 'Opened' : 'Sealed'}
                  {BigInt(letter.gift) > 0n ? `, with a gift of ${nearText(letter.gift)}` : ''}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="decisions">
        <h2 id="decisions" className="section-title">
          Recent decisions
        </h2>
        {decisions.length === 0 ? (
          <Empty title="Nothing has been asked yet." />
        ) : (
          <ol className="decisions">
            {decisions.map((d) => (
              <DecisionRow key={d.id} decision={d} nowNs={nowNs} />
            ))}
          </ol>
        )}
        {!overview.public_room && decisions.length > 0 && (
          <p className="caption">What was said is sealed to the holder. Only the outcomes are public.</p>
        )}
      </section>

      <section aria-labelledby="held">
        <h2 id="held" className="section-title">
          Who has held it
        </h2>
        <ol className="holders">
          {holders.map((h) => (
            <li key={h.from_ns}>
              <span className="acct">{h.holder}</span>
              <span>
                {dateText(h.from_ns)} to {h.to_ns ? dateText(h.to_ns) : 'now'}
              </span>
              <span>Received {nearText(h.received)}</span>
            </li>
          ))}
        </ol>
      </section>

      <Ownership key={`o-${chain.accountId}`} state={state.data} token={token} reload={state.reload} />
      <Anyone key={`a-${chain.accountId}`} state={state.data} token={token} reload={state.reload} />
    </div>
  );
}
