import type { Metadata } from "next";
import { NewsRow } from "@/components/cards/NewsRow";
import { PageHeader } from "@/components/sections/PageHeader";
import { news } from "@/content/news";

export const metadata: Metadata = {
  title: "Newsroom",
  description:
    "Announcements from Envision Capital — mandates, publications and firm news from Harare and across the region.",
};

export default function NewsroomIndexPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Newsroom"
        title="Recent announcements."
        lede="Mandates, publications and firm news."
      />

      <section className="section-y bg-paper" aria-labelledby="all-announcements">
        <div className="shell">
          <h2 id="all-announcements" className="sr-only">
            All announcements
          </h2>

          <ul>
            {news.map((item) => (
              <li key={item.slug}>
                <NewsRow item={item} />
              </li>
            ))}
          </ul>
          {/* Closing rule so the last row is bounded like the others. */}
          <div className="border-t border-brass/35" aria-hidden="true" />

          <p className="mt-10 font-mono text-[0.68rem] leading-relaxed tracking-[0.04em] text-muted">
            [ANNOUNCEMENT CONTENT REQUIRED] — Fabricated placeholders
            demonstrating the newsroom layout. The transaction value, the
            regional footprint, the award and the named partners are all
            invented. Verify every one with Envision before publication.
          </p>
        </div>
      </section>
    </main>
  );
}
