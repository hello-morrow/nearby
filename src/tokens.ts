/* ═══════════════════════════════════════════
   Nearby Design System Ch 1 — Visual Language
   TypeScript tokens for component usage
   ═══════════════════════════════════════════ */

// ── Colors (6 色系统) ──
export const colors = {
  paper:   '#F9F8F6',   // 全站背景
  surface: '#FFFDFB',   // Card 背景
  ink:     '#1D1D1F',   // 主文字
  gray:    '#8C8C8C',   // 副标题
  gold:    '#D4A373',   // Memory Gold
  green:   '#88A97A',   // Memory Green
} as const

// ── Shadow ──
export const shadow = '0 10px 30px rgba(0,0,0,0.05)'

// ── Radius ──
export const radius = {
  card:   '24px',
  button: '18px',
  input:  '24px',
} as const

// ── Typography ──
export const typography = {
  fontFamily: {
    sans: "'Inter','PingFang SC',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
    mono: "'JetBrains Mono','Consolas','Monaco',monospace",
  },
  fontSize: {
    h1:      '64px',
    h2:      '40px',
    body:    '18px',
    caption: '14px',
  },
  fontWeight: {
    bold:     700,
    semibold: 600,
    regular:  400,
  },
  lineHeight: {
    h1:     1.1,
    body:   1.7,
    caption:1.5,
  },
} as const

// ── Spacing ──
export const spacing = {
  24: '24px',
  32: '32px',
  40: '40px',
  48: '48px',
  64: '64px',
  80: '80px',
} as const

// ── Motion ──
export const motion = '220ms ease'