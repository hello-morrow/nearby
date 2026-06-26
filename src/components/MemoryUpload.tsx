'use client'

import { useRef, useState } from 'react'
import { colors, radius } from '@/tokens'

interface MemoryUploadProps {
  image: string | null
  onChange: (base64: string | null) => void
}

export default function MemoryUpload({ image, onChange }: MemoryUploadProps) {
  const ref = useRef<HTMLInputElement>(null)
  const [hover, setHover] = useState(false)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const r = new FileReader()
    r.onload = () => onChange(r.result as string)
    r.readAsDataURL(file)
  }

  if (image) {
    return (
      <div style={{ position:'relative', borderRadius: radius.card, overflow:'hidden' }}>
        <img src={image} alt="" style={{ width:'100%', display:'block' }} />
        <button onClick={() => { onChange(null); if(ref.current) ref.current.value = '' }}
          style={{ position:'absolute', top:10, right:10, width:28, height:28, borderRadius:'50%', backgroundColor:'rgba(0,0,0,0.5)', color:'#FFF', border:'none', cursor:'pointer' }}>✕</button>
      </div>
    )
  }

  return (
    <div
      onClick={() => ref.current?.click()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width:'100%', aspectRatio:'4/3',
        borderRadius: radius.card,
        border: `1px dashed ${hover ? colors.ink : '#DED8CF'}`,
        backgroundColor: hover ? '#FCFAF5' : colors.surface,
        display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',
        cursor:'pointer', gap:'8px',
        transition: `background 220ms ease, border-color 220ms ease`,
      }}
    >
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="#8D8D8D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="9" width="38" height="30" rx="4" /><circle cx="17" cy="21" r="4" /><path d="M5 33 L18 22 L27 29 L34 22 L43 29" />
      </svg>
      <span style={{ fontSize:'15px', color:'#7B7B7B' }}>留下今天的一张小纸片</span>
      <span style={{ fontSize:'12px', color:'#A4A4A4' }}>以后，它会陪你一起变成回忆。</span>
      <input ref={ref} type="file" accept="image/*" onChange={handleFile} style={{ display:'none' }} />
    </div>
  )
}