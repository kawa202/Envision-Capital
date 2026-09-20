import type { Metadata } from "next";
import { InsightsHub } from "@/components/insights/InsightsHub";
import { PageHeader } from "@/components/sections/PageHeader";
import { NewsletterCTA } from "@/components/sections/NewsletterCTA";
import { insights } from "@/content/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Perspectives on the decisions that shape capital — written for boards, investors and finance leaders who have to act on them.",
};

export default function InsightsIndexPage() {
  /* Newest first, so the feature is the most recent piece rather than
     whichever one happens to sit at the top of the file. */
  const ordered = [...insights].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main id="main">
      <PageHeader
        title="Perspectives on the decisions that shape capital."
        lede="Written for boards, investors and finance leaders who have to act on them — not for search engines."
      />

      <InsightsHub insights={ordered} />

      <NewsletterCTA />
    </main>
  );
}
