// Design tokens — ground truth from Home page components.
// Use these in inline style props. CSS variables already in globals.css.

export const COLORS = {
  brand: {
    orange: '#f97316',
    hover: '#ea580c',
    light: '#fb923c',
    glow: 'rgba(249,115,22,0.4)',
    glowHover: 'rgba(249,115,22,0.5)',
    dim: 'rgba(249,115,22,0.08)',
    dimBorder: 'rgba(249,115,22,0.3)',
  },
  bg: {
    dark: '#0f172a',
    darkDeep: '#0c1220',
    paper: '#f4f4f0',
    light: '#ffffff',
    slate: '#f8fafc',
  },
  text: {
    body: '#475569',
    muted: '#64748b',
    dark: '#0f172a',
    lightPrimary: 'rgba(255,255,255,0.95)',
    lightMuted: 'rgba(255,255,255,0.82)',
    lightSubtle: 'rgba(255,255,255,0.60)',
  },
  border: {
    light: '#e2e8f0',
    dark: 'rgba(255,255,255,0.08)',
    darkMid: 'rgba(255,255,255,0.14)',
  },
} as const

export const TYPOGRAPHY = {
  families: {
    heading: 'var(--font-barlow-condensed)',
    mono: 'var(--font-ibm-mono)',
    body: 'var(--font-sans)',
    display: 'var(--font-display)',
  },
  sizes: {
    hero: 'clamp(4.5rem, 8vw, 8.5rem)',
    sectionLarge: 'clamp(2.5rem, 5vw, 4.5rem)',
    sectionMedium: 'clamp(2rem, 4vw, 3.5rem)',
    bodyLg: '1.05rem',
    body: '15px',
    bodySm: '14px',
    label: '10px',
  },
} as const

export const SPACING = {
  container: {
    maxWidth: '1200px',
    paddingX: 'clamp(1.25rem, 4vw, 2rem)',
  },
  section: {
    paddingY: 'clamp(4rem, 6vw, 6rem)',
    paddingYSm: 'clamp(2.5rem, 4vw, 4rem)',
    paddingYLg: 'clamp(5rem, 8vw, 8rem)',
  },
} as const

export const SHADOWS = {
  cardHover: '0 16px 48px rgba(0,0,0,0.10)',
  primaryBtn: '0 4px 24px rgba(249,115,22,0.4)',
  primaryBtnHover: '0 8px 36px rgba(249,115,22,0.5)',
  featuredCard: '0 24px 60px rgba(15,23,42,0.28)',
} as const

export const RADIUS = {
  pill: '999px',
  card: '20px',
  cardElevated: '16px',
  icon: '10px',
  badge: '4px',
} as const

export const DOT_GRID_STYLE = {
  backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
  backgroundSize: '28px 28px',
} as const
