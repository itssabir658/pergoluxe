"use client";

import { FooterNewsletter } from "@/components/layout/footer/FooterNewsletter";
import { useFooterNewsletterHidden } from "@/providers/footer-newsletter-provider";

/**
 * The only part of the footer's newsletter block that needs to be a client
 * island — reading `useFooterNewsletterHidden()` so routes with their own
 * dedicated newsletter section (the homepage) don't also get the footer's
 * copy of the same form immediately above it. `Footer` itself stays a pure
 * Server Component; this is strictly smaller than making the whole footer
 * a client boundary just to read one piece of context.
 */
export function FooterNewsletterSlot() {
  const hidden = useFooterNewsletterHidden();
  if (hidden) return null;

  return (
    <>
      <p className="text-label text-muted-foreground">Stay in the loop</p>
      <FooterNewsletter />
    </>
  );
}
