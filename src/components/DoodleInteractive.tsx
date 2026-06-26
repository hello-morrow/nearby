'use client'

import { useState } from 'react'

const GOLD = '#D4A373'
const GREEN = '#88A97A'
const WHITE = '#FFFFFF'
const BROWN = '#C4A882'

// ── Hover / Press helper ──
interface DoodleWrapProps {
  children: React.ReactNode
  onClick?: () => void
  hoverRotate?: number
  hoverTranslateY?: number
  size?: number
  style?: React.CSSProperties
}

function DoodleWrap({ children, onClick, hoverRotate = 0, hoverTranslateY = -2, size, style }: DoodleWrapProps) {
  const [hover, setHover] = useState(false)
  const [pressed, setPressed] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPressed(false) }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onClick={onClick}
      style={{
        display: 'inline-flex', cursor: onClick ? 'pointer' : 'default',
        transform: pressed
          ? 'scale(0.96)'
          : hover
            ? `translateY(${hoverTranslateY}px) rotate(${hoverRotate}deg) scale(1.03)`
            : 'scale(1)',
        transition: 'transform 180ms ease',
        width: size, height: size,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ═══════════════════════════
// Spark 星星（多尺寸）
// ═══════════════════════════
interface SparkProps { size?: number; onTrigger?: () => void }

export function InteractiveSpark({ size = 22, onTrigger }: SparkProps) {
  const [burst, setBurst] = useState(false)
  const handleClick = () => { setBurst(true); setTimeout(() => setBurst(false), 900); onTrigger?.() }
  const s = size
  const burstOffset = size * 0.3
  const burstSize = size * 1.6

  return (
    <DoodleWrap onClick={handleClick} hoverRotate={8} hoverTranslateY={-2} size={size}>
      <div style={{ position: 'relative', width: s, height: s, flexShrink: 0 }}>
        <svg width={s} height={s} viewBox="0 0 22 22" fill="none">
          <path d="M11 3 L12.2 8.8 L18 10 L12.2 11.2 L11 17 L9.8 11.2 L4 10 L9.8 8.8Z" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        {burst && (
          <div style={{ position:'absolute',top:-burstOffset,left:-burstOffset,width:burstSize,height:burstSize,pointerEvents:'none' }}>
            <svg width={burstSize} height={burstSize} viewBox="0 0 34 34" fill="none" style={{ animation:'doodleSparkOut 900ms ease-out forwards' }}>
              <circle cx="10" cy="10" r="2" fill={GOLD} /><circle cx="24" cy="10" r="2" fill={GREEN} />
              <circle cx="10" cy="24" r="2" fill={WHITE} /><circle cx="24" cy="24" r="2" fill={GOLD} />
              <circle cx="17" cy="5" r="1.5" fill={GREEN} /><circle cx="17" cy="29" r="1.5" fill={GOLD} />
              <circle cx="5" cy="17" r="1.5" fill={WHITE} /><circle cx="29" cy="17" r="1.5" fill={GREEN} />
            </svg>
          </div>
        )}
      </div>
    </DoodleWrap>
  )
}

// ═══════════════════════════
// Seed 种子生长
// ═══════════════════════════
export function InteractiveSeed({ size = 28 }: { size?: number }) {
  const [stage, setStage] = useState(0)
  const handleClick = () => setStage(prev => prev < 4 ? prev + 1 : 0)

  return (
    <DoodleWrap onClick={handleClick} hoverTranslateY={-2} hoverRotate={-1} size={size}>
      <div style={{ width: size, height: size + 4, position: 'relative' }}>
        <svg width={size} height={size + 4} viewBox="0 0 28 32" fill="none" style={{ transition:'all 700ms ease-in-out' }}>
          {stage === 0 && <ellipse cx="14" cy="26" rx="3" ry="4" fill={GREEN} opacity="0.6" />}
          {(stage >= 1) && (<><path d="M14 28 Q14 20 14 14" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" /><path d="M14 20 Q10 17 12 14.5" stroke={GREEN} strokeWidth="1.2" strokeLinecap="round" fill="none" /></>)}
          {(stage >= 2) && (<><path d="M14 18 Q8 14 10 10" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" /><path d="M14 14 Q20 10 18 6" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" /></>)}
          {(stage >= 3) && (<><path d="M14 28 Q14 14 14 10" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" /><path d="M14 10 Q8 6 10 4" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" /><path d="M14 8 Q20 4 18 2" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" /></>)}
          {(stage >= 4) && (<><path d="M14 30 Q14 12 14 6" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" /><path d="M14 16 Q6 10 8 4" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" /><path d="M14 12 Q22 6 20 2" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" /><path d="M14 8 Q10 4 14 2 Q18 4 14 8Z" fill={GREEN} opacity="0.5" /></>)}
        </svg>
      </div>
    </DoodleWrap>
  )
}

// ═══════════════════════════
// Leaf 叶子飘落（多尺寸）
// ═══════════════════════════
export function InteractiveLeaf({ size = 20 }: { size?: number }) {
  const [falling, setFalling] = useState(false)
  const handleClick = () => { setFalling(true); setTimeout(() => setFalling(false), 1500) }

  return (
    <DoodleWrap onClick={handleClick} hoverTranslateY={-2} hoverRotate={2} size={size}>
      <div style={{ position: 'relative', width: size, height: size }}>
        {!falling ? (
          <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
            <path d="M3 17 Q7 11 11 9 Q15 11 19 17" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.45" />
            <path d="M11 9 Q9 6 11 3 Q13 6 11 9Z" fill={GREEN} opacity="0.35" />
          </svg>
        ) : (
          <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ animation:'leafFall 1500ms ease-in forwards' }}>
            <path d="M3 17 Q7 11 11 9 Q15 11 19 17" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M11 9 Q9 6 11 3 Q13 6 11 9Z" fill={GREEN} opacity="0.5" />
          </svg>
        )}
      </div>
    </DoodleWrap>
  )
}

// ═══════════════════════════
// Circle 手绘圆（多尺寸）
// ═══════════════════════════
export function InteractiveCircle({ size = 18 }: { size?: number }) {
  const [pulse, setPulse] = useState(false)
  const handleClick = () => { setPulse(true); setTimeout(() => setPulse(false), 500) }

  return (
    <DoodleWrap onClick={handleClick} hoverTranslateY={-1} hoverRotate={2} size={size}>
      <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
        <path d="M11 3 Q17 4 19 10 Q21 16 15 19 Q9 21 4 15 Q2 9 7 5Q10 3 11 3Z" stroke={pulse ? GOLD : BROWN} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity={pulse ? 0.8 : 0.5} />
      </svg>
    </DoodleWrap>
  )
}

// ═══════════════════════════
// SparkCluster 星星簇（3颗星星大小不同）
// ═══════════════════════════
export function InteractiveSparkCluster() {
  const [burst, setBurst] = useState(false)
  const handleClick = () => { setBurst(true); setTimeout(() => setBurst(false), 1000) }

  return (
    <DoodleWrap onClick={handleClick} hoverTranslateY={-2} hoverRotate={3} size={44}>
      <div style={{ position:'relative', width:44, height:28 }}>
        <svg width="44" height="28" viewBox="0 0 44 28" fill="none">
          <path d="M10 2 L10.8 5.8 L14.6 7 L10.8 8.2 L10 12 L9.2 8.2 L5.4 7 L9.2 5.8Z" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M28 6 L28.5 8.5 L31 9 L28.5 9.5 L28 12 L27.5 9.5 L25 9 L27.5 8.5Z" stroke={GOLD} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7" />
          <path d="M38 18 L38.4 20 L40 21 L38.4 22 L38 24 L37.6 22 L36 21 L37.6 20Z" stroke={GOLD} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5" />
        </svg>
        {burst && (
          <div style={{ position:'absolute',top:-8,left:-4,width:56,height:44,pointerEvents:'none' }}>
            <svg width="56" height="44" viewBox="0 0 56 44" fill="none" style={{ animation:'doodleSparkOut 900ms ease-out forwards' }}>
              <circle cx="14" cy="6" r="2" fill={GOLD} /><circle cx="30" cy="4" r="1.5" fill={GREEN} />
              <circle cx="20" cy="24" r="2" fill={WHITE} /><circle cx="42" cy="16" r="1.5" fill={GOLD} />
              <circle cx="8" cy="18" r="1.5" fill={GREEN} /><circle cx="36" cy="30" r="2" fill={GOLD} />
            </svg>
          </div>
        )}
      </div>
    </DoodleWrap>
  )
}

// ═══════════════════════════
// Sprout 小嫩芽（上传区用小尺寸）
// ═══════════════════════════
export function InteractiveSprout({ size = 16 }: { size?: number }) {
  const [grow, setGrow] = useState(false)
  const handleClick = () => { setGrow(prev => !prev) }

  return (
    <DoodleWrap onClick={handleClick} hoverTranslateY={-1} hoverRotate={-2} size={size}>
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <path d="M8 14 Q8 8 8 6" stroke={GREEN} strokeWidth="1.2" strokeLinecap="round" />
        {grow && (
          <>
            <path d="M8 8 Q5 6 6 4" stroke={GREEN} strokeWidth="1" strokeLinecap="round" fill="none" />
            <path d="M8 7 Q11 5 10 3" stroke={GREEN} strokeWidth="1" strokeLinecap="round" fill="none" />
          </>
        )}
      </svg>
    </DoodleWrap>
  )
}

// ═══════════════════════════
// Global keyframes
// ═══════════════════════════
export const doodleStyles = `
@keyframes doodleSparkOut {
  0% { transform: scale(0.6); opacity: 1; }
  100% { transform: scale(1.4); opacity: 0; }
}
@keyframes leafFall {
  0% { transform: translate(0,0) rotate(0deg); opacity: 1; }
  100% { transform: translate(8px,40px) rotate(120deg); opacity: 0; }
}
`