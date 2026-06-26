'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { setDraft } from '@/lib/mobile-store'

export default function MobilePhoto(){const r=useRouter();const[img,setImg]=useState<string|null>(null);const f=useRef<HTMLInputElement>(null)
const h=(e:React.ChangeEvent<HTMLInputElement>)=>{const fl=e.target.files?.[0];if(!fl)return;const rd=new FileReader();rd.onload=()=>setImg(rd.result as string);rd.readAsDataURL(fl)}
return(<div style={{display:'flex',flexDirection:'column',padding:'20px',minHeight:'100dvh',backgroundColor:'#F9F8F6',gap:'20px'}}>
<h2 style={{fontSize:'28px',fontWeight:700,lineHeight:1.15,color:'#1D1D1F',margin:'8px 0 0'}}>留下一张照片。</h2>
{img?<div style={{flex:1,borderRadius:'20px',overflow:'hidden'}}><img src={img} alt="" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'20px'}}/></div>:
<div onClick={()=>f.current?.click()} style={{flex:1,borderRadius:'20px',border:'1px dashed #DED8CF',backgroundColor:'#FFFDFB',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',cursor:'pointer',gap:'12px'}}>
<svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#8D8D8D" strokeWidth="1.6"><rect x="5" y="9" width="38" height="30" rx="4"/><circle cx="17" cy="21" r="4"/><path d="M5 33 L18 22 L27 29 L34 22 L43 29"/></svg>
<span style={{fontSize:'15px',color:'#7B7B7B'}}>留下今天的一张小纸片</span></div>}
<input ref={f} type="file" accept="image/*" onChange={h} style={{display:'none'}}/>
<button onClick={()=>{setDraft({image:img});r.push('/mobile/place')}} style={{width:'100%',height:'52px',borderRadius:'18px',fontSize:'16px',fontWeight:500,border:'none',backgroundColor:'#1D1D1F',color:'#FFF',cursor:'pointer'}}>继续</button></div>)}