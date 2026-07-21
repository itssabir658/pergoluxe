"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { useReducedMotion } from "@/hooks";

/**
 * The hero's subtle scroll affordance — a real link to the next section
 * (keyboard-reachable, screen-reader-labelled), not a purely decorative
 * arrow. The gentle drift animation is suppressed entirely under reduced
 * motion; the affordance itself remains.
 */
export function ScrollCue({ targetId }: { targetId: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <a
      href={`#${targetId}`}
      className="duration-fast absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full p-2 text-white/70 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
    >
      <span className="sr-only">Scroll to explore</span>
      {reducedMotion ? (
        <ChevronDown className="size-5" aria-hidden="true" />
      ) : (
        <motion.span
          aria-hidden="true"
          className="block"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-5" />
        </motion.span>
      )}
    </a>
  );
}
