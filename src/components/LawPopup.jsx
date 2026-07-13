import { useEffect } from 'react'
import { X, Sprout, ShieldAlert, Info } from 'lucide-react'
import { STATUS } from '../lib/cannabisLaws.js'

export default function LawPopup({ feature, onClose }) {
  useEffect(() => {
    if (!feature) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [feature, onClose])

  if (!feature) return null
  const p = feature.properties
  const legal = p.status === STATUS.LEGAL

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="law-popup-title"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div
        className={`relative w-full max-w-md rounded-2xl border p-6 sm:p-8 ${
          legal ? 'border-green/40 bg-surface shadow-glow-green' : 'border-red-500/40 bg-surface shadow-[0_0_40px_-8px_rgba(239,68,68,0.45)]'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-green"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-700 uppercase tracking-wide ${
            legal ? 'bg-green/15 text-green' : 'bg-red-500/15 text-red-400'
          }`}
        >
          {legal ? <Sprout size={13} /> : <ShieldAlert size={13} />}
          {legal ? 'Legal to grow' : 'Not legal'}
        </span>

        <h2 id="law-popup-title" className="mt-4 text-2xl font-700 text-fg">{p.name}</h2>

        {legal ? (
          <div className="mt-5 space-y-4">
            <div>
              <h3 className="text-xs font-700 uppercase tracking-wide text-muted">Home cultivation</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-fg">{p.homeGrow}</p>
            </div>
            <div>
              <h3 className="text-xs font-700 uppercase tracking-wide text-muted">Amount you can carry</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-fg">{p.possession}</p>
            </div>
          </div>
        ) : (
          <div className="mt-5">
            <h3 className="text-xs font-700 uppercase tracking-wide text-muted">If caught with or growing cannabis</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-fg">{p.penalty}</p>
          </div>
        )}

        {p.note && (
          <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-purple/25 bg-purple/5 px-3.5 py-3">
            <Info size={15} className="mt-0.5 shrink-0 text-purple-soft" />
            <p className="text-xs leading-relaxed text-muted">{p.note}</p>
          </div>
        )}

        <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-muted/70">
          General information only, not legal advice. Laws change and local city/county rules can be
          stricter — always verify current law before cultivating or carrying cannabis.
        </p>
      </div>
    </div>
  )
}
