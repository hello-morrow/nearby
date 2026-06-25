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
      backgroundColor: '#F7F6F3',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 'env(safe-area-inset-top, 0px)',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    }}>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {children}
      </div>

      <nav style={{
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        height: '56px', backgroundColor: '#FCFBF8',
        borderTop: '1px solid #E8E5E0',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        flexShrink: 0,
      }}>
        {TABS.map((tab) => {
          const active = pathname === tab.href || (tab.href === '/mobile' && pathname === '/mobile')
          return (
            <Link key={tab.href} href={tab.href} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
              textDecoration: 'none', color: active ? '#1E1E1E' : '#B0B0B0',
              fontSize: '10px', fontWeight: active ? 500 : 400,
            }}>
              <span style={{ fontSize: '16px' }}>{tab.icon}</span>
              {tab.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}