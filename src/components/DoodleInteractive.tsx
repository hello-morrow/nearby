'use client'

import { useState } from 'react'

const GOLD = '#D4A373'
const GREEN = '#88A97A'
const WHITE = '#FFFFFF'

// ── Hover / Press helper ──
interface DoodleWrapProps {
  children: React.ReactNode
  onClick?: () => void
  hoverRotate?: number
  hoverTranslateY?: number
  style?: React.CSSProperties
}

function DoodleWrap({ children, onClick, hoverRotate = 0, hoverTranslateY = -2, style }: DoodleWrapProps) {
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
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ═══════════════════════════
// Doodle 01: Spark（星星）
// ═══════════════════════════
export function InteractiveSpark({ onTrigger }: { onTrigger?: () => void }) {
  const [burst, setBurst] = useState(false)

  const handleClick = () => {
    setBurst(true)
    setTimeout(() => setBurst(false), 900)
    onTrigger?.()
  }

  return (
    <DoodleWrap onClick={handleClick} hoverRotate={8} hoverTranslateY={-2}>
      <div style={{ position: 'relative', width: 22, height: 22, flexShrink: 0 }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 3 L12.2 8.8 L18 10 L12.2 11.2 L11 17 L9.8 11.2 L4 10 L9.8 8.8Z" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        {burst && (
          <div style={{ position:'absolute',top:-6,left:-6,width:34,height:34,pointerEvents:'none' }}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" style={{ animation:'doodleSparkOut 900ms ease-out forwards' }}>
              <circle cx="10" cy="10" r="2" fill={GOLD} />
              <circle cx="24" cy="10" r="2" fill={GREEN} />
              <circle cx="10" cy="24" r="2" fill={WHITE} />
              <circle cx="24" cy="24" r="2" fill={GOLD} />
              <circle cx="17" cy="5" r="1.5" fill={GREEN} />
              <circle cx="17" cy="29" r="1.5" fill={GOLD} />
              <circle cx="5" cy="17" r="1.5" fill={WHITE} />
              <circle cx="29" cy="17" r="1.5" fill={GREEN} />
            </svg>
          </div>
        )}
      </div>
    </DoodleWrap>
  )
}

// ═══════════════════════════
// Doodle 02: Memory Seed（种子生长 5阶段）
// ═══════════════════════════
export function InteractiveSeed() {
  const [stage, setStage] = useState(0)
  const stages = ['seed', 'sprout', 'leaves', 'tall', 'plant']

  const handleClick = () => setStage(prev => prev < 4 ? prev + 1 : 0)

  return (
    <DoodleWrap onClick={handleClick} hoverTranslateY={-2} hoverRotate={-1}>
      <div style={{ width: 28, height: 32, position: 'relative' }}>
        <svg width="28" height="32" viewBox="0 0 28 32" fill="none" style={{ transition:'all 700ms ease-in-out' }}>
          {/* Stage 0: Seed */}
          {stage === 0 && (
            <ellipse cx="14" cy="26" rx="3" ry="4" fill={GREEN} opacity="0.6" />
          )}

          {/* Stage 1: Sprout */}
          {(stage >= 1) && (
            <>
              <path d="M14 28 Q14 20 14 14" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" />
              <path d="M14 20 Q10 17 12 14.5" stroke={GREEN} strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Stage 2: Leaves */}
          {(stage >= 2) && (
            <>
              <path d="M14 18 Q8 14 10 10" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M14 14 Q20 10 18 6" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Stage 3: Tall */}
          {(stage >= 3) && (
            <>
              <path d="M14 28 Q14 14 14 10" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" />
              <path d="M14 10 Q8 6 10 4" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M14 8 Q20 4 18 2" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Stage 4: Plant */}
          {(stage >= 4) && (
            <>
              <path d="M14 30 Q14 12 14 6" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" />
              <path d="M14 16 Q6 10 8 4" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M14 12 Q22 6 20 2" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M14 8 Q10 4 14 2 Q18 4 14 8Z" fill={GREEN} opacity="0.5" />
            </>
          )}
        </svg>
      </div>
    </DoodleWrap>
  )
}

// ═══════════════════════════
// Doodle 03: Leaf（飘落）
// ═══════════════════════════
export function InteractiveLeaf() {
  const [falling, setFalling] = useState(false)

  const handleClick = () => {
    setFalling(true)
    setTimeout(() => setFalling(false), 1500)
  }

  return (
    <DoodleWrap onClick={handleClick} hoverTranslateY={-2} hoverRotate={2}>
      <div style={{ position: 'relative', width: 20, height: 20 }}>
        {!falling ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 17 Q7 11 11 9 Q15 11 19 17" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.45" />
            <path d="M11 9 Q9 6 11 3 Q13 6 11 9Z" fill={GREEN} opacity="0.35" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation:'leafFall 1500ms ease-in forwards' }}>
            <path d="M3 17 Q7 11 11 9 Q15 11 19 17" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M11 9 Q9 6 11 3 Q13 6 11 9Z" fill={GREEN} opacity="0.5" />
          </svg>
        )}
      </div>
    </DoodleWrap>
  )
}

// ═══════════════════════════
// Doodle 04: Tape（纸胶带）
// ═══════════════════════════
export function InteractiveTape({ peeled = false }: { peeled?: boolean }) {
  const [torn, setTorn] = useState(false)

  const handleClick = () => {
    if (peeled) {
      setTorn(prev => !prev)
    }
  }

  return (
    <div
      onClick={handleClick}
      style={{
        position:'absolute',top:-12,left:-12,width:60,height:16,
        backgroundColor:'#F6DFC2',borderRadius:2,transform:'rotate(-8deg)',
        opacity:torn?0:0.75, cursor:'pointer',
        transition:'opacity 300ms ease',
        zIndex:torn?0:1,
      }}
    />
  )
}

// Global keyframes
export const doodleStyles = `
@keyframes doodleSparkOut {
  0% { transform: scale(0.6); opacity: 1; }
  100% { transform: scale(1.4); opacity: 0; }
}
@keyframes leafFall {
  0% { transform: translate(0,0) rotate(0deg); opacity: 1; }
  100% { transform: translate(8px,40px) rotate(120deg); opacity: 0; }
}
@keyframes reelIn {
  0% { stroke-dashoffset: 80; }
  100% { stroke-dashoffset: 0; }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
`