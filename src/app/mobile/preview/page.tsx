'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getDraft, clearDraft } from '@/lib/mobile-store'
import type { DiaryEntry } from '@/types'

export default function MobilePreview(){const r=useRouter();const d=getDraft();const[sv,setSv]=useState(false);const[sd,setSd]=useState(false);const[wv,setWv]=useState(false)
const hs=()=>{setSv(true);const e:DiaryEntry={id:Date.now().toString(),date:new Date().toISOString(),content:d.content,mood:d.mood,image:d.image,latitude:d.latitude,longitude:d.longitude};const x=JSON.parse(localStorage.getItem('nearby_entries')||'[]');x.unshift(e);localStorage.setItem('nearby_entries',JSON.stringify(x));setSv(false);setSd(true);setTimeout(()=>setWv(true),400);setTimeout(()=>{clearDraft();r.push('/mobile/timeline')},2600)}
return(<div style={{display:'flex',flexDirection:'column',padding:'20px',minHeight:'100dvh',backgroundColor:'#F9F8F6',gap:'20px'}}>
<div style={{flex:1,display:'flex',flexDirection:'column',gap:'20px',transform:sd?'scale(0.96)':'scale(1)',opacity:sd?0.9:1,transition:'transform 400ms ease-out, opacity 400ms ease-out'}}>
<div style={{fontSize:'36px',textAlign:'center'}}>{d.mood}</div>
{d.content&&<p style={{fontSize:'16px',lineHeight:1.8,color:'#1D1D1F',whiteSpace:'pre-wrap'}}>{d.content}</p>}
{d.image&&<img src={d.image} alt="" style={{width:'100%',borderRadius:'16px'}}/>}
{d.latitude!==null&&<p style={{fontSize:'13px',color:'#8C8C8C'}}>📍 {d.latitude!.toFixed(4)}, {d.longitude!.toFixed(4)}</p>}
<p style={{fontSize:'12px',color:'#BDBDBD'}}>Every memory becomes another thread.</p></div>
{!sd?<button onClick={hs} disabled={sv} style={{width:'100%',height:'52px',borderRadius:'18px',fontSize:'16px',fontWeight:500,border:'none',backgroundColor:'#1D1D1F',color:'#FFF',cursor:'pointer'}}>{sv?'保存中……':'留住今天'}</button>:
<div style={{textAlign:'center'}}><div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'10px'}}><div style={{width:'6px',height:'6px',borderRadius:'50%',backgroundColor:'#88A97A',flexShrink:0,opacity:wv?1:0,transition:'opacity 300ms ease-out'}}/><div style={{flex:1,height:'2px',backgroundColor:'#E8E5E0',position:'relative',overflow:'hidden'}}><div style={{position:'absolute',left:0,top:0,height:'100%',background:'linear-gradient(90deg, #88A97A, #D4A373)',width:wv?'100%':'0%',transition:'width 600ms ease-out'}}/></div></div><p style={{fontSize:'13px',color:'#1D1D1F',lineHeight:1.6}}>今天，<br/>你又为人生织下了一根新的线。</p></div>}</div>)}