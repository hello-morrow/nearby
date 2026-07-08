'use client'
import Link from 'next/link'

export default function MobileLanding() {
  return (
    <div style={{
      display:'flex', flexDirection:'column',
      padding:'32px 20px 100px',
      minHeight:'100dvh',
      backgroundColor:'#F7F6F3',
    }}>
      {/* Logo */}
      <div style={{ marginBottom:'40px' }}>
        <h1 style={{ fontSize:'11px',fontWeight:600,letterSpacing:'0.06em',color:'#1A1A1A',margin:0 }}>Nearby</h1>
      </div>

      <div style={{ marginTop:'20px' }}>
        <h2 style={{
          fontSize:'36px',fontWeight:700,lineHeight:1.08,
          letterSpacing:'-0.02em',color:'#1A1A1A',margin:'0 0 12px 0',
        }}>
          在今天，<br />留住今天。
        </h2>

        <p style={{
          fontSize:'16px',lineHeight:1.6,color:'#8C8C86',
          margin:'0 0 32px 0',
        }}>
          把今天留在这里。
        </p>

        <Link
          href="/mobile/write"
          style={{
            display:'block',width:'100%',maxWidth:'320px',
            height:'50px',backgroundColor:'#1A1A1A',color:'#FFF',
            borderRadius:'18px',fontSize:'16px',fontWeight:500,
            textDecoration:'none',textAlign:'center',lineHeight:'50px',
          }}
        >
          开始今天
        </Link>

        <p style={{
          fontSize:'11px',color:'#BDBDBD',marginTop:'24px',
        }}>
          Stay close to today.
        </p>
      </div>
    </div>
  )
}