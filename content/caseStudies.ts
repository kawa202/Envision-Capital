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
 * SAMPLE CONTENT FOR THE PROTOTYPE.
 *
 * Written to be relevant to a Harare corporate finance boutique so the site
 * reads as finished during review. It names no real client, organisation or
 * person; clients appear only as sector descriptors. The footer marks the whole
 * site as a prototype with sample content. Replace with Envision's own,
 * client-consented material before launch.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "case-study-01",
    client: "Regional agro-processor",
    mandate: "Capital raise",
    title: "Funding capacity expansion on terms matched to the season",
    outcome: "Senior debt facility, US$18m",
    href: "/work/case-study-01",
    image: { src: "/images/gallery/trade-port.jpg", alt: "A container port seen from above." },
  },
  {
    slug: "case-study-02",
    client: "Financial services group",
    mandate: "Acquisition",
    title: "Buy-side advice on a controlling stake in a microfinance lender",
    outcome: "Acquisition completed, US$32m",
    href: "/work/case-study-02",
    image: { src: "/images/gallery/agriculture-maize.jpg", alt: "Young maize in rows at ground level." },
  },
  {
    slug: "case-study-03",
    client: "Manufacturer",
    mandate: "Debt restructuring",
    title: "Resetting bank facilities and supplier arrears",
    outcome: "Sustainable repayment profile, US$12m",
    href: "/work/case-study-03",
    image: { src: "/images/services/virtual-cfo.jpg", alt: "A finance team in discussion around a table." },
  },
  {
    slug: "case-study-04",
    client: "Healthcare provider",
    mandate: "Growth equity",
    title: "A minority raise to fund new facilities",
    outcome: "Equity placed, founders retain control, US$9m",
    href: "/work/case-study-04",
    image: { src: "/images/gallery/energy-grid.jpg", alt: "Transmission lines crossing open country at sunset." },
  },
  {
    slug: "case-study-05",
    client: "Mining services group",
    mandate: "Company valuation",
    title: "An independent view of value for a shareholder restructuring",
    outcome: "Board-approved valuation, US$45m",
    href: "/work/case-study-05",
    image: { src: "/images/services/mergers-valuation.jpg", alt: "Two parties in negotiation across a table." },
  },
];

export const featuredCaseStudy = caseStudies[0];
export const secondaryCaseStudies = caseStudies.slice(1);
