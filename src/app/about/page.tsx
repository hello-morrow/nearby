'use client'

import { useState, useEffect } from 'react'
import { APP_VERSION } from '@/config/version'

const GOLD = '#D4A373'

const CARDS = [
  { title: '留下今天', desc: 'Every memory begins somewhere.' },
  { title: '慢慢生长', desc: 'Small memories grow quietly.' },
  { title: '重新发现', desc: 'Some memories return years later.' },
  { title: '彼此连接', desc: 'Nothing is truly isolated.' },
]

export default function AboutPage() {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((s) => (s + 1) % 4)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{
      backgroundColor: '#F7F6F3',
      height: '100vh', width: '100%',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      padding: 'clamp(40px, 8vw, 120px)',
      position: 'relative', overflow: 'hidden',
    }}>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes threadDraw {
          from { stroke-dashoffset: 18; }
          to   { stroke-dashoffset: 0; }
        }
        .slide-enter {
          animation: fadeSlideIn 700ms ease-out both;
        }
        .thread-line {
          stroke-dasharray: 18;
          stroke-dashoffset: 18;
        }
        .thread-draw {
          animation: threadDraw 500ms ease-out 300ms forwards;
        }
      `}</style>

      {/* ── Slide 0: Brand ── */}
      {slide === 0 && (
        <div key="s0" className="slide-enter" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize:'14px',fontWeight:500,letterSpacing:'0.12em',color:'#444',margin:'0 0 8px 0' }}>Nearby</h1>
          <p style={{ fontSize:'12px',letterSpacing:'0.14em',color:'#B0B0B0',margin:'0 0 48px 0' }}>Memory Weave</p>
          <p style={{ fontSize:'40px',fontWeight:500,letterSpacing:'0.12em',color:'#8C8C86',margin:0 }}>生生</p>
        </div>
      )}

      {/* ── Slide 1: Statement ── */}
      {slide === 1 && (
        <div key="s1" className="slide-enter" style={{ textAlign: 'center', maxWidth:'600px' }}>
          <p style={{ fontSize:'clamp(28px,4vw,40px)',fontWeight:500,color:'#1E1E1E',lineHeight:1.6,margin:'0 0 24px 0' }}>
            Nearby 不是普通日记。
          </p>
          <p style={{ fontSize:'clamp(28px,4vw,40px)',fontWeight:500,color:'#1E1E1E',lineHeight:1.6,margin:0 }}>
            Nearby 让记忆在未来重新找到彼此。
          </p>
        </div>
      )}

      {/* ── Slide 2: Cards ── */}
      {slide === 2 && (
        <div key="s2" className="slide-enter" style={{
          display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',
          gap:'24px',width:'100%',maxWidth:'800px',
        }}>
          {CARDS.map((card, i) => (
            <div key={i} style={{
              backgroundColor:'#FFFDFB',borderRadius:'20px',
              padding:'36px 32px 32px',
              boxShadow:'0 2px 16px rgba(0,0,0,0.04)',
              display:'flex',flexDirection:'column',minHeight:'200px',
              animation: `fadeSlideIn 500ms ease-out ${300 + i * 150}ms both`,
            }}>
              <p style={{ fontSize:'18px',fontWeight:500,color:'#1E1E1E',margin:'0 0 8px 0' }}>
                {card.title}
              </p>
              <p style={{ fontSize:'14px',color:'#8C8C8C',lineHeight:1.6,margin:'0 0 auto 0',flex:1 }}>
                {card.desc}
              </p>
              <div style={{ marginTop:'20px' }}>
                <svg width="32" height="14" viewBox="0 0 32 14" fill="none">
                  <path
                    d="M0 7 Q8 2 16 7 Q24 12 32 7"
                    stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" fill="none"
                    className="thread-line"
                    style={{ animation: `threadDraw 400ms ease-out ${800 + i * 150}ms forwards` }}
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Slide 3: Closing ── */}
      {slide === 3 && (
        <div key="s3" className="slide-enter" style={{ textAlign:'center' }}>
          <p style={{
            fontSize:'clamp(20px,3vw,28px)',fontWeight:400,
            color:'#8C8C8C',lineHeight:1.8,
            maxWidth:'500px',margin:'0 0 64px 0',
          }}>
            今天留下的一切，
            <br />
            终将在未来发光。
          </p>
          <div style={{ animation:'fadeSlideIn 600ms ease-out 400ms both' }}>
            <p style={{ fontSize:'11px',letterSpacing:'0.1em',color:'#BDBDBD',margin:'0 0 4px 0' }}>
              Nearby · Memory Weave
            </p>
            <p style={{ fontSize:'10px',color:'#D0D0D0',margin:0,lineHeight:1.6 }}>
              {APP_VERSION.chapter} · {APP_VERSION.title}
              <br />
              v{APP_VERSION.version} · Build {APP_VERSION.build}
            </p>
          </div>
        </div>
      )}

    </div>
  )
}
