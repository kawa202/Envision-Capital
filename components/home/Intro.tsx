import Link from "next/link";
import { Arrow } from "@/components/ui/Arrow";
import { INTRO } from "@/content/home";

/** Who we are: heading left, two paragraphs and a link right. */
export function Intro() {
  return (
    <section className="px-[6%] py-20 md:py-32" aria-labelledby="intro-heading">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="eyebrow">{INTRO.eyebrow}</span>
          <h2 id="intro-heading" className="text-[clamp(2rem,3vw,3rem)] leading-[1.2]">
            {INTRO.heading}
          </h2>
        </div>
        <div>
          {INTRO.paragraphs.map((text) => (
            <p key={text.slice(0, 24)} className="mb-8 text-[1.1rem] leading-[1.8] text-muted">
              {text}
            </p>
          ))}
          <Link href={INTRO.link.href} className="text-link">
            {INTRO.link.text}
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
