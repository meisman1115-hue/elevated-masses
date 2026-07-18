import { useState, useEffect } from 'react'
import { GrowRoomScene } from './illustrations.jsx'

// Every image dropped into src/assets/grow-photos/ is picked up automatically
// at build time — no manifest to maintain, just add/remove files and rebuild.
const modules = import.meta.glob('/src/assets/grow-photos/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}', {
  eager: true,
  import: 'default',
})

// Fisher-Yates — shuffled once per page load so the rotation order varies
// across visits without needing any click-through controls.
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const photos = shuffle(Object.values(modules))

const INTERVAL_MS = 6000

// Auto-cycles through past/current grow photos in a random order in the
// homepage hero slot. Falls back to the illustrated grow scene until at
// least one photo is dropped in. Only the current photo is ever mounted —
// with 60+ real photos now in the folder, rendering all of them at once
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

  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-surface ${className}`}>
      {hasPhotos ? (
        <img
          key={fadeKey}
          src={photos[index]}
          alt="A photo from an Elevated Masses grow"
          className="absolute inset-0 h-full w-full animate-fade-in object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
          <GrowRoomScene className="max-h-full max-w-[70%] opacity-90" />
          <p className="text-xs text-muted">Grow photos coming soon</p>
        </div>
      )}
    </div>
  )
}
