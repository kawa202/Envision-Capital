/**
 * Brand constants that appear in more than one place.
 *
 * Anything here is written once and read everywhere, because a tagline or a
 * call to action that is typed out in five components will eventually read
 * five different ways.
 */

/**
 * TODO: confirm with Envision Capital before launch.
 *
 * The brand documents supplied to date carry "Earning Lasting Credibility".
 * The prototype brief asks for "Engineering Lasting Credibility". Only the
 * client can say which is the line, so it lives in one constant until they do.
 */
export const TAGLINE = "Engineering Lasting Credibility";

/**
 * The one call to action on the site. A single label, repeated, is how a
 * reader learns what the next step is; three competing labels is how they
 * learn there isn't one.
 */
export const PRIMARY_CTA = {
  label: "Discuss a mandate",
  href: "/contact",
} as const;
