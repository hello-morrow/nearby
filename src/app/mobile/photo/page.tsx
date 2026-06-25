'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { setDraft } from '@/lib/mobile-store'

export default function MobilePhoto(){const r=useRouter();const[img,setImg]=useState<string|null>(null);const f=useRef<HTMLInputElement>(null)
const h=(e:React.ChangeEvent<HTMLInputElement>)=>{const fl=e.target.files?.[0];if(!fl)return;const rd=new FileReader();rd.onload=()=>setImg(rd.result as string);rd.readAsDataURL(fl)}
return(<div style={{display:'flex',flexDirection:'column',padding:'24px',flex:1,minHeight:'100%'}}>
<h2 style={{fontSize:'32px',fontWeight:700,lineHeight:1.15,color:'#1E1E1E',marginBottom:'32px'}}>留下一张照片。</h2>
{img?<div style={{flex:1,borderRadius:'20px',overflow:'hidden',marginBottom:'24px'}}><img src={img} alt="" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'20px'}}/></div>:
<div onClick={()=>f.current?.click()} style={{flex:1,borderRadius:'20px',border:'2px dashed #D1D1D1',backgroundColor:'#FFF',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',cursor:'pointer',gap:'12px',marginBottom:'24px'}}>
<svg width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="#B0B0B0" strokeWidth="1.5"><rect x="4" y="8" width="40" height="32" rx="4"/><circle cx="17" cy="20" r="4"/><path d="M4 34l12-12 8 8 6-6 14 10"/></svg>
<span style={{fontSize:'16px',color:'#1E1E1E'}}>点击上传照片</span><span style={{fontSize:'13px',color:'#B0B0B0'}}>支持 JPG / PNG · 最大 10MB</span></div>}
<input ref={f} type="file" accept="image/*" onChange={h} style={{display:'none'}}/>
<button onClick={()=>{setDraft({image:img});r.push('/mobile/place')}} style={{width:'100%',height:'56px',borderRadius:'18px',fontSize:'16px',fontWeight:500,border:'none',backgroundColor:'#1E1E1E',color:'#FFF',cursor:'pointer'}}>继续</button></div>)}