'use client'
import Link from 'next/link'

export default function MobileLanding() {
  return (
    <div style={{ display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',flex:1,padding:'24px',textAlign:'center',minHeight:'100%' }}>
      <h1 style={{ fontSize:'12px',fontWeight:500,letterSpacing:'0.08em',color:'#444',marginBottom:'8px' }}>Nearby</h1>
      <p style={{ fontSize:'11px',letterSpacing:'0.12em',color:'#B0B0B0',marginBottom:'64px' }}>Memory Weave</p>
      <h2 style={{ fontSize:'56px',fontWeight:700,lineHeight:1.08,letterSpacing:'-0.03em',color:'#1E1E1E',marginBottom:'16px' }}>在今天，<br />留住今天。</h2>
      <p style={{ fontSize:'18px',lineHeight:1.7,color:'#8C8C8C',marginBottom:'48px' }}>把今天留在这里。</p>
      <Link href="/mobile/write" style={{ display:'block',width:'100%',maxWidth:'320px',height:'56px',backgroundColor:'#1E1E1E',color:'#FFF',borderRadius:'18px',fontSize:'18px',fontWeight:500,textDecoration:'none',textAlign:'center',lineHeight:'56px' }}>开始今天</Link>
      <p style={{ position:'absolute',bottom:'80px',fontSize:'12px',color:'#8C8C8C' }}>Stay close to today.</p>
    </div>
  )
}