import { Container, Section } from "@/components/layout";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ComparisonTable } from "@/features/product";

/**
 * Homepage wrapper for the model comparison — HOMEPAGE_STRATEGY.md §3.7:
 * resolve the competitive/model-fit evaluation on-page. Section chrome is
 * home's; the table itself lives in features/product so the future
 * "full specifications" page can reuse it verbatim.
 */
export function ComparisonSection() {
  return (
    <Section id="compare" spacing="lg" className="bg-surface scroll-mt-24">
      <Container size="wide">
        <ScrollReveal className="max-w-2xl">
          <p className="text-label text-primary">Compare</p>
          <h2 className="text-h2 text-foreground mt-2">Find your model</h2>
          <p className="text-body-lg text-muted-foreground mt-3">
            Every Pergoluxe system shares the same engineering standard. Compare roof
            type, performance, and included features to see which fits your space.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-10">
          <ComparisonTable />
        </ScrollReveal>
      </Container>
    </Section>
  );
}
