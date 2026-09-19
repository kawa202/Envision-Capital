import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLink } from "@/components/ui/Bits";
import { PageHeader } from "@/components/sections/PageHeader";
import { insights } from "@/content/insights";

/* Only the slugs generated at build time exist — required for the static
   export, and an unknown slug returns 404 rather than rendering on demand. */
export const dynamicParams = false;

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
        title={insight.title}
        lede={insight.dek}
        meta={insight.category}
      />

      <article className="section-y bg-paper">
        <div className="shell">
          {/* The body is deliberately absent rather than invented. Authorship
              and compliance review come before publication. */}
          <div className="max-w-2xl border-t border-line pt-6">
            <p className="text-meta text-ink">
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
                  <p className="text-meta text-analytical">{item.category}</p>
                  <h3 className="mt-3 font-display text-[1.25rem] leading-snug text-navy">
                    <Link href={item.href} className="link-draw">
                      {item.title}
                    </Link>
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
