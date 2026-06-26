'use client'

import { useState, useMemo } from 'react'
import { AnnotationSpark, AnnotationLeaf, AnnotationThread, AnnotationSeed, AnnotationCircle, AnnotationTape } from './Annotation'

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
// 1. Memory Seed — annotation file
// ═══════════════════════════
export function InteractiveSeed({ size = 28 }: { size?: number }) {
  const [stage, setStage] = useState(0)
  const seedWidth = size
  const seedHeight = size + 6
  const handleClick = () => setStage(prev => (prev + 1) % 5)

  // Use the seed SVG annotation for stage 0
  return (
    <div onClick={handleClick} style={{ cursor:'pointer', display:'inline-flex', flexDirection:'column', alignItems:'center' }}>
      {stage === 0 ? (
        <AnnotationSeed size={seedWidth} />
      ) : (
        <svg width={seedWidth} height={seedHeight} viewBox="0 0 28 34" fill="none" style={{ transition:'all 700ms ease-in-out' }}>
          {(stage >= 1) && (<><path d="M14 30 Q14 20 14 12" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" /><path d="M14 18 Q9 15 11 12" stroke={GREEN} strokeWidth="1.2" strokeLinecap="round" fill="none" /></>)}
          {(stage >= 2) && (<><path d="M14 16 Q7 12 9 8" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" /><path d="M14 13 Q21 9 19 5" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" /></>)}
          {(stage >= 3) && (<><path d="M14 30 Q14 12 14 8" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" /><path d="M14 10 Q6 6 8 3" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" /><path d="M14 8 Q22 4 20 1" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" /><path d="M14 6 Q11 3 14 1 Q17 3 14 6Z" fill={GREEN} opacity="0.45" /></>)}
          {(stage >= 4) && (<><path d="M14 32 Q14 10 14 4" stroke={GREEN} strokeWidth="2" strokeLinecap="round" /><path d="M14 12 Q4 6 6 2" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" /><path d="M14 8 Q24 2 22 -1" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" fill="none" /><path d="M14 4 Q8 0 14 -3 Q20 0 14 4Z" fill={GREEN} opacity="0.5" /><path d="M14 6 Q17 2 14 0 Q11 2 14 6Z" fill={GREEN} opacity="0.35" /></>)}
        </svg>
      )}
    </div>
  )
}

// ═══════════════════════════
// 2. Leaf — annotation file
// ═══════════════════════════
export function InteractiveLeaf({ size = 20 }: { size?: number }) {
  const [falling, setFalling] = useState(false)
  const [key, setKey] = useState(0)
  const handleClick = () => { setFalling(true); setTimeout(() => { setFalling(false); setKey(prev => prev + 1) }, 1500) }

  return (
    <div
      onMouseEnter={(e) => { if(!falling) e.currentTarget.style.transform = 'rotate(8deg)' }}
      onMouseLeave={(e) => { if(!falling) e.currentTarget.style.transform = 'rotate(0deg)' }}
      onClick={handleClick}
      style={{ cursor:'pointer', transition:'transform 180ms ease', display:'inline-flex' }}
    >
      {!falling ? (
        <AnnotationLeaf key={key} size={size} />
      ) : (
        <img
          src={`/assets/annotation/leaf-${String(Math.floor(Math.random() * 15) + 1).padStart(2, '0')}.svg`}
          alt="falling leaf"
          width={size}
          height={size}
          style={{ animation:'leafFall 1500ms ease-in forwards' }}
        />
      )}
    </div>
  )
}

// ═══════════════════════════
// 3. Spark — annotation file
// ═══════════════════════════
export function InteractiveSpark({ size = 22 }: { size?: number }) {
  const [burst, setBurst] = useState(false)
  const [key, setKey] = useState(0)
  const p = usePersonality()
  const count = sparkCount(p)
  const opacity = sparkOpacity(p)

  const handleClick = () => {
    setBurst(true)
    setKey(prev => prev + 1)
    setTimeout(() => setBurst(false), 800)
  }
  const burstSize = size * 1.8

  const particles = useMemo(() => {
    const items: React.ReactNode[] = []
    const colors = [GOLD, GREEN, '#FFF']
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
    <div onClick={handleClick} style={{ cursor:'pointer', display:'inline-flex', position:'relative' }}>
      <AnnotationSpark key={key} size={size} />
      {burst && (
        <div style={{ position:'absolute',top:-size*0.3,left:-size*0.3,width:burstSize,height:burstSize,pointerEvents:'none' }}>
          <svg width={burstSize} height={burstSize} viewBox="0 0 34 34" fill="none" style={{ animation:'doodleSparkOut 800ms ease-out forwards' }}>
            {particles}
          </svg>
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════
// 4. Thread — annotation file
// ═══════════════════════════
export function InteractiveThread({ size = 24 }: { size?: number }) {
  const [floating, setFloating] = useState(false)
  const [drawn, setDrawn] = useState(false)

  return (
    <div
      onMouseEnter={() => setFloating(true)}
      onMouseLeave={() => setFloating(false)}
      onClick={() => setDrawn(prev => !prev)}
      style={{ cursor:'pointer', display:'inline-flex', transform:floating?'translateY(-1px)':'none', transition:'transform 200ms ease' }}
    >
      <AnnotationThread size={size} />
      {drawn && (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ position:'absolute' }}>
          <circle cx="14" cy="12" r="3" fill={GOLD} opacity="0.4" />
        </svg>
      )}
    </div>
  )
}

// ═══════════════════════════
// 5. Tape — annotation file with interaction
// ═══════════════════════════
export function InteractiveTape() {
  const [torn, setTorn] = useState(false)

  return (
    <div
      onClick={() => setTorn(prev => !prev)}
      style={{
        position:'absolute',top:-12,left:-12,width:60,height:18,
        cursor:'pointer', opacity:torn ? 0.3 : 1, transition:'opacity 300ms ease',
        zIndex:torn ? 0 : 1,
      }}
    >
      <AnnotationTape size={60} />
    </div>
  )
}

// ═══════════════════════════
// 6. Pencil Circle — annotation file
// ═══════════════════════════
export function InteractivePencilCircle({ size = 48 }: { size?: number }) {
  const [visible, setVisible] = useState(false)
  const [key, setKey] = useState(0)
  const handleClick = () => { setVisible(true); setKey(prev => prev + 1); setTimeout(() => setVisible(false), 1200) }

  return (
    <div onClick={handleClick} style={{ cursor:'pointer', position:'relative', display:'inline-flex' }}>
      <span style={{ fontSize:'16px',fontWeight:500,color:'#FFF' }}>{(new Date()).getDate()}</span>
      {visible && (
        <AnnotationCircle key={key} size={size} />
      )}
      {visible && (
        <div style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',pointerEvents:'none',animation:'circleFade 1200ms ease-out forwards',width:size,height:size }}>
          <AnnotationCircle size={size} />
        </div>
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
@keyframes circleFade {
  0% { transform: translate(-50%,-50%) scale(0.8); opacity: 0.8; }
  100% { transform: translate(-50%,-50%) scale(1.1); opacity: 0; }
}
`