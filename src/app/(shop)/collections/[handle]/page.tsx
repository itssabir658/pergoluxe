import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  BuyingGuideCTA,
  CollectionHero,
  CollectionIntro,
  CompareEntryPoint,
  ProductGrid,
  RecentlyViewed,
  SeoContentBlock,
  collectionContent,
  products,
} from "@/features/collection";

type CollectionPageProps = {
  params: Promise<{ handle: string }>;
};

/**
 * One template, every collection — the brief's explicit "data-driven and
 * reusable for every collection" requirement. Nothing here branches on
 * which collection it is; `handle` only ever selects *which data* renders
 * through this same structure. Adding a new collection (a new pergola
 * line, a future furniture category) is a `collectionContent`/`products`
 * data change, never a new route file or a new template.
 *
 * Static params cover today's five handles (the four in
 * `config/collections.ts` plus `accessories`, added here rather than to
 * that file since the mega menu's taxonomy is a Navigation-milestone
 * decision this milestone doesn't touch) — any other handle 404s via
 * `notFound()` rather than rendering an empty template.
 */
export function generateStaticParams() {
  return Object.keys(collectionContent).map((handle) => ({ handle }));
}

/**
 * The collection taxonomy is a known, finite, build-time set today (5
 * placeholder handles) — an unmatched handle is definitely invalid, not
 * "maybe added since the last deploy." `dynamicParams: false` makes Next.js
 * 404 those at the routing layer before this page's code ever runs, which
 * is what actually produces a real 404 status; leaving it `true` (the
 * default) rendered the correct "Page not found" UI via `notFound()` below
 * but shipped it with a 200 status — a soft 404 that undermines the SEO
 * requirements this milestone explicitly calls for. Revisit this once
 * collections come from a live Shopify query that can add one without a
 * redeploy (COMMERCE_ARCHITECTURE.md §1).
 */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  const content = collectionContent[handle];
  if (!content) return {};

  return {
    title: content.heroTitle,
    description: content.heroSupportingCopy,
    alternates: { canonical: `/collections/${handle}` },
    openGraph: {
      title: content.heroTitle,
      description: content.heroSupportingCopy,
      images: [{ url: content.heroImage.src }],
    },
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const content = collectionContent[handle];
  if (!content) notFound();

  const collectionProducts = products.filter((product) =>
    product.collectionHandles.includes(handle),
  );
  const hasComparableProducts = collectionProducts.some((p) => p.pergolaModelId);

  return (
    <>
      <CollectionHero content={content} collectionTitle={content.heroEyebrow} />
      <CollectionIntro content={content} />
      <ProductGrid products={collectionProducts} />
      <CompareEntryPoint hasComparableProducts={hasComparableProducts} />
      <BuyingGuideCTA content={content} />
      <SeoContentBlock content={content} />
      <RecentlyViewed allProducts={products} />
    </>
  );
}
