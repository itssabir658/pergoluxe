import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/layout";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ROUTES } from "@/constants/routes";
import { featuredProjects, ProjectGallery } from "@/features/projects";

/**
 * Real-world proof — HOMEPAGE_STRATEGY.md §3.6. The section chrome is
 * home's; the gallery machinery (filters, cards) belongs to
 * features/projects, where the full projects page will reuse it. The
 * whole gallery reveals once as a unit — per-card stagger would fight the
 * filter interaction (re-filtering shouldn't re-choreograph).
 */
export function FeaturedProjectsSection() {
  return (
    <Section id="projects" spacing="lg" className="scroll-mt-header">
      <Container>
        <ScrollReveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-label text-primary">Projects</p>
            <h2 className="text-h2 text-foreground mt-2">Real projects, real homes</h2>
            <p className="text-body-lg max-w-measure text-muted-foreground mt-3">
              Every installation is designed for its site — browse recent work by the kind
              of space you&rsquo;re planning.
            </p>
          </div>
          <Link
            href={ROUTES.projects}
            className="text-button text-primary inline-flex shrink-0 items-center gap-1 underline-offset-4 hover:underline"
          >
            View all projects
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </ScrollReveal>

        <ScrollReveal className="mt-10">
          <ProjectGallery projects={featuredProjects} />
        </ScrollReveal>
      </Container>
    </Section>
  );
}
