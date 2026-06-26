'use client'

import { useState } from 'react'
import { APP_VERSION, RELEASE_NOTES } from '@/config/version'

export default function Footer() {
  const [open, setOpen] = useState(false)

  return (
    <footer style={{ textAlign: 'center', padding: '24px', position: 'relative' }}>
      <p style={{ fontSize: '12px', color: '#A5A5A5', margin: 0, lineHeight: 1.8 }}>
        Nearby · Memory Weave
        <br />
        {APP_VERSION.chapter} · {APP_VERSION.title}
        <br />
        <span
          onClick={() => setOpen(!open)}
          style={{ cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '4px' }}
        >
          v{APP_VERSION.version}
        </span>
        {' · '}Updated · {APP_VERSION.updatedAt}
      </p>

      {/* Release Notes */}
      {open && (
        <div
          style={{
            margin: '16px auto 0',
            maxWidth: '480px',
            backgroundColor: '#FCFBF8',
            borderRadius: '20px',
            padding: '24px',
            textAlign: 'left',
            boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
            animation: 'fadeInUp 200ms ease-out both',
          }}
        >
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#1E1E1E', margin: '0 0 4px 0' }}>
            {APP_VERSION.chapter}
          </h4>
          <p style={{ fontSize: '14px', color: '#8C8C8C', margin: '0 0 16px 0' }}>
            {APP_VERSION.title} · Build {APP_VERSION.build}
          </p>

          {/* Added */}
          <Section emoji="✨" title="Added" items={RELEASE_NOTES.added} />
          <Section emoji="🔧" title="Improved" items={RELEASE_NOTES.improved} />
          <Section emoji="🐞" title="Fixed" items={RELEASE_NOTES.fixed} />
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </footer>
  )
}

function Section({ emoji, title, items }: { emoji: string; title: string; items: string[] }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <p style={{ fontSize: '13px', fontWeight: 500, color: '#1E1E1E', margin: '0 0 6px 0' }}>
        {emoji} {title}
      </p>
      <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#666', lineHeight: 1.8 }}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}