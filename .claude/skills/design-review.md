# Skill: design-review

Deep design audit of the uslehne frontend. Read **every** `.styled.ts` file and every component,
then report findings grouped by category with file:line references and concrete fixes.
Never skip a file. Never summarise without evidence.

---

## Step 1 — Gather all files

Read in full:
- All `frontend/src/**/*.styled.ts`
- All `frontend/src/**/*.tsx`
- `frontend/src/theme.ts`
- `frontend/src/GlobalStyle.ts`
- `docs/TYPOGRAFIE.md`

---

## Step 2 — Run every check below

For each finding: file path, line number, what's wrong, the exact fix.

---

### A · Token discipline

- [ ] No hardcoded `px`, `rem`, `em`, `%`, or hex values — everything through theme tokens
- [ ] No `style={{}}` inline styles for anything covered by the theme (spacing, colour, border, shadow)
- [ ] Spacing is always a multiple of 4px via `theme.spacing.*`
- [ ] All colours from `theme.colors.*` — no raw hex
- [ ] `border`, `radius`, `radiusLg`, `shadow`, `shadowMd`, `maxWidth` all from theme
- [ ] No magic numbers (`z-index: 999`, `width: 374px`, `opacity: 0.7`) without a comment

---

### B · Layout & spacing

- [ ] Consistent vertical rhythm — section gaps use `theme.spacing.xxl` (64px)
- [ ] Content max-width is `theme.maxWidth` (1200px), centred with `margin: 0 auto`
- [ ] Horizontal padding: `theme.spacing.xl` (32px) desktop, `theme.spacing.md` (16px) mobile
- [ ] No layout shifts — images have explicit width/height or `aspect-ratio`
- [ ] Flex/grid gaps use theme tokens, not `margin` hacks
- [ ] No double margins (margin-bottom on child AND gap on parent)

---

### C · Responsive design (2026 standards)

- [ ] Mobile-first: base styles are for small screens, `@media (min-width: …)` layers on top
- [ ] Breakpoints: `480px` (sm), `768px` (md), `1024px` (lg) — add to `theme.ts` if missing
- [ ] Touch targets min **44×44px** (WCAG 2.5.5) — buttons, links, icon buttons
- [ ] No horizontal scroll on any viewport width
- [ ] Grid: `repeat(auto-fill, minmax(…, 1fr))` preferred over fixed column counts
- [ ] Images use `max-width: 100%; height: auto` or `object-fit: cover` inside a constrained container
- [ ] Typography scales with viewport — consider `clamp()` for headings
- [ ] Modal/dialog: full-screen on mobile (`width: 100%; max-height: 100dvh`)

---

### D · Typography

- [ ] Type scale strictly: 12 / 14 / 16 / 20 / 24 / 32 / 48px — no intermediate sizes
- [ ] Body line-height: 1.5 — heading line-height: 1.2
- [ ] Weights: 400 body / 600 label / 700 heading / 800–900 hero
- [ ] Max line length (measure): prose text max 65–75ch
- [ ] No `text-transform: uppercase` on body text, only on tiny labels (< 0.75rem)
- [ ] Genderstern & Du-Form as per `docs/TYPOGRAFIE.md` — check all user-visible strings
- [ ] Ellipsis `…` not `...`, correct German quotes `„…"`

---

### E · Colour & contrast

- [ ] Text on background: WCAG AA minimum **4.5:1** (use browser DevTools → Accessibility)
- [ ] Large text (≥ 18px bold or ≥ 24px): minimum **3:1**
- [ ] Interactive element focus ring visible on every background colour
- [ ] Status never communicated by colour alone — add icon or text label
- [ ] Accent (`#FFD600`) on white: check if contrast is sufficient for text use

---

### F · Interactive states

Every clickable element must have all four states styled:

| State      | Requirement |
|------------|-------------|
| `:hover`   | Visual change (transform, shadow, background) |
| `:focus-visible` | Visible ring — **not** `:focus` alone (hides keyboard indicator) |
| `:active`  | Pressed feedback (slight translate or darken) |
| `:disabled`| `opacity: 0.5`, `cursor: not-allowed`, no hover effect |

- [ ] No `outline: none` or `outline: 0` without a custom `:focus-visible` replacement
- [ ] All `<button>` elements have explicit `type` attribute (`type="button"` or `type="submit"`)
- [ ] Links and buttons never styled identically — distinguish their affordance

---

### G · Accessibility (a11y)

- [ ] All images have meaningful `alt` text (or `alt=""` if purely decorative)
- [ ] Icon-only buttons have `aria-label`
- [ ] Modal has `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to its title
- [ ] Modal traps focus while open — first focusable element receives focus on open
- [ ] Modal closes on `Escape` key
- [ ] Form inputs are connected to `<label>` via `htmlFor`/`id` — no floating label tricks without association
- [ ] Error messages linked to inputs via `aria-describedby`
- [ ] Tab order follows visual reading order — no `tabIndex > 0`
- [ ] Skip-to-main link present (or at minimum `<main>` landmark exists)
- [ ] `<nav>`, `<main>`, `<header>`, `<footer>` landmarks used correctly
- [ ] Lists rendered as `<ul>`/`<ol>` when they are semantically lists
- [ ] No `<div onClick>` — use `<button>` or `<a>`

---

### H · Motion & animation

- [ ] Transitions ≤ 150ms for micro-interactions (hover), ≤ 300ms for layout changes
- [ ] Easing: `ease-out` for entering elements, `ease-in` for exiting
- [ ] All animations respect `prefers-reduced-motion`:
  ```css
  @media (prefers-reduced-motion: reduce) { … }
  ```
- [ ] No animation that loops without user intent

---

### I · Empty, loading & error states

- [ ] Every list/data view has an empty state message
- [ ] Loading state shown while data is fetching (not just a blank space)
- [ ] Error state shown when API call fails — not a silent failure
- [ ] Skeleton screens or spinner — never raw `undefined` rendered to DOM

---

### J · Component structure

- [ ] One component per `.tsx` file
- [ ] All styled components in the `.styled.ts` sibling — none defined inline
- [ ] File ≤ 150 lines — if over, split by responsibility
- [ ] No props passed down more than 2 levels — consider context if deeper

---

### K · 2026 best practices

- [ ] `dvh`/`dvw` units used instead of `vh`/`vw` where mobile browser chrome matters (e.g., modals)
- [ ] `gap` over `margin` for flex/grid spacing
- [ ] `aspect-ratio` over `padding-top` hacks for responsive boxes
- [ ] `inset` shorthand instead of `top/right/bottom/left` for absolute positioning
- [ ] CSS logical properties (`margin-inline`, `padding-block`) for i18n readiness
- [ ] No `-webkit-` prefixes for properties with 97 %+ baseline support
- [ ] Container style in styled-components uses `theme` — no prop-drilling pure style values

---

## Step 3 — Report format

Group findings under each letter (A–K). For every issue:

```
[B] frontend/src/components/OfferCard.styled.ts:28
  gap: 10px  ← not on 4px grid
  Fix: gap: ${({ theme }) => theme.spacing.sm};  /* 8px */
```

At the end, list a **priority order** (critical → high → low) and which files to touch first.

---

## How to invoke

Type `/design-review` and Claude will run the full audit.
To scope it to one area: `/design-review only check accessibility` or `/design-review OfferCard`.
