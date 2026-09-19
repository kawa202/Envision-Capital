import type { Metadata } from "next";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { IndustryExplorer } from "@/components/sections/IndustryExplorer";
import { PageHeader } from "@/components/sections/PageHeader";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Mining, manufacturing, agriculture, financial services, consumer, infrastructure, technology and professional services — sector insight and financial discipline across Zimbabwe and the region.",
};

export default function IndustriesPage() {
  return (
    <main id="main">
      <PageHeader
        title="Sector insight. Financial discipline."
        lede="Financial technique transfers between sectors. Judgement does not — it comes from knowing which constraint governs the decision in front of you."
      />
      <IndustryExplorer />
      <FinalCTA />
    </main>
  );
}
