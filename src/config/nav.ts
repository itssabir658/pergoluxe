import { ROUTES } from "@/constants/routes";
import { collections } from "@/config/collections";

export type NavLink = {
  label: string;
  href: string;
};

export type MegaMenuCategory = {
  title: string;
  href: string;
  description: string;
  keyFeature: string;
};

export type MegaMenuContent = {
  categories: MegaMenuCategory[];
  featured: {
    title: string;
    description: string;
    href: string;
    ctaLabel: string;
  };
  supportLinks: NavLink[];
  buyingGuides: NavLink[];
};

export type PrimaryNavItem = {
  label: string;
  href: string;
  megaMenu?: MegaMenuContent;
};

/**
 * The mega menu's product categories derive from `config/collections.ts`
 * (the single source of truth for the collection taxonomy, shared with the
 * homepage Collections section) so nav and homepage can never drift apart.
 * Imagery is intentionally a styled placeholder (see MegaMenu.tsx) until
 * real product photography is wired through Cloudinary/Shopify.
 */
const productsMegaMenu: MegaMenuContent = {
  categories: collections.map(({ title, href, description, keyFeature }) => ({
    title,
    href,
    description,
    keyFeature,
  })),
  featured: {
    title: "The Meridian Collection",
    description:
      "Our flagship motorized louvered system, engineered for four-season use.",
    href: ROUTES.collection("meridian"),
    ctaLabel: "Explore the collection",
  },
  supportLinks: [
    { label: "Warranty coverage", href: ROUTES.warranty },
    { label: "Installation process", href: ROUTES.support },
    { label: "Talk to a specialist", href: ROUTES.contact },
  ],
  buyingGuides: [
    { label: "Choosing a roof system", href: `${ROUTES.buyingGuides}/roof-systems` },
    {
      label: "Attached vs. freestanding",
      href: `${ROUTES.buyingGuides}/attached-vs-freestanding`,
    },
    { label: "Sizing your space", href: `${ROUTES.buyingGuides}/sizing` },
  ],
};

export const primaryNav: PrimaryNavItem[] = [
  { label: "Products", href: ROUTES.products, megaMenu: productsMegaMenu },
  { label: "Projects", href: ROUTES.projects },
  { label: "Gallery", href: ROUTES.gallery },
  { label: "Configurator", href: ROUTES.configurator },
  { label: "Resources", href: ROUTES.resources },
  { label: "About", href: ROUTES.about },
  { label: "Support", href: ROUTES.support },
  { label: "Contact", href: ROUTES.contact },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Products",
    links: [
      { label: "Attached Pergolas", href: ROUTES.collection("attached-pergolas") },
      {
        label: "Freestanding Pergolas",
        href: ROUTES.collection("freestanding-pergolas"),
      },
      { label: "Louvered Roof Systems", href: ROUTES.collection("louvered-roofs") },
      { label: "Glass & Screen Enclosures", href: ROUTES.collection("enclosures") },
      { label: "Shop all products", href: ROUTES.products },
    ],
  },
  {
    title: "Projects",
    links: [
      { label: "Featured installations", href: ROUTES.projects },
      { label: "Gallery", href: ROUTES.gallery },
      { label: "Start your project", href: ROUTES.configurator },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Buying guides", href: ROUTES.buyingGuides },
      { label: "FAQs", href: ROUTES.faq },
      { label: "Warranty", href: ROUTES.warranty },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Pergoluxe", href: ROUTES.about },
      { label: "Contact", href: ROUTES.contact },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", href: ROUTES.support },
      { label: "Track an order", href: ROUTES.orders },
      { label: "Request a consultation", href: ROUTES.quote },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy policy", href: ROUTES.privacy },
  { label: "Terms of service", href: ROUTES.terms },
  { label: "Cookie policy", href: ROUTES.cookies },
];
