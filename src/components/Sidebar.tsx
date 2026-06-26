'use client'

import Calendar from './Calendar'
import Timeline from './Timeline'
import Quote from './Quote'
import { InteractiveSpark, InteractiveThread, InteractiveSeed } from './DoodleInteractive'

interface SidebarProps {
  draft?: { content: string; mood: string; image: string | null } | null
}

export default function Sidebar({ draft }: SidebarProps) {
  const recordedDates: string[] = []

  return (
    <div
      style={{
        position: 'sticky',
        top: '40px',
        width: '360px',
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
      }}
    >
      {/* ══ Calendar — 最大的卡片 ══ */}
      <div style={{ position:'relative' }}>
        {/* 右上角：Thread 标志 */}
        <div style={{ position:'absolute', top: -8, right: -8, zIndex:2 }}>
          <InteractiveThread size={18} />
        </div>
        <Calendar recordedDates={recordedDates} />
      </div>

      {/* ══ Timeline — 中间高度，稍微错开 ══ */}
      <div style={{ position:'relative', marginLeft: '12px' }}>
        {/* 右上角：Spark 标志 */}
        <div style={{ position:'absolute', top: -6, right: -4, zIndex:2 }}>
          <InteractiveSpark size={16} />
        </div>
        <Timeline draft={draft} />
      </div>

      {/* ══ Quote — 最小的卡片，位置偏右 ══ */}
      <div style={{ position:'relative', marginRight: '8px' }}>
        {/* 右上角：Seed 标志 */}
        <div style={{ position:'absolute', top: -4, right: -6, zIndex:2 }}>
          <InteractiveSeed size={18} />
        </div>
        <Quote />
      </div>
    </div>
  )
}