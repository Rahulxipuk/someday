import { useCallback, useEffect, useRef, useState } from 'react';
import { useChain } from '../chain/context';
import { messageOf } from './format';

export type Loaded<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
  reload: () => Promise<void>;
};

/**
 * Loads from the chain, reloads after every write, and keeps showing the last good data while it
 * does. A slow answer can never overwrite a newer one.
 */
export function useLoad<T>(
  load: () => Promise<T>,
  deps: unknown[],
  { poll }: { poll?: number } = {},
): Loaded<T> {
  const { version } = useChain();
  const latest = useRef(load);
  latest.current = load;
  const turn = useRef(0);
  const [state, setState] = useState<{ data: T | null; error: string | null; loading: boolean }>({
    data: null,
    error: null,
    loading: true,
  });

  const reload = useCallback(async () => {
    const mine = ++turn.current;
    try {
      const data = await latest.current();
      if (mine === turn.current) setState({ data, error: null, loading: false });
    } catch (err) {
      if (mine === turn.current) {
        setState((s) => ({ data: s.data, error: messageOf(err), loading: false }));
      }
    }
  }, []);

  useEffect(() => {
    void reload();
    if (!poll) return;
    const timer = setInterval(reload, poll);
    return () => clearInterval(timer);
    // `deps` is the caller's list. `reload` is stable.
  }, [...deps, version, poll, reload]);

  return { ...state, reload };
}
