"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TOPICS, type Insight, type Topic } from "@/content/insights";

const ALL = "All";
type Filter = typeof ALL | Topic;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * The insights hub: a filter row, one feature, and the rest as a grid.
 *
 * Filtering happens in the browser. There are a few dozen articles, not a few
 * thousand, and this is a static export — a round trip to fetch four of them
 * would be slower than the click that asked for it.
 *
 * The chosen topic is written back into the URL with replaceState so a
 * filtered view can be linked to and the header's topic links land on the
 * right one, without pushing a history entry for every press.
 */
export function InsightsHub({ insights }: { insights: Insight[] }) {
  const [filter, setFilter] = useState<Filter>(ALL);

  /* Read ?topic= after mount rather than through useSearchParams: this page
     is exported static, and a client-only read keeps it out of a Suspense
     boundary it would otherwise need. */
  useEffect(() => {
    const topic = new URLSearchParams(window.location.search).get("topic");
    if (topic && (TOPICS as readonly string[]).includes(topic)) {
      setFilter(topic as Topic);
    }
  }, []);

  function choose(next: Filter) {
    setFilter(next);
    const url = new URL(window.location.href);
    if (next === ALL) url.searchParams.delete("topic");
    else url.searchParams.set("topic", next);
    window.history.replaceState(null, "", url);
  }

  const shown = filter === ALL ? insights : insights.filter((i) => i.category === filter);
  const [feature, ...rest] = shown;

  return (
    <>
      <section className="section-y bg-white" aria-labelledby="filter-heading">
        <div className="shell">
          <h2 id="filter-heading" className="sr-only">
            Filter insights by topic
          </h2>

          <div className="flex flex-wrap gap-x-8 gap-y-2 border-b border-line pb-4">
            {[ALL, ...TOPICS].map((topic) => {
              const active = filter === topic;
              return (
                <button
                  key={topic}
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(topic as Filter)}
                  className={`inline-flex min-h-11 min-w-11 items-center justify-center text-body transition-colors duration-[var(--ec-dur)] ${
                    active
                      ? "text-navy underline decoration-1 underline-offset-[0.4em]"
                      : "text-muted hover:text-navy"
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>

          <p aria-live="polite" className="mt-6 text-meta text-muted">
            {shown.length} {shown.length === 1 ? "article" : "articles"}
            {filter !== ALL && ` in ${filter}`}
          </p>

          {feature && (
            <article className="mt-12">
              <Link href={feature.href} className="group grid gap-x-12 gap-y-6 lg:grid-cols-12">
                {feature.image && (
                  <span className="relative block aspect-[3/2] w-full overflow-hidden bg-navy lg:col-span-7">
                    <Image
                      src={feature.image.src}
                      alt={feature.image.alt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="object-cover"
                    />
                  </span>
                )}
                <span className="lg:col-span-5 lg:self-center">
                  <span className="block text-meta text-muted">{feature.category}</span>
                  <span className="mt-3 block text-display-l font-serif text-navy decoration-1 underline-offset-[0.2em] group-hover:underline group-focus-visible:underline">
                    {feature.title}
                  </span>
                  <span className="mt-4 block text-body text-muted">{feature.dek}</span>
                  <time dateTime={feature.date} className="mt-4 block text-meta text-muted">
                    {formatDate(feature.date)}
                  </time>
                </span>
              </Link>
            </article>
          )}

          {rest.length > 0 && (
            <ul className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((insight) => (
                <li key={insight.slug}>
                  <Link href={insight.href} className="group block">
                    {insight.image && (
                      <span className="relative mb-5 block aspect-[3/2] w-full overflow-hidden bg-navy">
                        <Image
                          src={insight.image.src}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                          className="object-cover"
                        />
                      </span>
                    )}
                    <span className="block text-meta text-muted">{insight.category}</span>
                    <span className="mt-2 block text-h4 font-serif text-navy decoration-1 underline-offset-[0.2em] group-hover:underline group-focus-visible:underline">
                      {insight.title}
                    </span>
                    <time dateTime={insight.date} className="mt-3 block text-meta text-muted">
                      {formatDate(insight.date)}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          )}

        </div>
      </section>
    </>
  );
}
