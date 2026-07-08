'use client'

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      maxWidth:'430px', margin:'0 auto',
      minHeight:'100dvh', backgroundColor:'#F7F6F3',
    }}>
      {children}
    </div>
  )
}