import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { GrowRoomScene } from './illustrations.jsx'

// Every image dropped into src/assets/grow-photos/ is picked up automatically
// at build time — no manifest to maintain, just add/remove files and rebuild.
const modules = import.meta.glob('/src/assets/grow-photos/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}', {
  eager: true,
  import: 'default',
})
const photos = Object.keys(modules)
  .sort()
  .map((path) => modules[path])

const INTERVAL_MS = 6000

// Cycles through past/current grow photos in the homepage hero slot. Falls
// back to the illustrated grow scene until at least one photo is dropped in.
// Only the current photo is ever mounted — with 60+ real photos now in the
// folder, rendering all of them at once (as the old crossfade approach did)
// would force the browser to download every photo on page load.
export default function GrowGallery({ className = '' }) {
  const [index, setIndex] = useState(0)
  const [fadeKey, setFadeKey] = useState(0)
  const hasPhotos = photos.length > 0
  const hasMultiple = photos.length > 1

  useEffect(() => {
    if (!hasMultiple) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length)
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [hasMultiple])

  // Preload the next photo in the background so the transition feels smooth
  // without ever mounting more than one <img> at a time.
  useEffect(() => {
    if (!hasMultiple) return
    const next = new Image()
    next.src = photos[(index + 1) % photos.length]
  }, [index, hasMultiple])

  useEffect(() => {
    setFadeKey((k) => k + 1)
  }, [index])

  function goTo(i) {
    setIndex((i + photos.length) % photos.length)
  }

  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-surface ${className}`}>
      {hasPhotos ? (
        <img
          key={fadeKey}
          src={photos[index]}
          alt={`Grow photo ${index + 1}`}
          className="absolute inset-0 h-full w-full animate-fade-in object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
          <GrowRoomScene className="max-h-full max-w-[70%] opacity-90" />
          <p className="text-xs text-muted">Grow photos coming soon</p>
        </div>
      )}

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            className="absolute left-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
            aria-label="Previous photo"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
            aria-label="Next photo"
          >
            <ChevronRight size={18} />
          </button>
          <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white backdrop-blur">
            {index + 1} / {photos.length}
          </span>
        </>
      )}
    </div>
  )
}
