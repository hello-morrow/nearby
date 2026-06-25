import type { DiaryEntry, Place } from '@/types'

function roundCoord(n: number): number {
  return Math.round(n * 1000) / 1000
}

function placeId(lat: number, lng: number): string {
  return `${roundCoord(lat)},${roundCoord(lng)}`
}

export function getEntries(): DiaryEntry[] {
  if (typeof window === 'undefined') return []
  return JSON.parse(localStorage.getItem('nearby_entries') || '[]')
}

export function getPlaceByCoords(lat: number, lng: number): Place | null {
  const entries = getEntries().filter(
    (e) => e.latitude !== null && e.longitude !== null,
  )

  const targetId = placeId(lat, lng)
  const matches = entries.filter(
    (e) => placeId(e.latitude!, e.longitude!) === targetId,
  )

  if (matches.length === 0) return null

  const moods = new Map<string, number>()
  let cover: string | null = null

  matches.forEach((e) => {
    moods.set(e.mood, (moods.get(e.mood) || 0) + 1)
    if (!cover && e.image) cover = e.image
  })

  let topMood = ''
  let topMoodCount = 0
  moods.forEach((count, mood) => {
    if (count > topMoodCount) {
      topMood = mood
      topMoodCount = count
    }
  })

  const sorted = [...matches].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  )

  return {
    id: targetId,
    latitude: roundCoord(lat),
    longitude: roundCoord(lng),
    firstVisit: sorted[0].date,
    lastVisit: sorted[sorted.length - 1].date,
    visitCount: matches.length,
    photoCount: matches.filter((e) => e.image).length,
    recordCount: matches.filter((e) => e.content.trim()).length,
    topMood,
    topMoodCount,
    coverImage: cover,
  }
}

export function getAllPlaces(): Place[] {
  const entries = getEntries().filter(
    (e) => e.latitude !== null && e.longitude !== null,
  )

  const map = new Map<string, DiaryEntry[]>()
  entries.forEach((e) => {
    const id = placeId(e.latitude!, e.longitude!)
    if (!map.has(id)) map.set(id, [])
    map.get(id)!.push(e)
  })

  return Array.from(map.entries()).map(([id, matches]) => {
    const moods = new Map<string, number>()
    let cover: string | null = null

    matches.forEach((e) => {
      moods.set(e.mood, (moods.get(e.mood) || 0) + 1)
      if (!cover && e.image) cover = e.image
    })

    let topMood = ''
    let topMoodCount = 0
    moods.forEach((count, mood) => {
      if (count > topMoodCount) {
        topMood = mood
        topMoodCount = count
      }
    })

    const sorted = [...matches].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )

    return {
      id,
      latitude: sorted[0].latitude!,
      longitude: sorted[0].longitude!,
      firstVisit: sorted[0].date,
      lastVisit: sorted[sorted.length - 1].date,
      visitCount: matches.length,
      photoCount: matches.filter((e) => e.image).length,
      recordCount: matches.filter((e) => e.content.trim()).length,
      topMood,
      topMoodCount,
      coverImage: cover,
    }
  })
}

export function getEntriesForPlace(
  lat: number,
  lng: number,
): DiaryEntry[] {
  const targetId = placeId(lat, lng)
  return getEntries()
    .filter((e) => e.latitude !== null && e.longitude !== null)
    .filter((e) => placeId(e.latitude!, e.longitude!) === targetId)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
}

export function getPreviousVisits(
  lat: number,
  lng: number,
): DiaryEntry[] {
  const targetId = placeId(lat, lng)
  return getEntries()
    .filter((e) => e.latitude !== null && e.longitude !== null)
    .filter((e) => placeId(e.latitude!, e.longitude!) === targetId)
}