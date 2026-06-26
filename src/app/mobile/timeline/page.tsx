'use client'
import { useEffect, useState } from 'react'
import type { DiaryEntry } from '@/types'

export default function MobileTimeline(){const[e,setE]=useState<DiaryEntry[]>([])
useEffect(()=>{setE(JSON.parse(localStorage.getItem('nearby_entries')||'[]'))},[])
const fd=(iso:string)=>{const d=new Date(iso);return `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`}
return(<div style={{padding:'20px',display:'flex',flexDirection:'column',gap:'16px',backgroundColor:'#F9F8F6',minHeight:'100dvh'}}>
<h2 style={{fontSize:'22px',fontWeight:700,color:'#1D1D1F',margin:'4px 0 8px'}}>留在这里的记忆</h2>
{e.length===0&&<p style={{color:'#8C8C8C',textAlign:'center',marginTop:'60px',fontSize:'15px'}}>今天，还没有留下新的故事。</p>}
{e.map(en=><div key={en.id} style={{backgroundColor:'#FFFDFB',borderRadius:'20px',padding:'20px',boxShadow:'0 4px 16px rgba(0,0,0,0.04)',display:'flex',flexDirection:'column',gap:'10px',width:'100%'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><span style={{fontSize:'13px',color:'#8C8C8C'}}>{fd(en.date)}</span><span style={{fontSize:'22px'}}>{en.mood}</span></div>
{en.content&&<p style={{fontSize:'15px',color:'#1D1D1F',lineHeight:1.7}}>{en.content}</p>}
{en.image&&<img src={en.image} alt="" style={{width:'100%',borderRadius:'12px'}}/>}</div>)}</div>)}