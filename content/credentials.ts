import type { Credential } from "./types";

/**
 * ⚠️  PROTOTYPE PLACEHOLDERS — NOT VERIFIED ENVISION DATA.
 *
 * Every figure below carries `unverified: true`, which renders a visible
 * build-time flag in development. Replace with verified credentials, and set
 * `unverified: false`, before launch. Do not publish unverified figures:
 * a corporate finance firm cannot fabricate its own track record.
 */
export const credentials: Credential[] = [
  {
    prefix: "USD ",
    value: "250",
    suffix: "M+",
    label: "In transactions advised",
    note: "Across debt, equity and M&A mandates",
    unverified: true,
  },
  {
    value: "60",
    suffix: "+",
    label: "Engagements delivered",
    note: "From defined-scope diagnostics to full mandates",
    unverified: true,
  },
  {
    value: "12",
    suffix: "+",
    label: "Sectors covered",
    note: "Across Zimbabwe and the wider region",
    unverified: true,
  },
];

/** Shown in development beneath the credentials band. */
export const CREDENTIALS_WARNING =
  "Replace with verified credentials before launch.";
