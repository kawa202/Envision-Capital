import Link from "next/link";
import { site } from "@/content/site";

/**
 * Fraud notice, small, immediately above the footer.
 *
 * Deliberately plain — no icon, no warning colour, no box. A notice styled
 * as an alert gets read as marketing furniture and skipped; a line of small
 * text where the legal matter lives gets read as a statement of fact, which
 * is what it is. It carries the phone number inline so nobody has to go
 * looking for a way to check.
 */
export function FraudNotice() {
  const tel = site.contact.phone.replace(/[^+\d]/g, "");

  return (
    <aside
      className="border-t border-line bg-stone py-8"
      aria-label="Fraud awareness"
    >
      <div className="shell">
        <p className="measure text-meta leading-relaxed text-ink">
          Envision Capital will never ask you to transfer funds or share
          banking details by email or WhatsApp. If in doubt, call us on{" "}
          <a href={`tel:${tel}`} className="link-inline">
            {site.contact.phone}
          </a>
          .{" "}
          <Link href="/fraud-awareness" className="link-inline">
            Fraud awareness
          </Link>
        </p>
      </div>
    </aside>
  );
}
