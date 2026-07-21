import { Container, Section } from "@/components/layout";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ConfiguratorPreview } from "@/features/configurator";

/**
 * Homepage wrapper for the configurator teaser — HOMEPAGE_STRATEGY.md
 * §3.4: prove, experientially, that this is a made-to-order product. The
 * section chrome (heading, framing line, reveal) is home's; the working
 * preview itself belongs to features/configurator, where the real
 * configurator will grow around the same data model.
 */
export function ConfiguratorPreviewSection() {
  return (
    <Section
      id="configurator-preview"
      spacing="lg"
      className="bg-surface scroll-mt-header"
    >
      <Container>
        <ScrollReveal className="max-w-2xl">
          <p className="text-label text-primary">Configurator</p>
          <h2 className="text-h2 text-foreground mt-2">See it before you build it</h2>
          <p className="text-body-lg text-muted-foreground mt-3">
            Every pergola is built to order. Choose a starting point below — the full
            configurator takes it from here.
          </p>
        </ScrollReveal>

        <div className="mt-12">
          <ConfiguratorPreview />
        </div>
      </Container>
    </Section>
  );
}
