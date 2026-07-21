/**
 * Option ids double as future Shopify variant option values — when the
 * real configurator connects to the Storefront API, each `ConfigOption.id`
 * maps to a variant option value and `priceDelta` is replaced by live
 * variant pricing. The shapes are deliberately flat and serializable so
 * that swap is a data-source change, not a component rewrite.
 */
export type ConfigOption = {
  id: string;
  label: string;
  /** Added to the model's base price. Placeholder pending Shopify variants. */
  priceDelta: number;
  /**
   * Tailwind background class for finish swatches (e.g. "bg-[#33363a]").
   * A full literal class, not a raw colour value, so Tailwind's scanner
   * generates it and no component needs an inline `style` attribute.
   */
  swatchClass?: string;
  /** Preview image for options that change the visual (finishes). */
  image?: string;
};

export type ConfigStepId = "model" | "size" | "finish" | "roof";

export type ConfigStep = {
  id: ConfigStepId;
  label: string;
  options: ConfigOption[];
};

export type Accessory = {
  id: string;
  label: string;
  priceDelta: number;
};

export type PreviewSelection = Record<ConfigStepId, string> & {
  accessories: string[];
};
