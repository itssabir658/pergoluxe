"use client";

import { useMemo, useState } from "react";
import { PackageSearch } from "lucide-react";

import { useLocalStorage } from "@/hooks";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { useCollectionFilters } from "@/features/collection/hooks/useCollectionFilters";
import { filterProducts } from "@/features/collection/utils/filterProducts";
import { sortProducts } from "@/features/collection/utils/sortProducts";
import { deriveFacets } from "@/features/collection/utils/deriveFacets";
import { FilterSortBar } from "@/features/collection/components/FilterSortBar";
import { ProductCard } from "@/features/collection/components/ProductCard";
import { ProductCardSkeleton } from "@/features/collection/components/ProductCardSkeleton";
import { CompareBar } from "@/features/collection/components/CompareBar";
import type { CollectionProduct } from "@/features/collection/types";

const MAX_COMPARE = 3;
const WISHLIST_KEY = "pergoluxe:wishlist";

/**
 * Owns every piece of state the brief's filter/sort/compare/wishlist
 * requirements need — filter+sort in the URL (`useCollectionFilters`),
 * compare selection and wishlist as local UI state (wishlist persisted via
 * `useLocalStorage`, a real client-side wishlist rather than a decorative
 * heart icon, honest about what it actually does: nothing syncs to an
 * account yet, since there's no customer auth in this milestone's scope).
 *
 * Filtering/sorting is a pure client-side function over the full
 * `products` array today — the exact seam a live Shopify `productFilters`
 * query replaces (COMMERCE_ARCHITECTURE.md §9); `isPending` from
 * `useCollectionFilters`'s `useTransition` is genuinely async already, so
 * swapping the data source later doesn't change this component's loading
 * behavior, only where `visible` comes from.
 */
export function ProductGrid({ products }: { products: CollectionProduct[] }) {
  const {
    filters,
    sort,
    isPending,
    activeCount,
    toggleArrayValue,
    setMotorized,
    setPriceRange,
    setWindRatingMin,
    setSnowLoadMin,
    setSort,
    clearAll,
  } = useCollectionFilters();

  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [wishlist, setWishlist] = useLocalStorage<string[]>(WISHLIST_KEY, []);

  const facets = useMemo(() => deriveFacets(products), [products]);
  const visible = useMemo(
    () => sortProducts(filterProducts(products, filters), sort),
    [products, filters, sort],
  );

  function toggleCompare(id: string) {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((v) => v !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  }

  function toggleWishlist(id: string) {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  }

  return (
    <div>
      <FilterSortBar
        products={products}
        facets={facets}
        filters={filters}
        sort={sort}
        activeCount={activeCount}
        resultCount={visible.length}
        onToggleArrayValue={toggleArrayValue}
        onSetMotorized={setMotorized}
        onSetPriceRange={setPriceRange}
        onSetWindRatingMin={setWindRatingMin}
        onSetSnowLoadMin={setSnowLoadMin}
        onSetSort={setSort}
        onClearAll={clearAll}
      />

      <p aria-live="polite" className="sr-only">
        {isPending ? "Updating results…" : `${visible.length} products shown`}
      </p>

      <div className="py-10">
        {isPending ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <EmptyState
            icon={<PackageSearch />}
            title="No products match those filters"
            description="Try removing a filter or two — or clear everything and start again."
            action={
              <Button variant="outline" onClick={clearAll}>
                Clear all filters
              </Button>
            }
          />
        ) : (
          <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {visible.map((product) => (
              <li key={product.id}>
                <ProductCard
                  product={product}
                  comparing={compareIds.includes(product.id)}
                  onToggleCompare={toggleCompare}
                  wishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={toggleWishlist}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <CompareBar
        selectedIds={compareIds}
        products={products}
        onRemove={toggleCompare}
        onClear={() => setCompareIds([])}
      />
    </div>
  );
}
