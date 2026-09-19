import type { Industry } from "./types";

/**
 * Sector coverage.
 *
 * Rendered as a typographic editorial index rather than an image grid. That is
 * a deliberate art-direction decision: there is no commissioned photography for
 * these sectors, and eight recycled stock frames would say less about Envision's
 * sector fluency than eight precisely written lines do. Add a commissioned
 * image per sector and the layout accepts it without restructuring.
 *
 * Sectors below reflect those named in Envision's existing positioning.
 * Confirm the full list against real engagement history before launch.
 */
export const industries: Industry[] = [
  {
    index: "01",
    name: "Mining & Natural Resources",
    focus:
      "Capital structuring for long-lead projects, and valuation work that survives commodity-price scrutiny.",
    constraint: "Commodity exposure and capital intensity",
  },
  {
    index: "02",
    name: "Manufacturing",
    focus:
      "Refinancing plant on tenors matched to asset life, and finding where margin is actually earned.",
    constraint: "Working capital and input cost volatility",
  },
  {
    index: "03",
    name: "Agriculture & Agribusiness",
    focus:
      "Funding structures built around the crop cycle rather than the calendar year.",
    constraint: "Seasonality and concentrated cash cycles",
  },
  {
    index: "04",
    name: "Financial Services",
    focus:
      "Independent valuation, shareholder transactions and reporting under regulatory scrutiny.",
    constraint: "Regulatory capital and disclosure",
  },
  {
    index: "05",
    name: "Consumer & Retail",
    focus:
      "Margin analysis, expansion cases and the working capital discipline growth demands.",
    constraint: "Thin margins and inventory cycles",
  },
  {
    index: "06",
    name: "Infrastructure & Energy",
    focus:
      "Long-horizon capital structures and the lender syndicate documentation they require.",
    constraint: "Decades-long payback and complex lenders",
  },
  {
    index: "07",
    name: "Technology",
    focus:
      "Investor readiness, valuation for growth capital, and finance functions built to scale.",
    constraint: "Pre-profit valuation and burn discipline",
  },
  {
    index: "08",
    name: "Professional Services",
    focus:
      "Partner transitions, succession funding and the reporting maturity institutional clients expect.",
    constraint: "People-based value and succession",
  },
];
