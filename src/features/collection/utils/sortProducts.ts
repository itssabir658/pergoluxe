import type { CollectionProduct, SortOption } from "@/features/collection/types";

/**
 * "Newest," "Best Selling," and "Most Popular" have no honest client-side
 * signal to sort by yet — there's no creation date, no sales history, no
 * view count in placeholder data, and inventing one would fail the same
 * honesty-of-placeholder bar every other placeholder in this codebase is
 * held to. Each falls back to catalogue order (the same as "Featured")
 * until Shopify supplies the real `createdAt`/`bestSelling` sort keys
 * (COMMERCE_ARCHITECTURE.md §9) — a visible no-op is correct here, not a
 * fabricated ranking.
 */
export function sortProducts(
  products: CollectionProduct[],
  sort: SortOption,
): CollectionProduct[] {
  switch (sort) {
    case "price-asc":
      return [...products].sort((a, b) => a.startingPrice - b.startingPrice);
    case "price-desc":
      return [...products].sort((a, b) => b.startingPrice - a.startingPrice);
    case "featured":
    case "newest":
    case "best-selling":
    case "most-popular":
      return products;
  }
}
