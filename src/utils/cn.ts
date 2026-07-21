import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges conditional class names (clsx) then dedupes conflicting Tailwind
 * utilities (tailwind-merge), so a later `className` override (e.g.
 * `className="p-4"` passed into a component that already applies `p-2`)
 * wins instead of both classes being emitted.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
