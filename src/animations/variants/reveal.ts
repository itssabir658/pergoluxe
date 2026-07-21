import type { Variants } from "framer-motion";

import { DURATION, EASE } from "@/constants/motion";

/**
 * The default `whileInView` reveal for marketing sections: fade + a short
 * rise, once, with a viewport margin so it fires slightly before the
 * element is fully on-screen. Pair with:
 *
 *   <motion.div variants={scrollReveal} initial="hidden" whileInView="visible"
 *     viewport={{ once: true, margin: "-10% 0px" }} />
 */
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.emphasized },
  },
};

export const scrollRevealViewport = { once: true, margin: "-10% 0px" } as const;
