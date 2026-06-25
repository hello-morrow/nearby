export interface DiaryEntry {
  id: string
  date: string
  content: string
  mood: string
  image: string | null
  latitude: number | null
  longitude: number | null
}

export interface Place {
  id: string
  latitude: number
  longitude: number
  firstVisit: string
  lastVisit: string
  visitCount: number
  photoCount: number
  recordCount: number
  topMood: string
  topMoodCount: number
  coverImage: string | null
}