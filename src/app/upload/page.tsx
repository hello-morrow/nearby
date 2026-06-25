'use client'

import { useState, useRef } from 'react'

export default function Upload() {
  const [images, setImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages: string[] = []
    for (let i = 0; i < files.length && images.length + newImages.length < 9; i++) {
      newImages.push(URL.createObjectURL(files[i]))
    }
    setImages(prev => [...prev, ...newImages].slice(0, 9))
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F7F6F3',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '320px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* 标题 */}
        <h2
          style={{
            fontSize: '36px',
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: '-0.03em',
            color: '#1E1E1E',
            textAlign: 'center',
            marginTop: '80px',
            marginBottom: '16px',
          }}
        >
          今天，
          <br />
          留下些什么？
        </h2>

        {/* 副标题 */}
        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.6,
            color: '#8C8C8C',
            textAlign: 'center',
            marginBottom: '48px',
          }}
        >
          选择今天最想保存的几张照片。
        </p>

        {/* 上传区域 - 未选择图片时显示 */}
        {images.length === 0 && (
          <div
            onClick={handleClick}
            style={{
              width: '100%',
              aspectRatio: '4 / 3',
              borderRadius: '24px',
              border: '2px dashed #D1D1D1',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              gap: '12px',
            }}
          >
            <span style={{ fontSize: '48px', color: '#1E1E1E', lineHeight: 1 }}>＋</span>
            <span style={{ fontSize: '16px', color: '#1E1E1E' }}>点击选择照片</span>
            <span style={{ fontSize: '14px', color: '#8C8C8C' }}>最多选择 9 张</span>
          </div>
        )}

        {/* 九宫格预览 */}
        {images.length > 0 && (
          <div
            style={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
            }}
          >
            {images.map((src, i) => (
              <div
                key={i}
                style={{
                  aspectRatio: '1 / 1',
                  borderRadius: '16px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={src}
                  alt={`图片 ${i + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            ))}
            {/* 添加更多按钮 */}
            {images.length < 9 && (
              <div
                onClick={handleClick}
                style={{
                  aspectRatio: '1 / 1',
                  borderRadius: '16px',
                  border: '2px dashed #D1D1D1',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: '32px', color: '#1E1E1E' }}>＋</span>
              </div>
            )}
          </div>
        )}

        {/* 隐藏的 file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
}