const KEY = 'nearby_mobile_draft'

export interface MobileDraft {
  content: string
  mood: string
  image: string | null
  latitude: number | null
  longitude: number | null
}

export function getDraft(): MobileDraft {
  if (typeof window === 'undefined') return empty()
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || 'null') || empty()
  } catch { return empty() }
}

export function setDraft(partial: Partial<MobileDraft>) {
  const current = getDraft()
  const next = { ...current, ...partial }
  sessionStorage.setItem(KEY, JSON.stringify(next))
}

export function clearDraft() {
  sessionStorage.removeItem(KEY)
}

function empty(): MobileDraft {
  return { content: '', mood: '😊', image: null, latitude: null, longitude: null }
}