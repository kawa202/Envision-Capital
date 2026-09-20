import { AboutSplit } from "@/components/home/AboutSplit";
import { ContactBand } from "@/components/home/ContactBand";
import { FraudNotice } from "@/components/home/FraudNotice";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { InsightsGrid } from "@/components/home/InsightsGrid";
import { KeyFigures } from "@/components/home/KeyFigures";
import { NewsCarousel } from "@/components/home/NewsCarousel";
import { Practices } from "@/components/home/Practices";
import { Tombstones } from "@/components/home/Tombstones";
import { WhereWeWork } from "@/components/home/WhereWeWork";

/**
 * The homepage.
 *
 * Ten sections and then the footer, following the section patterns of a
 * long-form advisory homepage: three stories, what the firm does, what it
 * can count, what it is thinking, who it is, what it has done, what it has
 * said, where it is, and one way to begin — with the fraud notice last,
 * where the legal matter lives.
 *
 * Only the hero moves on its own. The news carousel waits to be pressed and
 * the tombstones are CSS scroll-snap, so there is one thing to pause on this
 * page rather than three.
 */
export default function Home() {
  return (
    <main id="main">
      <HeroCarousel />
      <Practices />
      <KeyFigures />
      <InsightsGrid />
      <AboutSplit />
      <Tombstones />
      <NewsCarousel />
      <WhereWeWork />
      <ContactBand />
      <FraudNotice />
    </main>
  );
}
