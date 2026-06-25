export default function Home() {
  return (
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
          maxWidth: '320px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <h1
          style={{
            fontSize: '18px',
            fontWeight: 500,
            color: '#1E1E1E',
            textAlign: 'center',
            marginBottom: '64px',
          }}
        >
          Nearby
        </h1>

        {/* 标题 */}
        <h2
          style={{
            fontSize: '36px',
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: '-0.03em',
            color: '#1E1E1E',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          今天，
          <br />
          留住今天。
        </h2>

        {/* 副标题 */}
        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.6,
            color: '#8C8C8C',
            textAlign: 'center',
            marginBottom: '72px',
          }}
        >
          把今天留给未来的自己。
        </p>

        {/* Primary Button */}
        <form action="/upload" method="GET" style={{ width: '100%' }}>
          <button
            type="submit"
            className="btn-primary"
            style={{
              width: '100%',
              height: '56px',
              backgroundColor: '#1E1E1E',
              color: '#ffffff',
              textAlign: 'center',
              borderRadius: '18px',
              fontSize: '16px',
              fontWeight: 500,
              border: 'none',
              lineHeight: '56px',
            }}
          >
            保存今天
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
  )
}