import { createContext, useContext } from 'react';
import type { Chain } from './types';

export const ChainContext = createContext<Chain | null>(null);

export function useChain(): Chain {
  const chain = useContext(ChainContext);
  if (!chain) throw new Error('useChain must be used inside ChainProvider');
  return chain;
}
