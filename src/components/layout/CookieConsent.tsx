"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/utils/cn";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMotionVariants } from "@/animations/framer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";
import {
  COOKIE_CONSENT_VERSION,
  type CookieConsent as StoredConsent,
} from "@/utils/validation/cookieConsent";
import { COOKIE_CONSENT_KEY } from "@/utils/validation/cookieConsent";

const variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function buildConsent(analytics: boolean, marketing: boolean): StoredConsent {
  return {
    version: COOKIE_CONSENT_VERSION,
    necessary: true,
    analytics,
    marketing,
    decidedAt: new Date().toISOString(),
  };
}

/**
 * GDPR-shaped: nothing beyond strictly necessary storage/scripts runs
 * before a choice is made (this component itself only ever writes to
 * localStorage, never fires an analytics event). `readStoredConsent()` in
 * `utils/validation/cookieConsent.ts` is what a future analytics provider
 * bootstrap should gate on before initializing GA4/Meta Pixel.
 */
export function CookieConsent() {
  const [consent, setConsent] = useLocalStorage<StoredConsent | null>(
    COOKIE_CONSENT_KEY,
    null,
  );
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [analyticsDraft, setAnalyticsDraft] = useState(false);
  const [marketingDraft, setMarketingDraft] = useState(false);
  const motionVariants = useMotionVariants(variants);

  if (consent) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="region"
        aria-label="Cookie consent"
        variants={motionVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.3 }}
        className="z-modal border-border bg-popover text-popover-foreground fixed inset-x-0 bottom-0 border-t shadow-2xl"
      >
        <Container size="content" className="py-5">
          <Stack gap="md">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-body max-w-measure text-muted-foreground">
                We use cookies to run this site and, with your permission, to understand
                how it&rsquo;s used. You can change your preferences at any time.{" "}
                <a
                  href="/legal/cookies"
                  className="text-foreground font-medium underline underline-offset-2"
                >
                  Cookie policy
                </a>
              </p>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPreferencesOpen((open) => !open)}
                  aria-expanded={preferencesOpen}
                >
                  Preferences
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setConsent(buildConsent(false, false))}
                >
                  Reject non-essential
                </Button>
                <Button size="sm" onClick={() => setConsent(buildConsent(true, true))}>
                  Accept all
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {preferencesOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="border-border grid gap-4 border-t pt-4 sm:grid-cols-3">
                    <CookieCategoryRow
                      id="necessary"
                      title="Necessary"
                      description="Required for cart, checkout, and login. Always on."
                      checked
                      disabled
                    />
                    <CookieCategoryRow
                      id="analytics"
                      title="Analytics"
                      description="Helps us understand site usage so we can improve it."
                      checked={analyticsDraft}
                      onCheckedChange={setAnalyticsDraft}
                    />
                    <CookieCategoryRow
                      id="marketing"
                      title="Marketing"
                      description="Personalizes the ads you see on other sites."
                      checked={marketingDraft}
                      onCheckedChange={setMarketingDraft}
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      size="sm"
                      onClick={() =>
                        setConsent(buildConsent(analyticsDraft, marketingDraft))
                      }
                    >
                      Save preferences
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Stack>
        </Container>
      </motion.div>
    </AnimatePresence>
  );
}

type CookieCategoryRowProps = {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

function CookieCategoryRow({
  id,
  title,
  description,
  checked,
  disabled,
  onCheckedChange,
}: CookieCategoryRowProps) {
  return (
    <div className={cn("flex gap-3", disabled && "opacity-80")}>
      <Checkbox
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={(value) => onCheckedChange?.(value === true)}
        className="mt-0.5"
      />
      <div>
        <Label htmlFor={id}>{title}</Label>
        <p className="text-caption text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
  );
}
