'use client'

import { useState } from 'react'

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']
const MONTHS = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']

interface CalendarProps { recordedDates: string[] }

export default function Calendar({ recordedDates }: CalendarProps) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const prev = () => { if(viewMonth===0){setViewYear(viewYear-1);setViewMonth(11)}else setViewMonth(viewMonth-1) }
  const next = () => { if(viewMonth===11){setViewYear(viewYear+1);setViewMonth(0)}else setViewMonth(viewMonth+1) }

  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const recordedSet = new Set(recordedDates.map(d => { const dt = new Date(d); return `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}` }))
  const isToday = (day:number) => viewYear===today.getFullYear() && viewMonth===today.getMonth() && day===today.getDate()
  const hasRecord = (day:number) => recordedSet.has(`${viewYear}-${viewMonth}-${day}`)

  const cells: (number|null)[] = []
  for(let i=0;i<firstDay;i++) cells.push(null)
  for(let d=1;d<=daysInMonth;d++) cells.push(d)

  return (
    <div style={{ backgroundColor:'#FFFDFB',borderRadius:'24px',padding:'24px',boxShadow:'0 8px 24px rgba(0,0,0,0.05)',position:'relative' }}>
      {/* Leaf icon */}
      <div style={{ position:'absolute',top:'18px',left:'20px' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2 Q4 6 8 14 Q12 6 8 2Z" fill="#A7C58A" stroke="none" opacity="0.6" />
          <line x1="8" y1="4" x2="8" y2="12" stroke="#A7C58A" strokeWidth="0.8" opacity="0.4" />
        </svg>
      </div>

      {/* Month */}
      <div style={{ display:'flex',alignItems:'baseline',gap:'10px',marginBottom:'24px',justifyContent:'flex-end' }}>
        <button onClick={prev} style={arr}>‹</button>
        <div>
          <div style={{ fontSize:'13px',fontWeight:400,color:'#8C8C8C',lineHeight:1.4 }}>{viewYear}</div>
          <div style={{ fontSize:'28px',fontWeight:500,color:'#1E1E1E',lineHeight:1.3 }}>{MONTHS[viewMonth]}</div>
        </div>
        <button onClick={next} style={arr}>›</button>
      </div>

      {/* Weekdays */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(7,1fr)',marginBottom:'8px' }}>
        {WEEKDAYS.map(d => <div key={d} style={{ textAlign:'center',fontSize:'12px',color:'#B0B0B0',paddingBottom:'6px' }}>{d}</div>)}
      </div>

      {/* Days */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(7,1fr)',rowGap:'6px' }}>
        {cells.map((day,i) => (
          <div key={i} style={{ display:'flex',alignItems:'center',justifyContent:'center',height:'40px' }}>
            {day!==null ? (
              isToday(day) ? (
                <div style={{ width:'40px',height:'40px',borderRadius:'999px',backgroundColor:'#B7CDA4',color:'#FFF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'15px',fontWeight:500,cursor:'default' }}>{day}</div>
              ) : (
                <div style={{ width:'40px',height:'40px',borderRadius:'999px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',cursor:'default' }}>
                  <span style={{ fontSize:'15px',color:'#1E1E1E' }}>{day}</span>
                  {hasRecord(day) && <div style={{ width:'4px',height:'4px',borderRadius:'50%',backgroundColor:'#B7CDA4',opacity:0.5 }} />}
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