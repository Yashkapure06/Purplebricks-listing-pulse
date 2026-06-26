import type { Property } from "@/types/listing";

/*
 * Mock data. In production this would come from a
 * database or API, but for this demo we keep it simple and static.
 */
export const listings: Property[] = [
  {
    id: "maple",
    address: "14 Maple Court, Manchester M4 1AB",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    type: "2 bed · 1 bath · flat",
    listedDays: 21,
    price: 285000,
    delta: 5.6,
    views: 1284,
    viewsTrend: 18,
    saves: 86,
    viewingRequests: 14,
    pendingViewings: 5,
    completedViewings: 9,
    offers: 1,
    healthScore: 72,
    rating: 4.1,
    weekly: [300, 296, 358, 334],
    feedback: [
      "Lovely natural light and a great location, but the kitchen feels a little dated for the asking price.",
      "Really well presented flat - we're comparing it against two others nearby before deciding.",
      "Good size for a couple. The lack of allocated parking is the only sticking point for us.",
    ],
    recommendations: [
      {
        icon: "camera",
        title: "Refresh the kitchen photos",
        body: "Several viewers mention the kitchen. Re-shoot in daylight and lead the gallery with the brightest living-space shot to lift click-through.",
        tone: "warn",
      },
      {
        icon: "calendar-clock",
        title: "Chase the 5 pending viewings",
        body: "Strong interest isn't converting to booked viewings. A quick follow-up to pending requests usually recovers 1–2 viewings this week.",
        tone: "warn",
      },
      {
        icon: "parking",
        title: "Clarify parking in the listing",
        body: "Parking comes up repeatedly. Add a clear line about nearby permit/parking options to remove the doubt before viewings.",
        tone: "good",
      },
    ],
  },
  {
    id: "birchwood",
    address: "7 Birchwood Lane, Leeds LS6 2DP",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
    type: "3 bed · 2 bath · semi-detached",
    listedDays: 9,
    price: 340000,
    delta: -0.4,
    views: 1102,
    viewsTrend: 24,
    saves: 98,
    viewingRequests: 13,
    pendingViewings: 3,
    completedViewings: 8,
    offers: 2,
    healthScore: 84,
    rating: 4.5,
    weekly: [188, 244, 318, 352],
    feedback: [
      "Beautiful family home, exactly what we've been looking for. Putting in an offer.",
      "Great condition throughout and a lovely garden. Priced very fairly for the area.",
      "Loved the open-plan kitchen. We're first-time buyers and this felt very move-in ready.",
    ],
    recommendations: [
      {
        icon: "pound",
        title: "Compare your two live offers",
        body: "You have two offers in play. Weigh chain position and proof of funds, not just headline price, before you respond.",
        tone: "good",
      },
      {
        icon: "zap",
        title: "Keep momentum high",
        body: "Views are up 24% and the home is only 9 days listed. Respond to offers within 48h to keep both buyers engaged.",
        tone: "good",
      },
      {
        icon: "calendar-check",
        title: "Hold the 3 pending viewings",
        body: "Don't cancel pending viewings yet - a third interested party strengthens your negotiating position if a deal stalls.",
        tone: "good",
      },
    ],
  },
  {
    id: "orchard",
    address: "32 Orchard Rise, Bristol BS8 4NQ",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    type: "4 bed · 2 bath · detached",
    listedDays: 41,
    price: 595000,
    delta: 12.0,
    views: 655,
    viewsTrend: -22,
    saves: 22,
    viewingRequests: 4,
    pendingViewings: 1,
    completedViewings: 3,
    offers: 0,
    healthScore: 38,
    rating: 3.4,
    weekly: [258, 182, 138, 77],
    feedback: [
      "Lovely house but it feels overpriced compared to similar detached homes we've seen locally.",
      "Nice space, though it needs some modernising and the price doesn't reflect that.",
      "We liked it but stretched our budget elsewhere for better value.",
    ],
    recommendations: [
      {
        icon: "pound",
        title: "Review the asking price",
        body: "At 12% above the local average with falling views and no offers in 41 days, the price is the primary blocker. A 3–5% adjustment should re-open interest.",
        tone: "urgent",
      },
      {
        icon: "trending-down",
        title: "Reverse the view decline",
        body: "Views have fallen four weeks running (-22% w/w). Relist with a refreshed headline photo and a new lead description to re-enter buyer searches.",
        tone: "urgent",
      },
      {
        icon: "wrench",
        title: "Address the 'needs modernising' theme",
        body: "Feedback repeatedly cites dated interiors. Either reflect this in the price or stage the key rooms to justify the premium.",
        tone: "warn",
      },
      {
        icon: "calendar-clock",
        title: "Convert the single pending viewing",
        body: "With only one viewing pending, every booking counts. Offer flexible evening/weekend slots to secure it this week.",
        tone: "warn",
      },
    ],
  },
];

export function getListing(id: string): Property | undefined {
  return listings.find((l) => l.id === id);
}
