// The local chain: tools/localnet/server.mjs, with personas instead of a wallet.

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { config } from '../config';
import { forgetAllWords } from '../lib/room';
import { store } from '../lib/store';
import { ChainContext } from './context';
import type { CallResult, Chain, ItemClient, Persona, RawValidator, ViewFn } from './types';

type Status = {
  world: string;
  now: string;
  height: number;
  fooled: boolean;
  model?: 'real' | 'stub';
  accounts: Persona[];
};

const OFFLINE = 'The local chain is not answering. Start it with: npm run local';
const encoder = new TextEncoder();

async function request<T>(path: string, body?: object): Promise<T> {
  let response: Response;
  try {
    response = await fetch(config.localRpc + path, {
      method: body ? 'POST' : 'GET',
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error(OFFLINE);
  }
  return response.json() as Promise<T>;
}

const view: ViewFn = async <T,>(account: string, method: string, args: object = {}) => {
  const reply = await request<{ ok: boolean; value: T; error?: string }>('/rpc/view', {
    account,
    method,
    args,
  });
  if (!reply.ok) throw new Error(reply.error ?? 'The view failed');
  return reply.value;
};

async function accessKeys(account: string) {
  const reply = await request<{ keys: number }>(`/rpc/keys?account=${encodeURIComponent(account)}`);
  return reply.keys;
}

/** The local chain has one state, so every read is already at one block. */
const client: ItemClient = {
  finalHeight: async () => (await request<Status>('/rpc/accounts')).height,
  call: (account, method, args = {}) => view(account, method, args),
  accessKeys: async (account) => Array.from({ length: await accessKeys(account) }),
};

/** A create or a transfer that failed downstream still returns: its value is `false`. */
function normalize(reply: CallResult & { failures?: { error: string }[] }): CallResult {
  const failed = reply.value === false;
  return {
    ok: reply.ok && !failed,
    value: reply.value,
    error: failed ? (reply.failures?.[0]?.error ?? 'It did not go through') : reply.error,
    events: reply.events ?? [],
  };
}

export default function LocalChain({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState(() => store.get('someday:persona') ?? 'maya.testnet');
  const [status, setStatus] = useState<Status | null>(null);
  const [online, setOnline] = useState(true);
  const [version, setVersion] = useState(0);
  const seen = useRef('');

  const bump = useCallback(() => setVersion((v) => v + 1), []);

  const refresh = useCallback(async () => {
    try {
      const next = await request<Status>('/rpc/accounts');
      setOnline(true);
      const text = JSON.stringify(next);
      if (text === seen.current) return;
      const newWorld = !!seen.current && JSON.parse(seen.current).world !== next.world;
      seen.current = text;
      setStatus(next);
      if (newWorld) bump();
    } catch {
      setOnline(false);
    }
  }, [bump]);

  useEffect(() => {
    void refresh();
    const timer = setInterval(refresh, 4000);
    return () => clearInterval(timer);
  }, [refresh]);

  const setPersona = useCallback((id: string) => {
    store.set('someday:persona', id);
    setPersonaState(id);
  }, []);

  const call = useCallback(
    async (receiver: string, method: string, args: object = {}, deposit = '0') => {
      const reply = await request<CallResult>('/rpc/call', {
        signer: persona,
        receiver,
        method,
        args,
        deposit,
      });
      bump();
      void refresh();
      return normalize(reply);
    },
    [persona, bump, refresh],
  );

  const pinned = useCallback(async () => {
    const { now } = await request<Status>('/rpc/accounts');
    return { view, nowNs: BigInt(now) };
  }, []);

  const publicAsk = useCallback(
    async (trust: string, holder: string, amount: string, message: string) => {
      const reply = await request<CallResult>('/rpc/call', {
        signer: holder,
        receiver: trust,
        method: 'request',
        args: {
          kind: 'Ask',
          amount,
          category: 7,
          payee: holder,
          message: btoa(String.fromCharCode(...encoder.encode(message))),
          reply_key: null,
        },
      });
      bump();
      void refresh();
      return normalize(reply);
    },
    [bump, refresh],
  );

  const validators = useCallback(async () => {
    const reply = await request<{ validators: RawValidator[] }>('/rpc/validators');
    return reply.validators;
  }, []);

  const roomSeed = useCallback(
    async (trust: string) => encoder.encode(`someday/local-room:${persona}:${trust}`),
    [persona],
  );

  const advance = useCallback(
    async (days: number) => {
      await request('/rpc/advance', { days });
      await refresh();
      bump();
    },
    [bump, refresh],
  );

  const reset = useCallback(async () => {
    await request('/rpc/reset', {});
    forgetAllWords();
    await refresh();
    bump();
  }, [bump, refresh]);

  const setFooled = useCallback(
    async (on: boolean) => {
      await request('/rpc/fool', { on });
      await refresh();
    },
    [refresh],
  );

  const chain = useMemo<Chain>(
    () => ({
      network: 'local',
      accountId: persona,
      version,
      scope: status?.world ?? 'local',
      online,
      view,
      pinned,
      call,
      accessKeys,
      client,
      publicAsk,
      validators,
      roomSeed,
      signIn: async () => {},
      signOut: async () => {},
      dev: {
        personas: status?.accounts ?? [],
        setPersona,
        nowNs: BigInt(status?.now ?? Date.now() * 1_000_000),
        advance,
        reset,
        fooled: status?.fooled ?? false,
        model: status?.model ?? 'stub',
        setFooled,
      },
    }),
    [persona, version, status, online, pinned, call, publicAsk, validators, roomSeed, setPersona, advance, reset, setFooled],
  );

  return <ChainContext.Provider value={chain}>{children}</ChainContext.Provider>;
}
