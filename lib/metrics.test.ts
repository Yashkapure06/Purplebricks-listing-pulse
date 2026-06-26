import { describe, expect, it } from "vitest";
import {
  deltaMeta,
  healthMeta,
  offerRate,
  portfolioTotals,
  saveRate,
  signedPercent,
  viewingRate,
} from "./metrics";
import type { Property } from "@/types/listing";

const base: Property = {
  id: "x",
  address: "1 Test St",
  image: "https://example.com/x.jpg",
  type: "2 bed",
  listedDays: 1,
  price: 100000,
  delta: 0,
  views: 1000,
  viewsTrend: 0,
  saves: 80,
  viewingRequests: 20,
  pendingViewings: 2,
  completedViewings: 10,
  offers: 2,
  healthScore: 70,
  rating: 4,
  weekly: [1, 2, 3, 4],
  feedback: [],
  recommendations: [],
};

describe("rates", () => {
  it("saveRate", () => expect(saveRate(base)).toBe(8));
  it("viewingRate", () => expect(viewingRate(base)).toBe(2));
  it("offerRate", () => expect(offerRate(base)).toBe(20));
  it("guards divide-by-zero", () => {
    expect(saveRate({ ...base, views: 0 })).toBe(0);
    expect(offerRate({ ...base, completedViewings: 0 })).toBe(0);
  });
});

describe("healthMeta", () => {
  it("green >= 80", () => expect(healthMeta(84).tone).toBe("good"));
  it("amber 50-79", () => expect(healthMeta(72).tone).toBe("warn"));
  it("red < 50", () => expect(healthMeta(38).tone).toBe("urgent"));
});

describe("deltaMeta", () => {
  it("above avg is urgent", () => expect(deltaMeta(12).tone).toBe("urgent"));
  it("below avg is good", () => expect(deltaMeta(-3).tone).toBe("good"));
  it("in line is warn", () => expect(deltaMeta(-0.4).tone).toBe("warn"));
});

describe("signedPercent", () => {
  it("adds + for positive", () => expect(signedPercent(18)).toBe("+18%"));
  it("keeps - for negative", () => expect(signedPercent(-22)).toBe("-22%"));
});

describe("portfolioTotals", () => {
  it("sums and averages", () => {
    const t = portfolioTotals([base, { ...base, views: 500, healthScore: 30 }]);
    expect(t.totalViews).toBe(1500);
    expect(t.avgHealth).toBe(50);
    expect(t.count).toBe(2);
  });
});
