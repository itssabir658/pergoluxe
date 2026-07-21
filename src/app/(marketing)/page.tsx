import {
  CollectionShowcase,
  ConfiguratorPreviewSection,
  FeaturedProjectsSection,
  Hero,
  SignatureBenefits,
  TrustBar,
} from "@/features/home";

/**
 * Homepage — Parts 1 & 2 of the build (Hero through Featured Projects),
 * in HOMEPAGE_STRATEGY.md §3's exact section order. Remaining sections
 * (Comparison onward) land in the next milestone and slot in below
 * FeaturedProjectsSection. Metadata is inherited from the root layout's
 * defaults, which already carry the homepage's title/description/OG set.
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
    </>
  );
}
