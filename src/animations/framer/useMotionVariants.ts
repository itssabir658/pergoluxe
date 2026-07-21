"use client";

import type { Variants } from "framer-motion";

import { useReducedMotion } from "@/hooks/useReducedMotion";

const INSTANT: Variants = { hidden: { opacity: 1 }, visible: { opacity: 1 } };

/**
 * Wraps any variants object so components never hand-write the
 * reduced-motion branch themselves: `useMotionVariants(scrollReveal)`
 * returns `scrollReveal` normally, or a transition-free pass-through when
 * the user has `prefers-reduced-motion` set — the element still appears,
 * it just doesn't move to get there.
 */
export function useMotionVariants(variants: Variants): Variants {
  const reduced = useReducedMotion();
  return reduced ? INSTANT : variants;
}
