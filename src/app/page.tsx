'use client'

import { useState, useEffect } from 'react'
import Footer from '@/components/Footer'

const GOLD = '#D4A373'
const LEAF = '#A7C58A'
const SPARK = '#E4C461'
const TAPE = '#F5D7A1'

export default function Home() {
  const [phase, setPhase] = useState<'idle' | 'line' | 'seed' | 'spark' | 'done'>('idle')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('line'), 400)
    const t2 = setTimeout(() => setPhase('seed'), 1200)
    const t3 = setTimeout(() => setPhase('spark'), 1500)
    const t4 = setTimeout(() => setPhase('done'), 1900)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes drawLine {
          from { stroke-dashoffset: 120; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .brand-card { animation: fadeInUp 300ms ease-out both; }
        .brand-card-delay { animation: fadeInUp 300ms ease-out 200ms both; }
        .thread-line {
          stroke-dasharray: 120;
          stroke-dashoffset: 120;
        }
        .thread-line.draw {
          animation: drawLine 800ms ease-out forwards;
        }
        .fade-in { animation: fadeIn 400ms ease-out both; }
        .fade-in-delay { animation: fadeIn 400ms ease-out 300ms both; }
        .btn-hover:hover {
          background-color: #2E2E2E !important;
          transform: translateY(-2px) !important;
          transition: all 180ms ease !important;
        }
      `}</style>

      <div style={{ minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#F7F6F3',padding:'24px' }}>
        <div style={{ width:'100%',maxWidth:'380px',display:'flex',flexDirection:'column',alignItems:'center' }}>

          {/* Logo */}
          <div style={{ textAlign:'center',marginBottom:'48px' }}>
            <h1 style={{ fontSize:'12px',fontWeight:500,letterSpacing:'0.08em',color:'#444',margin:0 }}>Nearby</h1>
            <p style={{ fontSize:'11px',letterSpacing:'0.12em',color:'#B0B0B0',margin:'4px 0 0 0' }}>Memory Weave</p>
          </div>

          {/* Title */}
          <h2 style={{ fontSize:'56px',fontWeight:700,lineHeight:1.08,letterSpacing:'-0.03em',color:'#1E1E1E',textAlign:'center',marginBottom:'16px' }}>
            在今天，<br />留住今天。
          </h2>

          {/* Subtitle */}
          <p style={{ fontSize:'18px',lineHeight:1.7,color:'#8A8A8A',textAlign:'center',marginBottom:'32px' }}>
            把今天留在这里。
          </p>

          {/* ══ Brand Card ══ */}
          <div
            className="brand-card"
            style={{
              width:'100%',backgroundColor:'#FFFDF9',borderRadius:'24px',padding:'28px 24px',
              boxShadow:'0 12px 40px rgba(0,0,0,0.05)',
              display:'flex',alignItems:'center',justifyContent:'space-between',
              marginBottom:'40px',gap:'20px',position:'relative',overflow:'hidden',
            }}
          >
            {/* Watercolor corners */}
            <div style={{ position:'absolute',bottom:0,left:0,width:'80px',height:'60px',background:'radial-gradient(ellipse at bottom left, rgba(228,196,97,0.12) 0%, transparent 70%)',pointerEvents:'none' }} />
            <div style={{ position:'absolute',bottom:0,right:0,width:'80px',height:'60px',background:'radial-gradient(ellipse at bottom right, rgba(167,197,138,0.12) 0%, transparent 70%)',pointerEvents:'none' }} />

            {/* Paper tape — top left */}
            <div style={{
              position:'absolute',top:'-6px',left:'16px',
              width:'70px',height:'18px',backgroundColor:TAPE,
              borderRadius:'2px',transform:'rotate(-8deg)',opacity:0.8,
            }} />

            {/* Left text 55% */}
            <div style={{ flex:'55%',zIndex:1 }}>
              <p style={{ fontSize:'14px',fontWeight:500,color:'#1E1E1E',lineHeight:1.6,margin:'0 0 6px 0' }}>
                Nearby is not a diary.
                <br />
                It is a{' '}
                <span style={{ color:GOLD }}>memory weave</span>.
              </p>
              <p style={{ fontSize:'12px',color:'#707070',lineHeight:1.5,margin:0 }}>
                每一次记录，
                <br />
                都会为人生织上一针。
              </p>
            </div>

            {/* Right illustration 45% — Memory Thread */}
            <div style={{ flex:'45%',display:'flex',justifyContent:'center',alignItems:'center',position:'relative',height:'80px' }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                {/* Thread line */}
                <path
                  d="M4 60 Q20 20 40 35 Q55 45 65 30"
                  stroke={GOLD}
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  className={`thread-line ${phase !== 'idle' ? 'draw' : ''}`}
                />
                {/* Seed dot */}
                {(phase === 'seed' || phase === 'spark' || phase === 'done') && (
                  <circle cx="65" cy="30" r="5" fill={GOLD} className="fade-in" />
                )}
                {/* Spark */}
                {(phase === 'spark' || phase === 'done') && (
                  <g className="fade-in-delay">
                    <path d="M18 18 L19 21 L22 22 L19 23 L18 26 L17 23 L14 22 L17 21Z" fill={SPARK} stroke="none" />
                  </g>
                )}
                {/* Leaf */}
                {phase === 'done' && (
                  <g className="fade-in">
                    <path d="M38 48 Q35 42 38 38 Q41 42 38 48Z" fill={LEAF} stroke="none" />
                    <line x1="38" y1="48" x2="38" y2="40" stroke={LEAF} strokeWidth="1" opacity="0.5" />
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Button */}
          <form action="/create" method="GET" style={{ width:'100%' }}>
            <button
              type="submit"
              className="brand-card-delay btn-hover"
              style={{
                width:'100%',height:'56px',backgroundColor:'#1E1E1E',color:'#FFF',
                borderRadius:'18px',fontSize:'18px',fontWeight:500,border:'none',
                cursor:'pointer',lineHeight:'56px',opacity:0,
                transition:'all 180ms ease',
              }}
            >
              留住今天
            </button>
          </form>

          <p style={{ fontSize:'12px',color:'#909090',textAlign:'center',marginTop:'12px' }}>
            Stay close to today.
          </p>
        </div>
      </div>

      <Footer />
    </>
  )
}