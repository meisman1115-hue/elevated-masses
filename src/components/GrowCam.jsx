import { useState, useEffect, useCallback, useRef } from 'react'
import { Camera, WifiOff } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'
import { GrowRoomScene } from './illustrations.jsx'

const REFRESH_MS = 30_000
const STALE_AFTER_MS = 5 * 60_000 // no fresh upload in 5min reads as offline, not just "old"

function formatAgo(date) {
  const seconds = Math.max(0, Math.round((Date.now() - date.getTime()) / 1000))
  if (seconds < 15) return 'just now'
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  return `${Math.round(minutes / 60)}h ago`
}

// Auto-refreshing "live" view into the grow tent — actually a still image a
// local script (scripts/upload-grow-cam-snapshot.mjs) periodically uploads to
// Supabase Storage. Falls back to the illustrated grow scene until a
// snapshot has ever been uploaded, or if uploads go stale.
export default function GrowCam({ className = '' }) {
  const [state, setState] = useState('loading') // loading | live | offline
  const [updatedAt, setUpdatedAt] = useState(null)
  const [cacheBust, setCacheBust] = useState(() => Date.now())
  const [, forceTick] = useState(0)
  const publicUrl = useRef(null)

  if (isSupabaseConfigured && !publicUrl.current) {
    publicUrl.current = supabase.storage.from('grow-cam').getPublicUrl('latest.jpg').data.publicUrl
  }

  const checkFreshness = useCallback(() => {
    if (!isSupabaseConfigured || !publicUrl.current) {
      setState('offline')
      return
    }
    fetch(publicUrl.current, { method: 'HEAD', cache: 'no-store' })
      .then((res) => {
        if (!res.ok) {
          setState('offline')
          return
        }
        const lastModified = res.headers.get('last-modified')
        const modified = lastModified ? new Date(lastModified) : new Date()
        setUpdatedAt(modified)
        setState(Date.now() - modified.getTime() > STALE_AFTER_MS ? 'offline' : 'live')
      })
      .catch(() => setState('offline'))
  }, [])

  useEffect(() => {
    checkFreshness()
    const refreshInterval = setInterval(() => {
      setCacheBust(Date.now())
      checkFreshness()
    }, REFRESH_MS)
    const tickInterval = setInterval(() => forceTick((n) => n + 1), 5000)
    return () => {
      clearInterval(refreshInterval)
      clearInterval(tickInterval)
    }
  }, [checkFreshness])

  const isLive = state === 'live'

  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-surface ${className}`}>
      {isLive ? (
        <img
          src={`${publicUrl.current}?t=${cacheBust}`}
          alt="Live view of the Elevated Masses grow tent"
          className="h-full w-full object-cover"
          onError={() => setState('offline')}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
          <GrowRoomScene className="max-h-full max-w-[70%] opacity-90" />
          <p className="flex items-center gap-1.5 text-xs text-muted">
            <WifiOff size={13} /> Live cam coming online soon
          </p>
        </div>
      )}

      <span
        className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-700 uppercase tracking-wide backdrop-blur ${
          isLive ? 'bg-red-500/90 text-white' : 'bg-black/60 text-muted'
        }`}
      >
        <Camera size={12} />
        {isLive ? (
          <>
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse-glow" aria-hidden="true" />
            Live
          </>
        ) : (
          'Offline'
        )}
      </span>

      {isLive && updatedAt && (
        <span className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs text-muted backdrop-blur">
          Updated {formatAgo(updatedAt)}
        </span>
      )}
    </div>
  )
}
