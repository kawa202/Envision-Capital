export type CaseStudy = {
  slug: string;
  client: string;
  mandate: string;
  outcome: string;
  href: string;
  /** Card photograph. Placeholder photography until Envision commissions its own. */
  image?: { src: string; alt: string };
  /** Marks fabricated seed content. */
  unverified?: boolean;
};

/**
 * ⚠️  FABRICATED MANDATES — NOT COMPLETED ENVISION WORK.
 *
 * Every entry below is invented to demonstrate layout, figures included. No
 * client, transaction or outcome represents work Envision Capital has
 * performed. Replace with verified, client-consented case studies before
 * launch. Where a client cannot be named, keep the sector-descriptor pattern
 * used here rather than inventing a company name.
 *
 * The hero features a separate mandate (see `content/featured.ts`); these
 * three deliberately do not duplicate it.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "case-study-01",
    client: "[Client or sector]",
    mandate: "[Mandate type]",
    outcome: "[Case study title — the outcome in one line]",
    href: "/work/case-study-01",
    image: { src: "/images/gallery/trade-port.jpg", alt: "A container port seen from above." },
    unverified: true,
  },
  {
    slug: "case-study-02",
    client: "[Client or sector]",
    mandate: "[Mandate type]",
    outcome: "[Case study title — the outcome in one line]",
    href: "/work/case-study-02",
    image: { src: "/images/gallery/agriculture-maize.jpg", alt: "Young maize in rows at ground level." },
    unverified: true,
  },
  {
    slug: "case-study-03",
    client: "[Client or sector]",
    mandate: "[Mandate type]",
    outcome: "[Case study title — the outcome in one line]",
    href: "/work/case-study-03",
    image: { src: "/images/services/virtual-cfo.jpg", alt: "A finance team in discussion around a table." },
    unverified: true,
  },
];

export const featuredCaseStudy = caseStudies[0];
export const secondaryCaseStudies = caseStudies.slice(1);
