import Link from "next/link";
import { User } from "lucide-react";

import { cn } from "@/utils/cn";
import { buttonVariants } from "@/components/ui/button";
import { CartTrigger } from "@/components/layout/header/CartTrigger";
import { SearchTrigger } from "@/features/search";
import { ROUTES } from "@/constants/routes";

/**
 * Search and Cart stay visible at every breakpoint (icon-only, thumb-sized,
 * genuinely useful on mobile). Account and the Quote CTA collapse into the
 * mobile drawer's quick-actions row instead of duplicating them here —
 * the header stays uncluttered, the actions aren't gone, just relocated.
 */
export function HeaderActions() {
  return (
    <div className="flex items-center gap-1">
      <SearchTrigger />
      <Link
        href={ROUTES.login}
        aria-label="Account"
        className="duration-fast focus-visible:ring-ring/50 hidden size-11 items-center justify-center rounded-md transition-colors hover:bg-[currentColor]/10 focus-visible:ring-2 focus-visible:outline-none lg:flex"
      >
        <User className="size-5" aria-hidden="true" />
      </Link>
      <Link
        href={ROUTES.quote}
        className={cn(
          buttonVariants({ variant: "primary", size: "sm" }),
          "ml-2 hidden lg:inline-flex",
        )}
      >
        Request Free Design Consultation
      </Link>
      <CartTrigger />
    </div>
  );
}
