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
  'A life well recorded\nis a life well woven.',
  'Each memory is a stitch\nin the fabric of time.',
  'Thread by thread,\nday by day.',
  'What you return to\nreturns to you.',
  'The pattern emerges\nonly when you keep going.',
  'Every visit deepens\nthe memory of a place.',
  'Memory is not storage.\nIt is weaving.',
  'Each place holds\na different thread of you.',
  'The places we love\nbecome part of us.',
  'Returning is remembering\nin slow motion.',
  'Every thread connects\nto another thread.',
  'Memories grow\neach time we return.',
  'A place remembered\nis never truly left.',
  'We don\'t collect memories.\nWe cultivate them.',
  'Every return is a new beginning.',
  'Places remember\nwhat we forget.',
  'The weave grows stronger\nwith every visit.',
  'Memory begins\nwhere the thread starts.',
  'Some threads run deeper\nthan others.',
  'Return is the heartbeat\nof memory.',
  'Every memory becomes\nanother thread.',
  'The places we return to\nhold our stories.',
]

export default function Quote() {
  const [quote, setQuote] = useState('')

  useEffect(() => {
    const idx = Math.floor(Math.random() * QUOTES.length)
    setQuote(QUOTES[idx])
  }, [])

  return (
    <div
      style={{
        backgroundColor: '#FAF8F6',
        borderRadius: '24px',
        padding: '24px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '20px',
          fontSize: '14px',
          color: '#D0D0D0',
        }}
      >
        ✦
      </div>

      {quote ? (
        <>
          <p
            style={{
              fontSize: '15px',
              lineHeight: 2,
              color: '#7A7A7A',
              whiteSpace: 'pre-line',
              textAlign: 'left',
              marginTop: '8px',
            }}
          >
            {quote}
          </p>
          <p
            style={{
              fontSize: '11px',
              color: '#B0B0B0',
              marginTop: '12px',
            }}
          >
            — Nearby
          </p>
        </>
      ) : (
        <div style={{ height: '72px' }} />
      )}
    </div>
  )
}