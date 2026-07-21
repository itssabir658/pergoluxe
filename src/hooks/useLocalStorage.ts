"use client";

import { useCallback, useState } from "react";

/**
 * SSR-safe localStorage-backed state. Reads lazily (never touches
 * `localStorage` during server render), and every write is wrapped in a
 * try/catch — Safari private mode and storage-quota errors throw on
 * `setItem`, and a dismiss button or cookie-preference toggle should never
 * crash the page over it.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = next instanceof Function ? next(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // Storage unavailable (private mode, quota) — state still updates
          // in-memory for this session, it just won't persist across reloads.
        }
        return resolved;
      });
    },
    [key],
  );

  return [value, setStoredValue] as const;
}
