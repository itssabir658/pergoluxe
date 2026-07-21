import Link from "next/link";
import { Compass } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <div className="max-w-content mx-auto flex min-h-[60vh] items-center justify-center px-4">
      <EmptyState
        icon={<Compass />}
        title="Page not found"
        description="The page you're looking for doesn't exist or may have moved."
        action={
          <Link href={ROUTES.home} className={buttonVariants({ variant: "primary" })}>
            Back to home
          </Link>
        }
      />
    </div>
  );
}
