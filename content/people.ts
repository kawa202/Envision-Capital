import type { Person } from "./types";

/**
 * ⚠️  LEADERSHIP PROFILES REQUIRED.
 *
 * No real individual is represented below. Names, biographies and
 * qualifications are withheld rather than invented — a professional services
 * firm cannot fabricate the people behind it. The structure demonstrates the
 * intended composition; Envision supplies verified profiles and commissioned
 * portrait photography before launch.
 */
export const people: Person[] = [
  {
    id: "person-01",
    name: "[LEADERSHIP PROFILE REQUIRED]",
    role: "Managing Partner",
    biography: null,
    expertise: ["Corporate finance", "Debt structuring", "Restructuring"],
    industries: ["Manufacturing", "Agriculture", "Financial services"],
    qualifications: ["[QUALIFICATIONS REQUIRED]"],
    linkedin: null,
    image: {
      src: "/images/people/profile-01.jpg",
      alt: "Placeholder portrait. Commissioned Envision leadership photography required.",
      direction:
        "Commission: consistent editorial portraiture. Single lighting setup, shared background treatment, eye-line to camera.",
    },
    placeholder: true,
  },
  {
    id: "person-02",
    name: "[LEADERSHIP PROFILE REQUIRED]",
    role: "Partner, Transactions & Valuation",
    biography: null,
    expertise: ["M&A advisory", "Company valuation", "Due diligence"],
    industries: ["Mining", "Energy", "Consumer"],
    qualifications: ["[QUALIFICATIONS REQUIRED]"],
    linkedin: null,
    image: {
      src: "/images/people/profile-02.jpg",
      alt: "Placeholder portrait. Commissioned Envision leadership photography required.",
    },
    placeholder: true,
  },
  {
    id: "person-03",
    name: "[LEADERSHIP PROFILE REQUIRED]",
    role: "Partner, Finance & Performance",
    biography: null,
    expertise: ["Virtual CFO", "IFRS reporting", "Audit readiness"],
    industries: ["Technology", "Services", "Retail"],
    qualifications: ["[QUALIFICATIONS REQUIRED]"],
    linkedin: null,
    image: {
      src: "/images/people/profile-03.jpg",
      alt: "Placeholder portrait. Commissioned Envision leadership photography required.",
    },
    placeholder: true,
  },
  {
    id: "person-04",
    name: "[LEADERSHIP PROFILE REQUIRED]",
    role: "Director, Finance Transformation",
    biography: null,
    expertise: ["Finance automation", "Controls design", "Data governance"],
    industries: ["Financial services", "Infrastructure", "Public sector"],
    qualifications: ["[QUALIFICATIONS REQUIRED]"],
    linkedin: null,
    image: {
      src: "/images/people/profile-04.jpg",
      alt: "Placeholder portrait. Commissioned Envision leadership photography required.",
    },
    placeholder: true,
  },
];
