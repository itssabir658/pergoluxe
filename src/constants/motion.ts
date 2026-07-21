/**
 * TypeScript mirror of the duration/easing custom properties in
 * `src/styles/tokens.css`. CSS custom properties aren't directly readable
 * by GSAP/Framer Motion without a `getComputedStyle` round-trip per
 * animation, which is both slower and a needless runtime dependency on the
 * DOM being ready. These constants are the deliberate, documented exception
 * to "one token source" — keep any change to a duration/easing value in
 * sync between this file and tokens.css.
 */

export const DURATION = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
  slower: 0.6,
} as const;

export const EASE = {
  standard: [0.4, 0, 0.2, 1],
  emphasized: [0.2, 0, 0, 1],
  decelerate: [0, 0, 0.2, 1],
} as const;

/** Same curves, as CSS-syntax strings — for GSAP, which takes named eases
 * or cubic-bezier strings rather than Framer Motion's array tuples. */
export const GSAP_EASE = {
  standard: "cubic-bezier(0.4, 0, 0.2, 1)",
  emphasized: "cubic-bezier(0.2, 0, 0, 1)",
  decelerate: "cubic-bezier(0, 0, 0.2, 1)",
} as const;
