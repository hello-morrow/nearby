'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getDraft, clearDraft } from '@/lib/mobile-store'
import type { DiaryEntry } from '@/types'

export default function MobilePreview(){const r=useRouter();const d=getDraft();const[sv,setSv]=useState(false);const[sd,setSd]=useState(false);const[wv,setWv]=useState(false)
const hs=()=>{setSv(true);const e:DiaryEntry={id:Date.now().toString(),date:new Date().toISOString(),content:d.content,mood:d.mood,image:d.image,latitude:d.latitude,longitude:d.longitude};const x=JSON.parse(localStorage.getItem('nearby_entries')||'[]');x.unshift(e);localStorage.setItem('nearby_entries',JSON.stringify(x));setSv(false);setSd(true);setTimeout(()=>setWv(true),400);setTimeout(()=>{clearDraft();r.push('/mobile/timeline')},2600)}
return(<div style={{display:'flex',flexDirection:'column',padding:'24px',flex:1,minHeight:'100%'}}>
<div style={{flex:1,display:'flex',flexDirection:'column',gap:'24px',transform:sd?'scale(0.96)':'scale(1)',opacity:sd?0.9:1,transition:'transform 400ms ease-out, opacity 400ms ease-out'}}>
<div style={{fontSize:'40px',textAlign:'center'}}>{d.mood}</div>
{d.content&&<p style={{fontSize:'18px',lineHeight:1.8,color:'#1E1E1E',whiteSpace:'pre-wrap'}}>{d.content}</p>}
{d.image&&<img src={d.image} alt="" style={{width:'100%',borderRadius:'16px'}}/>}
{d.latitude!==null&&<p style={{fontSize:'14px',color:'#8C8C8C'}}>📍 这里 · {d.latitude!.toFixed(4)}, {d.longitude!.toFixed(4)}</p>}
<p style={{fontSize:'13px',color:'#AAA',marginTop:'8px'}}>Every memory becomes another thread.</p></div>
{!sd?<button onClick={hs} disabled={sv} style={{width:'100%',height:'60px',borderRadius:'18px',fontSize:'16px',fontWeight:500,border:'none',backgroundColor:'#1E1E1E',color:'#FFF',cursor:'pointer',marginTop:'24px'}}>{sv?'保存中……':'留住今天'}</button>:
<div style={{marginTop:'24px',textAlign:'center'}}><div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'12px'}}><div style={{width:'8px',height:'8px',borderRadius:'50%',backgroundColor:'#A8D5A2',flexShrink:0,opacity:wv?1:0,transition:'opacity 300ms ease-out'}}/><div style={{flex:1,height:'2px',backgroundColor:'#E8E5E0',position:'relative',overflow:'hidden'}}><div style={{position:'absolute',left:0,top:0,height:'100%',background:'linear-gradient(90deg, #A8D5A2, #388E3C)',width:wv?'100%':'0%',transition:'width 600ms ease-out'}}/></div></div><p style={{fontSize:'14px',color:'#1E1E1E',lineHeight:1.6}}>今天，<br/>你又为人生织下了一根新的线。</p></div>}</div>)}