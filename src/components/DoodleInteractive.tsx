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
  style?: React.CSSProperties
}

function DoodleWrap({ children, onClick, style }: DoodleWrapProps) {
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
            ? `translateY(-2px) rotate(-1deg) scale(1.03)`
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
// Memory Seed — 5 stage cycle
// ═══════════════════════════
export function InteractiveSeed({ size = 28 }: { size?: number }) {
  const [stage, setStage] = useState(0)
  const stages = ['seed', 'sprout', 'two-leaves', 'plant', 'young-tree']
  const handleClick = () => setStage(prev => (prev + 1) % 5)

  return (
    <DoodleWrap onClick={handleClick}>
      <div style={{ width: size, height: size + 6, position: 'relative', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.04))' }}>
        <svg width={size} height={size + 6} viewBox="0 0 28 34" fill="none" style={{ transition:'all 700ms ease-in-out' }}>
          {stage === 0 && <ellipse cx="14" cy="28" rx="3.5" ry="4.5" fill={GREEN} opacity="0.55" />}
          {(stage >= 1) && (<><path d="M14 30 Q14 20 14 12" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" /><path d="M14 18 Q9 15 11 12" stroke={GREEN} strokeWidth="1.2" strokeLinecap="round" fill="none" /></>)}
          {(stage >= 2) && (<><path d="M14 16 Q7 12 9 8" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" /><path d="M14 13 Q21 9 19 5" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" /></>)}
          {(stage >= 3) && (<><path d="M14 30 Q14 12 14 8" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" /><path d="M14 10 Q6 6 8 3" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" /><path d="M14 8 Q22 4 20 1" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" /><path d="M14 6 Q11 3 14 1 Q17 3 14 6Z" fill={GREEN} opacity="0.45" /></>)}
          {(stage >= 4) && (<><path d="M14 32 Q14 10 14 4" stroke={GREEN} strokeWidth="2" strokeLinecap="round" /><path d="M14 12 Q4 6 6 2" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" /><path d="M14 8 Q24 2 22 -1" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" /><path d="M14 4 Q8 0 14 -3 Q20 0 14 4Z" fill={GREEN} opacity="0.5" /><path d="M14 6 Q17 2 14 0 Q11 2 14 6Z" fill={GREEN} opacity="0.35" /></>)}
        </svg>
      </div>
    </DoodleWrap>
  )
}

// ═══════════════════════════
// Leaf — sway on hover, fall on click
// ═══════════════════════════
export function InteractiveLeaf({ size = 20 }: { size?: number }) {
  const [falling, setFalling] = useState(false)
  const handleClick = () => { setFalling(true); setTimeout(() => setFalling(false), 1500) }

  return (
    <div
      onMouseEnter={(e) => { if(!falling) e.currentTarget.style.transform = 'rotate(8deg)' }}
      onMouseLeave={(e) => { if(!falling) e.currentTarget.style.transform = 'rotate(0deg)' }}
      onClick={handleClick}
      style={{ cursor:'pointer', transition:'transform 180ms ease', display:'inline-flex' }}
    >
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
  )
}

// ═══════════════════════════
// Spark — brighter on hover, burst on click
// ═══════════════════════════
export function InteractiveSpark({ size = 22, onTrigger }: { size?: number; onTrigger?: () => void }) {
  const [burst, setBurst] = useState(false)
  const [hovering, setHovering] = useState(false)
  const handleClick = () => { setBurst(true); setTimeout(() => setBurst(false), 800); onTrigger?.() }
  const burstSize = size * 1.8

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseDown={() => {}}
      onClick={handleClick}
      style={{ cursor:'pointer', display:'inline-flex', transition:'transform 180ms ease' }}
    >
      <div style={{ position:'relative', width:size, height:size, flexShrink:0 }}>
        <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
          <path d="M11 3 L12.2 8.8 L18 10 L12.2 11.2 L11 17 L9.8 11.2 L4 10 L9.8 8.8Z"
            stroke={hovering ? GOLD : '#BF9A6A'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            fill={hovering ? `${GOLD}15` : 'none'}
          />
        </svg>
        {burst && (
          <div style={{ position:'absolute',top:-size*0.3,left:-size*0.3,width:burstSize,height:burstSize,pointerEvents:'none' }}>
            <svg width={burstSize} height={burstSize} viewBox="0 0 34 34" fill="none" style={{ animation:'doodleSparkOut 800ms ease-out forwards' }}>
              <circle cx="10" cy="10" r="2" fill={GOLD} /><circle cx="24" cy="10" r="2" fill={GREEN} />
              <circle cx="10" cy="24" r="2" fill="#FFF" /><circle cx="24" cy="24" r="2" fill={GOLD} />
              <circle cx="17" cy="5" r="1.5" fill={GREEN} /><circle cx="17" cy="29" r="1.5" fill={GOLD} />
              <circle cx="5" cy="17" r="1.5" fill="#FFF" /><circle cx="29" cy="17" r="1.5" fill={GREEN} />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════
// Thread — hover floats, click draws with knot
// ═══════════════════════════
export function InteractiveThread({ size = 24 }: { size?: number }) {
  const [drawn, setDrawn] = useState(false)
  const [floating, setFloating] = useState(false)

  return (
    <div
      onMouseEnter={() => setFloating(true)}
      onMouseLeave={() => setFloating(false)}
      onClick={() => setDrawn(true)}
      style={{
        cursor:'pointer', display:'inline-flex',
        transform: floating ? 'translateY(-1px)' : 'none',
        transition:'transform 200ms ease',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M3 20 Q8 8 12 12 Q16 16 21 6"
          stroke={GOLD} strokeWidth="1.8" strokeLinecap="round"
          fill="none" opacity={0.6}
          style={drawn ? { animation:'threadDraw 700ms ease-out forwards' } : {}}
        />
        {drawn && (
          <circle cx="12" cy="12" r="3" fill={GOLD} opacity="0.4" />
        )}
      </svg>
    </div>
  )
}

// ═══════════════════════════
// Tape — hover lifts corner, click presses back
// ═══════════════════════════
export function InteractiveTape() {
  const [torn, setTorn] = useState(false)
  const [lift, setLift] = useState(false)

  return (
    <div
      onMouseEnter={() => { if(!torn) setLift(true) }}
      onMouseLeave={() => setLift(false)}
      onClick={() => setTorn(prev => !prev)}
      style={{
        position:'absolute',top:-12,left:-12,width:60,height:16,
        backgroundColor:'#F6DFC2',borderRadius:2,
        transform: torn ? 'rotate(-8deg) translateY(-4px)' : lift ? 'rotate(-8deg) translateY(-2px)' : 'rotate(-8deg)',
        opacity:torn ? 0.3 : lift ? 0.85 : 0.75,
        cursor:'pointer',transition:'opacity 300ms ease, transform 180ms ease',
        zIndex:torn ? 0 : 1,
      }}
    />
  )
}

// ═══════════════════════════
// Pencil Circle — click on Calendar today
// ═══════════════════════════
export function InteractivePencilCircle({ size = 48 }: { size?: number }) {
  const [visible, setVisible] = useState(false)
  const handleClick = () => {
    setVisible(true)
    setTimeout(() => setVisible(false), 1200)
  }

  return (
    <div onClick={handleClick} style={{ cursor:'pointer', position:'relative', display:'inline-flex' }}>
      <span style={{ fontSize:'16px',fontWeight:500,color:'#FFF' }}>{(new Date()).getDate()}</span>
      {visible && (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',pointerEvents:'none',animation:'circleFade 1200ms ease-out forwards' }}>
          <path d="M24 4 Q34 5 38 14 Q42 23 36 32 Q30 41 20 42 Q10 43 7 33 Q4 23 12 15 Q16 10 24 4Z" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6" />
        </svg>
      )}
    </div>
  )
}

// Shared keyframes
export const doodleStyles = `
@keyframes doodleSparkOut {
  0% { transform: scale(0.5); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}
@keyframes leafFall {
  0% { transform: translate(0,0) rotate(0deg); opacity: 1; }
  100% { transform: translate(12px,40px) rotate(150deg); opacity: 0; }
}
@keyframes threadDraw {
  from { stroke-dasharray: 60; stroke-dashoffset: 60; }
  to { stroke-dasharray: 60; stroke-dashoffset: 0; }
}
@keyframes circleFade {
  0% { transform: translate(-50%,-50%) scale(0.8); opacity: 0.8; }
  100% { transform: translate(-50%,-50%) scale(1.1); opacity: 0; }
}
`