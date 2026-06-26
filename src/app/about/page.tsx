import { APP_VERSION } from '@/config/version'

export default function AboutPage() {
  return (
    <div style={{ minHeight:'100vh',backgroundColor:'#F7F6F3',display:'flex',justifyContent:'center',alignItems:'center',padding:'24px' }}>
      <div style={{ textAlign:'center',maxWidth:'360px' }}>
        <h1 style={{ fontSize:'12px',fontWeight:500,letterSpacing:'0.08em',color:'#444',marginBottom:'8px' }}>Nearby</h1>
        <p style={{ fontSize:'11px',letterSpacing:'0.12em',color:'#B0B0B0',marginBottom:'40px' }}>Memory Weave</p>
        <p style={{ fontSize:'18px',color:'#1E1E1E',lineHeight:1.8 }}>
          {APP_VERSION.chapter}
          <br />
          {APP_VERSION.title}
        </p>
        <p style={{ fontSize:'14px',color:'#8C8C8C',marginTop:'16px' }}>
          v{APP_VERSION.version} · Build {APP_VERSION.build}
        </p>
        <p style={{ fontSize:'13px',color:'#BDBDBD',marginTop:'40px' }}>
          Nearby remembers quietly.
        </p>
      </div>
    </div>
  )
}