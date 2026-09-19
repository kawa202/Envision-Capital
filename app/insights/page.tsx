import type { Metadata } from "next";
import { InsightCard } from "@/components/cards/InsightCard";
import { PageHeader } from "@/components/sections/PageHeader";
import { NewsletterCTA } from "@/components/sections/NewsletterCTA";
import { insights } from "@/content/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Perspectives on the decisions that shape capital — corporate finance, valuation, transactions and finance transformation, written for the people who have to take them.",
};

export default function InsightsIndexPage() {
  return (
    <main id="main">
      <PageHeader
        title="Perspectives on the decisions that shape capital."
        lede="Written for boards, investors and finance leaders who have to act on them — not for search engines."
      />

      <section className="section-y bg-paper" aria-labelledby="all-insights">
        <div className="shell">
          <h2 id="all-insights" className="sr-only">
            All insights
          </h2>

          {/* No three-across cap here: the index flows into as many columns as
              the viewport allows and grows with the content. */}
          <ul className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {insights.map((insight) => (
              <li key={insight.slug} className="h-full">
                <InsightCard insight={insight} />
              </li>
            ))}
          </ul>

          <p className="mt-14 border-t border-line pt-5 text-meta leading-relaxed text-muted">
            [ARTICLE CONTENT REQUIRED] — Headlines and deks demonstrate the
            editorial hierarchy. No article body exists behind these links;
            each requires authorship and compliance review before publication.
          </p>
        </div>
      </section>

      <NewsletterCTA />
    </main>
  );
}
