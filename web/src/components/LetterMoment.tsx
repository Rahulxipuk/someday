import { useEffect, useRef, useState } from 'react';
import { WaxSeal } from './Seal';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type Props = {
  title: string;
  text: string;
  /** How the gift is described under the letter, if it had one. */
  enclosed?: string;
  /** The first time a letter opens, the reader breaks the seal themselves. */
  sealed: boolean;
  onClose: () => void;
};

/** The climax of the demo: a sealed envelope, a broken seal, and a letter on paper. */
export function LetterMoment({ title, text, enclosed, sealed, onClose }: Props) {
  const [phase, setPhase] = useState<'sealed' | 'breaking' | 'open'>(sealed ? 'sealed' : 'open');
  const dialog = useRef<HTMLDivElement>(null);
  const closing = useRef(onClose);
  closing.current = onClose;

  useEffect(() => {
    const before = document.activeElement as HTMLElement | null;
    const scroll = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closing.current();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = scroll;
      before?.focus?.();
    };
  }, []);

  // The reader starts at "Dear Maya", so focus must never scroll them to the end of the letter.
  useEffect(() => {
    dialog.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus({ preventScroll: true });
    dialog.current?.scrollTo(0, 0);
  }, [phase]);

  const breakSeal = () => {
    if (reducedMotion()) {
      setPhase('open');
      return;
    }
    setPhase('breaking');
    window.setTimeout(() => setPhase('open'), 2300);
  };

  const paragraphs = text.split(/\n\s*\n/);
  const pace = sealed ? 0.75 : 0.12;

  return (
    <div ref={dialog} className="moment" role="dialog" aria-modal="true" aria-label={`Letter: ${title}`}>
      {phase !== 'open' ? (
        <div className={`envelope envelope-${phase}`}>
          <p className="envelope-title">{title}</p>
          <div className="envelope-body">
            <div className="envelope-paper" />
            <div className="envelope-front" />
            <div className="envelope-flap" />
            <button
              type="button"
              className="envelope-seal"
              data-autofocus
              onClick={breakSeal}
              disabled={phase === 'breaking'}
              aria-label="Break the seal"
            >
              <span className="wax-half wax-left">
                <WaxSeal size={92} />
              </span>
              <span className="wax-half wax-right">
                <WaxSeal size={92} />
              </span>
            </button>
          </div>
          <p className="envelope-hint" aria-live="polite">
            {phase === 'sealed' ? 'The trustee accepted. Break the seal.' : ''}
          </p>
        </div>
      ) : (
        <article className="letter" tabIndex={-1} data-autofocus>
          <h2 className="letter-title">{title}</h2>
          <div className="letter-body">
            {paragraphs.map((paragraph, i) => (
              <p key={i} style={{ animationDelay: `${(sealed ? 0.5 : 0.1) + i * pace}s` }}>
                {paragraph}
              </p>
            ))}
          </div>
          {enclosed && (
            <p className="letter-enclosed" style={{ animationDelay: `${(sealed ? 0.7 : 0.2) + paragraphs.length * pace}s` }}>
              {enclosed}
            </p>
          )}
          <button
            type="button"
            className="btn letter-close"
            style={{ animationDelay: `${(sealed ? 0.9 : 0.3) + paragraphs.length * pace}s` }}
            onClick={onClose}
          >
            Fold it away
          </button>
        </article>
      )}
    </div>
  );
}
