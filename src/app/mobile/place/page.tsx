'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { setDraft } from '@/lib/mobile-store'

export default function MobilePlace(){const r=useRouter();const[ld,setLd]=useState(false);const[dn,setDn]=useState(false);const[er,setEr]=useState('')
const h=()=>{if(!navigator.geolocation){setEr('不支持定位');return};setLd(true);navigator.geolocation.getCurrentPosition(p=>{setDraft({latitude:p.coords.latitude,longitude:p.coords.longitude});setDn(true);setLd(false)},()=>{setEr('无法获取位置');setLd(false)})}
return(<div style={{display:'flex',flexDirection:'column',padding:'20px',minHeight:'100dvh',backgroundColor:'#F9F8F6',gap:'20px'}}>
<h2 style={{fontSize:'28px',fontWeight:700,lineHeight:1.15,color:'#1D1D1F',margin:'8px 0 0'}}>记住此刻的位置。</h2>
<div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',gap:'16px'}}>
{!dn?<button onClick={h} disabled={ld} style={{width:'100%',minHeight:'64px',borderRadius:'20px',border:'1px solid #E8E5E0',backgroundColor:'#FFFDFB',fontSize:'16px',color:'#1D1D1F',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'4px'}}><span>📍 {ld?'定位中……':'获取当前位置'}</span></button>:
<div style={{padding:'20px',borderRadius:'20px',backgroundColor:'#F0FDF4',border:'1px solid #88A97A',textAlign:'center'}}><p style={{fontSize:'16px',color:'#88A97A',fontWeight:500,margin:0}}>✓ 已记住此刻的位置</p></div>}
{er&&<p style={{fontSize:'13px',color:'#EF4444'}}>{er}</p>}</div>
<button onClick={()=>r.push('/mobile/preview')} style={{width:'100%',height:'52px',borderRadius:'18px',fontSize:'16px',fontWeight:500,border:'none',backgroundColor:'#1D1D1F',color:'#FFF',cursor:'pointer'}}>继续</button></div>)}