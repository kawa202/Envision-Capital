import { insights, TOPICS } from "./insights";
import { services } from "./services";

export type NavLink = { label: string; href: string };

/** One column inside a mega-menu panel. */
export type NavGroup = { heading: string; links: NavLink[] };

export type NavPanel = {
  /** Sits under the panel heading, left column. */
  description: string;
  exploreLabel: string;
  exploreHref: string;
  groups: NavGroup[];
  /** One article, to the right. Drawn from content/insights.ts by slug. */
  featuredSlug: string;
};

export type NavItem = {
  label: string;
  href: string;
  /** Items without a panel are plain links: Careers and Contact. */
  panel?: NavPanel;
};

/** Services, grouped exactly as content/services.ts groups them. */
function serviceGroups(): NavGroup[] {
  const order = [
    "Transactions & Capital",
    "Finance & Performance",
    "Intelligence & Transformation",
  ] as const;

  return order.map((heading) => ({
    heading,
    links: services
      .filter((service) => service.group === heading)
      .map((service) => ({
        label: service.name,
        href: `/services#${service.id}`,
      })),
  }));
}

/** The four insight topics, as /insights filters them. */
function topicLinks(): NavLink[] {
  return TOPICS.map((topic) => ({
    label: topic,
    href: `/insights?topic=${encodeURIComponent(topic)}`,
  }));
}

/**
 * Primary navigation.
 *
 * Panels are built from the content collections rather than hand-written, so
 * the menu cannot drift from the pages it points at — hand-typed slugs here
 * rotted silently the last time the content slugs changed.
 */
export const navItems: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    panel: {
      description:
        "Financial expertise, strategic insight and execution — applied to the decisions that carry consequence.",
      exploreLabel: "All services",
      exploreHref: "/services",
      groups: [
        ...serviceGroups(),
        {
          heading: "By sector",
          links: [
            { label: "Industries we cover", href: "/industries" },
            { label: "The Envision Method", href: "/method" },
            { label: "Book a session", href: "/book" },
          ],
        },
      ],
      featuredSlug: "cost-of-capital",
    },
  },
  {
    label: "Insights",
    href: "/insights",
    panel: {
      description:
        "Perspectives on the decisions that shape capital, written for the people who have to take them.",
      exploreLabel: "All insights",
      exploreHref: "/insights",
      groups: [
        { heading: "By topic", links: topicLinks() },
        {
          heading: "More from Envision",
          links: [
            { label: "Newsroom", href: "/newsroom" },
            { label: "On the agenda", href: "/events" },
            { label: "Selected work", href: "/work" },
          ],
        },
      ],
      featuredSlug: "board-cross-border",
    },
  },
  {
    label: "About",
    href: "/about",
    panel: {
      description:
        "A firm built on earned trust. We advise — we do not take principal positions, manage funds or broker products.",
      exploreLabel: "About Envision",
      exploreHref: "/about",
      groups: [
        {
          heading: "The firm",
          links: [
            { label: "Our purpose", href: "/about" },
            { label: "Leadership", href: "/about#leadership" },
            { label: "The Envision Method", href: "/method" },
            { label: "Careers", href: "/careers" },
          ],
        },
        {
          heading: "Proof",
          links: [
            { label: "Selected work", href: "/work" },
            { label: "Newsroom", href: "/newsroom" },
            { label: "On the agenda", href: "/events" },
          ],
        },
      ],
      featuredSlug: "mid-market-multiples",
    },
  },
  /* Contact is a single destination. A panel holding one link would be a
     drawer with nothing in it. */
  { label: "Contact", href: "/contact" },
];

/* ---------------------------------------------------------------------
   What the header actually receives.

   SiteHeader is a client component, so anything it imports is serialised
   into the bundle every page downloads. Importing services.ts there sent
   nine full service records — descriptions, deliverables, art-direction
   notes — to the browser so the menu could print nine names: 30KB of prose
   nobody reads. The layout resolves the menu on the server instead and
   passes down only these fields.
   --------------------------------------------------------------------- */

export type ResolvedFeatured = {
  href: string;
  category: string;
  title: string;
  image?: { src: string; alt: string };
};

export type ResolvedNavItem = {
  label: string;
  href: string;
  panel?: {
    description: string;
    exploreLabel: string;
    exploreHref: string;
    groups: NavGroup[];
    featured?: ResolvedFeatured;
  };
};

export function getNavData(): ResolvedNavItem[] {
  return navItems.map((item) => {
    if (!item.panel) return { label: item.label, href: item.href };
    const found = insights.find((insight) => insight.slug === item.panel!.featuredSlug);
    return {
      label: item.label,
      href: item.href,
      panel: {
        description: item.panel.description,
        exploreLabel: item.panel.exploreLabel,
        exploreHref: item.panel.exploreHref,
        groups: item.panel.groups,
        featured: found
          ? {
              href: found.href,
              category: found.category,
              title: found.title,
              image: found.image,
            }
          : undefined,
      },
    };
  });
}

/**
 * Utility bar, right of the primary navigation.
 *
 * The client portal is a prototype demonstration, not a live system. It is
 * labelled as one wherever it appears.
 */
export const utilityNav = {
  searchLabel: "Search",
  loginLabel: "Client login",
  loginHref: "/portal",
};
