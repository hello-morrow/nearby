'use client'

import { useState, useEffect } from 'react'

type AssetType = 'thread' | 'leaf' | 'spark' | 'arrow' | 'circle' | 'tape' | 'seed'

interface AnnotationProps {
  type: AssetType
  size?: number
  className?: string
  index?: number          // deterministic index (e.g. from memory.id)
}

const TOTAL = 15

// Server-safe: always returns 0 on first render
function safeIndex(index?: number): number {
  if (index !== undefined) return index % TOTAL
  return 0
}

export default function Annotation({ type, size = 24, className, index }: AnnotationProps) {
  // Server renders index 0 or the explicit index — always deterministic
  const [assetIndex, setAssetIndex] = useState(safeIndex(index))

  // Client mount: if no explicit index, pick random
  useEffect(() => {
    if (index === undefined) {
      setAssetIndex(Math.floor(Math.random() * TOTAL))
    }
  }, [index])

  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [key, setKey] = useState(0)

  const src = `/assets/annotation/${type}-${String(assetIndex + 1).padStart(2, '0')}.svg`

  const handleClick = () => {
    setKey(prev => prev + 1)
    // On click: randomize for interactive feel
    setAssetIndex(Math.floor(Math.random() * TOTAL))
  }

  return (
    <img
      key={`${key}-${assetIndex}`}
      src={src}
      alt={`${type} annotation`}
      className={className}
      draggable={false}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setHovering(false); setPressed(false) }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onClick={handleClick}
      style={{
        width: size,
        height: size,
        display: 'inline-block',
        cursor: 'pointer',
        transform: pressed
          ? 'scale(0.96)'
          : hovering
            ? 'translateY(-2px) rotate(-1deg) scale(1.03)'
            : 'scale(1)',
        transition: 'transform 180ms ease',
        userSelect: 'none',
        pointerEvents: 'auto',
      }}
    />
  )
}

// Convenience exports
export function AnnotationThread(props: Omit<AnnotationProps, 'type'>) {
  return <Annotation type="thread" {...props} />
}
export function AnnotationLeaf(props: Omit<AnnotationProps, 'type'>) {
  return <Annotation type="leaf" {...props} />
}
export function AnnotationSpark(props: Omit<AnnotationProps, 'type'>) {
  return <Annotation type="spark" {...props} />
}
export function AnnotationArrow(props: Omit<AnnotationProps, 'type'>) {
  return <Annotation type="arrow" {...props} />
}
export function AnnotationCircle(props: Omit<AnnotationProps, 'type'>) {
  return <Annotation type="circle" {...props} />
}
export function AnnotationTape(props: Omit<AnnotationProps, 'type'>) {
  return <Annotation type="tape" {...props} />
}
export function AnnotationSeed(props: Omit<AnnotationProps, 'type'>) {
  return <Annotation type="seed" {...props} />
}

export type { AssetType }