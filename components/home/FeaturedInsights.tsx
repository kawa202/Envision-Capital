import Image from "next/image";
import Link from "next/link";
import { insights } from "@/content/insights";

/** "18 August 2026" — long form; there are only four of them. */
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * One feature and three followers.
 *
 * Four equal cards make a reader choose; a lead with three beneath it tells
 * them where to start. Only the feature carries a large photograph — the
 * three below take the 480px variant, which is where most of the budget
 * saving on this section comes from.
 */
export function FeaturedInsights() {
  const [feature, ...rest] = insights.slice(0, 4);

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

        <div className="mt-12 grid gap-x-12 gap-y-12 lg:grid-cols-12">
          {/* ---------------- The feature ---------------- */}
          <article className="lg:col-span-7">
            <Link href={feature.href} className="group block">
              {feature.image && (
                <span className="relative block aspect-[3/2] w-full overflow-hidden bg-navy">
                  <Image
                    src={feature.image.src}
                    alt={feature.image.alt}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover"
                  />
                </span>
              )}
              <span className="mt-6 block text-meta text-muted">{feature.category}</span>
              <h3 className="mt-3 text-display-l text-navy decoration-1 underline-offset-[0.2em] group-hover:underline group-focus-visible:underline">
                {feature.title}
              </h3>
              <span className="mt-4 block max-w-xl text-body text-muted">
                {feature.dek}
              </span>
              <time dateTime={feature.date} className="mt-4 block text-meta text-muted">
                {formatDate(feature.date)}
              </time>
            </Link>
          </article>

          {/* ---------------- The three ---------------- */}
          <ul className="divide-y divide-line border-t border-line lg:col-span-5 lg:border-t-0">
            {rest.map((insight) => (
              <li key={insight.slug} className="py-6 first:lg:pt-0">
                <Link href={insight.href} className="group flex gap-5">
                  {insight.image && (
                    <span className="relative block aspect-square w-24 shrink-0 overflow-hidden bg-navy sm:w-28">
                      <Image
                        src={insight.image.src}
                        alt=""
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block text-meta text-muted">{insight.category}</span>
                    <span className="mt-1.5 block text-display-m text-navy decoration-1 underline-offset-[0.2em] group-hover:underline group-focus-visible:underline">
                      {insight.title}
                    </span>
                    <time
                      dateTime={insight.date}
                      className="mt-2 block text-meta text-muted"
                    >
                      {formatDate(insight.date)}
                    </time>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-12 text-meta leading-relaxed text-muted">
          [ARTICLE CONTENT REQUIRED] — Titles, deks and dates demonstrate the
          editorial hierarchy. No article body exists behind these links; each
          requires authorship and compliance review before publication.
        </p>
      </div>
    </section>
  );
}
