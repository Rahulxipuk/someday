const env = import.meta.env;
const testnet = env.VITE_NETWORK === 'testnet';

export const config = {
  network: testnet ? ('testnet' as const) : ('local' as const),
  /** The testnet default matches scripts/testnet/setup.mjs. */
  collection: env.VITE_COLLECTION_ID || (testnet ? 'someday-trust.testnet' : 'someday.testnet'),
  publicTrust: env.VITE_PUBLIC_TRUST || 'nani',
  localRpc: env.VITE_LOCAL_RPC || 'http://127.0.0.1:8787',
  rpcUrl: env.VITE_RPC_URL || 'https://rpc.testnet.fastnear.com',
  /** Limited keys, published on purpose. Each can only call `request` on the public trust. */
  publicKeys: ((env.VITE_PUBLIC_KEYS as string | undefined) || '').split(',').filter(Boolean),
};

/** Links use the short label. Both `maya` and `maya.someday.testnet` are accepted. */
export const tokenId = (id: string) => (id.includes('.') ? id : `${id}.${config.collection}`);

export const labelOf = (token: string) => token.split('.')[0];

export const publicTrustId = tokenId(config.publicTrust);
