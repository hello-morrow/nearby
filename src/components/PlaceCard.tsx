'use client'

import { useRouter } from 'next/navigation'
import type { Place } from '@/types'

interface PlaceCardProps {
  place: Place
}

export default function PlaceCard({ place }: PlaceCardProps) {
  const router = useRouter()

  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
  }

  const today = new Date().toDateString()
  const lastLabel =
    new Date(place.lastVisit).toDateString() === today ? '今天' : formatDate(place.lastVisit)

  return (
    <div
      onClick={() =>
        router.push(`/place?lat=${place.latitude}&lng=${place.longitude}`)
      }
      style={{
        backgroundColor: '#FCFBF8',
        borderRadius: '24px',
        padding: '24px',
        cursor: 'pointer',
        boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* Cover */}
      {place.coverImage && (
        <div
          style={{
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: '#F0F0F0',
          }}
        >
          <img
            src={place.coverImage}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}

      {/* Place name is derived from coordinates for now */}
      <div>
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#1E1E1E',
            margin: '0 0 8px 0',
          }}
        >
          这里的故事
        </h3>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
          }}
        >
          <Stat label="第一次" value={formatDate(place.firstVisit)} />
          <Stat label="最近" value={lastLabel} />
          <Stat label="来到这里" value={`${place.visitCount} 次`} />
          <Stat
            label={`${place.topMood} 出现`}
            value={`${place.topMoodCount} 次`}
          />
        </div>

        {/* Photo & record counts */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '12px',
            fontSize: '13px',
            color: '#8C8C8C',
          }}
        >
          <span>📷 {place.photoCount} 张照片</span>
          <span>✍️ {place.recordCount} 段文字</span>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: '11px', color: '#B0B0B0', marginBottom: '2px' }}>
        {label}
      </div>
      <div style={{ fontSize: '14px', color: '#1E1E1E', fontWeight: 500 }}>
        {value}
      </div>
    </div>
  )
}