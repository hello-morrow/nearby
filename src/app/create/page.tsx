'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import MemoryWeave from '@/components/MemoryWeave'
import type { DiaryEntry } from '@/types'
import { getPreviousVisits } from '@/lib/places'

const GREEN = '#88A97A'
const GOLD = '#D4A373'
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
    <div style={{ minHeight:'100vh',backgroundColor:'#F9F8F6',display:'flex',justifyContent:'center',padding:'40px 24px' }}>
      <div style={{ width:'100%',maxWidth:'1100px',display:'flex',gap:'48px',alignItems:'flex-start' }}>

        <div style={{ flex:'1 1 68%',display:'flex',flexDirection:'column' }}>

          {/* ══ Title with hand-drawn star ══ */}
          <div style={{ marginBottom:'40px',position:'relative' }}>
            <div style={{ display:'flex',alignItems:'flex-start',gap:'8px' }}>
              <h2 style={{ fontSize:'56px',fontWeight:700,lineHeight:1.1,color:'#1F1F1F',letterSpacing:'-0.5px',margin:0 }}>
                今天发生了什么？
              </h2>
              {/* Hand-drawn star — 22px #D4A373 */}
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink:0,marginTop:'12px' }}>
                <path d="M11 3 L12.2 8.8 L18 10 L12.2 11.2 L11 17 L9.8 11.2 L4 10 L9.8 8.8Z" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <p style={{ fontSize:'16px',color:'#7B7B7B',lineHeight:1.6,margin:'8px 0 6px 0' }}>把今天留在这里。</p>
            <p style={{ fontSize:'15px',color:'#9B9B7B',lineHeight:1.8,margin:0 }}>你留下的每一个今天，都会被编织在这里。</p>
          </div>

          {/* Welcome back */}
          {hasLocation && previousVisits > 0 && (
            <div style={{ marginBottom:'40px' }}>
              <p style={{ fontSize:'15px',color:GREEN,lineHeight:1.6,fontWeight:500 }}>欢迎回来。<br />这是你第 {previousVisits} 次来到这里。</p>
            </div>
          )}

          {/* ══ Input Card ══ */}
          <div style={{ position:'relative',marginBottom:'40px',backgroundColor:'#FFFDFB',borderRadius:'24px',padding:'32px',boxShadow:'0 12px 40px rgba(0,0,0,0.04)',overflow:'visible' }}>
            {/* Paper tape — half outside */}
            <div style={{ position:'absolute',top:'-12px',left:'-12px',width:'60px',height:'16px',backgroundColor:'#F6DFC2',borderRadius:'2px',transform:'rotate(-8deg)',opacity:0.75 }} />

            <style>{`.ph-green::placeholder { color: #5D8A54; opacity:1; }`}</style>
            <textarea
              className="ph-green"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={'今天，\n发生了什么？\n慢慢写，不用着急。'}
              maxLength={MAX_CHARS}
              style={{ width:'100%',height:'360px',padding:'0',border:'none',backgroundColor:'transparent',fontSize:'20px',lineHeight:1.9,color:'#2D2D2D',resize:'none',fontFamily:'Inter, Noto Sans SC, sans-serif',outline:'none',boxSizing:'border-box' }}
            />
            <span style={{ position:'absolute',bottom:'16px',right:'24px',fontSize:'12px',color:'#B0B0B0' }}>{content.length} / {MAX_CHARS}</span>
          </div>

          {/* Mood */}
          <div style={{ marginBottom:'40px',display:'flex',gap:'12px',flexWrap:'wrap' }}>
            {MOODS.map((m) => (
              <button key={m} type="button" onClick={() => setMood(m)}
                style={{
                  width:'52px',height:'52px',borderRadius:'50%',
                  border: mood===m ? `2px solid ${GREEN}` : '2px solid #E8E5E0',
                  backgroundColor: mood===m ? '#F6FAF3' : '#FFFFFF',
                  fontSize:'22px',display:'flex',alignItems:'center',justifyContent:'center',
                  cursor:'pointer',transition:'all 180ms ease',
                }}
              >{m}</button>
            ))}
          </div>

          {/* Image Upload — hand-drawn camera */}
          <div style={{ marginBottom:'40px' }}>
            {image ? (
              <div style={{ position:'relative',borderRadius:'16px',overflow:'hidden' }}>
                <img src={image} alt="" style={{ width:'100%',display:'block',borderRadius:'16px' }} />
                <button type="button" onClick={() => { setImage(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                  style={{ position:'absolute',top:'10px',right:'10px',width:'28px',height:'28px',borderRadius:'50%',backgroundColor:'rgba(0,0,0,0.5)',color:'#FFF',border:'none',cursor:'pointer' }}>✕</button>
              </div>
            ) : (
              <div onClick={() => fileInputRef.current?.click()}
                style={{ width:'100%',aspectRatio:'4/3',borderRadius:'16px',border:'1px dashed #DED8CF',backgroundColor:'#FFFEFC',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',cursor:'pointer',gap:'8px' }}>
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="#8D8D8D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="9" width="38" height="30" rx="4" /><circle cx="17" cy="21" r="4" /><path d="M5 33 L18 22 L27 29 L34 22 L43 29" />
                </svg>
                <span style={{ fontSize:'15px',color:'#7B7B7B' }}>留下今天的一张小纸片</span>
                <span style={{ fontSize:'12px',color:'#A4A4A4',marginTop:'2px' }}>以后，它会陪你一起变成回忆。</span>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImage} style={{ display:'none' }} />
          </div>

          {/* Location */}
          <div style={{ marginBottom:'40px' }}>
            <button type="button" onClick={handleLocation} disabled={locationLoading}
              style={{ width:'100%',minHeight:'56px',borderRadius:'16px',border:hasLocation?`1px solid ${GREEN}`:'1px solid #E8E5E0',backgroundColor:hasLocation?'#F6FAF3':'#FFFFFF',cursor:locationLoading?'not-allowed':'pointer',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'12px 20px',gap:'4px' }}>
              <span style={{ fontSize:'15px',color:hasLocation?GREEN:'#1E1E1E' }}>
                {locationLoading?'📍 定位中……':hasLocation?'✓ 已记住此刻的位置':'📍 记住此刻的位置'}
              </span>
              {!hasLocation && <span style={{ fontSize:'12px',color:'#B0B0B0' }}>自动记录此刻的位置</span>}
            </button>
            {locationError && <p style={{ fontSize:'12px',color:'#EF4444',marginTop:'6px' }}>{locationError}</p>}
          </div>

          {/* Memory Weave */}
          <div style={{ marginBottom:'40px' }}><MemoryWeave entryCount={entryCount} /></div>

          {/* Save */}
          <button type="button" onClick={handleSave} disabled={!content.trim()||saving}
            style={{ width:'100%',height:'60px',borderRadius:'18px',fontSize:'16px',fontWeight:500,border:'none',backgroundColor:content.trim()?'#1E1E1E':'#D9D9D9',color:'#FFF',cursor:content.trim()?'pointer':'not-allowed',lineHeight:'60px',transition:'opacity 180ms ease' }}
            onMouseEnter={(e) => { if(content.trim()) e.currentTarget.style.opacity='0.95' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity='1' }}
          >{saving?'保存中……':'留住今天'}</button>

          <p style={{ fontSize:'12px',color:'#A4A4A4',textAlign:'center',marginTop:'40px',marginBottom:'40px' }}>
            Nearby · Memory Weave
          </p>
        </div>

        <div style={{ flex:'0 0 360px' }}><Sidebar draft={draft} /></div>
      </div>
    </div>
  )
}