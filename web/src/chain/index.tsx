import { lazy, Suspense, type ReactNode } from 'react';

// VITE_NETWORK is replaced at build time, so a local build carries no wallet code.
const Provider = lazy(() =>
  import.meta.env.VITE_NETWORK === 'testnet' ? import('./testnet') : import('./local'),
);

export function ChainProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <Provider>{children}</Provider>
    </Suspense>
  );
}
