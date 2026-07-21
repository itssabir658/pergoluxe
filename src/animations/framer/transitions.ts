import type { Transition } from "framer-motion";

import { DURATION, EASE } from "@/constants/motion";

/** Shared `transition` presets for one-off `motion.*` props that don't
 * warrant a full variants object (a single hover state, a layout animation). */
export const transitions: Record<"fast" | "base" | "slow" | "slower", Transition> = {
  fast: { duration: DURATION.fast, ease: EASE.standard },
  base: { duration: DURATION.base, ease: EASE.standard },
  slow: { duration: DURATION.slow, ease: EASE.emphasized },
  slower: { duration: DURATION.slower, ease: EASE.emphasized },
};

/** Framer's spring preset for drag/gesture-driven UI (drawers, carousels)
 * where a duration-based ease reads as sluggish. */
export const springTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};
