import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/layout";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { FAQAccordion } from "@/features/faq";
import type { CollectionContent } from "@/features/collection/types";

/**
 * Long-form SEO content, deliberately placed after the grid/compare/buying
 * guide — a visitor here to shop never has to scroll past it, but it's
 * still on the page (not a separate route) for search engines and for the
 * minority of visitors who do want the detail. Reuses `FAQAccordion`
 * (Part 4's homepage FAQ component, which already takes `items` as a prop
 * rather than importing its own data) instead of a second accordion
 * implementation — this is exactly the reuse seam that component was
 * built for.
 */
export function SeoContentBlock({ content }: { content: CollectionContent }) {
  return (
    <Section spacing="md">
      <Container size="narrow">
        <ScrollReveal>
          <h2 className="text-h3 text-foreground">{content.seoHeading}</h2>
          <p className="text-body text-muted-foreground mt-4">{content.seoOverview}</p>
        </ScrollReveal>

        {content.seoFaqs.length > 0 && (
          <ScrollReveal className="mt-10">
            <FAQAccordion items={content.seoFaqs} />
          </ScrollReveal>
        )}

        {content.seoInternalLinks.length > 0 && (
          <ScrollReveal className="border-border mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t pt-6">
            {content.seoInternalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-body text-foreground inline-flex items-center gap-1 underline-offset-4 hover:underline"
              >
                {link.label}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            ))}
          </ScrollReveal>
        )}
      </Container>
    </Section>
  );
}
