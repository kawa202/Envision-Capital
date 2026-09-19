import { site } from "./site";

/**
 * Homepage-only content: the pieces of the hub that are not teasers of an
 * existing collection. Every line of copy here is either drawn from
 * `site.ts` or is navigational — nothing makes a new claim about the firm.
 */

type Link = { label: string; href: string };
type Photo = { src: string; alt: string };

export type Spotlight = {
  id: string;
  heading: string;
  body: string;
  image: Photo;
  /** Which side the photograph sits on at desktop. */
  imageSide: "left" | "right";
  /** Rendered as an outlined button. */
  button?: Link;
  /** Rendered as bold text links. */
  links?: Link[];
};

/**
 * Capability overview — the section directly beneath the hero. Four of the
 * nine capability lines, chosen to span what boards most often bring:
 * raising capital, structuring it, transacting, and valuing. Name and summary
 * are read from services.ts by id.
 */
export const capabilityOverview = {
  heading: site.capabilities.heading,
  lede: site.capabilities.lede,
  serviceIds: ["corporate-finance", "capital-advisory", "mergers-acquisitions", "company-valuation"],
  link: { label: "Explore all capabilities", href: "/what-we-do" },
};

/** Two alternating image/text splits that carry the firm's positioning. */
export const spotlights: Spotlight[] = [
  {
    id: "clarity",
    heading: site.intro.heading,
    body: site.intro.body[0],
    /* The dusk office now leads the hero, so this split takes the
       daylight boardroom rather than repeating it one scroll later. */
    image: {
      src: "/images/hero/positioning-boardroom.jpg",
      alt: "A board in session around a long table, mid-discussion.",
    },
    imageSide: "right",
    button: { label: "Explore what we do", href: "/what-we-do" },
  },
  {
    id: "evidence",
    heading: site.credibilityStatement.heading,
    body: site.credibilityStatement.body,
    image: {
      src: "/images/firm/silhouette.jpg",
      alt: "A woman in profile, looking up, against a pale sky.",
    },
    imageSide: "left",
    links: [
      { label: "See how we work", href: "/method" },
      { label: "More about the firm", href: "/about" },
    ],
  },
];

/**
 * "Explore by role" — the audiences named in the positioning line (boards,
 * investors, lenders, business leaders), each pointed at the capability most
 * likely to be its way in. Links open that capability on /what-we-do.
 */
export const roles: Link[] = [
  { label: "Board director", href: "/what-we-do#company-valuation" },
  { label: "Chief executive", href: "/what-we-do#capital-advisory" },
  { label: "Chief financial officer", href: "/what-we-do#ai-transformation" },
  { label: "Investor", href: "/what-we-do#mergers-acquisitions" },
  { label: "Lender", href: "/what-we-do#corporate-finance" },
  { label: "Business owner", href: "/what-we-do#virtual-cfo" },
];

/**
 * "On the agenda" — four capabilities presented as image panels. Name and
 * summary are read from `services.ts` by id so the two cannot drift apart.
 */
export const agenda: { serviceId: string; label: string; image: Photo }[] = [
  {
    serviceId: "capital-advisory",
    label: "Capital & funding",
    image: {
      src: "/images/services/capital-advisory.jpg",
      alt: "A solar array under a broken sky.",
    },
  },
  {
    serviceId: "company-valuation",
    label: "Valuation",
    image: {
      src: "/images/hero/work-manufacturing.jpg",
      alt: "Process plant pipework and a blue industrial fan.",
    },
  },
  {
    serviceId: "financial-performance",
    label: "Financial performance",
    image: {
      src: "/images/services/mergers-valuation.jpg",
      alt: "A hand signing a document with a fountain pen.",
    },
  },
  {
    serviceId: "ai-transformation",
    label: "AI finance transformation",
    image: {
      src: "/images/gallery/technology.jpg",
      alt: "Two colleagues working together at a laptop.",
    },
  },
];

/** "Discover more" quick links. Navigational only. */
export const quickLinks: Link[] = [
  { label: "What we do", href: "/what-we-do" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "Newsroom", href: "/newsroom" },
  { label: "Case studies", href: "/work" },
  { label: "Our method", href: "/method" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * Professional standing — the Envision equivalent of a "relationships and
 * alliances" strip: regulatory registrations, professional-body memberships,
 * banking and technology relationships.
 *
 * EMPTY BY DESIGN. Every entry is a factual claim that a regulator or the
 * named body can check, so none is invented. The section renders placeholder
 * tiles in development and nothing at all in production until real, verified
 * entries are added here.
 */
export const affiliations: { name: string; logo?: Photo; href?: string }[] = [];

/** What the development placeholders ask Envision to supply. */
export const affiliationSlots = [
  "Regulatory registration",
  "Professional body",
  "Professional body",
  "Banking relationship",
  "Technology partner",
  "Industry association",
];
