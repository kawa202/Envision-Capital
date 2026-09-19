import { SectionLabel } from "@/components/ui/Bits";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { site } from "@/content/site";

export function About() {
  return (
    <section id="about" className="section-y bg-paper-2" aria-labelledby="about-heading">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel>About us</SectionLabel>
              <h2 id="about-heading" className="mt-6 font-display text-display-l text-navy">
                A firm built on earned trust.
              </h2>
            </Reveal>

            <RevealGroup className="mt-7 max-w-xl space-y-5" stagger={0.09}>
              <RevealItem as="p" className="text-lede text-graphite">
                Envision Capital was founded on a straightforward conviction:
                that the quality of financial advice should not be rationed by
                the size of the organisation receiving it.
              </RevealItem>
              <RevealItem as="p" className="text-[0.9375rem] leading-relaxed text-muted">
                We pair technical capability with contextual judgement — the
                regulatory environment, the market dynamics and the
                institutional expectations that shape every mandate we accept in
                Zimbabwe and across the region. That context is not a footnote
                to the analysis. Frequently, it is the analysis.
              </RevealItem>
              <RevealItem as="p" className="text-[0.9375rem] leading-relaxed text-muted">
                Our independence matters. We advise. We do not take principal
                positions, manage funds or broker products. Nothing we recommend
                is shaped by what we stand to earn from the outcome — which is
                precisely what makes the counsel worth having.
              </RevealItem>
            </RevealGroup>
          </div>

          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.12}>
            <div className="relative aspect-4/5 w-full overflow-hidden bg-navy">
              <EditorialImage
                image={{
                  src: "/images/firm/silhouette.jpg",
                  alt: "A senior adviser in silhouette against warm light, in a moment of consideration.",
                }}
                sizes="(max-width: 1024px) 100vw, 38vw"
              />
            </div>
            <p className="mt-4 font-mono text-[0.66rem] leading-relaxed tracking-[0.04em] text-muted">
              {site.location} — advising across {site.region}.
            </p>
          </Reveal>
        </div>

        {/* ---------- Pull quote ---------- */}
        <Reveal className="mt-16 lg:mt-24">
          <blockquote className="grid gap-6 border-t border-line pt-10 lg:grid-cols-12 lg:gap-16">
            <p className="font-display text-display-m text-navy italic lg:col-span-8">
              &ldquo;{site.pullQuote}&rdquo;
            </p>
            <footer className="eyebrow text-muted lg:col-span-3 lg:col-start-10 lg:pt-3">
              The Envision standard
            </footer>
          </blockquote>
        </Reveal>

        {/* ---------- Commitments ---------- */}
        <div className="mt-14 lg:mt-20">
          <Reveal>
            <p className="eyebrow text-muted">How we work</p>
          </Reveal>
          <RevealGroup
            className="mt-7 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.06}
          >
            {site.commitments.map((commitment) => (
              <RevealItem key={commitment.name} className="border-t border-line-soft pt-4">
                <h3 className="font-display text-[1.125rem] text-navy">
                  {commitment.name}
                </h3>
                <p className="mt-1.5 text-[0.84rem] leading-relaxed text-muted">
                  {commitment.detail}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
