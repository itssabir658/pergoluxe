"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/utils/cn";
import { useMediaQuery, useReducedMotion } from "@/hooks";

/**
 * The hero's background layer: poster image (the page's LCP element,
 * priority-loaded), an optional looping video on top, and the gradient
 * scrim that guarantees text contrast regardless of the footage beneath
 * (HOMEPAGE_STRATEGY.md §4 — the scrim is an accessibility requirement,
 * not a stylistic choice).
 *
 * The video is gated three ways, per the performance strategy:
 * - desktop only (`lg+`) — mobile gets the static poster, full stop; a
 *   "smaller video" is still a decode + battery cost an image doesn't have;
 * - never under `prefers-reduced-motion` — an autoplaying background loop
 *   is exactly the motion that setting opts out of;
 * - `onError` falls back to the poster permanently, so a missing or failed
 *   asset degrades invisibly instead of flashing a broken player.
 *
 * DROP-IN ASSET: place the real 6–10s loop at `public/videos/hero-loop.mp4`
 * (H.264, muted-safe, seamless loop, per BRAND_IDENTITY.md §9). Until it
 * exists, `onError` keeps the poster — no code change needed when it lands.
 */
export function HeroMedia() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reducedMotion = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  const showVideo = isDesktop && !reducedMotion && !failed;

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <Image
        src="/images/hero-poster.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          src="/videos/hero-loop.mp4"
          onError={() => setFailed(true)}
          onCanPlay={() => setReady(true)}
          className={cn(
            "duration-slower ease-standard absolute inset-0 size-full object-cover transition-opacity",
            ready ? "opacity-100" : "opacity-0",
          )}
        />
      )}
      {/* Scrim: heaviest at the bottom (where CTAs and the trust line sit),
          lighter toward the top — verified against the poster's brightest
          region, not an average. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/30" />
    </div>
  );
}
