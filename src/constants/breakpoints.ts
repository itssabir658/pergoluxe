/**
 * Mirrors Tailwind's default breakpoint scale (unmodified — see
 * tokens.css). Needed in JS for `useMediaQuery` and any GSAP
 * ScrollTrigger/matchMedia setup that has to branch on viewport size;
 * Tailwind itself never reads this file.
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;
