import type { Metadata } from "next";
import { CrmBoard } from "@/components/demo/CrmBoard";
import { PageHeader } from "@/components/sections/PageHeader";

/**
 * Not in the navigation, and explicitly noindex on top of the site-wide
 * rule: this is a presentation tool, not a page of the website.
 */
export const metadata: Metadata = {
  title: "Demo pipeline",
  description: "A demonstration of what Envision sees after a booking is made.",
  robots: { index: false, follow: false },
};

export default function DemoCrmPage() {
  return (
    <main id="main">
      <PageHeader
        title="Demo pipeline."
        lede="What the firm sees after a booking is made."
      />

      <section className="section-y bg-white">
        <div className="shell">
          <p className="measure text-meta text-ink">
            Demo — no real booking or payment is made. Records are read from
            this browser only.
          </p>
          <div className="mt-12">
            <CrmBoard />
          </div>
        </div>
      </section>
    </main>
  );
}
