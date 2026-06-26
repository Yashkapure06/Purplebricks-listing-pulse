import { Eye, Calendar, HandCoins, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatNumber, portfolioTotals } from "@/lib/metrics";
import type { Property } from "@/types/listing";

/** Portfolio-wide summary strip shown above the listing cards. */
export function PortfolioSummary({ listings }: { listings: Property[] }) {
  const t = portfolioTotals(listings);

  const stats = [
    {
      icon: Eye,
      label: "Total views",
      value: formatNumber(t.totalViews),
      note: "across all listings",
    },
    {
      icon: Calendar,
      label: "Viewing requests",
      value: formatNumber(t.totalRequests),
      note: `${t.totalPending} pending`,
    },
    {
      icon: HandCoins,
      label: "Offers received",
      value: formatNumber(t.totalOffers),
      note: `${t.totalNegotiating} under negotiation`,
    },
    {
      icon: Activity,
      label: "Avg health score",
      value: `${t.avgHealth} / 100`,
      note: "portfolio average",
    },
  ];

  return (
    <section aria-label="Portfolio summary">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="bg-card-2 p-4">
            <div className="flex items-center gap-2 text-muted">
              <s.icon className="size-4" aria-hidden="true" />
              <span className="text-xs">{s.label}</span>
            </div>
            <p className="mt-2 font-heading text-2xl font-semibold">{s.value}</p>
            <p className="mt-0.5 text-xs text-muted">{s.note}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
