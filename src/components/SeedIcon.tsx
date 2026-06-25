export default function SeedIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#A8D5A2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Soil line */}
      <path d="M2 20 Q12 16 22 20" />
      {/* Stem */}
      <path d="M12 14 Q12 8 12 4" />
      {/* Left leaf */}
      <path d="M12 10 Q9 8 7 9" />
      {/* Right leaf */}
      <path d="M12 8 Q15 6 17 7" />
    </svg>
  )
}