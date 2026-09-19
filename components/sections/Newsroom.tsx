import Link from "next/link";
import { ImageCard } from "@/components/cards/ImageCard";
import { ArrowLink } from "@/components/ui/Bits";
import { HubHeader } from "@/components/ui/HubHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { news, type NewsItem } from "@/content/news";

/** "14 Jun 2026" */
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Dateline({ item }: { item: NewsItem }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 text-[0.8125rem] text-analytical tnum">
      <time dateTime={item.date}>{formatDate(item.date)}</time>
      <span className="h-3.5 w-px bg-analytical/50" aria-hidden="true" />
      <span>{item.location}</span>
    </p>
  );
}

/**
 * Newsroom — the two latest announcements as photograph cards, the rest as a
 * compact list alongside. The list grows as the newsroom does; the cards do
 * not.
 */
export function Newsroom() {
  const lead = news.slice(0, 2);
  const more = news.slice(2, 5);

  return (
    <section id="newsroom" className="section-y bg-paper" aria-labelledby="newsroom-heading">
      <div className="shell">
        <HubHeader id="newsroom-heading" title="Latest announcements" />

        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-12 lg:gap-8">
          <RevealGroup
            as="ul"
            className="grid gap-10 md:grid-cols-2 md:gap-6 lg:col-span-8"
            stagger={0.08}
          >
            {lead.map((item) => (
              <RevealItem as="li" key={item.slug}>
                <ImageCard
                  href={item.href}
                  image={item.image}
                  title={item.title}
                  footer={<Dateline item={item} />}
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                />
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="lg:col-span-3 lg:col-start-10">
            <h3 className="font-sans text-[0.8125rem] font-medium text-graphite">
              More announcements
            </h3>
            <ul className="mt-5">
              {more.map((item) => (
                <li key={item.slug} className="border-t border-line py-5 first:border-t-0 first:pt-0">
                  <Link
                    href={item.href}
                    className="font-display text-[1.125rem] leading-snug text-navy transition-colors duration-300 hover:text-analytical"
                  >
                    {item.title}
                  </Link>
                  <div className="mt-2.5">
                    <Dateline item={item} />
                  </div>
                </li>
              ))}
            </ul>
            <ArrowLink href="/newsroom" className="mt-4">
              All announcements
            </ArrowLink>
          </Reveal>
        </div>

        <p className="mt-8 text-meta leading-relaxed text-muted">
          [ANNOUNCEMENT CONTENT REQUIRED] — The rows above are empty slots that
          demonstrate the newsroom layout. Titles, dates, places and attribution
          come from Envision; nothing has been drafted on the firm&rsquo;s
          behalf.
        </p>
      </div>
    </section>
  );
}
