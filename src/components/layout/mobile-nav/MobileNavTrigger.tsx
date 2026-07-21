"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

import { MobileNavDrawer } from "@/components/layout/mobile-nav/MobileNavDrawer";

export function MobileNavTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="duration-fast focus-visible:ring-ring/50 flex size-11 items-center justify-center rounded-md transition-colors hover:bg-[currentColor]/10 focus-visible:ring-2 focus-visible:outline-none lg:hidden"
      >
        {open ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <Menu className="size-5" aria-hidden="true" />
        )}
      </button>
      <MobileNavDrawer open={open} onOpenChange={setOpen} />
    </>
  );
}
