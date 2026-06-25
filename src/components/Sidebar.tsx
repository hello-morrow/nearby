'use client'

import Calendar from './Calendar'
import Timeline from './Timeline'
import Quote from './Quote'

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
      <Calendar recordedDates={recordedDates} />
      <Timeline draft={draft} />
      <Quote />
    </div>
  )
}