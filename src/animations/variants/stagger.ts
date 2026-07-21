import type { Variants } from "framer-motion";

/**
 * Applied to the *parent* of a list whose children each carry their own
 * `visible`/`hidden` variant (fadeIn, slideIn, scaleIn all satisfy this) —
 * Framer Motion propagates `staggerChildren` automatically as long as the
 * children use `variants` + `initial="hidden"` + `animate="visible"`
 * without their own explicit `transition` override on the wrapping motion.div.
 */
export function staggerContainer(staggerDelay = 0.08, initialDelay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };
}
