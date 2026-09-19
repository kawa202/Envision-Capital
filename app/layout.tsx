import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Inter, JetBrains_Mono } from "next/font/google";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { site } from "@/content/site";
import "./globals.css";

/* --------------------------------------------------------------------------
   Typography — self-optimised, subset and preloaded by next/font. Google
   fonts are downloaded at build time and served from this domain as WOFF2,
   which satisfies the brand requirement to self-host.

   Brand spec: GT Sectra Display (headings), Inter (body/UI), JetBrains Mono
   (data). GT Sectra is a commercial Grilli Type face and needs a web licence
   from Envision. Until the WOFF2 files are supplied, DM Serif Display stands
   in. To switch: put the files in app/fonts/, replace dmSerif below with
   localFont({ src: [...], variable: "--font-dm-serif" }) from
   "next/font/local", and nothing else needs to change.

   Display weight is deliberately single-weight: editorial serifs carry
   authority through scale and spacing, not through weight variation.
   -------------------------------------------------------------------------- */

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://www.envisioncapital.co.zw";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Envision Capital — Corporate Finance & Advisory, Zimbabwe & Africa",
    template: "%s | Envision Capital",
  },
  description: site.hero.lede,
  keywords: [
    "corporate finance advisory Zimbabwe",
    "M&A advisory",
    "company valuation",
    "virtual CFO services",
    "financial reporting IFRS",
    "AI finance transformation",
    "Harare corporate finance",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_ZW",
    url: SITE_URL,
    siteName: site.name,
    title: "Envision Capital — Corporate Finance & Advisory",
    description: site.hero.lede,
    images: [
      {
        url: "/images/hero/positioning-boardroom.jpg",
        width: 1200,
        height: 630,
        alt: "Envision Capital — corporate finance and advisory, Harare, Zimbabwe.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Envision Capital — Corporate Finance & Advisory",
    description: site.hero.lede,
    images: ["/images/hero/positioning-boardroom.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1F3A",
  width: "device-width",
  initialScale: 1,
};

/**
 * Organisation schema. Deliberately minimal: no aggregateRating, no awards,
 * no employee count — structured data must not assert anything unverified.
 */
const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.hero.lede,
  url: SITE_URL,
  slogan: site.philosophy,
  areaServed: ["Zimbabwe", "Southern Africa"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Harare",
    addressCountry: "ZW",
  },
  knowsAbout: [
    "Corporate finance advisory",
    "Mergers and acquisitions",
    "Company valuation",
    "Virtual CFO services",
    "Financial reporting",
    "Finance transformation",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-ZW"
      /* Next 16 no longer overrides scroll-behavior during navigation unless
         this attribute is present. The site uses smooth in-page anchors, so
         route transitions still need to land instantly. */
      data-scroll-behavior="smooth"
      className={`${dmSerif.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-dvh">
        {/* Motion server-renders each entrance animation's *hidden* state as an
            inline style. Without JavaScript nothing ever animates it back, so
            the copy would never appear. A stylesheet !important rule beats a
            non-important inline style, which restores everything at once. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "main [style],footer [style]{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[999] focus:bg-navy focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          Skip to main content
        </a>
        <Navigation />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organisationSchema),
          }}
        />
      </body>
    </html>
  );
}
