# Envision Capital — Website

Corporate finance and advisory, Harare. Next.js 16 · React 19 · TypeScript ·
Tailwind CSS v4 · Motion.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static prerender
```

---

## Design language — "Editorial Corporate Finance"

Roughly 55% institutional professional services, 25% editorial, 15% Zimbabwean
and African identity, 5% technology and motion.

The governing constraint is **restraint**. The page should communicate *these
people advise serious organisations* before it communicates anything about the
website itself. Concretely, that meant:

- **A measured type scale.** Display type tops out at ~56px, not ~130px. The
  hero headline occupies a third of the composition, not the whole viewport.
  Hierarchy is carried by placement and space, not point size.
- **The client's brand palette** (Envision brand & visual direction, §3):
  Envision Navy `#0B1F3A`, Restrained Brass `#B88A3A`, Analytical Blue
  `#1F5AA0`, Warm White `#FAFAF7`, Graphite `#2E2E2E`, in a rhythm of
  60% neutral / 30% navy / 10% accent. Warm White is the ground; a derived
  tint (`#F1F0EB`) separates chapters.
- **Brass strictly as an accent** — a short rule, an active-state marker, the
  signature, and the fill of the one primary action per view (`.btn-primary`).
  Otherwise never a surface, and never text on a light ground, where it falls
  to 2.9:1. Labels and links on light grounds take Analytical Blue (6.7:1).
- **Type:** GT Sectra Display (headings), Inter (body/UI), JetBrains Mono
  (data), self-hosted as WOFF2. GT Sectra needs a commercial web licence;
  until Envision supplies the files, DM Serif Display stands in (swap
  instructions in `app/layout.tsx`).
- **Almost no borders.** Structure comes from grid, space and typography. There
  are no cards, no rounded corners, no pills, no shadows, no gradients beyond
  the hero's single tonal scrim.
- **Asymmetry throughout.** Nothing significant is centred.

`Earning Lasting Credibility` is present as a brand philosophy — in the
hero's lower register and in the footer — rather than as the headline.

## Page structure

| Section | Ground | Job |
|---|---|---|
| Hero (full-bleed carousel) | navy | Who, what, for whom — then rotating featured work and thinking |
| Complexity requires clarity | white | The firm's role |
| What we do | paper | Nine capabilities in three groups |
| Industries | navy | Sector fluency |
| Experience | white | Evidence |
| Selected work | paper | The shape of the mandates |
| The Envision Method | navy | How the firm thinks |
| Envision / In context | white | Where it operates |
| About us | paper | Independence, rigour, the pull quote |
| Leadership | white | Who is accountable |
| Insights | paper | How it reasons in public |
| Newsroom | white | Momentum and market activity |
| Capital Insights | paper | Newsletter capture |
| Confidence comes from evidence | navy | The closing argument |
| Contact | white | How to engage |

## Architecture

```
app/
  layout.tsx          fonts, metadata, Organisation schema, no-JS fallback
  page.tsx            section composition
  globals.css         design tokens (@theme), primitives, reduced-motion
  sitemap.ts robots.ts
components/
  Navigation  Hero (carousel)  IntroStatement  CapabilityExplorer
  IndustryExplorer
  Credentials  CaseStudyFeature  EnvisionMethod  EditorialGallery
  About  Leadership  Insights  Newsroom  NewsletterCTA
  CredibilityStatement  FinalCTA  Footer
  InsightCard  CaseStudyCard        reusable cards
  primitives/
    Reveal.tsx          entrance choreography
    EditorialImage.tsx  photograph or labelled commission panel
    Bits.tsx            wordmark, section label, arrow link, unverified flag
content/                # CMS-ready data layer
lib/motion.ts           # the motion language in one file
docs/ART-DIRECTION.md   # photography audit + commission brief
scripts/                # contact-sheet + layout audit tooling
```

### Content is data, not markup

Every piece of copy, every image, every figure lives in `content/*.ts`, typed in
`content/types.ts`. Each type maps 1:1 to a future CMS collection — Services,
Industries, People, Case Studies, Insights, Credentials, Gallery Images, Method
Steps. Components never hard-code copy, so moving to a headless CMS is a
data-source swap rather than a rewrite.

### Motion

`lib/motion.ts` holds the whole motion language. Motion expresses hierarchy —
what arrives first matters first — and never performs. No bounce, no spring
overshoot, no perpetual float, no rotation, no parallax beyond a few percent.

The only scroll-linked motion on the page is the hero image drift and the
Method's progress rail.

### Navigation

A solid navy bar at all times — not translucent over the hero, because with a
full-bleed photograph behind it a translucent bar is legible only on whichever
frame happens to be showing.

Four of the five sections open a full-width mega panel in three columns:
section identity and an Explore button on the left, the section index in the
centre, and a Spotlight / Latest / Top news column on the right. The open
section is marked with a brass rule. Right of the bar sits the utility group —
Search, Client portal, and the region selector.

All of it is driven by `content/navigation.ts`. Every `href` currently resolves
to a section on the landing page, because the sub-pages do not exist yet; each
becomes a real route later by editing that one file.

**Search and Client portal have no destination.** Neither should ship until it
exists — a client portal link that goes nowhere is worse than no link.

### The hero carousel

**Full-bleed**: the photograph spans the whole viewport and the copy sits on top
of it, anchored bottom-left above a row of slide tabs, with the controls
bottom-right. Three slides on a 5-second rotation, defined in
`content/featured.ts`. Slide 1 is the firm's positioning and is always first — a
visitor who looks for five seconds still learns who Envision is. Slides 2+
rotate featured work and thinking, which is what makes the homepage a hub rather
than a brochure. Only the content changes; the layout never moves.

Three scrims sit between the photograph and the copy, each doing one job: hold
the navigation legible at the top, hold the copy legible at the bottom, and keep
the left column dark enough for white type on any frame. They are deliberately
shallow — stack them too heavily and the photograph becomes navy wallpaper,
which is exactly what happened on the first attempt.

Anything that moves on a timer is governed by WCAG 2.2.2, so rotation stops:

- while the pointer is over the **tab row** (not the whole hero — see below)
- on keyboard focus anywhere in the hero
- when the browser tab is hidden
- under `prefers-reduced-motion`

Hover-pause is scoped to the tab row deliberately. It was originally bound to
the whole `<section>`, which is a full viewport tall — so the pointer was
almost always inside it and the carousel effectively never advanced. Focus-pause
stays global because focus is deliberate; hover is incidental.

Selecting a tab jumps to that slide and lets the rotation carry on. An earlier
version stopped it permanently on click, which — with no play control — meant
one click killed the carousel for the rest of the session.

Navigation is by the three tabs along the bottom — each tab's rule doubles as a
progress indicator, filling across the slide's dwell time — and by left/right
arrow keys. There are deliberately **no arrow or pause buttons over the
photograph**: selecting a tab hands control to the reader and stops the timer
permanently, which is the stop mechanism WCAG 2.2.2 requires, without a control
cluster sitting on the image. Slide changes are announced to assistive technology
**only when the reader caused them** — a carousel that narrates its own
auto-rotation is hostile. Because rotation pauses on focus, a keyboard or
screen-reader user effectively never experiences auto-advance at all.

The slide copy is a keyed remount rather than `AnimatePresence` with
`mode="wait"`. That mode holds the outgoing slide until its exit animation
completes, and if the frame loop is throttled — background tab, minimised
window — the exit never finishes, so the carousel freezes on screen while its
state carries on advancing. This was a real bug, caught in testing.

Under `prefers-reduced-motion` every variant collapses to a plain fade, the
count-ups render their final value immediately, the rail renders filled, and
smooth scrolling is disabled.

---

## Content integrity

This is an advisory firm's website, so what is real and what is placeholder is
tracked explicitly rather than left to memory.

Two areas contain **deliberately fabricated seed content**, added on request to
demonstrate layout: case-study outcomes (including figures) and newsroom
announcements. Everything else is either real Envision positioning or an
explicit, labelled gap. Nothing was invented silently.

- **Credentials** (USD 250M+, 60+, 12+) are **prototype placeholders** inherited
  from the original prototype. They render a visible flag in development and
  must be replaced with verified figures before launch.
- **Three capability lines** — Capital Advisory, Financial Performance, and the
  split of M&A from Valuation — appear in the redesign brief's navigation but
  have no basis in supplied Envision material. They carry `unconfirmed: true`
  and render a development flag. Confirm or remove them: a capability list is a
  factual claim about what the firm sells.
- **Industries** reflect sectors named in existing positioning, with an explicit
  note that coverage requires confirmation against real engagement history.
- **Leadership** profiles are withheld, not fabricated.
- **Insights** headlines are drafted in the firm's voice to demonstrate editorial
  hierarchy; article bodies require authorship and compliance review.
- **Case studies** are fabricated placeholders, figures included (e.g. "US$120m
  raised across three tranches"). They were requested as realistic seed content
  and are flagged in development plus carried by a section-level notice. No
  client, transaction or outcome represents work Envision has performed.
- **Hero slide 3** features a fabricated case study, including its figures. It
  carries a development flag. This is the most prominent placement of invented
  content on the site — replace it first.
- **Newsroom** announcements are fabricated. Partner attribution renders as
  `[PARTNER NAME]` rather than an invented person: a named individual attached
  to a fabricated transaction is the most damaging thing this page could
  publish by accident.
- **Newsletter** is inert — local state and a `console.log`. Do not demo it as
  a working sign-up.
- **Photography**: six inherited placeholders were rejected as unusable. Read
  `docs/ART-DIRECTION.md` — it matters more than it sounds.

Search `REQUIRED`, `unconfirmed` and `commission` across the repo to find
everything outstanding.

---

## Accessibility

- Semantic landmarks, one `h1`, no skipped heading levels (verified).
- Skip link; branded `:focus-visible` on every interactive element.
- Capabilities is a real vertical tablist — arrow keys, Home/End, roving tabindex.
- The gallery is a native scroll container: touch, trackpad, arrow keys and
  buttons all drive one mechanism, with disabled states at each end.
- The enquiry form validates on submit with `aria-invalid`, `aria-describedby`,
  inline messages and a polite live region. Every field is labelled.
- Full reduced-motion support.
- Every image carries descriptive alt text; commission panels carry their brief.
- Count-ups expose the final value to assistive tech; the animation is `aria-hidden`.
- A `<noscript>` rule restores all content if JavaScript never runs — Motion
  server-renders its *hidden* state, so without this the copy would never appear.

## Performance

Fully static prerender. The Industries, Intro and Credibility sections ship no
JavaScript at all. Lazy loading everywhere except the hero and the first two
gallery frames. AVIF/WebP via `next/image`, with `deviceSizes` cut to the
layout's real column widths. Image payload is ~9.5MB of source, served resized.

---

## Verification tooling

`scripts/audit.js` — paste into the browser console and call `__audit()`. Checks
horizontal overflow, overlapping siblings, missing alt text, heading-level skips
and small touch targets. Currently clean at 320 / 375 / 390 / 430 / 768 / 1024 /
1440 / 1920.

`scripts/contact-sheet.js` — builds a labelled contact sheet of every image in
`public/images` so photography can be art-directed in one pass:

```bash
node scripts/contact-sheet.js
```

---

## Before launch

1. Replace all credentials with verified figures; set `unverified: false`.
2. Confirm or remove the three `unconfirmed` capability lines.
3. Confirm sector coverage against real engagement history.
4. Supply real leadership profiles and commissioned portraits.
5. Replace illustrative case studies with client-consented ones.
6. Commission the photography in `docs/ART-DIRECTION.md`.
7. Wire the enquiry form and the newsletter form to real endpoints (both inert
   by design; see the TODO in `components/NewsletterCTA.tsx`).
8. Replace fabricated case-study outcomes and newsroom announcements, and set
   real partner attributions.
9. Confirm the contact email, telephone number and LinkedIn URL.
10. Compliance review of the regulatory disclaimer in `content/site.ts`.
11. Point `SITE_URL` in `app/layout.tsx`, `sitemap.ts` and `robots.ts` at the
    production domain.
