'use client'

import { useState } from 'react'

const W = ['日','一','二','三','四','五','六']
const M = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']

interface CalendarProps { recordedDates: string[] }

export default function Calendar({ recordedDates }: CalendarProps) {
  const today = new Date()
  const [y, setY] = useState(today.getFullYear())
  const [m, setM] = useState(today.getMonth())
  const prev = () => { if(m===0){setY(y-1);setM(11)}else setM(m-1) }
  const next = () => { if(m===11){setY(y+1);setM(0)}else setM(m+1) }

  const fd = new Date(y, m, 1).getDay()
  const dim = new Date(y, m + 1, 0).getDate()
  const rs = new Set(recordedDates.map(d => { const dt = new Date(d); return `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}` }))
  const isT = (day:number) => y===today.getFullYear() && m===today.getMonth() && day===today.getDate()
  const hasR = (day:number) => rs.has(`${y}-${m}-${day}`)

  const cells: (number|null)[] = []
  for(let i=0;i<fd;i++) cells.push(null)
  for(let d=1;d<=dim;d++) cells.push(d)

  return (
    <div>
      <div style={{ display:'flex',alignItems:'baseline',gap:'10px',marginBottom:'24px' }}>
        <button onClick={prev} style={arr}>‹</button>
        <div>
          <div style={{ fontSize:'13px',fontWeight:400,color:'#8C8C8C',lineHeight:1.4 }}>{y}</div>
          <div style={{ fontSize:'28px',fontWeight:500,color:'#1E1E1E',lineHeight:1.3 }}>{M[m]}</div>
        </div>
        <button onClick={next} style={arr}>›</button>
      </div>

      <div style={{ display:'grid',gridTemplateColumns:'repeat(7,1fr)',marginBottom:'8px' }}>
        {W.map(d => <div key={d} style={{ textAlign:'center',fontSize:'12px',color:'#B0B0B0',paddingBottom:'6px' }}>{d}</div>)}
      </div>

      <div style={{ display:'grid',gridTemplateColumns:'repeat(7,1fr)',rowGap:'6px' }}>
        {cells.map((day,i) => (
          <div key={i} style={{ display:'flex',alignItems:'center',justifyContent:'center',height:'40px' }}>
            {day!==null ? (
              isT(day) ? (
                <div style={{ width:'40px',height:'40px',borderRadius:'999px',backgroundColor:'#88A97A',color:'#FFF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'15px',fontWeight:500 }}>{day}</div>
              ) : (
                <div style={{ width:'40px',height:'40px',borderRadius:'999px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center' }}>
                  <span style={{ fontSize:'15px',color:'#1E1E1E' }}>{day}</span>
                  {hasR(day) && <div style={{ width:'4px',height:'4px',borderRadius:'50%',backgroundColor:'#88A97A',opacity:0.5 }} />}
                </div>
              )
            ) : <div />}
          </div>
        ))}
      </div>
    </div>
  )
}

const arr: React.CSSProperties = { background:'none',border:'none',cursor:'pointer',fontSize:'16px',color:'#B0B0B0',padding:0,lineHeight:1 }