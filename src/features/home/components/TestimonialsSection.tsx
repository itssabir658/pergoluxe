import { Container, Section } from "@/components/layout";
import {
  ScrollReveal,
  ScrollRevealGroup,
  ScrollRevealItem,
} from "@/components/shared/ScrollReveal";
import {
  AggregateRatingSummary,
  aggregateRating,
  FeaturedTestimonial,
  featuredTestimonial,
  TestimonialCard,
  testimonials,
  VideoTestimonialTeaser,
} from "@/features/testimonials";

/**
 * Deep trust-building — HOMEPAGE_STRATEGY.md §3.8: placed after Comparison
 * so the rational case (specs) is already made before the emotional/social
 * one. No carousel: an editorial featured quote plus a static grid avoids
 * every carousel accessibility pitfall (autoplay, hidden slides, swipe-only
 * navigation) by construction rather than by careful implementation of
 * one. The grid reveals as a single group so re-reading the section on
 * scroll-back doesn't retrigger four staggered card animations.
 */
export function TestimonialsSection() {
  return (
    <Section id="testimonials" spacing="lg" className="scroll-mt-24">
      <Container>
        <ScrollReveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-label text-primary">Testimonials</p>
            <h2 className="text-h2 text-foreground mt-2">Trusted by homeowners</h2>
          </div>
          <AggregateRatingSummary {...aggregateRating} />
        </ScrollReveal>

        <ScrollReveal className="mt-10">
          <FeaturedTestimonial testimonial={featuredTestimonial} />
        </ScrollReveal>

        <ScrollRevealGroup className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <ScrollRevealItem key={testimonial.id} className="h-full">
              <TestimonialCard testimonial={testimonial} />
            </ScrollRevealItem>
          ))}
          <ScrollRevealItem>
            <VideoTestimonialTeaser />
          </ScrollRevealItem>
        </ScrollRevealGroup>
      </Container>
    </Section>
  );
}
