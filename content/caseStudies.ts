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
    slug: "pan-african-logistics-recapitalisation",
    client: "Pan-African logistics group",
    mandate: "Debt advisory and recapitalisation",
    outcome: "US$120m raised across three tranches, with tenor matched to fleet life",
    href: "/work/pan-african-logistics-recapitalisation",
    image: { src: "/images/gallery/trade-port.jpg", alt: "A container port seen from above." },
    unverified: true,
  },
  {
    slug: "regional-agribusiness-valuation",
    client: "Regional agribusiness",
    mandate: "Independent valuation",
    outcome: "Valuation upheld under counterparty challenge, unlocking a stalled shareholder exit",
    href: "/work/regional-agribusiness-valuation",
    image: { src: "/images/gallery/agriculture-maize.jpg", alt: "Young maize in rows at ground level." },
    unverified: true,
  },
  {
    slug: "financial-services-virtual-cfo",
    client: "Financial services group",
    mandate: "Virtual CFO",
    outcome: "Month-end close cut from 21 days to 6, ahead of a first external audit",
    href: "/work/financial-services-virtual-cfo",
    image: { src: "/images/services/virtual-cfo.jpg", alt: "A finance team in discussion around a table." },
    unverified: true,
  },
];

export const featuredCaseStudy = caseStudies[0];
export const secondaryCaseStudies = caseStudies.slice(1);
