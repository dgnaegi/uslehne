const BASE = 4
const px = (n: number): string => `${n * BASE}px`

export const theme = {
  colors: {
    primary: '#1a1a1a',
    accent: '#FFD600',
    background: '#FDFAF0',
    surface: '#FFFFFF',
    text: '#1a1a1a',
    textMuted: '#555555',
    border: '#1a1a1a',
    pastelBlue: '#B8E1F9',
    pastelYellow: '#FFE9A0',
    pastelPink: '#FFB8D4',
    pastelMint: '#B8F0D4',
    pastelPurple: '#D4B8F9',
    pastelOrange: '#FFD4A8',
    danger: '#d32f2f',
    error: '#c62828',
    success: '#2e7d32',
  },
  spacing: {
    xs: px(1), //  4px
    sm: px(2), //  8px
    md: px(4), // 16px
    lg: px(6), // 24px
    xl: px(8), // 32px
    xxl: px(16), // 64px
  },
  // Fixed-size layout constants
  headerHeight: px(14), // 56px
  // Named z-index scale — nothing sits between layers without a name
  zIndex: {
    base: 0,
    filterBar: 90,
    mobileMenu: 99,
    header: 100,
    overlay: 200,
    modal: 1000,
  },
  // Breakpoint widths — use with the `bp` helper below for media queries
  breakpoints: {
    sm: '600px',
    md: '900px',
    lg: '1200px',
  },
  // 12-column grid definition
  grid: {
    columns: 12,
    gutter: px(4), // 16px — matches spacing.md
    maxWidth: '1200px',
  },
  border: '3px solid #1a1a1a',
  radius: px(1), //  4px
  radiusLg: px(2), //  8px
  shadow: '4px 4px 0px #1a1a1a',
  shadowMd: '6px 6px 0px #1a1a1a',
  maxWidth: '1200px',
  font: "'Inter', system-ui, sans-serif",
  fontComic: "'Bangers', 'Impact', system-ui, sans-serif",
}

export type Theme = typeof theme

// Use `bp.sm` inside template-literal media queries where `theme` isn't available
export const bp = theme.breakpoints

// Convenience helpers: `${media.sm} { ... }` inside styled-components
export const media = {
  sm: `@media (min-width: ${bp.sm})`,
  md: `@media (min-width: ${bp.md})`,
  lg: `@media (min-width: ${bp.lg})`,
  maxSm: `@media (max-width: ${bp.sm})`,
  maxMd: `@media (max-width: ${bp.md})`,
} as const
