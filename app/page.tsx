import { ClosingCta } from "@/components/home/ClosingCta";
import { Heritage } from "@/components/home/Heritage";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { InsightCards } from "@/components/home/InsightCards";
import { Pillars } from "@/components/home/Pillars";
import { Transactions } from "@/components/home/Transactions";

/**
 * The homepage. The hero is from the first design reference
 * (Envision_Prototype.html); every section after it follows the second
 * (deepseek_html_20260921_ccfe53.html). Header, footer and the concierge come
 * from app/layout.tsx.
 */
export default function Home() {
  return (
    <main id="main">
      <HeroCarousel />
      <Pillars />
      <Heritage />
      <Transactions />
      <InsightCards />
      <ClosingCta />
    </main>
  );
}
