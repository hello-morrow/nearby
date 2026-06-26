'use client'
import Link from 'next/link'

export default function MobileLanding() {
  return (
    <div style={{
      display:'flex',flexDirection:'column',
      padding:'20px 20px 100px',
      minHeight:'100dvh',
      backgroundColor:'#F9F8F6',
    }}>
      {/* Logo — top left */}
      <div style={{ marginBottom:'48px' }}>
        <h1 style={{ fontSize:'11px',fontWeight:500,letterSpacing:'0.08em',color:'#444',margin:0 }}>Nearby</h1>
        <p style={{ fontSize:'10px',letterSpacing:'0.12em',color:'#B0B0B0',margin:'2px 0 0' }}>Memory Weave</p>
      </div>

      {/* Main content — top aligned, not centered */}
      <div style={{ marginTop:'16px' }}>
        <h2 style={{
          fontSize:'36px',fontWeight:700,lineHeight:1.08,
          letterSpacing:'-0.03em',color:'#1D1D1F',
          margin:'0 0 12px 0',
        }}>
          在今天，<br />留住今天。
        </h2>

        <p style={{
          fontSize:'16px',lineHeight:1.7,color:'#8C8C8C',
          margin:'0 0 40px 0',
        }}>
          把今天留在这里。
        </p>

        <Link
          href="/mobile/write"
          style={{
            display:'block',width:'100%',
            height:'52px',backgroundColor:'#1D1D1F',color:'#FFF',
            borderRadius:'18px',fontSize:'16px',fontWeight:500,
            textDecoration:'none',textAlign:'center',lineHeight:'52px',
          }}
        >
          开始今天
        </Link>

        <p style={{
          fontSize:'11px',color:'#BDBDBD',textAlign:'center',marginTop:'16px',
        }}>
          Stay close to today.
        </p>
      </div>
    </div>
  )
}