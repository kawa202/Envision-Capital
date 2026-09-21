import Link from "next/link";
import { TRANSACTIONS } from "@/content/home";

/** Highlight transactions: six bordered cards with the value in brass. */
export function Transactions() {
  return (
    <section className="bg-card px-[6%] py-20 md:py-32" aria-labelledby="transactions-heading">
      <span className="eyebrow">{TRANSACTIONS.eyebrow}</span>
      <h2 id="transactions-heading" className="text-[1.5rem] leading-normal">
        {TRANSACTIONS.heading}
      </h2>

      <ul className="mt-12 grid gap-10 lg:grid-cols-3">
        {TRANSACTIONS.items.map((item) => (
          <li key={item.title}>
            <Link
              href={item.href}
              className="block h-full border border-line p-8 transition-[border-color,box-shadow] duration-300 ease-in-out hover:border-brass hover:shadow-[0_10px_30px_rgb(0_0_0_/_0.05)]"
            >
              {/* Brass at this size and weight would be 2.3:1 on white; the
                  darker step of the same hue is 4.7:1. */}
              <span className="mb-3 block font-serif text-[1.8rem] font-bold text-brass-ink">
                {item.value}
              </span>
              <span className="mb-2 block text-base leading-[1.4] font-semibold text-navy">
                {item.title}
              </span>
              <span className="block text-[0.85rem] leading-[1.6] text-muted">{item.body}</span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-[0.85rem] leading-[1.6] text-muted">{TRANSACTIONS.note}</p>
    </section>
  );
}
