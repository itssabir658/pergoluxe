"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

/**
 * Placeholder pending `features/cart` (ARCHITECTURE.md §6): the button and
 * drawer chrome are real and wired, but there's no cart state yet to show,
 * so it opens to an honest empty state rather than fabricated line items.
 * Once `features/cart` ships a `useCart()` hook, this becomes its trigger —
 * the item-count badge prop below is already shaped for that.
 */
export function CartTrigger({ itemCount = 0 }: { itemCount?: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>
        <button
          type="button"
          aria-label={`Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
          className="duration-fast focus-visible:ring-ring/50 relative flex size-11 items-center justify-center rounded-md transition-colors hover:bg-[currentColor]/10 focus-visible:ring-2 focus-visible:outline-none"
        >
          <ShoppingBag className="size-5" aria-hidden="true" />
          {itemCount > 0 && (
            <span className="text-caption bg-primary text-primary-foreground absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full font-semibold">
              {itemCount}
            </span>
          )}
        </button>
      </DrawerTrigger>
      <DrawerContent title="Cart">
        <div className="flex flex-1 flex-col px-6 pt-2 pb-6">
          <EmptyState
            icon={<ShoppingBag />}
            title="Your cart is empty"
            description="Explore our pergola and louvered roof collections to get started."
            action={
              <Link
                href={ROUTES.products}
                onClick={() => setOpen(false)}
                className={buttonVariants({ variant: "primary" })}
              >
                Shop products
              </Link>
            }
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
