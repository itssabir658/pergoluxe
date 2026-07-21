"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";

import { Logo } from "@/components/layout/header/Logo";
import { MobileNavAccordion } from "@/components/layout/mobile-nav/MobileNavAccordion";
import { MobileNavQuickActions } from "@/components/layout/mobile-nav/MobileNavQuickActions";

type MobileNavDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Built directly on Radix Dialog rather than the shared `Dialog`/`DialogContent`
 * wrapper: those are styled as a centered, size-constrained panel, and a
 * full-screen nav takeover needs its own full-viewport positioning and
 * slide-from-edge animation. Radix still supplies the part that matters —
 * focus trap, `Escape` to close, body scroll lock, and correct ARIA dialog
 * semantics — all of that is inherited for free.
 */
export function MobileNavDrawer({ open, onOpenChange }: MobileNavDrawerProps) {
  function handleNavigate() {
    onOpenChange(false);
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="z-overlay bg-scrim data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0" />
        <DialogPrimitive.Content className="z-modal bg-background data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right fixed inset-0 flex flex-col">
          <VisuallyHidden asChild>
            <DialogPrimitive.Title>Site menu</DialogPrimitive.Title>
          </VisuallyHidden>
          <VisuallyHidden asChild>
            <DialogPrimitive.Description>
              Browse products, projects, and site navigation
            </DialogPrimitive.Description>
          </VisuallyHidden>

          <div className="border-border flex shrink-0 items-center justify-between border-b px-4 py-3">
            <Logo />
            <DialogPrimitive.Close className="text-foreground duration-fast hover:bg-muted focus-visible:ring-ring/50 flex size-11 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none">
              <X className="size-5" aria-hidden="true" />
              <span className="sr-only">Close menu</span>
            </DialogPrimitive.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-4">
            <MobileNavAccordion onNavigate={handleNavigate} />
          </div>

          <MobileNavQuickActions onNavigate={handleNavigate} />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
