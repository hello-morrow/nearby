'use client'
import { useEffect, useState } from 'react'
import type { DiaryEntry } from '@/types'

export default function MobileTimeline(){const[e,setE]=useState<DiaryEntry[]>([])
useEffect(()=>{setE(JSON.parse(localStorage.getItem('nearby_entries')||'[]'))},[])
const fd=(iso:string)=>{const d=new Date(iso);const t=new Date();if(d.toDateString()===t.toDateString())return'今天';return`${d.getMonth()+1}月${d.getDate()}日`}
return(<div style={{padding:'24px 20px 100px',backgroundColor:'#F7F6F3',minHeight:'100dvh'}}>
<h2 style={{fontSize:'22px',fontWeight:700,color:'#1A1A1A',margin:'0 0 20px'}}>最近的日子</h2>
{e.length===0&&<p style={{color:'#8C8C86',textAlign:'center',marginTop:'60px',fontSize:'15px'}}>还没有留下今天的记忆。</p>}
{e.map(en=><div key={en.id} style={{marginBottom:'16px',padding:'16px',backgroundColor:'#FFF',borderRadius:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.04)'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
<span style={{fontSize:'13px',color:'#8C8C86'}}>{fd(en.date)}</span><span style={{fontSize:'20px'}}>{en.mood}</span></div>
{en.content&&<p style={{fontSize:'15px',color:'#1A1A1A',lineHeight:1.7}}>{en.content}</p>}
{en.image&&<img src={en.image} alt="" style={{width:'100%',borderRadius:'12px',marginTop:'8px'}}/>}</div>)}</div>)}