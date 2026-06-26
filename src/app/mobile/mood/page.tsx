'use client'
import { useRouter } from 'next/navigation'
import { setDraft } from '@/lib/mobile-store'
const M=['😊','😌','😭','❤️','🌧️','🌿']
export default function MobileMood(){const r=useRouter()
return(<div style={{display:'flex',flexDirection:'column',padding:'20px',minHeight:'100dvh',backgroundColor:'#F9F8F6'}}>
<h2 style={{fontSize:'28px',fontWeight:700,lineHeight:1.15,color:'#1D1D1F',margin:'8px 0 32px'}}>今天是什么颜色？</h2>
<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px'}}>{M.map(m=><button key={m} onClick={()=>{setDraft({mood:m});r.push('/mobile/photo')}} style={{height:'64px',borderRadius:'50%',border:'1px solid #E8E5E0',backgroundColor:'#FFFDFB',fontSize:'28px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>{m}</button>)}</div></div>)}