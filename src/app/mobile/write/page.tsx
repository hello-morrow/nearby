'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getDraft, setDraft } from '@/lib/mobile-store'

export default function MobileWrite() {
  const router = useRouter()
  const [content, setContent] = useState(getDraft().content)
  const ok = !!content.trim()
  return (
    <div style={{ display:'flex',flexDirection:'column',padding:'24px',flex:1,minHeight:'100%' }}>
      <h2 style={{ fontSize:'32px',fontWeight:700,lineHeight:1.15,color:'#1E1E1E',marginBottom:'32px' }}>今天发生了什么？</h2>
      <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder={'今天，\n发生了什么？\n慢慢写，不用着急。'}
        style={{ flex:1,width:'100%',padding:'24px',borderRadius:'20px',border:'1px solid #E5E5E5',backgroundColor:'#FFF',fontSize:'18px',lineHeight:1.9,color:'#1E1E1E',resize:'none',fontFamily:'inherit',outline:'none',boxSizing:'border-box',minHeight:'300px' }} />
      <button onClick={()=>{setDraft({content:content.trim()});router.push('/mobile/mood')}} disabled={!ok}
        style={{ width:'100%',height:'56px',borderRadius:'18px',marginTop:'24px',fontSize:'16px',fontWeight:500,border:'none',backgroundColor:ok?'#1E1E1E':'#D9D9D9',color:'#FFF',cursor:ok?'pointer':'not-allowed' }}>继续</button>
    </div>
  )
}