import Image from "next/image";
import Link from "next/link";
import { INSIGHTS_SECTION } from "@/content/home";
import { insights } from "@/content/insights";

/** Three insight cards: photograph, brass tag, serif title, one-line dek. */
export function InsightCards() {
  const cards = INSIGHTS_SECTION.cards.flatMap(({ slug, tag }) => {
    const insight = insights.find((item) => item.slug === slug);
    return insight ? [{ ...insight, tag }] : [];
  });

  return (
    <section className="px-[6%] py-20 md:py-32" aria-labelledby="insights-heading">
      <span className="eyebrow">{INSIGHTS_SECTION.eyebrow}</span>
      <h2 id="insights-heading" className="text-[1.5rem] leading-normal">
        {INSIGHTS_SECTION.heading}
      </h2>

      <ul className="mt-12 grid gap-10 lg:grid-cols-3">
        {cards.map((card) => (
          <li key={card.slug}>
            <Link
              href={card.href}
              className="block h-full overflow-hidden rounded-[2px] bg-card shadow-[0_10px_30px_rgb(0_0_0_/_0.05)] transition-[transform,box-shadow] duration-300 ease-in-out hover:-translate-y-[5px] hover:shadow-[0_15px_40px_rgb(0_0_0_/_0.1)]"
            >
              {card.image && (
                <span className="relative block h-[220px] bg-navy-light">
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    fill
                    quality={80}
                    sizes="(min-width: 1024px) 30vw, 90vw"
                    className="object-cover"
                  />
                </span>
              )}
              <span className="block p-8">
                <span className="mb-3 block font-sans text-[0.7rem] font-bold tracking-[1.5px] text-brass-ink uppercase">
                  {card.tag}
                </span>
                <span className="mb-4 block font-serif text-[1.25rem] leading-[1.4] font-bold text-navy">
                  {card.title}
                </span>
                <span className="block text-[0.9rem] leading-[1.6] text-muted">{card.dek}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
