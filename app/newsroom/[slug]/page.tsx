import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLink } from "@/components/ui/Bits";
import { PageHeader } from "@/components/sections/PageHeader";
import { newsBodies } from "@/content/bodies";
import { news } from "@/content/news";

/* Only the slugs generated at build time exist — required for the static
   export, and an unknown slug returns 404 rather than rendering on demand. */
export const dynamicParams = false;

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata(
  props: PageProps<"/newsroom/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const item = news.find((n) => n.slug === slug);
  if (!item) return { title: "Announcement not found" };

  return {
    title: item.title,
    description: `${item.title} — ${item.location}.`,
    alternates: { canonical: `/newsroom/${item.slug}` },
    openGraph: { title: item.title, type: "article", publishedTime: item.date },
  };
}

export default async function NewsPage(props: PageProps<"/newsroom/[slug]">) {
  const { slug } = await props.params;
  const item = news.find((n) => n.slug === slug);
  if (!item) notFound();

  const formatted = new Date(item.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main id="main">
      <PageHeader title={item.title} />

      <article className="section-y bg-paper">
        <div className="shell">
          <dl className="grid max-w-2xl gap-6 border-b border-line pb-8 sm:grid-cols-3">
            <div>
              <dt className="text-meta text-muted">Date</dt>
              <dd className="mt-2 text-meta text-graphite">
                <time dateTime={item.date}>{formatted}</time>
              </dd>
            </div>
            <div>
              <dt className="text-meta text-muted">Location</dt>
              <dd className="mt-2 text-meta text-graphite">
                {item.location}
              </dd>
            </div>
            <div>
              <dt className="text-meta text-muted">Contact</dt>
              <dd className="mt-2 text-meta text-graphite">
                {item.author}
              </dd>
            </div>
          </dl>

          <div className="mt-10 max-w-2xl space-y-6">
            {(newsBodies[item.slug] ?? []).map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-[1.05rem] leading-[1.8] text-ink">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 border-t border-line pt-8">
            <ArrowLink href="/newsroom">All announcements</ArrowLink>
          </div>
        </div>
      </article>
    </main>
  );
}
