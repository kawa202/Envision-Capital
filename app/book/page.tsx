import type { Metadata } from "next";
import { BookingFlow } from "@/components/book/BookingFlow";
import { PageHeader } from "@/components/sections/PageHeader";

export const metadata: Metadata = {
  title: "Book a session",
  description:
    "A demonstration of the Envision Capital booking flow. No booking is made and no payment is taken.",
};

export default function BookPage() {
  return (
    <main id="main">
      <PageHeader
        title="Book a session."
        lede="Choose a service, pick a time, and see the confirmation a client would receive."
      />

      <section className="section-y bg-white">
        <div className="shell">
          <p className="measure text-meta text-ink">
            Demo — no real booking or payment is made.
          </p>
          <div className="mt-10">
            <BookingFlow />
          </div>
        </div>
      </section>
    </main>
  );
}
