import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/utils/cn";

type DividerProps = React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>;

/**
 * Thin wrapper over Radix Separator: gets the ARIA `separator` role right
 * for free (and lets it opt into `decorative` when it's purely visual).
 */
export function Divider({
  className,
  orientation = "horizontal",
  ...props
}: DividerProps) {
  return (
    <SeparatorPrimitive.Root
      orientation={orientation}
      className={cn(
        "bg-border shrink-0",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
}
