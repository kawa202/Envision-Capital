import type { Metadata } from "next";
import Link from "next/link";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Envision Capital about a transaction, a valuation, your finance function or an independent view before the board takes a position. Harare, Zimbabwe.",
};

export default function ContactPage() {
  return (
    <main id="main">
      <PageHeader
        title={site.finalCta.heading}
        lede={site.finalCta.body}
      />
      <FinalCTA />

      {/* The booking flow is a prototype demonstration, so it is reached from
          here rather than from the header's primary action. */}
      <section className="section-y bg-stone">
        <div className="shell measure">
          <h2 className="text-display-m text-navy">Prefer to pick a time?</h2>
          <p className="mt-5 text-body text-muted">
            The prototype includes a booking flow you can walk through end to
            end. Nothing is booked, charged or emailed.
          </p>
          <p className="mt-6">
            <Link href="/book" className="link-inline inline-flex min-h-11 items-center">
              Book a session (demo)
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
