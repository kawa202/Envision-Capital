export type AgendaItem = {
  id: string;
  /** "[Date]" until Envision confirms one. Never a real date we invented. */
  when: string;
  title: string;
  format: string;
  location: string;
};

/**
 * PLACEHOLDER EVENTS — NOTHING HERE IS SCHEDULED.
 *
 * An events list is the easiest thing on a professional-services site to get
 * badly wrong: a date, a venue and a title together read as a commitment, and
 * a reader who turns up to one that does not exist has been misled by the
 * website. So none of these carries a date at all. The slots demonstrate the
 * layout and wait for Envision to fill them.
 */
export const agenda: AgendaItem[] = [
  { id: "agenda-01", when: "[Date]", title: "[Event title]", format: "[Format]", location: "[Location]" },
  { id: "agenda-02", when: "[Date]", title: "[Event title]", format: "[Format]", location: "[Location]" },
  { id: "agenda-03", when: "[Date]", title: "[Event title]", format: "[Format]", location: "[Location]" },
];
