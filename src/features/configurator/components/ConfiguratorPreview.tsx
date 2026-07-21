"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { ArrowRight, Check } from "lucide-react";

import { cn } from "@/utils/cn";
import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import {
  accessories,
  configSteps,
  defaultSelection,
  leadTimeByRoof,
} from "@/features/configurator/constants";
import type { ConfigStep, PreviewSelection } from "@/features/configurator/types";
import { calculatePreviewPrice } from "@/features/configurator/utils/pricing";
import { formatPrice } from "@/utils/formatPrice";

const finishStep = configSteps.find((step) => step.id === "finish");
const finishOptions = finishStep?.options ?? [];

const chipClass = cn(
  "text-caption flex h-10 items-center rounded-md border border-input px-4 font-medium transition-colors duration-fast ease-standard",
  "hover:border-primary/50",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
  "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
);

/**
 * The configurator teaser — a real, working slice of the configuration
 * model (selection state → price, lead time, and finish preview), not a
 * mocked screenshot. Radix RadioGroup carries the choose-one semantics
 * (arrow-key navigation, one tab stop per group); accessories are
 * independent `aria-pressed` toggles. The finish crossfade is a CSS
 * opacity transition across pre-rendered layers — instant response, no
 * JS animation, collapses natively under reduced motion.
 *
 * Shopify-ready by construction: option ids map to future variant option
 * values, and `calculatePreviewPrice` is the single seam live variant
 * pricing replaces (see features/configurator/constants.ts).
 */
export function ConfiguratorPreview() {
  const [selection, setSelection] = useState<PreviewSelection>(defaultSelection);

  const price = calculatePreviewPrice(selection);
  const leadTime = leadTimeByRoof[selection.roof] ?? "6–10 weeks";
  const activeFinish =
    finishOptions.find((option) => option.id === selection.finish) ?? finishOptions[0];

  function selectStepOption(stepId: ConfigStep["id"], optionId: string) {
    setSelection((prev) => ({ ...prev, [stepId]: optionId }));
  }

  function toggleAccessory(accessoryId: string) {
    setSelection((prev) => ({
      ...prev,
      accessories: prev.accessories.includes(accessoryId)
        ? prev.accessories.filter((id) => id !== accessoryId)
        : [...prev.accessories, accessoryId],
    }));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
      {/* Finish preview — all layers stay mounted; the active one fades in.
          Non-active layers are lazy-loaded and cheap (sub-25KB each). */}
      <div className="border-border relative aspect-[4/3] self-start overflow-hidden rounded-xl border lg:sticky lg:top-28">
        {finishOptions.map((option, index) => (
          <Image
            key={option.id}
            src={option.image ?? ""}
            alt={index === 0 ? "Configurator finish preview" : ""}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            priority={false}
            className={cn(
              "duration-slow ease-standard object-cover transition-opacity",
              option.id === activeFinish?.id ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        <p className="text-caption absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-white">
          {activeFinish?.label}
        </p>
      </div>

      <div className="flex flex-col gap-7">
        {configSteps.map((step, index) => (
          <fieldset key={step.id}>
            <legend className="text-label text-muted-foreground mb-3">
              <span className="text-primary">{index + 1}.</span> {step.label}
            </legend>
            <RadioGroupPrimitive.Root
              value={selection[step.id]}
              onValueChange={(value) => selectStepOption(step.id, value)}
              aria-label={step.label}
              className="flex flex-wrap gap-2"
            >
              {step.options.map((option) =>
                step.id === "finish" ? (
                  <RadioGroupPrimitive.Item
                    key={option.id}
                    value={option.id}
                    aria-label={option.label}
                    className={cn(
                      "border-border duration-fast ease-standard flex size-11 items-center justify-center rounded-full border-2 transition-colors",
                      "hover:border-primary/50",
                      "focus-visible:ring-ring/50 focus-visible:ring-2 focus-visible:outline-none",
                      "data-[state=checked]:border-primary",
                      option.swatchClass,
                    )}
                  >
                    <RadioGroupPrimitive.Indicator>
                      <Check
                        className={cn(
                          "size-4",
                          option.id === "alpine" ? "text-foreground" : "text-white",
                        )}
                        aria-hidden="true"
                      />
                    </RadioGroupPrimitive.Indicator>
                  </RadioGroupPrimitive.Item>
                ) : (
                  <RadioGroupPrimitive.Item
                    key={option.id}
                    value={option.id}
                    className={chipClass}
                  >
                    {option.label}
                  </RadioGroupPrimitive.Item>
                ),
              )}
            </RadioGroupPrimitive.Root>
          </fieldset>
        ))}

        <fieldset>
          <legend className="text-label text-muted-foreground mb-3">
            <span className="text-primary">{configSteps.length + 1}.</span> Accessories
            <span className="text-muted-foreground/70 ml-1 normal-case">(optional)</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {accessories.map((accessory) => {
              const active = selection.accessories.includes(accessory.id);
              return (
                <button
                  key={accessory.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleAccessory(accessory.id)}
                  className={cn(
                    chipClass,
                    active && "border-primary bg-primary text-primary-foreground",
                  )}
                >
                  {active && <Check className="mr-1.5 size-3.5" aria-hidden="true" />}
                  {accessory.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="border-border bg-surface rounded-xl border p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div aria-live="polite">
              <p className="text-label text-muted-foreground">Estimated total</p>
              <p className="text-h2 text-foreground mt-1 tabular-nums">
                {formatPrice(price)}
              </p>
              <p className="text-caption text-muted-foreground mt-1">
                Installed · Est. lead time {leadTime}
              </p>
            </div>
            <Link
              href={ROUTES.configurator}
              className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group")}
            >
              Design Your Pergola
              <ArrowRight
                className="duration-fast ease-standard transition-transform motion-safe:group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
          <p className="text-caption border-border text-muted-foreground mt-4 border-t pt-4">
            Estimates cover the configuration shown. Final pricing is confirmed during
            your free design consultation.
          </p>
        </div>
      </div>
    </div>
  );
}
