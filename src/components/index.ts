// ═══════════════════════════════════════════
// Nearby Memory Components — 统一组件索引 (Ch 4)
// 所有页面只能引用这里的组件，不能重新画
// ═══════════════════════════════════════════

// ── Sidebar ──
export { default as Calendar } from './Calendar'
export { default as Timeline } from './Timeline'
export { default as Quote } from './Quote'

// ── Doodle ──
export { InteractiveSeed, InteractiveLeaf, InteractiveSpark, InteractiveThread, InteractiveTape, InteractivePencilCircle } from './DoodleInteractive'

// ── Utility ──
export { default as Footer } from './Footer'
export { default as Sidebar } from './Sidebar'
export { default as MemoryWeave } from './MemoryWeave'

// ── Assets ──
export { AnnotationThread, AnnotationLeaf, AnnotationSpark, AnnotationSeed, AnnotationCircle, AnnotationTape } from './Annotation'

// ── Future (Chapter 6–10) ──
// ImageUploader, LocationPicker, MemoryCard, MemoryUpload, MoodSelector, PlaceCard
// → moved to src/components/future/ for Place Atlas / Emotion System / Seasons / Memory Garden
