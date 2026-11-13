import { useId } from 'react';

/** The wax seal. Pass `label` when it means something, or it is decoration and hidden from readers. */
export function WaxSeal({ size = 64, gold = false, label }: { size?: number; gold?: boolean; label?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const colors = gold ? ['#d6b25a', '#b08a2e', '#7a5c14'] : ['#b8413a', '#8c1f1f', '#5c1010'];
  return (
    <svg
      className="seal"
      viewBox="0 0 120 120"
      width={size}
      height={size}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <radialGradient id={`${id}g`} cx="36%" cy="30%" r="78%">
          <stop offset="0" stopColor={colors[0]} />
          <stop offset=".55" stopColor={colors[1]} />
          <stop offset="1" stopColor={colors[2]} />
        </radialGradient>
        <filter id={`${id}f`} x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence type="fractalNoise" baseFrequency=".032" numOctaves="2" seed="11" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
        </filter>
      </defs>
      <circle cx="60" cy="60" r="50" fill={`url(#${id}g)`} filter={`url(#${id}f)`} />
      <circle cx="60" cy="60" r="35" fill="none" stroke="#000" strokeOpacity=".16" strokeWidth="3.5" />
      <circle cx="60" cy="59" r="35" fill="none" stroke="#fff" strokeOpacity=".2" strokeWidth="1.5" />
      <text
        x="60"
        y="77"
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontStyle="italic"
        fontSize="48"
        fill="#fff"
        fillOpacity=".82"
      >
        S
      </text>
    </svg>
  );
}
