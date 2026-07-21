import type {
  CollectionFilterState,
  CollectionProduct,
} from "@/features/collection/types";

/**
 * Pure, synchronous, client-side — the exact seam a Shopify-backed
 * collection page replaces with a `productFilters`-driven GraphQL query
 * (COMMERCE_ARCHITECTURE.md §9). `CollectionFilterState`'s shape is already
 * what those query variables would look like, so that swap changes this
 * function's body, not its callers or the state shape itself.
 */
export function filterProducts(
  products: CollectionProduct[],
  filters: CollectionFilterState,
): CollectionProduct[] {
  return products.filter((product) => {
    if (
      filters.model.length > 0 &&
      (!product.model || !filters.model.includes(product.model))
    ) {
      return false;
    }
    if (
      filters.size.length > 0 &&
      (!product.size || !filters.size.includes(product.size))
    ) {
      return false;
    }
    if (
      filters.colour.length > 0 &&
      (!product.colour || !filters.colour.includes(product.colour))
    ) {
      return false;
    }
    if (
      filters.roofType.length > 0 &&
      (!product.roofType || !filters.roofType.includes(product.roofType))
    ) {
      return false;
    }
    if (filters.motorized !== null && product.motorized !== filters.motorized) {
      return false;
    }
    if (
      filters.availability.length > 0 &&
      !filters.availability.includes(product.availability)
    ) {
      return false;
    }
    if (filters.priceMin !== null && product.startingPrice < filters.priceMin) {
      return false;
    }
    if (filters.priceMax !== null && product.startingPrice > filters.priceMax) {
      return false;
    }
    if (
      filters.windRatingMin !== null &&
      (product.windRatingMph ?? 0) < filters.windRatingMin
    ) {
      return false;
    }
    if (
      filters.snowLoadMin !== null &&
      (product.snowLoadPsf ?? 0) < filters.snowLoadMin
    ) {
      return false;
    }
    return true;
  });
}
