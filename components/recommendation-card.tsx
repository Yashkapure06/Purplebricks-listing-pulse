import {
  Camera,
  CalendarCheck,
  CalendarClock,
  PoundSterling,
  SquareParking,
  TrendingDown,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Recommendation, RecIcon, Tone } from "@/types/listing";

const toneChip: Record<Tone, string> = {
  good: "bg-good/15 text-good",
  warn: "bg-warn/15 text-warn",
  urgent: "bg-urgent/15 text-urgent",
};

const iconMap: Record<RecIcon, LucideIcon> = {
  camera: Camera,
  "calendar-clock": CalendarClock,
  "calendar-check": CalendarCheck,
  parking: SquareParking,
  pound: PoundSterling,
  zap: Zap,
  "trending-down": TrendingDown,
  wrench: Wrench,
};

/** A single recommended next step */
export function RecommendationCard({ rec }: { rec: Recommendation }) {
  const Icon = iconMap[rec.icon];
  return (
    <Card className="bg-card-2">
      <CardContent className="flex gap-3 p-4">
        <span
          className={`grid size-9 shrink-0 place-items-center rounded-lg ${toneChip[rec.tone]}`}
          aria-hidden="true"
        >
          <Icon className="size-4" />
        </span>
        <div>
          <h3 className="font-heading text-sm font-semibold">{rec.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">{rec.body}</p>
        </div>
      </CardContent>
    </Card>
  );
}
