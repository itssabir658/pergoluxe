import { GSAP_EASE } from "@/constants/motion";
import { gsap, registerGsap } from "@/animations/gsap/registerGsap";
import type { ScrollTrigger } from "@/animations/gsap/registerGsap";

type GsapTarget = string | Element | Element[] | NodeListOf<Element>;

type ScrollRevealOptions = {
  y?: number;
  duration?: number;
  stagger?: number;
  /** Element or selector ScrollTrigger uses to decide when to fire. */
  trigger?: GsapTarget;
  start?: string;
};

/**
 * Imperative GSAP counterpart to the Framer `scrollReveal` variant — reach
 * for this instead of Framer when the reveal needs to be part of a larger
 * GSAP timeline (e.g. sequenced with a pin or scrub elsewhere on the page).
 * For a standalone "fade up when scrolled into view" on a single component,
 * prefer `useMotionVariants(scrollReveal)` — it's less code and doesn't
 * require cleanup.
 *
 * Returns the ScrollTrigger instance so the caller can `.kill()` it in a
 * `useEffect` cleanup.
 */
export function scrollReveal(
  target: GsapTarget,
  {
    y = 32,
    duration = 0.6,
    stagger = 0,
    trigger,
    start = "top 85%",
  }: ScrollRevealOptions = {},
): ScrollTrigger | undefined {
  registerGsap();
  if (typeof window === "undefined") return undefined;

  const tween = gsap.fromTo(
    target,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: GSAP_EASE.decelerate,
      scrollTrigger: {
        trigger: trigger ?? target,
        start,
      },
    },
  );

  return tween.scrollTrigger ?? undefined;
}
