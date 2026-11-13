# Threat model

Someday holds other people's money and secrets, so this starts from what must stay true.

## What must hold

1. **The trustee cannot lose more than `worst_case()` says.** This holds even if the model is fooled, the enclave lies, or the operator is hostile.
2. **Assets stay at or above the floor until maturity.** Not for a distribution, and not for a fee.
3. **Only the current holder can ask.** Control ends for the old holder the moment the NFT moves.
4. **Nobody reads the wishes in the clear outside the enclave.** That includes the holder, the creator after sealing, the operator and us.
5. **A trust can never be stuck.** No failure leaves money that nobody can ever reach.

## How a holder or seller could try to keep the money

Each row names the test that attacks it. Tests run against the compiled wasm: `npm test`.

| Attack | Defence | Test |
| --- | --- | --- |
| Withdraw before selling | No method pays the holder without a decision. Only limited distributions exist | `tests/transfer.test.mjs`: "the seller cannot drain the trust" |
| Keep a hidden key | The account is created with no access keys, in one receipt, and nothing can add one | "a trust has no access keys" |
| Keep a pending approval | A decision is bound to the rotation sequence at request time. If the holder changed, it is voided | "a sale in the middle of a payout" |
| Sell while a payout is in flight | The buyer binds to `payout_nonce`. A payout after they checked aborts the sale and refunds them | "a buyer is protected" |
| Keep the trustee's notes | The sealed memo is wiped on transfer | "the sealed memo about the last holder" |
| Read replies after selling | Replies are sealed to the holder's key for that request. A new holder's replies do not open for the old one | `tests/enclave.test.mjs`: "an old holder cannot read" |
| Hold the NFT in a contract between receipts | `nft_transfer_call` is refused | "nft_transfer_call is refused" |
| Reuse an old listing | Listings die with any transfer | "a listing dies with a transfer" |
| Move a locked trust | `rotate` refuses before maturity, and the index stays put | "a locked trust cannot move" |

## How an attacker could try to reach the money through the trustee

| Attack | Defence | Test |
| --- | --- | --- |
| Talk the model into paying everything | The model cannot pay. Its number is clamped to `max_per_request`, the period limit, the floor and what was asked | `tests/trust.test.mjs`: "a fully fooled trustee approving everything is clamped to max_per_request" |
| Repeat approved requests | `max_per_period` and the request limit hold | "repeated approvals stop at max_per_period" |
| Redirect the payment | The payee comes from the request and is checked against the rails. The trustee cannot name one | "a payee outside the rails is refused" |
| Forge a decision | `on_decision` is private and only accepts its own promise result | "nobody can call the callback directly" |
| Answer for another trust or request | The output must name this trust and this decision | "an answer for another trust" |
| Return garbage or nothing | Treated as no answer. Nothing moves, and the deposit returns | "garbage from the enclave" |
| Swap the trustee's code | The WASM hash and URL are fixed when the trust is created, and no method changes them | "a trust stays pinned" |
| Spam requests to burn yield | Holder only, with a cooldown and a period limit. Fees stop at the floor | "the cooldown and the request limit hold" |
| Open a letter twice | A letter opens once and its gift pays once | "a milestone opens its letter once" |

## How an attacker could try to reach the wishes

| Attack | Defence | Test |
| --- | --- | --- |
| Prompt injection to reveal the wishes | Two models. The one that replies has never seen the wishes. The one that read them can only output a verdict, an amount and two codes | `enclave/trustee`: `the_voice_never_sees_the_wishes`, `a_chamber_that_leaks_in_free_text_leaks_nothing` |
| Close the message block and pretend to be the system | Delimiters in a person's words are broken up | `a_person_cannot_close_their_own_block` |
| Replay sealed wishes into another trust | Boxes are bound to the trust and purpose | `tests/enclave.test.mjs`: "wishes sealed for one trust" |
| Run the trustee directly with made-up input | The secret is released only to calls whose predecessor is a trust account (a `Predecessor` access rule, judged by the keystore), and the code checks the caller again | `tests/enclave.test.mjs` covers the code check. On testnet, `scripts/testnet/stranger.mjs` was refused by the keystore (tx `3G1zJH4t1Su8ykQ9gj1d15aLtuCTgRiH1r2XutoJTAXK`) |
| Send the wishes somewhere other than the model | The wasm carries an `outlayer.manifest` section that allows one host, `cloud-api.near.ai`. OutLayer's worker reads it from the wasm, so the pinned hash covers it | `enclave/trustee/manifest.json`. The refusal of other hosts is OutLayer's code and has not been tested here |
| Read the chain | Only ciphertext is stored. It is public on purpose | "nothing readable went on chain" |
| The creator rewrites the wishes later | No method changes them. The hash is public | Reviewed in the contract: no such method exists |

## How a trust could get stuck

| Failure | Defence | Test |
| --- | --- | --- |
| The enclave never answers | A decision older than 30 minutes no longer blocks requests, and its late answer is ignored | "a stuck decision cannot freeze the trust" |
| The callback cannot pay for its own storage | 10,000 bytes stay funded at all times, which covers the largest possible decision | "opening the largest letter never runs the trust out of storage" |
| A payment bounces | The money stays and the books are restored | "a bounced payment keeps the money" |
| The pool fails | The money stays liquid, and anyone can retry | "a failing pool loses nothing" |
| Nobody is around | Maturity and rebalancing are open to anyone | "nobody can stop maturity" |

## What we still have to trust

These are not solved, and the README says so.

- **Intel TDX and OutLayer.** If the enclave is broken, the wishes can be read. The money is still bounded by the rails. OutLayer states that its governance currently runs on single keys it holds.
- **The model's judgment.** The rails bound the damage, not the quality of a decision. A trustee can refuse something the creator would have approved.
- **The side channel in decisions.** Someone who asks many questions learns something about the wishes from what gets approved. The cooldown and the request limit slow this, and do not stop it.
- **The size of the secret.** A person who wrote the wishes knows them. Sealing protects them from everyone else.
- **Sealing is pinned to one build.** A bug in the trustee cannot be patched for existing trusts.
- **Gas.** The local chain does not meter gas. Minting, requests, decisions and letters have run within their limits on testnet, but a sale and a transfer have not.
- **This is not a legal trust.** It does not replace a lawyer.
