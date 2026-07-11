'use client'

const MOODS = ['😊', '😌', '😭', '😤', '❤️', '🌧️']

interface MoodSelectorProps {
  selected: string
  onChange: (mood: string) => void
}

export default function MoodSelector({ selected, onChange }: MoodSelectorProps) {
  return (
    <div>
      <p
        style={{
          fontSize: '14px',
          color: '#8C8C8C',
          marginBottom: '12px',
        }}
      >
        今天的心情
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {MOODS.map((mood) => (
          <button
            key={mood}
            type="button"
            onClick={() => onChange(mood)}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: selected === mood ? '2px solid #1E1E1E' : '2px solid #E5E5E5',
              backgroundColor: selected === mood ? '#F7F6F3' : '#FFFFFF',
              fontSize: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 150ms ease',
            }}
          >
            {mood}
          </button>
        ))}
      </div>
    </div>
  )
}