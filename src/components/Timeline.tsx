'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { DiaryEntry } from '@/types'

interface TimelineProps {
  draft?: { content: string; mood: string; image: string | null } | null
}

export default function Timeline({ draft }: TimelineProps) {
  const router = useRouter()
  const [entries, setEntries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem('nearby_entries') || '[]') as DiaryEntry[]
    setEntries(raw.slice(0, 5))
  }, [])

  const formatLabel = (iso: string) => {
    const d = new Date(iso)
    const today = new Date()
    const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1)
    const dayBefore = new Date(today); dayBefore.setDate(dayBefore.getDate() - 2)
    if (d.toDateString() === today.toDateString()) return '今天'
    if (d.toDateString() === yesterday.toDateString()) return '昨天'
    if (d.toDateString() === dayBefore.toDateString()) return '前天'
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
  }

  const truncate = (text: string) => text.length > 40 ? text.slice(0, 40) + '…' : text

  const hasDraft = draft && draft.content.trim()

  const items: { id: string; label: string; mood: string; text: string; hasPhoto: boolean; isToday: boolean; isDraft: boolean }[] = []

  // 今天 draft 始终第一
  if (hasDraft) {
    items.push({ id: 'draft', label: '今天', mood: draft!.mood, text: truncate(draft!.content), hasPhoto: !!draft!.image, isToday: true, isDraft: true })
  }

  entries.forEach((entry) => {
    const alreadyToday = items.some((i) => i.label === '今天')
    const label = formatLabel(entry.date)
    if (label === '今天' && alreadyToday) return
    items.push({ id: entry.id, label, mood: entry.mood, text: truncate(entry.content), hasPhoto: !!entry.image, isToday: label === '今天' && !alreadyToday, isDraft: false })
  })

  return (
    <div>
      <h3 style={{ fontSize: '14px', fontWeight: 500, color: '#1E1E1E', marginBottom: '20px' }}>我的时间轴</h3>

      <div style={{ position: 'relative' }}>
        {items.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => { if (!item.isDraft) router.push(`/today?id=${item.id}`) }}
            style={{
              position: 'relative', paddingLeft: '28px',
              paddingBottom: idx < items.length - 1 ? '24px' : '0',
              cursor: item.isDraft ? 'default' : 'pointer', minHeight: '64px',
            }}
          >
            {/* 竖线 */}
            {idx < items.length - 1 && (
              <div style={{ position: 'absolute', left: '4px', top: '14px', bottom: '0', width: '2px', backgroundColor: '#E5E5E5' }} />
            )}

            {/* 节点 */}
            <div style={{
              position: 'absolute', left: '0', top: '6px',
              width: '10px', height: '10px', borderRadius: '50%',
              backgroundColor: item.isToday ? '#1E1E1E' : '#D1D1D1',
              border: item.isDraft ? '2px solid #1E1E1E' : 'none',
              boxSizing: 'border-box',
            }} />

            {/* 内容 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '12px', color: item.isToday ? '#1E1E1E' : '#8C8C8C', fontWeight: item.isToday ? 500 : 400 }}>
                {item.label}{item.isDraft ? ' · 正在记录' : ''}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '16px' }}>{item.mood}</span>
                <span style={{ fontSize: '13px', color: '#1E1E1E', lineHeight: 1.5 }}>
                  {item.text}
                </span>
                {item.hasPhoto && <span style={{ fontSize: '12px' }}>📷</span>}
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div style={{ position: 'relative', paddingLeft: '28px' }}>
            <div style={{ position: 'absolute', left: '0', top: '6px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#1E1E1E' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '12px', color: '#1E1E1E', fontWeight: 500 }}>今天</span>
              <span style={{ fontSize: '13px', color: '#8C8C8C' }}>还没有记录</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}