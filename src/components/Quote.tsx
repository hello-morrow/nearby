'use client'

import { useState, useEffect } from 'react'

const QUOTES = [
  '记录，\n不是为了记住。\n而是为了再次遇见。',
  '今天，\n会成为未来的一部分。',
  '所有回忆，\n都会找到属于自己的位置。',
  '每一次落笔，\n都是人生织物上的一针。',
  '时间不说话，\n但一直在编织。',
  '你留下的每一段记忆，\n都会被轻轻编织在一起。',
  '回忆不是碎片，\n而是完整的织物。',
  '慢慢编织，\n总有一天会看见图案。',
  '今天的阳光，\n明天会成为回忆的经纬。',
  '每一段记忆，\n都连着另一段记忆。',
  '织得越久，\n越看得见自己的形状。',
  '把今天叠好，\n放进人生的织物里。',
  '记忆不会消失，\n它只是换了一种存在。',
  '你在记录，\n时间就在编织。',
  '好的坏的，\n都是织物的纹理。',
  '每一段文字，\n都是时光的标本。',
  '翻开过去，\n是一种温柔的陪伴。',
  '用心记录，\n时间就有了温度。',
  'Every memory becomes another thread.',
  'We remember by returning.',
  'The places you revisit,\nremember you too.',
  'Time weaves us,\nand we weave back.',
  'Every thread connects\nto another thread.',
  'Memory is not storage.\nIt is weaving.',
  'What you record today\nbecomes tomorrow\'s thread.',
  'A life well recorded\nis a life well woven.',
  'Thread by thread,\nday by day.',
  'The pattern emerges\nonly when you keep going.',
  'Each return is a new stitch.',
  'Weaving is remembering\nin slow motion.',
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
      {/* 装饰符号 */}
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