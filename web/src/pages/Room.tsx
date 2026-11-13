import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { useChain } from '../chain/context';
import { Field } from '../components/Field';
import { LetterMoment } from '../components/LetterMoment';
import { WaxSeal } from '../components/Seal';
import { ErrorNote, Loading, NoTrust, Stamp } from '../components/States';
import { config, tokenId } from '../config';
import { categoriesIn, outcomeLine, payeesOf, stampOf } from '../lib/copy';
import { amountInText, amountOf, count, dateText, messageOf, near, nearText, toYocto, utf8Length } from '../lib/format';
import { openLetter, openReply, recallWords, rememberWords, roomKey, sealMessage, type RoomKey } from '../lib/room';
import { patiently, readGate, readTrust, waitForDecision, type Gate } from '../lib/trust';
import type { CollectionConfig, Decision, LetterView, Overview } from '../lib/types';
import { useLoad } from '../lib/useLoad';
import { useTitle } from '../lib/useTitle';
import { periodName } from '../lib/worst';

/** The contract refuses a sealed message over 2,048 bytes, and sealing adds 61. */
const MAX_WORDS = 1_980;

function Threshold({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="page narrow threshold">
      <WaxSeal size={72} />
      <h1>{title}</h1>
      {children}
    </div>
  );
}

function Turn({ decision: d, room, token }: { decision: Decision; room: RoomKey | null; token: string }) {
  const { scope } = useChain();
  const stamp = stampOf(d);
  const words = recallWords(scope, token, d.id);
  const reply = d.reply && room ? openReply(room, token, d.id, d.reply) : null;
  return (
    <li className="turn">
      <div className="turn-you">
        <span className="turn-who">You</span>
        <p>{words ?? <em>Your words stay in the browser you wrote them in.</em>}</p>
      </div>
      <div className="turn-trustee">
        <span className="turn-who">Trustee</span>
        <p>{reply ?? <em>{d.reply ? 'This reply was sealed to a different key.' : 'No reply came back.'}</em>}</p>
        <div className="turn-result">
          <Stamp tone={stamp.tone}>{stamp.label}</Stamp>
          <span>{outcomeLine(d)}</span>
        </div>
      </div>
    </li>
  );
}

type Moment = { title: string; text: string; enclosed?: string; sealed: boolean };

function LetterShelf({
  letters,
  room,
  token,
  holder,
  canClaim,
  claiming,
  onClaim,
  onRead,
}: {
  letters: LetterView[];
  room: RoomKey | null;
  token: string;
  holder: string;
  canClaim: boolean;
  claiming: number | null;
  onClaim: (index: number | null) => void;
  onRead: (moment: Moment) => void;
}) {
  if (letters.length === 0) return null;
  return (
    <section aria-labelledby="room-letters">
      <h2 id="room-letters" className="side-title">
        Letters left for you
      </h2>
      <ul className="shelf">
        {letters.map((letter) => {
          const text = letter.opened && room ? openLetter(room, token, letter.index, letter.opened) : null;
          const gift = BigInt(letter.gift) > 0n;
          return (
            <li key={letter.index} className={letter.is_open ? 'shelf-letter is-open' : 'shelf-letter'}>
              <h3>{letter.title}</h3>
              {letter.is_open ? (
                text ? (
                  <button
                    type="button"
                    className="btn-link"
                    onClick={() =>
                      onRead({
                        title: letter.title,
                        text,
                        enclosed: gift ? `Enclosed: ${nearText(letter.gift)}, sent to ${holder}.` : undefined,
                        sealed: false,
                      })
                    }
                  >
                    Read it again
                  </button>
                ) : (
                  <p>Opened for an earlier holder. It stays with them.</p>
                )
              ) : (
                <>
                  <p>Sealed{gift ? `, with a gift of ${nearText(letter.gift)}` : ''}.</p>
                  {canClaim && (
                    <button
                      type="button"
                      className="btn-link"
                      aria-pressed={claiming === letter.index}
                      onClick={() => onClaim(claiming === letter.index ? null : letter.index)}
                    >
                      {claiming === letter.index ? 'Not now' : 'This has happened'}
                    </button>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Matured({ overview, token, reload }: { overview: Overview; token: string; reload: () => Promise<void> }) {
  const chain = useChain();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const liquid = BigInt(overview.money.liquid);
  const staked = BigInt(overview.money.in_pool) > 0n;

  const claim = async () => {
    setBusy(true);
    setError(null);
    try {
      const result = await chain.call(token, 'claim');
      if (!result.ok) throw new Error(result.error ?? 'It did not go through.');
      setDone(`${nearText(overview.money.liquid)} is yours.`);
      await reload();
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="matured">
      <h2>This trust has matured. It is yours.</h2>
      <p>
        {liquid > 0n
          ? `${nearText(liquid)} is ready to take. Anything still staked comes out after unstaking.`
          : staked
            ? 'Nothing is liquid yet. Rebalance on the trust page to start unstaking.'
            : 'Everything has been taken.'}
      </p>
      {liquid > 0n && (
        <button type="button" className="btn btn-wax" disabled={busy} onClick={() => void claim()}>
          {busy ? 'Taking it' : `Take ${nearText(liquid)}`}
        </button>
      )}
      {done && <p className="result result-ok">{done}</p>}
      {error && <ErrorNote message={error} />}
    </div>
  );
}

function OpenRoom({ token, id, recheck }: { token: string; id: string; recheck: () => Promise<void> }) {
  const chain = useChain();
  const me = chain.accountId as string;
  const state = useLoad(() => readTrust(chain, token), [token], { poll: 8000 });

  const [room, setRoom] = useState<RoomKey | null>(null);
  const [roomError, setRoomError] = useState<string | null>(null);
  const local = chain.network === 'local';

  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<number | null>(null);
  const [payee, setPayee] = useState<string | null>(null);
  const [claiming, setClaiming] = useState<number | null>(null);
  const [waiting, setWaiting] = useState<{ words: string; claim: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [moment, setMoment] = useState<Moment | null>(null);
  const box = useRef<HTMLTextAreaElement>(null);
  const end = useRef<HTMLDivElement>(null);

  const openRoom = async () => {
    setRoomError(null);
    try {
      setRoom(await roomKey(chain, token));
    } catch (err) {
      setRoomError(messageOf(err));
    }
  };

  useEffect(() => {
    if (local) void openRoom();
    // The room key depends only on who is here and which trust this is.
  }, [local, me, token]);

  useEffect(() => {
    if (waiting) end.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [waiting]);

  if (state.loading && !state.data) {
    return (
      <div className="page narrow">
        <Loading what="Opening the room" />
      </div>
    );
  }
  if (!state.data) {
    return (
      <div className="page narrow">
        <ErrorNote message={state.error ?? 'The chain did not answer.'} onRetry={() => void state.reload()} />
      </div>
    );
  }

  const { overview, letters, decisions } = state.data;
  const { rails } = overview;

  const allowed = categoriesIn(rails.categories);
  const payees = payeesOf(rails.payees, me);
  const chosenCategory = category ?? allowed[0]?.code ?? 0;
  const chosenPayee = payee ?? payees[0] ?? me;

  const left = BigInt(rails.max_per_period) - BigInt(overview.window_spent);
  const requestsLeft = rails.max_requests_per_period - overview.window_requests;
  const conversation = decisions
    .filter((d) => d.holder === me && d.rotation_seq === overview.rotation_seq)
    .reverse();

  const live = overview.stage === 'Live';
  const size = utf8Length(text);
  const tooLong = size > MAX_WORDS;
  const claimedLetter = claiming === null ? null : letters[claiming];

  const send = async (event: FormEvent) => {
    event.preventDefault();
    const words = text.trim();
    if (!words || tooLong || !room || waiting) return;
    setError(null);

    const claim = claiming;
    setWaiting({ words, claim: claim !== null });
    setText('');
    try {
      // The holder is read again before every action, not only when the page opens.
      const gate = await readGate(chain, token);
      if (gate.state !== 'open' || gate.holder !== me) {
        await recheck();
        return;
      }

      const settings = await chain.view<CollectionConfig>(config.collection, 'config');
      if (!settings.sealing_key) throw new Error('The collection has no sealing key yet.');

      const sent = await chain.call(token, 'request', {
        kind: claim === null ? 'Ask' : { Milestone: { index: claim } },
        amount: claim === null ? toYocto(amountOf(amount) === null ? '0' : amount) : '0',
        category: chosenCategory,
        payee: claim === null ? chosenPayee : payees.includes(me) ? me : chosenPayee,
        message: sealMessage(settings.sealing_key, token, me, words),
        reply_key: room.publicHex,
      });
      if (!sent.ok) throw new Error(sent.error ?? 'The trust did not take the request.');

      const received = sent.events.find((e) => e.event === 'request_received');
      const decisionId =
        (received?.data as { id?: string } | undefined)?.id ??
        (await chain.view<Overview>(token, 'overview')).pending?.id;
      if (!decisionId) throw new Error('The request was sent, but its decision could not be found.');

      rememberWords(chain.scope, token, decisionId, words);
      const decision = await waitForDecision(chain, token, decisionId);
      await state.reload().catch(() => {});

      setAmount('');
      setClaiming(null);

      if (claim !== null && decision && (decision.outcome === 'Approved' || decision.outcome === 'Clamped')) {
        const after = await patiently(() => chain.view<LetterView[]>(token, 'letters'));
        const letter = after[claim];
        const opened = letter?.opened ? openLetter(room, token, claim, letter.opened) : null;
        if (opened) {
          setMoment({
            title: letter.title,
            text: opened,
            enclosed: BigInt(decision.granted) > 0n ? `Enclosed: ${nearText(decision.granted)}, sent to ${decision.payee}.` : undefined,
            sealed: true,
          });
        }
      }
    } catch (err) {
      setError(messageOf(err));
      setText(words);
    } finally {
      setWaiting(null);
    }
  };

  return (
    <div className="page room">
      <header className="room-head">
        <p className="kicker">The room</p>
        <h1>{overview.title}</h1>
        <p className="room-check">
          Read from the chain just now: <span className="acct">{me}</span> holds this trust.
        </p>
      </header>

      {!room && !local && (
        <div className="note-card">
          <h2>Open your room</h2>
          <p>
            Your wallet will ask you to sign a message. It costs nothing. The signature makes the key that opens your
            replies and letters, and it stays in this browser.
          </p>
          <button type="button" className="btn btn-wax" onClick={() => void openRoom()}>
            Open the room
          </button>
          {roomError && <ErrorNote message={roomError} />}
        </div>
      )}

      <div className="room-grid">
        <div className="room-main">
          {conversation.length === 0 && !waiting && (
            <div className="room-empty">
              <p className="empty-title">Nothing has been said in this room yet.</p>
              <p>
                The trustee has read what was left for you, and it remembers nothing about anyone who held this before.
                Ask for what you need, in your own words.
              </p>
            </div>
          )}

          <ol className="turns">
            {conversation.map((d) => (
              <Turn key={d.id} decision={d} room={room} token={token} />
            ))}
            {waiting && (
              <li className="turn is-waiting">
                <div className="turn-you">
                  <span className="turn-who">You</span>
                  <p>{waiting.words}</p>
                </div>
                <div className="turn-trustee" aria-live="polite">
                  <span className="turn-who">Trustee</span>
                  <p className="quiet-state">
                    <span className="breath" aria-hidden="true" />{' '}
                    {waiting.claim ? 'The trustee is checking this against the sealed condition.' : 'The trustee is reading.'}
                  </p>
                  <p className="caption">
                    {local ? 'On a real network this takes 10 to 30 seconds.' : 'This takes 10 to 30 seconds.'} It runs in an enclave, and the contract checks the answer.
                  </p>
                </div>
              </li>
            )}
          </ol>
          <div ref={end} />

          {live ? (
            <form className="composer" onSubmit={send}>
              {claimedLetter && (
                <p className="claiming">
                  Claiming <strong>{claimedLetter.title}</strong>. Tell the trustee what happened. They will check it
                  against a condition only they can read.
                </p>
              )}
              <div className="field">
                <label htmlFor="words">
                  {claimedLetter ? 'What happened?' : 'What do you need?'}
                </label>
                <textarea
                  id="words"
                  ref={box}
                  rows={3}
                  value={text}
                  disabled={!!waiting}
                  onChange={(e) => {
                    setText(e.target.value);
                    const inText = amountInText(e.target.value);
                    if (inText) setAmount(inText);
                  }}
                  aria-describedby="words-hint"
                />
                <p id="words-hint" className="field-hint">
                  Sealed in this browser before it is sent. Only the trustee's enclave can read it.
                </p>
                {tooLong && <p className="field-error">That is too long. Keep it under {MAX_WORDS} bytes.</p>}
              </div>

              {!claimedLetter && (
                <div className="composer-row composer-terms">
                  <Field
                    label="Amount (NEAR)"
                    inputMode="decimal"
                    value={amount}
                    placeholder="0"
                    disabled={!!waiting}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <div className="field">
                    <label htmlFor="category">For</label>
                    <select
                      id="category"
                      value={chosenCategory}
                      disabled={!!waiting}
                      onChange={(e) => setCategory(Number(e.target.value))}
                    >
                      {allowed.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="payee">Pay to</label>
                    <select id="payee" value={chosenPayee} disabled={!!waiting} onChange={(e) => setPayee(e.target.value)}>
                      {payees.map((p) => (
                        <option key={p} value={p}>
                          {p === me ? 'Me' : p}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className="composer-send">
                <button
                  type="submit"
                  className="btn btn-wax"
                  disabled={!text.trim() || tooLong || !!waiting || !room || !!overview.blocked}
                >
                  {claimedLetter ? 'Tell the trustee' : 'Ask the trustee'}
                </button>
                {overview.blocked && <p className="field-hint">Right now: {overview.blocked}.</p>}
              </div>
              {error && <ErrorNote message={error} />}
            </form>
          ) : (
            <Matured overview={overview} token={token} reload={state.reload} />
          )}
        </div>

        <aside className="room-side">
          {live && (
            <section aria-labelledby="room-limits">
              <h2 id="room-limits" className="side-title">
                This {periodName(rails.period_ns)}
              </h2>
              <dl className="ledger compact">
                <div>
                  <dt>Still possible</dt>
                  <dd>{nearText(left > 0n ? left : 0n)}</dd>
                </div>
                <div>
                  <dt>In one request</dt>
                  <dd>{near(rails.max_per_request)} NEAR at most</dd>
                </div>
                <div>
                  <dt>Requests left</dt>
                  <dd>{count(Math.max(0, requestsLeft), 'request')}</dd>
                </div>
              </dl>
              <p className="caption">The trustee can give less than these. The contract never pays more.</p>
            </section>
          )}

          <LetterShelf
            letters={letters}
            room={room}
            token={token}
            holder={me}
            canClaim={live}
            claiming={claiming}
            onClaim={(index) => {
              setClaiming(index);
              if (index !== null) box.current?.focus();
            }}
            onRead={setMoment}
          />

          <p>
            <Link to={`/t/${id}`}>The public page</Link> · <Link to={`/verify/${id}`}>Check it yourself</Link>
          </p>
        </aside>
      </div>

      {moment && <LetterMoment {...moment} onClose={() => setMoment(null)} />}
    </div>
  );
}

function Locked({ id, gate }: { id: string; gate: Extract<Gate, { state: 'locked' }> }) {
  return (
    <Threshold title="This trust does not open for you.">
      <p className="lede">
        Only its holder can enter, and that is <span className="acct">{gate.holder}</span>. The chain says so, and it
        was read just now.
      </p>
      <Link className="btn" to={`/t/${id}`}>
        See the public page
      </Link>
    </Threshold>
  );
}

function MovedOn({ id, gate }: { id: string; gate: Extract<Gate, { state: 'moved' }> }) {
  return (
    <Threshold title="This trust has moved on.">
      <p className="lede">
        It is with <span className="acct">{gate.holder}</span> now. You held it until{' '}
        {gate.record.to_ns ? dateText(gate.record.to_ns) : 'recently'} and received {nearText(gate.record.received)}. The
        trustee's notes about you were wiped when it left.
      </p>
      <Link className="btn" to={`/t/${id}`}>
        See the public page
      </Link>
    </Threshold>
  );
}

export function Room({ id }: { id: string }) {
  const chain = useChain();
  const token = tokenId(id);
  useTitle('The room');
  const gate = useLoad(
    async () => ({ account: chain.accountId, gate: await readGate(chain, token) }),
    [token, chain.accountId],
  );

  if (gate.loading || gate.data?.account !== chain.accountId) {
    if (!gate.data || gate.data.account !== chain.accountId) {
      return (
        <div className="page narrow">
          <Loading what="Reading who holds this trust" />
        </div>
      );
    }
  }
  if (!gate.data) {
    return (
      <div className="page narrow">
        <ErrorNote message={gate.error ?? 'The chain did not answer.'} onRetry={() => void gate.reload()} />
      </div>
    );
  }

  const current = gate.data.gate;
  switch (current.state) {
    case 'missing':
      return <NoTrust id={id} />;
    case 'moving':
      return (
        <Threshold title="This trust is changing hands.">
          <p className="lede">The trust and the collection do not agree yet. This settles in a moment.</p>
          <button type="button" className="btn" onClick={() => void gate.reload()}>
            Read it again
          </button>
        </Threshold>
      );
    case 'refused':
      return (
        <Threshold title="This trust failed its check.">
          <p className="lede">
            The trust and the collection disagree in a way that cannot be a transfer settling ({current.refusal}). The
            room stays shut.
          </p>
          <Link className="btn" to={`/verify/${id}`}>
            See the checks
          </Link>
        </Threshold>
      );
    case 'signed-out':
      return (
        <Threshold title="Sign in to open this trust.">
          <p className="lede">Only its holder can enter.</p>
          <button type="button" className="btn btn-wax" onClick={() => void chain.signIn()}>
            Sign in
          </button>
        </Threshold>
      );
    case 'locked':
      return <Locked id={id} gate={current} />;
    case 'moved':
      return <MovedOn id={id} gate={current} />;
    case 'open':
      return <OpenRoom key={chain.accountId} token={token} id={id} recheck={gate.reload} />;
  }
}
