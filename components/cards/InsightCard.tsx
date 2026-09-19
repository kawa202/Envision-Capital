import Link from "next/link";
import type { Insight } from "@/content/insights";

/**
 * Reusable insight card.
 *
 * Deliberately imageless: the spec calls for category, headline, dek and a
 * read link, and three text cards in a row read as an editorial index rather
 * than as a blog. The whole card is one link target so the hit area matches
 * what the eye treats as clickable.
 */
export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <article className="h-full">
      <Link
        href={insight.href}
        className="group flex h-full flex-col"
      >
        <span className="text-meta text-muted">{insight.category}</span>

        <h3 className="mt-4 font-display text-[1.25rem] leading-snug text-navy decoration-1 underline-offset-[0.2em] group-hover:underline group-focus-visible:underline">
          {insight.title}
        </h3>

        <p className="mt-3 text-[0.875rem] leading-relaxed text-muted">
          {insight.dek}
        </p>

        <span className="mt-auto flex items-center gap-2.5 pt-6 text-[0.8125rem] text-navy">
          Read more
          <span
            className="transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </span>
      </Link>
    </article>
  );
}
