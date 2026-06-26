import type { Property, Tone } from "@/types/listing";

/*
  Pure, typed metric helpers. Every function takes plain numbers / the shared
  Property model and returns plain values.
*/

const currencyFmt = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

/** Format GBP with no decimals, £285,000. */
export function formatCurrency(value: number): string {
  return currencyFmt.format(value);
}

/** Compact integer formatting,  1,284. */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-GB").format(value);
}

/** Round to one decimal place, guarding against `-0` and NaN. */
function round1(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.round(value * 10) / 10;
}

/** % of viewers who saved the listing. */
export function saveRate(p: Pick<Property, "saves" | "views">): number {
  if (p.views <= 0) return 0;
  return round1((p.saves / p.views) * 100);
}

/** % of viewers who requested a viewing. */
export function viewingRate(
  p: Pick<Property, "viewingRequests" | "views">,
): number {
  if (p.views <= 0) return 0;
  return round1((p.viewingRequests / p.views) * 100);
}

/** % of completed viewings that produced an offer. */
export function offerRate(
  p: Pick<Property, "offers" | "completedViewings">,
): number {
  if (p.completedViewings <= 0) return 0;
  return round1((p.offers / p.completedViewings) * 100);
}

export type HealthMeta = {
  tone: Tone;
  label: string;
};

/** Map a 0–100 health score to a tone + human label. */
export function healthMeta(score: number): HealthMeta {
  if (score >= 80) return { tone: "good", label: "Performing well" };
  if (score >= 50) return { tone: "warn", label: "Needs attention" };
  return { tone: "urgent", label: "Action needed" };
}

export type DeltaMeta = {
  tone: Tone;
  label: string;
};

/**
 * Describe price vs local average.
 * Above average is bad for the seller's chances → urgent (red);
 * below average is good value → good (green).
 */
export function deltaMeta(delta: number): DeltaMeta {
  if (delta > 1.5) {
    return { tone: "urgent", label: `↑ ${round1(delta)}% above avg` };
  }
  if (delta < -1.5) {
    return { tone: "good", label: `↓ ${round1(Math.abs(delta))}% below avg` };
  }
  return { tone: "warn", label: "In line with avg" };
}

export type PortfolioTotals = {
  totalViews: number;
  totalRequests: number;
  totalPending: number;
  totalOffers: number;
  totalNegotiating: number;
  avgHealth: number;
  count: number;
};

/** Aggregate a set of listings for the overview summary strip. */
export function portfolioTotals(listings: Property[]): PortfolioTotals {
  const count = listings.length;
  const sum = listings.reduce(
    (acc, l) => {
      acc.totalViews += l.views;
      acc.totalRequests += l.viewingRequests;
      acc.totalPending += l.pendingViewings;
      acc.totalOffers += l.offers;
      acc.totalNegotiating += l.offers > 0 ? 1 : 0;
      acc.health += l.healthScore;
      return acc;
    },
    {
      totalViews: 0,
      totalRequests: 0,
      totalPending: 0,
      totalOffers: 0,
      totalNegotiating: 0,
      health: 0,
    },
  );

  return {
    totalViews: sum.totalViews,
    totalRequests: sum.totalRequests,
    totalPending: sum.totalPending,
    totalOffers: sum.totalOffers,
    totalNegotiating: sum.totalNegotiating,
    avgHealth: count > 0 ? Math.round(sum.health / count) : 0,
    count,
  };
}

/** Signed percentage string for trends,"+18%" / "-22%". */
export function signedPercent(value: number): string {
  const r = round1(value);
  return `${r > 0 ? "+" : ""}${r}%`;
}
