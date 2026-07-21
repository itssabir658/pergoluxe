import type {
  Accessory,
  ConfigStep,
  PreviewSelection,
} from "@/features/configurator/types";

/**
 * PLACEHOLDER PRICING — every number below is a stand-in pending real
 * Shopify variant pricing, flagged per the same rule as config/trust.ts:
 * plausible for layout and interaction design, never shipped to production
 * as real prices. The UI labels the total as an estimate confirmed at
 * consultation, so even the placeholder never presents itself as a quote.
 *
 * Option ids intentionally use the taxonomy from config/collections.ts
 * (attached/freestanding, louvered) rather than invented model names — the
 * preview demonstrates real product structure, not fictional SKUs.
 */
export const BASE_PRICE = 11900;

export const configSteps: ConfigStep[] = [
  {
    id: "model",
    label: "Model",
    options: [
      { id: "attached", label: "Attached", priceDelta: 0 },
      { id: "freestanding", label: "Freestanding", priceDelta: 1400 },
    ],
  },
  {
    id: "size",
    label: "Size",
    options: [
      { id: "10x10", label: "10′ × 10′", priceDelta: 0 },
      { id: "10x13", label: "10′ × 13′", priceDelta: 1600 },
      { id: "13x16", label: "13′ × 16′", priceDelta: 3400 },
    ],
  },
  {
    id: "finish",
    label: "Colour",
    options: [
      {
        id: "graphite",
        label: "Graphite Black",
        priceDelta: 0,
        swatchClass: "bg-[#33363a]",
        image: "/images/configurator-graphite.jpg",
      },
      {
        id: "bronze",
        label: "Anodized Bronze",
        priceDelta: 350,
        swatchClass: "bg-[#4a3324]",
        image: "/images/configurator-bronze.jpg",
      },
      {
        id: "alpine",
        label: "Alpine White",
        priceDelta: 350,
        swatchClass: "bg-[#e9e7e2]",
        image: "/images/configurator-alpine.jpg",
      },
    ],
  },
  {
    id: "roof",
    label: "Roof type",
    options: [
      { id: "louvered-motorized", label: "Motorized louvered", priceDelta: 4200 },
      { id: "fixed-panel", label: "Fixed panel", priceDelta: 0 },
    ],
  },
];

export const accessories: Accessory[] = [
  { id: "led-lighting", label: "Perimeter LED lighting", priceDelta: 1150 },
  { id: "retractable-screens", label: "Retractable screens", priceDelta: 2400 },
  { id: "infrared-heating", label: "Infrared heating", priceDelta: 1800 },
];

export const defaultSelection: PreviewSelection = {
  model: "attached",
  size: "10x13",
  finish: "graphite",
  roof: "louvered-motorized",
  accessories: [],
};

/** Lead-time placeholder keyed by roof type — motorized systems carry the
 * longer manufacturing window. */
export const leadTimeByRoof: Record<string, string> = {
  "louvered-motorized": "8–10 weeks",
  "fixed-panel": "6–8 weeks",
};
