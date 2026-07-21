import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { cn } from "@/utils/cn";
import { ROUTES } from "@/constants/routes";
import type { Project } from "@/features/projects/types";

/**
 * One project, one link (single tab stop). Metadata (title, location,
 * model, dimensions) stays permanently below the image — hover only zooms
 * the image and surfaces the description overlay, so nothing essential is
 * hover-gated (touch and keyboard users lose nothing). The overlay is
 * also revealed on `focus-visible` for keyboard users. Links target the
 * future `/projects/[slug]` pages via ROUTES.project.
 */
export function ProjectCard({ project }: { project: Project }) {
  const { slug, title, location, model, dimensions, description, image } = project;

  return (
    <Link
      href={ROUTES.project(slug)}
      className="group focus-visible:ring-ring/50 block rounded-xl focus-visible:ring-2 focus-visible:outline-none"
    >
      <article>
        <div className="border-border relative aspect-[4/3] overflow-hidden rounded-xl border">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="duration-slow ease-standard object-cover transition-transform motion-safe:group-hover:scale-105"
          />
          <div
            className={cn(
              "absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5",
              "duration-base ease-standard opacity-0 transition-opacity",
              "group-hover:opacity-100 group-focus-visible:opacity-100",
            )}
          >
            <div>
              <p className="text-caption text-white/90">{description}</p>
              <span className="text-button mt-3 inline-flex items-center gap-1 text-white">
                View Project
                <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-h4 text-foreground">{title}</h3>
          <p className="text-caption text-muted-foreground mt-1 flex items-center gap-1">
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            {location}
          </p>
          <p className="text-caption text-muted-foreground mt-1.5">
            {model} · {dimensions}
          </p>
        </div>
      </article>
    </Link>
  );
}
