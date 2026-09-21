/**
 * The four topics /insights filters by. A fifth would need a fifth column in
 * the filter row and a reason to exist; these cover what the firm publishes.
 */
export const TOPICS = ["Capital", "Transactions", "AI & Intelligence", "Reporting"] as const;
export type Topic = (typeof TOPICS)[number];

export type Insight = {
  slug: string;
  category: Topic;
  /** ISO 8601. Formatted for display at render time. */
  date: string;
  title: string;
  dek: string;
  href: string;
  /** Card photograph. Placeholder photography until Envision commissions its own. */
  image?: { src: string; alt: string };
};

/**
 * PLACEHOLDER ARTICLES.
 *
 * Titles, deks and dates demonstrate the editorial hierarchy. No article
 * exists behind any `href`, no date here records a real publication, and
 * none of this has been through authorship or compliance review. Replace
 * before launch.
 */
export const insights: Insight[] = [
  /* The three pieces featured on the homepage, from the approved design
     direction. Photography is its Unsplash set. */
  {
    slug: "african-capital-markets-volatility",
    category: "Capital",
    date: "2026-09-08",
    title: "Navigating volatility in African capital markets.",
    dek: "How institutional investors are repositioning their portfolios for a new era of macroeconomic uncertainty.",
    href: "/insights/african-capital-markets-volatility",
    image: {
      src: "/images/unsplash/1454165804606-c3d57bc86b40.jpg",
      alt: "Two people working through hand-drawn figures on paper between open laptops.",
    },
  },
  {
    slug: "cross-border-ma-rules",
    category: "Transactions",
    date: "2026-08-25",
    title: "The new rules of cross-border M&A.",
    dek: "Regulatory shifts and geopolitical tensions are rewriting the playbook for successful cross-border deals.",
    href: "/insights/cross-border-ma-rules",
    image: {
      src: "/images/unsplash/1507679799987-c73779587ccf.jpg",
      alt: "A man in a navy suit buttoning his jacket at the foot of a staircase.",
    },
  },
  {
    slug: "financing-infrastructure",
    category: "Capital",
    date: "2026-08-11",
    title: "Financing the next wave of infrastructure.",
    dek: "Bridging the gap between public sector ambition and private capital deployment in emerging economies.",
    href: "/insights/financing-infrastructure",
    image: {
      src: "/images/unsplash/1551288049-bebda4e38f71.jpg",
      alt: "A laptop screen showing analytics charts beside a plant.",
    },
  },
  {
    slug: "cost-of-capital",
    category: "Capital",
    date: "2026-08-18",
    title: "The cost of capital in a higher-for-longer regime",
    dek: "Why boards should revisit hurdle rates before the next raise.",
    href: "/insights/cost-of-capital",
    image: { src: "/images/gallery/harare-cbd-towers.jpg", alt: "Office towers in the Harare central business district." },
  },
  {
    slug: "mid-market-multiples",
    category: "Transactions",
    date: "2026-07-07",
    title: "Valuation multiples for mid-market African businesses",
    dek: "A practical framework for benchmarking private companies.",
    href: "/insights/mid-market-multiples",
    image: { src: "/images/gallery/industry-warehouse.jpg", alt: "Stocked warehouse racking in a mid-sized distribution business." },
  },
  {
    slug: "board-cross-border",
    category: "Transactions",
    date: "2026-06-02",
    title: "Preparing a board for a cross-border transaction",
    dek: "The five questions directors should ask before signing an NDA.",
    href: "/insights/board-cross-border",
    image: { src: "/images/gallery/harare-city.jpg", alt: "Harare seen from above, the city centre under a clear sky." },
  },
  {
    slug: "close-the-books-faster",
    category: "Reporting",
    date: "2026-05-12",
    title: "What a slow month-end is really telling you",
    dek: "Reporting lag is rarely an accounting problem. It is usually a decision problem.",
    href: "/insights/close-the-books-faster",
    image: { src: "/images/gallery/technology.jpg", alt: "A finance workstation, screens showing management reporting." },
  },
  {
    slug: "ai-in-the-finance-function",
    category: "AI & Intelligence",
    date: "2026-04-21",
    title: "Where AI actually earns its place in a finance function",
    dek: "Not in the forecast. In the reconciliation nobody wants to do twice.",
    href: "/insights/ai-in-the-finance-function",
    image: { src: "/images/services/ai-transformation.jpg", alt: "An analyst reviewing a reconciliation on screen." },
  },
  {
    slug: "model-you-can-defend",
    category: "AI & Intelligence",
    date: "2026-03-17",
    title: "A model you can defend beats a model that is merely right",
    dek: "Investment committees do not approve conclusions. They approve reasoning.",
    href: "/insights/model-you-can-defend",
    image: { src: "/images/gallery/technology.jpg", alt: "A workstation showing a financial model under review." },
  },
  {
    slug: "debt-before-equity",
    category: "Capital",
    date: "2026-02-09",
    title: "When debt is the cheaper answer and nobody has asked",
    dek: "Dilution is a decision, not a default. It deserves the same scrutiny as a covenant.",
    href: "/insights/debt-before-equity",
    image: { src: "/images/gallery/energy-grid.jpg", alt: "Transmission lines crossing open country at sunset." },
  },
];
