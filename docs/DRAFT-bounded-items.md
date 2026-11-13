---
Title: Bounded Items
Status: Idea for discussion
Type: Contract Standard
Requires: 171, Sharded Non-Fungible Token Items draft
---

# Bounded Items

## Summary

An NFT that is an account can hold money. This proposes one view that lets such an item state the most it can lose, so a wallet or a buyer can show that number instead of having to trust a description.

## Why

The Sharded NFT Items draft answers "is this account really part of the collection, and who owns it?" It deliberately does not answer "what can happen to the money inside?" Authenticity is not suitability.

That second question matters more once an item can act on its own, and most of all when an AI agent can spend from it. Today every project answers it differently, in prose, in its own README.

## Specification

An item MAY implement:

```rust
pub struct ItemBounds {
    /// The most that can leave in one period.
    pub per_period: U128,
    pub period_ns: U64,
    /// One-time amounts, on top of the period limit.
    pub one_time: U128,
    /// Assets that cannot leave before `until_ns`.
    pub floor: U128,
    pub until_ns: U64,
    /// The most that can leave before `until_ns`, given current balances.
    pub remaining: U128,
}

pub fn nft_item_bounds(&self) -> ItemBounds;
```

Requirements:

1. Every number MUST be enforced by this contract's own code, in the receipt that moves the money. A limit enforced by an agent, an off-chain policy or a model MUST NOT be reported here.
2. `remaining` MUST be computed from the same predicate the contract enforces, so it cannot drift from what the contract does.
3. The numbers MUST hold when the item's agent is fully compromised. Anything that can exceed them is outside this standard, and the item MUST NOT implement it.
4. Consumers MUST perform the T2 pair check first. These numbers mean nothing from a forged item.
5. Consumers SHOULD show `remaining` next to any price or balance. A balance is only worth what cannot leave before you act on it.

## Reference

`contracts/trust/src/lib.rs` in this repository implements these semantics as `worst_case()`. Its `tests/trust.test.mjs` runs a full attack with an always-approving trustee and checks that the loss stays inside the reported bound.

## Open questions

- Multi-asset items need one bound per asset.
- Whether the period should be a fixed window, as here, or rolling.
- Whether a bound that can only tighten should be distinguishable from one that can change.
