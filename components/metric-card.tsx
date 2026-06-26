import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Tone } from "@/types/listing";

const toneText: Record<Tone, string> = {
  good: "text-good",
  warn: "text-warn",
  urgent: "text-urgent",
};

/**
 * A single headline metric with an optional sub-line that is colour-coded by
 * health (e.g. a positive trend is green, a falling one red).
 */
export function MetricCard({
  icon: Icon,
  label,
  value,
  sub,
  subTone,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
  subTone?: Tone;
}) {
  return (
    <Card className="bg-card-2 p-4">
      <div className="flex items-center gap-2 text-muted">
        <Icon className="size-4" aria-hidden="true" />
        <span className="text-xs">{label}</span>
      </div>
      <p className="mt-2 font-heading text-2xl font-semibold">{value}</p>
      <p
        className={cn(
          "mt-0.5 text-xs",
          subTone ? toneText[subTone] : "text-muted",
        )}
      >
        {sub}
      </p>
    </Card>
  );
}
