'use client'

import { useState, useMemo } from 'react'
import type { DiaryEntry } from '@/types'

const W = ['日', '一', '二', '三', '四', '五', '六']
const M = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

interface CalendarProps {
  recordedDates: string[]
  entries?: DiaryEntry[]
}

export default function Calendar({ recordedDates, entries = [] }: CalendarProps) {
  const today = new Date()
  const [y, setY] = useState(today.getFullYear())
  const [m, setM] = useState(today.getMonth())
  const [expandedDay, setExpandedDay] = useState<number | null>(null)

  const prev = () => { if (m === 0) { setY(y - 1); setM(11) } else setM(m - 1); setExpandedDay(null) }
  const next = () => { if (m === 11) { setY(y + 1); setM(0) } else setM(m + 1); setExpandedDay(null) }

  const fd = new Date(y, m, 1).getDay()
  const dim = new Date(y, m + 1, 0).getDate()

  // Build a map: "year-month-day" → entry count
  const dayCount: Record<string, number> = {}
  const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
  const isTodayRecorded = useMemo(() => {
    return entries.some(e => {
      const d = new Date(e.date)
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}` === todayKey
    })
  }, [entries, todayKey])

  // Build consecutive-day info for thread connections
  const hasRecordOn = (d: number) => {
    const key = `${y}-${m}-${d}`
    return entries.some(e => {
      const dt = new Date(e.date)
      return `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}` === key
    })
  }

  // Entries for expanded day
  const expandedEntries = expandedDay !== null
    ? entries.filter(e => {
        const dt = new Date(e.date)
        return dt.getFullYear() === y && dt.getMonth() === m && dt.getDate() === expandedDay
      })
    : []

  const cells: (number | null)[] = []
  for (let i = 0; i < fd; i++) cells.push(null)
  for (let d = 1; d <= dim; d++) cells.push(d)

  // Count entries per day
  entries.forEach(e => {
    const dt = new Date(e.date)
    if (dt.getFullYear() === y && dt.getMonth() === m) {
      const k = `${y}-${m}-${dt.getDate()}`
      dayCount[k] = (dayCount[k] || 0) + 1
    }
  })

  const fmt = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  const fmtShort = (d: Date) => {
    const m = d.getMonth() + 1
    const day = d.getDate()
    return `${m}月${day}日`
  }

  const hasR = (day: number) => dayCount[`${y}-${m}-${day}`] !== undefined
  const entryCount = (day: number) => dayCount[`${y}-${m}-${day}`] || 0
  const isT = (day: number) => y === today.getFullYear() && m === today.getMonth() && day === today.getDate()

  return (
    <div style={{ backgroundColor: '#FFFDFB', borderRadius: '24px', padding: '24px 24px 20px', boxShadow: '0 8px 24px rgba(0,0,0,0.04)', position: 'relative' }}>
      {/* Leaf — top right */}
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 17 Q7 11 11 9 Q15 11 19 17" stroke="#88A97A" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.45" />
          <path d="M11 9 Q9 6 11 3 Q13 6 11 9Z" fill="#88A97A" opacity="0.35" />
        </svg>
      </div>

      {/* Month header */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '24px' }}>
        <button onClick={prev} style={arr}>‹</button>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 400, color: '#8C8C8C', lineHeight: 1.4 }}>{y}</div>
          <div style={{ fontSize: '28px', fontWeight: 500, color: '#1E1E1E', lineHeight: 1.3 }}>{M[m]}</div>
        </div>
        <button onClick={next} style={arr}>›</button>
      </div>

      {/* Weekday labels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', marginBottom: '12px' }}>
        {W.map(d => <div key={d} style={{ textAlign: 'center', fontSize: '12px', color: '#B0B0B0' }}>{d}</div>)}
      </div>

      {/* Day grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', rowGap: '6px' }}>
        {cells.map((day, i) => {
          if (day === null) return <div key={i} />

          const active = isT(day)
          const hasMem = hasR(day)
          const count = entryCount(day)
          const prevHas = i > 0 && cells[i - 1] !== null && hasRecordOn(cells[i - 1] as number)
          const nextHas = i < cells.length - 1 && cells[i + 1] !== null && hasRecordOn(cells[i + 1] as number)

          return (
            <div key={i} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px' }}>
              {/* ── Thread connector (between consecutive days with records) ── */}
              {hasMem && (
                <>
                  {prevHas && (
                    <div style={{
                      position: 'absolute', left: 0, top: '50%',
                      width: '50%', height: '1px',
                      backgroundColor: '#D9D2C6', opacity: 0.7,
                      transform: 'translateX(-50%)',
                    }} />
                  )}
                  {nextHas && (
                    <div style={{
                      position: 'absolute', right: 0, top: '50%',
                      width: '50%', height: '1px',
                      backgroundColor: '#D9D2C6', opacity: 0.7,
                      transform: 'translateX(50%)',
                    }} />
                  )}
                </>
              )}

              {/* Day cell */}
              <div
                onClick={() => setExpandedDay(expandedDay === day ? null : day)}
                style={{
                  width: '40px', height: '40px', borderRadius: '999px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  cursor: hasMem ? 'pointer' : 'default',
                  backgroundColor: expandedDay === day ? '#F5F2ED' : 'transparent',
                  transition: 'background 150ms ease',
                }}
              >
                <span style={{
                  fontSize: '16px', fontWeight: active ? 600 : 400,
                  color: active ? '#1E1E1E' : (hasMem ? '#5A5A5A' : '#1E1E1E'),
                }}>
                  {day}
                </span>

                {/* ── Today + recorded: Spark ── */}
                {active && hasMem ? (
                  <div style={{ marginTop: '1px', lineHeight: 1 }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <line x1="5" y1="1.5" x2="5" y2="4" stroke="#D4A373" strokeWidth="1" strokeLinecap="round" />
                      <line x1="5" y1="6" x2="5" y2="8.5" stroke="#D4A373" strokeWidth="1" strokeLinecap="round" />
                      <line x1="1.5" y1="5" x2="4" y2="5" stroke="#D4A373" strokeWidth="1" strokeLinecap="round" />
                      <line x1="6" y1="5" x2="8.5" y2="5" stroke="#D4A373" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                  </div>
                ) : hasMem ? (
                  /* ── Recorded days: dots ── */
                  <div style={{
                    display: 'flex', gap: '2px', marginTop: '1px',
                    justifyContent: 'center',
                  }}>
                    {Array.from({ length: Math.min(count, 3) }).map((_, di) => (
                      <div key={di} style={{
                        width: '4px', height: '4px', borderRadius: '50%',
                        backgroundColor: '#8DB580', opacity: 0.85,
                      }} />
                    ))}
                  </div>
                ) : (
                  <div style={{ height: '4px' }} />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Expanded day panel ── */}
      {expandedDay !== null && expandedEntries.length > 0 && (
        <div style={{
          marginTop: '16px', paddingTop: '16px',
          borderTop: '1px solid #EDE8E0',
          animation: 'calExpandIn 200ms ease-out',
        }}>
          <p style={{ fontSize: '12px', color: '#8C8C8C', margin: '0 0 12px 0' }}>
            {y}年{m + 1}月{expandedDay}日
          </p>
          {expandedEntries.map((entry) => (
            <div key={entry.id} style={{
              padding: '10px 12px', borderRadius: '10px',
              backgroundColor: '#FCFBF8', marginBottom: '8px',
              display: 'flex', gap: '8px', alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: '16px', flexShrink: 0 }}>{entry.mood}</span>
              <div>
                <p style={{ fontSize: '13px', color: '#1E1E1E', lineHeight: 1.5, margin: 0 }}>
                  {entry.content.length > 60 ? entry.content.slice(0, 60) + '…' : entry.content}
                </p>
                {entry.image && (
                  <p style={{ fontSize: '11px', color: '#B0B0B0', margin: '4px 0 0 0' }}>📷 图片</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes calExpandIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

const arr: React.CSSProperties = {
  background: 'none', border: 'none', cursor: 'pointer',
  fontSize: '16px', color: '#B0B0B0', padding: 0, lineHeight: 1,
}
