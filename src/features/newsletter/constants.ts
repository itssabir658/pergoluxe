import type { NewsletterCopy } from "@/features/newsletter/types";

/**
 * CMS-EDITABLE COPY PLACEHOLDER — marketing-owned strings pending a Sanity
 * singleton (see `NewsletterSection`'s future-CMS note); no business logic
 * or validation depends on this object's shape, only its display text.
 */
export const newsletterCopy: NewsletterCopy = {
  eyebrow: "Stay in the loop",
  heading: "Not ready to design yet?",
  description:
    "Get seasonal design ideas, new collection announcements, and the occasional offer — a few emails a year, never a flood.",
  placeholder: "you@email.com",
  ctaLabel: "Subscribe",
  privacyText: "No spam, ever. Unsubscribe anytime.",
};
