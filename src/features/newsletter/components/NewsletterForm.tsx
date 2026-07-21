"use client";

import { useActionState } from "react";
import Link from "next/link";

import { cn } from "@/utils/cn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import {
  subscribeNewsletter,
  type SubscribeNewsletterState,
} from "@/actions/subscribeNewsletter";
import type { NewsletterCopy } from "@/features/newsletter/types";

const initialState: SubscribeNewsletterState = { status: "idle" };

/**
 * The homepage's premium, explanatory signup — `FooterNewsletter` (every
 * page's compact utility bar) and this both call the same
 * `subscribeNewsletter` server action, so validation and the future ESP
 * integration exist in exactly one place; only the presentation differs
 * between "always-available footer utility" and "one deliberate, larger
 * capture moment before the footer."
 */
export function NewsletterForm({ copy }: { copy: NewsletterCopy }) {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, initialState);

  return (
    <form action={formAction} className="mx-auto flex w-full max-w-md flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
        <div className="flex-1">
          <Label htmlFor="homepage-newsletter-email" className="sr-only">
            Email address
          </Label>
          <Input
            id="homepage-newsletter-email"
            name="email"
            type="email"
            required
            placeholder={copy.placeholder}
            aria-describedby="homepage-newsletter-status"
          />
        </div>
        <Button type="submit" disabled={pending} className="sm:shrink-0">
          {pending ? "Subscribing…" : copy.ctaLabel}
        </Button>
      </div>

      <p
        id="homepage-newsletter-status"
        role="status"
        aria-live="polite"
        className={cn(
          "text-caption",
          state.status === "error" ? "text-destructive" : "text-success",
          state.status === "idle" && "sr-only",
        )}
      >
        {state.message}
      </p>

      <p className="text-caption text-muted-foreground">
        {copy.privacyText} By subscribing, you agree to our{" "}
        <Link
          href={ROUTES.privacy}
          className="text-foreground underline underline-offset-2"
        >
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
