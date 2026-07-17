'use client'

import { useEffect, useState } from 'react'

interface StarlightProps {
  size?: number
  className?: string
  animated?: boolean
  'aria-hidden'?: boolean
  style?: React.CSSProperties
}

const GOLD = '#E8C170'

/**
 * Starlight — 五角手绘星
 *
 * 5 条略微不规则的细线构成五角星形状。
 * Nearby 唯一使用金色的元素。
 */
export default function Starlight({
  size = 28,
  className = '',
  animated = false,
  'aria-hidden': ariaHidden = true,
  style: externalStyle,
}: StarlightProps) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const c = size / 2
  const r = size * 0.44

  // 5-point star points at 0°, 72°, 144°, 216°, 288° (starting from top)
  const pts = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180)
    return {
      x: c + r * Math.cos(angle),
      y: c + r * Math.sin(angle),
    }
  })

  const drawLine = (from: number, to: number) => (
    <line
      key={`${from}-${to}`}
      x1={pts[from].x} y1={pts[from].y}
      x2={pts[to].x} y2={pts[to].y}
      stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
    />
  )

  // Pentagon outline: connect 0-2-4-1-3-0
  const lines = [0, 2, 4, 1, 3, 0]

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={className}
      aria-hidden={ariaHidden}
      style={{ display: 'block', filter: 'drop-shadow(0 0 1px rgba(232,193,112,0.3))', ...externalStyle }}
    >
      {animated && !reducedMotion && (
        <style>{`
          @keyframes starlightGrow {
            0%   { opacity: 0; transform: scale(0.3) rotate(-30deg); }
            40%  { opacity: 1; transform: scale(1.05) rotate(5deg); }
            60%  { opacity: 1; transform: scale(0.95) rotate(0deg); }
            100% { opacity: 1; transform: scale(1) rotate(0deg); }
          }
          @keyframes starlightBreathe {
            0%, 100% { opacity: 0.85; }
            50%      { opacity: 1; filter: drop-shadow(0 0 2px rgba(232,193,112,0.4)); }
          }
          .sl-grow { animation: starlightGrow 500ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
          .sl-breathe { animation: starlightBreathe 1200ms ease-in-out; }
        `}</style>
      )}

      <g
        className={animated && !reducedMotion ? 'sl-grow' : ''}
        opacity={0.9}
      >
        {/* Filled pentagon center for brightness */}
        <polygon
          points={pts.map(p => `${p.x},${p.y}`).join(' ')}
          fill={GOLD}
          opacity={0.15}
        />
        {/* Outline lines */}
        {lines.slice(0, 5).map((_, i) => drawLine(lines[i], lines[i + 1]))}
      </g>
    </svg>
  )
}
