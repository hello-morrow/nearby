'use client'

import { useEffect, useState } from 'react'

interface MemoryWeaveProps {
  entryCount: number
  starCount?: number
}

export default function MemoryWeave({ entryCount, starCount = 0 }: MemoryWeaveProps) {
  const [animated, setAnimated] = useState(false)

  const knotCount = Math.min(entryCount, 4)

  useEffect(() => {
    requestAnimationFrame(() => setAnimated(true))
  }, [])

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <ellipse cx="7" cy="7" rx="3.5" ry="5" fill="#88A97A" stroke="none" transform="rotate(-15 7 7)" />
        </svg>
        <h3 style={{ fontSize: '13px', fontWeight: 500, color: '#1E1E1E', margin: 0 }}>Memory Weave</h3>
        {starCount > 0 && (
          <span style={{ fontSize: '11px', color: '#D4A373', marginLeft: 'auto', opacity: 0.7 }}>
            ✦ {starCount}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span style={{ fontSize: '11px', color: '#7B7B7B', flexShrink: 0 }}>今天</span>

        <div style={{
          flex: 1, height: '3px',
          backgroundColor: '#D9D2C6', borderRadius: '2px',
          position: 'relative', display: 'flex', alignItems: 'center',
        }}>
          <div style={{
            position: 'absolute', left: -4, top: '50%', transform: 'translateY(-50%)',
            width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#88A97A',
            opacity: animated ? 1 : 0, transition: 'opacity 400ms ease-out',
          }} />

          {Array.from({ length: knotCount }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: `${20 + i * 22}%`,
              top: i % 2 === 0 ? -3 : 4,
              width: '6px', height: '6px', borderRadius: '50%',
              backgroundColor: '#C4B8A8',
              opacity: animated ? 1 : 0,
              transform: animated ? 'scale(1)' : 'scale(0)',
              transition: `opacity 400ms ease-out ${i * 200}ms, transform 400ms ease-out ${i * 200}ms`,
            }} />
          ))}
        </div>

        <span style={{ fontSize: '11px', color: '#7B7B7B', flexShrink: 0 }}>未来</span>
      </div>

      <p style={{ fontSize: '12px', color: '#A4A4A4', margin: '4px 0 0 0', lineHeight: 1.6 }}>
        Every memory begins with a single thread.
      </p>
      <p style={{ fontSize: '12px', color: '#A4A4A4', margin: '2px 0 0 0', lineHeight: 1.6 }}>
        每一段记忆，都从第一根线开始。
      </p>
    </div>
  )
}
