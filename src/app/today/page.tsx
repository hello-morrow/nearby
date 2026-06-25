'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import type { DiaryEntry, Place } from '@/types'
import { getPlaceByCoords } from '@/lib/places'
import { Circle } from '@/components/Doodle'

function TodayContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [entry, setEntry] = useState<DiaryEntry | null>(null)
  const [place, setPlace] = useState<Place | null>(null)
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [weaveReady, setWeaveReady] = useState(false)

  useEffect(() => {
    const entries: DiaryEntry[] = JSON.parse(
      localStorage.getItem('nearby_entries') || '[]',
    )

    let found: DiaryEntry | null = null
    if (id) {
      found = entries.find((e) => e.id === id) ?? null
    } else if (entries.length > 0) {
      found = entries[0]
    }

    setEntry(found)

    if (found && found.latitude !== null && found.longitude !== null) {
      setPlace(getPlaceByCoords(found.latitude, found.longitude))
    }

    setLoading(false)
    requestAnimationFrame(() => {
      setVisible(true)
      setTimeout(() => setWeaveReady(true), 500)
    })
  }, [id])

  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
  }

  const formatShort = (iso: string) => {
    const d = new Date(iso)
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
  }

  const getLocationLabel = (): string => {
    if (!entry || entry.latitude === null) return ''
    // 优先显示地点名称，暂无反向地理编码则显示「这里」
    return '📍 这里'
  }

  if (loading) {
    return <Centered><p style={{ color: '#8C8C8C' }}>加载中……</p></Centered>
  }

  if (!entry) {
    return (
      <Centered>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <p style={{ fontSize: '18px', color: '#1E1E1E' }}>今天，还没有留下新的故事。</p>
          <Link href="/create" style={btnStyle}>去记录今天</Link>
        </div>
      </Centered>
    )
  }

  const hasPlace = place && place.visitCount > 1

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F6F3', padding: '24px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '640px', marginTop: '80px' }}>

        {/* ══ Memory Thread ══ */}
        <div style={{ position: 'relative', paddingLeft: '32px' }}>
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute', left: '4px', top: '0', bottom: '0',
              width: '2px', backgroundColor: '#E8E5E0',
              opacity: visible ? 1 : 0,
              transition: 'opacity 600ms ease-out 400ms',
            }}
          />
          {/* Top circle */}
          <div
            style={{
              position: 'absolute', left: '0', top: '0',
              width: '10px', height: '10px', borderRadius: '50%',
              backgroundColor: '#1E1E1E',
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1)' : 'scale(0)',
              transition: 'opacity 400ms ease-out 600ms, transform 400ms ease-out 600ms',
            }}
          />

          {/* ══ Memory Card ══ */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 300ms ease-out, transform 300ms ease-out',
            }}
          >
            {/* Date with hand-drawn Circle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
              <Circle size={32} />
              <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#1E1E1E', margin: 0 }}>
                {formatDate(entry.date)}
              </h2>
            </div>

            {/* Mood */}
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', marginBottom: '32px',
            }}>
              {entry.mood}
            </div>

            {/* Content */}
            {entry.content && (
              <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#1E1E1E', whiteSpace: 'pre-wrap', marginBottom: '32px' }}>
                {entry.content}
              </p>
            )}

            {/* Image */}
            {entry.image && (
              <img src={entry.image} alt="" style={{ width: '100%', borderRadius: '16px', marginBottom: '32px' }} />
            )}

            {/* Location */}
            {entry.latitude !== null && entry.longitude !== null && (
              <div style={{ marginBottom: '32px' }}>
                <p style={{ fontSize: '15px', color: '#1E1E1E', fontWeight: 500, margin: '0 0 4px 0' }}>
                  {getLocationLabel()}
                </p>
                <p style={{ fontSize: '13px', color: '#8C8C8C', margin: 0 }}>
                  {entry.latitude.toFixed(4)}, {entry.longitude.toFixed(4)}
                </p>
              </div>
            )}

            {/* ══ Memory Weave Card ══ */}
            <div style={{ marginBottom: '32px' }}>
              <p style={{ fontSize: '13px', fontWeight: 500, color: '#1E1E1E', margin: '0 0 12px 0' }}>
                Memory Weave
              </p>

              {/* Horizontal line + dot */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  backgroundColor: '#A8D5A2', flexShrink: 0,
                  opacity: visible ? 1 : 0,
                  transition: 'opacity 300ms ease-out 800ms',
                }} />
                <div style={{
                  flex: 1, height: '2px', backgroundColor: '#E8E5E0',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', left: 0, top: 0, height: '100%',
                    background: 'linear-gradient(90deg, #A8D5A2, #388E3C)',
                    width: weaveReady ? '100%' : '0%',
                    transition: 'width 600ms ease-out',
                  }} />
                </div>
              </div>

              <p style={{ fontSize: '14px', color: '#1E1E1E', lineHeight: 1.6, margin: '0 0 4px 0' }}>
                今天，你为人生织下了新的一针。
              </p>
              <p style={{ fontSize: '13px', color: '#999', margin: 0 }}>
                Every memory becomes another thread.
              </p>
            </div>

            {/* ══ Place Memory ══ */}
            {hasPlace && (
              <div
                style={{
                  backgroundColor: '#FCFBF8',
                  borderRadius: '20px',
                  padding: '24px',
                  marginBottom: '32px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                  opacity: visible ? 1 : 0,
                  transition: 'opacity 300ms ease-out 300ms',
                }}
              >
                <p style={{ fontSize: '13px', color: '#8C8C8C', marginBottom: '8px' }}>This Place Remembers.</p>
                <p style={{ fontSize: '15px', color: '#1E1E1E', fontWeight: 500, marginBottom: '12px' }}>这里记得你。</p>
                <div style={{ fontSize: '14px', color: '#1E1E1E', lineHeight: 1.8 }}>
                  你已经来到这里：{place!.visitCount} 次<br />
                  第一次：{formatShort(place!.firstVisit)}<br />
                  最近一次：今天
                </div>
                <p style={{ fontSize: '13px', color: '#8C8C8C', marginTop: '12px', lineHeight: 1.6 }}>
                  有些地方，会慢慢记住我们的样子。
                </p>
              </div>
            )}
          </div>

          {/* Back button */}
          <div style={{ marginBottom: '24px' }}>
            <Link href="/" style={btnStyle}>返回首页</Link>
          </div>

          {/* Footer */}
          <p style={{ fontSize: '12px', color: '#BDBDBD', textAlign: 'center', marginBottom: '40px' }}>
            Every memory becomes another thread.
          </p>
        </div>
      </div>
    </div>
  )
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#F7F6F3', padding: '24px',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
    }}>
      {children}
    </div>
  )
}

const btnStyle: React.CSSProperties = {
  display: 'inline-block', height: '48px', paddingLeft: '24px', paddingRight: '24px',
  borderRadius: '18px', backgroundColor: '#1E1E1E', color: '#FFFFFF',
  fontSize: '16px', fontWeight: 500, textDecoration: 'none', lineHeight: '48px',
}

export default function TodayPage() {
  return (
    <Suspense fallback={<Centered><p style={{ color: '#8C8C8C' }}>加载中……</p></Centered>}>
      <TodayContent />
    </Suspense>
  )
}