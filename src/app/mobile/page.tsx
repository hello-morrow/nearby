'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const items = [
  { key: 'logo', delay: 0 },
  { key: 'title', delay: 200 },
  { key: 'subtitle', delay: 400 },
  { key: 'button', delay: 600 },
  { key: 'footer', delay: 800 },
]

export default function MobileLanding() {
  const [visible, setVisible] = useState<Record<string,boolean>>({})

  useEffect(() => {
    items.forEach(({ key, delay }) => {
      setTimeout(() => setVisible(prev => ({ ...prev, [key]: true })), delay)
    })
  }, [])

  return (
    <div style={{
      width:'100%', maxWidth:'390px', minHeight:'100vh',
      padding:'32px 30px', margin:'0 auto',
      boxSizing:'border-box',
      backgroundColor:'#F7F5F1',
      display:'flex', flexDirection:'column',
    }}>
      {/* ── Logo ── */}
      <div style={{
        opacity: visible.logo ? 1 : 0,
        transform: visible.logo ? 'translateY(0)' : 'translateY(18px)',
        transition: 'opacity 700ms ease-out, transform 700ms ease-out',
      }}>
        <h1 style={{
          fontSize:'15px', fontWeight:500, letterSpacing:'0.08em',
          color:'#2A2926', margin:0,
        }}>
          Nearby
        </h1>
        <p style={{
          fontSize:'13px', fontWeight:400, letterSpacing:'0.14em',
          color:'#B4B0A8', marginTop:'8px',
        }}>
          Memory Weave
        </p>
      </div>

      {/* ── 主标题 — 距离 Logo 约 110px ── */}
      <div style={{
        marginTop:'110px',
        opacity: visible.title ? 1 : 0,
        transform: visible.title ? 'translateY(0)' : 'translateY(18px)',
        transition: 'opacity 700ms ease-out, transform 700ms ease-out',
      }}>
        <h2 style={{
          fontSize:'38px', lineHeight:1.08, fontWeight:500,
          letterSpacing:'-0.06em', color:'#202024', margin:0,
        }}>
          今天，<br />
          会留下些什么？
        </h2>
      </div>

      {/* ── 副标题 — 28px ── */}
      <div style={{
        marginTop:'28px',
        opacity: visible.subtitle ? 1 : 0,
        transform: visible.subtitle ? 'translateY(0)' : 'translateY(18px)',
        transition: 'opacity 700ms ease-out, transform 700ms ease-out',
      }}>
        <p style={{
          fontSize:'17px', lineHeight:1.6,
          color:'#8E8B85', margin:0,
        }}>
          把今天轻轻放进这里。
        </p>
      </div>

      {/* ── 按钮 — 70px ── */}
      <div style={{
        marginTop:'70px',
        opacity: visible.button ? 1 : 0,
        transform: visible.button ? 'translateY(0)' : 'translateY(18px)',
        transition: 'opacity 700ms ease-out, transform 700ms ease-out',
      }}>
        <Link
          href="/mobile/write"
          style={{
            display:'block', width:'100%',
            height:'58px',
            borderRadius:'22px',
            backgroundColor:'#1F1F21',
            color:'#FFFFFF',
            fontSize:'17px', fontWeight:600,
            border:'none',
            textDecoration:'none',
            textAlign:'center',
            lineHeight:'58px',
            cursor:'pointer',
          }}
        >
          开始记录
        </Link>
      </div>

      {/* ── 底部文字 — 28px ── */}
      <div style={{
        marginTop:'28px',
        opacity: visible.footer ? 1 : 0,
        transform: visible.footer ? 'translateY(0)' : 'translateY(18px)',
        transition: 'opacity 700ms ease-out, transform 700ms ease-out',
      }}>
        <p style={{
          fontSize:'12px',
          color:'#B8B5AE', margin:0,
          textAlign:'center',
        }}>
          Stay close to today.
        </p>
      </div>
    </div>
  )
}