'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface BackThreadProps {
  label: string
  href?: string
  onClick?: () => void
}

export default function BackThread({ label, href, onClick }: BackThreadProps) {
  const router = useRouter()
  const [hover, setHover] = useState(false)
  const [drawing, setDrawing] = useState(false)

  const handleClick = () => {
    setDrawing(true)
    setTimeout(() => {
      if (onClick) onClick()
      else if (href) router.push(href)
      setDrawing(false)
    }, 220)
  }

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
        position: 'absolute',
        top: '32px',
        left: '40px',
        zIndex: 10,
        userSelect: 'none',
      }}
    >
      {/* Thread line */}
      <svg width="28" height="16" viewBox="0 0 28 16" fill="none" style={{ flexShrink: 0 }}>
        <path
          d="M1 14 Q6 4 14 8 Q20 12 26 6"
          stroke="#D4A373"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          opacity={hover || drawing ? 0.8 : 0.4}
          style={{
            transition: 'opacity 220ms ease',
          }}
        />
        {/* Draw animation overlay */}
        {hover && (
          <path
            d="M1 14 Q6 4 14 8 Q20 12 26 6"
            stroke="#D4A373"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
            style={{
              strokeDasharray: 40,
              strokeDashoffset: drawing ? 0 : 40,
              transition: 'stroke-dashoffset 220ms ease-out',
            }}
          />
        )}
      </svg>

      <span
        style={{
          fontSize: '14px',
          color: hover ? '#1D1D1F' : '#8C8C8C',
          fontWeight: hover ? 500 : 400,
          transition: 'color 220ms ease, fontWeight 220ms ease',
        }}
      >
        {label}
      </span>
    </div>
  )
}