'use client'
import { useRouter } from 'next/navigation'
import { setDraft } from '@/lib/mobile-store'
const M=['😊','😌','😭','❤️','🌧️','🌿']
export default function MobileMood(){const r=useRouter()
return(<div style={{padding:'24px 20px 100px',minHeight:'100dvh',backgroundColor:'#F7F6F3'}}>
<h2 style={{fontSize:'28px',fontWeight:700,lineHeight:1.15,color:'#1A1A1A',margin:'8px 0 24px'}}>今天的心情</h2>
<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px'}}>{M.map(m=><button key={m} onClick={()=>{setDraft({mood:m});r.push('/mobile/photo')}} style={{height:'60px',borderRadius:'16px',border:'1px solid #E5E0D8',backgroundColor:'#FFF',fontSize:'26px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>{m}</button>)}</div></div>)}