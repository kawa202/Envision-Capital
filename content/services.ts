import type { Service, ServiceGroup } from "./types";

/**
 * Capability lines.
 *
 * Six were carried over from Envision's existing positioning. Three
 * (`unconfirmed: true`) appear only in the redesign brief's navigation
 * structure and have no basis in supplied Envision material — they render a
 * visible flag in development and must be confirmed or removed before launch.
 * A firm's capability list is a factual claim about what it sells.
 */
export const services: Service[] = [
  {
    id: "corporate-finance",
    index: "01",
    name: "Corporate Finance Advisory",
    group: "Transactions & Capital",
    summary: "Capital raises, debt structuring and corporate restructuring.",
    description:
      "We structure and execute capital raises, debt financings and corporate restructurings — building the financial case, testing it against how lenders and investment committees actually assess risk, and staying at the table through to close.",
    deliverables: [
      "Capital structure and funding strategy",
      "Lender-ready information memoranda",
      "Financial models built for challenge",
      "Negotiation and close support",
    ],
    image: {
      src: "/images/services/corporate-finance-advisory.jpg",
      alt: "A finance team at work behind glass at dusk, during a capital structuring engagement.",
      direction:
        "Art-direct: real Envision advisers mid-decision. Available light, no staged handshakes.",
    },
  },
  {
    id: "mergers-acquisitions",
    index: "02",
    name: "M&A Advisory",
    group: "Transactions & Capital",
    summary: "Buy-side and sell-side advisory, from approach to completion.",
    description:
      "Transaction advisory across acquisitions, disposals, mergers and management buy-outs. We run the process — preparation, approach, diligence and negotiation — and keep the commercial logic intact under the pressure of a live deal.",
    deliverables: [
      "Buy-side and sell-side advisory",
      "Financial and commercial due diligence",
      "Deal structuring and negotiation",
      "Completion and integration support",
    ],
    image: {
      src: "/images/services/mergers-valuation.jpg",
      alt: "A transaction document being signed at the close of a negotiation.",
      direction:
        "Art-direct: the moment of commitment, observed rather than staged.",
    },
  },
  {
    id: "company-valuation",
    index: "03",
    name: "Company Valuation",
    group: "Transactions & Capital",
    summary: "Independent valuation, documented to be defended.",
    description:
      "Independent valuation opinions for transactions, shareholder matters, reporting and disputes. Documented to withstand the scrutiny of counterparties, auditors and boards — because that is precisely the moment they matter.",
    deliverables: [
      "Independent valuation opinions",
      "Multi-method valuation analysis",
      "Sensitivity and scenario testing",
      "Expert support under challenge",
    ],
    image: {
      commission: true,
      alt: "Analytical workings supporting an independent company valuation.",
      brief:
        "Close detail of valuation workings — multiple methods reconciled on paper. Precise, annotated, no client-identifiable figures.",
    },
  },
  {
    id: "capital-advisory",
    index: "04",
    name: "Capital Advisory",
    group: "Transactions & Capital",
    summary: "Long-term capital strategy, ahead of any single transaction.",
    description:
      "Advice on capital strategy before it becomes a transaction: what the balance sheet should look like, which sources of capital suit the business, and what has to be true before the market will price it well.",
    deliverables: [
      "Capital strategy and options review",
      "Funding readiness assessment",
      "Investor and lender positioning",
      "Balance sheet optimisation",
    ],
    image: {
      /* Reassigned from the Method, which is now deliberately unillustrated.
         Utility-scale generation is exactly the long-horizon asset this
         capability exists to fund. */
      src: "/images/services/capital-advisory.jpg",
      alt: "Utility-scale solar generation — the kind of long-horizon asset that requires patient capital.",
      direction:
        "Art-direct: replace with a Zimbabwean or regional infrastructure asset Envision has advised on.",
    },
    unconfirmed: true,
  },
  {
    id: "virtual-cfo",
    index: "05",
    name: "Virtual CFO Services",
    group: "Finance & Performance",
    summary: "Embedded financial leadership without the full-time cost.",
    description:
      "CFO-level judgement embedded in your business at the cadence you need it. We take responsibility for the decisions growth-stage companies most often defer — cash discipline, capital planning, board reporting, and the conversations with lenders and investors.",
    deliverables: [
      "Board and investor reporting",
      "Cash flow and working capital discipline",
      "Budgeting, forecasting and scenario planning",
      "Finance team structure and mentoring",
    ],
    image: {
      src: "/images/services/virtual-cfo.jpg",
      alt: "A finance leader working through a financial plan with a management team.",
      direction:
        "Art-direct: leadership in the act of explaining. Warm, natural interior light.",
    },
  },
  {
    id: "financial-reporting",
    index: "06",
    name: "Accounting & Financial Reporting",
    group: "Finance & Performance",
    summary: "IFRS-compliant reporting, audit readiness and close support.",
    description:
      "IFRS-compliant reporting, audit readiness and financial close support. Unglamorous, and the foundation everything else rests on: no funding case, valuation or transaction survives contact with a counterparty if the underlying numbers do not hold.",
    deliverables: [
      "IFRS financial statement preparation",
      "Audit readiness and auditor liaison",
      "Month-end and year-end close support",
      "Accounting policy and controls review",
    ],
    image: {
      commission: true,
      alt: "Financial reporting workings and reconciliations under review.",
      brief:
        "Close detail of real reconciliation working papers — ordered, annotated, precise. Shallow depth of field. No client-identifiable figures.",
    },
  },
  {
    id: "financial-performance",
    index: "07",
    name: "Financial Performance",
    group: "Finance & Performance",
    summary: "Margin, cost and working capital, measured and improved.",
    description:
      "Diagnosis and improvement of financial performance — where margin is actually earned and lost, what working capital is costing, and which operational changes move the numbers rather than merely describing them.",
    deliverables: [
      "Margin and profitability analysis",
      "Cost base review",
      "Working capital improvement",
      "Performance reporting and KPIs",
    ],
    image: {
      commission: true,
      alt: "Operational environment where financial performance is created.",
      brief:
        "A working operation — plant, depot or distribution floor — where margin is actually earned. Documentary, not corporate.",
    },
    unconfirmed: true,
  },
  {
    id: "ai-transformation",
    index: "08",
    name: "AI Finance Transformation",
    group: "Intelligence & Transformation",
    summary: "Modernising the finance function, with controls intact.",
    description:
      "We deploy AI-assisted tooling and redesigned workflows to modernise finance functions — measured against efficiency gains that can be evidenced, and implemented without loosening the controls your auditors and lenders depend on.",
    deliverables: [
      "Finance function diagnostic",
      "Automation and tooling roadmap",
      "Controls and governance design",
      "Implementation and team enablement",
    ],
    image: {
      src: "/images/services/ai-transformation.jpg",
      alt: "A finance team working across systems during a transformation programme.",
      direction:
        "Art-direct: restrained technology imagery. No abstract glowing AI clichés.",
    },
  },
  {
    id: "advisory-products",
    index: "09",
    name: "Advisory Products",
    group: "Intelligence & Transformation",
    summary: "Packaged diagnostics and structured advisory retainers.",
    description:
      "Defined-scope diagnostics and structured retainers for organisations that want continuing access to senior advisory judgement — with clear outputs, clear timelines and clear cost, rather than an open-ended engagement.",
    deliverables: [
      "Financial health diagnostics",
      "Funding readiness assessments",
      "Board advisory retainers",
      "Structured second-opinion reviews",
    ],
    image: {
      src: "/images/services/advisory-products.jpg",
      alt: "Structured analysis laid out for a board review.",
      direction:
        "Art-direct: evidence of structured thinking — frameworks, not decoration.",
    },
  },
];

export const serviceGroups: ServiceGroup[] = [
  "Transactions & Capital",
  "Finance & Performance",
  "Intelligence & Transformation",
];

/** Short positioning line for each group, used in the explorer and mega-menu. */
export const groupSummaries: Record<ServiceGroup, string> = {
  "Transactions & Capital":
    "Raising it, deploying it, and proving what it is worth.",
  "Finance & Performance":
    "The reporting discipline and financial leadership decisions rest on.",
  "Intelligence & Transformation":
    "Rebuilding the finance function around better evidence.",
};

export const servicesByGroup = serviceGroups.map((group) => ({
  group,
  summary: groupSummaries[group],
  items: services.filter((service) => service.group === group),
}));
