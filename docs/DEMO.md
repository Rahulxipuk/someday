# Demo video and post

## The video

[`video/someday-demo.mp4`](../video/someday-demo.mp4) runs 2:18 at 1080p. It is cut from the real app running on NEAR testnet: a real trust, real decisions by the real AI trustee in an enclave, and real payments. While filming, a stand-in signer replaced the wallet popup (`tools/video/fake-wallet.js`); the transactions it signed are real. Maya and Grandpa are fictional, and their voices are AI-generated, as the video says on screen.

`tools/video/script.json` holds every spoken line, and `tools/video` holds the scripts that filmed and cut the video.

It follows the organizers' advice: the problem first, in plain words, then one complete moment from a real action to a visible result.

| Part | What happens | What is said |
| --- | --- | --- |
| The problem | Grandpa types his wishes | He wants to leave money to his granddaughter, and won't be there to guide her. A lawyer costs thousands. Handing it over means it could be gone in a week. |
| The solution | He seals his wishes, sets a limit, and creates the trust | The money is locked in an NFT that Maya owns. She can't take it out. She has to ask, and an AI that knows his wishes can say no. |
| See it work | Maya asks for a motorbike, then tells the truth about the bus to college | Refused, and nothing moves. Then approved, and the money goes straight to the school. |
| The moment | Maya graduates. The trustee accepts, and she breaks the seal | Grandpa's letter opens, and his gift is paid. |
| Why it matters | Live checks on the chain | Nobody holds a key. The money keeps earning. Grandpa is still looking after her. |

## The post

One post on X, with the video attached:

> Want to leave money to someone you love, but won't be there to guide them?
>
> Someday locks it in an NFT they own, a NEAR account nobody holds a key to. They ask, and an AI trustee can say no.
>
> Try it: https://test.fastfs.io/someday-code.testnet/someday-trust.testnet/index.html#/try
>
> Built at NEAR HACKATHON @NEARProtocol #NEARHackathon

## What did you build?

> Leaving money to someone young means deciding today how it may be used years from now. A smart contract can follow rules but can't use judgment, and a human trustee costs thousands and must be trusted for decades. Someday is a trust fund you hold as an NFT: the holder can't withdraw, they ask, an AI trustee decides against the creator's sealed wishes, and the contract pays only within limits printed on the NFT, so even a fooled AI can't drain it. On NEAR, each trust is an NEP-171 token that is also its own sub-account with no keys, staking its savings with a validator. The trustee runs in an OutLayer enclave using NEAR AI private inference, its answer comes back through yield and resume, and the staking yield pays the enclave's fee for each decision. It is live on testnet, with a public trust anyone can try without a wallet.
