'use client'

import Calendar from './Calendar'
import Timeline from './Timeline'
import Quote from './Quote'
import SeedIcon from './SeedIcon'

interface SidebarProps {
  draft?: { content: string; mood: string; image: string | null } | null
}

export default function Sidebar({ draft }: SidebarProps) {
  const recordedDates: string[] = []
  const hasDraft = draft && draft.content.trim()

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

      {/* Memory Weave Preview — 正在输入时显示 */}
      {hasDraft && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 0',
          }}
        >
          <SeedIcon size={24} />
          <div>
            <p style={{ fontSize: '13px', color: '#1E1E1E', fontWeight: 500, margin: '0 0 2px 0' }}>
              Today's Seed
            </p>
            <p style={{ fontSize: '12px', color: '#8C8C8C', margin: 0 }}>
              今天，又有一颗新的种子，准备长大。
            </p>
          </div>
        </div>
      )}
    </div>
  )
}