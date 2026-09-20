import { AudienceRouting } from "@/components/home/AudienceRouting";
import { CaseStudyRow } from "@/components/home/CaseStudyRow";
import { CtaBand } from "@/components/home/CtaBand";
import { DiscoverMore } from "@/components/home/DiscoverMore";
import { FeaturedInsights } from "@/components/home/FeaturedInsights";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { HowWeCanHelp } from "@/components/home/HowWeCanHelp";
import { NewsroomAndAgenda } from "@/components/home/NewsroomAndAgenda";
import { PositioningStatement } from "@/components/home/PositioningStatement";
import { NewsletterCTA } from "@/components/sections/NewsletterCTA";

/**
 * The homepage.
 *
 * Three stories, what the firm does, what it is thinking, the argument, a
 * way in by role, then proof and one action — with the footer coming from
 * app/layout.tsx. Every section is a door into its own route; depth lives on
 * the spokes.
 */
export default function Home() {
  return (
    <main id="main">
      <HeroCarousel />
      <PositioningStatement />
      <HowWeCanHelp />
      <FeaturedInsights />
      <CaseStudyRow />
      <NewsroomAndAgenda />
      <NewsletterCTA />
      <DiscoverMore />
      <CtaBand />
    </main>
  );
}
