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
 * SAMPLE CONTENT FOR THE PROTOTYPE.
 *
 * Written to be relevant to a Harare corporate finance boutique so the site
 * reads as finished during review. It names no real client, organisation or
 * person; clients appear only as sector descriptors. The footer marks the whole
 * site as a prototype with sample content. Replace with Envision's own,
 * client-consented material before launch.
 */
export const news: NewsItem[] = [
  {
    slug: "announcement-01",
    date: "2026-07-29",
    title: "Envision Capital launches AI Finance Transformation practice",
    location: "Harare",
    author: "Envision Capital",
    href: "/newsroom/announcement-01",
    image: { src: "/images/services/advisory-products.jpg", alt: "Advisers reviewing transaction documents across a table." },
  },
  {
    slug: "announcement-02",
    date: "2026-06-14",
    title: "New perspective: financing the next wave of infrastructure",
    location: "Harare",
    author: "Envision Capital",
    href: "/newsroom/announcement-02",
    image: { src: "/images/gallery/energy-grid.jpg", alt: "Transmission lines crossing open country at sunset." },
  },
  {
    slug: "announcement-03",
    date: "2026-05-02",
    title: "Board briefing on cross-border transactions",
    location: "Harare",
    author: "Envision Capital",
    href: "/newsroom/announcement-03",
    image: { src: "/images/gallery/harare-cbd-towers.jpg", alt: "Office towers in the Harare central business district." },
  },
  {
    slug: "announcement-04",
    date: "2026-03-24",
    title: "Virtual CFO service expanded for growing businesses",
    location: "Harare",
    author: "Envision Capital",
    href: "/newsroom/announcement-04",
    image: { src: "/images/gallery/trade-port.jpg", alt: "A container port seen from above." },
  },
];
