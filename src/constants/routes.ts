/**
 * Centralized internal route paths. Every `<Link>` in the app shell reads
 * from here rather than hardcoding a string — when a route's page.tsx
 * lands, nothing in the header/footer/mobile-nav changes, and re-enabling
 * `typedRoutes` (see next.config.ts) only requires the pages to exist,
 * not a rewrite of every link.
 */
export const ROUTES = {
  home: "/",
  products: "/products",
  product: (handle: string) => `/products/${handle}`,
  collections: "/collections",
  collection: (handle: string) => `/collections/${handle}`,
  projects: "/projects",
  project: (slug: string) => `/projects/${slug}`,
  gallery: "/gallery",
  configurator: "/configurator",
  resources: "/resources",
  buyingGuides: "/resources/buying-guides",
  about: "/about",
  support: "/support",
  contact: "/contact",
  quote: "/contact/quote",
  search: "/search",
  cart: "/cart",
  account: "/account",
  login: "/account/login",
  orders: "/account/orders",
  wishlist: "/wishlist",
  faq: "/support/faq",
  warranty: "/support/warranty",
  privacy: "/legal/privacy",
  terms: "/legal/terms",
  cookies: "/legal/cookies",
} as const;
