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
 * PLACEHOLDER ANNOUNCEMENTS — ILLUSTRATIVE CONTENT.
 *
 * Titles, places, authors and dates are neutral slots, not claims: a firm
 * cannot publish a transaction, an award or an office it has not confirmed.
 * Earlier drafts of this file carried invented ones; they were removed.
 * Envision supplies verified announcements before launch. Every entry is
 * marked unverified, which renders a visible label wherever it appears.
 */
export const news: NewsItem[] = [
  {
    slug: "announcement-01",
    date: "2026-07-29",
    title: "[Announcement title]",
    location: "[Place]",
    author: "[Author]",
    href: "/newsroom/announcement-01",
    image: { src: "/images/services/advisory-products.jpg", alt: "Advisers reviewing transaction documents across a table." },
    unverified: true,
  },
  {
    slug: "announcement-02",
    date: "2026-06-14",
    title: "[Announcement title]",
    location: "[Place]",
    author: "[Author]",
    href: "/newsroom/announcement-02",
    image: { src: "/images/gallery/energy-grid.jpg", alt: "Transmission lines crossing open country at sunset." },
    unverified: true,
  },
  {
    slug: "announcement-03",
    date: "2026-05-02",
    title: "[Announcement title]",
    location: "[Place]",
    author: "[Author]",
    href: "/newsroom/announcement-03",
    image: { src: "/images/gallery/harare-cbd-towers.jpg", alt: "Office towers in the Harare central business district." },
    unverified: true,
  },
  {
    slug: "announcement-04",
    date: "2026-03-24",
    title: "[Announcement title]",
    location: "[Place]",
    author: "[Author]",
    href: "/newsroom/announcement-04",
    image: { src: "/images/gallery/trade-port.jpg", alt: "A container port seen from above." },
    unverified: true,
  },
];
