'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { DiaryEntry } from '@/types'

interface TimelineProps {
  draft?: { content: string; mood: string; image: string | null } | null
}

export default function Timeline({ draft }: TimelineProps) {
  const router = useRouter()
  const [entries, setEntries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    setEntries(JSON.parse(localStorage.getItem('nearby_entries') || '[]').slice(0, 5))
  }, [])

  const fmt = (iso: string) => {
    const d = new Date(iso); const t = new Date()
    const y = new Date(t); y.setDate(y.getDate()-1)
    const db = new Date(t); db.setDate(db.getDate()-2)
    if(d.toDateString()===t.toDateString()) return '今天'
    if(d.toDateString()===y.toDateString()) return '昨天'
    if(d.toDateString()===db.toDateString()) return '前天'
    return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`
  }

  const trunc = (t: string) => t.length>35?t.slice(0,35)+'…':t
  const hasDraft = draft && draft.content.trim()

  const items: { id:string;label:string;mood:string;text:string;hasPhoto:boolean;isToday:boolean;isDraft:boolean }[] = []
  if(hasDraft) items.push({ id:'draft',label:'今天',mood:draft!.mood,text:trunc(draft!.content),hasPhoto:!!draft!.image,isToday:true,isDraft:true })
  entries.forEach(e => {
    const l = fmt(e.date); const at = items.some(i=>i.label==='今天')
    if(l==='今天'&&at) return
    items.push({ id:e.id,label:l,mood:e.mood,text:trunc(e.content),hasPhoto:!!e.image,isToday:l==='今天'&&!at,isDraft:false })
  })

  return (
    <div style={{ backgroundColor:'#FFFDFB',borderRadius:'20px',padding:'24px',boxShadow:'0 8px 24px rgba(0,0,0,0.04)' }}>
      <h3 style={{ fontSize:'14px',fontWeight:500,color:'#1E1E1E',marginBottom:'20px' }}>最近的日子</h3>

      <div style={{ position:'relative' }}>
        {items.map((item, idx) => (
          <div key={item.id} onClick={()=>{if(!item.isDraft)router.push(`/today?id=${item.id}`)}}
            style={{ position:'relative',paddingLeft:'24px',cursor:item.isDraft?'default':'pointer',minHeight:'64px',display:'flex',alignItems:'flex-start',paddingBottom:idx<items.length-1?'20px':'0' }}>
            {idx<items.length-1 && (
              <div style={{ position:'absolute',left:'4px',top:'14px',bottom:'-64px',width:'2px',backgroundColor:'#DDD2C4' }} />
            )}
            <div style={{ position:'absolute',left:'0',top:'6px',width:'10px',height:'10px',borderRadius:'50%',backgroundColor:item.isToday?'#1E1E1E':'#DDD2C4' }} />
            <div style={{ display:'flex',flexDirection:'column',gap:'4px' }}>
              <span style={{ fontSize:'14px',color:item.isToday?'#1E1E1E':'#8C8C8C',fontWeight:item.isToday?500:400 }}>{item.label}{item.isDraft&&' · 正在记录'}</span>
              <div style={{ display:'flex',alignItems:'flex-start',gap:'6px' }}>
                <span style={{ fontSize:'16px' }}>{item.mood}</span>
                <span style={{ fontSize:'14px',color:'#2D2D2D',lineHeight:1.5 }}>{item.text}</span>
                {item.hasPhoto&&<span style={{ fontSize:'12px' }}>📷</span>}
              </div>
            </div>
          </div>
        ))}

        {items.length===0 && (
          <div style={{ position:'relative',paddingLeft:'24px',minHeight:'64px',display:'flex',alignItems:'flex-start' }}>
            <div style={{ position:'absolute',left:'0',top:'6px',width:'10px',height:'10px',borderRadius:'50%',backgroundColor:'#1E1E1E' }} />
            <div><span style={{ fontSize:'14px',color:'#1E1E1E',fontWeight:500 }}>今天</span><br/><span style={{ fontSize:'14px',color:'#8C8C8C' }}>还没有写下今天。</span></div>
          </div>
        )}
      </div>

      {/* View all */}
      {items.length>0 && (
        <a href="/mobile/timeline" style={{ display:'inline-block',marginTop:'16px',fontSize:'13px',color:'#88A97A',textDecoration:'none',fontWeight:500 }}>查看全部记录 →</a>
      )}
    </div>
  )
}