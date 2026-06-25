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

  const totalRows = Math.ceil(cells.length / 7)
  while (cells.length < totalRows * 7) cells.push(null)

  return (
    <div>
      {/* 月份标题 */}
      <h3 style={{ fontSize: '24px', fontWeight: 500, color: '#1E1E1E', marginBottom: '32px' }}>
        {viewYear}年{MONTHS[viewMonth]}
      </h3>

      {/* 切换箭头 */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button onClick={prevMonth} style={arrowStyle}>‹</button>
        <button onClick={nextMonth} style={arrowStyle}>›</button>
      </div>

      {/* 星期 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '12px' }}>
        {WEEKDAYS.map((d) => (
          <div key={d} style={{ textAlign: 'center', fontSize: '12px', color: '#B0B0B0', paddingBottom: '8px' }}>{d}</div>
        ))}
      </div>

      {/* 日期网格 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: '8px' }}>
        {cells.map((day, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px' }}>
            {day !== null ? (
              isToday(day) ? (
                <div style={{
                  width: '40px', height: '40px', borderRadius: '999px',
                  backgroundColor: '#1E1E1E', color: '#FFFFFF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: 500,
                }}>{day}</div>
              ) : (
                <div style={{
                  width: '40px', height: '40px', borderRadius: '999px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  cursor: 'default', transition: 'background 200ms ease',
                  position: 'relative',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#F7F5F2' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                >
                  <span style={{ fontSize: '14px', color: '#1E1E1E' }}>{day}</span>
                  {hasRecord(day) && (
                    <div style={{
                      width: '4px', height: '4px', borderRadius: '50%',
                      backgroundColor: '#1E1E1E', opacity: 0.2,
                    }} />
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
  fontSize: '18px', color: '#8C8C8C', padding: '4px 8px',
  borderRadius: '6px', transition: 'color 200ms ease',
}