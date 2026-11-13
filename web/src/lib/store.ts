// Browser storage can be missing or throw, in a private window for example. Nothing here may break
// the page, so every read and write is guarded.

function wrap(area: () => Storage) {
  return {
    get(key: string): string | null {
      try {
        return area().getItem(key);
      } catch {
        return null;
      }
    },
    set(key: string, value: string) {
      try {
        area().setItem(key, value);
      } catch {
        // The page works without it.
      }
    },
    remove(key: string) {
      try {
        area().removeItem(key);
      } catch {
        // The page works without it.
      }
    },
    keys(): string[] {
      try {
        return Object.keys(area());
      } catch {
        return [];
      }
    },
  };
}

export const store = {
  ...wrap(() => localStorage),
  session: wrap(() => sessionStorage),
};
