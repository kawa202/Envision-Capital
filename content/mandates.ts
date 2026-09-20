export type Mandate = {
  id: string;
  /** "[Year]" until a real one is supplied. Never a year we chose. */
  year: string;
  client: string;
  mandate: string;
  value: string;
  sector: string;
};

/**
 * Tombstones — the row of completed mandates.
 *
 * Every field is an empty slot. A tombstone is the strongest claim a
 * corporate finance firm makes on its own website: it names a client, a
 * transaction and a number, and it implies the client agreed to be named.
 * None of that can be prototyped. Earlier drafts of this project carried an
 * invented US$120m recapitalisation and it was removed; nothing replaces it
 * until Envision supplies consented detail.
 *
 * Distinct from content/caseStudies.ts, which drives /work — a tombstone is
 * the one-line public record, a case study is the narrative behind it.
 */
export const mandates: Mandate[] = [
  {
    id: "mandate-01",
    year: "[Year]",
    client: "[Client name]",
    mandate: "[Mandate description]",
    value: "[Value]",
    sector: "[Sector]",
  },
  {
    id: "mandate-02",
    year: "[Year]",
    client: "[Client name]",
    mandate: "[Mandate description]",
    value: "[Value]",
    sector: "[Sector]",
  },
  {
    id: "mandate-03",
    year: "[Year]",
    client: "[Client name]",
    mandate: "[Mandate description]",
    value: "[Value]",
    sector: "[Sector]",
  },
  {
    id: "mandate-04",
    year: "[Year]",
    client: "[Client name]",
    mandate: "[Mandate description]",
    value: "[Value]",
    sector: "[Sector]",
  },
  {
    id: "mandate-05",
    year: "[Year]",
    client: "[Client name]",
    mandate: "[Mandate description]",
    value: "[Value]",
    sector: "[Sector]",
  },
];

export const MANDATES_NOTE = "Selected mandates shown with client consent.";
