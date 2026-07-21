import { ROUTES } from "@/constants/routes";
import type { PergolaModel, SpecRow } from "@/features/product/types";

/**
 * PLACEHOLDER SPECIFICATIONS & PRICING — engineering figures (wind, snow
 * load), lead/installation times, finish counts, and starting prices below
 * are stand-ins pending real spec sheets and Shopify pricing, per the same
 * rule as config/trust.ts: plausible for layout and comparison design,
 * never shipped to production unverified. Starting prices intentionally
 * match the configurator's pricing model (constants.ts base + deltas) so
 * the two sections can't quote different numbers for the same build.
 *
 * Model ids double as future Shopify product handles; names are the real
 * taxonomy (mount × roof), not invented SKU names — consistent with the
 * configurator and collections.
 */
export const specRows: SpecRow[] = [
  { id: "roofType", label: "Roof type" },
  { id: "motorized", label: "Motorized" },
  { id: "windResistance", label: "Wind resistance" },
  { id: "snowLoad", label: "Snow load" },
  { id: "hiddenDrainage", label: "Hidden drainage" },
  { id: "ledLighting", label: "LED lighting" },
  { id: "screens", label: "Retractable screens" },
  { id: "installationTime", label: "Installation time" },
  { id: "warranty", label: "Warranty" },
  { id: "customSizes", label: "Custom sizes" },
  { id: "colourOptions", label: "Colour options" },
];

export const pergolaModels: PergolaModel[] = [
  {
    id: "fixed-panel",
    name: "Fixed Panel",
    description: "Permanent all-weather cover with the cleanest roofline.",
    idealFor: "Ideal for set-and-forget shade and rain protection",
    startingPrice: 11900,
    image: {
      src: "/images/collection-attached-pergolas.jpg",
      alt: "Fixed panel pergola model",
    },
    ctaHref: ROUTES.configurator,
    specs: {
      roofType: "Fixed aluminum panels",
      motorized: false,
      windResistance: "Up to 120 mph",
      snowLoad: "40 psf",
      hiddenDrainage: true,
      ledLighting: "optional",
      screens: "optional",
      installationTime: "1 day",
      warranty: "10-year structure & finish",
      customSizes: true,
      colourOptions: "3 standard finishes",
    },
  },
  {
    id: "attached-louvered",
    name: "Attached Louvered",
    description: "Our flagship — motorized louvers mounted to your home.",
    idealFor: "Ideal for extending kitchens and living rooms outdoors",
    startingPrice: 16100,
    image: {
      src: "/images/collection-louvered-roofs.jpg",
      alt: "Attached louvered pergola model",
    },
    ctaHref: ROUTES.configurator,
    specs: {
      roofType: "Motorized louvers",
      motorized: true,
      windResistance: "Up to 110 mph",
      snowLoad: "35 psf, louvers closed",
      hiddenDrainage: true,
      ledLighting: "optional",
      screens: "optional",
      installationTime: "1–2 days",
      warranty: "10-year structure & finish",
      customSizes: true,
      colourOptions: "3 standard finishes",
    },
  },
  {
    id: "freestanding-louvered",
    name: "Freestanding Louvered",
    description: "The full louvered system, anywhere on your property.",
    idealFor: "Ideal for poolside, gardens, and standalone lounges",
    startingPrice: 17500,
    image: {
      src: "/images/collection-freestanding-pergolas.jpg",
      alt: "Freestanding louvered pergola model",
    },
    ctaHref: ROUTES.configurator,
    specs: {
      roofType: "Motorized louvers",
      motorized: true,
      windResistance: "Up to 110 mph",
      snowLoad: "35 psf, louvers closed",
      hiddenDrainage: true,
      ledLighting: "optional",
      screens: "optional",
      installationTime: "2 days",
      warranty: "10-year structure & finish",
      customSizes: true,
      colourOptions: "3 standard finishes",
    },
  },
];
