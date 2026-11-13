import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { contexts, seal, toBase64, toHex } from '../../../packages/sealbox/sealbox.mjs';
import { useChain } from '../chain/context';
import { Field, TextField } from '../components/Field';
import { WaxSeal } from '../components/Seal';
import { ErrorNote, Loading, SignInNote } from '../components/States';
import { config, tokenId } from '../config';
import { CATEGORIES } from '../lib/copy';
import { amountOf, dateText, DAY_NS, HOUR_NS, messageOf, near, nearText, toYocto, utf8Length } from '../lib/format';
import type { CollectionConfig, PayeePolicy, Rails, Token } from '../lib/types';
import { useLoad } from '../lib/useLoad';
import { useTitle } from '../lib/useTitle';
import { poolVerdict, readPools } from '../lib/validators';
import { worstCase, worstSentence } from '../lib/worst';

const STEPS = ['Who it is for', 'Wishes', 'Limits', 'Letters', 'Funding'];

/** Sealing adds 61 bytes. The contract stops at 6,000 for wishes and 4,000 for a letter. */
const MAX_WISHES = 5_939;
const MAX_LETTER = 3_900;
const MAX_LETTERS = 8;
const MAX_TITLE = 64;
const MIN_LIQUID = toYocto('0.1');
/** About what a new trust costs before it can spend: the index fee, storage and a safety pad. */
const SET_ASIDE = BigInt(toYocto('0.18'));

const ACCOUNT = /^(?:[a-z\d]+[-_])*[a-z\d]+(?:\.(?:[a-z\d]+[-_])*[a-z\d]+)*$/;
const LABEL = /^[a-z\d](?:[a-z\d-]{0,30}[a-z\d])$/;

type Mode = 'Holder' | 'HolderOrProviders' | 'Providers';

type LetterDraft = { title: string; gift: string; condition: string; text: string };

type Draft = {
  holder: string;
  title: string;
  label: string;
  labelEdited: boolean;
  wishes: string;
  perRequest: string;
  perPeriod: string;
  periodDays: string;
  requests: string;
  cooldownHours: string;
  floor: string;
  maturity: string;
  categories: number[];
  mode: Mode;
  providers: string;
  transfer: 'Free' | 'Locked';
  letters: LetterDraft[];
  funding: string;
  liquid: string;
  pool: string;
};

const FIRST_DRAFT: Draft = {
  holder: '',
  title: '',
  label: '',
  labelEdited: false,
  wishes: '',
  perRequest: '5',
  perPeriod: '8',
  periodDays: '30',
  requests: '10',
  cooldownHours: '0',
  floor: '10',
  maturity: '',
  categories: [0, 1],
  mode: 'Holder',
  providers: '',
  transfer: 'Locked',
  letters: [],
  funding: '25',
  liquid: '6',
  pool: '',
};

type Errors = Record<string, string>;

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z\d]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 32)
    .replace(/-+$/, '');

const isoDate = (ns: bigint) => new Date(Number(ns / 1_000_000n)).toISOString().slice(0, 10);

function nsOfDate(text: string): bigint | null {
  const ms = Date.parse(`${text}T00:00:00Z`);
  return Number.isNaN(ms) ? null : BigInt(ms) * 1_000_000n;
}

const whole = (text: string) => (/^\d+$/.test(text.trim()) ? Number(text) : null);
const accounts = (text: string) => text.split(/[\s,]+/).filter(Boolean);

function checkWho(d: Draft): Errors {
  const e: Errors = {};
  if (!ACCOUNT.test(d.holder.trim())) e.holder = 'Enter a NEAR account, such as maya.testnet.';
  if (!d.title.trim()) e.title = 'Give the trust a title.';
  else if (utf8Length(d.title.trim()) > MAX_TITLE) e.title = `Keep the title under ${MAX_TITLE} bytes.`;
  if (!LABEL.test(d.label)) {
    e.label = 'Use 2 to 32 lowercase letters, digits or hyphens. It cannot start or end with a hyphen.';
  }
  return e;
}

function checkWishes(d: Draft): Errors {
  const e: Errors = {};
  if (!d.wishes.trim()) e.wishes = 'The trustee needs something to go on.';
  else if (utf8Length(d.wishes) > MAX_WISHES) e.wishes = `Keep this under ${MAX_WISHES.toLocaleString('en-US')} bytes.`;
  return e;
}

function checkLimits(d: Draft, maturity: string, nowNs: bigint): Errors {
  const e: Errors = {};
  const perRequest = amountOf(d.perRequest);
  const perPeriod = amountOf(d.perPeriod);
  if (!perRequest) e.perRequest = 'Enter an amount above zero.';
  if (!perPeriod) e.perPeriod = 'Enter an amount above zero.';
  if (perRequest && perPeriod && perRequest > perPeriod) {
    e.perPeriod = 'This cannot be less than one request can take.';
  }
  if (!whole(d.periodDays)) e.periodDays = 'Enter a whole number of days, at least 1.';
  if (!whole(d.requests)) e.requests = 'Allow at least one request.';
  if (amountOf(d.cooldownHours) === null) e.cooldownHours = 'Enter a number of hours, or 0.';
  if (amountOf(d.floor) === null) e.floor = 'Enter an amount, or 0.';
  const maturityNs = nsOfDate(maturity);
  if (maturityNs === null || maturityNs <= nowNs) e.maturity = 'Pick a date in the future.';
  if (d.categories.length === 0) e.categories = 'Choose at least one.';
  if (d.mode !== 'Holder') {
    const list = accounts(d.providers);
    if (list.length === 0) e.providers = 'Name at least one provider.';
    else if (!list.every((a) => ACCOUNT.test(a))) e.providers = 'Enter NEAR accounts, separated by commas.';
  }
  return e;
}

function checkLetters(d: Draft): Errors {
  const e: Errors = {};
  d.letters.forEach((letter, i) => {
    if (!letter.title.trim()) e[`title${i}`] = 'A letter needs a title.';
    else if (utf8Length(letter.title.trim()) > MAX_TITLE) e[`title${i}`] = `Keep the title under ${MAX_TITLE} bytes.`;
    if (amountOf(letter.gift || '0') === null) e[`gift${i}`] = 'Enter an amount, or 0.';
    if (!letter.condition.trim()) e[`condition${i}`] = 'Say when it may be opened.';
    if (!letter.text.trim()) e[`text${i}`] = 'Write the letter.';
    const size = utf8Length(JSON.stringify({ condition: letter.condition, text: letter.text }));
    if (size > MAX_LETTER) e[`text${i}`] = `This letter is too long. It has ${size} of ${MAX_LETTER} bytes.`;
  });
  return e;
}

function checkFunding(d: Draft, pool: string, balance: bigint | null): Errors {
  const e: Errors = {};
  const funding = amountOf(d.funding);
  const liquid = amountOf(d.liquid);
  if (funding === null || funding < BigInt(toYocto('1'))) e.funding = 'A trust needs at least 1 NEAR.';
  else if (balance !== null && funding > balance) e.funding = `You have ${near(balance, 2)} NEAR.`;
  if (liquid === null || liquid < BigInt(MIN_LIQUID)) e.liquid = 'Keep at least 0.1 NEAR liquid, to pay the trustee.';
  else if (funding !== null && liquid > funding) e.liquid = 'This cannot be more than the trust holds.';
  if (!pool) e.pool = 'Choose a validator.';
  return e;
}

/** A blank in a sentence. The limits read as plain language, not as a settings panel. */
function Blank({
  label,
  value,
  error,
  onChange,
}: {
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      className="blank"
      aria-label={label}
      aria-invalid={!!error}
      inputMode="decimal"
      value={value}
      style={{ width: `${Math.max(value.length, 2) + 1.5}ch` }}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function Sentence({ children, error }: { children: ReactNode; error?: string }) {
  return (
    <div className="sentence">
      <p>{children}</p>
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

function SealedNote({ children }: { children: ReactNode }) {
  return (
    <div className="sealed-note">
      <WaxSeal size={38} />
      <p>{children}</p>
    </div>
  );
}

function WorstPreview({ d, maturity, nowNs }: { d: Draft; maturity: string; nowNs: bigint }) {
  const perPeriod = amountOf(d.perPeriod) ?? 0n;
  const days = whole(d.periodDays) || 30;
  const periodNs = BigInt(days) * DAY_NS;
  const floor = amountOf(d.floor) ?? 0n;
  const gifts = d.letters.reduce((sum, letter) => sum + (amountOf(letter.gift || '0') ?? 0n), 0n);
  const funding = amountOf(d.funding) ?? 0n;
  const assets = funding > SET_ASIDE ? funding - SET_ASIDE : 0n;
  const maturityNs = nsOfDate(maturity) ?? nowNs;
  const { cap, spendable } = worstCase({ perPeriod, periodNs, gifts, floor, assets, maturityNs, nowNs });

  let more: string;
  if (spendable === 0n) {
    more = `With ${nearText(funding)} in it, nothing sits above the floor. The trustee cannot be paid until yield arrives.`;
  } else if (cap > spendable) {
    more = `With ${nearText(funding)} in it, the real limit is what sits above the floor: about ${nearText(spendable)} in total.`;
  } else {
    more = `By ${dateText(maturityNs)}, the most it can lose in total is ${nearText(cap)}${
      gifts > 0n ? `, including ${nearText(gifts)} in one-time gifts` : ''
    }.`;
  }

  return (
    <aside className="worst worst-live" aria-live="polite">
      <p className="kicker">Printed on the trust</p>
      <p className="worst-line">{worstSentence(perPeriod, periodNs, floor)}</p>
      <p className="worst-more">{more}</p>
      <p className="worst-more">The contract enforces this. Even a fully fooled trustee cannot go past it.</p>
    </aside>
  );
}

function LetterEditor({
  letter,
  index,
  errors,
  onChange,
  onRemove,
}: {
  letter: LetterDraft;
  index: number;
  errors: Errors;
  onChange: (patch: Partial<LetterDraft>) => void;
  onRemove: () => void;
}) {
  return (
    <fieldset className="letter-draft">
      <legend>Letter {index + 1}</legend>
      <Field
        label="Title"
        hint="Public. The holder sees this while it is still sealed."
        value={letter.title}
        placeholder="When you graduate"
        error={errors[`title${index}`]}
        onChange={(e) => onChange({ title: e.target.value })}
      />
      <TextField
        label="When may it be opened?"
        hint="Sealed. Only the trustee can read this, and it checks the holder's claim against it."
        rows={2}
        value={letter.condition}
        placeholder="She has finished a degree or a diploma."
        error={errors[`condition${index}`]}
        onChange={(e) => onChange({ condition: e.target.value })}
      />
      <TextField
        label="The letter"
        hint="Sealed. Nobody can read this until the trustee opens it, and then only the holder can."
        rows={7}
        className="ruled"
        value={letter.text}
        placeholder="Dear Maya,"
        error={errors[`text${index}`]}
        onChange={(e) => onChange({ text: e.target.value })}
      />
      <div className="letter-draft-foot">
        <Field
          label="A gift with it (NEAR)"
          hint="Paid once when the letter opens, on top of the monthly limit. Public."
          inputMode="decimal"
          value={letter.gift}
          placeholder="0"
          error={errors[`gift${index}`]}
          onChange={(e) => onChange({ gift: e.target.value })}
        />
        <button type="button" className="btn-link" onClick={onRemove}>
          Remove this letter
        </button>
      </div>
    </fieldset>
  );
}

export function Create() {
  const chain = useChain();
  const navigate = useNavigate();
  useTitle('Create a trust');

  const [d, setDraft] = useState(FIRST_DRAFT);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [phase, setPhase] = useState<'idle' | 'sealing' | 'sending'>('idle');
  const [failure, setFailure] = useState<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  const set = (patch: Partial<Draft>) => setDraft((current) => ({ ...current, ...patch }));

  const setup = useLoad(async () => {
    const [{ nowNs }, settings] = await Promise.all([
      chain.pinned(),
      chain.view<CollectionConfig>(config.collection, 'config'),
    ]);
    return { nowNs, settings };
  }, []);

  const suffix = setup.data?.settings.pool_suffix;
  const pools = useLoad(() => (suffix ? readPools(chain, suffix) : Promise.resolve([])), [suffix]);

  useEffect(() => {
    if (!moved.current) return;
    heading.current?.focus();
    heading.current?.scrollIntoView({ block: 'center' });
  }, [step]);

  const trust = d.label ? tokenId(d.label) : '';
  const sealingKey = setup.data?.settings.sealing_key;
  const cipherPreview = useMemo(() => {
    if (step !== 4 || !sealingKey || !trust || !d.wishes) return null;
    return toHex(seal(sealingKey, contexts.wishes(trust), d.wishes)).slice(0, 96);
  }, [step, sealingKey, trust, d.wishes]);

  if (setup.loading && !setup.data) {
    return (
      <div className="page narrow">
        <Loading />
      </div>
    );
  }
  if (!setup.data) {
    return (
      <div className="page narrow">
        <ErrorNote message={setup.error ?? 'The chain did not answer.'} onRetry={() => void setup.reload()} />
      </div>
    );
  }

  const { nowNs } = setup.data;
  const maturity = d.maturity || isoDate(nowNs + 3650n * DAY_NS);
  const chosenPool = d.pool || pools.data?.find((p) => p.recommended)?.account_id || '';
  const me = chain.dev?.personas.find((p) => p.id === chain.accountId);
  const balance = me ? BigInt(me.balance) : null;
  const people = chain.dev?.personas.filter((p) => p.id === 'maya.testnet' || p.id === 'noah.testnet') ?? [];

  const go = (next: number) => {
    moved.current = true;
    setErrors({});
    setStep(next);
  };

  const letterAt = (index: number, patch: Partial<LetterDraft>) =>
    set({ letters: d.letters.map((letter, i) => (i === index ? { ...letter, ...patch } : letter)) });

  const toggleCategory = (code: number) =>
    set({
      categories: d.categories.includes(code)
        ? d.categories.filter((c) => c !== code)
        : [...d.categories, code].sort((a, b) => a - b),
    });

  const create = async () => {
    setFailure(null);
    if (!sealingKey) {
      setFailure('The collection has no sealing key yet.');
      return;
    }
    setPhase('sealing');
    try {
      const period = BigInt(whole(d.periodDays) ?? 30) * DAY_NS;
      const cooldown = (BigInt(Math.round(Number(d.cooldownHours) * 60)) * HOUR_NS) / 60n;
      const providers = accounts(d.providers);
      const payees: PayeePolicy =
        d.mode === 'Holder'
          ? 'Holder'
          : d.mode === 'Providers'
            ? { Providers: providers }
            : { HolderOrProviders: providers };
      const rails: Rails = {
        max_per_request: toYocto(d.perRequest),
        max_per_period: toYocto(d.perPeriod),
        period_ns: period.toString(),
        cooldown_ns: cooldown.toString(),
        max_requests_per_period: whole(d.requests) ?? 1,
        principal_floor: toYocto(d.floor),
        categories: d.categories.reduce((mask, code) => mask | (1 << code), 0),
        payees,
      };
      const terms = {
        title: d.title.trim(),
        holder: d.holder.trim(),
        rails,
        maturity_ns: (nsOfDate(maturity) as bigint).toString(),
        transfer: d.transfer,
        pool: chosenPool,
        liquid_target: toYocto(d.liquid),
        public_room: false,
        // Everything private is sealed here, in this browser, before anything is sent.
        wishes: toBase64(seal(sealingKey, contexts.wishes(trust), d.wishes)),
        letters: d.letters.map((letter, index) => ({
          title: letter.title.trim(),
          gift: toYocto(letter.gift || '0'),
          cipher: toBase64(
            seal(
              sealingKey,
              contexts.letter(trust, index),
              JSON.stringify({ condition: letter.condition.trim(), text: letter.text.trim() }),
            ),
          ),
        })),
      };
      setPhase('sending');
      const result = await chain.call(config.collection, 'create_trust', { label: d.label, terms }, toYocto(d.funding));
      if (!result.ok) {
        throw new Error(`${result.error ?? 'The trust was not created.'} Nothing was created, and your money came back.`);
      }
      navigate(`/t/${d.label}`, { state: { created: true } });
    } catch (err) {
      setFailure(messageOf(err));
      setPhase('idle');
    }
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const found = [
      () => checkWho(d),
      () => checkWishes(d),
      () => checkLimits(d, maturity, nowNs),
      () => checkLetters(d),
      () => checkFunding(d, chosenPool, balance),
    ][step]();

    if (step === 0 && !found.label) {
      const taken = await chain
        .view<Token | null>(config.collection, 'nft_token', { token_id: tokenId(d.label) })
        .catch(() => null);
      if (taken) found.label = 'That name is taken. Try another.';
    }

    setErrors(found);
    if (Object.keys(found).length > 0) return;
    if (step < STEPS.length - 1) go(step + 1);
    else await create();
  };

  const showWorst = step >= 2;

  return (
    <div className="page create">
      <header className="page-head">
        <h1>Create a trust.</h1>
        <p className="lede">
          Write down what the money is for, and set its limits. Your words are sealed in this browser before anything
          is sent. After that, nobody can change them or read them, including you.
        </p>
      </header>

      <ol className="stepper" aria-label="Steps">
        {STEPS.map((name, index) => (
          <li key={name} className={index === step ? 'is-now' : index < step ? 'is-done' : undefined}>
            {index < step ? (
              <button type="button" onClick={() => go(index)}>
                <span className="stepper-mark" aria-hidden="true" />
                <span>{name}</span>
              </button>
            ) : (
              <span aria-current={index === step ? 'step' : undefined}>
                <span className="stepper-mark" aria-hidden="true" />
                <span>{name}</span>
              </span>
            )}
          </li>
        ))}
      </ol>

      <div className={showWorst ? 'create-grid has-side' : 'create-grid'}>
        <form className="create-form" onSubmit={submit} noValidate>
          <h2 ref={heading} tabIndex={-1} className="step-title">
            <span className="step-count">
              Step {step + 1} of {STEPS.length}{' '}
            </span>
            {['Who is it for?', 'What is this money for?', 'What are the limits?', 'Letters for later', 'Fund it'][step]}
          </h2>

          {step === 0 && (
            <>
              <Field
                label="Their NEAR account"
                hint="They will hold the trust. They can ask, and they can never withdraw."
                value={d.holder}
                placeholder="maya.testnet"
                autoCapitalize="none"
                autoComplete="off"
                spellCheck={false}
                error={errors.holder}
                onChange={(e) => set({ holder: e.target.value })}
              />
              {people.length > 0 && (
                <p className="quick-picks">
                  {people.map((p) => (
                    <button key={p.id} type="button" className="btn-link" onClick={() => set({ holder: p.id })}>
                      {p.name}
                    </button>
                  ))}
                </p>
              )}
              <Field
                label="A title"
                hint="Public. It is printed on the NFT."
                value={d.title}
                placeholder="For Maya"
                error={errors.title}
                onChange={(e) =>
                  set(d.labelEdited ? { title: e.target.value } : { title: e.target.value, label: slug(e.target.value) })
                }
              />
              <Field
                label="Its name on chain"
                hint={
                  <>
                    This becomes a real NEAR account with no keys: <span className="acct">{d.label || 'name'}.{config.collection}</span>
                  </>
                }
                value={d.label}
                autoCapitalize="none"
                autoComplete="off"
                spellCheck={false}
                error={errors.label}
                onChange={(e) => set({ label: e.target.value.toLowerCase(), labelEdited: true })}
              />
            </>
          )}

          {step === 1 && (
            <>
              <TextField
                label="In your own words"
                hint="Say what it is for, what it is not for, and how you want them treated when they ask."
                rows={11}
                className="ruled"
                value={d.wishes}
                placeholder="This money is for her learning and her health."
                error={errors.wishes}
                onChange={(e) => set({ wishes: e.target.value })}
              />
              <SealedNote>
                Sealed in this browser. Only the trustee's enclave can read it. The holder never will, and neither will
                anyone reading the chain.
              </SealedNote>
            </>
          )}

          {step === 2 && (
            <>
              <div className="sentences">
                <Sentence error={errors.perRequest}>
                  No single request can take more than{' '}
                  <Blank label="Most in one request, in NEAR" value={d.perRequest} error={errors.perRequest} onChange={(perRequest) => set({ perRequest })} />{' '}
                  NEAR.
                </Sentence>
                <Sentence error={errors.perPeriod ?? errors.periodDays ?? errors.requests}>
                  In any{' '}
                  <Blank label="Length of a period, in days" value={d.periodDays} error={errors.periodDays} onChange={(periodDays) => set({ periodDays })} />{' '}
                  days, no more than{' '}
                  <Blank label="Most in one period, in NEAR" value={d.perPeriod} error={errors.perPeriod} onChange={(perPeriod) => set({ perPeriod })} />{' '}
                  NEAR can leave, in at most{' '}
                  <Blank label="Most requests in one period" value={d.requests} error={errors.requests} onChange={(requests) => set({ requests })} />{' '}
                  requests.
                </Sentence>
                <Sentence error={errors.cooldownHours}>
                  After each request, the holder waits{' '}
                  <Blank label="Hours between requests" value={d.cooldownHours} error={errors.cooldownHours} onChange={(cooldownHours) => set({ cooldownHours })} />{' '}
                  hours.
                </Sentence>
                <Sentence error={errors.floor}>
                  The trust can never fall below{' '}
                  <Blank label="The floor, in NEAR" value={d.floor} error={errors.floor} onChange={(floor) => set({ floor })} />{' '}
                  NEAR.
                </Sentence>
                <Sentence error={errors.maturity}>
                  On{' '}
                  <input
                    className="blank blank-date"
                    type="date"
                    aria-label="The date it passes to the holder"
                    aria-invalid={!!errors.maturity}
                    value={maturity}
                    onChange={(e) => set({ maturity: e.target.value })}
                  />{' '}
                  whatever is left passes to the holder.
                </Sentence>
              </div>

              <fieldset className="choices">
                <legend>It can only be used for</legend>
                <div className="pills">
                  {CATEGORIES.map((name, code) => (
                    <label key={name} className="pill">
                      <input type="checkbox" checked={d.categories.includes(code)} onChange={() => toggleCategory(code)} />
                      <span>{name}</span>
                    </label>
                  ))}
                </div>
                {errors.categories && <p className="field-error">{errors.categories}</p>}
              </fieldset>

              <fieldset className="choices">
                <legend>Who can be paid</legend>
                {(
                  [
                    ['Holder', 'Only the holder'],
                    ['HolderOrProviders', 'The holder, or a provider I name'],
                    ['Providers', 'Only providers I name, never the holder directly'],
                  ] as [Mode, string][]
                ).map(([mode, text]) => (
                  <label key={mode} className="choice">
                    <input type="radio" name="mode" checked={d.mode === mode} onChange={() => set({ mode })} />
                    <span>{text}</span>
                  </label>
                ))}
                {d.mode !== 'Holder' && (
                  <Field
                    label="Providers"
                    hint="NEAR accounts, separated by commas. A school, a clinic."
                    value={d.providers}
                    placeholder="school.testnet"
                    autoCapitalize="none"
                    spellCheck={false}
                    error={errors.providers}
                    onChange={(e) => set({ providers: e.target.value })}
                  />
                )}
              </fieldset>

              <fieldset className="choices">
                <legend>Can the holder pass it on before that date?</legend>
                <label className="choice">
                  <input type="radio" name="transfer" checked={d.transfer === 'Locked'} onChange={() => set({ transfer: 'Locked' })} />
                  <span>No, it stays with them</span>
                </label>
                <label className="choice">
                  <input type="radio" name="transfer" checked={d.transfer === 'Free'} onChange={() => set({ transfer: 'Free' })} />
                  <span>Yes, they may give it away or sell it</span>
                </label>
              </fieldset>
            </>
          )}

          {step === 3 && (
            <>
              <p className="step-intro">
                A letter waits, sealed, until the trustee accepts that its moment has come. Then it opens for the holder,
                and any gift goes with it. You can skip this.
              </p>
              {d.letters.map((letter, index) => (
                <LetterEditor
                  key={index}
                  letter={letter}
                  index={index}
                  errors={errors}
                  onChange={(patch) => letterAt(index, patch)}
                  onRemove={() => set({ letters: d.letters.filter((_, i) => i !== index) })}
                />
              ))}
              {d.letters.length < MAX_LETTERS && (
                <button
                  type="button"
                  className="btn"
                  onClick={() => set({ letters: [...d.letters, { title: '', gift: '', condition: '', text: '' }] })}
                >
                  {d.letters.length === 0 ? 'Write a letter' : 'Write another letter'}
                </button>
              )}
            </>
          )}

          {step === 4 && (
            <>
              <Field
                label="Fund it with (NEAR)"
                hint={
                  balance !== null
                    ? `You have ${near(balance, 2)} NEAR. The collection keeps 0.05 NEAR for its index. Everything else goes to the trust.`
                    : 'The collection keeps 0.05 NEAR for its index. Everything else goes to the trust.'
                }
                inputMode="decimal"
                value={d.funding}
                error={errors.funding}
                onChange={(e) => set({ funding: e.target.value })}
              />
              <Field
                label="Keep ready to pay (NEAR)"
                hint="This stays unstaked for payouts and the trustee's fees. The rest is staked and earns yield."
                inputMode="decimal"
                value={d.liquid}
                error={errors.liquid}
                onChange={(e) => set({ liquid: e.target.value })}
              />

              <fieldset className="choices">
                <legend>Who stakes it</legend>
                <p className="field-hint">
                  Smaller healthy validators come first. Stake that avoids the largest ones helps keep NEAR decentralised,
                  and a trust stays staked for years.
                </p>
                {pools.loading && !pools.data && <Loading what="Reading the validators" />}
                {pools.error && <ErrorNote message={pools.error} onRetry={() => void pools.reload()} />}
                <div className="pools">
                  {pools.data?.map((pool) => {
                    const verdict = poolVerdict(pool);
                    return (
                      <label key={pool.account_id} className={chosenPool === pool.account_id ? 'pool is-chosen' : 'pool'}>
                        <input
                          type="radio"
                          name="pool"
                          checked={chosenPool === pool.account_id}
                          onChange={() => set({ pool: pool.account_id })}
                        />
                        <span className="pool-text">
                          <span className="pool-name acct">{pool.account_id}</span>
                          <span className="pool-meta">
                            {Math.round(pool.stakeNear).toLocaleString('en-US')} NEAR staked
                            {pool.uptime !== null && `, ${(pool.uptime * 100).toFixed(1)}% uptime`}
                            {pool.fee !== null && `, ${pool.fee}% commission`}
                          </span>
                          {verdict && <span className="pool-warn">{verdict}</span>}
                        </span>
                        {pool.account_id === pools.data?.find((p) => p.recommended)?.account_id && (
                          <span className="pool-tag">Suggested</span>
                        )}
                      </label>
                    );
                  })}
                </div>
                {errors.pool && <p className="field-error">{errors.pool}</p>}
              </fieldset>

              <section className="review" aria-labelledby="review">
                <h3 id="review">Before you seal it</h3>
                <dl className="plain-list small">
                  <div>
                    <dt>Public for good</dt>
                    <dd>
                      The title, the holder, the limits, the letter titles and the gifts. Anyone can read these, and they
                      can never change.
                    </dd>
                  </div>
                  <div>
                    <dt>Sealed for good</dt>
                    <dd>
                      Your wishes{d.letters.length > 0 && ', the letters and when they open'}. This is how your wishes
                      look to the chain:
                      {cipherPreview && <code className="cipher">{cipherPreview}…</code>}
                    </dd>
                  </div>
                </dl>
              </section>

              {!chain.accountId && <SignInNote doing="create this trust" />}
              {failure && <ErrorNote message={failure} />}
            </>
          )}

          <div className="create-nav">
            {step > 0 ? (
              <button type="button" className="btn-link" disabled={phase !== 'idle'} onClick={() => go(step - 1)}>
                Back
              </button>
            ) : (
              <span />
            )}
            <button
              type="submit"
              className={step === STEPS.length - 1 ? 'btn btn-wax' : 'btn'}
              disabled={phase !== 'idle' || (step === STEPS.length - 1 && !chain.accountId)}
            >
              {step < STEPS.length - 1
                ? 'Continue'
                : phase === 'sealing'
                  ? 'Sealing in this browser'
                  : phase === 'sending'
                    ? 'Creating the trust'
                    : 'Seal it and create the trust'}
            </button>
          </div>
        </form>

        {showWorst && <WorstPreview d={d} maturity={maturity} nowNs={nowNs} />}
      </div>
    </div>
  );
}
