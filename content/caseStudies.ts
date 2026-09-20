export type CaseStudy = {
  slug: string;
  client: string;
  mandate: string;
  /** Headline of the engagement. */
  title: string;
  /** What changed, in one line. */
  outcome: string;
  href: string;
  /** Card photograph. Placeholder photography until Envision commissions its own. */
  image?: { src: string; alt: string };
  /** Marks unverified seed content. */
  unverified?: boolean;
};

/**
 * PLACEHOLDER MANDATES — NOT COMPLETED ENVISION WORK.
 *
 * Every field below is an empty slot. No client, sector, mandate, figure or
 * outcome here represents work Envision Capital has performed, and none is
 * invented either — earlier drafts of this file carried fabricated
 * transaction values and they were removed. Replace with verified,
 * client-consented case studies before launch. Where a client cannot be
 * named, keep the sector-descriptor pattern rather than inventing a company.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "case-study-01",
    client: "[Client or sector]",
    mandate: "[Mandate type]",
    title: "[Case study title]",
    outcome: "[Outcome]",
    href: "/work/case-study-01",
    image: { src: "/images/gallery/trade-port.jpg", alt: "A container port seen from above." },
    unverified: true,
  },
  {
    slug: "case-study-02",
    client: "[Client or sector]",
    mandate: "[Mandate type]",
    title: "[Case study title]",
    outcome: "[Outcome]",
    href: "/work/case-study-02",
    image: { src: "/images/gallery/agriculture-maize.jpg", alt: "Young maize in rows at ground level." },
    unverified: true,
  },
  {
    slug: "case-study-03",
    client: "[Client or sector]",
    mandate: "[Mandate type]",
    title: "[Case study title]",
    outcome: "[Outcome]",
    href: "/work/case-study-03",
    image: { src: "/images/services/virtual-cfo.jpg", alt: "A finance team in discussion around a table." },
    unverified: true,
  },
  {
    slug: "case-study-04",
    client: "[Client or sector]",
    mandate: "[Mandate type]",
    title: "[Case study title]",
    outcome: "[Outcome]",
    href: "/work/case-study-04",
    image: { src: "/images/gallery/energy-grid.jpg", alt: "Transmission lines crossing open country at sunset." },
    unverified: true,
  },
  {
    slug: "case-study-05",
    client: "[Client or sector]",
    mandate: "[Mandate type]",
    title: "[Case study title]",
    outcome: "[Outcome]",
    href: "/work/case-study-05",
    image: { src: "/images/services/mergers-valuation.jpg", alt: "Two parties in negotiation across a table." },
    unverified: true,
  },
];

export const featuredCaseStudy = caseStudies[0];
export const secondaryCaseStudies = caseStudies.slice(1);
