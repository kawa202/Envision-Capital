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

        <h3 className="font-display text-[1.1875rem] leading-snug text-navy decoration-1 underline-offset-[0.2em] group-hover:underline group-focus-visible:underline md:col-span-7 md:text-[1.25rem]">
          {item.title}
        </h3>

        <p className="text-[0.8125rem] leading-snug text-muted md:col-span-3 md:text-right">
          {item.location} — {item.author}
        </p>
      </Link>
    </article>
  );
}
