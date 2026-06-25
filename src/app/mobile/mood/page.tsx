'use client'
import { useRouter } from 'next/navigation'
import { setDraft } from '@/lib/mobile-store'
const M=['😊','😌','😭','❤️','🌧️','🌿']
export default function MobileMood(){const r=useRouter()
return(<div style={{display:'flex',flexDirection:'column',padding:'24px',flex:1,minHeight:'100%',justifyContent:'center'}}>
<h2 style={{fontSize:'32px',fontWeight:700,lineHeight:1.15,color:'#1E1E1E',marginBottom:'40px',textAlign:'center'}}>今天是什么颜色？</h2>
<div style={{display:'flex',justifyContent:'center',gap:'16px',flexWrap:'wrap'}}>{M.map(m=><button key={m} onClick={()=>{setDraft({mood:m});r.push('/mobile/photo')}} style={{width:'64px',height:'64px',borderRadius:'50%',border:'1px solid #E8E5E0',backgroundColor:'#FFF',fontSize:'28px',cursor:'pointer'}}>{m}</button>)}</div></div>)}