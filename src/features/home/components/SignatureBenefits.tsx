import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/layout";
import {
  ScrollReveal,
  ScrollRevealGroup,
  ScrollRevealItem,
} from "@/components/shared/ScrollReveal";
import { benefits } from "@/features/home/constants";

/**
 * Engineering differentiators — HOMEPAGE_STRATEGY.md §3.5: concrete,
 * falsifiable claims immediately after the configurator, so "here's what
 * you can design" is followed by "here's why it's built to last".
 * Server Component; the hover treatment (hairline border warming toward
 * primary — no lift, no scale, per BRAND_IDENTITY.md §7) is pure CSS.
 * Equal card heights come from the grid stretching items, not a fixed
 * height that would clip longer copy.
 */
export function SignatureBenefits() {
  return (
    <Section id="benefits" spacing="lg" className="scroll-mt-24">
      <Container>
        <ScrollReveal className="max-w-2xl">
          <p className="text-label text-primary">Why Pergoluxe</p>
          <h2 className="text-h2 text-foreground mt-2">
            Engineered details you&rsquo;ll feel for decades
          </h2>
        </ScrollReveal>

        <ScrollRevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, description, learnMoreHref }) => (
            <ScrollRevealItem key={title} className="h-full">
              <article className="border-border bg-card duration-base ease-standard hover:border-primary/40 flex h-full flex-col rounded-xl border p-6 transition-colors">
                <Icon className="text-primary size-6" aria-hidden="true" />
                <h3 className="text-h4 text-foreground mt-4">{title}</h3>
                <p className="text-body text-muted-foreground mt-2 flex-1">
                  {description}
                </p>
                {learnMoreHref && (
                  <Link
                    href={learnMoreHref}
                    className="text-button text-primary focus-visible:ring-ring/50 mt-4 inline-flex w-fit items-center gap-1 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
                  >
                    Learn more
                    <ArrowRight className="size-4" aria-hidden="true" />
                    <span className="sr-only"> about {title.toLowerCase()}</span>
                  </Link>
                )}
              </article>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </Container>
    </Section>
  );
}
