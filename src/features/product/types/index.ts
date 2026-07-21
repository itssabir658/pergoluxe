/** A spec cell: included / not included / optional add-on / free text. */
export type SpecValue = boolean | "optional" | string;

export type SpecRowId =
  | "roofType"
  | "motorized"
  | "windResistance"
  | "snowLoad"
  | "hiddenDrainage"
  | "ledLighting"
  | "screens"
  | "installationTime"
  | "warranty"
  | "customSizes"
  | "colourOptions";

export type SpecRow = {
  id: SpecRowId;
  label: string;
};

export type PergolaModel = {
  /** Stable id — becomes the Shopify product handle when wired to live data. */
  id: string;
  name: string;
  description: string;
  idealFor: string;
  /** Placeholder pending Shopify pricing; rendered as "From …". */
  startingPrice: number;
  image: {
    src: string;
    alt: string;
  };
  ctaHref: string;
  specs: Record<SpecRowId, SpecValue>;
};
