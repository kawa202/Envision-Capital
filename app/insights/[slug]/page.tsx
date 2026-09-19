import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLink } from "@/components/ui/Bits";
import { PageHeader } from "@/components/sections/PageHeader";
import { insights } from "@/content/insights";

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata(
  props: PageProps<"/insights/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const insight = insights.find((i) => i.slug === slug);
  if (!insight) return { title: "Insight not found" };

  return {
    title: insight.title,
    description: insight.dek,
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: { title: insight.title, description: insight.dek },
  };
}

export default async function InsightPage(
  props: PageProps<"/insights/[slug]">,
) {
  const { slug } = await props.params;
  const insight = insights.find((i) => i.slug === slug);
  if (!insight) notFound();

  const others = insights.filter((i) => i.slug !== slug);

  return (
    <main id="main">
      <PageHeader
        eyebrow={insight.category}
        title={insight.title}
        lede={insight.dek}
      />

      <article className="section-y bg-paper">
        <div className="shell">
          {/* The body is deliberately absent rather than invented. Authorship
              and compliance review come before publication. */}
          <div className="max-w-2xl border-l-2 border-brass py-2 pl-6">
            <p className="font-mono text-[0.72rem] leading-relaxed tracking-[0.06em] text-analytical">
              [ARTICLE BODY REQUIRED]
            </p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
              This template is ready for the article. Supply the body copy,
              author attribution and publication date and this page renders
              them — nothing here has been drafted on Envision&rsquo;s behalf.
            </p>
          </div>

          <div className="mt-12 border-t border-line pt-8">
            <ArrowLink href="/insights">All insights</ArrowLink>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="section-y bg-paper-2" aria-labelledby="more-insights">
          <div className="shell">
            <h2
              id="more-insights"
              className="font-display text-display-m text-navy"
            >
              More perspectives
            </h2>
            <ul className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-2">
              {others.map((item) => (
                <li key={item.slug} className="border-t border-line pt-5">
                  <p className="eyebrow text-analytical">{item.category}</p>
                  <h3 className="mt-3 font-display text-[1.25rem] leading-snug text-navy">
                    <a href={item.href} className="link-draw">
                      {item.title}
                    </a>
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
                    {item.dek}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
