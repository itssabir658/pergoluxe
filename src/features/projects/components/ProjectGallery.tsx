"use client";

import { useMemo, useState } from "react";

import { cn } from "@/utils/cn";
import { ProjectCard } from "@/features/projects/components/ProjectCard";
import {
  PROJECT_CATEGORIES,
  type Project,
  type ProjectCategory,
} from "@/features/projects/types";

type Filter = ProjectCategory | "All";

/**
 * Filterable editorial gallery. The brief only required filter UI, but
 * with the data local there's no reason for dead controls — the chips
 * genuinely filter (precedent: the search modal's real local index).
 * Swapping `projects` for a Sanity query result later changes nothing
 * here. Filter state is announced via the results region's aria-live;
 * chips are toggle buttons with `aria-pressed`, one tab stop each.
 */
export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.categories.includes(filter)),
    [projects, filter],
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2"
      >
        {(["All", ...PROJECT_CATEGORIES] as Filter[]).map((category) => {
          const active = filter === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(category)}
              className={cn(
                "text-caption border-border duration-fast ease-standard h-9 rounded-full border px-4 font-medium transition-colors",
                "hover:border-primary/50",
                "focus-visible:ring-ring/50 focus-visible:ring-2 focus-visible:outline-none",
                active && "border-primary bg-primary text-primary-foreground",
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="mt-10">
        <p className="sr-only">
          {visible.length} project{visible.length === 1 ? "" : "s"} shown
        </p>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
