'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navItems = [
  { href: '/today',    icon: '✦', label: '今日', sub: 'Today' },
  { href: '/create',   icon: '＋', label: '创建', sub: 'Create' },
  { href: '/timeline', icon: '🧵', label: '织线', sub: 'Thread' },
  { href: '/garden',   icon: '🌱', label: '生生', sub: 'Garden' },
]

export default function MemoryNav({ variant = 'fixed' }: { variant?: 'fixed' | 'inline' }) {
  const pathname = usePathname()

  // Inline variant always renders (used in landing page document flow)
  if (variant !== 'inline') {
    const showPaths = ['/today', '/timeline', '/garden']
    if (!showPaths.includes(pathname)) return null
  }

  const inline = variant === 'inline'

  return (
    <nav style={{
      ...(inline
        ? { marginBottom: '14px' }
        : { position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 100 }
      ),
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: inline ? '0px' : '4px',
      width: inline ? 'clamp(360px, 62vw, 740px)' : 'clamp(360px, 60vw, 720px)',
      maxWidth: inline ? '760px' : '800px',
      height: inline ? '66px' : '64px',
      padding: inline ? '8px 24px' : '8px 20px',
      backgroundColor: inline ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.94)',
      borderRadius: inline ? '22px' : '16px',
      boxShadow: inline ? '0 4px 16px rgba(0,0,0,0.04)' : '0 6px 20px rgba(0,0,0,0.06)',
    }}>
      {navItems.map((item, i) => {
        const active = pathname === item.href
        return (
          <div key={item.href} style={{ display: 'flex', alignItems: 'center', flex: inline ? 1 : undefined }}>
            <Link href={item.href} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: inline ? '8px 0' : '8px 12px',
              borderRadius: '12px', textDecoration: 'none',
              width: inline ? '100%' : undefined,
              backgroundColor: active ? '#F0EDE8' : 'transparent',
              transition: 'background 180ms ease',
            }}>
              <span style={{ fontSize: inline ? '17px' : '18px', lineHeight: 1 }}>{item.icon}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                <span style={{
                  fontSize: inline ? '16px' : '15px',
                  fontWeight: 500,
                  color: active ? '#1A1A1A' : '#8C8C86',
                  lineHeight: 1.2,
                }}>
                  {item.label}
                </span>
                <span style={{
                  fontSize: inline ? '11px' : '10px',
                  fontWeight: 400,
                  color: '#B0B0B0',
                  lineHeight: 1,
                }}>
                  {item.sub}
                </span>
              </div>
            </Link>
            {i < navItems.length - 1 && (
              <div style={{
                width: '1px',
                height: inline ? '20px' : '16px',
                backgroundColor: inline ? '#E8E3DC' : '#E5E0D8',
                margin: inline ? '0 4px' : '0 2px',
              }} />
            )}
          </div>
        )
      })}
    </nav>
  )
}
