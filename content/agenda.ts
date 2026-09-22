export type AgendaItem = {
  id: string;
  /** Display date. Sample events for the prototype. */
  when: string;
  title: string;
  format: string;
  location: string;
};

/**
 * SAMPLE CONTENT FOR THE PROTOTYPE.
 *
 * Written to be relevant to a Harare corporate finance boutique so the site
 * reads as finished during review. It names no real client, organisation or
 * person; clients appear only as sector descriptors. The footer marks the whole
 * site as a prototype with sample content. Replace with Envision's own,
 * client-consented material before launch.
 */
export const agenda: AgendaItem[] = [
  { id: "agenda-01", when: "15 October 2026", title: "Board briefing: preparing for a cross-border transaction", format: "Roundtable", location: "Harare" },
  { id: "agenda-02", when: "12 November 2026", title: "Raising capital in a higher-for-longer environment", format: "Webinar", location: "Online" },
  { id: "agenda-03", when: "3 December 2026", title: "Where AI earns its place in the finance function", format: "Breakfast briefing", location: "Harare" },
];
