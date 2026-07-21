import type { Variants } from "framer-motion";

import { DURATION, EASE } from "@/constants/motion";

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.base, ease: EASE.decelerate },
  },
};

/** Subtle hover/tap affordance for cards and image tiles — not a page
 * transition. Spread directly into a `whileHover`/`whileTap` prop. */
export const scalePress = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: DURATION.fast, ease: EASE.standard },
};
