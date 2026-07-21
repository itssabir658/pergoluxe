import { Container, Section } from "@/components/layout";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import type { CollectionContent } from "@/features/collection/types";

/**
 * Short, separate from the hero on purpose — the hero's job is the first
 * visual impression and the primary CTA; this is the one or two sentences
 * of context a visitor reads before they start filtering. Kept distinct
 * from `SeoContentBlock` (long-form, after the grid) so the page never
 * front-loads SEO copy above the product grid, which the brief explicitly
 * calls out to avoid ("without overwhelming the primary shopping
 * experience").
 */
export function CollectionIntro({ content }: { content: CollectionContent }) {
  return (
    <Section spacing="sm">
      <Container size="narrow">
        <ScrollReveal className="text-center">
          <h2 className="text-h3 text-foreground">{content.introHeading}</h2>
          <p className="text-body-lg max-w-measure text-muted-foreground mx-auto mt-3">
            {content.introBody}
          </p>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
