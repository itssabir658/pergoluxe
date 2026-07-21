/**
 * The PLP's product-card shape is deliberately lighter and more general
 * than `features/product`'s `PergolaModel` (which exists for the full
 * spec-by-spec comparison table). A collection page shows many kinds of
 * sellable things — pergola models, accessories, future furniture — most
 * of which don't have a wind rating or a roof type. `keySpecs` is an
 * open list precisely so an accessory card and a pergola card can both
 * satisfy this same type without empty/fake fields either way.
 *
 * `pergolaModelId`, when present, is the bridge back to `features/product`'s
 * `pergolaModels` — it's what lets "Quick Compare" reuse the *same*
 * `ComparisonTable` the homepage already ships, instead of a second
 * comparison implementation with its own spec data to keep in sync.
 */
export type Availability = "in-stock" | "made-to-order" | "backordered";

export type ProductSpecHighlight = {
  label: string;
  value: string;
};

export type CollectionProduct = {
  id: string;
  handle: string;
  name: string;
  /** Every collection (by handle, matching `config/collections.ts`) this
   * product should appear in — a product can belong to more than one. */
  collectionHandles: string[];
  /** Facet values. Optional throughout: an accessory has none of these,
   * a pergola model has most of them. Facets are derived from whichever
   * products are actually present (`utils/deriveFacets.ts`), never from a
   * hardcoded list — a facet with zero matching products never renders. */
  model?: string;
  roofType?: string;
  size?: string;
  colour?: string;
  motorized?: boolean;
  windRatingMph?: number;
  snowLoadPsf?: number;
  startingPrice: number;
  compareAtPrice?: number;
  financeAvailable?: boolean;
  warrantyYears?: number;
  availability: Availability;
  leadTimeWeeks?: [number, number];
  image: { src: string; alt: string };
  hoverImage?: { src: string; alt: string };
  keySpecs: ProductSpecHighlight[];
  /** Present only for products with a full `PergolaModel` record — gates
   * whether "Quick Compare" is offered on this card at all. */
  pergolaModelId?: string;
  /** Reserved PDP link — the route doesn't exist yet (out of scope this
   * milestone), but the card's CTA target is already correct the moment
   * it does, per ROUTES.product(handle). */
  href: string;
};

export type SortOption =
  "featured" | "newest" | "price-asc" | "price-desc" | "best-selling" | "most-popular";

export type CollectionFilterState = {
  model: string[];
  size: string[];
  colour: string[];
  roofType: string[];
  motorized: boolean | null;
  /** Plain `string[]`, not `Availability[]` — a filter *selection* doesn't
   * need the product-side union's strictness; worst case an invalid value
   * simply matches nothing in `filterProducts`. */
  availability: string[];
  priceMin: number | null;
  priceMax: number | null;
  windRatingMin: number | null;
  snowLoadMin: number | null;
};

export const EMPTY_FILTER_STATE: CollectionFilterState = {
  model: [],
  size: [],
  colour: [],
  roofType: [],
  motorized: null,
  availability: [],
  priceMin: null,
  priceMax: null,
  windRatingMin: null,
  snowLoadMin: null,
};

/** One facet's available values, derived from the current product set —
 * never a static list, so a value with zero matches never renders
 * (HOMEPAGE_STRATEGY.md's search-facet precedent, applied here). */
export type FacetOption = {
  value: string;
  label: string;
  count: number;
};

export type CollectionFacets = {
  model: FacetOption[];
  size: FacetOption[];
  colour: FacetOption[];
  roofType: FacetOption[];
  motorizedCount: number;
  manualCount: number;
  availability: FacetOption[];
  priceRange: { min: number; max: number };
};

export type CollectionStat = {
  value: string;
  label: string;
};

/** CMS-ready hero/intro/SEO copy for one collection. Every field here is
 * exactly what a future Sanity `collectionPage` document would supply —
 * see COLLECTION.md's Sanity integration plan for the schema this maps to. */
export type CollectionContent = {
  handle: string;
  heroImage: { src: string; alt: string };
  heroEyebrow: string;
  heroTitle: string;
  heroSupportingCopy: string;
  heroPrimaryCta: { label: string; href: string };
  heroStats?: CollectionStat[];
  introHeading: string;
  introBody: string;
  seoHeading: string;
  seoOverview: string;
  seoFaqs: { id: string; question: string; answer: string }[];
  seoInternalLinks: { label: string; href: string }[];
  buyingGuide: {
    heading: string;
    body: string;
    cta: { label: string; href: string };
    image: { src: string; alt: string };
  };
};
