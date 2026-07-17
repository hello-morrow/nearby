'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import MemoryNav from '@/components/MemoryNav'

const GOLD = '#D4A373'
const LEAF = '#A7C58A'
const SPARK = '#E4C461'
const TAPE = '#F5D7A1'

// ── Quote Pool ──
const QUOTES = [
  { en1: 'Every memory begins', en2: 'with a thread.', cn1: '每一次留下，', cn2: '都会成为未来的一根线。' },
  { en1: 'We remember', en2: 'by returning.', cn1: '有些今天，', cn2: '会慢慢长成森林。' },
  { en1: 'Memory grows', en2: 'quietly.', cn1: '记忆不会消失，', cn2: '它只是继续生长。' },
  { en1: 'Some days', en2: 'become forests.', cn1: '今天留下，', cn2: '未来回来。' },
  { en1: 'Nearby is not a diary.', en2: 'It is a memory weave.', cn1: '每一次记录，', cn2: '都会为人生织上一针。' },
]

function pickQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)]
}

function goldLastWord(text: string) {
  const words = text.split(' ')
  const last = words.pop() || ''
  const rest = words.join(' ')
  return { rest, last }
}

export default function Home() {
  const [phase, setPhase] = useState<'idle' | 'line' | 'seed' | 'spark' | 'done'>('idle')
  const [living, setLiving] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [weaving, setWeaving] = useState(false)
  const [quote, setQuote] = useState(QUOTES[0])
  const router = useRouter()

  // ── Pick a random quote after hydration ──
  useEffect(() => {
    setQuote(pickQuote())
  }, [])

  // ── Initial draw animation ──
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('line'), 400)
    const t2 = setTimeout(() => setPhase('seed'), 1200)
    const t3 = setTimeout(() => setPhase('spark'), 1500)
    const t4 = setTimeout(() => {
      setPhase('done')
      setTimeout(() => setLiving(true), 600)
    }, 1900)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  // ── CTA: Thread weave → navigate ──
  const handleClick = useCallback(() => {
    if (weaving) return
    setWeaving(true)
    setTimeout(() => router.push('/create'), 600)
  }, [weaving, router])

  const qen = goldLastWord(quote.en2)

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes drawLine {
          from { stroke-dashoffset: 140; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes leafSway {
          0%, 100% { transform: rotate(0deg); }
          30% { transform: rotate(2.5deg); }
          70% { transform: rotate(-2deg); }
        }
        @keyframes sparkPulse {
          0%, 100% { opacity: 1; }
          35% { opacity: 0.2; }
          65% { opacity: 0.2; }
        }
        @keyframes threadFlow {
          0% { stroke-dashoffset: 0; }
          40% { stroke-dashoffset: -80; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes threadHint {
          from { stroke-dashoffset: 24; opacity: 0; }
          to { stroke-dashoffset: 0; opacity: 0.6; }
        }
        @keyframes weaveGrow {
          from { stroke-dashoffset: 36; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes btnGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,163,115,0); }
          50% { box-shadow: 0 0 0 4px rgba(212,163,115,0.15); }
        }
        .brand-card { animation: fadeInUp 300ms ease-out both; }
        .brand-card-delay { animation: fadeInUp 300ms ease-out 200ms both; }
        .thread-line {
          stroke-dasharray: 140;
          stroke-dashoffset: 140;
        }
        .thread-line.draw {
          animation: drawLine 800ms ease-out forwards;
        }
        .thread-line.living {
          animation: threadFlow 7s ease-in-out infinite;
        }
        .leaf-group.living {
          animation: leafSway 4.5s ease-in-out infinite;
          transform-origin: 52px 22px;
        }
        .spark-group.living {
          animation: sparkPulse 3.8s ease-in-out infinite;
        }
        .fade-in { animation: fadeIn 400ms ease-out both; }
        .fade-in-delay { animation: fadeIn 400ms ease-out 300ms both; }
        .thread-hint {
          stroke-dasharray: 24;
          stroke-dashoffset: 24;
        }
        .thread-hint.show {
          animation: threadHint 350ms ease-out forwards;
        }
        .thread-weave {
          stroke-dasharray: 36;
          stroke-dashoffset: 36;
        }
        .thread-weave.grow {
          animation: weaveGrow 600ms ease-out forwards;
        }
        .btn-weave {
          animation: btnGlow 1.2s ease-in-out infinite;
        }
        .btn-hover:hover {
          background-color: #2E2E2E !important;
          transform: translateY(-2px) !important;
          transition: all 180ms ease !important;
        }
      `}</style>

      <main style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        backgroundColor: '#F7F6F3',
        padding: 'clamp(40px, 5vw, 80px) clamp(80px, 10vw, 120px) 0',
      }}>
        <div style={{
          width: '100%', maxWidth: '1000px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>

          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h1 style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em', color: '#444', margin: 0 }}>Nearby</h1>
            <p style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#B0B0B0', margin: '4px 0 0 0' }}>Memory Weave</p>
          </div>

          {/* Brand name + Planet */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <svg width="52" height="36" viewBox="0 0 52 36" fill="none" style={{ display: 'block', margin: '0 auto 10px' }}>
              <circle cx="26" cy="18" r="5.5" fill={GOLD} opacity="0.45" />
              <ellipse cx="26" cy="18" rx="11" ry="2.5" stroke={GOLD} strokeWidth="0.9" fill="none" opacity="0.35" transform="rotate(-12 26 18)" />
              <path d="M7 7 Q7 5.5 8 5.5 Q7 5.5 7 4 Q7 5.5 6 5.5 Q7 5.5 7 7Z" fill={SPARK} opacity="0.4" />
              <path d="M44 24 Q44 23 45 23 Q44 23 44 22 Q44 23 43 23 Q44 23 44 24Z" fill={SPARK} opacity="0.3" />
              <circle cx="14" cy="12" r="0.8" fill={GOLD} opacity="0.35" />
              <circle cx="38" cy="10" r="0.6" fill={GOLD} opacity="0.25" />
            </svg>
            <p style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.15em', color: '#B0B0B0', margin: 0 }}>
              生生
            </p>
          </div>

          {/* Title */}
          <h2 style={{ fontSize: 'clamp(48px, 7vw, 72px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#909090', textAlign: 'center', marginBottom: '12px' }}>
            今日有痕。
          </h2>

          {/* Subtitle */}
          <p style={{ fontSize: '24px', fontWeight: 500, lineHeight: 1.6, color: '#8A8A8A', textAlign: 'center', marginBottom: '16px' }}>
            把今天留在这里。
          </p>
          <p style={{ fontSize: '16px', color: '#B0B0B0', textAlign: 'center', marginBottom: '48px' }}>
            Stay close to today.
          </p>

          {/* ══ Living Memory Card ══ */}
          <div
            className="brand-card"
            style={{
              width: 'clamp(360px, 62vw, 740px)', maxWidth: '760px', backgroundColor: '#FFFDF9', borderRadius: '24px', padding: '40px 48px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.05)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: '56px', gap: '20px', position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Watercolor corners */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '80px', height: '60px', background: 'radial-gradient(ellipse at bottom left, rgba(228,196,97,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '80px', height: '60px', background: 'radial-gradient(ellipse at bottom right, rgba(167,197,138,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

            {/* Paper tape — static, never animates */}
            <div style={{
              position: 'absolute', top: '-6px', left: '16px',
              width: '70px', height: '18px', backgroundColor: TAPE,
              borderRadius: '2px', transform: 'rotate(-8deg)', opacity: 0.8,
            }} />

            {/* Left text 55% */}
            <div style={{ flex: '55%', zIndex: 1 }}>
              <p style={{ fontSize: '18px', fontWeight: 500, color: '#1E1E1E', lineHeight: 1.6, margin: '0 0 6px 0' }}>
                {quote.en1}
                <br />
                {qen.rest + ' '}
                <span style={{ color: GOLD }}>{qen.last}</span>
              </p>
              <p style={{ fontSize: '16px', color: '#707070', lineHeight: 1.6, margin: 0 }}>
                {quote.cn1}
                <br />
                {quote.cn2}
              </p>
            </div>

            {/* Right illustration — Living Memory Thread */}
            <div style={{ flex: '45%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', height: '80px' }}>
              <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
                {/* Pinhole */}
                <circle cx="6" cy="62" r="1.5" fill={GOLD} opacity="0.6" />

                {/* Thread line */}
                <path
                  d="M6 62 Q28 18 48 40 Q62 56 74 32"
                  stroke={GOLD}
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  className={`thread-line ${phase !== 'idle' ? 'draw' : ''} ${living ? 'living' : ''}`}
                />

                {/* Knot node */}
                {(phase === 'seed' || phase === 'spark' || phase === 'done') && (
                  <circle cx="48" cy="40" r="3" fill={GOLD} className="fade-in" />
                )}

                {/* Memory Seed */}
                {(phase === 'seed' || phase === 'spark' || phase === 'done') && (
                  <circle cx="74" cy="32" r="5" fill={GOLD} className="fade-in" />
                )}

                {/* Spark — blinks when living */}
                {(phase === 'spark' || phase === 'done') && (
                  <g className={`fade-in-delay ${living ? 'spark-group living' : ''}`}>
                    <path d="M20 18 L21 21 L24 22 L21 23 L20 26 L19 23 L16 22 L19 21Z" fill={SPARK} stroke="none" />
                  </g>
                )}

                {/* Leaf — sways when living */}
                {phase === 'done' && (
                  <g className={`fade-in ${living ? 'leaf-group living' : ''}`}>
                    <path d="M52 22 Q48 16 52 12 Q56 16 52 22Z" fill={LEAF} stroke="none" />
                    <line x1="52" y1="22" x2="52" y2="15" stroke={LEAF} strokeWidth="1" opacity="0.5" />
                  </g>
                )}

                {/* Hover hint — thread extends from seed */}
                <path
                  d="M74 32 Q80 28 86 30"
                  stroke={GOLD}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                  className={`thread-hint ${hovering && !weaving ? 'show' : ''}`}
                />

                {/* Click weave — thread grows further */}
                <path
                  d="M74 32 Q80 28 86 30 Q90 32 90 30"
                  stroke={GOLD}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0"
                  className={`thread-weave ${weaving ? 'grow' : ''}`}
                  style={{ opacity: weaving ? 1 : 0 }}
                />
              </svg>
            </div>
          </div>

          {/* ══ CTA: Thread Interaction ══ */}
          <div style={{ width: '440px', maxWidth: '100%' }}>
            <button
              onClick={handleClick}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className={`brand-card-delay btn-hover ${weaving ? 'btn-weave' : ''}`}
              style={{
                width: '100%', height: '60px', backgroundColor: '#1E1E1E', color: '#FFF',
                borderRadius: '12px', fontSize: '20px', fontWeight: 500, border: 'none',
                cursor: weaving ? 'default' : 'pointer', lineHeight: '60px', opacity: 0,
                transition: 'all 180ms ease', marginBottom: '28px',
              }}
              disabled={weaving}
            >
              {weaving ? '织入中……' : '留住今天'}
            </button>
          </div>

          {/* Brand tagline */}
          <p style={{ fontSize: '16px', color: '#909090', textAlign: 'center', lineHeight: 1.6, marginBottom: '64px' }}>
            每一次留下，
            <br />
            都会成为未来的一根线。
          </p>

          {/* Bottom Navigation — inline */}
          <MemoryNav variant="inline" />

          {/* Footer version */}
          <p style={{
            fontSize: '13px', color: '#B0B0B0', textAlign: 'center',
            lineHeight: 1.6, marginTop: '14px', paddingBottom: '32px',
          }}>
            Nearby · Memory Weave
            <br />
            v0.5.0 · Updated · 2026.06.26
          </p>

        </div>
      </main>
    </>
  )
}
