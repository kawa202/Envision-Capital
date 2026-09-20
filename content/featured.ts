export type FeaturedSlide = {
  slug: string;
  /** Short label above the headline: "Our firm", "Insight". */
  category: string;
  headline: string;
  /** One sentence. If it needs two, the headline is not doing its job. */
  standfirst: string;
  cta: { label: string; href: string };
  image: { src: string; alt: string };
};

/**
 * Hero stories. Three, and no more.
 *
 * Every line here is positioning, not fact: nothing claims a transaction, a
 * figure, a client or a date. The photographs are the three lightest frames
 * in the library that suit a full-bleed crop — the hero is the first thing
 * downloaded on the site and the only image a reader is guaranteed to pay
 * for, so weight is part of the art direction.
 */
export const featuredSlides: FeaturedSlide[] = [
  {
    slug: "positioning",
    category: "Our firm",
    headline: "Financial clarity for decisions that matter.",
    standfirst:
      "We turn commercial intent into a financial case that holds when someone sets out to dismantle it.",
    cta: { label: "How we can help", href: "/what-we-do" },
    image: {
      src: "/images/hero/positioning-boardroom.jpg",
      alt: "A board in session around a long table, papers open in front of them.",
    },
  },
  {
    slug: "readiness",
    category: "Capability",
    headline: "Diligence starts long before the data room opens.",
    standfirst:
      "The work that makes a business fundable is done in the months nobody is watching.",
    cta: { label: "Corporate finance advisory", href: "/what-we-do#corporate-finance" },
    image: {
      src: "/images/hero/advisory-meeting.jpg",
      alt: "Two advisers working through a document together at a desk.",
    },
  },
  {
    slug: "valuation",
    category: "Capability",
    headline: "A valuation is only worth what it survives.",
    standfirst:
      "Independent work, built to stand up to a counterparty, an auditor and a board in the same week.",
    cta: { label: "Company valuation", href: "/what-we-do#company-valuation" },
    image: {
      src: "/images/hero/team-table.jpg",
      alt: "A working team around a table mid-discussion, screens and notes in view.",
    },
  },
];
