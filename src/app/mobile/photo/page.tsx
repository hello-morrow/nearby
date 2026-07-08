'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { setDraft } from '@/lib/mobile-store'

export default function MobilePhoto(){const r=useRouter();const[img,setImg]=useState<string|null>(null);const f=useRef<HTMLInputElement>(null)
const h=(e:React.ChangeEvent<HTMLInputElement>)=>{const fl=e.target.files?.[0];if(!fl)return;const rd=new FileReader();rd.onload=()=>setImg(rd.result as string);rd.readAsDataURL(fl)}
return(<div style={{padding:'24px 20px 100px',minHeight:'100dvh',backgroundColor:'#F7F6F3',display:'flex',flexDirection:'column'}}>
<h2 style={{fontSize:'28px',fontWeight:700,lineHeight:1.15,color:'#1A1A1A',margin:'8px 0 20px'}}>留下一张照片</h2>
{img?<div style={{flex:1,borderRadius:'20px',overflow:'hidden',marginBottom:'16px'}}><img src={img} alt="" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'20px'}}/></div>:
<div onClick={()=>f.current?.click()} style={{flex:1,borderRadius:'20px',border:'1px dashed #D9D5CF',backgroundColor:'#FFFEFC',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',cursor:'pointer',marginBottom:'16px'}}>
<span style={{fontSize:'40px',color:'#D9D5CF',marginBottom:'8px'}}>＋</span>
<span style={{fontSize:'15px',color:'#8C8C86'}}>点击上传</span></div>}
<input ref={f} type="file" accept="image/*" onChange={h} style={{display:'none'}}/>
<button onClick={()=>{setDraft({image:img});r.push('/mobile/preview')}} style={{width:'100%',height:'50px',borderRadius:'18px',fontSize:'16px',fontWeight:500,border:'none',backgroundColor:'#1A1A1A',color:'#FFF',cursor:'pointer'}}>完成</button></div>)}