/**
 * Homepage content, taken from the approved design direction
 * (Envision_Prototype.html) and kept word for word, with each link pointed at
 * the real page it belongs to rather than an in-page anchor.
 *
 * Photography is the reference's Unsplash set (Unsplash License), downloaded
 * at 2400px and served from this site through the same WebP pipeline as
 * every other photograph. Loading them from Unsplash's CDN meant a second
 * connection on the critical path of the hero image. Alt text describes what
 * is actually in each frame.
 */
const unsplash = (id: string) => `/images/unsplash/${id}.jpg`;

export type HeroSlide = {
  id: string;
  tag: string;
  headline: string;
  subheadline: string;
  cta: { text: string; href: string };
  image: { src: string; alt: string };
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "advisory",
    tag: "Advisory",
    headline: "Financial clarity for decisions that matter.",
    subheadline:
      "We turn commercial intent into a rigorous financial case that withstands scrutiny in today's complex risk environment.",
    cta: { text: "Learn more", href: "/about" },
    image: {
      src: unsplash("1497366216548-37526070297c"),
      alt: "An empty modern office corridor between glass-walled rooms, dark blue walls and a pale polished floor.",
    },
  },
  {
    id: "capital-raising",
    tag: "Capital Raising",
    headline: "Capital to fuel your strategic ambitions.",
    subheadline:
      "We structure and execute debt and equity raises, connecting you with the right capital partners to accelerate your growth.",
    cta: { text: "Learn more", href: "/services#capital-advisory" },
    image: {
      src: unsplash("1486406146926-c627a92ad1ab"),
      alt: "Looking up at dark glass office towers against an overcast sky.",
    },
  },
  {
    id: "market-insights",
    tag: "Market Insights",
    headline: "Insights that shape the future.",
    subheadline:
      "Exploring the trends, risks, and opportunities defining the next era of African capital markets.",
    cta: { text: "Learn more", href: "/insights" },
    image: {
      src: unsplash("1451187580459-43490279c0fa"),
      alt: "City lights spread across a continent, seen from orbit at night.",
    },
  },
];

/** Milliseconds between automatic advances, as in the reference. */
export const HERO_INTERVAL_MS = 6000;

/**
 * The sections below follow the second design reference
 * (deepseek_html_20260921_ccfe53.html): its layout, order and photography,
 * copied as given. Its words are not all copied, and on purpose:
 *
 * - The three pillars in the reference are Rothschild & Co's businesses,
 *   partly in Rothschild's own wording ("Five Arrows" became "Envision
 *   Arrows"). Envision does not manage wealth or invest its own capital —
 *   the firm states that it advises only. The cards carry Envision's own
 *   three practice families instead, in the copy from its live site.
 * - Figures and mandates below are ILLUSTRATIVE, written for design review
 *   at the scale of a Harare advisory boutique. They name no client and
 *   describe no real transaction, and the page labels them as examples.
 *   Replace with Envision's own, client-consented figures before launch.
 *   The one figure the client has stated — 20+ years — is real.
 */
export const PILLARS = {
  eyebrow: "What We Do",
  heading: "Three complementary capabilities.",
  items: [
    {
      title: "Transactions & Capital",
      body: "Capital raising, M&A and valuation – prepared for the scrutiny that decides them.",
      link: { text: "Explore Transactions & Capital", href: "/services#corporate-finance" },
    },
    {
      title: "Finance & Performance",
      body: "Reporting, CFO-grade oversight and restructuring that leadership can act on.",
      link: { text: "Explore Finance & Performance", href: "/services#virtual-cfo" },
    },
    {
      title: "Intelligence & Transformation",
      body: "AI applied to the finance function where it pays – and the capability to run it.",
      link: { text: "Explore Intelligence & Transformation", href: "/services#ai-transformation" },
    },
  ],
};

export const HERITAGE = {
  eyebrow: "Our Heritage & Scale",
  heading: "Built on more than two decades of experience in African finance.",
  body: "Envision Capital is an independent financial advisory firm, built on the experience of its founders and a shared commitment to rigorous, conflict-free advice. We advise — we do not take principal positions, manage funds or broker products — and that independence is what makes the counsel worth having.",
  metrics: [
    { value: "US$500m+", label: "Transactions Advised" },
    { value: "6", label: "Countries Covered" },
    /* Client-stated. */
    { value: "20+", label: "Years of Experience" },
  ],
  metricsNote: "Illustrative figures for review.",
  link: { text: "Learn more about us", href: "/about" },
  image: {
    src: "/images/hero/harare-day.jpg",
    alt: "Central Harare on a bright day: the city-centre skyline and red-roofed buildings under white cloud.",
  },
};

export const TRANSACTIONS = {
  eyebrow: "Highlight Transactions",
  heading: "Selected mandates.",
  /* Illustrative: sector descriptors only, no client names, values at the
     scale of the mandates a Harare advisory boutique takes on. */
  items: [
    {
      value: "US$18m",
      title: "Capital raise for a regional agro-processor",
      body: "Structured a senior debt facility funding plant expansion and working capital.",
    },
    {
      value: "US$32m",
      title: "Acquisition in financial services",
      body: "Buy-side advice and valuation on a controlling stake in a microfinance lender.",
    },
    {
      value: "US$12m",
      title: "Debt restructuring for a manufacturer",
      body: "Reset bank facilities and supplier arrears into a repayment profile the business can carry.",
    },
    {
      value: "US$9m",
      title: "Growth equity for a healthcare provider",
      body: "Built the investment case and ran the process for a minority equity raise.",
    },
    {
      value: "US$45m",
      title: "Independent valuation for a mining services group",
      body: "Valuation supporting a shareholder restructuring and the board's decision on it.",
    },
    {
      value: "US$24m",
      title: "Sale of a logistics business",
      body: "Ran a competitive sale process to a strategic acquirer.",
    },
  ].map((item) => ({ ...item, href: "/work" })),
  note: "Illustrative examples for review. Envision's own mandates, shown with client consent, replace these before launch.",
};

export const INSIGHTS_SECTION = {
  eyebrow: "Latest Thinking",
  heading: "Insights & Perspectives",
  /* Slugs in content/insights.ts, so each card opens a real page. The tag is
     the reference's own label for the card. */
  cards: [
    { slug: "african-capital-markets-volatility", tag: "Market Outlook" },
    { slug: "cross-border-ma-rules", tag: "Transaction Advisory" },
    { slug: "financing-infrastructure", tag: "Infrastructure" },
  ],
};

export const CLOSING_CTA = {
  heading: "Ready to build a financial case that withstands scrutiny?",
  body: "Whether you are raising capital, considering a transaction, or refining your financial strategy, our team is ready to help.",
  cta: { text: "Discuss a mandate", href: "/contact" },
};

export const FOOTER_BLURB =
  "Independent financial advisory for boards, management teams, and investors across Africa.";
