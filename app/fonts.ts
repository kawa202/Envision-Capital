import { Inter, Newsreader } from "next/font/google";
// import localFont from "next/font/local";

/**
 * The two typefaces of the system. Loaded by next/font, which downloads them
 * at build time and serves them from this domain as WOFF2 with
 * `font-display: swap` and a size-adjusted fallback, so swapping causes no
 * layout shift.
 *
 * Headings are set at weight 400 — an editorial serif carries authority
 * through scale and spacing, not through weight.
 */

/** Headings. Stand-in for GT Sectra Display until the licence is supplied. */
export const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/** Body and UI. */
export const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

/* ---------------------------------------------------------------------------
   GT Sectra Display — drop the licensed WOFF2 files into app/fonts/ and swap
   the export above for this block. Nothing else in the codebase changes: every
   heading resolves through --font-serif.

export const serif = localFont({
  variable: "--font-serif",
  display: "swap",
  src: [
    { path: "./fonts/GTSectraDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GTSectraDisplay-Medium.woff2", weight: "500", style: "normal" },
  ],
});
--------------------------------------------------------------------------- */

export const fontVariables = `${serif.variable} ${sans.variable}`;
