"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { useReducedMotion } from "@/hooks";
import { processSteps } from "@/features/installation-journey/constants";

/**
 * The connecting rail fills as the section scrolls through view — a
 * genuine progress indicator (position in a 6-step journey), not
 * decoration, which is what justifies a scroll-linked effect at all under
 * BRAND_IDENTITY.md §8's "motion communicates state" rule. Only the fill
 * transform is scroll-linked (`scaleY`, GPU-only); step content uses the
 * ordinary one-time ScrollReveal used everywhere else on the page.
 *
 * Reduced motion: the rail renders fully drawn and static rather than
 * tracking scroll — a scroll-linked transform is exactly the kind of
 * motion that preference opts out of, and the journey's step order is
 * already fully conveyed by the numbered, static content beside it.
 */
export function ProcessTimeline() {
  const containerRef = useRef<HTMLOListElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.35"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 32 });

  return (
    <ol ref={containerRef} className="relative flex flex-col gap-10">
      <div
        aria-hidden="true"
        className="bg-border absolute top-4 bottom-4 left-[19px] w-px sm:left-[23px]"
      >
        <motion.div
          className="bg-primary w-full origin-top"
          style={
            reducedMotion ? { height: "100%" } : { height: "100%", scaleY: progress }
          }
        />
      </div>

      {processSteps.map((step, index) => {
        const Icon = step.icon;
        return (
          <li key={step.id} className="relative flex gap-5 pl-0 sm:gap-6">
            <span
              aria-hidden="true"
              className="border-primary bg-background text-primary relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 sm:size-12"
            >
              <Icon className="size-4 sm:size-5" />
            </span>
            <div className="pt-1 pb-1">
              <p className="text-caption text-muted-foreground">
                Step {index + 1} · {step.timeframe}
              </p>
              <h3 className="text-h4 text-foreground mt-1">{step.title}</h3>
              <p className="text-body max-w-measure text-muted-foreground mt-1.5">
                {step.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
