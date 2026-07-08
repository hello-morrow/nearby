'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import type { DiaryEntry } from '@/types'

export default function TimelinePage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [lineGrown, setLineGrown] = useState(false)
  const [titleClicks, setTitleClicks] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem('nearby_entries') || '[]') as DiaryEntry[]
    setEntries(raw)
    requestAnimationFrame(() => {
      setTimeout(() => setLineGrown(true), 300)
    })
  }, [])

  const fmtDate = (iso: string) => {
    const d = new Date(iso)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${months[d.getMonth()]} ${d.getDate()}`
  }

  const fmtFull = (iso: string) => {
    const d = new Date(iso)
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
  }

  const preview = (text: string) => {
    if (!text) return ''
    return text.slice(0, 40) + (text.length > 40 ? '…' : '')
  }

  const formatTitle = (entry: DiaryEntry) => {
    if (!entry.content) return '今天的记忆'
    const firstLine = entry.content.split('\n')[0].trim()
    return firstLine.slice(0, 20) + (firstLine.length > 20 ? '…' : '')
  }

  const handleTitleClick = () => {
    const next = titleClicks + 1
    setTitleClicks(next)
    if (next >= 3) {
      setShowEasterEgg(true)
      setTimeout(() => setShowEasterEgg(false), 1200)
      setTitleClicks(0)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F6F3', display: 'flex', justifyContent: 'center', padding: '40px 24px' }}>
      <style>{`
        @keyframes growLine {
          from { height: 0; }
          to { height: 100%; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes expandContent {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 800px; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .node-appear { animation: fadeSlideUp 400ms ease-out both; }
        .card-appear { animation: fadeSlideUp 500ms ease-out both; }
        .expand-in { animation: fadeIn 300ms ease-out; }
        .easter-egg {
          animation: fadeSlideUp 400ms ease-out, float 2s ease-in-out 400ms infinite;
        }
        .sticker-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: '680px', display: 'flex', flexDirection: 'column' }} ref={containerRef}>

        {/* ═══ Header ═══ */}
        <div style={{ marginBottom: '48px', marginTop: '20px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1
              onClick={handleTitleClick}
              style={{ fontSize: '40px', fontWeight: 500, lineHeight: 1.15, color: '#1A1A1A', margin: '0', cursor: 'pointer', userSelect: 'none' }}
            >
              Memory Thread
            </h1>
            {/* Seed icon */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginTop: '4px' }}>
              <ellipse cx="9" cy="12" rx="3" ry="4" fill="#9AA889" opacity="0.5" />
              <path d="M9 8 Q7 6 9 4 Q11 6 9 8Z" fill="#9AA889" opacity="0.4" />
            </svg>
          </div>
          <p style={{ fontSize: '16px', color: '#8C8C86', lineHeight: 1.6, margin: '4px 0 0' }}>
            一条正在生长的记忆线
          </p>

          {/* ☁ Sticker — little memory cloud */}
          <div className="sticker-float" style={{ position: 'absolute', right: '-10px', top: '-8px', opacity: 0.35 }}>
            <svg width="36" height="24" viewBox="0 0 36 24" fill="none">
              <path d="M10 18 Q6 14 8 10 Q10 6 16 6 Q18 2 24 4 Q30 4 30 10 Q34 12 30 18Z" stroke="#BDBDBD" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <text x="18" y="15" textAnchor="middle" fontSize="6" fill="#BDBDBD">little memory</text>
            </svg>
          </div>
        </div>

        {/* ═══ Timeline ═══ */}
        <div style={{ position: 'relative', paddingLeft: '36px' }}>
          {/* Vertical thread line — grows in */}
          {entries.length > 0 && (
            <div style={{
              position: 'absolute', left: '12px', top: '8px',
              width: '2px', backgroundColor: '#D9D2C6',
              height: lineGrown ? '100%' : '0',
              transition: 'height 1200ms ease-out',
            }} />
          )}

          {/* Sticker — ✦ saved moment floating between nodes */}
          {entries.length > 2 && (
            <div className="sticker-float" style={{
              position: 'absolute', left: '-6px', top: '35%', zIndex: 0, opacity: 0.25, pointerEvents: 'none',
            }}>
              <svg width="48" height="28" viewBox="0 0 48 28" fill="none">
                <path d="M6 14 L8 17 L11 18 L8 19 L6 22 L4 19 L1 18 L4 17Z" fill="#D8B37A" />
                <text x="18" y="16" fontSize="9" fill="#BDBDBD" fontFamily="inherit">saved moment</text>
              </svg>
            </div>
          )}

          {entries.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '80px' }}>
              <p style={{ fontSize: '16px', color: '#8C8C86', lineHeight: 1.6 }}>还没有留下记忆。</p>
              <Link href="/create" style={{
                display: 'inline-block', marginTop: '20px',
                padding: '12px 28px', borderRadius: '18px', backgroundColor: '#1A1A1A',
                color: '#FFF', fontSize: '15px', fontWeight: 500, textDecoration: 'none',
              }}>
                去记录今天
              </Link>
            </div>
          )}

          {entries.map((entry, idx) => {
            const isOpen = expanded === entry.id
            return (
              <div
                key={entry.id}
                className="node-appear"
                style={{ position: 'relative', marginBottom: '36px', animationDelay: `${idx * 80}ms` }}
              >
                {/* ── Thread Node ── */}
                {idx === 0 ? (
                  // Latest: sprout SVG
                  <div style={{ position: 'absolute', left: '-36px', top: '0px', zIndex: 1 }}>
                    <svg width="22" height="24" viewBox="0 0 22 24" fill="none">
                      <path d="M11 22 Q11 14 11 8" stroke="#9AA889" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M11 12 Q7 10 8 6" stroke="#9AA889" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                      <path d="M11 10 Q15 8 14 4" stroke="#9AA889" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                      <ellipse cx="11" cy="6" rx="2.5" ry="3" fill="#9AA889" opacity="0.35" />
                    </svg>
                  </div>
                ) : (
                  // Historical: small dot
                  <div style={{
                    position: 'absolute', left: '-29px', top: '6px', zIndex: 1,
                    width: '8px', height: '8px', borderRadius: '50%',
                    backgroundColor: '#D9D2C6', border: '1.5px solid #D9D2C6',
                  }} />
                )}

                {/* ── Date ── */}
                <div style={{ marginBottom: '6px', paddingLeft: '2px' }}>
                  <span style={{
                    fontSize: '13px', color: idx === 0 ? '#1A1A1A' : '#8C8C86',
                    fontWeight: idx === 0 ? 500 : 400, letterSpacing: '0.02em',
                  }}>
                    {fmtDate(entry.date)}
                    {idx === 0 && (
                      <span style={{ fontSize: '11px', color: '#9AA889', marginLeft: '8px', fontWeight: 500 }}>
                        · saved moment
                      </span>
                    )}
                  </span>
                </div>

                {/* ── Sticker: ✦ on latest card corner ── */}
                {idx === 0 && (
                  <div style={{ position: 'absolute', right: '-8px', top: '8px', zIndex: 2, opacity: 0.3, pointerEvents: 'none' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2 L8.8 5.8 L12.6 7 L8.8 8.2 L8 12 L7.2 8.2 L3.4 7 L7.2 5.8Z" fill="#D8B37A" />
                    </svg>
                  </div>
                )}

                {/* ── Card ── */}
                <div
                  className="card-appear"
                  onClick={() => setExpanded(isOpen ? null : entry.id)}
                  style={{
                    backgroundColor: '#FFFDFB',
                    borderRadius: '20px',
                    padding: isOpen ? '20px 24px 24px' : '20px 24px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                    cursor: 'pointer',
                    transition: 'transform 220ms ease, box-shadow 220ms ease, padding 300ms ease',
                    transformOrigin: 'center',
                    animationDelay: `${idx * 100 + 200}ms`,
                    borderLeft: idx === 0 ? '3px solid #D8B37A' : 'none',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px) rotate(0.5deg)'
                    e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.08)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0) rotate(0deg)'
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
                  }}
                >
                  {/* ── Title row ── */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px', flexShrink: 0 }}>{entry.mood}</span>
                    <span style={{ fontSize: '15px', fontWeight: 500, color: '#1A1A1A' }}>
                      {formatTitle(entry)}
                    </span>
                    {/* Tiny leaf on odd cards */}
                    {idx % 2 === 1 && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, marginLeft: 'auto', opacity: 0.25 }}>
                        <path d="M2 10 Q5 6 8 5 Q10 8 6 10Z" stroke="#9AA889" strokeWidth="1" strokeLinecap="round" fill="none" />
                      </svg>
                    )}
                  </div>

                  {/* ── Preview (collapsed) ── */}
                  {!isOpen && entry.content && (
                    <p style={{ fontSize: '14px', color: '#8C8C86', lineHeight: 1.6, margin: '8px 0 0 0' }}>
                      {preview(entry.content)}
                    </p>
                  )}

                  {/* ── Expanded Content ── */}
                  {isOpen && (
                    <div className="expand-in" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #F0EDE8' }}>
                      {/* Full date */}
                      <p style={{ fontSize: '12px', color: '#B0B0B0', marginBottom: '12px', letterSpacing: '0.02em' }}>
                        {fmtFull(entry.date)}
                      </p>

                      {/* Content */}
                      {entry.content && (
                        <p style={{ fontSize: '15px', color: '#1A1A1A', lineHeight: 1.8, whiteSpace: 'pre-wrap', marginBottom: '12px' }}>
                          {entry.content}
                        </p>
                      )}

                      {/* Image */}
                      {entry.image && (
                        <img
                          src={entry.image}
                          alt=""
                          style={{ width: '100%', borderRadius: '12px', marginBottom: '12px', animation: 'fadeIn 400ms ease-out' }}
                        />
                      )}

                      {/* Location */}
                      {entry.latitude && entry.longitude && (
                        <p style={{ fontSize: '12px', color: '#B0B0B0', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                          📍 {entry.latitude.toFixed(4)}, {entry.longitude.toFixed(4)}
                        </p>
                      )}

                      {/* Small spark on expanded view */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', opacity: 0.2 }}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M5 1 L5.5 4 L8.5 5 L5.5 6 L5 9 L4.5 6 L1.5 5 L4.5 4Z" fill="#D8B37A" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* ═══ Memory Growth Footer ═══ */}
        {entries.length > 0 && (
          <div style={{
            marginTop: '16px', marginBottom: '40px',
            padding: '24px', backgroundColor: '#FFFDFB',
            borderRadius: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            textAlign: 'center', position: 'relative',
          }}>
            {/* Plant growth visual — dot + stem + leaves */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', marginBottom: '8px',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 22 Q12 14 12 8" stroke="#9AA889" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12 12 Q8 10 9 6" stroke="#9AA889" strokeWidth="1.3" strokeLinecap="round" fill="none" />
                <path d="M12 10 Q16 8 15 4" stroke="#9AA889" strokeWidth="1.3" strokeLinecap="round" fill="none" />
                <circle cx="12" cy="4" r="2.5" fill="#9AA889" opacity="0.4" />
              </svg>
              {/* Small dots growing */}
              <div style={{ display: 'flex', gap: '4px', marginTop: '2px' }}>
                {Array.from({ length: Math.min(entries.length, 5) }).map((_, i) => (
                  <div key={i} style={{
                    width: '4px', height: '4px', borderRadius: '50%',
                    backgroundColor: i === 0 ? '#1A1A1A' : '#D9D2C6',
                    opacity: 0.6,
                  }} />
                ))}
              </div>
            </div>

            <span style={{ fontSize: '14px', fontWeight: 500, color: '#1A1A1A', display: 'block', marginBottom: '4px' }}>
              Memory Growth
            </span>
            <p style={{ fontSize: '13px', color: '#8C8C86', margin: 0 }}>
              {entries.length} {entries.length === 1 ? 'memory' : 'memories'} · 正在生长
            </p>
          </div>
        )}

        {/* ═══ Back ═══ */}
        <div style={{ marginBottom: '40px' }}>
          <Link href="/" style={{
            display: 'inline-block', fontSize: '14px', color: '#8C8C86', textDecoration: 'none',
          }}>
            ← 回到首页
          </Link>
        </div>
      </div>

      {/* ═══ Easter Egg Overlay ═══ */}
      {showEasterEgg && (
        <div className="easter-egg" style={{
          position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          backgroundColor: '#FFFDFB', borderRadius: '20px', padding: '24px 32px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)', zIndex: 1000,
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '28px', margin: '0 0 8px' }}>🌱</p>
          <p style={{ fontSize: '16px', color: '#1A1A1A', fontWeight: 500, margin: 0 }}>
            This thread is alive.
          </p>
        </div>
      )}
    </div>
  )
}