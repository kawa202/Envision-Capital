import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

/**
 * The top of every spoke page.
 *
 * A navy band carrying the page's `h1`, sitting directly beneath the fixed
 * navigation. It does the job the hero does on the homepage: establishes where
 * you are before any content appears, and gives the fixed bar something solid
 * to sit against on pages that have no hero image.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="bg-navy pt-[calc(72px+clamp(2.5rem,5vw,4.5rem))] pb-[clamp(2.5rem,4.5vw,4rem)]">
      <div className="shell">
        <SectionEyebrow invert>{eyebrow}</SectionEyebrow>
        <h1 className="mt-6 max-w-4xl font-display text-display-xl text-white">
          {title}
        </h1>
        {lede && (
          <p className="mt-5 max-w-2xl text-lede text-white/75">{lede}</p>
        )}
      </div>
    </header>
  );
}
