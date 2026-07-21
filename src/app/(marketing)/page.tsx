import {
  CollectionShowcase,
  ComparisonSection,
  ConfiguratorPreviewSection,
  FAQSection,
  FeaturedProjectsSection,
  FinalCTASection,
  Hero,
  InstallationJourneySection,
  NewsletterSection,
  SignatureBenefits,
  SuppressFooterNewsletter,
  TestimonialsSection,
  TrustBar,
} from "@/features/home";

/**
 * Homepage — complete through Part 4. Section order follows
 * HOMEPAGE_STRATEGY.md §3, with "Guarantees & Financing" intentionally
 * folded into the FAQ's Warranty/Financing questions rather than shipped
 * as its own section, per Part 4's brief. Metadata is inherited from the
 * root layout's defaults, which already carry the homepage's
 * title/description/OG set; FAQ schema is emitted by `FAQSection` itself.
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
      <FAQSection />
      <FinalCTASection />
      <NewsletterSection />
      <SuppressFooterNewsletter />
    </>
  );
}
