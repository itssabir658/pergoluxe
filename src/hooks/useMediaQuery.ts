"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string, callback: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

/**
 * SSR-safe media query hook built on `useSyncExternalStore` — avoids the
 * classic "wrong value on first client render" flash you get from a
 * `useState` + `useEffect` implementation, and never mismatches hydration
 * because the server snapshot always resolves to `false`.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => subscribe(query, callback),
    () => window.matchMedia(query).matches,
    () => false,
  );
}
