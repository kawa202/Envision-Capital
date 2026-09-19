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
    value: "[Figure]",
    label: "In transactions advised",
    note: "[Verified figure required]",
    unverified: true,
  },
  {
    value: "[Figure]",
    label: "Engagements delivered",
    note: "[Verified figure required]",
    unverified: true,
  },
  {
    value: "[Figure]",
    label: "Sectors covered",
    note: "[Verified figure required]",
    unverified: true,
  },
];

/** Shown in development beneath the credentials band. */
export const CREDENTIALS_WARNING =
  "Replace with verified credentials before launch.";
