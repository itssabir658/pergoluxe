"use client";

import { X } from "lucide-react";

import { cn } from "@/utils/cn";
import { formatPrice } from "@/utils/formatPrice";
import type { CollectionFilterState } from "@/features/collection/types";

type Chip = { key: string; label: string; onRemove: () => void };

type ActiveFilterChipsProps = {
  filters: CollectionFilterState;
  onToggleArrayValue: (
    key: "model" | "size" | "colour" | "roofType" | "availability",
    value: string,
  ) => void;
  onSetMotorized: (value: boolean | null) => void;
  onSetPriceRange: (min: number | null, max: number | null) => void;
  onSetWindRatingMin: (value: number | null) => void;
  onSetSnowLoadMin: (value: number | null) => void;
  onClearAll: () => void;
};

const AVAILABILITY_LABELS: Record<string, string> = {
  "in-stock": "In Stock",
  "made-to-order": "Made to Order",
  backordered: "Backordered",
};

/**
 * One chip per active filter *value* (not per facet group) — selecting
 * both "Graphite Black" and "Alpine White" shows two removable chips, not
 * one "Colour" chip, so a customer can back out of a single selection
 * without clearing the whole group.
 */
export function ActiveFilterChips({
  filters,
  onToggleArrayValue,
  onSetMotorized,
  onSetPriceRange,
  onSetWindRatingMin,
  onSetSnowLoadMin,
  onClearAll,
}: ActiveFilterChipsProps) {
  const chips: Chip[] = [
    ...filters.model.map((value) => ({
      key: `model-${value}`,
      label: value,
      onRemove: () => onToggleArrayValue("model", value),
    })),
    ...filters.size.map((value) => ({
      key: `size-${value}`,
      label: value,
      onRemove: () => onToggleArrayValue("size", value),
    })),
    ...filters.colour.map((value) => ({
      key: `colour-${value}`,
      label: value,
      onRemove: () => onToggleArrayValue("colour", value),
    })),
    ...filters.roofType.map((value) => ({
      key: `roof-${value}`,
      label: value,
      onRemove: () => onToggleArrayValue("roofType", value),
    })),
    ...filters.availability.map((value) => ({
      key: `avail-${value}`,
      label: AVAILABILITY_LABELS[value] ?? value,
      onRemove: () => onToggleArrayValue("availability", value),
    })),
    ...(filters.motorized !== null
      ? [
          {
            key: "motorized",
            label: filters.motorized ? "Motorised" : "Manual",
            onRemove: () => onSetMotorized(null),
          },
        ]
      : []),
    ...(filters.priceMin !== null || filters.priceMax !== null
      ? [
          {
            key: "price",
            label:
              filters.priceMin !== null && filters.priceMax !== null
                ? `${formatPrice(filters.priceMin)}–${formatPrice(filters.priceMax)}`
                : filters.priceMin !== null
                  ? `From ${formatPrice(filters.priceMin)}`
                  : `Up to ${formatPrice(filters.priceMax!)}`,
            onRemove: () => onSetPriceRange(null, null),
          },
        ]
      : []),
    ...(filters.windRatingMin !== null
      ? [
          {
            key: "wind",
            label: `${filters.windRatingMin}+ mph`,
            onRemove: () => onSetWindRatingMin(null),
          },
        ]
      : []),
    ...(filters.snowLoadMin !== null
      ? [
          {
            key: "snow",
            label: `${filters.snowLoadMin}+ psf`,
            onRemove: () => onSetSnowLoadMin(null),
          },
        ]
      : []),
  ];

  if (chips.length === 0) return null;

  return (
    <div
      role="group"
      aria-label="Active filters"
      className="flex flex-wrap items-center gap-2 py-3"
    >
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          className={cn(
            "text-caption border-border bg-muted duration-fast ease-standard inline-flex h-8 items-center gap-1.5 rounded-full border px-3 font-medium transition-colors",
            "hover:border-destructive/50 hover:text-destructive",
            "focus-visible:ring-ring/50 focus-visible:ring-2 focus-visible:outline-none",
          )}
        >
          {chip.label}
          <X className="size-3.5" aria-hidden="true" />
          <span className="sr-only">Remove filter</span>
        </button>
      ))}

      <button
        type="button"
        onClick={onClearAll}
        className="text-caption text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 duration-fast ease-standard ml-1 h-8 rounded-full px-2 font-medium underline-offset-4 transition-colors hover:underline focus-visible:ring-2 focus-visible:outline-none"
      >
        Clear all
      </button>
    </div>
  );
}
