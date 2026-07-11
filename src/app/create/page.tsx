'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import MemoryWeave from '@/components/MemoryWeave'
import BackThread from '@/components/BackThread'
import { InteractiveSpark, InteractiveSeed, InteractiveLeaf, InteractiveThread, InteractiveTape, doodleStyles } from '@/components/DoodleInteractive'
import type { DiaryEntry } from '@/types'
import { getPreviousVisits } from '@/lib/places'

const GREEN = '#9AA889'
const GOLD = '#D8B37A'
const WARM = '#F7F6F3'
const PAPER = '#FFFDFB'
const INK = '#1A1A1A'
const SOFT = '#7B7B7B'
const LINE = '#D9D2C6'
const MOODS = ['😊', '😌', '😭', '😤', '❤️', '🌧️']

// ── Thread connector SVG ──
function ThreadLine({ active = false }: { active?: boolean }) {
  return (
    <svg width="40" height="24" viewBox="0 0 40 24" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M0 12 Q8 4 16 12 Q24 20 32 12 Q36 8 40 12"
        stroke={active ? GREEN : LINE}
        strokeWidth={active ? 1.8 : 1.2}
        strokeLinecap="round"
        fill="none"
        style={{ transition: 'stroke 400ms ease' }}
      />
    </svg>
  )
}

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
  const [ritualActive, setRitualActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const MAX_CHARS = 1000

  // ── Thread fragments count ──
  const fragments = [content.trim(), image, latitude !== null].filter(Boolean).length

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
  const hasContent = content.trim().length > 0

  const handleSave = () => {
    if (!content.trim() || saving) return
    setSaving(true)
    const e: DiaryEntry = { id: Date.now().toString(), date: new Date().toISOString(), content: content.trim(), mood, image, latitude, longitude }
    const x = JSON.parse(localStorage.getItem('nearby_entries') || '[]'); x.unshift(e)
    localStorage.setItem('nearby_entries', JSON.stringify(x))
    setSaving(false)
    setRitualActive(true)
    setTimeout(() => setRitualActive(false), 2500)
  }

  const draft = { content, mood, image }

  return (
    <div style={{ minHeight:'100vh', backgroundColor:WARM, display:'flex', justifyContent:'center', padding:'40px 24px', position:'relative' }}>
      <BackThread label="回到首页" href="/" />
      <div style={{ width:'100%', maxWidth:'1100px', display:'flex', gap:'48px', alignItems:'flex-start', marginTop:'20px' }}>

        {/* ═══════════════════════════════════════════ */}
        {/* Main Weave Area */}
        {/* ═══════════════════════════════════════════ */}
        <div style={{ flex:'1 1 68%', display:'flex', flexDirection:'column' }}>

          {/* ══ Opening ── */}
          <div style={{ marginBottom:'36px', display:'flex', alignItems:'flex-end', gap:'10px' }}>
            <div style={{ flex:1 }}>
              <h2 style={{
                fontSize:'42px', fontWeight:600, lineHeight:1.2, color:INK,
                letterSpacing:'-0.3px', margin:'0 0 8px 0',
                fontFamily:'Inter, Noto Sans SC, serif',
              }}>
                今天，发生了什么？
              </h2>
              <p style={{ fontSize:'14px', color:SOFT, lineHeight:1.6, margin:0 }}>
                把今天的碎片织成一根线。
              </p>
            </div>
            <InteractiveSeed size={36} />
            <InteractiveSpark size={24} />
          </div>

          {/* ══ Thread progress indicator ── */}
          <div style={{
            display:'flex', alignItems:'center', gap:0,
            marginBottom:'28px', padding:'0 4px',
          }}>
            {/* Seed node */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink:0 }}>
              <ellipse cx="6" cy="6" rx="3" ry="4.5" fill={GREEN} opacity="0.7" transform="rotate(-15 6 6)" />
            </svg>
            <ThreadLine active={hasContent} />

            {/* Text fragment indicator */}
            <div style={{
              width:'10px', height:'10px', borderRadius:'50%', flexShrink:0,
              backgroundColor: hasContent ? GREEN : LINE,
              transition:'background-color 400ms ease, transform 200ms ease',
              transform: hasContent ? 'scale(1.2)' : 'scale(1)',
            }} />
            <ThreadLine active={!!image} />

            {/* Image fragment indicator */}
            <div style={{
              width:'10px', height:'10px', borderRadius:'3px', flexShrink:0,
              backgroundColor: image ? '#B8A88A' : LINE,
              transition:'background-color 400ms ease, transform 200ms ease',
              transform: image ? 'scale(1.2)' : 'scale(1)',
            }} />
            <ThreadLine active={hasLocation} />

            {/* Place fragment indicator */}
            <div style={{
              width:'10px', height:'10px', borderRadius:'50%', flexShrink:0,
              border: hasLocation ? `2px solid ${GREEN}` : `2px solid ${LINE}`,
              backgroundColor: hasLocation ? GREEN : 'transparent',
              transition:'all 400ms ease',
            }} />
            <ThreadLine active={false} />

            {/* End → future */}
            <span style={{ fontSize:'10px', color:SOFT, flexShrink:0, marginLeft:'6px' }}>···</span>
          </div>

          {/* ═══════════════════════════════════════════ */}
          {/* Fragment 1: Text — The Anchor Thread */}
          {/* ═══════════════════════════════════════════ */}
          <div style={{
            position:'relative', marginBottom:'24px',
            backgroundColor:PAPER, borderRadius:'20px',
            padding:'28px 28px 20px',
            boxShadow:'0 6px 24px rgba(0,0,0,0.03)',
            border: hasContent ? `1px solid ${GREEN}20` : '1px solid transparent',
            transition:'border-color 400ms ease',
          }}>
            {/* Tape at top */}
            <InteractiveTape />

            {/* Fragment label */}
            <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'16px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round">
                <path d="M3 6 Q8 3 12 8 Q16 13 21 5" />
              </svg>
              <span style={{ fontSize:'12px', fontWeight:500, color:SOFT, letterSpacing:'0.5px', textTransform:'uppercase' }}>
                Thread
              </span>
              {hasContent && (
                <span style={{ fontSize:'11px', color:GREEN, marginLeft:'auto' }}>
                  {content.length} / {MAX_CHARS}
                </span>
              )}
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="慢慢写，不用着急……"
              maxLength={MAX_CHARS}
              style={{
                width:'100%', height:'200px', padding:'0',
                border:'none', backgroundColor:'transparent',
                fontSize:'18px', lineHeight:1.9, color:INK,
                resize:'none', outline:'none',
                fontFamily:'Inter, Noto Sans SC, serif',
              }}
            />

            {/* Doodle cluster at bottom-right */}
            <div style={{ position:'absolute', bottom:'8px', right:'16px', display:'flex', gap:'6px', alignItems:'flex-end', pointerEvents:'auto' }}>
              <InteractiveLeaf size={28} />
              <InteractiveSpark size={22} />
              <InteractiveThread size={30} />
            </div>
          </div>

          {/* ═══════════════════════════════════════════ */}
          {/* Fragment 2 + 3: Image & Mood — Visual Threads */}
          {/* ═══════════════════════════════════════════ */}
          <div style={{ display:'flex', gap:'16px', marginBottom:'24px' }}>
            {/* Image Fragment */}
            <div style={{ flex:1 }}>
              {image ? (
                <div style={{
                  position:'relative', borderRadius:'16px', overflow:'hidden',
                  backgroundColor:PAPER, boxShadow:'0 4px 16px rgba(0,0,0,0.04)',
                }}>
                  <div style={{ position:'absolute', top:'-8px', left:'50%', transform:'translateX(-50%)', zIndex:2 }}>
                    <InteractiveTape />
                  </div>
                  <img src={image} alt="" style={{ width:'100%', display:'block' }} />
                  <button type="button" onClick={() => { setImage(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                    style={{
                      position:'absolute', top:'12px', right:'12px',
                      width:'28px', height:'28px', borderRadius:'50%',
                      backgroundColor:'rgba(0,0,0,0.45)', color:'#FFF',
                      border:'none', cursor:'pointer', fontSize:'14px',
                      display:'flex', alignItems:'center', justifyContent:'center',
                    }}>✕</button>
                </div>
              ) : (
                <div onClick={() => fileInputRef.current?.click()}
                  style={{
                    width:'100%', aspectRatio:'1/1', borderRadius:'16px',
                    border:'1px dashed #DED8CF', backgroundColor:PAPER,
                    display:'flex', flexDirection:'column',
                    justifyContent:'center', alignItems:'center',
                    cursor:'pointer', gap:'6px', position:'relative',
                    transition:'border-color 200ms ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = GREEN}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#DED8CF'}
                >
                  {/* Fragment label */}
                  <div style={{ position:'absolute', top:'14px', left:'16px', display:'flex', alignItems:'center', gap:'6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={SOFT} strokeWidth="1.5" strokeLinecap="round">
                      <rect x="3" y="3" width="18" height="18" rx="4" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M3 16 L10 10 L15 14 L21 8" />
                    </svg>
                    <span style={{ fontSize:'11px', fontWeight:500, color:SOFT, letterSpacing:'0.5px', textTransform:'uppercase' }}>
                      Image
                    </span>
                  </div>

                  <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="#B0ADA6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="9" width="38" height="30" rx="4" />
                    <circle cx="17" cy="21" r="4" />
                    <path d="M5 33 L18 22 L27 29 L34 22 L43 29" />
                  </svg>
                  <span style={{ fontSize:'12px', color:SOFT }}>留下今日碎片</span>

                  <div style={{ position:'absolute', bottom:'8px', right:'10px' }}>
                    <InteractiveSeed size={32} />
                  </div>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImage} style={{ display:'none' }} />
            </div>

            {/* Mood Fragment */}
            <div style={{
              flex: 1, display:'flex', flexDirection:'column',
              backgroundColor:PAPER, borderRadius:'16px',
              padding:'20px', gap:'14px',
              boxShadow:'0 4px 16px rgba(0,0,0,0.03)',
              position:'relative',
            }}>
              {/* Fragment label */}
              <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={SOFT} strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8 14 Q10 16 12 14 Q14 12 16 14" />
                  <circle cx="9" cy="10" r="1" fill={SOFT} stroke="none" />
                  <circle cx="15" cy="10" r="1" fill={SOFT} stroke="none" />
                </svg>
                <span style={{ fontSize:'11px', fontWeight:500, color:SOFT, letterSpacing:'0.5px', textTransform:'uppercase' }}>
                  Emotion
                </span>
              </div>

              <div style={{ display:'flex', flexWrap:'wrap', gap:'10px' }}>
                {MOODS.map((m) => (
                  <button key={m} type="button" onClick={() => setMood(m)}
                    style={{
                      width:'44px', height:'44px', borderRadius:'50%',
                      border: mood===m ? `2px solid ${GREEN}` : '2px solid #E8E3DA',
                      backgroundColor: mood===m ? '#F6FAF3' : PAPER,
                      fontSize:'22px', display:'flex', alignItems:'center', justifyContent:'center',
                      cursor:'pointer', transition:'all 180ms ease, transform 200ms ease',
                      transform: mood===m ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >{m}</button>
                ))}
              </div>

              {/* Selected mood preview */}
              <div style={{
                textAlign:'center', fontSize:'36px',
                opacity:0.6, marginTop:'4px',
              }}>
                {mood}
              </div>

              <div style={{ position:'absolute', bottom:'10px', right:'12px' }}>
                <InteractiveSpark size={20} />
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════ */}
          {/* Fragment 4: Place — Location Thread */}
          {/* ═══════════════════════════════════════════ */}
          <div style={{ marginBottom:'28px' }}>
            <button type="button" onClick={handleLocation} disabled={locationLoading}
              style={{
                width:'100%', minHeight:'56px', borderRadius:'16px',
                border: hasLocation ? `1px solid ${GREEN}` : '1px solid #E5E0D8',
                backgroundColor: hasLocation ? '#F6FAF3' : PAPER,
                cursor: locationLoading ? 'not-allowed' : 'pointer',
                display:'flex', alignItems:'center', justifyContent:'center',
                padding:'14px 20px', gap:'10px',
                transition:'all 200ms ease',
                position:'relative',
              }}
            >
              {/* Fragment label */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={hasLocation ? GREEN : SOFT} strokeWidth="1.5" strokeLinecap="round">
                <path d="M12 22 C12 22 20 16 20 10 C20 5.6 16.4 2 12 2 C7.6 2 4 5.6 4 10 C4 16 12 22 12 22 Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span style={{ fontSize:'14px', color: hasLocation ? GREEN : INK, fontWeight: hasLocation ? 500 : 400 }}>
                {locationLoading ? '定位中……' : hasLocation ? '已记住此刻的位置' : '记住此刻的位置'}
              </span>
              {!hasLocation && (
                <span style={{ fontSize:'11px', color:SOFT }}>
                  Place
                </span>
              )}

              <div style={{ position:'absolute', right:'16px', top:'50%', transform:'translateY(-50%)' }}>
                <InteractiveLeaf size={24} />
              </div>
            </button>

            {/* Welcome back */}
            {hasLocation && previousVisits > 0 && (
              <div style={{ marginTop:'12px', padding:'0 4px' }}>
                <p style={{ fontSize:'13px', color:GREEN, lineHeight:1.6, fontWeight:450 }}>
                  欢迎回来。这是你第 {previousVisits} 次来到这里。
                </p>
              </div>
            )}
            {locationError && (
              <p style={{ fontSize:'12px', color:'#EF4444', marginTop:'6px', padding:'0 4px' }}>{locationError}</p>
            )}
          </div>

          {/* ═══════════════════════════════════════════ */}
          {/* Memory Weave Summary */}
          {/* ═══════════════════════════════════════════ */}
          <div style={{
            marginBottom:'32px', padding:'20px 24px',
            backgroundColor:'#FFFEFC', borderRadius:'16px',
            border:'1px solid #EDE8E0',
          }}>
            <MemoryWeave entryCount={entryCount} />

            {/* Fragment count */}
            <div style={{
              display:'flex', alignItems:'center', gap:'8px',
              marginTop:'16px', paddingTop:'12px',
              borderTop:'1px solid #EDE8E0',
            }}>
              <InteractiveThread size={18} />
              <span style={{ fontSize:'12px', color:SOFT }}>
                {fragments > 0
                  ? `${fragments} 根线已经连起来了`
                  : '写下第一行字，开始编织……'}
              </span>
            </div>
          </div>

          {/* ═══════════════════════════════════════════ */}
          {/* Weave Button */}
          {/* ═══════════════════════════════════════════ */}
          <button type="button" onClick={handleSave} disabled={!hasContent || saving}
            style={{
              width:'100%', height:'64px', borderRadius:'18px',
              fontSize:'17px', fontWeight:500, border:'none',
              backgroundColor: hasContent ? INK : '#D9D9D9',
              color:'#FFF', cursor: hasContent ? 'pointer' : 'not-allowed',
              display:'flex', alignItems:'center', justifyContent:'center', gap:'10px',
              transition:'all 200ms ease',
              opacity: hasContent ? 1 : 0.5,
            }}
            onMouseEnter={(e) => { if (hasContent) { e.currentTarget.style.backgroundColor = '#2D2D2D'; e.currentTarget.style.transform = 'translateY(-2px)' }}}
            onMouseLeave={(e) => { if (hasContent) { e.currentTarget.style.backgroundColor = INK; e.currentTarget.style.transform = 'translateY(0)' }}}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 18 Q8 10 12 14 Q16 18 21 6" />
              <circle cx="21" cy="6" r="1.5" fill="#FFF" stroke="none" />
            </svg>
            <span>{saving ? '编织中……' : '织成 Today Thread'}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12 Q8 18 12 14 Q16 10 21 6" />
              <circle cx="21" cy="6" r="1.5" fill="#FFFFFF80" stroke="none" />
            </svg>
          </button>

        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* Sidebar */}
        {/* ═══════════════════════════════════════════ */}
        <div style={{ flex:'0 0 360px' }}>
          <Sidebar draft={draft} />
        </div>
      </div>

      <style>{doodleStyles}</style>

      {/* ═══════════════════════════════════════════ */}
      {/* Save Ritual — Thread grows, then fades */}
      {/* ═══════════════════════════════════════════ */}
      {ritualActive && (
        <div style={{
          position:'fixed', top:0, left:0, right:0, bottom:0, zIndex:100,
          display:'flex', alignItems:'center', justifyContent:'center',
          pointerEvents:'none',
        }}>
          <div style={{
            display:'flex', flexDirection:'column', alignItems:'center', gap:'16px',
            animation:'ritualEnter 400ms ease-out, ritualFade 600ms ease-in 1800ms forwards',
          }}>
            {/* Thread grow animation */}
            <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
              <path
                d="M0 20 Q30 8 60 20 Q90 32 120 20"
                stroke={GREEN}
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="160"
                strokeDashoffset="160"
                style={{ animation: 'ritualThread 600ms ease-out forwards' }}
              />
              {/* End seed */}
              <circle cx="120" cy="20" r="3" fill={GREEN} opacity="0"
                style={{ animation: 'ritualSeed 400ms ease-out 500ms forwards' }}
              />
            </svg>
            <p style={{
              fontSize:'16px', fontWeight:500, color:INK, margin:0,
              opacity:0,
              animation:'ritualText 400ms ease-out 700ms forwards',
            }}>
              今天，又织上一针。
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes ritualEnter {
          from { opacity:0; }
          to { opacity:1; }
        }
        @keyframes ritualFade {
          from { opacity:1; }
          to { opacity:0; }
        }
        @keyframes ritualThread {
          to { stroke-dashoffset: 0; }
        }
        @keyframes ritualSeed {
          to { opacity: 0.7; }
        }
        @keyframes ritualText {
          to { opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}
