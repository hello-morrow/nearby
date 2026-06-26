import { colors, radius, motion } from '@/tokens'

interface MemoryButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  style?: React.CSSProperties
}

export default function MemoryButton({ children, onClick, disabled, style }: MemoryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%', height: '60px',
        borderRadius: radius.button,
        fontSize: '16px', fontWeight: 500,
        border: 'none',
        backgroundColor: disabled ? '#D9D9D9' : colors.ink,
        color: '#FFF',
        cursor: disabled ? 'not-allowed' : 'pointer',
        lineHeight: '60px',
        transition: `opacity ${motion}, transform ${motion}`,
        ...style,
      }}
      onMouseEnter={(e) => { if(!disabled) e.currentTarget.style.opacity = '0.95' }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
    >
      {children}
    </button>
  )
}