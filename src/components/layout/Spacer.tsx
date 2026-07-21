import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const spacerVariants = cva("block shrink-0", {
  variants: {
    axis: {
      vertical: "w-full",
      horizontal: "h-full",
    },
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
      "2xl": "",
    },
  },
  compoundVariants: [
    { axis: "vertical", size: "xs", class: "h-2" },
    { axis: "vertical", size: "sm", class: "h-4" },
    { axis: "vertical", size: "md", class: "h-6" },
    { axis: "vertical", size: "lg", class: "h-8" },
    { axis: "vertical", size: "xl", class: "h-12" },
    { axis: "vertical", size: "2xl", class: "h-16" },
    { axis: "horizontal", size: "xs", class: "w-2" },
    { axis: "horizontal", size: "sm", class: "w-4" },
    { axis: "horizontal", size: "md", class: "w-6" },
    { axis: "horizontal", size: "lg", class: "w-8" },
    { axis: "horizontal", size: "xl", class: "w-12" },
    { axis: "horizontal", size: "2xl", class: "w-16" },
  ],
  defaultVariants: {
    axis: "vertical",
    size: "md",
  },
});

type SpacerProps = VariantProps<typeof spacerVariants> & {
  className?: string;
};

/**
 * Explicit whitespace as an element, for the rare case a gap-based Stack/
 * Cluster isn't the right tool (e.g. spacing between two independently
 * animated elements). Prefer a Stack's `gap` prop over Spacer by default.
 */
export function Spacer({ axis, size, className }: SpacerProps) {
  return (
    <span aria-hidden="true" className={cn(spacerVariants({ axis, size }), className)} />
  );
}
