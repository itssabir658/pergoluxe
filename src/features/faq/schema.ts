import type { FAQItem } from "@/features/faq/types";

/**
 * Route-specific structured data lives with the feature that emits it
 * (HOMEPAGE_STRATEGY.md §9), not in the site-wide config/seo.ts — Organization
 * and WebSite are the only schema that belongs at the root layout level.
 * This must only ever be rendered alongside the real, visible FAQ content
 * it describes — schema describing content that isn't on the page risks a
 * manual structured-data action, per Google's guidelines.
 */
export function faqJsonLd(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
