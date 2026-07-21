import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * GSAP plugin registration must happen exactly once, and only in the
 * browser (ScrollTrigger reads `window`/`document` on construction). Call
 * this at the top of any client component's `useEffect`/`useGSAP` before
 * creating a ScrollTrigger-based animation — it's a no-op after the first
 * call, so calling it from every consumer is cheap and safe.
 */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export { gsap, ScrollTrigger };
