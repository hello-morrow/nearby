'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import type { DiaryEntry, Place } from '@/types'
import { getEntriesForPlace, getPlaceByCoords } from '@/lib/places'

function PlaceContent() {
  const searchParams = useSearchParams()
  const lat = parseFloat(searchParams.get('lat') || '')
  const lng = parseFloat(searchParams.get('lng') || '')

  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [place, setPlace] = useState<Place | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!isNaN(lat) && !isNaN(lng)) {
      setEntries(getEntriesForPlace(lat, lng))
      setPlace(getPlaceByCoords(lat, lng))
      requestAnimationFrame(() => setVisible(true))
    }
  }, [lat, lng])

  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
  }

  if (isNaN(lat) || isNaN(lng)) {
    return (
      <div style={centered}>
        <p style={{ color: '#8C8C8C' }}>未找到地点信息</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F6F3', display: 'flex', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ width: '100%', maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {/* Header */}
        <div>
          <h2 style={{ fontSize: '36px', fontWeight: 700, lineHeight: 1.15, color: '#1E1E1E', marginBottom: '8px' }}>
            这里的故事
          </h2>
          {place && (
            <p style={{ fontSize: '15px', color: '#8C8C8C', lineHeight: 1.6 }}>
              来到这里 {place.visitCount} 次 · {place.topMood} 出现最多 · 📷 {place.photoCount} · ✍️ {place.recordCount}
            </p>
          )}
        </div>

        {/* Memory Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {entries.map((entry, idx) => (
            <div
              key={entry.id}
              style={{
                backgroundColor: '#FCFBF8',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 300ms ease-out ${idx * 80}ms, transform 300ms ease-out ${idx * 80}ms`,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#8C8C8C' }}>
                  {formatDate(entry.date)}
                </span>
                <span style={{ fontSize: '24px' }}>{entry.mood}</span>
              </div>

              {entry.content && (
                <p style={{ fontSize: '16px', color: '#1E1E1E', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                  {entry.content}
                </p>
              )}

              {entry.image && (
                <img
                  src={entry.image}
                  alt=""
                  style={{ width: '100%', borderRadius: '12px' }}
                />
              )}
            </div>
          ))}
        </div>

        {entries.length === 0 && (
          <p style={{ color: '#8C8C8C', textAlign: 'center', marginTop: '40px' }}>
            还没有在这里留下记忆
          </p>
        )}

        {/* Back */}
        <div style={{ marginBottom: '40px' }}>
          <Link
            href="/create"
            style={{
              display: 'inline-block',
              height: '48px',
              paddingLeft: '24px',
              paddingRight: '24px',
              borderRadius: '18px',
              backgroundColor: '#1E1E1E',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: 500,
              textDecoration: 'none',
              lineHeight: '48px',
            }}
          >
            返回记录
          </Link>
        </div>
      </div>
    </div>
  )
}

const centered: React.CSSProperties = {
  minHeight: '100vh',
  backgroundColor: '#F7F6F3',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export default function PlacePage() {
  return (
    <Suspense fallback={<div style={centered}><p style={{ color: '#8C8C8C' }}>加载中……</p></div>}>
      <PlaceContent />
    </Suspense>
  )
}