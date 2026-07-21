"use client";

import { useTheme } from "next-themes";
import { Toaster as SonnerToaster } from "sonner";

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

/**
 * Sonner over Radix Toast: it ships stacking, swipe-to-dismiss, and promise-
 * based `toast.promise()` (ideal for "Adding to cart…" → "Added" flows)
 * without us hand-building a toast queue on top of Radix's primitive.
 * This is the one Toaster instance for the app — mounted once in the root
 * providers, never per-feature.
 */
export function Toaster({ ...props }: ToasterProps) {
  const { resolvedTheme } = useTheme();

  return (
    <SonnerToaster
      theme={resolvedTheme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast bg-popover text-popover-foreground border border-border shadow-lg rounded-lg",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}
