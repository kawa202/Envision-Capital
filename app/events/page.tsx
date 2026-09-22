import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { agenda } from "@/content/agenda";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Briefings, roundtables and speaking appearances from Envision Capital.",
};

/**
 * On the agenda, moved off the homepage and given a page of its own.
 *
 * Every slot is empty, and deliberately dateless. A date, a venue and a title
 * together read as a commitment; a reader who turns up to an event that does
 * not exist has been misled by the website rather than by a placeholder.
 */
export default function EventsPage() {
  return (
    <main id="main">
      <PageHeader
        title="On the agenda."
        lede="Briefings, roundtables and the rooms we are speaking in."
      />

      <section className="section-y bg-white" aria-label="Upcoming events">
        <div className="shell">
          <ul className="border-t border-line">
            {agenda.map((item) => (
              <li key={item.id} className="border-b border-line py-8">
                <div className="grid gap-x-10 gap-y-2 lg:grid-cols-12">
                  <p className="text-meta text-muted lg:col-span-2">{item.when}</p>
                  <div className="lg:col-span-7">
                    <h2 className="text-display-m text-navy">{item.title}</h2>
                    <p className="mt-2 text-body text-muted">
                      {item.format} · {item.location}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>


          <p className="mt-10">
            <Link
              href="/newsroom"
              className="link-inline inline-flex min-h-11 items-center"
            >
              Newsroom
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
