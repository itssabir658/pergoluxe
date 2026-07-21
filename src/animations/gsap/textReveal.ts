import { GSAP_EASE } from "@/constants/motion";
import { gsap, registerGsap } from "@/animations/gsap/registerGsap";

/**
 * GSAP's official word/char splitter (SplitText) is a paid Club GreenSock
 * plugin, not part of the core `gsap` package this project depends on. This
 * is a minimal, dependency-free stand-in: it only splits on words (not
 * chars/lines with line-reflow tracking), which covers the marketing
 * headline reveal this site actually needs. If the team licenses SplitText
 * later, swap the split step here for `new SplitText(el, { type: "words" })`
 * — the animation call below doesn't need to change.
 */
function splitIntoWordSpans(element: HTMLElement): HTMLSpanElement[] {
  const words = element.textContent?.split(/(\s+)/) ?? [];
  element.textContent = "";

  const spans: HTMLSpanElement[] = [];
  for (const word of words) {
    if (word.trim() === "") {
      element.append(document.createTextNode(word));
      continue;
    }
    const span = document.createElement("span");
    span.textContent = word;
    span.style.display = "inline-block";
    span.style.willChange = "transform, opacity";
    element.append(span);
    spans.push(span);
  }
  return spans;
}

type TextRevealOptions = {
  duration?: number;
  stagger?: number;
  y?: number;
};

/**
 * Splits `element`'s text into per-word spans and animates them in with a
 * stagger. Returns a cleanup function that restores the original text node
 * — call it in a `useEffect` cleanup so re-renders don't compound splits.
 */
export function textReveal(
  element: HTMLElement,
  { duration = 0.6, stagger = 0.03, y = 16 }: TextRevealOptions = {},
): () => void {
  registerGsap();
  if (typeof window === "undefined") return () => {};

  const originalText = element.textContent ?? "";
  const spans = splitIntoWordSpans(element);

  gsap.fromTo(
    spans,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, stagger, ease: GSAP_EASE.decelerate },
  );

  return () => {
    element.textContent = originalText;
  };
}
