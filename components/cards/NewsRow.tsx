import Link from "next/link";
import type { NewsItem } from "@/content/news";

/** "29 JUL 2026" — small caps, tabular, stable width across rows. */
function formatDate(iso: string) {
  return new Date(iso)
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase()
    .replace(/,/g, "");
}

/**
 * One newsroom row: date left, headline centre, attribution right.
 * Newspaper-style — no card, no border box, just a hairline between rows.
 */
export function NewsRow({ item }: { item: NewsItem }) {
  return (
    <article>
      <Link
        href={item.href}
        className="group grid items-baseline gap-x-8 gap-y-2 border-t border-line py-6 transition-colors duration-300 hover:bg-stone md:grid-cols-12 md:py-7"
      >
        <time
          dateTime={item.date}
          className="text-meta text-muted tnum md:col-span-2"
        >
          {formatDate(item.date)}
        </time>

        <h3 className="font-display text-h4 leading-snug text-navy decoration-1 underline-offset-[0.2em] group-hover:underline group-focus-visible:underline md:col-span-7 md:text-h4">
          {item.title}
        </h3>

        <p className="text-meta leading-snug text-muted md:col-span-3 md:text-right">
          {item.location} — {item.author}
        </p>
      </Link>
    </article>
  );
}
