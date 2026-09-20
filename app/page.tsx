import { CtaBand } from "@/components/home/CtaBand";
import { FeaturedInsights } from "@/components/home/FeaturedInsights";
import { KeyFigures } from "@/components/home/KeyFigures";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { PartnerProof } from "@/components/home/PartnerProof";
import { PositioningStatement } from "@/components/home/PositioningStatement";
import { Practices } from "@/components/home/Practices";

/**
 * The homepage. Six sections, then the footer from app/layout.tsx.
 *
 * Three stories, the firm's position, what it does, what it is thinking,
 * who stands behind it, one action. Case studies, the newsroom, the agenda
 * and the audience router have pages of their own and are reached from the
 * mega menu — a landing page that carries everything carries nothing.
 */
export default function Home() {
  return (
    <main id="main">
      <HeroCarousel />
      <PositioningStatement />
      <Practices />
      <KeyFigures />
      <FeaturedInsights />
      <PartnerProof />
      <CtaBand />
    </main>
  );
}
