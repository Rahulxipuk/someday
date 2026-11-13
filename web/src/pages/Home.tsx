import { Link } from 'react-router';
import { useChain } from '../chain/context';
import { labelOf } from '../config';
import { WaxSeal } from '../components/Seal';
import { Empty, ErrorNote, Loading } from '../components/States';
import { count, near } from '../lib/format';
import { readStats } from '../lib/trust';
import { useLoad } from '../lib/useLoad';
import { useTitle } from '../lib/useTitle';

function Exchange() {
  return (
    <figure className="exchange">
      <figcaption className="visually-hidden">A conversation between Maya and the trustee.</figcaption>
      <div className="exchange-sheet">
        <p className="line line-maya">
          <span className="who">Maya</span>
          <span>I need 40 NEAR for a motorbike.</span>
        </p>
        <p className="line line-trustee">
          <span className="who">Trustee</span>
          <span>
            <strong className="no">No.</strong> This money is for your learning and your health. What is it really
            for?
          </span>
        </p>
        <p className="line line-maya">
          <span className="who">Maya</span>
          <span>The bus to college takes three hours each way.</span>
        </p>
        <p className="line line-trustee">
          <span className="who">Trustee</span>
          <span>Then I can release 8 NEAR toward a term's transport, paid directly to the provider.</span>
        </p>
      </div>
      <div className="exchange-seal">
        <WaxSeal size={84} />
      </div>
    </figure>
  );
}

const FACTS = [
  {
    title: 'The most it can ever lose is printed on it.',
    body: 'The limits live in the contract, not in the AI. Even a fully fooled trustee stops at the number on the token.',
  },
  {
    title: 'Nobody can read the wishes, including its holder.',
    body: "They are sealed in the creator's browser to a key that only the trustee's enclave has.",
  },
  {
    title: 'Its yield pays for the trustee.',
    body: 'Most of the money is staked. The yield pays the fee for each decision, so nobody has to keep topping it up.',
  },
];

const STEPS = [
  {
    title: 'A creator makes a trust.',
    body: (
      <>
        The NFT is a real NEAR sub-account, such as <code>maya.someday.testnet</code>. It has no access keys, so
        nobody can sign for it, including the person who made it.
      </>
    ),
  },
  {
    title: 'They seal what they want.',
    body: 'Wishes, letters and the conditions for opening them are encrypted in the browser before anything is sent. One pinned program can read them, and no person can.',
  },
  {
    title: 'The holder asks.',
    body: 'The holder cannot withdraw. They send the trust a sealed request, and the trust pays for the trustee to run from its own balance.',
  },
  {
    title: 'The trustee decides.',
    body: 'Inside a hardware enclave, one model reads the wishes and returns only a verdict, an amount and a reason code. A second model, which has never seen the wishes, writes the reply.',
  },
  {
    title: 'The contract has the last word.',
    body: 'It checks the holder and every limit again, and pays only what they allow. If the holder changed while the trustee was deciding, the decision dies with them.',
  },
];

const NEAR_PARTS = [
  {
    name: 'Sub-accounts',
    body: 'Each trust is its own keyless account under the collection. It holds its own money and state, and it is the NFT.',
  },
  {
    name: 'Staking',
    body: 'Most of each balance is staked with a validator. The yield pays for decisions, and the principal is left alone.',
  },
  {
    name: 'NEAR AI',
    body: 'The models run on NEAR AI private inference, in attested hardware, so the wishes are never in the clear anywhere else.',
  },
  {
    name: 'OutLayer',
    body: "OutLayer runs the trustee in a TEE, pinned by its WASM hash, and returns the answer to the contract through NEAR's yield and resume.",
  },
];

function LiveNumbers() {
  const chain = useChain();
  const stats = useLoad(() => readStats(chain), [], { poll: 8000 });

  if (stats.loading && !stats.data) return <Loading />;
  if (!stats.data) {
    return <ErrorNote message={stats.error ?? 'The chain did not answer.'} onRetry={() => void stats.reload()} />;
  }

  const { trusts, held, earned, given, decisions, refused } = stats.data;
  const numbers = [
    { value: trusts.length.toLocaleString('en-US'), label: trusts.length === 1 ? 'trust' : 'trusts' },
    { value: near(held, 2), label: 'NEAR held' },
    { value: near(earned, 3), label: 'NEAR earned from yield' },
    { value: near(given, 2), label: 'NEAR given out' },
    { value: decisions.toLocaleString('en-US'), label: decisions === 1 ? 'decision' : 'decisions' },
    { value: refused.toLocaleString('en-US'), label: 'refused' },
  ];

  return (
    <>
      <dl className="ledger-row">
        {numbers.map((n) => (
          <div key={n.label}>
            <dt>{n.label}</dt>
            <dd>{n.value}</dd>
          </div>
        ))}
      </dl>
      {trusts.length === 0 ? (
        <Empty title="No trusts yet.">The first one is yours to make.</Empty>
      ) : (
        <ul className="trust-shelf" aria-label={count(trusts.length, 'trust')}>
          {trusts.map((t) => (
            <li key={t.id}>
              <Link to={`/t/${labelOf(t.id)}`}>
                {t.media && <img src={t.media} alt="" width={120} height={160} />}
                <span className="shelf-title">{t.title}</span>
                <span className="shelf-meta">{t.public ? 'Public, anyone can try it' : `Held by ${t.holder}`}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export function Home() {
  useTitle('');
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>
            The first NFT that can say <em>no.</em>
          </h1>
          <p className="lede">
            Someday is a trust fund you hold as an NFT. The holder cannot withdraw. They ask, an AI trustee decides
            against wishes nobody can read, and the contract pays only within hard limits.
          </p>
          <div className="actions">
            <Link className="btn btn-wax" to="/try">
              Try the public trust
            </Link>
            <Link className="btn" to="/new">
              Create a trust
            </Link>
          </div>
        </div>
        <Exchange />
      </section>

      <section className="page facts" aria-label="Three facts">
        <ol>
          {FACTS.map((fact) => (
            <li key={fact.title}>
              <h2>{fact.title}</h2>
              <p>{fact.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="page" aria-labelledby="live">
        <h2 id="live" className="section-title">
          On the chain right now
        </h2>
        <LiveNumbers />
      </section>

      <section className="page how" aria-labelledby="how">
        <div className="how-steps">
          <h2 id="how" className="section-title">
            How it works
          </h2>
          <ol className="steps">
            {STEPS.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="how-near">
          <h2 className="section-title">What NEAR does in it</h2>
          <dl className="plain-list">
            {NEAR_PARTS.map((part) => (
              <div key={part.name}>
                <dt>{part.name}</dt>
                <dd>{part.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
