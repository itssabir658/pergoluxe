import { Container, Section } from "@/components/layout";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { NewsletterForm, newsletterCopy } from "@/features/newsletter";

/**
 * The last, lowest-commitment capture for visitors who reached the end of
 * the page without acting on the Final CTA — placed directly before the
 * footer (which carries its own compact newsletter utility on every page).
 * The two intentionally share one seam: both submit through the same
 * `subscribeNewsletter` server action, so this larger, explanatory instance
 * and the footer's always-available one-line bar can never validate or
 * integrate differently.
 */
export function NewsletterSection() {
  return (
    <Section id="newsletter" spacing="md" className="bg-surface scroll-mt-header">
      <Container size="narrow">
        <ScrollReveal className="text-center">
          <p className="text-label text-primary">{newsletterCopy.eyebrow}</p>
          <h2 className="text-h3 text-foreground mt-2">{newsletterCopy.heading}</h2>
          <p className="text-body max-w-measure text-muted-foreground mx-auto mt-3">
            {newsletterCopy.description}
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-8">
          <NewsletterForm copy={newsletterCopy} />
        </ScrollReveal>
      </Container>
    </Section>
  );
}
