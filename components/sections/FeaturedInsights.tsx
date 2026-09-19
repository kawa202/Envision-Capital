import { ImageCard } from "@/components/cards/ImageCard";
import { HubHeader } from "@/components/ui/HubHeader";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { insights } from "@/content/insights";

/**
 * Featured insights — three photograph-led cards on navy, following the
 * capability overview.
 */
export function FeaturedInsights() {
  return (
    <section
      id="insights"
      className="section-y bg-navy"
      aria-labelledby="insights-heading"
    >
      <div className="shell">
        <HubHeader
          id="insights-heading"
          title="Featured insights"
          link={{ label: "All insights", href: "/insights" }}
          invert
        />

        <RevealGroup
          className="mt-8 grid gap-6 md:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-5"
          stagger={0.09}
        >
          {insights.map((insight) => (
            <RevealItem key={insight.slug} className="h-full">
              <ImageCard
                tone="dark"
                href={insight.href}
                image={insight.image}
                label={insight.category}
                title={insight.title}
                dek={insight.dek}
              />
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-8 text-meta leading-relaxed text-white/70">
          [ARTICLE CONTENT REQUIRED] — Headlines and deks demonstrate editorial
          hierarchy. Article bodies require authorship and compliance review
          before publication.
        </p>
      </div>
    </section>
  );
}
