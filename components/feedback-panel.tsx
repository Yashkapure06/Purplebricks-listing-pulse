import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Render a 5-star row, supporting half-star fill via overlay. */
function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="relative inline-block">
            <Star className="size-4 text-black/15" aria-hidden="true" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
              aria-hidden="true"
            >
              <Star className="size-4 fill-warn text-warn" />
            </span>
          </span>
        );
      })}
    </div>
  );
}

/** Buyer feedback: rating header + quoted comments as cards. */
export function FeedbackPanel({
  rating,
  feedback,
  viewings,
}: {
  rating: number;
  feedback: string[];
  viewings: number;
}) {
  return (
    <section aria-labelledby="feedback-heading">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <h2
          id="feedback-heading"
          className="font-heading text-lg font-semibold"
        >
          Buyer feedback
        </h2>
        <div className="flex items-center gap-2">
          <Stars rating={rating} />
          <span className="text-sm font-medium">{rating.toFixed(1)} / 5</span>
          <span className="text-sm text-muted">
            based on {viewings} viewings
          </span>
        </div>
      </div>

      {feedback.length === 0 ? (
        <Card className="bg-card-2">
          <CardContent className="py-8 text-center text-sm text-muted">
            No buyer feedback yet. Comments appear here after viewings.
          </CardContent>
        </Card>
      ) : (
        <div className={cn("grid gap-3", "sm:grid-cols-2")}>
          {feedback.map((quote, i) => (
            <Card key={i} className="bg-card-2">
              <CardContent className="p-4 pt-4">
                <p className="text-sm leading-relaxed text-foreground/90">
                  &ldquo;{quote}&rdquo;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
