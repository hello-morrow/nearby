'use client'

import Calendar from './Calendar'
import Timeline from './Timeline'
import Quote from './Quote'
import { InteractiveCircle, InteractiveSpark } from './DoodleInteractive'

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
      {/* Calendar + doodles */}
      <div style={{ position:'relative' }}>
        <Calendar recordedDates={recordedDates} />
        <div style={{ position:'absolute', top: -8, right: -8, display:'flex', gap:4 }}>
          <InteractiveCircle size={16} />
          <InteractiveSpark size={12} />
        </div>
      </div>

      <Timeline draft={draft} />

      {/* Quote + doodles */}
      <div style={{ position:'relative' }}>
        <Quote />
        <div style={{ position:'absolute', bottom: -6, left: -6, display:'flex', gap:4 }}>
          <InteractiveSpark size={14} />
          <InteractiveCircle size={14} />
        </div>
      </div>
    </div>
  )
}