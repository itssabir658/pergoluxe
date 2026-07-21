import type {
  CollectionFacets,
  CollectionProduct,
  FacetOption,
} from "@/features/collection/types";

function facetFrom(
  products: CollectionProduct[],
  select: (p: CollectionProduct) => string | undefined,
): FacetOption[] {
  const counts = new Map<string, number>();
  for (const product of products) {
    const value = select(product);
    if (!value) continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([value, count]) => ({ value, label: value, count }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

/**
 * Every facet is computed from whichever products are actually in the
 * current collection — never a hardcoded option list. A facet value with
 * zero matches simply doesn't appear, which is what keeps this correct as
 * the catalogue grows (an accessory with no `roofType` never contributes a
 * phantom option) and is the same principle a real Shopify
 * `productFilters` response already gives for free (COMMERCE_ARCHITECTURE.md
 * §9) — this function is the placeholder standing in for that response
 * shape until it's live.
 */
export function deriveFacets(products: CollectionProduct[]): CollectionFacets {
  const prices = products.map((p) => p.startingPrice);
  const windValues = new Map<string, number>();
  const snowValues = new Map<string, number>();
  let motorizedCount = 0;
  let manualCount = 0;

  for (const product of products) {
    if (product.motorized === true) motorizedCount += 1;
    if (product.motorized === false) manualCount += 1;
    if (product.windRatingMph !== undefined) {
      const key = `${product.windRatingMph}`;
      windValues.set(key, (windValues.get(key) ?? 0) + 1);
    }
    if (product.snowLoadPsf !== undefined) {
      const key = `${product.snowLoadPsf}`;
      snowValues.set(key, (snowValues.get(key) ?? 0) + 1);
    }
  }

  return {
    model: facetFrom(products, (p) => p.model),
    size: facetFrom(products, (p) => p.size),
    colour: facetFrom(products, (p) => p.colour),
    roofType: facetFrom(products, (p) => p.roofType),
    motorizedCount,
    manualCount,
    availability: facetFrom(products, (p) => p.availability),
    priceRange: {
      min: prices.length > 0 ? Math.min(...prices) : 0,
      max: prices.length > 0 ? Math.max(...prices) : 0,
    },
  };
}

/** Distinct wind-rating/snow-load values present, descending — rendered as
 * "120 mph+" style minimum-threshold options rather than an exact-match
 * facet, since a customer filtering by wind rating means "at least this
 * much," not "exactly this much." */
export function deriveThresholdOptions(
  products: CollectionProduct[],
  select: (p: CollectionProduct) => number | undefined,
): { value: number; label: string }[] {
  const values = new Set<number>();
  for (const product of products) {
    const value = select(product);
    if (value !== undefined) values.add(value);
  }
  return Array.from(values)
    .sort((a, b) => b - a)
    .map((value) => ({ value, label: `${value}+` }));
}
