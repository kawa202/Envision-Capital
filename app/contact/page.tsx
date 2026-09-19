import type { Metadata } from "next";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Envision Capital about a transaction, a valuation, your finance function or an independent view before the board takes a position. Harare, Zimbabwe.",
};

export default function ContactPage() {
  return (
    <main id="main">
      <PageHeader
        title={site.finalCta.heading}
        lede={site.finalCta.body}
      />
      <FinalCTA />
    </main>
  );
}
