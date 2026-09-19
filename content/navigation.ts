export type NavLink = { label: string; href: string };

export type SpotlightItem = {
  label: string;
  href: string;
  /** Optional kicker above the label, e.g. "Press release". */
  kind?: string;
  /** Optional metadata line below, e.g. a date and an author. */
  meta?: string;
};

export type NavPanel = {
  /** Sits under the panel heading, left column. */
  description: string;
  exploreLabel: string;
  exploreHref: string;
  /** Centre column. */
  links: NavLink[];
  /** Right column. */
  spotlight: { heading: string; items: SpotlightItem[] };
};

import { insights } from "./insights";
import { news } from "./news";
import { services } from "./services";

export type NavItem = {
  label: string;
  href: string;
  panel?: NavPanel;
};

/**
 * Primary navigation and mega-menu content.
 *
 * Section links resolve to real routes. The Insights and Newsroom spotlights
 * are derived from `content/insights.ts` and `content/news.ts` rather than
 * hard-coded — hand-written slugs here silently rotted the moment the content
 * slugs changed, which is exactly the bug this avoids.
 */
export const navItems: NavItem[] = [
  {
    label: "What we do",
    href: "/what-we-do",
    panel: {
      description:
        "Financial expertise, strategic insight and practical execution — applied to decisions that carry consequence.",
      exploreLabel: "Explore what we do",
      exploreHref: "/what-we-do",
      /* Each capability opens itself on /what-we-do (the explorer reads the
         hash). Derived from services.ts so the menu cannot drift from it. */
      links: services.map((service) => ({
        label: service.name,
        href: `/what-we-do#${service.id}`,
      })),
      spotlight: {
        heading: "Spotlight",
        items: [
          { label: "The Envision Method", href: "/method" },
          { label: "Selected work", href: "/work" },
          { label: "Funding readiness assessment", href: "/what-we-do" },
          { label: "Independent valuation", href: "/what-we-do" },
          { label: "Board advisory retainers", href: "/what-we-do" },
        ],
      },
    },
  },
  {
    label: "Industries",
    href: "/industries",
    panel: {
      description:
        "Financial technique transfers between sectors. Judgement does not — it comes from knowing which constraint governs the decision in front of you.",
      exploreLabel: "Explore industries",
      exploreHref: "/industries",
      links: [
        { label: "Mining & Natural Resources", href: "/industries" },
        { label: "Manufacturing", href: "/industries" },
        { label: "Agriculture & Agribusiness", href: "/industries" },
        { label: "Financial Services", href: "/industries" },
        { label: "Consumer & Retail", href: "/industries" },
        { label: "Infrastructure & Energy", href: "/industries" },
        { label: "Technology", href: "/industries" },
        { label: "Professional Services", href: "/industries" },
      ],
      spotlight: {
        heading: "Spotlight",
        items: [
          { label: "Envision in Zimbabwe", href: "/about" },
          { label: "Regional mandates", href: "/work" },
          { label: "Sector coverage", href: "/industries" },
          { label: "Talk to Envision", href: "/contact" },
        ],
      },
    },
  },
  {
    label: "Insights",
    href: "/insights",
    panel: {
      description:
        "Perspectives on the decisions that shape capital — written for the people who have to take them.",
      exploreLabel: "Explore insights",
      exploreHref: "/insights",
      links: [
        { label: "Corporate Finance", href: "/insights" },
        { label: "Transactions", href: "/insights" },
        { label: "Valuation", href: "/insights" },
        { label: "Finance", href: "/insights" },
        { label: "Transformation", href: "/insights" },
        { label: "Zimbabwe & Africa", href: "/insights" },
      ],
      spotlight: {
        heading: "Latest",
        items: insights.map((insight) => ({
          label: insight.title,
          href: insight.href,
          kind: insight.category,
        })),
      },
    },
  },
  { label: "Newsroom", href: "/newsroom" },
  {
    label: "About us",
    href: "/about",
    panel: {
      description:
        "A firm built on earned trust. We advise — we do not take principal positions, manage funds or broker products.",
      exploreLabel: "More about the firm",
      exploreHref: "/about",
      links: [
        { label: "Our purpose", href: "/about" },
        { label: "How we work", href: "/about" },
        { label: "The Envision Method", href: "/method" },
        { label: "Leadership", href: "/about#leadership" },
        { label: "Selected work", href: "/work" },
        { label: "Newsroom", href: "/newsroom" },
        { label: "Contact", href: "/contact" },
      ],
      spotlight: {
        heading: "Top news",
        items: news.map((item) => ({
          label: item.title,
          href: item.href,
          kind: "Announcement",
          meta: `${new Date(item.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })} · ${item.author}`,
        })),
      },
    },
  },
];

/**
 * Utility bar, right of the primary navigation.
 *
 * Search and the client portal have no destination yet — both need a real one
 * before launch, and the portal in particular should not ship until it exists.
 */
export const utilityNav = {
  contactLabel: "Contact",
  contactHref: "/contact",
  searchLabel: "Search",
  portalLabel: "Client portal",
  portalHref: "/contact",
  region: { country: "Zimbabwe", language: "English" },
};
