import type { MethodStep } from "./types";

/**
 * The Envision Method — the firm's signature engagement sequence.
 * Rendered as a scroll-linked progression rather than six static boxes.
 */
export const methodSteps: MethodStep[] = [
  {
    index: "01",
    name: "Diagnose",
    summary:
      "Understand the business, financial position and decision context.",
    question: "What is actually true here?",
    description:
      "We establish the financial reality before anyone proposes a solution. That means testing the numbers, the assumptions beneath them and the governance around them — including the findings that are inconvenient.",
    outputs: ["Financial position assessment", "Risk and exposure register", "Findings memorandum"],
  },
  {
    index: "02",
    name: "Architect",
    summary:
      "Build the appropriate financial and strategic framework.",
    question: "What structure does this decision require?",
    description:
      "We design the financial architecture the decision demands — capital structure, transaction shape, reporting framework or operating model — and stress the design against the conditions it will have to survive.",
    outputs: ["Structuring options analysis", "Financial model", "Recommended architecture"],
  },
  {
    index: "03",
    name: "Validate",
    summary:
      "Test assumptions, evidence and decision readiness.",
    question: "Will it hold under challenge?",
    description:
      "We attack our own work before a counterparty does. Sensitivity analysis, independent review and diligence simulation — because a position that has not been challenged internally has not been validated.",
    outputs: ["Sensitivity and scenario analysis", "Independent review", "Diligence readiness report"],
  },
  {
    index: "04",
    name: "Transform",
    summary:
      "Implement improvements where they change the numbers.",
    question: "What has to change in the business?",
    description:
      "Analysis that does not change anything is expensive documentation. We translate findings into the specific operational, financial and governance changes the organisation needs to make.",
    outputs: ["Transformation roadmap", "Process and controls redesign", "Implementation sequencing"],
  },
  {
    index: "05",
    name: "Mobilise",
    summary:
      "Translate recommendations into action.",
    question: "Who moves, and when?",
    description:
      "We take the plan into execution — convening lenders, investors, auditors and internal teams, and holding the process to its timetable through to the point of decision.",
    outputs: ["Execution plan", "Stakeholder engagement", "Transaction or programme management"],
  },
  {
    index: "06",
    name: "Sustain",
    summary:
      "Embed capability and lasting value.",
    question: "Does it still hold in twelve months?",
    description:
      "Credibility is not earned at completion; it is earned by what survives afterwards. We embed the reporting discipline, controls and capability that keep the result standing once we step back.",
    outputs: ["Reporting cadence", "Capability transfer", "Ongoing advisory access"],
  },
];
