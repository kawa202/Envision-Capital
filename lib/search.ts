import { caseStudies } from "@/content/caseStudies";
import { industries } from "@/content/industries";
import { insights } from "@/content/insights";
import { news } from "@/content/news";
import { services } from "@/content/services";

/**
 * Site search for a static export.
 *
 * There is no search server on GitHub Pages, so the index is the content
 * collections themselves, flattened at module load. It is small — a few
 * dozen entries — and it is only ever loaded alongside the overlay, which
 * is dynamically imported the first time someone opens search. Nothing of
 * this is in the bundle every page pays for.
 */
export type SearchResult = {
  title: string;
  kind: string;
  href: string;
  summary: string;
  /** Extra words matched against but not shown. */
  keywords?: string;
};

const pages: SearchResult[] = [
  {
    title: "Services",
    kind: "Page",
    href: "/what-we-do",
    summary: "Capability across the decision, not one part of it.",
    keywords: "capabilities what we do advisory",
  },
  {
    title: "Industries",
    kind: "Page",
    href: "/industries",
    summary: "Sector insight and financial discipline across the region.",
    keywords: "sectors coverage",
  },
  {
    title: "The Envision Method",
    kind: "Page",
    href: "/method",
    summary: "Diagnose, Architect, Validate, Transform, Mobilise, Sustain.",
    keywords: "process approach methodology",
  },
  {
    title: "Selected work",
    kind: "Page",
    href: "/work",
    summary: "The structure of the mandates Envision undertakes.",
    keywords: "case studies clients",
  },
  {
    title: "About us",
    kind: "Page",
    href: "/about",
    summary: "A firm built on earned trust.",
    keywords: "firm leadership people purpose",
  },
  {
    title: "Careers",
    kind: "Page",
    href: "/careers",
    summary: "Working at Envision Capital.",
    keywords: "jobs roles vacancies hiring",
  },
  {
    title: "Contact",
    kind: "Page",
    href: "/contact",
    summary: "Talk to Envision about a transaction, a valuation or a board view.",
    keywords: "enquiry email phone harare",
  },
  {
    title: "Book a session",
    kind: "Page",
    href: "/book",
    summary: "Choose a service and a time. Demonstration only.",
    keywords: "booking appointment consultation demo",
  },
];

export const searchIndex: SearchResult[] = [
  ...services.map((service) => ({
    title: service.name,
    kind: "Service",
    href: `/what-we-do#${service.id}`,
    summary: service.summary,
    keywords: `${service.group} ${service.deliverables.join(" ")}`,
  })),
  ...industries.map((industry) => ({
    title: industry.name,
    kind: "Industry",
    href: "/industries",
    summary: industry.focus,
    keywords: industry.constraint,
  })),
  ...insights.map((insight) => ({
    title: insight.title,
    kind: "Insight",
    href: insight.href,
    summary: insight.dek,
    keywords: insight.category,
  })),
  ...news.map((item) => ({
    title: item.title,
    kind: "Announcement",
    href: item.href,
    summary: `${item.location} — ${item.author}`,
  })),
  ...caseStudies.map((item) => ({
    title: item.outcome,
    kind: "Case study",
    href: item.href,
    summary: `${item.client} · ${item.mandate}`,
  })),
  ...pages,
];

/**
 * Every term has to appear somewhere in the entry, so "valuation africa"
 * narrows rather than widens. A title hit outranks a body hit; beyond that
 * the index order stands, which puts services above pages.
 */
export function search(query: string, limit = 8): SearchResult[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  const scored: { entry: SearchResult; score: number }[] = [];

  for (const entry of searchIndex) {
    const title = entry.title.toLowerCase();
    const body = `${entry.summary} ${entry.keywords ?? ""} ${entry.kind}`.toLowerCase();
    if (!terms.every((term) => title.includes(term) || body.includes(term))) continue;

    const score = terms.reduce(
      (total, term) => total + (title.includes(term) ? 2 : 1),
      0,
    );
    scored.push({ entry, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.entry);
}
