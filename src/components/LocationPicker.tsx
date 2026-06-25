'use client'

import { useState } from 'react'

interface LocationPickerProps {
  latitude: number | null
  longitude: number | null
  onChange: (lat: number | null, lng: number | null) => void
}

export default function LocationPicker({ latitude, longitude, onChange }: LocationPickerProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('浏览器不支持定位功能')
      return
    }

    setLoading(true)
    setError('')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onChange(position.coords.latitude, position.coords.longitude)
        setLoading(false)
      },
      () => {
        setError('无法获取位置，请检查定位权限')
        setLoading(false)
      },
    )
  }

  const hasLocation = latitude !== null && longitude !== null

  return (
    <div>
      <p
        style={{
          fontSize: '14px',
          color: '#8C8C8C',
          marginBottom: '12px',
        }}
      >
        今天的地点
      </p>

      <button
        type="button"
        onClick={handleGetLocation}
        disabled={loading}
        style={{
          width: '100%',
          height: '48px',
          borderRadius: '12px',
          border: hasLocation ? '1px solid #1E1E1E' : '1px solid #E5E5E5',
          backgroundColor: hasLocation ? '#F7F6F3' : '#FFFFFF',
          color: '#1E1E1E',
          fontSize: '14px',
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          opacity: loading ? 0.6 : 1,
        }}
      >
        <span>📍</span>
        {loading
          ? '获取中……'
          : hasLocation
            ? '当前位置已获取'
            : '获取当前位置'}
      </button>

      {error && (
        <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '8px' }}>
          {error}
        </p>
      )}
    </div>
  )
}