'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import MemoryWeave from '@/components/MemoryWeave'
import type { DiaryEntry } from '@/types'
import { getPreviousVisits } from '@/lib/places'

const GOLD = '#D4A373'
const GREEN = '#B7CDA4'
const MOODS = ['😊', '😌', '😭', '😤', '❤️', '🌧️']

export default function CreatePage() {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [mood, setMood] = useState('😊')
  const [image, setImage] = useState<string | null>(null)
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationError, setLocationError] = useState('')
  const [previousVisits, setPreviousVisits] = useState(0)
  const [entryCount, setEntryCount] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const MAX_CHARS = 1000

  useEffect(() => {
    setEntryCount(JSON.parse(localStorage.getItem('nearby_entries') || '[]').length)
  }, [])

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    const r = new FileReader(); r.onload = () => setImage(r.result as string); r.readAsDataURL(file)
  }

  const handleLocation = () => {
    if (!navigator.geolocation) { setLocationError('不支持定位'); return }
    setLocationLoading(true); setLocationError('')
    navigator.geolocation.getCurrentPosition(
      (pos) => { setLatitude(pos.coords.latitude); setLongitude(pos.coords.longitude); setPreviousVisits(getPreviousVisits(pos.coords.latitude, pos.coords.longitude).length); setLocationLoading(false) },
      () => { setLocationError('无法获取位置'); setLocationLoading(false) },
    )
  }

  const hasLocation = latitude !== null && longitude !== null

  const handleSave = () => {
    if (!content.trim()) return; setSaving(true)
    const e: DiaryEntry = { id: Date.now().toString(), date: new Date().toISOString(), content: content.trim(), mood, image, latitude, longitude }
    const x = JSON.parse(localStorage.getItem('nearby_entries') || '[]'); x.unshift(e)
    localStorage.setItem('nearby_entries', JSON.stringify(x)); router.push('/today')
  }

  const draft = { content, mood, image }

  return (
    <div style={{ minHeight:'100vh',backgroundColor:'#F8F7F4',display:'flex',justifyContent:'center',padding:'40px 24px' }}>
      <div style={{ width:'100%',maxWidth:'1100px',display:'flex',gap:'48px',alignItems:'flex-start' }}>

        {/* ── Left ── */}
        <div style={{ flex:'1 1 68%',display:'flex',flexDirection:'column' }}>

          {/* Title + Spark */}
          <div style={{ marginBottom:'48px',display:'flex',alignItems:'flex-start',gap:'12px' }}>
            <div style={{ flex:1 }}>
              <h2 style={{ fontSize:'56px',fontWeight:700,lineHeight:1.1,color:'#1E1E1E',margin:'0 0 12px 0' }}>今天发生了什么？</h2>
              <p style={{ fontSize:'18px',color:'#7B7B7B',lineHeight:1.6,margin:'0 0 4px 0' }}>把今天留在这里。</p>
              <p style={{ fontSize:'15px',color:'#9B9B9B',lineHeight:1.8,margin:0 }}>你留下的每一个今天，都会被编织在这里。</p>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink:0,marginTop:'10px' }}>
              <path d="M12 3 L13.2 8.8 L19 10 L13.2 11.2 L12 17 L10.8 11.2 L5 10 L10.8 8.8Z" fill={GOLD} stroke="none" />
            </svg>
          </div>

          {/* Welcome back */}
          {hasLocation && previousVisits > 0 && (
            <div style={{ marginBottom:'40px' }}>
              <p style={{ fontSize:'15px',color:GREEN,lineHeight:1.6,fontWeight:500 }}>欢迎回来。<br />这是你第 {previousVisits} 次来到这里。</p>
            </div>
          )}

          {/* ══ Input Card ══ */}
          <div style={{ position:'relative',marginBottom:'48px',backgroundColor:'#FFFDFB',borderRadius:'24px',padding:'36px 32px 32px',boxShadow:'0 10px 30px rgba(0,0,0,0.05)',overflow:'hidden' }}>
            {/* Paper tape */}
            <div style={{ position:'absolute',top:'-4px',left:'20px',width:'60px',height:'16px',backgroundColor:'#F6DFC2',borderRadius:'2px',transform:'rotate(-8deg)',opacity:0.75 }} />

            {/* Memory Thread illustration — bottom right */}
            <div style={{ position:'absolute',bottom:'10px',right:'12px',width:'80px',height:'40px',opacity:0.5,pointerEvents:'none' }}>
              <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
                <path d="M4 28 Q20 12 36 22 Q50 32 66 16" stroke={GOLD} strokeWidth="2" strokeLinecap="round" fill="none" />
                <circle cx="66" cy="16" r="4" fill={GOLD} />
                <path d="M28 32 Q26 28 28 24 Q30 28 28 32Z" fill="#A7C58A" stroke="none" />
              </svg>
            </div>

            <style>{`
              .input-card::placeholder { color: #5D8A54; opacity: 1; }
            `}</style>
            <textarea
              className="input-card"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={'今天，\n发生了什么？\n慢慢写，不用着急。'}
              maxLength={MAX_CHARS}
              style={{ width:'100%',height:'360px',padding:'0',border:'none',backgroundColor:'transparent',fontSize:'20px',lineHeight:1.9,color:'#2D2D2D',resize:'none',fontFamily:'inherit',outline:'none',boxSizing:'border-box' }}
            />
            <span style={{ position:'absolute',bottom:'16px',right:'24px',fontSize:'12px',color:'#B0B0B0' }}>{content.length} / {MAX_CHARS}</span>
          </div>

          {/* Mood */}
          <div style={{ marginBottom:'48px',display:'flex',gap:'14px',flexWrap:'wrap' }}>
            {MOODS.map((m) => (
              <button key={m} type="button" onClick={() => setMood(m)}
                style={{
                  width:'56px',height:'56px',borderRadius:'50%',
                  border: mood===m ? `2px solid ${GREEN}` : '2px solid transparent',
                  backgroundColor: mood===m ? '#EDF4E9' : 'transparent',
                  fontSize:'24px',display:'flex',alignItems:'center',justifyContent:'center',
                  cursor:'pointer',transition:'transform 180ms ease',
                  transform: mood===m ? 'scale(1.05)' : 'scale(1)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)' }}
                onMouseLeave={(e) => { if (mood!==m) e.currentTarget.style.transform = 'scale(1)' }}
              >{m}</button>
            ))}
          </div>

          {/* Image Upload */}
          <div style={{ marginBottom:'40px' }}>
            {image ? (
              <div style={{ position:'relative',borderRadius:'16px',overflow:'hidden' }}>
                <img src={image} alt="" style={{ width:'100%',display:'block',borderRadius:'16px' }} />
                <button type="button" onClick={() => { setImage(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                  style={{ position:'absolute',top:'10px',right:'10px',width:'28px',height:'28px',borderRadius:'50%',backgroundColor:'rgba(0,0,0,0.5)',color:'#FFF',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}>✕</button>
              </div>
            ) : (
              <div onClick={() => fileInputRef.current?.click()}
                style={{ width:'100%',aspectRatio:'4/3',borderRadius:'16px',border:'1px dashed #D9D5CF',backgroundColor:'#FFFEFC',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',cursor:'pointer',gap:'8px',transition:'background 200ms ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#FCFAF5' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#FFFEFC' }}
              >
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#B0B0B0" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="4" y="8" width="40" height="32" rx="4" /><circle cx="17" cy="20" r="4" /><path d="M4 34l12-12 8 8 6-6 14 10" />
                </svg>
                <span style={{ fontSize:'15px',color:'#909090' }}>记录这一天的瞬间</span>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImage} style={{ display:'none' }} />
          </div>

          {/* Location */}
          <div style={{ marginBottom:'48px' }}>
            <button type="button" onClick={handleLocation} disabled={locationLoading}
              style={{ width:'100%',minHeight:'56px',borderRadius:'16px',border:hasLocation?`1px solid ${GREEN}`:'1px solid #E8E5E0',backgroundColor:hasLocation?'#F6FAF3':'#FFFFFF',cursor:locationLoading?'not-allowed':'pointer',opacity:locationLoading?0.6:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'12px 20px',gap:'4px' }}>
              <span style={{ fontSize:'15px',color:hasLocation?GREEN:'#1E1E1E',display:'flex',alignItems:'center',gap:'6px' }}>
                {locationLoading?'📍 定位中……':hasLocation?'✓ 已记住此刻的位置':'📍 记住此刻的位置'}
              </span>
              {!hasLocation && <span style={{ fontSize:'12px',color:'#B0B0B0' }}>自动记录此刻的位置</span>}
            </button>
            {locationError && <p style={{ fontSize:'12px',color:'#EF4444',marginTop:'6px' }}>{locationError}</p>}
          </div>

          {/* Memory Weave */}
          <div style={{ marginBottom:'48px' }}><MemoryWeave entryCount={entryCount} /></div>

          {/* Save */}
          <button type="button" onClick={handleSave} disabled={!content.trim()||saving}
            style={{ width:'100%',height:'60px',borderRadius:'18px',fontSize:'16px',fontWeight:500,border:'none',backgroundColor:content.trim()?'#1E1E1E':'#D9D9D9',color:'#FFF',cursor:content.trim()?'pointer':'not-allowed',lineHeight:'60px',transition:'opacity 200ms ease, transform 200ms ease' }}
            onMouseEnter={(e) => { if(content.trim()) e.currentTarget.style.opacity='0.95' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity='1' }}
            onMouseDown={(e) => { if(content.trim()) e.currentTarget.style.transform='scale(0.98)' }}
            onMouseUp={(e) => { e.currentTarget.style.transform='scale(1)' }}
          >{saving?'保存中……':'留住今天'}</button>

          {/* Footer */}
          <p style={{ fontSize:'13px',color:'#B5B5B5',textAlign:'center',marginTop:'48px',marginBottom:'40px' }}>
            Nearby · Memory Weave 🌿
          </p>
        </div>

        {/* ── Right Sidebar ── */}
        <div style={{ flex:'0 0 360px' }}><Sidebar draft={draft} /></div>
      </div>
    </div>
  )
}