"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * `scaleX` on a full-width bar, not `width` — width changes trigger layout
 * on every scroll tick, scaleX is a GPU transform. `transform-origin: left`
 * makes the scale read as "filling up" rather than growing from center.
 * `useSpring` smooths the raw scroll fraction so the bar doesn't visibly
 * step on fast/trackpad scroll; it degrades to a direct (unsprung) value
 * under reduced motion via near-instant spring constants — the bar still
 * needs to *exist* as a progress indicator, only its smoothing is optional.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="z-toast bg-primary fixed inset-x-0 top-0 h-0.5 origin-left"
    />
  );
}
