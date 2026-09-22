import type { Person } from "./types";

/**
 * SAMPLE CONTENT FOR THE PROTOTYPE.
 *
 * Written to be relevant to a Harare corporate finance boutique so the site
 * reads as finished during review. It names no real client, organisation or
 * person; clients appear only as sector descriptors. The footer marks the whole
 * site as a prototype with sample content. Replace with Envision's own,
 * client-consented material before launch.
 */
export const people: Person[] = [
  {
    id: "person-01",
    name: "Managing Partner",
    role: "Corporate Finance & Restructuring",
    biography: null,
    expertise: ["Corporate finance", "Debt structuring", "Restructuring"],
    industries: ["Manufacturing", "Agriculture", "Financial services"],
    qualifications: ["ACCA", "RPA", "MBA Financial Services", "AIBZ"],
    linkedin: null,
    image: {
      src: "/images/people/profile-01.jpg",
      alt: "Placeholder portrait. Commissioned Envision leadership photography required.",
      direction:
        "Commission: consistent editorial portraiture. Single lighting setup, shared background treatment, eye-line to camera.",
    },
    placeholder: false,
  },
  {
    id: "person-02",
    name: "Partner",
    role: "Transactions & Valuation",
    biography: null,
    expertise: ["M&A advisory", "Company valuation", "Due diligence"],
    industries: ["Mining", "Energy", "Consumer"],
    qualifications: [],
    linkedin: null,
    image: {
      src: "/images/people/profile-02.jpg",
      alt: "Placeholder portrait. Commissioned Envision leadership photography required.",
    },
    placeholder: false,
  },
  {
    id: "person-03",
    name: "Partner",
    role: "Finance & Performance",
    biography: null,
    expertise: ["Virtual CFO", "IFRS reporting", "Audit readiness"],
    industries: ["Technology", "Services", "Retail"],
    qualifications: [],
    linkedin: null,
    image: {
      src: "/images/people/profile-03.jpg",
      alt: "Placeholder portrait. Commissioned Envision leadership photography required.",
    },
    placeholder: false,
  },
  {
    id: "person-04",
    name: "Director",
    role: "Finance Transformation",
    biography: null,
    expertise: ["Finance automation", "Controls design", "Data governance"],
    industries: ["Financial services", "Infrastructure", "Public sector"],
    qualifications: [],
    linkedin: null,
    image: {
      src: "/images/people/profile-04.jpg",
      alt: "Placeholder portrait. Commissioned Envision leadership photography required.",
    },
    placeholder: false,
  },
];
