'use client'

import { useState } from 'react'

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']
const MONTHS = [
  '一月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '十一月', '十二月',
]

interface CalendarProps {
  recordedDates: string[]
}

export default function Calendar({ recordedDates }: CalendarProps) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(viewYear - 1); setViewMonth(11) }
    else { setViewMonth(viewMonth - 1) }
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(viewYear + 1); setViewMonth(0) }
    else { setViewMonth(viewMonth + 1) }
  }

  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

  const recordedSet = new Set(
    recordedDates.map((d) => {
      const date = new Date(d)
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    }),
  )

  const isToday = (day: number) =>
    viewYear === today.getFullYear() && viewMonth === today.getMonth() && day === today.getDate()
  const hasRecord = (day: number) => recordedSet.has(`${viewYear}-${viewMonth}-${day}`)

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div>
      {/* 月份标题 — 年份和月份分两行 */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '24px' }}>
        <button onClick={prevMonth} style={arrowStyle}>‹</button>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 400, color: '#8C8C8C', lineHeight: 1.4, letterSpacing: '0.02em' }}>
            {viewYear}
          </div>
          <div style={{ fontSize: '28px', fontWeight: 500, color: '#1E1E1E', lineHeight: 1.3 }}>
            {MONTHS[viewMonth]}
          </div>
        </div>
        <button onClick={nextMonth} style={arrowStyle}>›</button>
      </div>

      {/* 星期 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '8px' }}>
        {WEEKDAYS.map((d) => (
          <div key={d} style={{ textAlign: 'center', fontSize: '12px', color: '#B0B0B0', paddingBottom: '6px' }}>{d}</div>
        ))}
      </div>

      {/* 日期 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: '6px' }}>
        {cells.map((day, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px' }}>
            {day !== null ? (
              isToday(day) ? (
                <div
                  style={{
                    width: '40px', height: '40px', borderRadius: '999px',
                    backgroundColor: '#222', color: '#FFFFFF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '15px', fontWeight: 500,
                    transition: 'opacity 180ms ease', cursor: 'default',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
                >
                  {day}
                </div>
              ) : (
                <div
                  style={{
                    width: '40px', height: '40px', borderRadius: '999px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    cursor: 'default', transition: 'background 180ms ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#F8F6F3' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                >
                  <span style={{ fontSize: '15px', color: '#1E1E1E' }}>{day}</span>
                  {hasRecord(day) && (
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#1E1E1E', opacity: 0.2 }} />
                  )}
                </div>
              )
            ) : <div />}
          </div>
        ))}
      </div>
    </div>
  )
}

const arrowStyle: React.CSSProperties = {
  background: 'none', border: 'none', cursor: 'pointer',
  fontSize: '16px', color: '#B0B0B0', padding: '0',
  transition: 'color 180ms ease', lineHeight: 1,
}