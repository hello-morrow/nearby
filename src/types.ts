export interface DiaryEntry {
  id: string
  date: string
  content: string
  mood: string
  image: string | null
  latitude: number | null
  longitude: number | null
}