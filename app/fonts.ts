import { Inter, Playfair_Display } from "next/font/google";

/**
 * The two typefaces of the approved design direction (Envision_Prototype.html):
 * Playfair Display for headings, Inter for everything else.
 *
 * Loaded by next/font, which downloads them at build time and serves them
 * from this domain as WOFF2 with a size-adjusted fallback, so the swap causes
 * no layout shift and no request goes to Google at runtime.
 */
export const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const fontVariables = `${serif.variable} ${sans.variable}`;
