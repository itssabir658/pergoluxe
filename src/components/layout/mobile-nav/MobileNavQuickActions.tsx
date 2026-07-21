import Link from "next/link";
import { Phone, ShoppingBag, User } from "lucide-react";

import { SearchTrigger } from "@/features/search";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";

/**
 * Bottom-anchored, not top — this is the thumb zone on a phone held
 * one-handed, and "Request a quote" is the highest-intent action a mobile
 * visitor can take, so it gets the shortest possible path from menu-open
 * to action, with the same visual weight as the header's Quote CTA.
 */
export function MobileNavQuickActions({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="border-border bg-popover shrink-0 border-t px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <Link
        href={ROUTES.quote}
        onClick={onNavigate}
        className="text-button bg-primary text-primary-foreground duration-fast hover:bg-primary/90 flex h-13 w-full items-center justify-center rounded-lg transition-colors"
      >
        Request Free Design Consultation
      </Link>

      <div className="mt-2 grid grid-cols-4 gap-1">
        <a
          href={siteConfig.phoneHref}
          className="text-caption text-muted-foreground duration-fast hover:bg-muted hover:text-foreground flex flex-col items-center gap-1 rounded-lg py-3 transition-colors"
        >
          <Phone className="size-5" aria-hidden="true" />
          Call
        </a>
        <div className="text-muted-foreground flex flex-col items-center gap-1 rounded-lg py-1">
          <SearchTrigger className="text-caption hover:bg-muted hover:text-foreground flex size-auto flex-col gap-1 rounded-lg py-2 [&_svg]:size-5" />
          <span className="text-caption -mt-1">Search</span>
        </div>
        <Link
          href={ROUTES.login}
          onClick={onNavigate}
          className="text-caption text-muted-foreground duration-fast hover:bg-muted hover:text-foreground flex flex-col items-center gap-1 rounded-lg py-3 transition-colors"
        >
          <User className="size-5" aria-hidden="true" />
          Account
        </Link>
        <Link
          href={ROUTES.cart}
          onClick={onNavigate}
          className="text-caption text-muted-foreground duration-fast hover:bg-muted hover:text-foreground flex flex-col items-center gap-1 rounded-lg py-3 transition-colors"
        >
          <ShoppingBag className="size-5" aria-hidden="true" />
          Cart
        </Link>
      </div>
    </div>
  );
}
