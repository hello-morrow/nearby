'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navItems = [
  { href: '/today',    icon: '✦', label: 'Today' },
  { href: '/create',   icon: '＋', label: 'Create' },
  { href: '/timeline', icon: '🧵', label: 'Thread' },
  { href: '/garden',   icon: '🌱', label: 'Garden' },
]

export default function MemoryNav() {
  const pathname = usePathname()

  // Only show on main pages
  const showPaths = ['/', '/create', '/today', '/timeline', '/garden']
  if (!showPaths.includes(pathname)) return null

  return (
    <nav style={{
      position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
      display: 'flex', alignItems: 'center', gap: '6px',
      padding: '6px 16px',
      backgroundColor: '#FFFDFB', borderRadius: '20px',
      boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
      zIndex: 100,
    }}>
      {navItems.map((item, i) => {
        const active = pathname === item.href
        return (
          <div key={item.href} style={{ display: 'flex', alignItems: 'center' }}>
            <Link
              href={item.href}
              style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '6px 10px', borderRadius: '12px',
                textDecoration: 'none',
                backgroundColor: active ? '#F0EDE8' : 'transparent',
                transition: 'background 180ms ease',
              }}
            >
              <span style={{ fontSize: '14px', lineHeight: 1 }}>{item.icon}</span>
              <span style={{
                fontSize: '11px', fontWeight: active ? 500 : 400,
                color: active ? '#1A1A1A' : '#8C8C86',
                transition: 'color 180ms ease',
              }}>
                {item.label}
              </span>
            </Link>
            {i < navItems.length - 1 && (
              <div style={{ width: '1px', height: '12px', backgroundColor: '#E5E0D8', margin: '0 2px' }} />
            )}
          </div>
        )
      })}
    </nav>
  )
}