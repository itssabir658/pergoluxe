"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/utils/formatPrice";
import { deriveThresholdOptions } from "@/features/collection/utils/deriveFacets";
import type {
  CollectionFacets,
  CollectionFilterState,
  CollectionProduct,
} from "@/features/collection/types";

type FilterControlsProps = {
  products: CollectionProduct[];
  facets: CollectionFacets;
  filters: CollectionFilterState;
  onToggleArrayValue: (
    key: "model" | "size" | "colour" | "roofType" | "availability",
    value: string,
  ) => void;
  onSetMotorized: (value: boolean | null) => void;
  onSetPriceRange: (min: number | null, max: number | null) => void;
  onSetWindRatingMin: (value: number | null) => void;
  onSetSnowLoadMin: (value: number | null) => void;
};

const AVAILABILITY_LABELS: Record<string, string> = {
  "in-stock": "In Stock",
  "made-to-order": "Made to Order",
  backordered: "Backordered",
};

function CheckboxGroup({
  legend,
  options,
  selected,
  onToggle,
}: {
  legend: string;
  options: { value: string; label: string; count: number }[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  if (options.length === 0) return null;
  return (
    <fieldset>
      <legend className="text-label text-foreground">{legend}</legend>
      <div className="mt-3 flex flex-col gap-3">
        {options.map((option) => {
          const id = `filter-${legend}-${option.value}`
            .replace(/\s+/g, "-")
            .toLowerCase();
          return (
            <div key={option.value} className="flex items-center gap-2.5">
              <Checkbox
                id={id}
                checked={selected.includes(option.value)}
                onCheckedChange={() => onToggle(option.value)}
              />
              <Label htmlFor={id} className="text-body flex-1 cursor-pointer font-normal">
                {option.label}
              </Label>
              <span className="text-caption text-muted-foreground">{option.count}</span>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

/**
 * The one filter-control body, rendered inside the responsive Drawer
 * (`FilterSortBar`) regardless of breakpoint — desktop and mobile never
 * maintain two separate filter UIs to keep in sync. Every option list
 * comes from `facets` (derived from the collection's actual products,
 * `utils/deriveFacets.ts`), never a hardcoded list — a facet with zero
 * options simply doesn't render its `<fieldset>` at all.
 */
export function FilterControls({
  products,
  facets,
  filters,
  onToggleArrayValue,
  onSetMotorized,
  onSetPriceRange,
  onSetWindRatingMin,
  onSetSnowLoadMin,
}: FilterControlsProps) {
  const windOptions = deriveThresholdOptions(products, (p) => p.windRatingMph);
  const snowOptions = deriveThresholdOptions(products, (p) => p.snowLoadPsf);
  const hasMotorizedFacet = facets.motorizedCount > 0 && facets.manualCount > 0;

  return (
    <div className="flex flex-col gap-8">
      <CheckboxGroup
        legend="Model"
        options={facets.model}
        selected={filters.model}
        onToggle={(value) => onToggleArrayValue("model", value)}
      />
      <CheckboxGroup
        legend="Size"
        options={facets.size}
        selected={filters.size}
        onToggle={(value) => onToggleArrayValue("size", value)}
      />
      <CheckboxGroup
        legend="Colour"
        options={facets.colour}
        selected={filters.colour}
        onToggle={(value) => onToggleArrayValue("colour", value)}
      />
      <CheckboxGroup
        legend="Roof Type"
        options={facets.roofType}
        selected={filters.roofType}
        onToggle={(value) => onToggleArrayValue("roofType", value)}
      />

      {hasMotorizedFacet && (
        <fieldset>
          <legend className="text-label text-foreground">Motorised</legend>
          <RadioGroup
            className="mt-3"
            value={filters.motorized === null ? "any" : String(filters.motorized)}
            onValueChange={(value) =>
              onSetMotorized(value === "any" ? null : value === "true")
            }
          >
            {[
              { value: "any", label: "Any" },
              { value: "true", label: `Motorised (${facets.motorizedCount})` },
              { value: "false", label: `Manual (${facets.manualCount})` },
            ].map((option) => (
              <div key={option.value} className="flex items-center gap-2.5">
                <RadioGroupItem value={option.value} id={`motorized-${option.value}`} />
                <Label
                  htmlFor={`motorized-${option.value}`}
                  className="text-body cursor-pointer font-normal"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </fieldset>
      )}

      {windOptions.length > 0 && (
        <fieldset>
          <legend className="text-label text-foreground">Wind Rating</legend>
          <RadioGroup
            className="mt-3"
            value={filters.windRatingMin === null ? "any" : String(filters.windRatingMin)}
            onValueChange={(value) =>
              onSetWindRatingMin(value === "any" ? null : Number(value))
            }
          >
            <div className="flex items-center gap-2.5">
              <RadioGroupItem value="any" id="wind-any" />
              <Label htmlFor="wind-any" className="text-body cursor-pointer font-normal">
                Any
              </Label>
            </div>
            {windOptions.map((option) => (
              <div key={option.value} className="flex items-center gap-2.5">
                <RadioGroupItem
                  value={String(option.value)}
                  id={`wind-${option.value}`}
                />
                <Label
                  htmlFor={`wind-${option.value}`}
                  className="text-body cursor-pointer font-normal"
                >
                  {option.label} mph
                </Label>
              </div>
            ))}
          </RadioGroup>
        </fieldset>
      )}

      {snowOptions.length > 0 && (
        <fieldset>
          <legend className="text-label text-foreground">Snow Load</legend>
          <RadioGroup
            className="mt-3"
            value={filters.snowLoadMin === null ? "any" : String(filters.snowLoadMin)}
            onValueChange={(value) =>
              onSetSnowLoadMin(value === "any" ? null : Number(value))
            }
          >
            <div className="flex items-center gap-2.5">
              <RadioGroupItem value="any" id="snow-any" />
              <Label htmlFor="snow-any" className="text-body cursor-pointer font-normal">
                Any
              </Label>
            </div>
            {snowOptions.map((option) => (
              <div key={option.value} className="flex items-center gap-2.5">
                <RadioGroupItem
                  value={String(option.value)}
                  id={`snow-${option.value}`}
                />
                <Label
                  htmlFor={`snow-${option.value}`}
                  className="text-body cursor-pointer font-normal"
                >
                  {option.label} psf
                </Label>
              </div>
            ))}
          </RadioGroup>
        </fieldset>
      )}

      <fieldset>
        <legend className="text-label text-foreground">Price Range</legend>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex-1">
            <Label htmlFor="price-min" className="sr-only">
              Minimum price
            </Label>
            <Input
              id="price-min"
              type="number"
              inputMode="numeric"
              placeholder={formatPrice(facets.priceRange.min)}
              value={filters.priceMin ?? ""}
              onChange={(e) =>
                onSetPriceRange(
                  e.target.value ? Number(e.target.value) : null,
                  filters.priceMax,
                )
              }
            />
          </div>
          <span className="text-muted-foreground" aria-hidden="true">
            –
          </span>
          <div className="flex-1">
            <Label htmlFor="price-max" className="sr-only">
              Maximum price
            </Label>
            <Input
              id="price-max"
              type="number"
              inputMode="numeric"
              placeholder={formatPrice(facets.priceRange.max)}
              value={filters.priceMax ?? ""}
              onChange={(e) =>
                onSetPriceRange(
                  filters.priceMin,
                  e.target.value ? Number(e.target.value) : null,
                )
              }
            />
          </div>
        </div>
      </fieldset>

      <CheckboxGroup
        legend="Availability"
        options={facets.availability.map((option) => ({
          ...option,
          label: AVAILABILITY_LABELS[option.value] ?? option.label,
        }))}
        selected={filters.availability}
        onToggle={(value) => onToggleArrayValue("availability", value)}
      />
    </div>
  );
}
