/**
 * Homepage content, taken from the approved design direction
 * (Envision_Prototype.html) and kept word for word, with each link pointed at
 * the real page it belongs to rather than an in-page anchor.
 *
 * Photography is the reference's Unsplash set, used as supplied. Images are
 * stored as bare photo URLs; lib/image-loader.ts and next/image ask Unsplash
 * for the width each screen needs. Alt text describes what is actually in
 * each frame.
 */
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

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
 * - The reference's figures (US$2.5bn advised, 12 countries, six named
 *   transactions with US$ values) are invented. They are bracketed slots
 *   until Envision supplies real, consented numbers. The one figure the
 *   client has stated — 20+ years of experience — is used.
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
    { value: "[US$ X]", label: "Transactions Advised" },
    { value: "[X]", label: "Countries Covered" },
    /* Client-stated. The reference's "25+ combined" was not. */
    { value: "20+", label: "Years of Experience" },
  ],
  link: { text: "Learn more about us", href: "/about" },
  image: {
    src: unsplash("1444723121867-7a241cacace9"),
    alt: "A city at dusk seen from the hills, its downtown towers lit against a deep blue sky.",
  },
};

export const TRANSACTIONS = {
  eyebrow: "Highlight Transactions",
  heading: "Selected mandates.",
  /* Mandate types Envision actually undertakes, with every fact left open. */
  items: [
    "Capital raise",
    "Acquisition",
    "Debt restructuring",
    "Growth equity placement",
    "Company valuation",
    "Sell-side M&A",
  ].map((type) => ({
    value: "[US$ value]",
    title: `${type} — [Client or sector]`,
    body: "[One line on the mandate and its outcome, as the client has agreed it may be described.]",
    href: "/work",
  })),
  note: "Selected mandates shown with client consent. [MANDATES REQUIRED] — clients, values and outcomes to be supplied by Envision.",
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
