'use client'

import { useState, useRef } from 'react'

interface ImageUploaderProps {
  image: string | null
  onChange: (base64: string | null) => void
}

export default function ImageUploader({ image, onChange }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      onChange(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleRemove = () => {
    onChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div>
      <p
        style={{
          fontSize: '14px',
          color: '#8C8C8C',
          marginBottom: '12px',
        }}
      >
        今天的照片
      </p>

      {image ? (
        <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
          <img
            src={image}
            alt="今天的照片"
            style={{ width: '100%', display: 'block', borderRadius: '16px' }}
          />
          <button
            type="button"
            onClick={handleRemove}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          style={{
            width: '100%',
            aspectRatio: '4 / 3',
            borderRadius: '16px',
            border: '2px dashed #D1D1D1',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '32px', color: '#1E1E1E' }}>＋</span>
          <span style={{ fontSize: '14px', color: '#8C8C8C' }}>添加一张照片</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}