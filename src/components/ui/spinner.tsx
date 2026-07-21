import { type ComponentPropsWithoutRef } from "react";
import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const spinnerVariants = cva("animate-spin text-current", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-6",
      lg: "size-8",
    },
  },
  defaultVariants: { size: "md" },
});

type SpinnerProps = ComponentPropsWithoutRef<"svg"> &
  VariantProps<typeof spinnerVariants> & {
    label?: string;
  };

/** `data-keep-motion` opts this out of the global prefers-reduced-motion
 * freeze — see globals.css for why loading indicators are the exception. */
export function Spinner({ className, size, label = "Loading", ...props }: SpinnerProps) {
  return (
    <Loader2
      role="status"
      aria-label={label}
      data-keep-motion
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    />
  );
}
