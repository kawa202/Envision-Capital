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
          <div className="border-t border-line" aria-hidden="true" />

          <p className="mt-10 text-meta leading-relaxed text-muted">
            [ANNOUNCEMENT CONTENT REQUIRED] — The rows above are empty slots
            that demonstrate the newsroom layout. Titles, dates, places and
            attribution come from Envision; nothing has been drafted on the
            firm&rsquo;s behalf.
          </p>
        </div>
      </section>
    </main>
  );
}
