import { useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react';

type Shared = { label: ReactNode; hint?: ReactNode; error?: string | null };

export function Field({ label, hint, error, ...input }: Shared & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} aria-invalid={!!error} aria-describedby={hint || error ? `${id}-n` : undefined} {...input} />
      <Notes id={`${id}-n`} hint={hint} error={error} />
    </div>
  );
}

export function TextField({ label, hint, error, ...area }: Shared & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} aria-invalid={!!error} aria-describedby={hint || error ? `${id}-n` : undefined} {...area} />
      <Notes id={`${id}-n`} hint={hint} error={error} />
    </div>
  );
}

function Notes({ id, hint, error }: { id: string; hint?: ReactNode; error?: string | null }) {
  if (!hint && !error) return null;
  return (
    <div id={id} className="field-notes">
      {error && <p className="field-error">{error}</p>}
      {hint && <p className="field-hint">{hint}</p>}
    </div>
  );
}
