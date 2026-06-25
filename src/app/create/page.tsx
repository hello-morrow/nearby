'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import MemoryWeave from '@/components/MemoryWeave'
import type { DiaryEntry } from '@/types'

const MOODS = ['😊', '😌', '😭', '😤', '❤️', '🌧️']

export default function CreatePage() {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [mood, setMood] = useState('😊')
  const [image, setImage] = useState<string | null>(null)
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationError, setLocationError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const MAX_CHARS = 1000

  // Read entry count for Memory Weave
  const entries: DiaryEntry[] = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('nearby_entries') || '[]')
    : []
  const entryCount = entries.length

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleLocation = () => {
    if (!navigator.geolocation) { setLocationError('浏览器不支持定位'); return }
    setLocationLoading(true)
    setLocationError('')
    navigator.geolocation.getCurrentPosition(
      (pos) => { setLatitude(pos.coords.latitude); setLongitude(pos.coords.longitude); setLocationLoading(false) },
      () => { setLocationError('无法获取位置，请检查权限'); setLocationLoading(false) },
    )
  }

  const hasLocation = latitude !== null && longitude !== null

  const handleSave = () => {
    if (!content.trim()) return
    setSaving(true)
    const entry: DiaryEntry = {
      id: Date.now().toString(), date: new Date().toISOString(),
      content: content.trim(), mood, image, latitude, longitude,
    }
    const existing = JSON.parse(localStorage.getItem('nearby_entries') || '[]')
    existing.unshift(entry)
    localStorage.setItem('nearby_entries', JSON.stringify(existing))
    router.push('/today')
  }

  const draft = { content, mood, image }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F6F3', display: 'flex', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ width: '100%', maxWidth: '1100px', display: 'flex', gap: '48px', alignItems: 'flex-start' }}>

        {/* ── 左侧 68% ── */}
        <div style={{ flex: '1 1 68%', display: 'flex', flexDirection: 'column', gap: '0' }}>

          {/* 标题 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: 700, lineHeight: 1.15, color: '#1E1E1E', marginBottom: '12px' }}>
              今天发生了什么？
            </h2>
            <p style={{ fontSize: '18px', color: '#8D8D8D', lineHeight: 1.6 }}>把今天留给未来的自己。</p>
            <p
              style={{
                fontSize: '14px',
                color: '#8C8C8C',
                lineHeight: 1.6,
                marginTop: '6px',
              }}
            >
              你留下的每一段记忆，
              <br />
              都会被我们轻轻编织在一起。
            </p>
          </div>

          {/* Textarea */}
          <div style={{ position: 'relative', marginBottom: '48px' }}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={'今天，\n发生了什么？\n慢慢写，不用着急。'}
              maxLength={MAX_CHARS}
              style={{
                width: '100%', height: '360px', padding: '32px',
                borderRadius: '24px', border: '1px solid #E5E5E5',
                backgroundColor: '#FFFFFF', fontSize: '20px', lineHeight: 1.9,
                color: '#1E1E1E', resize: 'none', fontFamily: 'inherit', outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <span style={{ position: 'absolute', bottom: '16px', right: '24px', fontSize: '12px', color: '#AAA' }}>
              {content.length} / {MAX_CHARS}
            </span>
          </div>

          {/* Emoji */}
          <div style={{ marginBottom: '56px' }}>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              {MOODS.map((m) => (
                <button
                  key={m} type="button" onClick={() => setMood(m)}
                  style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    border: mood === m ? '2px solid #1E1E1E' : '2px solid transparent',
                    backgroundColor: mood === m ? '#FFFDF9' : 'transparent',
                    fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', transition: 'transform 180ms ease, border 180ms ease, background 180ms ease',
                    transform: mood === m ? 'scale(1.06)' : 'scale(1)',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.06)' }}
                  onMouseLeave={(e) => { if (mood !== m) (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Image */}
          <div style={{ marginBottom: '40px' }}>
            {image ? (
              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
                <img src={image} alt="" style={{ width: '100%', display: 'block', borderRadius: '16px' }} />
                <button type="button" onClick={() => { setImage(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                  style={{ position: 'absolute', top: '10px', right: '10px', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.5)', color: '#FFF', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              </div>
            ) : (
              <div onClick={() => fileInputRef.current?.click()}
                style={{
                  width: '100%', aspectRatio: '4/3', borderRadius: '16px', border: '2px dashed #D1D1D1',
                  backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                  cursor: 'pointer', gap: '8px', transition: 'border-color 200ms ease, background 200ms ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#1E1E1E'; e.currentTarget.style.background = '#FAFAFA' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#D1D1D1'; e.currentTarget.style.background = '#FFFFFF' }}
              >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="4" y="8" width="40" height="32" rx="4" />
                  <circle cx="17" cy="20" r="4" />
                  <path d="M4 34l12-12 8 8 6-6 14 10" />
                </svg>
                <span style={{ fontSize: '15px', color: '#1E1E1E' }}>留下一张照片</span>
                <span style={{ fontSize: '12px', color: '#B0B0B0' }}>支持 JPG / PNG &nbsp; 最大 10MB</span>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
          </div>

          {/* Location */}
          <div style={{ marginBottom: '48px' }}>
            <button type="button" onClick={handleLocation} disabled={locationLoading}
              style={{
                width: '100%', minHeight: '56px', borderRadius: '16px',
                border: hasLocation ? '1px solid #22C55E' : '1px solid #E5E5E5',
                backgroundColor: hasLocation ? '#F0FDF4' : '#FFFFFF',
                cursor: locationLoading ? 'not-allowed' : 'pointer', opacity: locationLoading ? 0.6 : 1,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '12px 20px', gap: '4px',
              }}
            >
              <span style={{ fontSize: '15px', color: hasLocation ? '#22C55E' : '#1E1E1E', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {locationLoading ? '📍 定位中……' : hasLocation ? '✓ 已记住此刻的位置' : '📍 记住此刻的位置'}
              </span>
              {!hasLocation && <span style={{ fontSize: '12px', color: '#B0B0B0' }}>自动记录此刻的位置</span>}
            </button>
            {locationError && <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '6px' }}>{locationError}</p>}
          </div>

          {/* Memory Weave Progress */}
          <div style={{ marginBottom: '48px' }}>
            <MemoryWeave entryCount={entryCount} />
          </div>

          {/* Save */}
          <button type="button" onClick={handleSave} disabled={!content.trim() || saving}
            style={{
              width: '100%', height: '60px', borderRadius: '18px', fontSize: '16px', fontWeight: 500, border: 'none',
              backgroundColor: content.trim() ? '#1E1E1E' : '#D9D9D9', color: '#FFFFFF',
              cursor: content.trim() ? 'pointer' : 'not-allowed', lineHeight: '60px',
              transition: 'opacity 200ms ease, transform 200ms ease',
            }}
            onMouseEnter={(e) => { if (content.trim()) e.currentTarget.style.opacity = '0.95' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            onMouseDown={(e) => { if (content.trim()) e.currentTarget.style.transform = 'scale(0.98)' }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
          >
            {saving ? '保存中……' : '留住今天'}
          </button>

          {/* 底部留白 */}
          <div style={{ height: '64px' }} />
        </div>

        {/* ── 右侧 Sidebar ── */}
        <div style={{ flex: '0 0 360px' }}>
          <Sidebar draft={draft} />
        </div>
      </div>
    </div>
  )
}