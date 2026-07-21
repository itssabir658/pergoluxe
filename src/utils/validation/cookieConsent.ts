import { z } from "zod";

/**
 * Bumping `version` invalidates every stored consent record (the parse
 * below rejects a mismatched version and CookieConsent falls back to
 * showing the banner again) — the correct way to force re-consent after a
 * material change to what the site tracks, instead of clearing localStorage
 * by hand on deploy.
 */
export const COOKIE_CONSENT_VERSION = 1;

export const cookieConsentSchema = z.object({
  version: z.literal(COOKIE_CONSENT_VERSION),
  necessary: z.literal(true),
  analytics: z.boolean(),
  marketing: z.boolean(),
  decidedAt: z.string().datetime(),
});

export type CookieConsent = z.infer<typeof cookieConsentSchema>;

export const COOKIE_CONSENT_KEY = "pergoluxe-cookie-consent";

/** Safe read for non-React code (e.g. an analytics bootstrap script) that
 * needs to check consent without importing React hooks. */
export function readStoredConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const result = cookieConsentSchema.safeParse(JSON.parse(raw));
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}
