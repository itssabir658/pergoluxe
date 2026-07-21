import Image from "next/image";
import Link from "next/link";

import { cn } from "@/utils/cn";
import { buttonVariants } from "@/components/ui/button";
import { Container, Section } from "@/components/layout";
import {
  ScrollReveal,
  ScrollRevealGroup,
  ScrollRevealItem,
} from "@/components/shared/ScrollReveal";
import { ROUTES } from "@/constants/routes";
import { finalCtaIndicators } from "@/config/trust";

/**
 * HOMEPAGE_STRATEGY.md §3.12: the same two choices as the hero (Configure
 * vs. Consultation), not new options — a visitor at the highest-intent
 * point of the page shouldn't face a fresh decision. Headline is
 * transformation-focused, deliberately not a restatement of the hero's
 * category-positioning headline. Pure Server Component: unlike the hero,
 * this background is a single static image (no video-gating logic needed)
 * — "none beyond a standard reveal" is the brief's own note on motion here.
 */
export function FinalCTASection() {
  return (
    <Section id="cta" spacing="lg" className="scroll-mt-header">
      <Container size="full" className="px-0">
        <div className="relative isolate overflow-hidden">
          <Image
            src="/images/final-cta.jpg"
            alt=""
            fill
            sizes="100vw"
            className="-z-10 object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/50 to-black/40"
          />

          <div className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-3xl text-center text-white">
              <ScrollReveal>
                <h2 className="text-h1">
                  Create an Outdoor Space You&apos;ll Enjoy for Years.
                </h2>
                <p className="text-body-lg max-w-measure mx-auto mt-5 text-white/85">
                  Your design specialist is ready when you are — configure your system
                  online or talk it through with a real person first. Either way, nothing
                  is billed until you approve a final design.
                </p>
              </ScrollReveal>

              <ScrollReveal className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href={ROUTES.configurator}
                  className={cn(
                    buttonVariants({ variant: "primary", size: "lg" }),
                    "w-full sm:w-auto",
                  )}
                >
                  Design Your Pergola
                </Link>
                <Link
                  href={ROUTES.quote}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "w-full border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto",
                  )}
                >
                  Book Free Consultation
                </Link>
              </ScrollReveal>

              <ScrollRevealGroup
                stagger={0.08}
                className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/15 pt-10 lg:grid-cols-4"
              >
                {finalCtaIndicators.map(({ icon: Icon, title, description }) => (
                  <ScrollRevealItem
                    key={title}
                    className="flex flex-col items-center gap-2"
                  >
                    <Icon className="size-5 text-white" aria-hidden="true" />
                    <p className="text-label text-white">{title}</p>
                    <p className="text-caption max-w-[22ch] text-white/70">
                      {description}
                    </p>
                  </ScrollRevealItem>
                ))}
              </ScrollRevealGroup>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
