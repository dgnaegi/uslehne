const BASE = 4
const px = (n: number): string => `${n * BASE}px`

export const theme = {
  colors: {
    primary:    '#1a1a2e',
    accent:     '#16a34a',
    background: '#f4f4f8',
    surface:    '#ffffff',
    text:       '#1a1a2e',
    textMuted:  '#6b7280',
    border:     '#e5e7eb',
  },
  spacing: {
    xs:  px(1),   // 4px
    sm:  px(2),   // 8px
    md:  px(4),   // 16px
    lg:  px(6),   // 24px
    xl:  px(8),   // 32px
    xxl: px(16),  // 64px
  },
  radius:    px(2),   // 8px
  radiusLg:  px(4),   // 16px
  shadow:    '0 1px 4px rgba(0,0,0,0.08)',
  shadowMd:  '0 4px 16px rgba(0,0,0,0.10)',
  maxWidth:  '1100px',
  font:      "'Inter', system-ui, sans-serif",
}

export type Theme = typeof theme
