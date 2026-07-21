import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/cn";

type InputProps = ComponentPropsWithoutRef<"input">;

export function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "text-body border-input bg-background text-foreground duration-fast ease-standard flex h-11 w-full rounded-md border px-3.5 py-2 transition-colors",
        "placeholder:text-muted-foreground",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2 focus-visible:outline-none",
        "disabled:opacity-disabled disabled:cursor-not-allowed",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/30",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className,
      )}
      {...props}
    />
  );
}
