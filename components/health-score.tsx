import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { healthMeta, offerRate, viewingRate } from "@/lib/metrics";
import { cn } from "@/lib/utils";
import type { Property, Tone } from "@/types/listing";

/** Local-market benchmark for viewing conversion (% of views → requests). */
const LOCAL_AVG_VIEWING_RATE = 1.8;

const toneHex: Record<Tone, string> = {
  good: "#069668",
  warn: "#b07505",
  urgent: "#c43d3d",
};

const toneText: Record<Tone, string> = {
  good: "text-good",
  warn: "text-warn",
  urgent: "text-urgent",
};

/** Circular progress ring rendered with SVG (no extra deps). */
function ScoreRing({ score, tone }: { score: number; tone: Tone }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);
  return (
    <svg
      width="84"
      height="84"
      viewBox="0 0 84 84"
      role="img"
      aria-label={`Health score ${score} out of 100`}
    >
      <circle
        cx="42"
        cy="42"
        r={radius}
        fill="none"
        stroke="rgba(20,12,40,0.10)"
        strokeWidth="7"
      />
      <circle
        cx="42"
        cy="42"
        r={radius}
        fill="none"
        stroke={toneHex[tone]}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 42 42)"
      />
      <text
        x="42"
        y="46"
        textAnchor="middle"
        className="fill-foreground font-heading text-xl font-semibold"
      >
        {score}
      </text>
    </svg>
  );
}

type Signal = { label: string; detail: string; tone: Tone };

/** Pick a qualitative word per tone. */
function qualify(tone: Tone, words: Record<Tone, string>): string {
  return words[tone];
}

/**
 * Derive the four health signals as short, qualitative verdicts (Strong /
 * Below avg / Low …). The underlying numbers stay in the metric cards above -
 * this panel is a quick at-a-glance read.
 */
function buildSignals(p: Property): Signal[] {
  const vTrend: Tone =
    p.viewsTrend >= 0 ? "good" : p.viewsTrend >= -10 ? "warn" : "urgent";

  const vr = viewingRate(p);
  const vrTone: Tone =
    vr >= LOCAL_AVG_VIEWING_RATE ? "good" : vr >= 0.8 ? "warn" : "urgent";

  const or = offerRate(p);
  const orTone: Tone = or >= 15 ? "good" : or > 0 ? "warn" : "urgent";

  const fbTone: Tone =
    p.rating >= 4.0 ? "good" : p.rating >= 3.5 ? "warn" : "urgent";

  return [
    {
      label: "Views",
      detail: qualify(vTrend, {
        good: "Strong",
        warn: "Slowing",
        urgent: "Falling",
      }),
      tone: vTrend,
    },
    {
      label: "Viewing rate",
      detail: qualify(vrTone, {
        good: "Above avg",
        warn: "Below avg",
        urgent: "Low",
      }),
      tone: vrTone,
    },
    {
      label: "Offer rate",
      detail: qualify(orTone, {
        good: "Healthy",
        warn: "Low",
        urgent: "None yet",
      }),
      tone: orTone,
    },
    {
      label: "Feedback",
      detail: `${p.rating.toFixed(1)} / 5`,
      tone: fbTone,
    },
  ];
}

/** Listing Health Score panel: ring, headline, Weak→Strong bar + 4 signals. */
export function HealthScore({ property }: { property: Property }) {
  const meta = healthMeta(property.healthScore);
  const signals = buildSignals(property);

  const headline: Record<Tone, string> = {
    good: "Performing well",
    warn: "Good, with room to improve",
    urgent: "Action needed",
  };

  // Blurb is descriptive: call out the dominant weakness vs the local average.
  const vr = viewingRate(property);
  let blurb: string;
  if (meta.tone === "good") {
    blurb = "Strong, consistent interest across every signal.";
  } else if (meta.tone === "urgent") {
    blurb = "Several signals are underperforming - act this week.";
  } else if (vr < LOCAL_AVG_VIEWING_RATE) {
    blurb = `Views are strong but viewing conversion is below the local average of ${LOCAL_AVG_VIEWING_RATE}%.`;
  } else {
    blurb = "Solid interest, but a few signals could be sharper.";
  }

  return (
    <Card className="bg-card-2">
      <CardHeader>
        <CardTitle>Listing Health Score</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center gap-4">
          <ScoreRing score={property.healthScore} tone={meta.tone} />
          <div>
            <p className="font-heading text-lg font-semibold">
              {headline[meta.tone]}
            </p>
            <p className="mt-1 text-sm text-muted">{blurb}</p>
          </div>
        </div>

        <div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-black/8">
            <div
              className="h-full rounded-full"
              style={{
                width: `${property.healthScore}%`,
                backgroundColor: toneHex[meta.tone],
              }}
            />
          </div>
          <div className="mt-1 flex justify-between text-xs text-muted">
            <span>Weak</span>
            <span>Strong</span>
          </div>
        </div>

        <ul className="divide-y divide-border rounded-lg border border-border">
          {signals.map((s) => (
            <li
              key={s.label}
              className="flex items-center justify-between px-3 py-2.5"
            >
              <div className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: toneHex[s.tone] }}
                  aria-hidden="true"
                />
                <span className="text-sm">{s.label}</span>
              </div>
              <span className={cn("text-sm", toneText[s.tone])}>
                {s.detail}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
