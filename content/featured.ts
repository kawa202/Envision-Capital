export type Slide = {
  /** Stable id, used for the tab/panel wiring. */
  id: string;
  /** Tab text. Short enough to sit in a row on a phone. */
  label: string;
  image: {
    /**
     * A string path, not a static import. The Pages export maps these onto
     * pre-generated WebP variants under /_img/<width>/ (see
     * lib/image-loader.ts); a static import produces a /_next/static/media
     * path the loader cannot map, and the build would ship the full-size
     * JPEG instead.
     */
    src: string;
    alt: string;
    /**
     * object-position for the crop. The scrim darkens the left of the frame
     * and leaves the right clear, so point this at the subject to keep them
     * out of the text column.
     */
    focus?: string;
  };
  headline: string;
  /** One sentence. Two lines on desktop at most. */
  body: string;
  /** A secondary action. The header's brass button is the primary one. */
  cta: { text: string; href: string };
};

/**
 * Hero slides. Three, and no more.
 *
 * Slide one is the firm's positioning and carries the page's h1: a visitor
 * who looks for five seconds must still learn who Envision is. The two after
 * it are insight-led, each tied to something the firm actually sells.
 *
 * Photography is candid and unstaged. The frames are also the three lightest
 * in the library that take a full-bleed crop — the hero is the only image a
 * reader is guaranteed to pay for, so weight is part of the art direction.
 * Placeholder until Envision commissions its own.
 */
export const SLIDES: Slide[] = [
  {
    id: "the-firm",
    label: "The firm",
    image: {
      src: "/images/hero/advisory-meeting.jpg",
      alt: "Two advisers in conversation at a table by a window, a laptop of charts open between them.",
      focus: "62% 25%",
    },
    headline: "Financial clarity for decisions that matter.",
    body: "We turn commercial intent into a financial case that holds when someone sets out to dismantle it.",
    cta: { text: "About the firm", href: "/about" },
  },
  {
    id: "ai-and-finance",
    label: "AI & finance",
    image: {
      src: "/images/hero/team-table.jpg",
      alt: "A finance team mid-discussion around a table, notes and screens in front of them.",
      focus: "58% 30%",
    },
    headline: "AI is changing finance. Is your finance function ready?",
    body: "From reconciliation to forecasting, the question is not what the tools can do but which of your decisions they can be trusted to support.",
    cta: { text: "Read the insight", href: "/insights/ai-in-the-finance-function" },
  },
  {
    id: "capital-markets",
    label: "Capital markets",
    image: {
      src: "/images/hero/positioning-boardroom.jpg",
      alt: "A board in session around a long table, papers open in front of them.",
      focus: "55% 35%",
    },
    headline: "When the discount rate stops falling, growth is underwritten differently.",
    body: "Most funding cases were built for a cheaper decade and have not been rebuilt for this one.",
    cta: { text: "Capital advisory", href: "/services#capital-advisory" },
  },
];

/**
 * Milliseconds between automatic advances. Seven seconds lets a reader get
 * through a headline and a sentence before anything moves. Rotation also
 * stops on hover, on focus inside the hero, when the reader presses pause or
 * picks a tab, and entirely under prefers-reduced-motion.
 */
export const SLIDE_INTERVAL_MS = 7000;
