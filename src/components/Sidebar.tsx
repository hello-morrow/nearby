'use client'

import Calendar from './Calendar'
import Timeline from './Timeline'

export default function Sidebar() {
  // 后续连接真实数据后，从 LocalStorage 读取已记录日期
  const recordedDates: string[] = []

  return (
    <div
      style={{
        position: 'sticky',
        top: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        padding: '32px 24px',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #F0F0F0',
      }}
    >
      <Calendar recordedDates={recordedDates} />
      <Timeline />
    </div>
  )
}