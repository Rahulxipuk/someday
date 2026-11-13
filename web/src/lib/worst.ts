// The worst-case arithmetic, exactly as the contract does it in `worst_case()`. The create form uses
// it live, and the verify page uses it to check the contract's own answer.

import { DAY_NS, near } from './format';

export type WorstInput = {
  perPeriod: bigint;
  periodNs: bigint;
  gifts: bigint;
  floor: bigint;
  assets: bigint;
  maturityNs: bigint;
  nowNs: bigint;
};

export function worstCase({ perPeriod, periodNs, gifts, floor, assets, maturityNs, nowNs }: WorstInput) {
  const period = periodNs > 0n ? periodNs : 1n;
  const left = maturityNs > nowNs ? maturityNs - nowNs : 0n;
  const periods = (left + period - 1n) / period;
  const cap = periods * perPeriod + gifts;
  const spendable = assets > floor ? assets - floor : 0n;
  return { periods, cap, spendable, untilMaturity: cap < spendable ? cap : spendable };
}

/** "a month", "a week", or "every 14 days". */
export function perPeriodText(periodNs: string | bigint): string {
  const days = Number(BigInt(periodNs) / DAY_NS);
  const named: Record<number, string> = { 1: 'a day', 7: 'a week', 30: 'a month', 365: 'a year' };
  return named[days] ?? (days > 0 ? `every ${days} days` : 'in each period');
}

export function periodName(periodNs: string | bigint): string {
  const days = Number(BigInt(periodNs) / DAY_NS);
  const named: Record<number, string> = { 1: 'day', 7: 'week', 30: 'month', 365: 'year' };
  return named[days] ?? `${days}-day period`;
}

/** The sentence printed on every trust. */
export function worstSentence(perPeriod: string | bigint, periodNs: string | bigint, floor: string | bigint) {
  const floorText = BigInt(floor) > 0n ? `, and never below ${near(floor)} NEAR` : '';
  return `At worst, this trust can lose ${near(perPeriod)} NEAR ${perPeriodText(periodNs)}${floorText}.`;
}
