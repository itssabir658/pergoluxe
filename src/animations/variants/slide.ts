import type { Variants } from "framer-motion";

import { DURATION, EASE } from "@/constants/motion";

type Direction = "up" | "down" | "left" | "right";

const OFFSETS: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
};

/**
 * Factory rather than four near-identical exported constants — direction
 * and distance are the only things that vary, so this is the one place
 * that variance is expressed.
 */
export function slideIn(direction: Direction, distance?: number): Variants {
  const offset = OFFSETS[direction];
  const scaled = distance
    ? {
        x: offset.x && Math.sign(offset.x) * distance,
        y: offset.y && Math.sign(offset.y) * distance,
      }
    : offset;

  return {
    hidden: { opacity: 0, ...scaled },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: DURATION.slow, ease: EASE.emphasized },
    },
  };
}
