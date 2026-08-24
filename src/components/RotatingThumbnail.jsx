import { useState, useEffect } from 'react'

const INTERVAL_MS = 4000

// Auto-cycles through a small set of photos with a fade transition — same
// pattern as GrowGallery, for download cards that have more than one
// reference photo.
export default function RotatingThumbnail({ photos, alt, className = '' }) {
  const [index, setIndex] = useState(0)
  const [fadeKey, setFadeKey] = useState(0)
  const hasMultiple = photos.length > 1

  useEffect(() => {
    if (!hasMultiple) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length)
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [hasMultiple, photos.length])

  // Preload the next photo so the transition feels smooth without ever
  // mounting more than one <img> at a time.
  useEffect(() => {
    if (!hasMultiple) return
    const next = new Image()
    next.src = photos[(index + 1) % photos.length]
  }, [index, hasMultiple, photos])

  useEffect(() => {
    setFadeKey((k) => k + 1)
  }, [index])

  return <img key={fadeKey} src={photos[index]} alt={alt} className={`animate-fade-in ${className}`} />
}
