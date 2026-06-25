/* ═══════════════════════════════════════════
   Nearby Design System v1.0 — Design Tokens
   所有页面统一引用此文件
   ═══════════════════════════════════════════ */

// ── Colors ──
export const colors = {
  background:      '#F7F5F2',
  surface:         '#FCFBF8',
  surfaceHover:    '#F3F1ED',
  textPrimary:     '#1D1D1F',
  textSecondary:   '#8D8D8D',
  textLight:       '#B8B8B8',
  border:          '#E8E5E0',
  accent:          '#232323',
  success:         '#5E9B68',
} as const

// ── Radius ──
export const radius = {
  button:    '18px',
  card:      '24px',
  textarea:  '24px',
  image:     '20px',
  avatar:    '999px',
} as const

// ── Shadow (全站唯一) ──
export const shadow = '0 8px 30px rgba(0, 0, 0, 0.04)'

// ── Typography ──
export const typography = {
  fontFamily: {
    sans: "'Inter', 'PingFang SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', 'Consolas', 'Monaco', monospace",
  },
  fontSize: {
    h1:     '48px',
    h2:     '30px',
    body:   '18px',
    small:  '15px',
    caption:'13px',
  },
  fontWeight: {
    bold:       700,
    semibold:   600,
    regular:    400,
  },
  lineHeight: {
    h1:       1.2,
    body:     1.6,
    small:    1.5,
    caption:  1.4,
  },
} as const

// ── Spacing (8pt grid) ──
export const spacing = {
  8:   '8px',
  12:  '12px',
  16:  '16px',
  24:  '24px',
  32:  '32px',
  40:  '40px',
  48:  '48px',
  64:  '64px',
  96:  '96px',
} as const

// ── Transition ──
export const transition = '180ms ease'

// ── Button ──
export const button = {
  height:     '60px',
  radius:     '18px',
  hover:      { opacity: '0.95' },
  active:     { transform: 'scale(0.98)' },
} as const

// ── Input ──
export const input = {
  padding:    '32px',
  height:     '360px',
  border:     `1px solid ${colors.border}`,
  focusBorder:`1px solid ${colors.accent}`,
} as const

// ── Card ──
export const card = {
  padding:    '24px',
  radius:     '24px',
  shadow,
} as const

// ── Design Principles ──
export const principles = {
  keywords: ['Quiet', 'Warm', 'Time', 'Memory', 'Paper', 'Breathing', 'Minimal'],
  references: ['Apple Journal', 'MUJI', 'Notion', 'Read.cv', 'Arc Browser'],
  antiPatterns: ['Ant Design', 'Element UI', 'Material Design', '企业后台', '科技蓝', '玻璃拟态'],
} as const