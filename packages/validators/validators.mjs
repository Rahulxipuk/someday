// Picks where a trust's stake goes, in NEAR's favour.
//
// A long-lived endowment is exactly the stake that should not pile onto the largest validators.
// The default here is the opposite of "highest stake wins": among healthy validators, prefer those
// outside the set that together control a third of the stake, because that set is the smallest
// group that could halt the chain. Each trust then makes that group a little harder to form.

const THIRD = 1 / 3;

/**
 * @param validators [{ account_id, stake, num_produced_blocks, num_expected_blocks, fee? }]
 *        `stake` is a yocto string. `fee` is the commission in percent, if known.
 */
export function rankValidators(validators, { minUptime = 0.95, maxFee = 10 } = {}) {
  const total = validators.reduce((sum, v) => sum + Number(BigInt(v.stake) / 10n ** 24n), 0);
  const byStake = [...validators].sort((a, b) => (BigInt(b.stake) > BigInt(a.stake) ? 1 : -1));

  let running = 0;
  const ranked = byStake.map((v) => {
    const stakeNear = Number(BigInt(v.stake) / 10n ** 24n);
    const share = total ? stakeNear / total : 0;
    const blocking = running < THIRD;
    running += share;
    const expected = v.num_expected_blocks ?? 0;
    const uptime = expected ? (v.num_produced_blocks ?? 0) / expected : null;
    const healthy = uptime === null ? false : uptime >= minUptime;
    const fairFee = v.fee === undefined || v.fee <= maxFee;
    return {
      account_id: v.account_id,
      stakeNear,
      share,
      uptime,
      fee: v.fee ?? null,
      inBlockingSet: blocking,
      healthy,
      recommended: healthy && fairFee && !blocking,
    };
  });

  const order = (a, b) =>
    Number(b.recommended) - Number(a.recommended) ||
    (a.recommended ? a.stakeNear - b.stakeNear : b.stakeNear - a.stakeNear);
  return ranked.sort(order);
}

/** How many validators it takes to reach a third of the stake. Higher is safer for NEAR. */
export function nakamotoCoefficient(validators) {
  const ranked = rankValidators(validators).sort((a, b) => b.share - a.share);
  let running = 0;
  let count = 0;
  for (const v of ranked) {
    running += v.share;
    count += 1;
    if (running >= THIRD) break;
  }
  return count;
}

export async function fetchValidators(rpcUrl, fetchImpl = globalThis.fetch) {
  const response = await fetchImpl(rpcUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 'validators', method: 'validators', params: [null] }),
  });
  const body = await response.json();
  if (body.error) throw new Error(body.error.message);
  return body.result.current_validators;
}
