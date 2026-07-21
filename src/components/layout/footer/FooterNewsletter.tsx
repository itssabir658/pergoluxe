"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  subscribeNewsletter,
  type SubscribeNewsletterState,
} from "@/actions/subscribeNewsletter";

const initialState: SubscribeNewsletterState = { status: "idle" };

/**
 * Plain `useActionState` rather than React Hook Form: a single required
 * `email` field doesn't need RHF's field-array/multi-field machinery, and
 * the native `type="email" required` already gives instant client
 * feedback — pulling in a form library here would be exactly the kind of
 * unnecessary abstraction ARCHITECTURE.md §9 warns against. RHF is still
 * the right tool for the multi-field configurator/contact forms elsewhere.
 */
export function FooterNewsletter() {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <label htmlFor="footer-newsletter-email" className="sr-only">
          Email address
        </label>
        <Input
          id="footer-newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          aria-describedby="footer-newsletter-status"
          className="bg-background"
        />
        <Button type="submit" size="icon" disabled={pending} aria-label="Subscribe">
          <Send />
        </Button>
      </div>
      <p
        id="footer-newsletter-status"
        role="status"
        aria-live="polite"
        className={
          state.status === "error"
            ? "text-caption text-destructive"
            : "text-caption text-muted-foreground"
        }
      >
        {state.message ?? "Product news and design ideas, a few times a year. No spam."}
      </p>
    </form>
  );
}
