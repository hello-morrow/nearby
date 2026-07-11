'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { DiaryEntry } from '@/types'

const COUNT = { seed:1, sprout:3, young:7, tree:30, forest:100 }
function getStage(c:number) { if(c>=COUNT.forest) return 'forest'; if(c>=COUNT.tree) return 'tree'; if(c>=COUNT.young) return 'young'; if(c>=COUNT.sprout) return 'sprout'; return 'seed' }
const St = { seed:{label:'Seed',desc:'刚刚破土而出'}, sprout:{label:'Sprout',desc:'正在茁壮成长'}, young:{label:'Young Tree',desc:'已经长出枝干'}, tree:{label:'Tree',desc:'已经长成小树'}, forest:{label:'Forest',desc:'一座小小的森林'} }

function fd(iso:string){const d=new Date(iso);return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`}
function ff(iso:string){const d=new Date(iso);return `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`}
function ft(e:DiaryEntry){if(!e.content)return '今天的记忆';return e.content.split('\n')[0].trim().slice(0,16)+(e.content.length>16?'…':'')}

export default function GardenPage() {
  const [entries,setEntries]=useState<DiaryEntry[]>([])
  const [expanded,setExpanded]=useState<string|null>(null)
  const [anim,setAnim]=useState<'a'|'b'|'c'|'d'>('a')
  const [lifeMsg,setLifeMsg]=useState(false)
  const count = entries.length; const stage = getStage(count); const s = St[stage]
  const firstD=entries.length?new Date(entries[entries.length-1].date):new Date()
  const days=Math.max(1,Math.floor((Date.now()-firstD.getTime())/86400000))

  useEffect(()=>{
    setEntries(JSON.parse(localStorage.getItem('nearby_entries')||'[]'))
    setAnim('a');setTimeout(()=>setAnim('b'),400);setTimeout(()=>setAnim('c'),900);setTimeout(()=>setAnim('d'),1600)
  },[])

  const showMem = entries.slice(0,Math.min(5,entries.length))

  return (
    <div style={{minHeight:'100vh',backgroundColor:'#F7F6F3',display:'flex',justifyContent:'center',padding:'40px 24px'}}>
      <style>{`@keyframes fsu{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes fi{from{opacity:0}to{opacity:1}}
@keyframes sw{0%,100%{transform:rotate(-0.6deg)}50%{transform:rotate(0.6deg)}}
@keyframes fl{0%,100%{transform:translateY(0);opacity:0.25}50%{transform:translateY(-6px);opacity:0.5}}
.hi{animation:fsu 500ms ease-out both}
.mc{animation:fsu 800ms ease-out 200ms both}
.fi-i{animation:fi 400ms ease-out both}
.ex{animation:fi 300ms ease-out}
.fo{animation:fsu 600ms ease-out 500ms both}
.sway{animation:sw 4s ease-in-out infinite;transform-origin:bottom center}
.float{animation:fl 3s ease-in-out infinite}`}</style>

      <div style={{width:'100%',maxWidth:'680px',display:'flex',flexDirection:'column'}}>
        {/* Header */}
        <div className="hi" style={{marginBottom:'36px',marginTop:'20px'}}>
          <h1 style={{fontSize:'40px',fontWeight:500,lineHeight:1.15,color:'#1A1A1A',margin:'0 0 6px'}}>花园</h1>
          <p style={{fontSize:'16px',color:'#8C8C86',lineHeight:1.6,margin:0}}>Garden · 记忆成长空间</p>
          <p style={{fontSize:'12px',color:'#BDBDBD',margin:'4px 0 0'}}>留下的每一天，都在这里慢慢生长。</p>
        </div>

        {/* Plant Card */}
        <div className="mc" style={{backgroundColor:'#FFFDFB',borderRadius:'24px',padding:'36px 28px 28px',marginBottom:'24px',boxShadow:'0 2px 12px rgba(0,0,0,0.04)',position:'relative',overflow:'visible'}}>
          {/* Stage */}
          <div style={{textAlign:'center',marginBottom:'12px'}}>
            <span style={{display:'inline-block',padding:'3px 12px',borderRadius:'10px',backgroundColor:'#F0EDE8',fontSize:'12px',color:'#8C8C86',fontWeight:500}}>✦ {s.label}</span>
            <p style={{fontSize:'11px',color:'#BDBDBD',margin:'4px 0 0'}}>{s.desc}</p>
          </div>

          {/* ── Central Plant ── */}
          <div style={{position:'relative',height:'170px',display:'flex',justifyContent:'center',alignItems:'flex-end',marginBottom:'16px'}}>
            {/* Float particles */}
            {anim==='d'&&<><div className="float" style={{position:'absolute',right:'18%',top:'25%',width:'4px',height:'4px',borderRadius:'50%',backgroundColor:'#D8B37A'}}/>
            <div className="float" style={{position:'absolute',left:'15%',top:'40%',width:'3px',height:'3px',borderRadius:'50%',backgroundColor:'#D8B37A',animationDelay:'1.2s'}}/>
            <div className="float" style={{position:'absolute',right:'10%',top:'10%',width:'3px',height:'3px',borderRadius:'50%',backgroundColor:'#D8B37A',animationDelay:'0.6s'}}/></>}

            <div className="sway" style={{position:'relative',display:'flex',flexDirection:'column',alignItems:'center'}}>
              {/* Soil — 3 layers */}
              {anim!=='a'&&<svg width="100" height="20" viewBox="0 0 100 20" fill="none" style={{position:'absolute',bottom:'-2px'}}>
                <path d="M20 14 Q30 8 50 10 Q70 8 80 14 Q72 18 50 18 Q28 18 20 14Z" fill="#C4B8A8" opacity="0.08"/>
                <path d="M25 12 Q35 6 50 8 Q65 6 75 12 Q68 14 50 14 Q32 14 25 12Z" fill="#C4B8A8" opacity="0.06"/>
              </svg>}

              {/* Plant by stage — from memory-growth library */}
              {stage==='seed'&&<img src="/assets/memory-growth/seed.svg" alt="Seed" style={{height:'160px',opacity:anim!=='a'?1:0,transition:'opacity 600ms'}}/>}
              {stage==='sprout'&&<img src="/assets/memory-growth/sprout.svg" alt="Sprout" style={{height:'180px',opacity:anim!=='a'?1:0,transition:'opacity 600ms'}}/>}
              {stage==='young'&&<img src="/assets/memory-growth/young-tree.svg" alt="Young Tree" style={{height:'200px',opacity:anim!=='a'?1:0,transition:'opacity 600ms'}}/>}
              {stage==='tree'&&<img src="/assets/memory-growth/tree.svg" alt="Tree" style={{height:'220px',opacity:anim!=='a'?1:0,transition:'opacity 600ms'}}/>}
              {stage==='forest'&&<img src="/assets/memory-growth/forest.svg" alt="Forest" style={{height:'220px',opacity:anim!=='a'?1:0,transition:'opacity 600ms'}}/>}

              {/* Soil dots */}
              <div style={{display:'flex',gap:'3px',marginTop:'4px'}}>
                {Array.from({length:Math.min(count,5)}).map((_,i)=><div key={i} style={{width:'3px',height:'3px',borderRadius:'50%',backgroundColor:'#C4B8A8',opacity:0.3}}/>)}
              </div>
            </div>
          </div>

          {/* ── Memory Leaves ── */}
          {showMem.length>0&&(
            <div style={{position:'relative',paddingTop:'4px',display:'flex',flexDirection:'column',gap:'6px'}}>
              {/* Branch lines */}
              <svg width="100%" height="100%" style={{position:'absolute',top:0,left:0,pointerEvents:'none',zIndex:0}}>
                {showMem.map((_,i)=><line key={i} x1="50%" y1="0" x2={`${30+i*20}%`} y2={`${20+i*30}px`} stroke="#D9D2C6" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.35"/>)}
              </svg>

              {showMem.map((entry,idx)=>{
                const isOpen=expanded===entry.id
                return (
                  <div key={entry.id} style={{position:'relative',zIndex:1,display:'flex',flexDirection:'column',alignItems:idx===1?'center':idx===2?'flex-end':'flex-start'}}>
                    <div className="fi-i" style={{animationDelay:`${idx*100+300}ms`,display:'flex',flexDirection:'column',alignItems:'center',gap:'3px',cursor:'pointer'}}
                      onClick={()=>setExpanded(isOpen?null:entry.id)}
                      onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)'}}
                      onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)'}}>
                      {/* Leaf card */}
                      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'1px',padding:'8px 14px',borderRadius:'12px',backgroundColor:isOpen?'#F0EDE8':'transparent',transition:'all 180ms ease',maxWidth:'160px'}}>
                        <img src={`/assets/memory-growth/leaf-${String((idx%6)+1).padStart(2,'0')}.svg`} alt="" style={{width:'16px',height:'14px',transform:`rotate(${[15,-12,8][idx%3]}deg)`}}/>
                        <span style={{fontSize:'10px',color:'#8C8C86',fontWeight:500}}>{idx===2&&count>2?'今天！':fd(entry.date)}</span>
                        <span style={{fontSize:'14px',lineHeight:1.2}}>{entry.mood}</span>
                      </div>
                    </div>

                    {/* Expanded */}
                    {isOpen&&(
                      <div className="ex" style={{marginTop:'6px',padding:'12px',backgroundColor:'#FFFDFB',borderRadius:'12px',boxShadow:'0 4px 20px rgba(0,0,0,0.08)',width:'240px',textAlign:'left',zIndex:10}}>
                        <p style={{fontSize:'11px',color:'#B0B0B0',marginBottom:'6px'}}>{ff(entry.date)} · {entry.mood}</p>
                        {entry.content&&<p style={{fontSize:'13px',color:'#1A1A1A',lineHeight:1.7,whiteSpace:'pre-wrap',marginBottom:'6px'}}>{entry.content}</p>}
                        {entry.image&&<img src={entry.image} alt="" style={{width:'100%',borderRadius:'8px',marginBottom:'6px'}}/>}
                        {entry.latitude&&entry.longitude&&<p style={{fontSize:'10px',color:'#BDBDBD'}}>📍 {entry.latitude.toFixed(4)},{entry.longitude.toFixed(4)}</p>}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {entries.length===0&&(
            <div style={{textAlign:'center',marginTop:'12px'}}>
              <p style={{fontSize:'14px',color:'#8C8C86',marginBottom:'12px'}}>还没有记忆，种下第一颗种子吧</p>
              <Link href="/create" style={{display:'inline-block',padding:'10px 24px',borderRadius:'18px',backgroundColor:'#1A1A1A',color:'#FFF',fontSize:'14px',fontWeight:500,textDecoration:'none'}}>开始记录</Link>
            </div>
          )}

          {lifeMsg&&(
            <div className="fi-i" style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',padding:'18px 22px',backgroundColor:'#FFFDFB',borderRadius:'18px',boxShadow:'0 4px 24px rgba(0,0,0,0.1)',zIndex:10,textAlign:'center',width:'240px'}} onClick={()=>setLifeMsg(false)}>
              <p style={{fontSize:'14px',fontWeight:500,color:'#1A1A1A',margin:'0 0 4px'}}>Today&apos;s Growth</p>
              <p style={{fontSize:'12px',color:'#8C8C86',margin:0}}>已经留下 <strong>{count}</strong> 个记忆</p>
            </div>
          )}
        </div>

        {/* Memory Growth Footer */}
        {entries.length>0&&(
          <div className="fo" style={{padding:'24px 20px',backgroundColor:'#FFFDFB',borderRadius:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.04)',textAlign:'center',marginBottom:'24px'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',marginBottom:'4px'}}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><ellipse cx="6" cy="9" rx="2" ry="2.5" fill="#9AA889" opacity="0.35"/></svg>
            </div>
            <p style={{fontSize:'11px',color:'#8C8C86',margin:'2px 0 8px'}}>{count} memories · Growing for {days} days</p>
            <p style={{fontSize:'11px',color:'#BDBDBD',margin:'0 0 14px'}}>一座小小的花园，每天都在长大。</p>

            {/* Stage journey line */}
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'0'}}>
              {['seed','sprout','young','tree','forest'].map((key,i)=>{
                const active=stage===key; const names: Record<string,string>={seed:'Seed',sprout:'Sprout',young:'Young',tree:'Tree',forest:'Forest'}
                return (<div key={key} style={{display:'flex',alignItems:'center'}}>
                  <div style={{textAlign:'center',opacity:active?1:0.2,transition:'opacity 600ms'}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      {key==='seed'&&<><ellipse cx="12" cy="17" rx="3" ry="4" fill="#9AA889" opacity={active?0.35:0.15}/><path d="M12 13 Q10 11 11 8" stroke="#1A1A1A" strokeWidth="0.6" strokeLinecap="round" fill="none" opacity="0.3"/></>}
                      {key==='sprout'&&<><path d="M12 22 Q12 14 12 8" stroke="#1A1A1A" strokeWidth="0.7" strokeLinecap="round" opacity="0.3"/><path d="M12 14 Q9 12 10 8" stroke="#1A1A1A" strokeWidth="0.5" strokeLinecap="round" fill="none" opacity="0.2"/><path d="M12 12 Q15 10 14 6" stroke="#1A1A1A" strokeWidth="0.5" strokeLinecap="round" fill="none" opacity="0.2"/></>}
                      {key==='young'&&<><path d="M12 22 Q12 12 12 6" stroke="#1A1A1A" strokeWidth="0.7" strokeLinecap="round" opacity="0.3"/><path d="M12 14 Q8 11 9 6" stroke="#1A1A1A" strokeWidth="0.5" strokeLinecap="round" fill="none" opacity="0.2"/><path d="M12 12 Q16 9 15 4" stroke="#1A1A1A" strokeWidth="0.5" strokeLinecap="round" fill="none" opacity="0.2"/></>}
                      {key==='tree'&&<><path d="M12 22 Q12 12 12 4" stroke="#1A1A1A" strokeWidth="0.8" strokeLinecap="round" opacity="0.3"/><path d="M12 13 Q7 10 8 5" stroke="#1A1A1A" strokeWidth="0.5" strokeLinecap="round" fill="none" opacity="0.2"/><path d="M12 11 Q17 8 16 3" stroke="#1A1A1A" strokeWidth="0.5" strokeLinecap="round" fill="none" opacity="0.2"/><circle cx="12" cy="3" r="2.5" fill="#9AA889" opacity={active?0.25:0.1}/></>}
                      {key==='forest'&&<><path d="M7 22 Q7 16 7 12" stroke="#1A1A1A" strokeWidth="0.5" strokeLinecap="round" opacity="0.2"/><path d="M17 20 Q17 14 17 10" stroke="#1A1A1A" strokeWidth="0.5" strokeLinecap="round" opacity="0.2"/><path d="M12 22 Q12 12 12 4" stroke="#1A1A1A" strokeWidth="0.7" strokeLinecap="round" opacity="0.3"/></>}
                    </svg>
                    <p style={{fontSize:'8px',color:'#8C8C86',margin:'1px 0 0',letterSpacing:'0.02em'}}>{names[key]}</p>
                  </div>
                  {i<4&&<div style={{width:'16px',height:'1px',backgroundColor:'#E5E0D8',margin:'0 2px'}}/>}
                </div>)
              })}
            </div>
          </div>
        )}

        <div style={{marginBottom:'40px',display:'flex',gap:'16px',justifyContent:'center'}}>
          <Link href="/today" style={{display:'inline-block',fontSize:'13px',color:'#8C8C86',textDecoration:'none',borderBottom:'1px solid #E5E0D8',paddingBottom:'2px'}}>✦ Today</Link>
          <Link href="/timeline" style={{display:'inline-block',fontSize:'13px',color:'#8C8C86',textDecoration:'none',borderBottom:'1px solid #E5E0D8',paddingBottom:'2px'}}>🧵 Thread</Link>
          <Link href="/" style={{display:'inline-block',fontSize:'13px',color:'#BDBDBD',textDecoration:'none'}}>← Home</Link>
        </div>
      </div>
    </div>
  )
}