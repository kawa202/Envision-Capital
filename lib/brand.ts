/**
 * Brand constants that appear in more than one place.
 *
 * Anything here is written once and read everywhere, because a tagline or a
 * call to action that is typed out in five components will eventually read
 * five different ways.
 */

/**
 * The line on the client's logo, so the site and the mark agree. It settles
 * an earlier ambiguity between "Earning" and "Engineering Lasting
 * Credibility", neither of which was ever on the logo.
 */
export const TAGLINE = "From Vision To Value";

/**
 * The one call to action on the site. A single label, repeated, is how a
 * reader learns what the next step is; three competing labels is how they
 * learn there isn't one.
 */
export const PRIMARY_CTA = {
  label: "Discuss a mandate",
  href: "/contact",
} as const;
