import { Affiliations } from "@/components/sections/Affiliations";
import { CapabilityOverview } from "@/components/sections/CapabilityOverview";
import { DiscoverMore } from "@/components/sections/DiscoverMore";
import { ExploreByRole } from "@/components/sections/ExploreByRole";
import { FeaturedInsights } from "@/components/sections/FeaturedInsights";
import { Hero } from "@/components/sections/Hero";
import { NewsletterCTA } from "@/components/sections/NewsletterCTA";
import { Newsroom } from "@/components/sections/Newsroom";
import { OnTheAgenda } from "@/components/sections/OnTheAgenda";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Spotlights } from "@/components/sections/Spotlights";

/**
 * The hub.
 *
 * Follows the content architecture of a large professional-services homepage:
 * what the firm does, then its thinking, then who it is, then ways in by
 * role, then proof, news and topics — every section a door into its own
 * route. Depth lives on the spokes.
 *
 * Navigation and Footer are rendered by app/layout.tsx so all routes share
 * them.
 */
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <CapabilityOverview />
      <FeaturedInsights />
      <Spotlights />
      <ExploreByRole />
      <Affiliations />
      <SelectedWork />
      <NewsletterCTA />
      <Newsroom />
      <OnTheAgenda />
      <DiscoverMore />
    </main>
  );
}
