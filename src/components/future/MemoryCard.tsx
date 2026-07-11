import { colors, radius, shadow } from '@/tokens'

export default function MemoryCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      backgroundColor: '#FFFDFB',
      borderRadius: radius.card,
      boxShadow: shadow,
      ...style,
    }}>
      {children}
    </div>
  )
}