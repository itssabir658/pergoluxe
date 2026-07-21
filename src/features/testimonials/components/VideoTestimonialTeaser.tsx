import { Play } from "lucide-react";

/**
 * The brief explicitly asks for a video testimonial "placeholder" (unlike
 * the written testimonials, which are flagged stand-ins for real content —
 * this tile is meant to stay a placeholder until real footage exists). No
 * fake video file, no non-functional click handler pretending to play
 * something: a static tile stating plainly what's coming, consistent with
 * the project's honesty-of-placeholder rule (NAVIGATION.md §6).
 */
export function VideoTestimonialTeaser() {
  return (
    <div className="border-border bg-muted/40 flex aspect-video items-center justify-center rounded-xl border border-dashed">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="bg-background text-muted-foreground flex size-12 items-center justify-center rounded-full">
          <Play className="size-5 translate-x-0.5" aria-hidden="true" />
        </span>
        <p className="text-caption text-muted-foreground">
          Video testimonials coming soon
        </p>
      </div>
    </div>
  );
}
