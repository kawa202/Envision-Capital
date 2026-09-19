import { CaseStudyFeature } from "@/components/home/CaseStudyFeature";
import { CtaBand } from "@/components/home/CtaBand";
import { FeaturedInsights } from "@/components/home/FeaturedInsights";
import { Hero } from "@/components/home/Hero";
import { PartnerProof } from "@/components/home/PartnerProof";
import { PracticeSnapshot } from "@/components/home/PracticeSnapshot";

/**
 * The homepage. Six sections, then the footer from app/layout.tsx.
 *
 * What it no longer carries: a rotating hero, a newsroom feed, "On the
 * agenda", "Discover more", "Where are you coming from?", an affiliations
 * strip and a case-study carousel. Eleven sections asked a reader to keep
 * choosing; six tell them what the firm does, how it thinks, who stands
 * behind it, what it has done, and what to do next.
 */
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <PracticeSnapshot />
      <FeaturedInsights />
      <PartnerProof />
      <CaseStudyFeature />
      <CtaBand />
    </main>
  );
}
