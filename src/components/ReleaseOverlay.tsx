'use client'

interface ReleaseOverlayProps {
  onKeep: () => void
  onRelease: () => void
}

export default function ReleaseOverlay({ onKeep, onRelease }: ReleaseOverlayProps) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 10,
      animation: 'releaseIn 250ms ease-out',
    }}>
      <div style={{
        backgroundColor: '#FFFDF9',
        borderRadius: '14px',
        padding: '28px 32px 24px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        maxWidth: '300px', width: '100%',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '14px', fontWeight: 500, color: '#1E1E1E',
          lineHeight: 1.8, margin: '0 0 20px 0',
        }}>
          放下这段记忆？
          <br />
          <span style={{ fontSize: '13px', fontWeight: 400, color: '#8C8C8C' }}>
            它会离开你的织线。
            <br />
            今天仍然属于今天。
          </span>
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={onKeep}
            style={{
              padding: '10px 24px', borderRadius: '10px',
              border: '1px solid #E5E0D8',
              backgroundColor: 'transparent',
              fontSize: '13px', fontWeight: 400, color: '#8C8C8C',
              cursor: 'pointer',
              transition: 'background 150ms ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#F5F2ED'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            继续保存
          </button>
          <button
            onClick={onRelease}
            style={{
              padding: '10px 24px', borderRadius: '10px',
              border: '1px solid #D4A373',
              backgroundColor: 'transparent',
              fontSize: '13px', fontWeight: 500, color: '#D4A373',
              cursor: 'pointer',
              transition: 'background 150ms ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,163,115,0.06)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            放下
          </button>
        </div>
      </div>

      <style>{`
        @keyframes releaseIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
