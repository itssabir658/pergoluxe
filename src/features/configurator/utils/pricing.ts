import { accessories, BASE_PRICE, configSteps } from "@/features/configurator/constants";
import type { PreviewSelection } from "@/features/configurator/types";

/**
 * Pure function so the same calculation runs identically on server (the
 * default selection's SSR price) and client (live updates) — no hydration
 * mismatch, trivially unit-testable, and the single seam to replace with
 * live Shopify variant pricing later.
 */
export function calculatePreviewPrice(selection: PreviewSelection): number {
  const stepTotal = configSteps.reduce((total, step) => {
    const chosen = step.options.find((option) => option.id === selection[step.id]);
    return total + (chosen?.priceDelta ?? 0);
  }, 0);

  const accessoryTotal = accessories.reduce(
    (total, accessory) =>
      total + (selection.accessories.includes(accessory.id) ? accessory.priceDelta : 0),
    0,
  );

  return BASE_PRICE + stepTotal + accessoryTotal;
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
