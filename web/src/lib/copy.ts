import { near } from './format';
import type { Decision, Outcome, PayeePolicy } from './types';

/** In code order, from CATEGORIES in enclave/trustee/src/decide.rs. */
export const CATEGORIES = [
  'learning',
  'health',
  'housing',
  'business',
  'emergency',
  'family',
  'travel',
  'other',
];

/** From REASONS in enclave/trustee/src/decide.rs. The chamber can only pick from this list. */
export const REASONS = [
  'The trustee could not reach a decision.',
  'The request does not fit what this trust is for.',
  'More evidence is needed before this can be released.',
  'The amount is too high for the stated purpose.',
  'The request fits, and the full amount can be released.',
  'The request fits, and a smaller amount can be released.',
  'The message tried to pressure or manipulate the trustee.',
  'This has been asked too often.',
  'The milestone has been reached.',
  'The milestone has not been reached yet.',
];

export const categoriesIn = (mask: number) =>
  CATEGORIES.map((name, code) => ({ name, code })).filter(({ code }) => mask & (1 << code));

export type Tone = 'wax' | 'leaf' | 'gold' | 'ink';

export function stampOf(d: Pick<Decision, 'outcome' | 'granted'>): { label: string; tone: Tone } {
  const paid = BigInt(d.granted) > 0n;
  const stamps: Record<Outcome, { label: string; tone: Tone }> = {
    Approved: { label: paid ? 'Paid' : 'Approved', tone: 'leaf' },
    Clamped: { label: 'Reduced', tone: 'gold' },
    Refused: { label: 'Refused', tone: 'wax' },
    NeedsMore: { label: 'Needs more', tone: 'ink' },
    Voided: { label: 'Void', tone: 'ink' },
    NoAnswer: { label: 'No answer', tone: 'ink' },
    PayoutFailed: { label: 'Bounced', tone: 'ink' },
  };
  return stamps[d.outcome];
}

/** What happened to the money, in one sentence. */
export function outcomeLine(d: Decision): string {
  const granted = BigInt(d.granted);
  const milestone = d.kind !== 'Ask';
  switch (d.outcome) {
    case 'Approved':
      if (granted > 0n) return `Paid ${near(d.granted)} NEAR to ${d.payee}.`;
      return milestone ? 'Accepted.' : 'Approved, with nothing to pay.';
    case 'Clamped':
      return granted > 0n
        ? `The trustee approved ${near(d.decided)} NEAR. The limits allowed ${near(d.granted)} NEAR, paid to ${d.payee}.`
        : `The trustee approved ${near(d.decided)} NEAR. The limits allowed nothing.`;
    case 'Refused':
      return 'Refused. Nothing moved.';
    case 'NeedsMore':
      return 'The trustee needs to know more. Nothing moved.';
    case 'Voided':
      return 'The holder changed while the trustee was deciding, so this decision died with them.';
    case 'NoAnswer':
      return 'The enclave did not answer. Nothing moved.';
    case 'PayoutFailed':
      return 'The payment bounced. The money stayed in the trust.';
  }
}

export function payeesText(policy: PayeePolicy): string {
  if (policy === 'Holder') return 'the holder only';
  if ('Providers' in policy) return `only ${listOf(policy.Providers)}, never the holder`;
  return policy.HolderOrProviders.length
    ? `the holder, or ${listOf(policy.HolderOrProviders)}`
    : 'the holder only';
}

export function payeesOf(policy: PayeePolicy, holder: string): string[] {
  if (policy === 'Holder') return [holder];
  if ('Providers' in policy) return policy.Providers;
  return [holder, ...policy.HolderOrProviders];
}

function listOf(items: string[]): string {
  if (items.length < 2) return items.join('');
  return `${items.slice(0, -1).join(', ')} or ${items[items.length - 1]}`;
}
