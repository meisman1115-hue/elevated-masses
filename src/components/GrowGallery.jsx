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
export default function GrowGallery({ className = '' }) {
  const [index, setIndex] = useState(0)
  const hasPhotos = photos.length > 0
  const hasMultiple = photos.length > 1

  useEffect(() => {
    if (!hasMultiple) return
    const id = setInterval(() => setIndex((i) => (i + 1) % photos.length), INTERVAL_MS)
    return () => clearInterval(id)
  }, [hasMultiple])

  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-surface ${className}`}>
      {hasPhotos ? (
        photos.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Grow photo ${i + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))
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
            onClick={() => setIndex((i) => (i - 1 + photos.length) % photos.length)}
            className="absolute left-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
            aria-label="Previous photo"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % photos.length)}
            className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
            aria-label="Next photo"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-5 bg-green' : 'w-1.5 bg-white/40'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
