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
    body: "Envision Capital collects only the information you choose to give us — typically your name, organisation and contact details when you enquire about a mandate or subscribe to our insights. We use it to respond to you and to provide the services you ask for, keep it only for as long as that purpose requires, and do not sell or share it with third parties for marketing. You may ask us at any time what we hold about you, or ask for it to be corrected or deleted. (In this prototype, forms do not submit anywhere, and the booking and portal demonstrations keep their records only in your own browser.)",
  },
  {
    id: "terms",
    heading: "Terms of use",
    body: "This website is provided for general information. Nothing on it constitutes financial, investment, legal or tax advice, or an offer to provide any service; advice is given only under a signed engagement letter. While we take care over what we publish, we make no warranty that the content is complete or current, and accept no liability for decisions taken in reliance on it. Material on this site may not be reproduced without our permission.",
  },
  {
    id: "regulatory",
    heading: "Regulatory",
    body: site.disclaimer,
  },
  {
    id: "cookies",
    heading: "Cookies",
    body: "This site sets no cookies and runs no analytics. If that changes, this section will list every cookie set and why, and a consent choice will be added before any non-essential cookie is used.",
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

          {/* Legal wording is the one place sample text could be relied on,
              so this page keeps its own note on top of the site-wide one. */}
          <p className="mt-16 text-meta leading-relaxed text-muted">
            Sample wording for the prototype. To be replaced with text approved
            by Envision Capital&rsquo;s legal advisers before launch.
          </p>
        </div>
      </section>
    </main>
  );
}
