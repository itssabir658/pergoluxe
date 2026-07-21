import Link from "next/link";

import { cn } from "@/utils/cn";
import { buttonVariants } from "@/components/ui/button";
import { Container, Section } from "@/components/layout";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ROUTES } from "@/constants/routes";
import { ProcessTimeline } from "@/features/installation-journey";

/**
 * De-risks the unfamiliar next step — HOMEPAGE_STRATEGY.md §3.9: placed
 * right before the trust/guarantee and FAQ sections still to come, so the
 * last thing learned before being asked to commit is exactly what
 * committing involves. Section chrome is home's; the timeline itself
 * lives in features/installation-journey for reuse on a future dedicated
 * process page.
 */
export function InstallationJourneySection() {
  return (
    <Section id="process" spacing="lg" className="bg-surface scroll-mt-header">
      <Container size="narrow">
        <ScrollReveal className="text-center">
          <p className="text-label text-primary">How it works</p>
          <h2 className="text-h2 text-foreground mt-2">
            From first call to first evening outside
          </h2>
          <p className="text-body-lg max-w-measure text-muted-foreground mx-auto mt-3">
            Six steps, start to finish — every one handled by our own team.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-14">
          <ProcessTimeline />
        </ScrollReveal>

        <ScrollReveal className="mt-14 flex justify-center">
          <Link
            href={ROUTES.quote}
            className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
          >
            Book Your Free Consultation
          </Link>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
