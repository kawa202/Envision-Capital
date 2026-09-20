export type Figure = {
  /** Large serif value. A bracket means Envision has not supplied it yet. */
  value: string;
  label: string;
  /** True only where the firm itself has stated the number. */
  clientStated?: boolean;
};

/**
 * The key figures band.
 *
 * Exactly one of these is a real claim: Envision has stated 20+ years of
 * experience, and it is marked as client-stated rather than verified by us.
 * The other two are empty slots. A corporate finance firm cannot invent its
 * own track record, and a number in a large serif on a navy band is the most
 * quotable thing on a homepage — which is precisely why it has to be true.
 *
 * The footnote carries the as-at date, because a figure without one ages
 * silently.
 */
export const figures: Figure[] = [
  { value: "20+", label: "Years of experience", clientStated: true },
  { value: "[X]", label: "Mandates advised" },
  { value: "[X]", label: "Sectors served" },
];

export const FIGURES_FOOTNOTE = "[As at DATE]";
