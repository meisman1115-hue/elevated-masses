import { useState, useEffect } from 'react'
import { ShieldCheck } from 'lucide-react'

const STORAGE_KEY = 'em-age-verified-21'
const MIN_AGE = 21

// Full-screen age gate. Shows until the visitor confirms they're 21+, then
// remembers the choice on this device so it doesn't ask again.
export default function AgeGate() {
  const [status, setStatus] = useState('checking') // checking | prompt | denied | ok

  useEffect(() => {
    const ok = localStorage.getItem(STORAGE_KEY) === 'yes'
    setStatus(ok ? 'ok' : 'prompt')
  }, [])

  // Lock scroll while the gate blocks the page.
  useEffect(() => {
    const blocking = status === 'prompt' || status === 'denied'
    document.body.style.overflow = blocking ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [status])

  if (status === 'ok' || status === 'checking') return null

  function confirm() {
    localStorage.setItem(STORAGE_KEY, 'yes')
    setStatus('ok')
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-bg/95 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(50% 40% at 50% 0%, rgba(139,255,60,0.10), transparent 70%), radial-gradient(45% 45% at 80% 100%, rgba(168,85,247,0.16), transparent 70%)' }}
      />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-surface p-8 text-center shadow-glow-green">
        <img
          src="/elevated-masses-wordmark.jpg"
          alt="Elevated Masses"
          className="mx-auto h-12 w-auto rounded-md"
        />

        {status === 'prompt' ? (
          <>
            <h1 id="age-gate-title" className="mt-7 text-2xl font-700 text-fg">Are you {MIN_AGE} or older?</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              You must be at least {MIN_AGE} years old to enter this site. By continuing, you confirm you meet
              the legal age requirement in your location.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={confirm} className="btn-primary flex-1">
                <ShieldCheck size={16} /> Yes, I'm {MIN_AGE}+
              </button>
              <button type="button" onClick={() => setStatus('denied')} className="btn-ghost flex-1">
                No, I'm under {MIN_AGE}
              </button>
            </div>
            <p className="mt-5 text-xs text-muted/60">
              We store your confirmation on this device so we don't ask every visit.
            </p>
          </>
        ) : (
          <>
            <h1 id="age-gate-title" className="mt-7 text-2xl font-700 text-fg">Come back soon</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Sorry — you must be {MIN_AGE} or older to view Elevated Masses. Please close this tab.
            </p>
            <button type="button" onClick={() => setStatus('prompt')} className="btn-ghost mt-8">
              Go back
            </button>
          </>
        )}
      </div>
    </div>
  )
}
