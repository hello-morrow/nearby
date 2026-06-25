'use client'

import type { CSSProperties } from 'react'

type DoodleSize = 16 | 20 | 24 | 32 | 48

interface DoodleProps {
  size?: DoodleSize
}

const hoverStyle: CSSProperties = {
  cursor: 'default',
  transition: 'opacity 180ms ease, transform 180ms ease',
}

// ── Shared wrapper ──
function Doodle({
  size = 24,
  children,
  viewBox = '0 0 24 24',
}: DoodleProps & { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="#2B2B2B"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={hoverStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.7'
        e.currentTarget.style.transform = 'scale(1.03)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1'
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      {children}
    </svg>
  )
}

// ═══════════════════════════════════════
// Thread  — 一根弯曲的线，带节点
// ═══════════════════════════════════════
export function Thread({ size = 24 }: DoodleProps) {
  return (
    <Doodle size={size}>
      <path d="M3 20 Q8 4 12 12 Q16 20 21 6" />
      <circle cx="8" cy="10" r="1.5" fill="#2B2B2B" stroke="none" />
      <circle cx="16" cy="16" r="2" fill="#2B2B2B" stroke="none" />
    </Doodle>
  )
}

// ═══════════════════════════════════════
// Leaf  — 一片叶子，叶脉略歪
// ═══════════════════════════════════════
export function Leaf({ size = 24 }: DoodleProps) {
  return (
    <Doodle size={size}>
      <path d="M12 2 Q5 10 12 22 Q19 10 12 2Z" />
      <path d="M12 4 L11.5 19" />
      <path d="M12 8 Q9 11 8 10" />
      <path d="M12 12 Q15 15 16 14" />
    </Doodle>
  )
}

// ═══════════════════════════════════════
// Spark  — 三颗小星，位置略偏
// ═══════════════════════════════════════
export function Spark({ size = 24 }: DoodleProps) {
  return (
    <Doodle size={size}>
      <path d="M12 3 L13.2 8.8 L19 10 L13.2 11.2 L12 17 L10.8 11.2 L5 10 L10.8 8.8Z" />
      <path d="M3 16 L3.6 18.4 L6 19 L3.6 19.6 L3 22 L2.4 19.6 L0 19 L2.4 18.4Z" />
      <path d="M20 15 L20.5 16.8 L22 17 L20.5 17.2 L20 19 L19.5 17.2 L18 17 L19.5 16.8Z" />
    </Doodle>
  )
}

// ═══════════════════════════════════════
// Pin  — 地点标记，略歪
// ═══════════════════════════════════════
export function Pin({ size = 24 }: DoodleProps) {
  return (
    <Doodle size={size}>
      <path d="M11.5 21 Q12 13 12 9 Q12 3 8.5 3 Q5 3 5 9 Q5 13 5.5 21" />
      <circle cx="6.5" cy="8.5" r="1.8" fill="#2B2B2B" stroke="none" />
    </Doodle>
  )
}

// ═══════════════════════════════════════
// Arrow  — 手绘箭头
// ═══════════════════════════════════════
export function Arrow({ size = 24 }: DoodleProps) {
  return (
    <Doodle size={size}>
      <path d="M4 12 L18 12" />
      <path d="M13 7 L18.5 12 L13 17" />
    </Doodle>
  )
}

// ═══════════════════════════════════════
// Circle  — 略微不规则的圆
// ═══════════════════════════════════════
export function Circle({ size = 24 }: DoodleProps) {
  return (
    <Doodle size={size}>
      <path d="M12 3 Q18.5 3.5 20.5 9.5 Q22.5 15 18 19.5 Q13.5 23.5 7.5 21 Q3.5 17.5 3 11 Q3 5.5 7.5 3.5Z" />
    </Doodle>
  )
}

// ═══════════════════════════════════════
// Tape  — 胶带，边缘略毛
// ═══════════════════════════════════════
export function Tape({ size = 24 }: DoodleProps) {
  return (
    <Doodle size={size}>
      <path d="M3 7 L6 5 L18 6 L21 8 L20 12 L17 10 L18 13 L3 11Z" />
    </Doodle>
  )
}

// ═══════════════════════════════════════
// Stitch  — 缝线，针脚不均匀
// ═══════════════════════════════════════
export function Stitch({ size = 24 }: DoodleProps) {
  return (
    <Doodle size={size}>
      <path d="M4 8 L7 5 L10 9 L13 4.5 L16 9 L19 5 L21 8" />
      <circle cx="7" cy="5" r="1" fill="#2B2B2B" stroke="none" />
      <circle cx="13" cy="4.5" r="1" fill="#2B2B2B" stroke="none" />
      <circle cx="19" cy="5" r="1" fill="#2B2B2B" stroke="none" />
    </Doodle>
  )
}

// ═══════════════════════════════════════
// Tree  — 手绘大树
// ═══════════════════════════════════════
export function Tree({ size = 24 }: DoodleProps) {
  return (
    <Doodle size={size}>
      <path d="M12 21 L12 10" />
      <path d="M6 14 Q8 6 12 4 Q16 6 18 14" />
      <path d="M7 12 Q9 7 12 5 Q15 7 17 12" />
      <path d="M8 10 Q10 8 12 7 Q14 8 16 10" />
    </Doodle>
  )
}