/**
 * Writes public/search-index.json from the content collections.
 *
 * The index used to be a TypeScript module the overlay imported, which meant
 * the bundler inlined every entry into a JavaScript chunk. As JSON fetched on
 * demand it leaves the bundle entirely and the browser can cache it
 * separately from the code — and a static host serves it without a search
 * server, which is the whole constraint here.
 *
 * Run before `next build` so the file is in place for the export.
 */
import { writeFileSync } from "node:fs";

/* The content files are TypeScript. Node strips the types on import, which
   is why this can read them directly instead of duplicating the data. */
const { services } = await import("../content/services.ts");
const { industries } = await import("../content/industries.ts");
const { insights } = await import("../content/insights.ts");
const { news } = await import("../content/news.ts");
const { caseStudies } = await import("../content/caseStudies.ts");

/** Standing pages, which are not in any collection. */
const pages = [
  { title: "Services", kind: "Page", href: "/services", summary: "Capability across the decision, not one part of it.", keywords: "capabilities advisory what we do" },
  { title: "Industries", kind: "Page", href: "/industries", summary: "Sector insight and financial discipline across the region.", keywords: "sectors coverage" },
  { title: "The Envision Method", kind: "Page", href: "/method", summary: "Diagnose, Architect, Validate, Transform, Mobilise, Sustain.", keywords: "process approach methodology" },
  { title: "Selected work", kind: "Page", href: "/work", summary: "The structure of the mandates Envision undertakes.", keywords: "case studies clients" },
  { title: "Newsroom", kind: "Page", href: "/newsroom", summary: "Announcements from the firm.", keywords: "press releases news" },
  { title: "On the agenda", kind: "Page", href: "/events", summary: "Briefings, roundtables and speaking appearances.", keywords: "events webinars roundtables" },
  { title: "About us", kind: "Page", href: "/about", summary: "A firm built on earned trust.", keywords: "firm leadership people purpose" },
  { title: "Careers", kind: "Page", href: "/careers", summary: "Working at Envision Capital.", keywords: "jobs roles vacancies hiring" },
  { title: "Contact", kind: "Page", href: "/contact", summary: "Talk to Envision about a transaction, a valuation or a board view.", keywords: "enquiry email phone harare" },
  { title: "Book a session", kind: "Page", href: "/book", summary: "Choose a service and a time. Demonstration only.", keywords: "booking appointment consultation demo" },
  { title: "Client portal", kind: "Page", href: "/portal", summary: "Where a client sees their engagements. Demonstration only.", keywords: "login sign in account" },
  { title: "Fraud awareness", kind: "Page", href: "/fraud-awareness", summary: "How to tell whether a message claiming to come from Envision Capital is genuine.", keywords: "scam phishing security banking details whatsapp" },
  { title: "Legal", kind: "Page", href: "/legal", summary: "Privacy, terms of use and regulatory position.", keywords: "privacy terms cookies disclaimer" },
];

const index = [
  ...services.map((s) => ({
    title: s.name, kind: "Service", href: `/services#${s.id}`,
    summary: s.summary, keywords: `${s.group} ${s.deliverables.join(" ")}`,
  })),
  ...industries.map((i) => ({
    title: i.name, kind: "Industry", href: "/industries",
    summary: i.focus, keywords: i.constraint,
  })),
  ...insights.map((i) => ({
    title: i.title, kind: "Insight", href: i.href,
    summary: i.dek, keywords: i.category,
  })),
  ...news.map((n) => ({
    title: n.title, kind: "Announcement", href: n.href,
    summary: `${n.location} — ${n.author}`,
  })),
  ...caseStudies.map((c) => ({
    title: c.title, kind: "Case study", href: c.href,
    summary: `${c.client} · ${c.mandate}`,
  })),
  ...pages,
];

writeFileSync("public/search-index.json", JSON.stringify(index));
console.log(`build-search-index: ${index.length} entries → public/search-index.json`);
