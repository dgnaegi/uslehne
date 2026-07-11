# uslehne — Design Guide
## Swiss International Typographic Style

---

## Philosophy

The visual language of uslehne is rooted in the **International Typographic Style** (Swiss Style) of 1950s Switzerland. It is not a trend; it is a method. Every decision is justified by the content's needs — not by decoration, personality, or fashion.

**Five guiding tenets:**

1. **Objectivity over subjectivity** — The design recedes so the content speaks. No ornamentation without function.
2. **The grid is law** — Asymmetrical organization creates rhythm and tension. The grid is visible through background texture and thick borders.
3. **Typography is the interface** — Type is structural. Scale, weight, and position are the only hierarchy tools needed.
4. **Active negative space** — White space defines boundaries and gives mass to typography. Generous spacing is not waste; it is structure.
5. **Flat depth** — No blurs, no gradients, no soft shadows. Depth comes from hard-offset geometry and border contrast.

**The vibe:** A transit map. A museum exhibition. A well-engineered building. Functional, safe, precise — but not cold.

---

## Color Palette

| Role | Token | Hex | Usage |
|------|-------|-----|-------|
| Background | `colors.background` | `#FDFAF0` | Page canvas — warm white |
| Surface | `colors.surface` | `#FFFFFF` | Cards, modals, inputs |
| Foreground | `colors.primary` | `#1a1a1a` | Text, borders, UI structure |
| **Accent** | `colors.accent` | `#FFD600` | **The only signal color** |
| Muted | `colors.muted` | `#F2F2F2` | Secondary backgrounds |
| Text muted | `colors.textMuted` | `#555555` | Secondary labels |
| Danger | `colors.danger` | `#d32f2f` | Destructive actions only |

### Accent rules
`#FFD600` (yellow) is the uslehne signal color — the functional equivalent of the classic Swiss Red. Use it sparingly:

- Primary CTAs and active states
- Hover inversions (black → yellow text, or yellow → black fill)
- Chip/badge backgrounds (LEND type)
- Tagline bar background
- KarmaBadge (yellow text on black)
- Focus rings (as hard-offset shadow)

**Never** use yellow as a decorative fill, background wash, or text color on a white surface.

---

## Typography

**Font family:** Inter (Google Fonts) — the closest web-safe approximation to Helvetica Neue / Akzidenz-Grotesk.

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
```

### Weights
| Weight | Use |
|--------|-----|
| 400 | Body text, descriptions |
| 600 | Secondary labels, meta |
| 700 | Form labels, minor headings |
| 800 | Buttons, nav items, card meta |
| 900 | Page titles, card titles, hero type |

### Style rules
- **Headings and labels: `text-transform: uppercase`** — always
- **Large headlines:** `letter-spacing: -0.02em` (tighten, let weight do the work)
- **Small labels:** `letter-spacing: 0.08em–0.14em` (widen, increase readability at small sizes)
- **Body text:** flush-left, ragged-right — never centered
- **Responsive scale:** use `clamp()` so headlines scale from mobile to desktop without breakpoint hacks

```css
/* Page title example */
font-size: clamp(1.6rem, 4vw, 2.4rem);
font-weight: 900;
text-transform: uppercase;
letter-spacing: -0.02em;

/* Card title in TikTok feed */
font-size: clamp(1.6rem, 6vw, 2.6rem);
font-weight: 900;
text-transform: uppercase;
letter-spacing: -0.02em;
```

---

## Spacing Scale

Based on a 4px base unit (`BASE = 4`).

| Token | Value | Use |
|-------|-------|-----|
| `spacing.xs` | 4px | Micro gaps, icon padding |
| `spacing.sm` | 8px | Tight component spacing |
| `spacing.md` | 16px | Standard element spacing |
| `spacing.lg` | 24px | Section gaps, form groups |
| `spacing.xl` | 32px | Page-level padding |
| `spacing.xxl` | 64px | Section separators, hero overlays |

Spacing is not arbitrary — every value is a multiple of 4, which aligns to the 24px background grid.

---

## Grid & Structure

**12-column grid**, 16px gutters, 1200px max-width.

The background grid pattern makes the underlying structure visible at all times:

```css
background-image:
  linear-gradient(rgba(26, 26, 26, 0.04) 1px, transparent 1px),
  linear-gradient(90deg, rgba(26, 26, 26, 0.04) 1px, transparent 1px);
background-size: 24px 24px;
```

Use this on the page body and muted surfaces. Never apply it to black or yellow backgrounds.

---

## Borders & Radius

**Border:** `3px solid #1a1a1a` — thick, visible, structural.

**Radius:** `0px` everywhere — strict rectangles, no exceptions.

> Rounded corners signal approachability and friendliness. Swiss style signals precision and reliability. uslehne is a tool for the community, not a consumer product trying to feel soft. The hard edge is honest.

Borders serve as the visible skeleton of the information hierarchy — they define regions, separate data, and make the grid tangible.

---

## Shadows

No blur. No soft drop shadows. Depth is created through **hard-offset geometry:**

```css
shadow:   3px 3px 0px #1a1a1a   /* default */
shadowMd: 5px 5px 0px #1a1a1a   /* elevated state */
```

**Hover interaction pattern:** element lifts by translating `-2px, -2px` and shadow expands to `shadowMd`. This creates a mechanical "pop" — Swiss snappy feedback.

```css
&:hover:not(:disabled) {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0px #1a1a1a;
}
```

---

## Component Patterns

### Buttons

Three variants, all rectangular, all uppercase, all 800-weight:

| Variant | Background | Text | Hover bg | Hover text |
|---------|-----------|------|----------|-----------|
| primary (default) | `#FFD600` | `#1a1a1a` | `#1a1a1a` | `#FFD600` |
| secondary | `#FFFFFF` | `#1a1a1a` | `#FFD600` | `#1a1a1a` |
| danger | `#d32f2f` | `#FFFFFF` | `#b71c1c` | `#FFFFFF` |

The primary→hover is a full color inversion. This is the most Swiss interaction available.

### Form Inputs

Inputs use a full-border style (not underline) to maintain grid structure. Focus state is a hard-offset yellow shadow — no glow rings.

```css
/* Input focus */
box-shadow: 3px 3px 0px #FFD600;
```

Labels are uppercase, 700-weight, 0.08em tracked — they read as structural labels, not soft prompts.

### Badges & Type Labels

Rectangular pills are banned. Badges are strict rectangles with a 2px black border.

- `LEND` type → yellow (`#FFD600`) background
- `GIVE` type → mint (`#B8F0D4`) background
- Text: always `#1a1a1a`, uppercase, 800-weight, wide tracking

### Cards (TikTok feed)

Each card is `100dvh` tall with `scroll-snap-stop: always`. The image fills the full frame; the overlay gradient is abrupt and graphic — not soft:

```css
background: linear-gradient(transparent 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.93) 70%);
```

Card title inside the overlay: 900-weight, uppercase, `clamp(1.6rem, 6vw, 2.6rem)`. The title is typographic mass — it anchors the composition.

### Header

Solid background (no backdrop-filter blur). Hard `border-bottom: 3px solid #1a1a1a`. The header is a visible structural band, not a floating glass element.

The auth button (`GuestAuthBtn`) is an inverted block — black background, yellow text — the highest-contrast element in the bar, reserved for the one action that matters most to a new visitor.

### Navigation tabs (Transactions)

Tabs are built as a single bordered container with internal dividers — no gaps, no individual borders. Active tab: black background, yellow text. Hover on inactive: yellow background.

```
┌──────────────┬──────────────┐
│   INCOMING   │   OUTGOING   │  (black border wraps the unit)
└──────────────┴──────────────┘
```

### Filter chips (ZipFilter)

Rectangular chips: black background, yellow text, 800-weight uppercase. The tagline band above is yellow with a black bottom border — a structural signal, not a decoration.

---

## Interaction & Animation

**Philosophy:** Instant, mechanical, snappy. Movement must be purposeful. Nothing elastic or springy.

| Transition | Duration | Easing |
|-----------|----------|--------|
| Colors, backgrounds | `0.1s` | `ease-out` |
| Borders, outlines | `0.12s` | `linear` |
| Transform + shadow (lift) | `0.1s` | `ease-out` |

**Standard hover pattern** — used on buttons, rows, cards:
1. `transform: translate(-2px, -2px)` — mechanical lift
2. `box-shadow: 5px 5px 0px #1a1a1a` — shadow grows to match displacement
3. Background/color inversion where applicable

**Always respect:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Responsive Strategy

**Mobile (< 600px)**
- Single column, vertical stacking
- Typography scales down via `clamp()` but stays bold
- Borders remain 3px — never thin out on mobile
- Buttons remain uppercase full-weight; touch targets minimum 44×44px
- Grid background maintains same opacity/scale

**Tablet (600–900px)**
- Two-column layouts where applicable
- Asymmetric grids begin to appear

**Desktop (900px+)**
- Full grid layouts, max 1200px content width
- Multi-column cards and forms
- All hover states active

---

## What Not to Do

| ❌ Avoid | ✓ Instead |
|---------|----------|
| Rounded corners | Strictly rectangular (`border-radius: 0`) |
| Soft box-shadows (`blur > 0`) | Hard-offset shadow or no shadow |
| Backdrop-filter blur | Solid background with hard border |
| Centered text blocks | Left-aligned, flush to the grid |
| Multiple accent colors | `#FFD600` only — one signal color |
| Gradient fills on surfaces | Flat color + border structure |
| Emoji in UI labels | Text, icons from lucide-react |
| Soft hover fades | Full color inversion, instant |
| `font-weight: 400` for UI chrome | 700 minimum for all interactive elements |
| `border-radius: 999px` pills | Rectangular badges and chips only |

---

## Quick Reference — Token Map

```ts
// theme.ts
colors.accent      = '#FFD600'   // signal color — use sparingly
colors.primary     = '#1a1a1a'   // text, borders, structure
colors.background  = '#FDFAF0'   // page canvas
colors.surface     = '#FFFFFF'   // cards, inputs
colors.muted       = '#F2F2F2'   // secondary surfaces

border             = '3px solid #1a1a1a'
radius             = '0px'
shadow             = '3px 3px 0px #1a1a1a'
shadowMd           = '5px 5px 0px #1a1a1a'
```
