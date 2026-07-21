import Link from "next/link";

import { cn } from "@/utils/cn";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout";
import { ROUTES } from "@/constants/routes";
import { heroTrustLine } from "@/config/trust";
import { HeroMedia } from "@/features/home/components/HeroMedia";
import { ScrollCue } from "@/features/home/components/ScrollCue";

/**
 * Copy lives here (a Server Component) so it ships as static HTML.
 * Headline and supporting line follow HOMEPAGE_STRATEGY.md §4's messaging
 * hierarchy: category + tier in one line, then one plain sentence that
 * resolves what/for-whom and carries the SEO-relevant category terms.
 */
const copy = {
  headline: "Outdoor Living, Engineered to Last.",
  supporting:
    "Custom aluminum pergolas and motorized louvered roofs, designed around your home and installed by our own certified teams.",
  primaryCta: { label: "Design Your Pergola", href: ROUTES.configurator },
  secondaryCta: { label: "Explore Collections", href: "#collections" },
} as const;

/**
 * The staggered entrance is deliberately CSS keyframes (tw-animate-css),
 * not Framer Motion. A JS entrance needs `initial="hidden"`, which ships
 * `opacity: 0` in the server HTML and leaves the hero invisible until
 * hydration — and it races the reduced-motion hook's first client value
 * (a real bug caught in the reduced-motion screenshot pass, not review).
 * CSS animation starts pre-hydration, costs zero client JS, and the
 * global `prefers-reduced-motion` rule in globals.css collapses it to an
 * instant static render natively. `fill-mode-backwards` holds each
 * element's hidden state through its stagger delay.
 */
const enter =
  "animate-in fade-in slide-in-from-bottom-6 fill-mode-backwards animation-duration-[700ms] ease-decelerate";

/**
 * Full-viewport hero. The global header floats transparent over this
 * section by design (see NAVIGATION.md — hero pages skip the header
 * spacer, so this section starts at y:0 behind the fixed header stack).
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden">
      <HeroMedia />
      <Container size="wide" className="py-32">
        <div className="max-w-3xl text-white">
          <h1 className={cn("text-h1 lg:text-display max-w-[20ch]", enter, "delay-100")}>
            {copy.headline}
          </h1>

          <p
            className={cn(
              "text-body-lg max-w-measure mt-6 text-white/85",
              enter,
              "delay-[250ms]",
            )}
          >
            {copy.supporting}
          </p>

          <div
            className={cn("mt-9 flex flex-col gap-3 sm:flex-row", enter, "delay-[400ms]")}
          >
            <Link
              href={copy.primaryCta.href}
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "bg-primary-foreground text-primary hover:bg-primary-foreground/90",
              )}
            >
              {copy.primaryCta.label}
            </Link>
            <Link
              href={copy.secondaryCta.href}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/40 text-white hover:bg-white/10 hover:text-white",
              )}
            >
              {copy.secondaryCta.label}
            </Link>
          </div>

          <p className={cn("text-caption mt-8 text-white/75", enter, "delay-[550ms]")}>
            {heroTrustLine.join(" · ")}
          </p>
        </div>
      </Container>
      <ScrollCue targetId="trust" />
    </section>
  );
}
