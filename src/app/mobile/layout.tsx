'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { href: '/mobile', label: 'Today', icon: '●' },
  { href: '/mobile/journey', label: 'Journey', icon: '◇' },
  { href: '/mobile/timeline', label: 'Timeline', icon: '│' },
  { href: '/mobile/me', label: 'Me', icon: '○' },
]

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

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

      <nav style={{
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        height: '50px', backgroundColor: '#FCFBF8',
        borderTop: '1px solid #E8E5E0',
        flexShrink: 0,
      }}>
        {TABS.map((tab) => {
          const active = pathname === tab.href || (tab.href === '/mobile' && pathname === '/mobile')
          return (
            <Link key={tab.href} href={tab.href} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px',
              textDecoration: 'none', color: active ? '#1D1D1F' : '#B0B0B0',
              fontSize: '9px', fontWeight: active ? 500 : 400, letterSpacing: '0.02em',
            }}>
              <span style={{ fontSize: '14px', lineHeight: 1.2 }}>{tab.icon}</span>
              {tab.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}