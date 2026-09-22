import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Fraud awareness",
  description:
    "How to check that a message claiming to come from Envision Capital is genuine, and what to do if you are unsure.",
};

/**
 * Fraud awareness.
 *
 * The one page on this prototype whose text is not a placeholder, because a
 * warning that reads "[WARNING REQUIRED]" is worse than no warning at all.
 * Everything here is either a statement about what the firm does not do — a
 * commitment Envision can keep whatever else changes — or the contact
 * details the client supplied. Nothing describes an incident, a case or a
 * regulator, because none has been reported to us.
 */
const points = [
  {
    heading: "We never ask for money by message",
    body: "Envision Capital will never ask you to transfer funds, pay a fee or share banking details by email, WhatsApp, SMS or social media. No adviser here will ask you to move money to release a mandate, an introduction or a result.",
  },
  {
    heading: "We never send changed bank details out of the blue",
    body: "If you receive a message claiming our account details have changed, treat it as fraudulent until you have spoken to us. Invoice interception works by looking exactly like the real thing, including a familiar name in the sender field.",
  },
  {
    heading: "Check the address, then call",
    body: "Genuine mail from the firm comes from an envisioncapital.co.zw address. A near-miss — an extra letter, a different ending — is the whole of the trick. Do not reply to the message to verify it; use the number below, which you already have from this page.",
  },
  {
    heading: "We do not recruit or pay by messaging app",
    body: "We do not make job offers, request documents or arrange payments through messaging apps, and we do not ask candidates for money at any stage.",
  },
];

export default function FraudAwarenessPage() {
  return (
    <main id="main">
      <PageHeader
        title="Fraud awareness."
        lede="How to tell whether a message claiming to come from Envision Capital is genuine."
      />

      <section className="section-y bg-white">
        <div className="shell measure">
          <p className="text-lede text-navy">
            Envision Capital will never ask you to transfer funds or share
            banking details by email or WhatsApp. If in doubt, call us on{" "}
            <a
              href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`}
              className="link-inline"
            >
              {site.contact.phone}
            </a>
            .
          </p>

          {points.map((point) => (
            <div key={point.heading} className="mt-14">
              <h2 className="text-display-m text-navy">{point.heading}</h2>
              <p className="mt-5 text-body text-muted">{point.body}</p>
            </div>
          ))}

          <div className="mt-16 border-t border-line pt-10">
            <h2 className="text-display-m text-navy">If something looks wrong</h2>
            <p className="mt-5 text-body text-muted">
              Stop, and do not act on the message. Call{" "}
              <a
                href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`}
                className="link-inline"
              >
                {site.contact.phone}
              </a>{" "}
              or write to{" "}
              <a href={`mailto:${site.contact.email}`} className="link-inline">
                {site.contact.email}
              </a>{" "}
              using the details on this page rather than any in the message
              itself. If you have already transferred money, contact your bank
              first — they can sometimes recall a payment within hours.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
