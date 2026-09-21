import Link from "next/link";
import { Arrow } from "@/components/ui/Arrow";
import { PILLARS } from "@/content/home";

/** What we do: three capabilities, each under a brass rule. */
export function Pillars() {
  return (
    <section
      className="border-b border-line bg-white px-[6%] py-20 md:py-32"
      aria-labelledby="pillars-heading"
    >
      <span className="eyebrow">{PILLARS.eyebrow}</span>
      {/* Unsized in the reference, so it renders at the h2 default: 1.5em. */}
      <h2 id="pillars-heading" className="text-[1.5rem] leading-normal">
        {PILLARS.heading}
      </h2>

      <ul className="mt-12 grid gap-12 lg:grid-cols-3">
        {PILLARS.items.map((item) => (
          <li key={item.title} className="border-t-2 border-brass pt-8">
            <h3 className="mb-4 text-[1.6rem] leading-normal">{item.title}</h3>
            <p className="mb-6 text-[0.95rem] leading-[1.7] text-muted">{item.body}</p>
            <Link href={item.link.href} className="text-link">
              {item.link.text}
              <Arrow />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
