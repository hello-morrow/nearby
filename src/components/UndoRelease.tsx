'use client'

import { useEffect } from 'react'

interface UndoReleaseProps {
  visible: boolean
  onUndo: () => void
  onDismiss: () => void
}

export default function UndoRelease({ visible, onUndo, onDismiss }: UndoReleaseProps) {
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(onDismiss, 6000)
    return () => clearTimeout(t)
  }, [visible, onDismiss])

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
      zIndex: 300,
      animation: 'undoIn 300ms ease-out',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '16px',
        backgroundColor: '#FFFDFB',
        borderRadius: '16px',
        padding: '12px 20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      }}>
        <span style={{ fontSize: '13px', color: '#8C8C8C' }}>
          刚刚放下了一段记忆。
        </span>
        <button
          onClick={onUndo}
          style={{
            padding: '6px 16px', borderRadius: '8px',
            border: '1px solid #D4A373',
            backgroundColor: 'transparent',
            fontSize: '13px', fontWeight: 500, color: '#D4A373',
            cursor: 'pointer',
            transition: 'background 150ms ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,163,115,0.06)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          重新接回来？
        </button>
      </div>

      <style>{`
        @keyframes undoIn {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  )
}
