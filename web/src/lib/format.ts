const YOCTO = 10n ** 24n;
const MS_NS = 1_000_000n;

export const DAY_NS = 86_400n * 1_000_000_000n;
export const HOUR_NS = 3_600n * 1_000_000_000n;

/** Decimal NEAR to yocto, with no floating point on the way. */
export function toYocto(value: string | number): string {
  const text = String(value).trim();
  if (!/^\d*\.?\d*$/.test(text) || !/\d/.test(text)) throw new Error(`Not an amount: ${value}`);
  const [whole, fraction = ''] = text.split('.');
  return (BigInt(whole || '0') * YOCTO + BigInt(fraction.padEnd(24, '0').slice(0, 24))).toString();
}

/** Yocto to a short decimal, such as `24.95`. */
export function near(yocto: string | bigint, digits = 3): string {
  const value = BigInt(yocto);
  const unit = 10n ** BigInt(24 - digits);
  const rounded = ((value + unit / 2n) / unit) * unit;
  const fraction = (rounded % YOCTO).toString().padStart(24, '0').slice(0, digits).replace(/0+$/, '');
  const text = (rounded / YOCTO).toLocaleString('en-US') + (fraction ? `.${fraction}` : '');
  return value > 0n && text === '0' ? 'less than 0.001' : text;
}

export const nearText = (yocto: string | bigint) => `${near(yocto)} NEAR`;

/** A number typed in a form, or null when it is not one. */
export function amountOf(text: string): bigint | null {
  try {
    return BigInt(toYocto(text));
  } catch {
    return null;
  }
}

/** The first "40 NEAR" in a message, so nobody has to type the amount twice. */
export function amountInText(text: string): string | null {
  return text.match(/(\d+(?:\.\d+)?)\s*near\b/i)?.[1] ?? null;
}

export const dateOfNs = (ns: string | bigint) => new Date(Number(BigInt(ns) / MS_NS));

export const dateText = (ns: string | bigint) =>
  dateOfNs(ns).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export function ago(ns: string | bigint, nowNs: bigint): string {
  const seconds = Number((nowNs - BigInt(ns)) / 1_000_000_000n);
  if (seconds < 60) return 'just now';
  const say = (n: number, unit: string) => `${n} ${unit}${n === 1 ? '' : 's'} ago`;
  if (seconds < 3600) return say(Math.floor(seconds / 60), 'minute');
  if (seconds < 86_400) return say(Math.floor(seconds / 3600), 'hour');
  if (seconds < 86_400 * 60) return say(Math.floor(seconds / 86_400), 'day');
  return dateText(ns);
}

export const count = (n: number, one: string, many = `${one}s`) =>
  `${n.toLocaleString('en-US')} ${n === 1 ? one : many}`;

export function messageOf(err: unknown): string {
  const text = err instanceof Error ? err.message : String(err);
  if (/CodeDoesNotExist/.test(text)) return 'The Someday contracts are not on this network yet.';
  return text.replace(/^Smart contract panicked: /, '');
}

export const utf8Length = (text: string) => new TextEncoder().encode(text).length;
