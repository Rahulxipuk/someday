import { rankValidators, type Ranked } from '../../../packages/validators/validators.mjs';
import type { Chain } from '../chain/types';

export type Pool = Ranked;

/**
 * The pools a trust may use, best first. Ranking happens across every validator, because who holds
 * a third of the stake depends on all of them. Only then are the unofficial ones dropped.
 */
export async function readPools(chain: Chain, poolSuffix: string): Promise<Pool[]> {
  return rankValidators(await chain.validators()).filter((v) => v.account_id.endsWith(poolSuffix));
}

export function poolVerdict(pool: Pool): string | null {
  if (pool.recommended) return null;
  if (!pool.healthy) return 'Its uptime is low.';
  if (pool.inBlockingSet) return 'One of the largest. It does not need more stake.';
  return 'Its commission is high.';
}
