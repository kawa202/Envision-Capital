import Link from "next/link";
import { UnverifiedFlag } from "@/components/ui/Bits";
import type { CaseStudy } from "@/content/caseStudies";

/**
 * Reusable case-study card.
 *
 * `large` gives the outcome the weight of a pull quote — it is the number a
 * reader should leave with. `small` compresses to a single stacked row so two
 * can sit beside one large without the column feeling starved.
 */
export function CaseStudyCard({
  caseStudy,
  size = "small",
}: {
  caseStudy: CaseStudy;
  size?: "large" | "small";
}) {
  const isLarge = size === "large";

  return (
    <article className={isLarge ? "h-full" : ""}>
      <Link
        href={caseStudy.href}
        className="group flex h-full flex-col border-t border-line pt-5"
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="text-meta text-muted">{caseStudy.client}</span>
          <span className="text-muted" aria-hidden="true">
            /
          </span>
          <span className="text-meta text-muted">{caseStudy.mandate}</span>
        </div>

        <p
          className={`font-display text-navy ${
            isLarge
              ? "mt-6 text-display-m leading-[1.15]"
              : "mt-3.5 text-[1.125rem] leading-snug"
          }`}
        >
          {caseStudy.title}
        </p>

        <div
          className={`flex flex-wrap items-center justify-between gap-3 ${
            isLarge ? "mt-auto pt-10" : "mt-auto pt-5"
          }`}
        >
          <span className="flex items-center gap-2.5 text-[0.8125rem] text-navy">
            <span className="link-draw">Read the case study</span>
            <span
              className="transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </span>
          {caseStudy.unverified && <UnverifiedFlag>Placeholder</UnverifiedFlag>}
        </div>
      </Link>
    </article>
  );
}
