/** Severity used across recommendations, signals and status badges. */
export type Tone = "good" | "warn" | "urgent";

/**
 * Named icon for a recommendation.
 */
export type RecIcon =
  | "camera"
  | "calendar-clock"
  | "calendar-check"
  | "parking"
  | "pound"
  | "zap"
  | "trending-down"
  | "wrench";

/** A single AI recommendation card shown on the detail screen. */
export type Recommendation = {
  icon: RecIcon;
  title: string;
  body: string;
  tone: Tone;
};

/**
 * The full shape of a listing. This is the single source of truth for the UI.
 */
export type Property = {
  id: string;
  address: string;
  image: string;
  type: string;
  listedDays: number;
  price: number;
  delta: number;
  views: number;
  viewsTrend: number;
  saves: number;
  viewingRequests: number;
  pendingViewings: number;
  completedViewings: number;
  offers: number;
  healthScore: number;
  rating: number;
  weekly: number[];
  feedback: string[];
  recommendations: Recommendation[];
};
