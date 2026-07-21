"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type FooterNewsletterContextValue = {
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
};

const FooterNewsletterContext = createContext<FooterNewsletterContextValue | null>(null);

/**
 * Same seam as `HeaderModeProvider`, for the same structural reason: the
 * root layout renders `Footer` once, above `{children}`, so a route nested
 * inside `{children}` that ships its own dedicated newsletter section
 * (the homepage) can't pass `Footer` a prop directly — it calls
 * `useHideFooterNewsletter()` instead, and the footer (a sibling higher in
 * the tree) picks it up. Prevents the exact same signup form appearing
 * twice, back to back, on any route that has its own newsletter section.
 */
export function FooterNewsletterProvider({ children }: { children: ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const value = useMemo(() => ({ hidden, setHidden }), [hidden]);
  return (
    <FooterNewsletterContext.Provider value={value}>
      {children}
    </FooterNewsletterContext.Provider>
  );
}

export function useFooterNewsletterHidden(): boolean {
  const context = useContext(FooterNewsletterContext);
  if (!context) {
    throw new Error(
      "useFooterNewsletterHidden must be used within FooterNewsletterProvider",
    );
  }
  return context.hidden;
}

/** Call from a route's own client island when that route already renders
 * a full newsletter section. Resets on unmount so navigating away restores
 * the footer's newsletter block for routes without one. */
export function useHideFooterNewsletter() {
  const context = useContext(FooterNewsletterContext);
  if (!context) {
    throw new Error(
      "useHideFooterNewsletter must be used within FooterNewsletterProvider",
    );
  }
  const { setHidden } = context;

  useEffect(() => {
    setHidden(true);
    return () => setHidden(false);
  }, [setHidden]);
}
