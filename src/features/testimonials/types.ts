export type Testimonial = {
  id: string;
  /** First name + last initial only — placeholder entries must not read
   * as identifiable real people. */
  name: string;
  location: string;
  /** 1–5, halves not supported. */
  rating: number;
  quote: string;
  /** Display name of the installed system, from the model taxonomy. */
  installedModel: string;
  /** Optional real-installation photo shown alongside the quote. */
  projectImage?: {
    src: string;
    alt: string;
  };
};

export type AggregateRating = {
  rating: number;
  /** Display string, e.g. "1,200+". */
  countLabel: string;
};
