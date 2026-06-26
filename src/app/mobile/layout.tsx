'use client'

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: '100dvh',
      backgroundColor: '#F9F8F6',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '100vw',
      overflowX: 'hidden',
    }}>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {children}
      </div>
    </div>
  )
}