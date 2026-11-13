import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { useChain } from '../chain/context';
import type { Tone } from '../lib/copy';

export function Loading({ what = 'Reading the chain' }: { what?: string }) {
  return (
    <p className="quiet-state" role="status">
      <span className="breath" aria-hidden="true" /> {what}
    </p>
  );
}

export function ErrorNote({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="note note-error" role="alert">
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="btn btn-small" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export function Empty({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="empty">
      <p className="empty-title">{title}</p>
      {children && <p>{children}</p>}
    </div>
  );
}

export function NoTrust({ id }: { id: string }) {
  return (
    <div className="page narrow center-page">
      <h1>No trust by that name.</h1>
      <p className="lede">Nothing on this chain is called {id}.</p>
      <Link className="btn" to="/">
        Back to the start
      </Link>
    </div>
  );
}

/** A rubber stamp on a ledger. The text is the real status, for every reader. */
export function Stamp({ tone, children }: { tone: Tone; children: ReactNode }) {
  return <span className={`stamp stamp-${tone}`}>{children}</span>;
}

/** Shown when an action needs someone to act as, and nobody is signed in. */
export function SignInNote({ doing }: { doing: string }) {
  const chain = useChain();
  return (
    <p className="sign-in-note">
      <button type="button" className="btn btn-small" onClick={() => void chain.signIn()}>
        Sign in
      </button>{' '}
      to {doing}.
    </p>
  );
}
