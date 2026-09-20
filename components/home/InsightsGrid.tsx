import Image from "next/image";
import Link from "next/link";
import { insights } from "@/content/insights";

/**
 * Four insights.
 *
 * Desktop gives them four equal columns with square crops. Mobile does not:
 * four full-width cards stacked is four screens of scrolling to learn there
 * were four articles. It leads with one and lists the other three, which is
 * the same information in a third of the height.
 *
 * The square crop is the reason this section is affordable — a 1:1 at a
 * quarter of the column costs a fraction of the 3:2 it replaces.
 */
export function InsightsGrid() {
  const [lead, ...rest] = insights.slice(0, 4);

  return (
    <section className="section-y bg-white" aria-labelledby="insights-heading">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 id="insights-heading" className="text-display-l text-navy">
            Insights
          </h2>
          <Link href="/insights" className="link-inline inline-flex min-h-11 items-center">
            All insights
          </Link>
        </div>

        {/* ---------------- Desktop: four equal columns ---------------- */}
        <ul className="mt-12 hidden gap-x-8 gap-y-12 md:grid md:grid-cols-4">
          {insights.slice(0, 4).map((insight) => (
            <li key={insight.slug}>
              <Link href={insight.href} className="group block">
                {insight.image && (
                  <span className="relative mb-5 block aspect-square w-full overflow-hidden bg-navy">
                    <Image
                      src={insight.image.src}
                      alt=""
                      fill
                      sizes="23vw"
                      className="object-cover"
                    />
                  </span>
                )}
                <span className="block text-meta text-muted">{insight.category}</span>
                <span className="mt-2 block font-serif text-h4 text-navy decoration-1 underline-offset-[0.2em] group-hover:underline group-focus-visible:underline">
                  {insight.title}
                </span>
                <span className="mt-2 block text-meta text-muted">{insight.dek}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* ---------------- Mobile: one large, three rows ---------------- */}
        <div className="mt-10 md:hidden">
          <Link href={lead.href} className="group block">
            {lead.image && (
              <span className="relative mb-5 block aspect-square w-full overflow-hidden bg-navy">
                <Image
                  src={lead.image.src}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </span>
            )}
            <span className="block text-meta text-muted">{lead.category}</span>
            <span className="mt-2 block font-serif text-h4 text-navy">{lead.title}</span>
            <span className="mt-2 block text-meta text-muted">{lead.dek}</span>
          </Link>

          <ul className="mt-10 border-t border-line">
            {rest.map((insight) => (
              <li key={insight.slug} className="border-b border-line">
                <Link href={insight.href} className="block py-5">
                  <span className="block text-meta text-muted">{insight.category}</span>
                  <span className="mt-1.5 block font-serif text-h4 text-navy">
                    {insight.title}
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
