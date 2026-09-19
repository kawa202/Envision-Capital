export const site = {
  name: "Envision Capital",
  /** Brand philosophy. Deliberately no longer the hero headline. */
  philosophy: "Earning Lasting Credibility",
  descriptor: "Corporate Finance & Advisory",
  location: "Harare, Zimbabwe",
  region: "Zimbabwe & Africa",

  hero: {
    headline: "Financial clarity for decisions that matter.",
    lede:
      "Envision Capital helps boards, investors, lenders and business leaders navigate complex financial decisions with the rigour, insight and strategic clarity required to move forward with confidence.",
    primaryCta: { label: "Explore our capabilities", href: "/what-we-do" },
    secondaryCta: { label: "Talk to Envision", href: "/contact" },
    meta: "Zimbabwe · Africa",
  },

  /** Positioning section, directly beneath the hero. */
  intro: {
    heading: "Complexity requires clarity.",
    body: [
      "Significant financial decisions rarely fail for want of information. They fail because the information was never resolved into a position that could withstand challenge — from a lender, an investment committee, an auditor or a board.",
      "Envision Capital exists at that point. We do the analytical work that turns a commercial intention into a defensible financial case, and we stay accountable for it through to the decision itself.",
    ],
  },

  /** Capability positioning — heads /what-we-do and the homepage overview. */
  capabilities: {
    heading: "Capability across the decision, not one part of it.",
    lede:
      "We combine financial expertise, strategic insight and practical execution to help organisations make better decisions — and to make them stand up afterwards.",
  },

  /** The questions that frame every Envision mandate. */
  challengeQuestions: [
    "Can your numbers withstand scrutiny?",
    "Can your funding case survive challenge?",
    "Can your valuation be defended?",
    "Is your business ready for diligence?",
  ],

  /** Institutional statement before the final call to action. */
  credibilityStatement: {
    heading: "Confidence comes from evidence.",
    body:
      "Our role is not simply to produce numbers or offer a recommendation. It is to build the evidence a board needs in order to commit — documented, tested, and able to hold when someone sets out to dismantle it.",
  },

  pullQuote: "The right answer, clearly communicated, at the time it matters.",

  commitments: [
    {
      name: "Independence",
      detail: "We advise. We do not sell products or take principal positions.",
    },
    {
      name: "Rigour",
      detail: "Every output is built to remain defensible under challenge.",
    },
    {
      name: "Clarity",
      detail: "Complex analysis, communicated plainly enough to act on.",
    },
    {
      name: "Accountability",
      detail: "We stand behind our conclusions in front of your board.",
    },
    {
      name: "Discretion",
      detail: "Client confidentiality is absolute and non-negotiable.",
    },
    {
      name: "Regional depth",
      detail: "Zimbabwe-fluent, regionally connected, internationally literate.",
    },
  ],

  finalCta: {
    heading: "Ready to bring clarity to your next decision?",
    body:
      "Whether you are preparing for investment, evaluating a transaction, strengthening financial performance or transforming your finance function, Envision Capital can help you move forward with clarity.",
    label: "Talk to Envision",
  },

  contact: {
    email: "advisory@envisioncapital.co.zw",
    emailNote: "[VERIFIED CONTACT EMAIL REQUIRED]",
    phone: "+263 (0) 000 000 000",
    phoneNote: "[VERIFIED CONTACT NUMBER REQUIRED]",
    address: "Harare, Zimbabwe",
    linkedin: null as string | null,
  },

  disclaimer:
    "Envision Capital provides financial advisory services only. Nothing on this website constitutes regulated investment advice, a financial promotion, or a solicitation to invest. All regulatory and disclaimer wording is subject to Envision Capital compliance review prior to launch.",
} as const;

/** Primary navigation. Institutional labels, not product labels. */
export const navigation = [
  { label: "What we do", href: "/what-we-do", megaMenu: true },
  { label: "Industries", href: "/industries", megaMenu: false },
  { label: "Insights", href: "/insights", megaMenu: false },
  { label: "Newsroom", href: "/newsroom", megaMenu: false },
  { label: "About us", href: "/about", megaMenu: false },
] as const;
