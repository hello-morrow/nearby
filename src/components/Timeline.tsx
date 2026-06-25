'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { DiaryEntry } from '@/types'

const LINE_COLOR = '#E8E8E8'
const NODE_TODAY = '#222'
const NODE_PAST = '#D1D1D1'

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
    const y = new Date(today); y.setDate(y.getDate() - 1)
    const db = new Date(today); db.setDate(db.getDate() - 2)
    if (d.toDateString() === today.toDateString()) return '今天'
    if (d.toDateString() === y.toDateString()) return '昨天'
    if (d.toDateString() === db.toDateString()) return '前天'
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
  }

  const truncate = (text: string) => text.length > 40 ? text.slice(0, 40) + '…' : text

  const hasDraft = draft && draft.content.trim()

  const items: { id: string; label: string; mood: string; text: string; hasPhoto: boolean; isToday: boolean; isDraft: boolean }[] = []

  if (hasDraft) {
    items.push({ id: 'draft', label: '今天', mood: draft!.mood, text: truncate(draft!.content), hasPhoto: !!draft!.image, isToday: true, isDraft: true })
  }

  entries.forEach((entry) => {
    const label = formatLabel(entry.date)
    const alreadyToday = items.some((i) => i.label === '今天')
    if (label === '今天' && alreadyToday) return
    items.push({ id: entry.id, label, mood: entry.mood, text: truncate(entry.content), hasPhoto: !!entry.image, isToday: label === '今天' && !alreadyToday, isDraft: false })
  })

  return (
    <div>
      <h3 style={{ fontSize: '14px', fontWeight: 500, color: '#1E1E1E', marginBottom: '20px' }}>
        我的时间轴
      </h3>

      <div style={{ position: 'relative' }}>
        {items.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => { if (!item.isDraft) router.push(`/today?id=${item.id}`) }}
            style={{
              position: 'relative',
              paddingLeft: '28px',
              cursor: item.isDraft ? 'default' : 'pointer',
              minHeight: '80px',
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            {/* 竖线 */}
            {idx < items.length - 1 && (
              <div style={{
                position: 'absolute', left: '4px', top: '14px', bottom: '-80px',
                width: '2px', backgroundColor: LINE_COLOR,
              }} />
            )}

            {/* 节点 */}
            <div style={{
              position: 'absolute', left: '0', top: '6px',
              width: '10px', height: '10px', borderRadius: '50%',
              backgroundColor: item.isToday ? NODE_TODAY : 'transparent',
              border: item.isToday ? 'none' : `2px solid ${NODE_PAST}`,
              boxSizing: 'border-box',
            }} />

            {/* 内容 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{
                fontSize: '15px',
                color: item.isToday ? '#1E1E1E' : '#999',
                fontWeight: item.isToday ? 500 : 400,
              }}>
                {item.label}
                {item.isDraft && ' · 正在记录'}
              </span>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                <span style={{ fontSize: '16px', lineHeight: 1.4 }}>{item.mood}</span>
                <span style={{ fontSize: '16px', color: '#222', lineHeight: 1.5 }}>
                  {item.text}
                </span>
                {item.hasPhoto && (
                  <span style={{ fontSize: '12px', lineHeight: 1.4 }}>📷</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* 空状态 */}
        {items.length === 0 && (
          <div style={{ position: 'relative', paddingLeft: '28px', minHeight: '80px', display: 'flex', alignItems: 'flex-start' }}>
            <div style={{
              position: 'absolute', left: '0', top: '6px',
              width: '10px', height: '10px', borderRadius: '50%',
              backgroundColor: NODE_TODAY,
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '15px', color: '#1E1E1E', fontWeight: 500 }}>今天</span>
              <span style={{ fontSize: '16px', color: '#8C8C8C' }}>还没有写下今天。</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}