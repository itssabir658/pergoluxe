import { ROUTES } from "@/constants/routes";

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
 * Product taxonomy below is real site IA (the categories this business
 * actually sells), not sample/lorem content — it's what the mega menu
 * needs to demonstrate its layout. Imagery is intentionally a styled
 * placeholder (see MegaMenu.tsx) until real product photography is wired
 * through Cloudinary/Shopify; nothing here fabricates a product, price,
 * or spec.
 */
const productsMegaMenu: MegaMenuContent = {
  categories: [
    {
      title: "Attached Pergolas",
      href: ROUTES.collection("attached-pergolas"),
      description: "Mounts directly to your home for a seamless architectural extension.",
      keyFeature: "Engineered wind + snow load ratings",
    },
    {
      title: "Freestanding Pergolas",
      href: ROUTES.collection("freestanding-pergolas"),
      description:
        "Stands independently — ideal for poolside, patio, or open-yard installs.",
      keyFeature: "No structural attachment required",
    },
    {
      title: "Louvered Roof Systems",
      href: ROUTES.collection("louvered-roofs"),
      description: "Motorized aluminum louvers that rotate from open to fully closed.",
      keyFeature: "App + remote controlled operation",
    },
    {
      title: "Glass & Screen Enclosures",
      href: ROUTES.collection("enclosures"),
      description: "Retractable glass and screen walls that extend the season.",
      keyFeature: "Retracts fully in under 30 seconds",
    },
  ],
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
