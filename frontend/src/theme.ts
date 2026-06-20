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
    // pastel panel colours — used for card image areas
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
    xs: px(1), // 4px
    sm: px(2), // 8px
    md: px(4), // 16px
    lg: px(6), // 24px
    xl: px(8), // 32px
    xxl: px(16), // 64px
  },
  border: '3px solid #1a1a1a',
  radius: px(1), // 4px
  radiusLg: px(2), // 8px
  shadow: '4px 4px 0px #1a1a1a',
  shadowMd: '6px 6px 0px #1a1a1a',
  maxWidth: '1200px',
  font: "'Inter', system-ui, sans-serif",
  fontComic: "'Bangers', 'Impact', system-ui, sans-serif",
}

export type Theme = typeof theme
