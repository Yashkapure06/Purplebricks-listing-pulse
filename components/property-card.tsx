import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
import {
  deltaMeta,
  formatCurrency,
  formatNumber,
  healthMeta,
} from "@/lib/metrics";
import type { Property } from "@/types/listing";

export function PropertyCard({ property }: { property: Property }) {
  const delta = deltaMeta(property.delta);
  const health = healthMeta(property.healthScore);

  const stats: { label: string; value: string }[] = [
    { label: "Views", value: formatNumber(property.views) },
    { label: "Requests", value: String(property.viewingRequests) },
    { label: "Viewings", value: String(property.completedViewings) },
    { label: "Offers", value: String(property.offers) },
  ];

  return (
    <Card className="flex flex-col overflow-hidden bg-card-2">
      <img
        src={property.image}
        alt={property.address}
        className="aspect-[16/9] w-full object-cover"
      />
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-heading text-base font-semibold leading-tight">
              {property.address}
            </h3>
            <p className="mt-1 text-sm text-muted">
              {property.type} · {property.listedDays} days listed
            </p>
          </div>
          <StatusBadge tone={health.tone}>{property.healthScore}</StatusBadge>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-heading text-xl font-semibold">
            {formatCurrency(property.price)}
          </span>
          <StatusBadge tone={delta.tone}>{delta.label}</StatusBadge>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <dl className="grid grid-cols-4 gap-2 rounded-lg border border-border bg-accent/[0.04] p-3">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="text-xs text-muted">{s.label}</dt>
              <dd className="mt-0.5 font-heading text-base font-semibold">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 flex items-center gap-1.5 text-sm">
          <span className="text-muted">Status:</span>
          <span
            className={
              health.tone === "good"
                ? "text-good"
                : health.tone === "warn"
                  ? "text-warn"
                  : "text-urgent"
            }
          >
            {health.label}
          </span>
        </p>
      </CardContent>

      <CardFooter>
        <Link
          href={`/listings/${property.id}`}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent/[0.08]"
        >
          View details
          <ArrowRight aria-hidden="true" />
        </Link>
      </CardFooter>
    </Card>
  );
}
