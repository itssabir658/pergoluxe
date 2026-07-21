"use client";

import { useHideFooterNewsletter } from "@/providers/footer-newsletter-provider";

/**
 * Renders nothing — exists solely to call `useHideFooterNewsletter()` from
 * a Server Component page (`page.tsx`) that can't call a hook itself. The
 * homepage already has its own full `NewsletterSection`; without this, the
 * footer's identical one-line signup would render directly beneath it.
 */
export function SuppressFooterNewsletter() {
  useHideFooterNewsletter();
  return null;
}
