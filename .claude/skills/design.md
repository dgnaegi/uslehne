# Skill: design

Design system for uslehne.ch.

---

## Philosophy

**Reduce to the max.** Every element must earn its place.
Remove before you add. If it looks fine without it, remove it.

- No decorative elements
- No shadows unless they communicate depth
- No animations unless they communicate state
- No colours unless they communicate meaning

---

## 4px grid

All spacing, sizing, and layout values are multiples of **4px**.
Use the `theme.spacing` tokens — never write a pixel value directly in a styled component.

| Token | Value | Use |
|-------|-------|-----|
| `xs`  | 4px   | Icon padding, tight gaps |
| `sm`  | 8px   | Inner padding, small gaps |
| `md`  | 16px  | Default padding |
| `lg`  | 24px  | Section padding, card padding |
| `xl`  | 32px  | Large gaps |
| `xxl` | 64px  | Section vertical rhythm |

**Correct**
```ts
padding: ${({ theme }) => theme.spacing.md};
gap: ${({ theme }) => theme.spacing.sm};
```

**Wrong**
```ts
padding: 15px;       // not on the grid
gap: 10px;           // not on the grid
margin-top: 1.2rem;  // hardcoded
```

---

## No hardcoded values

Every value that appears more than once or that carries meaning must be a constant in `theme.ts`.
This includes spacing, colours, border radii, shadows, breakpoints, and the max-width.

**Wrong**
```ts
background: #1a1a2e;
border-radius: 8px;
max-width: 1100px;
```

**Correct**
```ts
background: ${({ theme }) => theme.colors.primary};
border-radius: ${({ theme }) => theme.radius};
max-width: ${({ theme }) => theme.maxWidth};
```

If you find yourself writing a value that isn't in the theme, add it to `theme.ts` first.

---

## Colour

Minimal palette. Each colour has one job.

| Token          | Hex       | Job |
|----------------|-----------|-----|
| `primary`      | `#1a1a2e` | Backgrounds, headings, nav |
| `accent`       | `#e94560` | CTAs, highlights, active states |
| `background`   | `#f4f4f8` | Page background |
| `surface`      | `#ffffff` | Cards, modals, inputs |
| `text`         | `#1a1a2e` | Body text |
| `textMuted`    | `#6b7280` | Secondary text, placeholders |
| `border`       | `#e5e7eb` | Dividers, input borders |

Do not introduce new colours. If a new colour seems necessary, question whether the layout or hierarchy needs fixing instead.

---

## Typography

- One font family: `Inter, system-ui, sans-serif`
- Scale: 12 / 14 / 16 / 20 / 24 / 32 / 48px — all multiples of 4
- Line height: 1.5 for body, 1.2 for headings
- Font weights: 400 (body), 600 (label/caption), 700 (heading), 900 (hero)

---

## Borders & radius

| Token      | Value | Use |
|------------|-------|-----|
| `radius`   | 8px   | Buttons, inputs, small cards |
| `radiusLg` | 16px  | Large cards, modals |

No radius on full-width elements (headers, footers, section dividers).

---

## Shadows

Use sparingly — only to communicate elevation.

| Token      | Use |
|------------|-----|
| `shadow`   | Resting state of a card |
| `shadowMd` | Hover state, dropdowns, modals |

No shadow on flat UI (nav bars, full-width sections, inline elements).

---

## Layout

- Max content width: `1100px`, centred
- Horizontal padding: `theme.spacing.xl` (32px) on desktop, `theme.spacing.md` (16px) on mobile
- Vertical rhythm between sections: `theme.spacing.xxl` (64px)

---

## Component checklist

Before shipping a component:
- [ ] No hardcoded px/rem/hex values — all from theme
- [ ] All spacing on the 4px grid
- [ ] Styled components in a separate `.styled.ts` file
- [ ] File under 150 lines
- [ ] No colour used purely for decoration
