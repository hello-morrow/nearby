'use client'
import { useEffect, useState } from 'react'
import type { DiaryEntry } from '@/types'

export default function MobileTimeline(){const[e,setE]=useState<DiaryEntry[]>([])
useEffect(()=>{setE(JSON.parse(localStorage.getItem('nearby_entries')||'[]'))},[])
const fd=(iso:string)=>{const d=new Date(iso);return `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`}
return(<div style={{padding:'24px',display:'flex',flexDirection:'column',gap:'20px'}}>
<h2 style={{fontSize:'24px',fontWeight:700,color:'#1E1E1E'}}>留在这里的记忆</h2>
{e.length===0&&<p style={{color:'#8C8C8C',textAlign:'center',marginTop:'80px'}}>今天，还没有留下新的故事。</p>}
{e.map(en=><div key={en.id} style={{backgroundColor:'#FCFBF8',borderRadius:'20px',padding:'24px',boxShadow:'0 8px 30px rgba(0,0,0,0.04)',display:'flex',flexDirection:'column',gap:'12px'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><span style={{fontSize:'14px',color:'#8C8C8C'}}>{fd(en.date)}</span><span style={{fontSize:'24px'}}>{en.mood}</span></div>
{en.content&&<p style={{fontSize:'15px',color:'#1E1E1E',lineHeight:1.7}}>{en.content}</p>}
{en.image&&<img src={en.image} alt="" style={{width:'100%',borderRadius:'12px'}}/>}</div>)}</div>)}