import { Container, Divider, Section } from "@/components/layout";
import { ScrollRevealGroup, ScrollRevealItem } from "@/components/shared/ScrollReveal";
import { trustFeatures, trustStats } from "@/config/trust";
import { AnimatedStat } from "@/features/home/components/AnimatedStat";

/**
 * Trust & social proof, immediately below the hero — the credibility-
 * before-selling placement from HOMEPAGE_STRATEGY.md §3.2. Two quiet rows:
 * counted stats (specific numbers read as falsifiable, therefore honest),
 * then three short feature reassurances. No CTA by design — this section's
 * job is credibility, and a CTA here would dilute it.
 */
export function TrustBar() {
  return (
    <Section
      id="trust"
      spacing="sm"
      className="border-border bg-surface scroll-mt-24 border-y"
    >
      <Container>
        <h2 className="sr-only">Why homeowners trust Pergoluxe</h2>

        <ScrollRevealGroup className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {trustStats.map((stat) => (
            <ScrollRevealItem key={stat.label}>
              <AnimatedStat {...stat} />
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>

        <Divider className="my-10" />

        <ScrollRevealGroup className="grid gap-8 sm:grid-cols-3">
          {trustFeatures.map(({ icon: Icon, title, description }) => (
            <ScrollRevealItem key={title} className="flex gap-3">
              <Icon className="text-primary mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="text-body text-foreground font-medium">{title}</h3>
                <p className="text-caption text-muted-foreground mt-1">{description}</p>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </Container>
    </Section>
  );
}
