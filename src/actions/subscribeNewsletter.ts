"use server";

import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
});

export type SubscribeNewsletterState = {
  status: "idle" | "success" | "error";
  message?: string;
};

/**
 * No `features/*` owns this (per ARCHITECTURE.md's `actions/` rationale:
 * "generic contact form used site-wide"). Validation is real and enforced
 * server-side regardless of what the client already checked — the only
 * thing deferred is the actual ESP call: there's no Resend audience wired
 * up yet, so this validates and returns success without sending anything.
 * Replace the body of the `try` block with a real Resend/audience-API call
 * when that's ready; the form contract (`SubscribeNewsletterState`) doesn't
 * need to change.
 */
export async function subscribeNewsletter(
  _prevState: SubscribeNewsletterState,
  formData: FormData,
): Promise<SubscribeNewsletterState> {
  const result = newsletterSchema.safeParse({ email: formData.get("email") });

  if (!result.success) {
    return {
      status: "error",
      message: result.error.issues[0]?.message ?? "Enter a valid email address.",
    };
  }

  // TODO(resend): call Resend's audience/contact API with result.data.email
  // once an audience is provisioned. Intentionally not calling an
  // unconfigured API — see ARCHITECTURE.md's stance on typed lib/ boundaries.

  return {
    status: "success",
    message: "You're subscribed — check your inbox to confirm.",
  };
}
