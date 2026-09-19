import Image from "next/image";
import Link from "next/link";
import { insights } from "@/content/insights";

/** "18 August 2026" — long form, because there are only three of them. */
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Three articles: photograph, category, title, date. No borders, no panels,
 * and the whole block is the link, so the title is not repeated underneath
 * itself as "Explore …".
 */
export function FeaturedInsights() {
  return (
    <section className="section-y bg-stone" aria-labelledby="insights-heading">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 id="insights-heading" className="text-display-l text-navy">
            Insights
          </h2>
          <Link href="/insights" className="link-inline inline-flex min-h-11 items-center">
            All insights
          </Link>
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {insights.slice(0, 3).map((insight) => (
            <li key={insight.slug}>
              <Link href={insight.href} className="group block">
                {insight.image && (
                  <span className="relative block aspect-[4/3] w-full overflow-hidden bg-navy">
                    <Image
                      src={insight.image.src}
                      alt={insight.image.alt}
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ec-ease)] group-hover:scale-[1.03]"
                    />
                  </span>
                )}
                <span className="mt-5 block text-meta text-muted">
                  {insight.category}
                </span>
                <h3 className="mt-3 text-display-m text-navy decoration-1 underline-offset-[0.2em] group-hover:underline group-focus-visible:underline">
                  {insight.title}
                </h3>
                <time dateTime={insight.date} className="mt-3 block text-meta text-muted">
                  {formatDate(insight.date)}
                </time>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-meta leading-relaxed text-muted">
          [ARTICLE CONTENT REQUIRED] — Titles, deks and dates demonstrate the
          editorial hierarchy. No article body exists behind these links; each
          requires authorship and compliance review before publication.
        </p>
      </div>
    </section>
  );
}
