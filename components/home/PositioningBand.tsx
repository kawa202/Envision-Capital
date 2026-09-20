import Link from "next/link";
import { PRIMARY_CTA } from "@/lib/brand";

/**
 * The argument, stated once, between the two halves of the page.
 *
 * Navy, no photograph, nothing to click but the one action. It is the only
 * place on the homepage where the firm speaks in its own voice at length,
 * and it earns that by being short.
 */
export function PositioningBand() {
  return (
    <section className="section-y bg-navy" aria-labelledby="positioning-heading">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
        <h2
          id="positioning-heading"
          className="max-w-[16ch] text-display-l text-white lg:col-span-5"
        >
          Complexity demands a clear position.
        </h2>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="text-lede text-on-navy">
            Significant financial decisions rarely fail for want of
            information. They fail because the information was never resolved
            into a position that could withstand challenge — from a lender, an
            investment committee, an auditor or a board.
          </p>
          <p className="mt-6 text-body text-on-navy/80">
            Envision Capital exists at that point. We do the analytical work
            that turns commercial intent into a defensible financial case, and
            we stay accountable for it through to the decision itself.
          </p>
          <p className="mt-9">
            <Link href={PRIMARY_CTA.href} className="btn-primary">
              {PRIMARY_CTA.label}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
