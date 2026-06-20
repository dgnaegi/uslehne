export const theme = {
  colors: {
    primary: '#1a1a2e',
    accent: '#e94560',
    background: '#f4f4f8',
    surface: '#ffffff',
    text: '#1a1a2e',
    textMuted: '#6b7280',
    border: '#e5e7eb',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '4rem',
  },
  radius: '8px',
  radiusLg: '16px',
  shadow: '0 1px 4px rgba(0,0,0,0.08)',
  shadowMd: '0 4px 16px rgba(0,0,0,0.10)',
  maxWidth: '1100px',
  font: "'Inter', system-ui, sans-serif",
}

export type Theme = typeof theme
