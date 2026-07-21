import { Container, Section } from "@/components/layout";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { jsonLdScriptProps } from "@/config/seo";
import { FAQAccordion, faqItems, faqJsonLd } from "@/features/faq";

/**
 * HOMEPAGE_STRATEGY.md §3.11: the last objection-handling section before
 * the final ask, one question at a time via `FAQAccordion` so the page
 * doesn't grow unpredictably long. `FAQPage` schema is generated from the
 * exact same `faqItems` the accordion renders — real markup driving real
 * schema, never structured data describing content that isn't visibly
 * on the page.
 */
export function FAQSection() {
  return (
    <Section id="faq" spacing="lg" className="scroll-mt-header">
      <script {...jsonLdScriptProps(faqJsonLd(faqItems))} />
      <Container size="narrow">
        <ScrollReveal className="text-center">
          <p className="text-label text-primary">FAQ</p>
          <h2 className="text-h2 text-foreground mt-2">Questions, answered</h2>
          <p className="text-body-lg max-w-measure text-muted-foreground mx-auto mt-3">
            The specifics people ask us before they commit — if yours isn&apos;t here, a
            design specialist can answer it directly.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-10">
          <FAQAccordion items={faqItems} />
        </ScrollReveal>
      </Container>
    </Section>
  );
}
