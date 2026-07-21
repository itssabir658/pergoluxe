import { ROUTES } from "@/constants/routes";

/**
 * Single source of truth for brand-identity strings used across metadata,
 * structured data, the footer, and the header. Placeholder contact details
 * pending real business info — isolated here so filling them in later never
 * touches component code.
 */
export const siteConfig = {
  name: "Pergoluxe",
  legalName: "Pergoluxe, Inc.",
  tagline: "Engineered outdoor living, built to disappear into it.",
  description:
    "Premium aluminum pergolas, motorized louvered roofs, and outdoor living systems — designed, engineered, and installed.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pergoluxe.com",
  ogImage: "/images/og-default.jpg",
  phone: "+1 (800) 555-0142",
  phoneHref: "tel:+18005550142",
  email: "hello@pergoluxe.com",
  address: "Serving installations across the continental United States",
  social: {
    instagram: "https://instagram.com/pergoluxe",
    pinterest: "https://pinterest.com/pergoluxe",
    houzz: "https://houzz.com/pro/pergoluxe",
    linkedin: "https://linkedin.com/company/pergoluxe",
  },
  links: {
    quote: ROUTES.quote,
    login: ROUTES.login,
    cart: ROUTES.cart,
    search: ROUTES.search,
  },
} as const;
