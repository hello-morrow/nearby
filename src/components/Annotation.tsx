'use client'

import { useMemo, useState } from 'react'

type AssetType = 'thread' | 'leaf' | 'spark' | 'arrow' | 'circle' | 'tape' | 'seed'

interface AnnotationProps {
  type: AssetType
  size?: number
  className?: string
}

function pick(type: AssetType): string {
  const n = Math.floor(Math.random() * 15) + 1
  return `/assets/annotation/${type}-${String(n).padStart(2, '0')}.svg`
}

export default function Annotation({ type, size = 24, className }: AnnotationProps) {
  const src = useMemo(() => pick(type), [type])
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [key, setKey] = useState(0)

  const handleClick = () => {
    setKey(prev => prev + 1)
  }

  return (
    <img
      key={key}
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