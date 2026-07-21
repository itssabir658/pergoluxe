"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type HeaderMode = "transparent" | "solid";

type HeaderModeContextValue = {
  mode: HeaderMode;
  setMode: (mode: HeaderMode) => void;
};

const HeaderModeContext = createContext<HeaderModeContextValue | null>(null);

/**
 * Lets a page declare "I have no hero, render the header solid from frame
 * one" without the root layout needing to know per-route whether a hero
 * exists. The root layout renders `Header` once, above `{children}`; a
 * page nested deep inside `{children}` can't pass it a prop directly, so
 * this context is the seam — a page calls `useSetHeaderMode("solid")` and
 * the header (a sibling higher in the tree) picks it up.
 */
export function HeaderModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<HeaderMode>("transparent");
  const value = useMemo(() => ({ mode, setMode }), [mode]);
  return (
    <HeaderModeContext.Provider value={value}>{children}</HeaderModeContext.Provider>
  );
}

export function useHeaderMode(): HeaderMode {
  const context = useContext(HeaderModeContext);
  if (!context) throw new Error("useHeaderMode must be used within HeaderModeProvider");
  return context.mode;
}

/** Call from a route's top-level Client Component (e.g. a page's hero, or
 * a tiny dedicated one for server pages) when that route has no hero to
 * sit over. Resets to "transparent" on unmount so navigating to a
 * hero-based route afterward isn't left stuck solid. */
export function useSetHeaderMode(mode: HeaderMode) {
  const context = useContext(HeaderModeContext);
  if (!context)
    throw new Error("useSetHeaderMode must be used within HeaderModeProvider");
  const { setMode } = context;

  useEffect(() => {
    setMode(mode);
    return () => setMode("transparent");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);
}
