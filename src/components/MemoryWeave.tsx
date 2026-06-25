'use client'

import { useEffect, useState } from 'react'
import { Tree } from './Doodle'

interface MemoryWeaveProps {
  entryCount: number
}

export default function MemoryWeave({ entryCount }: MemoryWeaveProps) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setAnimated(true))
  }, [])

  const nodeCount = Math.max(1, entryCount + 1)

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display:'flex',alignItems:'center',gap:'6px',marginBottom:'12px' }}>
        <Tree size={16} />
        <h3 style={{ fontSize:'13px',fontWeight:500,color:'#1E1E1E',margin:0 }}>Memory Weave</h3>
      </div>

      {/* 细线 + 节点 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <span style={{ fontSize: '11px', color: '#B0B0B0', flexShrink: 0 }}>今天</span>

        <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E5E5', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {Array.from({ length: nodeCount }).map((_, i) => (
            <div
              key={i}
              style={{
                width: i === 0 ? '8px' : '6px',
                height: i === 0 ? '8px' : '6px',
                borderRadius: '50%',
                backgroundColor: i === 0 ? '#1E1E1E' : '#D0D0D0',
                opacity: animated ? 1 : 0,
                transform: animated ? 'scale(1)' : 'scale(0)',
                transition: `opacity 400ms ease-out ${i * 200}ms, transform 400ms ease-out ${i * 200}ms`,
              }}
            />
          ))}
        </div>

        <span style={{ fontSize: '11px', color: '#B0B0B0', flexShrink: 0 }}>未来</span>
      </div>

      <p style={{ fontSize: '11px', color: '#B0B0B0', margin: '4px 0 0 0' }}>
        人生织物正在慢慢形成
      </p>
    </div>
  )
}