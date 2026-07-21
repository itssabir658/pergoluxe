export { products, collectionContent, sortOptions } from "./constants";
export { filterProducts } from "./utils/filterProducts";
export { sortProducts } from "./utils/sortProducts";
export { deriveFacets, deriveThresholdOptions } from "./utils/deriveFacets";
export { useCollectionFilters } from "./hooks/useCollectionFilters";

export { CollectionHero } from "./components/CollectionHero";
export { CollectionIntro } from "./components/CollectionIntro";
export { FilterSortBar } from "./components/FilterSortBar";
export { ProductGrid } from "./components/ProductGrid";
export { ProductCard } from "./components/ProductCard";
export { ProductCardSkeleton } from "./components/ProductCardSkeleton";
export { CompareBar } from "./components/CompareBar";
export { CompareEntryPoint } from "./components/CompareEntryPoint";
export { BuyingGuideCTA } from "./components/BuyingGuideCTA";
export { SeoContentBlock } from "./components/SeoContentBlock";
export { RecentlyViewed, useRecordProductView } from "./components/RecentlyViewed";

export type {
  Availability,
  ProductSpecHighlight,
  CollectionProduct,
  SortOption,
  CollectionFilterState,
  FacetOption,
  CollectionFacets,
  CollectionStat,
  CollectionContent,
} from "./types";
export { EMPTY_FILTER_STATE } from "./types";
