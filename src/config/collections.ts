import { ROUTES } from "@/constants/routes";

export type Collection = {
  handle: string;
  title: string;
  description: string;
  keyFeature: string;
  href: string;
  image: {
    src: string;
    alt: string;
  };
};

/**
 * Single source of truth for the product collection taxonomy. Consumed by
 * the homepage Collections section AND by `config/nav.ts` (the mega menu
 * derives its categories from this array) so the nav and the homepage can
 * never drift out of sync. Once Shopify collections are wired, this file
 * becomes the static fallback / display-metadata layer over live handles —
 * the `handle` values here are the Shopify collection handles.
 *
 * Images are the committed abstract placeholders from
 * `scripts/generate-placeholders.mjs`, pending real photography.
 */
export const collections: Collection[] = [
  {
    handle: "attached-pergolas",
    title: "Attached Pergolas",
    description: "Mounts directly to your home for a seamless architectural extension.",
    keyFeature: "Engineered wind + snow load ratings",
    href: ROUTES.collection("attached-pergolas"),
    image: {
      src: "/images/collection-attached-pergolas.jpg",
      alt: "Attached pergola collection",
    },
  },
  {
    handle: "freestanding-pergolas",
    title: "Freestanding Pergolas",
    description:
      "Stands independently — ideal for poolside, patio, or open-yard installs.",
    keyFeature: "No structural attachment required",
    href: ROUTES.collection("freestanding-pergolas"),
    image: {
      src: "/images/collection-freestanding-pergolas.jpg",
      alt: "Freestanding pergola collection",
    },
  },
  {
    handle: "louvered-roofs",
    title: "Louvered Roof Systems",
    description: "Motorized aluminum louvers that rotate from open to fully closed.",
    keyFeature: "App + remote controlled operation",
    href: ROUTES.collection("louvered-roofs"),
    image: {
      src: "/images/collection-louvered-roofs.jpg",
      alt: "Louvered roof system collection",
    },
  },
  {
    handle: "enclosures",
    title: "Glass & Screen Enclosures",
    description: "Retractable glass and screen walls that extend the season.",
    keyFeature: "Retracts fully in under 30 seconds",
    href: ROUTES.collection("enclosures"),
    image: {
      src: "/images/collection-enclosures.jpg",
      alt: "Glass and screen enclosure collection",
    },
  },
];
