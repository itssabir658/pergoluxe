"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Single source of truth for "should this animation run at all". Every
 * GSAP timeline and Framer Motion variant that isn't purely decorative
 * should branch on this instead of each component re-querying
 * `prefers-reduced-motion` independently.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
