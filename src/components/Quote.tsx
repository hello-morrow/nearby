'use client'

import { useState, useEffect } from 'react'

const QUOTES = [
  '愿未来的你，\n还能想起今天。',
  '每一天都值得被记住。\n即使平凡。',
  '时间不说话，\n但一直在记录。',
  '有些事今天不做，\n明天就忘了。',
  '写下来，\n就是对自己最好的礼物。',
  '今天的你，\n也是未来的回忆。',
  '记录，\n是最温柔的坚持。',
  '把平凡的日子，\n过成值得回味的诗。',
  '每一页空白，\n都在等你落笔。',
  '生活不会重来，\n但文字可以重温。',
  '今天的心情，\n明天再看会不一样。',
  '你在记录，\n时间就在变慢。',
  '好的坏的，\n都是生活的一部分。',
  '给未来的自己，\n写一封信。',
  '日常即是诗。',
  '慢慢来，\n每一天都值得。',
  '你今天的样子，\n就是最好的样子。',
  '随手几行，\n胜过万千回忆。',
  '此时此刻，\n独一无二。',
  '用心记录，\n时间就有了温度。',
  '今天的阳光，\n明天也会记得。',
  '写下来，\n就不再害怕遗忘。',
  '每一段文字，\n都是时光的标本。',
  '你值得被记录。',
  '安静地写，\n时间会听。',
  '今天的小事，\n可能是明天的宝藏。',
  '翻开过去，\n是一种温柔的陪伴。',
  '把今天叠好，\n放进心里。',
  '记录不是为了别人，\n是为了未来的自己。',
  '每一个今天，\n都在悄悄改变未来。',
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
        // SSR 初始状态 — 与客户端首次渲染一致
        <div style={{ height: '72px' }} />
      )}
    </div>
  )
}