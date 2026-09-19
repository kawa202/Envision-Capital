import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLink, UnverifiedFlag } from "@/components/ui/Bits";
import { PageHeader } from "@/components/sections/PageHeader";
import { caseStudies } from "@/content/caseStudies";

/* Only the slugs generated at build time exist — required for the static
   export, and an unknown slug returns 404 rather than rendering on demand. */
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const item = caseStudies.find((c) => c.slug === slug);
  if (!item) return { title: "Case study not found" };

  return {
    title: `${item.client} — ${item.mandate}`,
    description: item.outcome,
    alternates: { canonical: `/work/${item.slug}` },
  };
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const item = caseStudies.find((c) => c.slug === slug);
  if (!item) notFound();

  return (
    <main id="main">
      <PageHeader
        eyebrow={item.mandate}
        title={item.outcome}
        lede={item.client}
      />

      <article className="section-y bg-paper">
        <div className="shell">
          <dl className="grid max-w-2xl gap-6 border-b border-line pb-8 sm:grid-cols-2">
            <div>
              <dt className="eyebrow text-muted">Client</dt>
              <dd className="mt-2 text-[0.9375rem] text-graphite">
                {item.client}
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-muted">Mandate</dt>
              <dd className="mt-2 text-[0.9375rem] text-graphite">
                {item.mandate}
              </dd>
            </div>
          </dl>

          <div className="mt-10 max-w-2xl border-l-2 border-brass py-2 pl-6">
            <p className="font-mono text-[0.72rem] leading-relaxed tracking-[0.06em] text-analytical">
              [CASE STUDY BODY REQUIRED]
            </p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
              Challenge, approach, role and outcome require verified,
              client-consented content. The mandate summarised above is a
              fabricated placeholder, figures included.
            </p>
          </div>

          {item.unverified && (
            <p className="mt-8">
              <UnverifiedFlag>Placeholder mandate</UnverifiedFlag>
            </p>
          )}

          <div className="mt-12 border-t border-line pt-8">
            <ArrowLink href="/work">All case studies</ArrowLink>
          </div>
        </div>
      </article>
    </main>
  );
}
