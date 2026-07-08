'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import BackThread from '@/components/BackThread'
import { InteractiveSpark, InteractiveSeed, InteractiveLeaf, InteractiveTape, doodleStyles } from '@/components/DoodleInteractive'
import type { DiaryEntry } from '@/types'
import { getPreviousVisits } from '@/lib/places'

const G = '#9AA889'
const GOLD = '#D8B37A'

export default function CreatePage() {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [mood, setMood] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const [locLoading, setLocLoading] = useState(false)
  const [locError, setLocError] = useState('')
  const [previousVisits, setPreviousVisits] = useState(0)
  const [entryCount, setEntryCount] = useState(0)
  const fRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setEntryCount(JSON.parse(localStorage.getItem('nearby_entries') || '[]').length)
  }, [])

  const hasAny = content.trim() || image || latitude !== null || mood
  const hasLocation = latitude !== null && longitude !== null

  const hi = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if(!f) return; const r = new FileReader()
    r.onload = () => setImage(r.result as string); r.readAsDataURL(f)
  }

  const hl = () => {
    if(!navigator.geolocation) { setLocError('不支持定位'); return }
    setLocLoading(true); setLocError('')
    navigator.geolocation.getCurrentPosition(
      (p) => { setLatitude(p.coords.latitude); setLongitude(p.coords.longitude); setPreviousVisits(getPreviousVisits(p.coords.latitude, p.coords.longitude).length); setLocLoading(false) },
      () => { setLocError('无法获取位置'); setLocLoading(false) },
    )
  }

  const hs = () => {
    if(!hasAny || saving) return
    setSaving(true)
    const e: DiaryEntry = {
      id: Date.now().toString(), date: new Date().toISOString(),
      content: content.trim(), mood, image, latitude, longitude,
    }
    const x = JSON.parse(localStorage.getItem('nearby_entries') || '[]')
    x.unshift(e); localStorage.setItem('nearby_entries', JSON.stringify(x))
    router.push('/today')
  }

  const draft = { content, mood, image }

  return (
    <div style={{ minHeight:'100vh', backgroundColor:'#F7F6F3', display:'flex', justifyContent:'center', padding:'40px 24px', position:'relative' }}>
      <BackThread label="回到首页" href="/" />
      <div style={{ width:'100%', maxWidth:'1100px', display:'flex', gap:'48px', alignItems:'flex-start', marginTop:'40px' }}>

        {/* ── Left — Thread fragments ── */}
        <div style={{ flex:'1 1 68%', display:'flex', flexDirection:'column' }}>

          {/* Title */}
          <div style={{ marginBottom:'48px' }}>
            <h2 style={{ fontSize:'40px', fontWeight:500, lineHeight:1.15, color:'#1A1A1A', margin:'0 0 8px' }}>
              今天发生了什么？
            </h2>
            <p style={{ fontSize:'16px', color:'#8C8C86', lineHeight:1.6, margin:0 }}>
              把片段织在一起。
            </p>
          </div>

          {/* Welcome back */}
          {hasLocation && previousVisits > 0 && (
            <div style={{ marginBottom:'32px' }}>
              <p style={{ fontSize:'14px', color:G, lineHeight:1.6, fontWeight:500 }}>
                欢迎回来 · 第 {previousVisits} 次来到这里
              </p>
            </div>
          )}

          {/* ── Fragment: Text ── */}
          <div style={{ position:'relative', marginBottom:'40px', backgroundColor:'#FFFDFB', borderRadius:'24px', padding:'32px', boxShadow:'0 4px 20px rgba(0,0,0,0.04)', overflow:'visible' }}>
            <InteractiveTape />
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder={'写下今天……'}
              maxLength={1000}
              style={{ width:'100%', height:'280px', padding:0, border:'none', backgroundColor:'transparent', fontSize:'20px', lineHeight:1.9, color:'#1A1A1A', resize:'none', fontFamily:'inherit', outline:'none', boxSizing:'border-box' }}
            />
            <span style={{ position:'absolute', bottom:'16px', right:'24px', fontSize:'12px', color:'#B0B0B0' }}>{content.length} / 1000</span>
          </div>

          {/* ── Fragment: Image ── */}
          <div style={{ marginBottom:'40px' }}>
            {image ? (
              <div style={{ position:'relative', borderRadius:'16px', overflow:'hidden' }}>
                <img src={image} alt="" style={{ width:'100%', display:'block' }} />
                <button onClick={() => { setImage(null); if(fRef.current) fRef.current.value = '' }}
                  style={{ position:'absolute', top:10, right:10, width:28, height:28, borderRadius:'50%', backgroundColor:'rgba(0,0,0,0.5)', color:'#FFF', border:'none', cursor:'pointer' }}>✕</button>
              </div>
            ) : (
              <div onClick={() => fRef.current?.click()}
                style={{ width:'100%', aspectRatio:'4/3', borderRadius:'24px', border:'1px dashed #D9D5CF', backgroundColor:'#FFFEFC', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', cursor:'pointer', position:'relative' }}>
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="#8D8D8D" strokeWidth="1.6"><rect x="5" y="9" width="38" height="30" rx="4"/><circle cx="17" cy="21" r="4"/><path d="M5 33 L18 22 L27 29 L34 22 L43 29"/></svg>
                <span style={{ fontSize:'15px', color:'#8C8C86', marginTop:'8px' }}>贴一张照片</span>
                <div style={{ position:'absolute', bottom:'12px', right:'12px', display:'flex', gap:'4px' }}>
                  <InteractiveLeaf size={16} />
                  <InteractiveSeed size={20} />
                </div>
              </div>
            )}
            <input ref={fRef} type="file" accept="image/*" onChange={hi} style={{ display:'none' }} />
          </div>

          {/* ── Fragment: Mood — thin row ── */}
          <div style={{ marginBottom:'40px' }}>
            <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
              {['😊','😌','😭','😤','❤️','🌧️'].map(m => (
                <button key={m} onClick={() => setMood(m === mood ? '' : m)}
                  style={{
                    width:'48px', height:'48px', borderRadius:'50%',
                    border: mood === m ? `2px solid ${G}` : '2px solid #E5E0D8',
                    backgroundColor: mood === m ? '#F6FAF3' : 'transparent',
                    fontSize:'22px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
                    transition:'all 180ms ease',
                  }}>{m}</button>
              ))}
            </div>
          </div>

          {/* ── Fragment: Location ── */}
          <div style={{ marginBottom:'40px' }}>
            <button onClick={hl} disabled={locLoading}
              style={{ width:'100%', minHeight:'48px', borderRadius:'18px', border: hasLocation ? `1px solid ${G}` : '1px solid #E5E0D8', backgroundColor: hasLocation ? '#F6FAF3' : '#FFF', cursor: locLoading ? 'not-allowed' : 'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', fontSize:'14px', color: hasLocation ? G : '#8C8C86' }}>
              {locLoading ? '📍 定位中……' : hasLocation ? '✓ 已记住位置' : '📍 加上位置'}
            </button>
            {locError && <p style={{ fontSize:'12px', color:'#EF4444', marginTop:'6px' }}>{locError}</p>}
          </div>

          {/* ── Preview Thread ── */}
          {hasAny && (
            <div style={{ marginBottom:'40px', padding:'24px', backgroundColor:'#FFFDFB', borderRadius:'24px', boxShadow:'0 4px 20px rgba(0,0,0,0.04)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'12px' }}>
                <span style={{ fontSize:'20px' }}>{mood || '🌱'}</span>
                <div style={{ flex:1, height:'2px', backgroundColor:'#E5E0D8', position:'relative' }}>
                  <div style={{ position:'absolute', left:0, top:0, height:'100%', width:'30%', backgroundColor:GOLD, borderRadius:'1px' }} />
                </div>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><circle cx="4" cy="4" r="4" fill={GOLD}/></svg>
              </div>
              {content.trim() && <p style={{ fontSize:'15px', color:'#1A1A1A', lineHeight:1.7, margin:'0 0 8px' }}>{content.trim().slice(0,80)}{content.trim().length > 80 ? '…' : ''}</p>}
              {image && <img src={image} alt="" style={{ width:'100%', borderRadius:'12px', marginBottom:'8px' }} />}
              <p style={{ fontSize:'12px', color:'#BDBDBD', margin:0 }}>Every memory becomes another thread.</p>
            </div>
          )}

          {/* ── Save ── */}
          <button onClick={hs} disabled={!hasAny || saving}
            style={{
              width:'100%', height:'56px', borderRadius:'22px', fontSize:'16px', fontWeight:500, border:'none',
              backgroundColor: hasAny ? '#1A1A1A' : '#D9D9D9', color:'#FFF',
              cursor: hasAny ? 'pointer' : 'not-allowed', lineHeight:'56px',
              transition:'opacity 180ms ease',
            }}
            onMouseEnter={e => { if(hasAny) e.currentTarget.style.opacity='0.95' }}
            onMouseLeave={e => { e.currentTarget.style.opacity='1' }}
          >{saving ? '编织中……' : '织成 Today Thread'}</button>

          <p style={{ fontSize:'12px', color:'#B8B5AE', textAlign:'center', marginTop:'40px', marginBottom:'40px' }}>
            Nearby · Memory Weave
          </p>
        </div>

        {/* ── Right Sidebar ── */}
        <div style={{ flex:'0 0 360px' }}><Sidebar draft={draft} /></div>
      </div>

      <style>{doodleStyles}</style>
    </div>
  )
}