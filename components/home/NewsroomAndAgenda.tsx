import Link from "next/link";
import { agenda } from "@/content/agenda";
import { news } from "@/content/news";

/** "29 Jul 2026" — short, tabular, so the column reads straight down. */
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Two columns of short items: what the firm has said, and what it is doing
 * next. Side by side on desktop, stacked on mobile, text only.
 *
 * Both lists are empty slots. The agenda in particular carries no dates at
 * all — a date, a venue and a title together read as a commitment, and a
 * reader who turns up to an event that does not exist has been misled by the
 * website rather than by a placeholder.
 */
export function NewsroomAndAgenda() {
  return (
    <section className="section-y bg-white" aria-labelledby="newsroom-heading">
      <div className="shell grid gap-x-16 gap-y-14 lg:grid-cols-2">
        {/* ---------------- Newsroom ---------------- */}
        <div>
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <h2 id="newsroom-heading" className="text-display-l text-navy">
              Newsroom
            </h2>
            <Link
              href="/newsroom"
              className="link-inline inline-flex min-h-11 items-center"
            >
              All announcements
            </Link>
          </div>

          <ul className="mt-8 border-t border-line">
            {news.slice(0, 3).map((item) => (
              <li key={item.slug} className="border-b border-line">
                <Link href={item.href} className="group block py-5">
                  <time dateTime={item.date} className="block text-meta tnum text-muted">
                    {formatDate(item.date)}
                  </time>
                  <span className="mt-2 block text-display-m text-navy decoration-1 underline-offset-[0.2em] group-hover:underline group-focus-visible:underline">
                    {item.title}
                  </span>
                  <span className="mt-2 block text-meta text-muted">
                    {item.location} — {item.author}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-meta leading-relaxed text-muted">
            [ANNOUNCEMENT CONTENT REQUIRED] — Empty slots demonstrating the
            layout.
          </p>
        </div>

        {/* ---------------- On the agenda ---------------- */}
        <div>
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <h2 className="text-display-l text-navy">On the agenda</h2>
          </div>

          <ul className="mt-8 border-t border-line">
            {agenda.map((item) => (
              <li key={item.id} className="border-b border-line py-5">
                <p className="text-meta text-muted">{item.when}</p>
                <p className="mt-2 text-display-m text-navy">{item.title}</p>
                <p className="mt-2 text-meta text-muted">
                  {item.format} · {item.location}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-meta leading-relaxed text-muted">
            [EVENTS REQUIRED] — Nothing here is scheduled, and no date has been
            filled in. Supply the events and each one becomes a live entry.
          </p>
        </div>
      </div>
    </section>
  );
}
