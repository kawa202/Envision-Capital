export type FeaturedSlide = {
  slug: string;
  /** Short content-type label above the headline: "Our firm", "Insight". */
  kind: string;
  /** Topic label for the tab row along the bottom of the hero. */
  tab: string;
  headline: string;
  /** Where the headline goes. The headline is the slide's main link. */
  href: string;
  dek: string;
  /**
   * The slide's actions. In the default "links" presentation only a primary
   * that goes somewhere other than `href` is shown, as a quiet text link;
   * in "buttons" both render as buttons. See HERO_ACTIONS.
   */
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image: {
    src: string;
    alt: string;
    /**
     * CSS object-position for the crop. The hero is full-bleed, so a narrow
     * phone shows only a vertical strip of the photograph: point this at the
     * subject so it stays in frame.
     */
    focus?: string;
  };
  /** Photograph credit, kept with the image so licensing travels with it. */
  credit?: string;
};

/**
 * How the hero presents its actions.
 *
 * "links"   — the reference pattern: the headline is the link, with at most
 *             one quiet text link beneath it. No buttons in the hero.
 * "buttons" — the previous treatment: a gold primary button and an
 *             outlined secondary on every slide.
 *
 * One setting, so the client can compare both without a code change.
 */
export const HERO_ACTIONS: "links" | "buttons" = "links";

/**
 * Hero carousel.
 *
 * Slide 1 is the firm's positioning and is deliberately first: a visitor who
 * looks for five seconds and leaves must still learn who Envision is. The
 * slides after it rotate the firm's thinking, each tied to a capability
 * Envision actually sells. Every `href` resolves to a real route.
 *
 * PLACEHOLDER PHOTOGRAPHY. Slides 1 and 2 use Unsplash images (free for
 * commercial use under the Unsplash License, no attribution required);
 * slide 3 is a crop of the library image gallery/harare-city.jpg. Replace
 * with commissioned photography of Envision's own people before launch —
 * see docs/ART-DIRECTION.md.
 */
export const featuredSlides: FeaturedSlide[] = [
  {
    slug: "positioning",
    kind: "Our firm",
    tab: "The firm",
    headline: "Financial clarity for decisions that matter.",
    href: "/what-we-do",
    /* Tightened for the hero (30 words → 20): the full positioning line
       stays in site.ts, where it serves as the meta description. */
    dek: "We help boards, investors, lenders and business leaders make complex financial decisions with rigour, insight and clarity.",
    primaryCta: { label: "Talk to Envision", href: "/contact" },
    secondaryCta: { label: "Explore our capabilities", href: "/what-we-do" },
    image: {
      src: "/images/hero/advisory-meeting.jpg",
      alt: "Two advisers in conversation at a table by the window, a laptop showing charts between them.",
      focus: "58% 20%",
    },
    credit: "Vitaly Gariev / Unsplash",
  },
  {
    slug: "ai-finance-readiness",
    kind: "Insight",
    tab: "AI & finance",
    headline: "AI is changing finance. Is your finance function ready?",
    href: "/what-we-do#ai-transformation",
    dek: "From automation and reporting to forecasting and decision support, AI is reshaping what modern finance teams can deliver.",
    primaryCta: { label: "Explore AI Finance Transformation", href: "/what-we-do#ai-transformation" },
    secondaryCta: { label: "All insights", href: "/insights" },
    image: {
      src: "/images/hero/team-table.jpg",
      alt: "A finance team in a working session around a white table in a bright office.",
      focus: "55% 30%",
    },
    credit: "Ninthgrid / Unsplash",
  },
  {
    slug: "cost-of-capital",
    kind: "Insight",
    tab: "Capital markets",
    headline: "The cost of capital in a higher-for-longer regime",
    href: "/insights/cost-of-capital",
    dek: "When the discount rate stops falling, growth has to be underwritten differently — and most funding cases have not been rebuilt for it.",
    primaryCta: { label: "Read the insight", href: "/insights/cost-of-capital" },
    secondaryCta: { label: "All insights", href: "/insights" },
    image: {
      src: "/images/hero/harare-day.jpg",
      alt: "Central Harare from above on a clear day, the city's office towers against a bright sky.",
      focus: "40% 55%",
    },
  },
];

/**
 * Milliseconds between automatic advances. Seven seconds lets a reader get
 * through a headline and standfirst before the slide moves. Rotation also
 * stops on hover over the controls, on focus, when the reader presses pause,
 * and entirely under prefers-reduced-motion.
 */
export const SLIDE_INTERVAL_MS = 7000;
