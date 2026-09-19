export type Insight = {
  slug: string;
  category: string;
  title: string;
  dek: string;
  href: string;
  /** Card photograph. Placeholder photography until Envision commissions its own. */
  image?: { src: string; alt: string };
};

/**
 * PLACEHOLDER ARTICLES.
 *
 * Titles and deks demonstrate the editorial hierarchy. No article exists
 * behind any `href`, and none of this has been through authorship or
 * compliance review. Replace before launch.
 */
export const insights: Insight[] = [
  {
    slug: "cost-of-capital",
    category: "Capital Markets",
    title: "The cost of capital in a higher-for-longer regime",
    dek: "Why boards should revisit hurdle rates before the next raise.",
    href: "/insights/cost-of-capital",
    image: { src: "/images/gallery/harare-cbd-towers.jpg", alt: "Office towers in the Harare central business district." },
  },
  {
    slug: "mid-market-multiples",
    category: "Valuation",
    title: "Valuation multiples for mid-market African businesses",
    dek: "A practical framework for benchmarking private companies.",
    href: "/insights/mid-market-multiples",
    image: { src: "/images/gallery/industry-warehouse.jpg", alt: "Stocked warehouse racking in a mid-sized distribution business." },
  },
  {
    slug: "board-cross-border",
    category: "M&A",
    title: "Preparing a board for a cross-border transaction",
    dek: "The five questions directors should ask before signing an NDA.",
    href: "/insights/board-cross-border",
    image: { src: "/images/gallery/harare-city.jpg", alt: "Harare seen from above, the city centre under a clear sky." },
  },
];
