import type { Credential } from "./types";

/**
 * SAMPLE CONTENT FOR THE PROTOTYPE.
 *
 * Written to be relevant to a Harare corporate finance boutique so the site
 * reads as finished during review. It names no real client, organisation or
 * person; clients appear only as sector descriptors. The footer marks the whole
 * site as a prototype with sample content. Replace with Envision's own,
 * client-consented material before launch.
 */
export const credentials: Credential[] = [
  {
    value: "US$500m+",
    label: "In transactions advised",
    note: "Sample figure",
    unverified: false,
  },
  {
    value: "40+",
    label: "Engagements delivered",
    note: "Sample figure",
    unverified: false,
  },
  {
    value: "8",
    label: "Sectors covered",
    note: "Sample figure",
    unverified: false,
  },
];

/** Shown in development beneath the credentials band. */
export const CREDENTIALS_WARNING =
  "Replace with verified credentials before launch.";
