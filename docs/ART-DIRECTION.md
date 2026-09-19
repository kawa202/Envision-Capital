# Envision Capital — Photography Audit & Art-Direction Brief

Photography is a primary design element on this site, not decoration. This
document records the state of every image slot, what was rejected and why, and
what should be commissioned.

**Headline finding:** the inherited placeholder set is roughly two-thirds
usable. Six images were rejected — not on aesthetic grounds, but because they
said the wrong thing about the firm. They have been moved out of `public/` to
`docs/rejected-placeholders/` so they cannot be reintroduced by accident.

---

## 1. Rejected

| Slot | Rejected image | Why it cannot ship |
|---|---|---|
| Accounting & Financial Reporting | `services/financial-reporting.jpg` | A novelty hand-drawn chart captioned **"SUCKING / NOT SUCKING"**. Disqualifying on a corporate finance site. |
| Method — Diagnose | `method/diagnose.jpg` | A **United States IRS tax form** (Publication 505). Wrong jurisdiction for a Zimbabwean mandate; a CFO will notice. |
| Method — Validate | `method/validate.jpg` | A green **stock-ticker chart**. Envision advises; it does not trade or broker. The image contradicts the firm's stated independence. |
| Method — Architect | `method/architect.jpg` | An **engineering workbench** with a Stanley toolbox. Literal engineering, wrong register, clashing palette. |
| Case study — Agriculture | `cases/agriculture.jpg` | A **bowl of market vegetables**. Food photography, not commercial agriculture or agri-finance. |
| Gallery — Leadership | `gallery/leadership.jpg` | A generic corporate portrait. The one frame in the sequence that looked bought rather than observed, and a poor opening signal for a firm whose value is regional fluency. |

### How the gaps render

Five slots render a **commission panel** (`components/primitives/EditorialImage.tsx`):
a navy frame at the correct aspect ratio, brass corner marks, the label
`PHOTOGRAPHY TO BE COMMISSIONED`, and the shot brief itself. Composition is
demonstrated; the gap is explicit. A wrong photograph damages an advisory firm
more than an obvious, labelled gap does.

Current commission panels:

1. Company Valuation
2. Accounting & Financial Reporting
3. Financial Performance
4. Case study — Agriculture
5. *(the Method is now unillustrated by design — see below)*

### Reassignments

| Slot | Now uses | Reasoning |
|---|---|---|
| Gallery 01 — Trade & Capital | `gallery/trade-port.jpg` (was `method/mobilise.jpg`) | A container terminal from the air. Replaces the generic portrait and strengthens the sequence's opening. |
| Capital Advisory | `services/capital-advisory.jpg` (was `method/transform.jpg`) | Utility-scale solar — precisely the long-horizon asset this capability exists to fund. |

### The Method is deliberately unillustrated

The redesign removed photography from the Envision Method entirely. Three of its
six frames were unusable, and a methodology is an argument — photographs beside
each stage compete with it rather than supporting it. The section now runs as a
typographic sequence on a brass progress rail, which also makes the desktop and
mobile experiences identical rather than two different interactions.

`MethodStep.image` remains in the content model for a future method detail page.

### Industries is deliberately unillustrated

Eight sectors, no commissioned photography for any of them. Eight recycled stock
frames would say less about sector fluency than eight precisely written lines
naming the financial constraint that governs each sector. The layout accepts a
commissioned image per sector without restructuring if one is later produced.

---

## Hero photography — how to replace it

The hero follows the reference pattern: bright, people-forward photography
that carries the frame, with a gradient only behind the copy (bottom-left) and
the slide controls. All three frames are **placeholder photography** — replace
with commissioned images of Envision's own people before launch.

| Slide | File | Source |
|---|---|---|
| The firm | `hero/advisory-meeting.jpg` | Vitaly Gariev, Unsplash (Unsplash License) |
| AI & finance | `hero/team-table.jpg` | Ninthgrid, Unsplash (Unsplash License) |
| Capital markets | `hero/harare-day.jpg` | 3:2 crop of `gallery/harare-city.jpg` |

The Unsplash License permits free commercial use without attribution; credits
are kept in `content/featured.ts` regardless. The Harare frame shows a small
shop sign ("TOPICS") behind the headline — acceptable for a placeholder, worth
avoiding in the final image.

What each frame needs:

- A genuine working session or a recognisable place — not a handshake.
- Daylight, with the subject in the upper or right part of the frame; the copy
  sits bottom-left, over the gradient.
- No legible text, logos or screens behind the copy.
- At least 2400px wide, landscape (3:2 or 16:9), high-quality JPEG;
  `next/image` produces the AVIF/WebP sizes.

To swap one: put the file in `public/images/hero/`, then in
`content/featured.ts` update that slide's `image.src` and `image.alt`, and set
`image.focus` (a CSS object-position such as `"58% 35%"`) so the subject stays
in frame on a phone, where only a vertical strip of the photograph shows.

After swapping any hero photograph, re-check text contrast: the stops in
`.hero-scrim` (`app/globals.css`) were set against measured contrast on the
current three photographs at seven screen sizes, with the lowest reading at
4.9:1. The small label above the headline is white for this reason — gold type
that small cannot hold 4.5:1 over a bright frame.

`HERO_ACTIONS` in `content/featured.ts` switches the hero between the
reference pattern (`"links"`: the headline is the link) and the earlier
treatment (`"buttons"`: gold primary and outlined secondary).

---

## 2. Retained

**Strong — keep until commissioned work exists**

- `hero/boardroom-glass.jpg` — a finance team behind glass at dusk. The best asset in the set, and it integrates tonally with the navy hero.
- `firm/silhouette.jpg` — a professional in silhouette against warm light. Genuinely editorial.
- `services/corporate-finance.jpg` — a real, diverse boardroom in session.
- `gallery/technology.jpg` — people actually working at screens; African, credible, unstaged.
- `gallery/trade-port.jpg` — container terminal from the air.
- `gallery/harare-city.jpg` — authentic Harare skyline (ZB Bank, CABS towers).
- `insights/featured-reading.jpg` — hands holding a business newspaper.
- `cases/manufacturing.jpg`, `gallery/industry-warehouse.jpg`, `gallery/energy-grid.jpg`, `gallery/agriculture-maize.jpg`, `services/capital-advisory.jpg` — all serviceable.

**Retained with reservations**

- `gallery/harare-cbd-towers.jpg` — genuinely Harare (Throgmorton House), but shot through a car windscreen in harsh midday light. Authentic, not editorial.
- `people/profile-01…04.jpg` — competent portraits of real people, but shot to four different art directions. They are rendered in greyscale specifically to impose the consistency the source lacks. **These are not Envision personnel and must be replaced before launch.**
- `services/ai-transformation.jpg` and `gallery/technology.jpg` are the same photograph in two sections. Acceptable in a prototype; resolve before launch.

**Available but unused** — in `docs/available-placeholders/`

- `towers-up.jpg` — financial-district towers from below. Strong, but a North American skyline.
- `sustain.jpg` — wheat field at golden hour. Pastoral rather than operational.

---

## 3. The commission

### Direction

Cinematic, restrained, observed rather than posed. Available light. Shallow
depth of field on detail; wide and architectural on context. Desaturated toward
the navy–brass palette — no high-saturation blues or greens.

**Do not commission:** handshakes, people pointing at laptops, staged meetings
around empty tables, thumbs-up, stock "African business" tropes, anything with
legible client data, glowing abstract "AI" imagery, trading screens.

### Shot list

**Priority 1 — the five commission panels**

1. *Company valuation.* Valuation workings, multiple methods reconciled on paper. Close, shallow, precise.
2. *Financial reporting.* Real reconciliation working papers, annotated. No legible client figures.
3. *Financial performance.* A working operation — plant, depot or distribution floor — where margin is actually earned.
4. *Agriculture.* Commercial-scale Zimbabwean agriculture at working scale: irrigation, harvest or grading. Operational, not pastoral.
5. *(Method, if it is later illustrated)* Advisers mid-review at a client's premises; two advisers challenging a model across a desk.

**Priority 2 — leadership**

Four to six portraits of actual Envision personnel, shot in one session to one
direction: single lighting setup, shared background treatment, consistent crop
and eye-line. This is where stock photography is most obviously stock, and it
sits directly beneath a heading about accountability.

**Priority 3 — the firm in context**

Envision people in Envision environments: the office, a client site, a boardroom
mid-mandate. These strengthen the hero and the gallery.

**Priority 4 — sectors**

One frame per industry, if the Industries section is ever to carry imagery.
Documentary, not corporate.

---

## 4. Replacing an image

All photography flows through `content/*.ts`. No component hard-codes a path.

```ts
// Before — awaiting commission
image: {
  commission: true,
  alt: "Financial reporting workings and reconciliations under review.",
  brief: "Close detail of real reconciliation working papers…",
}

// After — commissioned photography supplied
image: {
  src: "/images/services/financial-reporting.jpg",
  alt: "Financial reporting workings and reconciliations under review.",
}
```

Drop the file into `public/images/<section>/`, set `src`, remove `commission`
and `brief`. The panel disappears and the photograph takes its place at the same
aspect ratio — no component changes required.

Write `alt` for a reader who cannot see the image: what it shows and why it is
there. It is not a keyword slot.
