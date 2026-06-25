'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { setDraft } from '@/lib/mobile-store'

export default function MobilePlace(){const r=useRouter();const[ld,setLd]=useState(false);const[dn,setDn]=useState(false);const[er,setEr]=useState('')
const h=()=>{if(!navigator.geolocation){setEr('不支持定位');return};setLd(true);navigator.geolocation.getCurrentPosition(p=>{setDraft({latitude:p.coords.latitude,longitude:p.coords.longitude});setDn(true);setLd(false)},()=>{setEr('无法获取位置');setLd(false)})}
return(<div style={{display:'flex',flexDirection:'column',padding:'24px',flex:1,minHeight:'100%'}}>
<h2 style={{fontSize:'32px',fontWeight:700,lineHeight:1.15,color:'#1E1E1E',marginBottom:'32px'}}>记住此刻的位置。</h2>
<div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:'16px'}}>
{!dn?<button onClick={h} disabled={ld} style={{width:'100%',minHeight:'80px',borderRadius:'20px',border:'1px solid #E8E5E0',backgroundColor:'#FFF',fontSize:'16px',color:'#1E1E1E',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'4px'}}><span>📍 {ld?'定位中……':'获取当前位置'}</span><span style={{fontSize:'12px',color:'#B0B0B0'}}>自动记录此刻的位置</span></button>:
<div style={{width:'100%',padding:'24px',borderRadius:'20px',backgroundColor:'#F0FDF4',border:'1px solid #A8D5A2',textAlign:'center'}}><p style={{fontSize:'18px',color:'#388E3C',fontWeight:500}}>✓ 已记住此刻的位置</p><p style={{fontSize:'14px',color:'#8C8C8C',marginTop:'8px'}}>这里</p></div>}
{er&&<p style={{fontSize:'13px',color:'#EF4444'}}>{er}</p>}</div>
<button onClick={()=>r.push('/mobile/preview')} style={{width:'100%',height:'56px',borderRadius:'18px',marginTop:'24px',fontSize:'16px',fontWeight:500,border:'none',backgroundColor:'#1E1E1E',color:'#FFF',cursor:'pointer'}}>继续</button></div>)}