import Link from "next/link";
import { PRIMARY_CTA } from "@/lib/brand";

/** The last thing on the page: one question, one action. */
export function CtaBand() {
  return (
    <section className="section-y bg-navy" aria-labelledby="cta-heading">
      <div className="shell">
        <h2 id="cta-heading" className="max-w-[22ch] text-display-l text-white">
          Ready to close the gap between vision and value?
        </h2>
        <Link href={PRIMARY_CTA.href} className="btn-primary mt-9">
          {PRIMARY_CTA.label}
        </Link>
      </div>
    </section>
  );
}
