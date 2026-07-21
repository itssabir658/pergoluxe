import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/layout";
import {
  ScrollRevealGroup,
  ScrollRevealItem,
  ScrollReveal,
} from "@/components/shared/ScrollReveal";
import { collections } from "@/config/collections";
import { ROUTES } from "@/constants/routes";
import { CollectionCard } from "@/features/home/components/CollectionCard";

/**
 * Product range overview — HOMEPAGE_STRATEGY.md §3.3: teach the taxonomy
 * visually and let the visitor self-select. Cards are data-driven from
 * `config/collections.ts` (the same source the mega menu derives from, so
 * nav and homepage always agree) and stagger in as one choreographed group.
 */
export function CollectionShowcase() {
  return (
    <Section id="collections" spacing="lg" className="scroll-mt-24">
      <Container>
        <ScrollReveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-label text-primary">Collections</p>
            <h2 className="text-h2 text-foreground mt-2">Explore our collections</h2>
            <p className="text-body-lg max-w-measure text-muted-foreground mt-3">
              Four systems, one standard of engineering — find the structure that fits
              your home and how you live outside.
            </p>
          </div>
          <Link
            href={ROUTES.products}
            className="text-button text-primary inline-flex shrink-0 items-center gap-1 underline-offset-4 hover:underline"
          >
            Shop all products
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </ScrollReveal>

        <ScrollRevealGroup className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => (
            <ScrollRevealItem key={collection.handle}>
              <CollectionCard collection={collection} />
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </Container>
    </Section>
  );
}
