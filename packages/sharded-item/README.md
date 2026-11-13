# sharded-item

The verification ladder from the [Sharded NFT Items draft](https://github.com/houseofstake/tla-contracts/blob/main/docs/sharded-nft-items.md), as one dependency-free JavaScript file. It works with any collection whose tokens are NEAR accounts, including House of Stake's leased names.

```js
import { checkNamespace, checkPair, reader } from './index.mjs';

const near = reader('https://rpc.mainnet.fastnear.com');

// T0: offline. Enough for display.
checkNamespace('ak-hog-hos.mainnet', 'hos.mainnet');

// T2: required before anything that moves value.
const result = await checkPair(near, {
  collection: 'registry.hos', // from YOUR config, never from the item
  item: 'ak-hog-hos.mainnet',
});

if (!result.ok) console.log('refused:', result.refusal);
else if (result.status !== 'Active') console.log('authentic, but cannot act');
else console.log('owner:', result.owner);
```

| Tier | Function | Cost | Proves |
| --- | --- | --- | --- |
| T0 | `checkNamespace` | none | Only the parent could have created this id |
| T1 | `checkIndex` | one call | The collection claims it. Not proof of ownership |
| T2 | `checkPair` | two calls at one final block | The account itself agrees |
| T3 | `checkProvenance` | cached | The parent can only create legitimate ids |

The draft warns about two mistakes that produce something that looks like verification but is not: reading the collection from the item, and reading the two halves at different heights. This library takes the collection only from the caller and pins both reads to one final block.

A disagreement between the halves is typed by direction when the collection reports its own sequence, so a catching-up index gets a bounded retry and a lying one is refused at once.

To check it against House of Stake on mainnet, read-only:

```bash
LIVE=1 node --test tests/sharded-item.test.mjs
```
