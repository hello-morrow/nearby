'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { DiaryEntry } from '@/types'

export default function TodayPage() {
  const [entry, setEntry] = useState<DiaryEntry | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const entries: DiaryEntry[] = JSON.parse(
      localStorage.getItem('nearby_entries') || '[]',
    )
    if (entries.length > 0) {
      setEntry(entries[0])
    }
    setLoading(false)
  }, [])

  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#F7F6F3',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p style={{ color: '#8C8C8C' }}>加载中……</p>
      </div>
    )
  }

  if (!entry) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#F7F6F3',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
        }}
      >
        <p style={{ fontSize: '18px', color: '#1E1E1E' }}>
          还没有保存过今天
        </p>
        <Link
          href="/create"
          style={{
            height: '48px',
            paddingLeft: '24px',
            paddingRight: '24px',
            borderRadius: '18px',
            backgroundColor: '#1E1E1E',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: 500,
            border: 'none',
            cursor: 'pointer',
            lineHeight: '48px',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          去记录今天
        </Link>
      </div>
    )
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
          maxWidth: '640px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        {/* 日期 */}
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 500,
            color: '#1E1E1E',
            marginTop: '80px',
          }}
        >
          {formatDate(entry.date)}
        </h2>

        {/* 心情 */}
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
          }}
        >
          {entry.mood}
        </div>

        {/* 内容 */}
        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.8,
            color: '#1E1E1E',
            whiteSpace: 'pre-wrap',
          }}
        >
          {entry.content}
        </p>

        {/* 图片 */}
        {entry.image && (
          <img
            src={entry.image}
            alt="今天的照片"
            style={{
              width: '100%',
              borderRadius: '16px',
            }}
          />
        )}

        {/* 位置 */}
        {entry.latitude !== null && entry.longitude !== null && (
          <p
            style={{
              fontSize: '14px',
              color: '#8C8C8C',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>📍</span>
            {entry.latitude.toFixed(4)}, {entry.longitude.toFixed(4)}
          </p>
        )}

        {/* 返回按钮 */}
        <div style={{ marginTop: '24px', marginBottom: '40px' }}>
          <Link
            href="/"
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
            返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}