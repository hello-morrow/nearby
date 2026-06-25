'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { DiaryEntry } from '@/types'

export default function Timeline() {
  const router = useRouter()
  const [entries, setEntries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem('nearby_entries') || '[]') as DiaryEntry[]
    setEntries(raw.slice(0, 5))
  }, [])

  const formatLabel = (iso: string) => {
    const d = new Date(iso)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const dayBefore = new Date(today)
    dayBefore.setDate(dayBefore.getDate() - 2)

    if (d.toDateString() === today.toDateString()) return '今天'
    if (d.toDateString() === yesterday.toDateString()) return '昨天'
    if (d.toDateString() === dayBefore.toDateString()) return '前天'

    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
  }

  const formatContent = (text: string) =>
    text.length > 30 ? text.slice(0, 30) + '…' : text

  return (
    <div>
      <h3
        style={{
          fontSize: '14px',
          fontWeight: 500,
          color: '#1E1E1E',
          marginBottom: '20px',
        }}
      >
        我的时间轴
      </h3>

      <div style={{ position: 'relative' }}>
        {entries.map((entry, idx) => (
          <div
            key={entry.id}
            onClick={() => router.push(`/today?id=${entry.id}`)}
            style={{
              position: 'relative',
              paddingLeft: '28px',
              paddingBottom: idx < entries.length - 1 ? '24px' : '0',
              cursor: 'pointer',
              minHeight: '64px',
            }}
          >
            {/* 竖线 */}
            {idx < entries.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  left: '4.5px',
                  top: '16px',
                  bottom: '0',
                  width: '1px',
                  backgroundColor: '#E5E5E5',
                }}
              />
            )}

            {/* 圆点 */}
            <div
              style={{
                position: 'absolute',
                left: '0',
                top: '6px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: idx === 0 ? '#1E1E1E' : '#D1D1D1',
              }}
            />

            {/* 内容 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span
                style={{
                  fontSize: '12px',
                  color: idx === 0 ? '#1E1E1E' : '#8C8C8C',
                  fontWeight: idx === 0 ? 500 : 400,
                }}
              >
                {formatLabel(entry.date)}
              </span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span style={{ fontSize: '16px' }}>{entry.mood}</span>
                <span
                  style={{
                    fontSize: '13px',
                    color: '#1E1E1E',
                    lineHeight: 1.5,
                  }}
                >
                  {formatContent(entry.content)}
                </span>
                {entry.image && (
                  <span style={{ fontSize: '12px' }}>📷</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* 如果没有任何记录，显示占位 */}
        {entries.length === 0 && (
          <div
            style={{
              position: 'relative',
              paddingLeft: '28px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '0',
                top: '6px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#1E1E1E',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '12px', color: '#1E1E1E', fontWeight: 500 }}>
                今天
              </span>
              <span style={{ fontSize: '13px', color: '#8C8C8C' }}>
                还没有记录
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}