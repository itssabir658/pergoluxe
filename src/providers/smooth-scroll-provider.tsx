"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, registerGsap, ScrollTrigger } from "@/animations/gsap/registerGsap";

type ScrollToTarget = number | string | HTMLElement;

type LenisContextValue = {
  /** Scrolls to a target (pixel offset, selector, or element) through
   * Lenis when it's active, or a plain native scroll when reduced motion
   * disabled it — callers never need to branch on which is active. */
  scrollTo: (target: ScrollToTarget, options?: { offset?: number }) => void;
};

const LenisContext = createContext<LenisContextValue | null>(null);

/** Read by BackToTop and any future in-page anchor link/scroll trigger —
 * never reach for `window.scrollTo` directly in a component. */
export function useLenis(): LenisContextValue {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error("useLenis must be used within SmoothScrollProvider");
  }
  return context;
}

/**
 * Owns the one Lenis instance for the whole app and syncs it to GSAP's
 * ticker so ScrollTrigger reads the same (smoothed) scroll position Lenis
 * is rendering — without this sync, ScrollTrigger-pinned/scrubbed elements
 * visibly lag a frame behind the smoothed scroll.
 *
 * When `prefers-reduced-motion` is set, Lenis is never instantiated at
 * all: inertial/smoothed scrolling is itself the kind of motion that
 * setting exists to opt out of, so those users get plain native scroll
 * (already the default — see the `scroll-behavior: auto` note in
 * globals.css) rather than a "reduced" version of the smoothing.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    registerGsap();
    const lenis = new Lenis({
      autoRaf: false,
      anchors: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  const scrollTo = useCallback(
    (target: ScrollToTarget, options?: { offset?: number }) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: options?.offset ?? 0 });
        return;
      }
      const top =
        typeof target === "number"
          ? target
          : ((typeof target === "string"
              ? document.querySelector(target)
              : target
            )?.getBoundingClientRect().top ?? 0);
      window.scrollTo({
        top: top + window.scrollY + (options?.offset ?? 0),
        behavior: "auto",
      });
    },
    [],
  );

  const value = useMemo(() => ({ scrollTo }), [scrollTo]);

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}
