'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getDraft, clearDraft } from '@/lib/mobile-store'
import type { DiaryEntry } from '@/types'

export default function MobilePreview(){const r=useRouter();const d=getDraft();const[sv,setSv]=useState(false);const[sd,setSd]=useState(false);const[wv,setWv]=useState(false)
const hs=()=>{setSv(true);const e:DiaryEntry={id:Date.now().toString(),date:new Date().toISOString(),content:d.content,mood:d.mood,image:d.image,latitude:d.latitude,longitude:d.longitude};const x=JSON.parse(localStorage.getItem('nearby_entries')||'[]');x.unshift(e);localStorage.setItem('nearby_entries',JSON.stringify(x));setTimeout(()=>setSd(true),200);setTimeout(()=>setWv(true),600);setTimeout(()=>{clearDraft();r.push('/mobile/timeline')},2600)}
return(<div style={{padding:'24px 20px 100px',minHeight:'100dvh',backgroundColor:'#F7F6F3',display:'flex',flexDirection:'column'}}>
<div style={{flex:1,display:'flex',flexDirection:'column',gap:'16px',transform:sd?'scale(0.97)':'scale(1)',opacity:sd?0.85:1,transition:'all 400ms ease-out'}}>
<div style={{fontSize:'32px',textAlign:'center',margin:'20px 0'}}>{d.mood}</div>
{d.content&&<p style={{fontSize:'16px',lineHeight:1.8,color:'#1A1A1A',whiteSpace:'pre-wrap'}}>{d.content}</p>}
{d.image&&<img src={d.image} alt="" style={{width:'100%',borderRadius:'16px'}}/>}
<p style={{fontSize:'12px',color:'#BDBDBD',textAlign:'center',marginTop:'12px'}}>Every memory becomes another thread.</p></div>
{!sd?<button onClick={hs} disabled={sv} style={{width:'100%',height:'50px',borderRadius:'18px',fontSize:'16px',fontWeight:500,border:'none',backgroundColor:'#1A1A1A',color:'#FFF',cursor:'pointer'}}>{sv?'保存中……':'留住今天'}</button>:
<div style={{textAlign:'center',marginTop:'16px'}}><div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'8px'}}><div style={{width:'6px',height:'6px',borderRadius:'50%',backgroundColor:'#D8B37A',opacity:wv?1:0,transition:'opacity 300ms 200ms'}}/><div style={{flex:1,height:'2px',backgroundColor:'#E5E0D8',position:'relative',overflow:'hidden'}}><div style={{position:'absolute',left:0,top:0,height:'100%',background:'#D8B37A',width:wv?'100%':'0%',transition:'width 600ms ease-out'}}/></div></div><p style={{fontSize:'13px',color:'#8C8C86',lineHeight:1.6}}>今天，你留下了一根新的线。</p></div>}</div>)}