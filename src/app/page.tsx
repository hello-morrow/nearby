export default function Home() {
  return (
    <>
      {/* Brand card fade-in animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .brand-card { animation: fadeInUp 300ms ease-out both; }
        .brand-card-delay { animation-delay: 200ms; }
      `}</style>

      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F7F6F3',
          padding: '24px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '360px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h1
              style={{
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                color: '#444',
                margin: 0,
              }}
            >
              Nearby
            </h1>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.12em',
                color: '#B0B0B0',
                margin: '4px 0 0 0',
              }}
            >
              Memory Weave
            </p>
          </div>

          {/* 标题 */}
          <h2
            style={{
              fontSize: '56px',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: '#1E1E1E',
              textAlign: 'center',
              marginBottom: '16px',
            }}
          >
            在今天，
            <br />
            留住今天。
          </h2>

          {/* 副标题 */}
          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.7,
              color: '#8C8C8C',
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            把今天留在这里。
          </p>

          {/* Brand Card */}
          <div
            className="brand-card"
            style={{
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '24px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '40px',
              gap: '16px',
            }}
          >
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '14px', fontWeight: 500, color: '#1E1E1E', lineHeight: 1.6, margin: '0 0 8px 0' }}>
                Nearby is not a diary.
                <br />
                It is a memory weave.
              </p>
              <p style={{ fontSize: '12px', color: '#8C8C8C', lineHeight: 1.5, margin: 0 }}>
                每一次记录，
                <br />
                都会为人生织上一针。
              </p>
            </div>

            {/* Line drawing — nodes on a curved line */}
            <svg width="56" height="72" viewBox="0 0 56 72" fill="none" style={{ flexShrink: 0 }}>
              <path d="M4 68 Q28 4 52 68" stroke="#D0D0D0" strokeWidth="1.5" fill="none" />
              <circle cx="16" cy="42" r="4" fill="#1E1E1E" />
              <circle cx="28" cy="22" r="3" fill="#1E1E1E" />
              <circle cx="40" cy="50" r="5" fill="#1E1E1E" />
              <circle cx="32" cy="36" r="2.5" fill="#B0B0B0" />
              <circle cx="20" cy="56" r="3.5" fill="#B0B0B0" />
            </svg>
          </div>

          {/* Primary Button */}
          <form action="/create" method="GET" style={{ width: '100%' }}>
            <button
              type="submit"
              className="btn-primary brand-card brand-card-delay"
              style={{
                width: '100%',
                height: '56px',
                backgroundColor: '#1E1E1E',
                color: '#ffffff',
                textAlign: 'center',
                borderRadius: '18px',
                fontSize: '18px',
                fontWeight: 500,
                border: 'none',
                lineHeight: '56px',
                cursor: 'pointer',
                opacity: 0,
              }}
            >
              留住今天
            </button>
          </form>

          {/* 底部文字 */}
          <p
            style={{
              position: 'absolute',
              bottom: '40px',
              fontSize: '12px',
              color: '#8C8C8C',
              textAlign: 'center',
            }}
          >
            Stay close to today.
          </p>
        </div>
      </div>
    </>
  )
}