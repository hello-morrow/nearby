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
    <div style={{ backgroundColor:'#FFFDFB',borderRadius:'20px',padding:'24px',boxShadow:'0 4px 20px rgba(0,0,0,0.04)' }}>
      {quote ? (
        <>
          <p style={{ fontSize:'15px',fontWeight:400,lineHeight:1.8,color:'#505050',whiteSpace:'pre-line',textAlign:'left' }}>
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