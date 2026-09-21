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

export const INTRO = {
  eyebrow: "Who We Are",
  heading: "We bring clarity to complexity.",
  paragraphs: [
    "Envision Capital is an independent advisory firm. We partner with boards, management teams, and investors to navigate their most critical financial decisions.",
    "Our approach is rigorous and evidence-based. We don't just provide advice; we build the financial architecture that supports your strategic ambitions.",
  ],
  link: { text: "About the firm", href: "/about" },
};

export const CAPABILITIES = {
  eyebrow: "Our Capabilities",
  heading: "How we help you move forward.",
  items: [
    {
      number: "01",
      title: "Mergers & Acquisitions",
      body: "End-to-end transaction support, from target identification and valuation to negotiation and post-merger integration.",
      href: "/services#mergers-acquisitions",
    },
    {
      number: "02",
      title: "Capital Raising",
      body: "Structuring and executing debt and equity raises. We connect you with the right capital partners to fuel your growth.",
      href: "/services#capital-advisory",
    },
    {
      number: "03",
      title: "Strategic Advisory",
      body: "Board-level counsel on capital allocation, restructuring, and long-term financial strategy in complex environments.",
      href: "/services#corporate-finance",
    },
  ],
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
