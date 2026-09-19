export type NewsItem = {
  slug: string;
  /** ISO 8601. Formatted for display at render time. */
  date: string;
  title: string;
  location: string;
  author: string;
  href: string;
  /** Card photograph. Placeholder photography until Envision commissions its own. */
  image?: { src: string; alt: string };
  /** Marks fabricated seed content. See the warning below. */
  unverified?: boolean;
};

/**
 * ⚠️  FABRICATED ANNOUNCEMENTS — NOT REAL ENVISION PRESS RELEASES.
 *
 * Supplied as seed content to demonstrate the newsroom layout. Three of these
 * make specific, externally checkable claims that carry real exposure if they
 * ship:
 *
 *   1. A named transaction value (US$120m).
 *   2. An office/coverage footprint (Zambia and Botswana).
 *   3. An industry award ("Financial Advisor of the Year") — awards are the
 *      most easily disproved claim on this list, and the one most likely to
 *      draw a complaint from the awarding body.
 *
 * `author` values are named individuals. Confirm every name, date, figure and
 * award with Envision before this page is published.
 */
export const news: NewsItem[] = [
  {
    slug: "120m-recapitalisation",
    date: "2026-07-29",
    title: "Envision Capital advises on US$120m industrial recapitalisation",
    location: "Harare, Zimbabwe",
    author: "T. Moyo",
    href: "/newsroom/120m-recapitalisation",
    image: { src: "/images/services/advisory-products.jpg", alt: "Advisers reviewing transaction documents across a table." },
    unverified: true,
  },
  {
    slug: "regional-expansion",
    date: "2026-06-14",
    title: "Envision Capital expands regional coverage into Zambia and Botswana",
    location: "Lusaka, Zambia",
    author: "N. Chikwanha",
    href: "/newsroom/regional-expansion",
    image: { src: "/images/gallery/energy-grid.jpg", alt: "Transmission lines crossing open country at sunset." },
    unverified: true,
  },
  {
    slug: "advisor-of-the-year",
    date: "2026-05-02",
    title: "Envision Capital named Financial Advisor of the Year",
    location: "Harare, Zimbabwe",
    author: "T. Moyo",
    href: "/newsroom/advisor-of-the-year",
    unverified: true,
  },
];
