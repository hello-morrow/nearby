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
    if (viewMonth === 0) {
      setViewYear(viewYear - 1)
      setViewMonth(11)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewYear(viewYear + 1)
      setViewMonth(0)
    } else {
      setViewMonth(viewMonth + 1)
    }
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
    viewYear === today.getFullYear() &&
    viewMonth === today.getMonth() &&
    day === today.getDate()

  const hasRecord = (day: number) =>
    recordedSet.has(`${viewYear}-${viewMonth}-${day}`)

  const calendarDays: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d)
  }

  return (
    <div>
      {/* 月份切换 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
        }}
      >
        <button
          onClick={prevMonth}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            color: '#8C8C8C',
            padding: '4px 8px',
            borderRadius: '6px',
          }}
        >
          ‹
        </button>
        <span
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: '#1E1E1E',
          }}
        >
          {MONTHS[viewMonth]}{' '}
          <span style={{ fontWeight: 400, color: '#8C8C8C' }}>
            {viewYear}
          </span>
        </span>
        <button
          onClick={nextMonth}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            color: '#8C8C8C',
            padding: '4px 8px',
            borderRadius: '6px',
          }}
        >
          ›
        </button>
      </div>

      {/* 星期标题 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          marginBottom: '8px',
        }}
      >
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            style={{
              textAlign: 'center',
              fontSize: '11px',
              color: '#8C8C8C',
              paddingBottom: '8px',
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* 日期网格 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          rowGap: '4px',
        }}
      >
        {calendarDays.map((day, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '32px',
              position: 'relative',
            }}
          >
            {day !== null && (
              <>
                {isToday(day) ? (
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#1E1E1E',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 500,
                    }}
                  >
                    {day}
                  </div>
                ) : (
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#1E1E1E',
                    }}
                  >
                    {day}
                  </span>
                )}
                {hasRecord(day) && !isToday(day) && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#D1D1D1',
                    }}
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}