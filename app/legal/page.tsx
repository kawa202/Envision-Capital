import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Legal",
  description:
    "Privacy, terms of use and regulatory position for Envision Capital.",
};

/**
 * Placeholder.
 *
 * Legal text is the one thing on a website that cannot be drafted in the
 * client's voice as a demonstration: a privacy notice is a statement about
 * what an organisation actually does with data, and a regulatory line is a
 * statement about what it is licensed to do. Both come from Envision and
 * their advisers. The structure is here; the text is theirs.
 */
const sections = [
  {
    id: "privacy",
    heading: "Privacy",
    body: "[PRIVACY NOTICE REQUIRED] — What Envision Capital collects, why, how long it is kept, who it is shared with, and how to ask for it to be removed. This prototype collects nothing: the contact and subscription forms do not submit anywhere, and the booking and portal demonstrations keep their records in your own browser.",
  },
  {
    id: "terms",
    heading: "Terms of use",
    body: "[TERMS OF USE REQUIRED] — The basis on which this site is offered, limits of liability, and the treatment of material published on it.",
  },
  {
    id: "regulatory",
    heading: "Regulatory",
    body: site.disclaimer,
  },
  {
    id: "cookies",
    heading: "Cookies",
    body: "[COOKIE POSITION REQUIRED] — This prototype sets no cookies and runs no analytics. If either changes before launch, this section states what is set and a consent mechanism is added.",
  },
];

export default function LegalPage() {
  return (
    <main id="main">
      <PageHeader
        title="Legal."
        lede="Privacy, terms of use and the firm's regulatory position."
      />

      <section className="section-y bg-white">
        <div className="shell measure">
          {sections.map((section, index) => (
            <div key={section.id} id={section.id} className={index > 0 ? "mt-14" : ""}>
              <h2 className="text-display-m text-navy">{section.heading}</h2>
              <p className="mt-5 text-body text-muted">{section.body}</p>
            </div>
          ))}

          <p className="mt-16 text-meta leading-relaxed text-muted">
            [LEGAL REVIEW REQUIRED] — Nothing on this page has been through
            legal or compliance review. Every section is replaced with wording
            supplied by Envision Capital and its advisers before launch.
          </p>
        </div>
      </section>
    </main>
  );
}
