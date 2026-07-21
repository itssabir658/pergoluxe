import {
  CollectionShowcase,
  ComparisonSection,
  ConfiguratorPreviewSection,
  FeaturedProjectsSection,
  Hero,
  InstallationJourneySection,
  SignatureBenefits,
  TestimonialsSection,
  TrustBar,
} from "@/features/home";

/**
 * Homepage — Parts 1–3 of the build (Hero through Installation Journey),
 * in HOMEPAGE_STRATEGY.md §3's exact section order. Remaining sections
 * (Guarantees & Financing, FAQ, Final CTA) land in the next milestone and
 * slot in below InstallationJourneySection. Metadata is inherited from
 * the root layout's defaults, which already carry the homepage's
 * title/description/OG set.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CollectionShowcase />
      <ConfiguratorPreviewSection />
      <SignatureBenefits />
      <FeaturedProjectsSection />
      <ComparisonSection />
      <TestimonialsSection />
      <InstallationJourneySection />
    </>
  );
}
