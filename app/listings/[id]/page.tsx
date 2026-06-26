import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  CheckCircle2,
  Eye,
  HandCoins,
} from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { MetricCard } from "@/components/metric-card";
import { HealthScore } from "@/components/health-score";
import { ViewsChart } from "@/components/views-chart";
import { FeedbackPanel } from "@/components/feedback-panel";
import { RecommendationCard } from "@/components/recommendation-card";
import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { getListing, listings } from "@/data/listings";
import {
  deltaMeta,
  formatCurrency,
  formatNumber,
  offerRate,
  saveRate,
  signedPercent,
  viewingRate,
} from "@/lib/metrics";
import type { Property, Tone } from "@/types/listing";

export function generateStaticParams(): { id: string }[] {
  return listings.map((l) => ({ id: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = getListing(id);
  return {
    title: property ? `${property.address} · Listing Pulse` : "Listing Pulse",
  };
}

function buildMetrics(p: Property) {
  const sr = saveRate(p);
  const vr = viewingRate(p);
  const or = offerRate(p);

  const trendTone: Tone =
    p.viewsTrend >= 0 ? "good" : p.viewsTrend >= -10 ? "warn" : "urgent";
  const saveTone: Tone = sr >= 5 ? "good" : sr >= 3 ? "warn" : "urgent";
  const vrTone: Tone = vr >= 1.5 ? "good" : vr >= 0.8 ? "warn" : "urgent";
  const viewingsTone: Tone =
    p.completedViewings >= 5
      ? "good"
      : p.completedViewings >= 2
        ? "warn"
        : "urgent";
  const orTone: Tone = or >= 15 ? "good" : or > 0 ? "warn" : "urgent";

  return [
    {
      icon: Eye,
      label: "Listing views",
      value: formatNumber(p.views),
      sub: `${signedPercent(p.viewsTrend)} vs last week`,
      subTone: trendTone,
    },
    {
      icon: Bookmark,
      label: "Saves",
      value: formatNumber(p.saves),
      sub: `${sr}% save rate`,
      subTone: saveTone,
    },
    {
      icon: Calendar,
      label: "Viewing requests",
      value: String(p.viewingRequests),
      sub: `${vr}% of views`,
      subTone: vrTone,
    },
    {
      icon: CheckCircle2,
      label: "Completed viewings",
      value: String(p.completedViewings),
      sub: `${p.pendingViewings} pending`,
      subTone: viewingsTone,
    },
    {
      icon: HandCoins,
      label: "Offers received",
      value: String(p.offers),
      sub: `${or}% of viewings`,
      subTone: orTone,
    },
  ];
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = getListing(id);
  if (!property) notFound();

  const delta = deltaMeta(property.delta);
  const metrics = buildMetrics(property);

  return (
    <div className="min-h-dvh">
      <AppHeader />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All listings
        </Link>

        <img
          src={property.image}
          alt={property.address}
          className="mt-4 aspect-[16/9] w-full rounded-xl border border-border object-cover sm:aspect-[21/9]"
        />

        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              {property.address}
            </h1>
            <Badge variant="accent">Active listing</Badge>
          </div>
          <p className="mt-1 text-sm text-muted">
            {property.type} · {property.listedDays} days listed
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="font-heading text-xl font-semibold">
              {formatCurrency(property.price)}
            </span>
            <StatusBadge tone={delta.tone}>{delta.label}</StatusBadge>
          </div>
        </div>

        {/* Performance metrics */}
        <section className="mt-8" aria-labelledby="perf-heading">
          <h2
            id="perf-heading"
            className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted"
          >
            Performance this month
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {metrics.map((m) => (
              <MetricCard key={m.label} {...m} />
            ))}
          </div>
        </section>

        {/* Health + chart */}
        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          <HealthScore property={property} />
          <ViewsChart weekly={property.weekly} />
        </section>

        {/* Feedback */}
        <div className="mt-8">
          <FeedbackPanel
            rating={property.rating}
            feedback={property.feedback}
            viewings={property.completedViewings}
          />
        </div>

        {/* Recommendations */}
        <section className="mt-8" aria-labelledby="rec-heading">
          <h2
            id="rec-heading"
            className="mb-3 font-heading text-lg font-semibold"
          >
            Recommended next steps
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {property.recommendations.map((rec, i) => (
              <RecommendationCard key={i} rec={rec} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
