"use client";

import { motion } from "framer-motion";
import { type ComponentPropsWithoutRef } from "react";

import {
  scrollReveal,
  scrollRevealViewport,
  staggerContainer,
} from "@/animations/variants";
import { useMotionVariants } from "@/animations/framer";

type RevealProps = ComponentPropsWithoutRef<typeof motion.div>;

/**
 * The one scroll-entrance mechanism for the whole site: fade-and-rise,
 * once, on first viewport entry, collapsing to a static render under
 * `prefers-reduced-motion` via `useMotionVariants`. Sections use these
 * three wrappers instead of hand-rolling per-section motion so the
 * "one motion system" rule (BRAND_IDENTITY.md §8) is enforced by
 * construction, not convention.
 *
 * - `ScrollReveal` — a single element revealing on its own.
 * - `ScrollRevealGroup` + `ScrollRevealItem` — a container staggering its
 *   items (cards in a grid, stats in a row); items inherit the trigger
 *   from the group, so the whole set animates as one choreographed unit.
 */
export function ScrollReveal({ children, ...props }: RevealProps) {
  const variants = useMotionVariants(scrollReveal);
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={scrollRevealViewport}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type RevealGroupProps = RevealProps & {
  /** Seconds between each child's entrance. */
  stagger?: number;
};

export function ScrollRevealGroup({
  children,
  stagger = 0.1,
  ...props
}: RevealGroupProps) {
  const variants = useMotionVariants(staggerContainer(stagger));
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={scrollRevealViewport}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({ children, ...props }: RevealProps) {
  const variants = useMotionVariants(scrollReveal);
  return (
    <motion.div variants={variants} {...props}>
      {children}
    </motion.div>
  );
}
