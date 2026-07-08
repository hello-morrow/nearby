'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getDraft, setDraft } from '@/lib/mobile-store'

export default function MobileWrite() {
  const router = useRouter()
  const [content, setContent] = useState(getDraft().content)
  const ok = !!content.trim()
  return (
    <div style={{ padding:'24px 20px 100px',minHeight:'100dvh',backgroundColor:'#F7F6F3',display:'flex',flexDirection:'column' }}>
      <h2 style={{ fontSize:'28px',fontWeight:700,lineHeight:1.15,color:'#1A1A1A',margin:'8px 0 20px' }}>今天发生了什么？</h2>
      <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder={'今天，\n发生了什么？\n慢慢写，不用着急。'}
        style={{ flex:1,width:'100%',padding:'20px',borderRadius:'20px',border:'1px solid #E5E0D8',backgroundColor:'#FFF',fontSize:'18px',lineHeight:1.8,color:'#1A1A1A',resize:'none',fontFamily:'inherit',outline:'none',boxSizing:'border-box' }} />
      <div style={{ marginTop:'20px',display:'flex',gap:'12px' }}>
        <button onClick={()=>{setDraft({content:content.trim()});router.push('/mobile/photo')}}
          style={{ flex:1,height:'50px',borderRadius:'18px',fontSize:'14px',fontWeight:500,border:'1px solid #E5E0D8',backgroundColor:'#FFF',color:'#1A1A1A',cursor:'pointer' }}>📷 图片</button>
        <button onClick={()=>{setDraft({content:content.trim()});router.push('/mobile/photo')}}
          style={{ flex:1,height:'50px',borderRadius:'18px',fontSize:'14px',fontWeight:500,border:'1px solid #E5E0D8',backgroundColor:'#FFF',color:'#1A1A1A',cursor:'pointer' }}>📍 地点</button>
        <button onClick={()=>{setDraft({content:content.trim()});router.push('/mobile/mood')}}
          style={{ flex:1,height:'50px',borderRadius:'18px',fontSize:'14px',fontWeight:500,border:'1px solid #E5E0D8',backgroundColor:'#FFF',color:'#1A1A1A',cursor:'pointer' }}>😊 心情</button>
      </div>
      <button onClick={()=>{setDraft({content:content.trim()});router.push('/mobile/photo')}} disabled={!ok}
        style={{ width:'100%',height:'50px',borderRadius:'18px',marginTop:'16px',fontSize:'16px',fontWeight:500,border:'none',backgroundColor:ok?'#1A1A1A':'#D9D9D9',color:'#FFF',cursor:ok?'pointer':'not-allowed' }}>继续</button>
    </div>
  )
}