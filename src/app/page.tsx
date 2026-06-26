import { Thread } from '@/components/Doodle'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .brand-card { animation: fadeInUp 300ms ease-out both; }
        .brand-card-delay { animation-delay: 200ms; }
      `}</style>

      <div style={{ minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#F7F6F3',padding:'24px' }}>
        <div style={{ width:'100%',maxWidth:'360px',display:'flex',flexDirection:'column',alignItems:'center' }}>

          <div style={{ textAlign:'center',marginBottom:'56px' }}>
            <h1 style={{ fontSize:'12px',fontWeight:500,letterSpacing:'0.08em',color:'#444',margin:0 }}>Nearby</h1>
            <p style={{ fontSize:'11px',fontWeight:400,letterSpacing:'0.12em',color:'#B0B0B0',margin:'4px 0 0 0' }}>Memory Weave</p>
          </div>

          <h2 style={{ fontSize:'56px',fontWeight:700,lineHeight:1.08,letterSpacing:'-0.03em',color:'#1E1E1E',textAlign:'center',marginBottom:'16px' }}>
            在今天，<br />留住今天。
          </h2>

          <p style={{ fontSize:'18px',lineHeight:1.7,color:'#8C8C8C',textAlign:'center',marginBottom:'32px' }}>
            把今天留在这里。
          </p>

          <div className="brand-card" style={{ width:'100%',backgroundColor:'#FFFFFF',borderRadius:'24px',padding:'24px',boxShadow:'0 8px 30px rgba(0,0,0,0.04)',display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'40px',gap:'16px' }}>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:'14px',fontWeight:500,color:'#1E1E1E',lineHeight:1.6,margin:'0 0 8px 0' }}>
                Nearby is not a diary.<br />It is a memory weave.
              </p>
              <p style={{ fontSize:'12px',color:'#8C8C8C',lineHeight:1.5,margin:0 }}>
                每一次记录，<br />都会为人生织上一针。
              </p>
            </div>
            <Thread size={48} />
          </div>

          <form action="/create" method="GET" style={{ width:'100%' }}>
            <button type="submit" className="btn-primary brand-card brand-card-delay" style={{ width:'100%',height:'56px',backgroundColor:'#1E1E1E',color:'#FFF',textAlign:'center',borderRadius:'18px',fontSize:'18px',fontWeight:500,border:'none',lineHeight:'56px',cursor:'pointer',opacity:0 }}>
              留住今天
            </button>
          </form>

          <p style={{ position:'absolute',bottom:'40px',fontSize:'12px',color:'#8C8C8C',textAlign:'center' }}>
            Stay close to today.
          </p>
        </div>
      </div>

      <Footer />
    </>
  )
}