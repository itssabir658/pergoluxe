/**
 * Static stand-in for a ranked/trending search terms feed. Once Algolia (or
 * Shopify's predictive search) is wired in `lib/shopify/queries/searchProducts.ts`,
 * this becomes the initial/fallback state shown before a query is typed —
 * the component contract (`SearchModal` renders whatever this array
 * contains) doesn't change, only where the array comes from.
 */
export const POPULAR_SEARCHES = [
  "Louvered roof",
  "Attached pergola",
  "Motorized",
  "Glass enclosure",
  "10x12",
] as const;

export const RECENT_SEARCHES_STORAGE_KEY = "pergoluxe-recent-searches";
export const MAX_RECENT_SEARCHES = 5;
