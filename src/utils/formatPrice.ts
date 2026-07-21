/**
 * Whole-dollar USD formatting, shared by the configurator preview and the
 * model comparison (promoted out of features/configurator on its second
 * consumer, per ARCHITECTURE.md's rule of three/second-use). Locale is
 * fixed so server and client render identical strings — no hydration
 * drift from environment locale differences.
 */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
