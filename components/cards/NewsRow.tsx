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
        className="group grid items-baseline gap-x-8 gap-y-2 border-t border-brass/35 py-6 transition-colors duration-300 hover:bg-paper-2 md:grid-cols-12 md:py-7"
      >
        <time
          dateTime={item.date}
          className="font-mono text-[0.68rem] tracking-[0.1em] text-muted tnum md:col-span-2"
        >
          {formatDate(item.date)}
        </time>

        <h3 className="font-display text-[1.1875rem] leading-snug text-navy md:col-span-7 md:text-[1.25rem]">
          {/* Gold underline draws in beneath the headline only. */}
          <span className="bg-gradient-to-r from-brass to-brass bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[length:100%_1px]">
            {item.title}
          </span>
        </h3>

        <p className="text-[0.8125rem] leading-snug text-muted md:col-span-3 md:text-right">
          {item.location} — {item.author}
        </p>
      </Link>
    </article>
  );
}
