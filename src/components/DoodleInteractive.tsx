'use client'

import { useState, useMemo } from 'react'

const GOLD = '#D4A373'
const GREEN = '#88A97A'

// ═══════════════════════════════════════
// Memory Personality
// ═══════════════════════════════════════
type Personality = 'Calm' | 'Joyful' | 'Lonely' | 'Hopeful' | 'Warm' | 'Quiet' | 'Nostalgic' | 'Curious' | 'Dreamy' | 'Energetic'

const PERSONALITIES: Personality[] = ['Calm', 'Joyful', 'Lonely', 'Hopeful', 'Warm', 'Quiet', 'Nostalgic', 'Curious', 'Dreamy', 'Energetic']

function usePersonality(): Personality {
  return useMemo(() => PERSONALITIES[Math.floor(Math.random() * PERSONALITIES.length)], [])
}

// Personality → visual modifiers
function sparkCount(p: Personality): number {
  if (p === 'Quiet' || p === 'Lonely') return 2
  if (p === 'Joyful' || p === 'Energetic') return 6
  if (p === 'Dreamy') return 4
  return 3
}

function sparkOpacity(p: Personality): number {
  if (p === 'Dreamy') return 0.5
  if (p === 'Warm') return 0.75
  return 1
}

// ── Hover / Press helper ──
function DoodleWrap({ children, onClick, style }: { children: React.ReactNode; onClick?: () => void; style?: React.CSSProperties }) {
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
        display:'inline-flex', cursor:onClick?'pointer':'default',
        transform: pressed ? 'scale(0.96)' : hover ? 'translateY(-2px) rotate(-1deg) scale(1.03)' : 'scale(1)',
        transition:'transform 180ms ease', ...style,
      }}
    >
      {children}
    </div>
  )
}

// ═══════════════════════════
// 1. Memory Seed — 5 shapes
// ═══════════════════════════
export function InteractiveSeed({ size = 28 }: { size?: number }) {
  const [stage, setStage] = useState(0)
  const shapeIdx = useMemo(() => Math.floor(Math.random() * 5), [])
  const handleClick = () => setStage(prev => (prev + 1) % 5)

  // 5 seed shapes: 0=ellipse, 1=slender, 2=round, 3=pointy, 4=flat
  const seeds = [
    <ellipse key="e" cx="14" cy="28" rx="3.5" ry="4.5" fill={GREEN} opacity="0.55" />,
    <ellipse key="s" cx="14" cy="28" rx="2.5" ry="5.5" fill={GREEN} opacity="0.5" />,
    <circle key="r" cx="14" cy="28" r="4.5" fill={GREEN} opacity="0.5" />,
    <path key="p" d="M11 26 Q14 22 14 26 Q14 22 17 26 Q14 32 11 26Z" fill={GREEN} opacity="0.5" />,
    <ellipse key="f" cx="14" cy="28" rx="4.5" ry="3" fill={GREEN} opacity="0.5" />,
  ]

  return (
    <DoodleWrap onClick={handleClick}>
      <div style={{ width:size, height:size+6, position:'relative' }}>
        <svg width={size} height={size+6} viewBox="0 0 28 34" fill="none" style={{ transition:'all 700ms ease-in-out' }}>
          {stage === 0 && seeds[shapeIdx]}
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
// 2. Leaf — 6 shapes, random
// ═══════════════════════════
const LEAF_SHAPES = [
  // long leaf
  <><path d="M3 17 Q7 11 11 9 Q15 11 19 17" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.45" /><path d="M11 9 Q9 6 11 3 Q13 6 11 9Z" fill={GREEN} opacity="0.35" /></>,
  // round leaf
  <><path d="M3 15 Q7 8 13 8 Q17 10 19 15" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.45" /><path d="M11 12 Q9 7 11 4 Q13 7 11 12Z" fill={GREEN} opacity="0.35" /></>,
  // heart leaf
  <><path d="M3 15 Q6 8 10 10 Q12 6 16 8 Q18 10 19 15" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.45" /><path d="M11 10 Q9 6 11 3 Q13 6 11 10Z" fill={GREEN} opacity="0.35" /></>,
  // ginkgo leaf
  <><path d="M3 17 Q8 8 11 8 Q14 8 19 17" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.45" /><path d="M10 10 L11 5 M12 10 L11 5 M10 12 Q11 15 12 12" stroke={GREEN} strokeWidth="0.8" opacity="0.3" /></>,
  // thin leaf
  <><path d="M2 16 Q6 10 10 6 Q14 10 20 16" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.45" /><path d="M11 6 Q10 3 11 1 Q12 3 11 6Z" fill={GREEN} opacity="0.35" /></>,
  // wide leaf
  <><path d="M2 16 Q6 8 11 8 Q16 8 20 16" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.45" /><path d="M11 8 Q9 4 11 1 Q13 4 11 8Z" fill={GREEN} opacity="0.35" /></>,
]

export function InteractiveLeaf({ size = 20 }: { size?: number }) {
  const [falling, setFalling] = useState(false)
  const shapeIdx = useMemo(() => Math.floor(Math.random() * LEAF_SHAPES.length), [])
  const handleClick = () => { setFalling(true); setTimeout(() => setFalling(false), 1500) }

  return (
    <div
      onMouseEnter={(e) => { if(!falling) e.currentTarget.style.transform = 'rotate(8deg)' }}
      onMouseLeave={(e) => { if(!falling) e.currentTarget.style.transform = 'rotate(0deg)' }}
      onClick={handleClick}
      style={{ cursor:'pointer', transition:'transform 180ms ease', display:'inline-flex' }}
    >
      {!falling ? (
        <svg width={size} height={size} viewBox="0 0 22 20" fill="none">
          {LEAF_SHAPES[shapeIdx]}
        </svg>
      ) : (
        <svg width={size} height={size} viewBox="0 0 22 20" fill="none" style={{ animation:'leafFall 1500ms ease-in forwards' }}>
          {LEAF_SHAPES[shapeIdx]}
        </svg>
      )}
    </div>
  )
}

// ═══════════════════════════
// 3. Spark — personality-aware
// ═══════════════════════════
export function InteractiveSpark({ size = 22 }: { size?: number }) {
  const [burst, setBurst] = useState(false)
  const [hovering, setHovering] = useState(false)
  const p = usePersonality()
  const count = sparkCount(p)
  const opacity = sparkOpacity(p)

  const handleClick = () => { setBurst(true); setTimeout(() => setBurst(false), 800) }
  const burstSize = size * 1.8

  // Generate particles based on personality
  const particles = useMemo(() => {
    const items: React.ReactNode[] = []
    const colors = [GOLD, GREEN, '#FFF', GOLD, GREEN, '#FFF']
    for (let i = 0; i < count; i++) {
      const angle = (360 / count) * i
      const dist = 6 + (i % 3) * 3
      const x = 17 + dist * Math.cos(angle * Math.PI / 180)
      const y = 17 + dist * Math.sin(angle * Math.PI / 180)
      items.push(<circle key={i} cx={x} cy={y} r={1.2 + (i % 2) * 0.5} fill={colors[i % colors.length]} opacity={opacity} />)
    }
    return items
  }, [count, opacity])

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={handleClick}
      style={{ cursor:'pointer', display:'inline-flex' }}
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
              {particles}
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════
// 4. Thread — 3 styles
// ═══════════════════════════
const THREADS = [
  // straight
  { path: 'M3 20 Q10 6 14 12 Q18 18 21 8', knotCx: 14 },
  // loose
  { path: 'M3 20 Q8 14 14 12 Q18 6 21 14', knotCx: 14 },
  // many knots
  { path: 'M3 20 Q10 12 14 10 Q18 8 21 6', knotCx: 14 },
]

export function InteractiveThread({ size = 24 }: { size?: number }) {
  const [drawn, setDrawn] = useState(false)
  const [floating, setFloating] = useState(false)
  const styleIdx = useMemo(() => Math.floor(Math.random() * THREADS.length), [])

  return (
    <div
      onMouseEnter={() => setFloating(true)}
      onMouseLeave={() => setFloating(false)}
      onClick={() => setDrawn(true)}
      style={{ cursor:'pointer', display:'inline-flex', transform:floating?'translateY(-1px)':'none', transition:'transform 200ms ease' }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d={THREADS[styleIdx].path} stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity={0.6}
          style={drawn ? { animation:'threadDraw 700ms ease-out forwards' } : {}}
        />
        {drawn && <circle cx={THREADS[styleIdx].knotCx} cy="12" r="3" fill={GOLD} opacity="0.4" />}
        {/* Extra knot for style 2 */}
        {drawn && styleIdx === 2 && <circle cx="18" cy="10" r="2" fill={GOLD} opacity="0.3" />}
      </svg>
    </div>
  )
}

// ═══════════════════════════
// 5. Tape
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
// 6. Pencil Circle
// ═══════════════════════════
export function InteractivePencilCircle({ size = 48 }: { size?: number }) {
  const [visible, setVisible] = useState(false)
  const handleClick = () => { setVisible(true); setTimeout(() => setVisible(false), 1200) }

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