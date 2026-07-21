import { gsap, registerGsap } from "@/animations/gsap/registerGsap";
import type { ScrollTrigger } from "@/animations/gsap/registerGsap";

type ParallaxOptions = {
  /** Distance in pixels the element travels over the trigger's full scroll
   * range. Positive moves it down relative to the page as you scroll past. */
  distance?: number;
  trigger?: string | Element;
  scrub?: boolean | number;
};

/**
 * Scroll-scrubbed vertical translation — hero imagery, background layers.
 * Returns the ScrollTrigger so the caller can kill it on unmount; parallax
 * should never run under `prefers-reduced-motion` (it's the textbook case
 * of vestibular-triggering motion WCAG 2.3.3 does NOT exempt), so callers
 * must gate this behind `useReducedMotion()` themselves before calling it.
 */
export function parallax(
  target: string | Element | Element[],
  { distance = 80, trigger, scrub = true }: ParallaxOptions = {},
): ScrollTrigger | undefined {
  registerGsap();
  if (typeof window === "undefined") return undefined;

  const tween = gsap.to(target, {
    y: distance,
    ease: "none",
    scrollTrigger: {
      trigger: trigger ?? (target as string | Element),
      start: "top bottom",
      end: "bottom top",
      scrub,
    },
  });

  return tween.scrollTrigger ?? undefined;
}
