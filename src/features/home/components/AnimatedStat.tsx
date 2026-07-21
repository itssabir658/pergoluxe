"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { EASE } from "@/constants/motion";
import { useReducedMotion } from "@/hooks";
import type { TrustStat } from "@/config/trust";

function formatValue(value: number, decimals: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Count-up stat for the trust bar. The final value is what renders on the
 * server (SEO + no-JS correctness) and what a screen reader announces (the
 * animating span is `aria-hidden`, with an sr-only static twin) — the
 * count-up is purely a sighted, motion-allowed embellishment that runs
 * once on first viewport entry and not at all under reduced motion.
 */
export function AnimatedStat({ value, decimals = 0, suffix, label }: TrustStat) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(() => formatValue(value, decimals));

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: EASE.decelerate,
      onUpdate: (latest) => setDisplay(formatValue(latest, decimals)),
    });
    return () => controls.stop();
  }, [inView, reducedMotion, value, decimals]);

  const staticText = `${formatValue(value, decimals)}${suffix ?? ""}`;

  return (
    <div className="text-center lg:text-left">
      <p className="text-h2 text-foreground tabular-nums">
        <span ref={ref} aria-hidden="true">
          {display}
          {suffix}
        </span>
        <span className="sr-only">{staticText}</span>
      </p>
      <p className="text-caption text-muted-foreground mt-1">{label}</p>
    </div>
  );
}
