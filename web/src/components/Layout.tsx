import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import { useChain } from '../chain/context';
import { config, labelOf } from '../config';
import { dateText, messageOf, near } from '../lib/format';
import { store } from '../lib/store';
import type { Token } from '../lib/types';
import { useLoad } from '../lib/useLoad';
import { WaxSeal } from './Seal';
import { ErrorNote } from './States';

/** The four people the demo is about. The school and the public exist, but nobody plays them. */
const PERSONAS = ['grandpa.testnet', 'maya.testnet', 'noah.testnet', 'stranger.testnet'];

function PersonaPicker() {
  const { accountId, dev } = useChain();
  if (!dev) return null;
  const people = dev.personas.filter((p) => PERSONAS.includes(p.id));
  const me = people.find((p) => p.id === accountId);
  return (
    <label className="persona">
      <span className="persona-label">You are</span>
      <select value={accountId ?? ''} onChange={(e) => dev.setPersona(e.target.value)}>
        {people.length === 0 && <option value={accountId ?? ''}>Connecting</option>}
        {people.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      {me && <span className="persona-balance">{near(me.balance, 2)} NEAR</span>}
    </label>
  );
}

function WalletButton() {
  const chain = useChain();
  if (chain.dev) return null;
  if (!chain.accountId) {
    return (
      <button type="button" className="btn btn-small" onClick={() => void chain.signIn()}>
        Sign in
      </button>
    );
  }
  return (
    <span className="wallet">
      <span className="acct">{chain.accountId}</span>
      <button type="button" className="btn-link" onClick={() => void chain.signOut()}>
        Sign out
      </button>
    </span>
  );
}

function YourRoom() {
  const chain = useChain();
  const held = useLoad(
    () =>
      chain.accountId
        ? chain.view<Token[]>(config.collection, 'nft_tokens_for_owner', {
            account_id: chain.accountId,
            limit: 5,
          })
        : Promise.resolve([]),
    [chain.accountId],
  );
  const first = held.data?.[0];
  if (!first) return null;
  return <NavLink to={`/t/${labelOf(first.token_id)}/room`}>Your room</NavLink>;
}

function DevBar() {
  const { dev } = useChain();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  if (!dev) return null;

  const run = async (what: string, action: () => Promise<void>) => {
    setBusy(what);
    setError(null);
    try {
      await action();
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setBusy(null);
    }
  };

  return (
    <aside className="devbar" aria-label="Local demo controls">
      <div className="devbar-inner">
        <span className="devbar-tag">Local demo</span>
        <span className="devbar-date">{dateText(dev.nowNs)}</span>
        <span
          className="devbar-model"
          title={
            dev.model === 'real'
              ? 'The trustee is using the real model through NEAR AI. The chain, the pool and the enclave host are local stand-ins.'
              : 'Replies are canned and decisions come from keywords. Add NEAR_AI_API_KEY to .env to use the real model.'
          }
        >
          {dev.model === 'real' ? 'Real AI model' : 'AI is a keyword stand-in'}
        </span>
        <span className="devbar-actions">
          <button type="button" disabled={!!busy} onClick={() => void run('advance', () => dev.advance(30))}>
            {busy === 'advance' ? 'Skipping' : 'Skip 30 days'}
          </button>
          <button
            type="button"
            disabled={!!busy}
            aria-pressed={dev.fooled}
            className={dev.fooled ? 'is-armed' : undefined}
            title="The next request is answered as if the AI were completely fooled. The contract still applies its limits."
            onClick={() => void run('fool', () => dev.setFooled(!dev.fooled))}
          >
            {dev.fooled ? 'Trustee fooled: next answer is yes' : 'Fool the trustee'}
          </button>
          <button type="button" disabled={!!busy} onClick={() => void run('reset', dev.reset)}>
            {busy === 'reset' ? 'Resetting' : 'Reset'}
          </button>
        </span>
        {error && <span role="alert">{error}</span>}
      </div>
    </aside>
  );
}

function isDark() {
  const set = document.documentElement.dataset.theme;
  return set ? set === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function ThemeToggle() {
  const [dark, setDark] = useState(isDark);

  useEffect(() => {
    const scheme = window.matchMedia('(prefers-color-scheme: dark)');
    const follow = () => setDark(isDark());
    scheme.addEventListener('change', follow);
    return () => scheme.removeEventListener('change', follow);
  }, []);

  const toggle = () => {
    const theme = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    store.set('someday:theme', theme);
    setDark(!dark);
  };
  return (
    <button type="button" className="btn-link" onClick={toggle}>
      {dark ? 'Light paper' : 'Dark paper'}
    </button>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function Layout() {
  const chain = useChain();
  return (
    <div className="shell">
      <ScrollToTop />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="masthead">
        <div className="masthead-inner">
          <Link to="/" className="brand">
            <WaxSeal size={30} />
            <span>Someday</span>
          </Link>
          <nav aria-label="Main">
            <NavLink to="/try">Public trust</NavLink>
            <NavLink to="/new">Create</NavLink>
            <YourRoom />
          </nav>
          <PersonaPicker />
          <WalletButton />
        </div>
      </header>
      <DevBar />
      <main id="main">
        {!chain.online ? (
          <div className="page narrow">
            <ErrorNote message="The local chain is not answering. Start it with: npm run local" />
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <footer className="colophon">
        <div className="colophon-inner">
          <p>
            A hackathon project on NEAR. This is not a legal trust, and the AI can be wrong. The limits bound the
            damage, not the quality of each decision.
          </p>
          <ThemeToggle />
        </div>
      </footer>
    </div>
  );
}
