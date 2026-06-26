'use client'

import { useState, useEffect } from 'react'

const QUOTES = [
  'Every place remembers\na different version of you.',
  'Each thread begins\nwith a single return.',
  'The places you revisit\nremember you too.',
  'We remember by returning.',
  'Time weaves us,\nand we weave back.',
  'Thread by thread,\nday by day.',
  'Memory is not storage.\nIt is weaving.',
  'Returning is remembering\nin slow motion.',
  'Every memory becomes\nanother thread.',
  'The places we return to\nhold our stories.',
]

export default function Quote() {
  const [quote, setQuote] = useState('')

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)])
  }, [])

  return (
    <div style={{ backgroundColor:'#FFFDFB',borderRadius:'20px',padding:'24px',boxShadow:'0 8px 24px rgba(0,0,0,0.04)',position:'relative',overflow:'hidden' }}>
      {/* Watercolor corner */}
      <div style={{ position:'absolute',bottom:0,right:0,width:'60px',height:'50px',background:'radial-gradient(ellipse at bottom right, rgba(136,169,122,0.08) 0%, transparent 70%)',pointerEvents:'none' }} />
      {/* Leaf — in the corner of Quote */}
      <div style={{ position:'absolute',bottom:'16px',right:'16px' }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 17 Q7 11 11 9 Q15 11 19 17" stroke="#88A97A" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
          <path d="M11 9 Q9 6 11 3 Q13 6 11 9Z" fill="#88A97A" opacity="0.3" />
        </svg>
      </div>
      {/* Spark — top left */}
      <div style={{ position:'absolute',top:'14px',left:'16px' }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1 L6.8 4.8 L10.6 6 L6.8 7.2 L6 11 L5.2 7.2 L1.4 6 L5.2 4.8Z" fill="#D4A373" stroke="none" />
        </svg>
      </div>
      {/* Seed — top right */}
      <div style={{ position:'absolute',top:'14px',right:'14px' }}>
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
          <ellipse cx="6" cy="10" rx="2.5" ry="3" fill="#88A97A" opacity="0.4" />
        </svg>
      </div>
      {quote ? (
        <>
          <p style={{ fontSize:'15px',fontWeight:400,lineHeight:1.8,color:'#505050',whiteSpace:'pre-line',textAlign:'left',marginTop:'4px' }}>
            {quote}
          </p>
          <p style={{ fontSize:'12px',color:'#A2A2A2',marginTop:'12px' }}>— Nearby</p>
        </>
      ) : (
        <div style={{ height:'60px' }} />
      )}
    </div>
  )
}