import type { Metadata } from "next";
import { CapabilityExplorer } from "@/components/sections/CapabilityExplorer";
import { Credentials } from "@/components/sections/Credentials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { IntroStatement } from "@/components/sections/IntroStatement";
import { PageHeader } from "@/components/sections/PageHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "What we do",
  description:
    "Corporate finance advisory, M&A, valuation, capital advisory, virtual CFO, financial reporting and finance transformation — capability across the decision, not one part of it.",
};

export default function WhatWeDoPage() {
  return (
    <main id="main">
      <PageHeader
        title={site.capabilities.heading}
        lede={site.capabilities.lede}
      />
      <IntroStatement />
      <CapabilityExplorer />
      <Credentials />
      <FinalCTA />
    </main>
  );
}
