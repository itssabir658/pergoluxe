"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, registerGsap, ScrollTrigger } from "@/animations/gsap/registerGsap";

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

  useEffect(() => {
    if (prefersReducedMotion) return;

    registerGsap();
    const lenis = new Lenis({
      autoRaf: false,
      anchors: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return children;
}
