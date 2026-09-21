import { Capabilities } from "@/components/home/Capabilities";
import { ClosingCta } from "@/components/home/ClosingCta";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { InsightCards } from "@/components/home/InsightCards";
import { Intro } from "@/components/home/Intro";

/**
 * The homepage, built to the approved design direction
 * (Envision_Prototype.html): hero carousel, who we are, capabilities,
 * insights, and a closing call to action. Header, footer and the concierge
 * come from app/layout.tsx.
 */
export default function Home() {
  return (
    <main id="main">
      <HeroCarousel />
      <Intro />
      <Capabilities />
      <InsightCards />
      <ClosingCta />
    </main>
  );
}
