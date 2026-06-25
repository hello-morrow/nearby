'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MoodSelector from '@/components/MoodSelector'
import ImageUploader from '@/components/ImageUploader'
import LocationPicker from '@/components/LocationPicker'
import Sidebar from '@/components/Sidebar'
import type { DiaryEntry } from '@/types'

export default function CreatePage() {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [mood, setMood] = useState('😊')
  const [image, setImage] = useState<string | null>(null)
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    if (!content.trim()) return

    setSaving(true)

    const entry: DiaryEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content: content.trim(),
      mood,
      image,
      latitude,
      longitude,
    }

    const existing = JSON.parse(localStorage.getItem('nearby_entries') || '[]')
    existing.unshift(entry)
    localStorage.setItem('nearby_entries', JSON.stringify(existing))

    router.push('/today')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F7F6F3',
        display: 'flex',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '960px',
          display: 'flex',
          gap: '32px',
          alignItems: 'flex-start',
        }}
      >
        {/* 左侧：编辑区 70% */}
        <div
          style={{
            flex: '0 0 calc(70% - 16px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          }}
        >
          {/* 标题区域 */}
          <div style={{ marginTop: '80px' }}>
            <h2
              style={{
                fontSize: '36px',
                fontWeight: 500,
                lineHeight: 1.2,
                letterSpacing: '-0.03em',
                color: '#1E1E1E',
                marginBottom: '12px',
              }}
            >
              今天发生了什么？
            </h2>
            <p style={{ fontSize: '16px', color: '#8C8C8C', lineHeight: 1.6 }}>
              把今天留给未来的自己。
            </p>
          </div>

          {/* Textarea */}
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="今天想记录什么……"
              rows={6}
              style={{
                width: '100%',
                padding: '20px',
                borderRadius: '16px',
                border: '1px solid #E5E5E5',
                backgroundColor: '#FFFFFF',
                fontSize: '16px',
                lineHeight: 1.6,
                color: '#1E1E1E',
                resize: 'vertical',
                fontFamily: 'inherit',
                outline: 'none',
              }}
            />
          </div>

          {/* 心情 */}
          <MoodSelector selected={mood} onChange={setMood} />

          {/* 图片 */}
          <ImageUploader image={image} onChange={setImage} />

          {/* 地点 */}
          <LocationPicker
            latitude={latitude}
            longitude={longitude}
            onChange={(lat, lng) => {
              setLatitude(lat)
              setLongitude(lng)
            }}
          />

          {/* 保存按钮 */}
          <button
            type="button"
            onClick={handleSave}
            disabled={!content.trim() || saving}
            className="btn-primary"
            style={{
              width: '100%',
              height: '56px',
              backgroundColor: content.trim() ? '#1E1E1E' : '#CCCCCC',
              color: '#FFFFFF',
              borderRadius: '18px',
              fontSize: '16px',
              fontWeight: 500,
              border: 'none',
              cursor: content.trim() ? 'pointer' : 'not-allowed',
              lineHeight: '56px',
              marginBottom: '40px',
            }}
          >
            {saving ? '保存中……' : '保存今天'}
          </button>
        </div>

        {/* 右侧：Sidebar 30% */}
        <div style={{ flex: '0 0 calc(30% - 16px)' }}>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}