'use client'

import { useState, useEffect } from 'react'

const QUOTES = [
  'Every place remembers\na different version of you.',
  'Each thread begins\nwith a single return.',
  'Memory is not a place.\nIt is a path.',
  'The places you revisit\nremember you too.',
  'We remember by returning.',
  'Every return adds\na new thread to the weave.',
  'Some places hold pieces\nof who we used to be.',
  'Time weaves us,\nand we weave back.',
  'Each memory is a stitch\nin the fabric of time.',
  'Thread by thread,\nday by day.',
  'What you return to\nreturns to you.',
  'The pattern emerges\nonly when you keep going.',
  'Memory is not storage.\nIt is weaving.',
  'Each place holds\na different thread of you.',
  'Returning is remembering\nin slow motion.',
  'Memories grow\neach time we return.',
  'We don\'t collect memories.\nWe cultivate them.',
  'Every memory becomes\nanother thread.',
  'The places we return to\nhold our stories.',
  'Memory begins\nwhere the thread starts.',
]

export default function Quote() {
  const [quote, setQuote] = useState('')

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)])
  }, [])

  return (
    <div style={{ backgroundColor:'#FFFDFB',borderRadius:'20px',padding:'24px',position:'relative',overflow:'hidden',boxShadow:'0 8px 24px rgba(0,0,0,0.05)' }}>
      {/* Watercolor corner */}
      <div style={{ position:'absolute',bottom:0,right:0,width:'60px',height:'50px',background:'radial-gradient(ellipse at bottom right, rgba(167,197,138,0.08) 0%, transparent 70%)',pointerEvents:'none' }} />

      {/* Spark */}
      <div style={{ position:'absolute',top:'14px',left:'18px' }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1 L7.8 5.2 L12 6 L7.8 6.8 L7 11 L6.2 6.8 L2 6 L6.2 5.2Z" fill="#D4A373" stroke="none" />
        </svg>
      </div>

      {quote ? (
        <>
          <p style={{ fontSize:'18px',fontWeight:400,lineHeight:1.8,color:'#505050',whiteSpace:'pre-line',textAlign:'left',marginTop:'4px' }}>
            {quote}
          </p>
          <p style={{ fontSize:'12px',color:'#A2A2A2',marginTop:'14px' }}>— Nearby</p>
        </>
      ) : (
        <div style={{ height:'72px' }} />
      )}
    </div>
  )
}