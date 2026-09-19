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
        className="group flex h-full flex-col border-t border-line pt-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1"
      >
        <span className="eyebrow text-analytical">{insight.category}</span>

        <h3 className="mt-4 font-display text-[1.25rem] leading-snug text-navy">
          {/* The gold underline draws in beneath the headline only, not the
              whole card, so the hover reads as editorial rather than as a UI
              control. */}
          <span className="bg-gradient-to-r from-brass to-brass bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[length:100%_1px]">
            {insight.title}
          </span>
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
