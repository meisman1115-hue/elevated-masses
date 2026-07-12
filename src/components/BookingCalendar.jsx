import { useState } from 'react'
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Monthly booking calendar. Until the first subscriber joins, every upcoming
// date shows as "Booked". Flip `bookingOpen` to true (and provide real
// availability) once you're ready to take bookings.
export default function BookingCalendar({ bookingOpen = false }) {
  const today = new Date()
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() })

  const firstDay = new Date(view.year, view.month, 1).getDay()
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  function shift(delta) {
    setView((v) => {
      const m = v.month + delta
      return { year: v.year + Math.floor(m / 12), month: ((m % 12) + 12) % 12 }
    })
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-surface/50 p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-700 text-fg">
          {MONTHS[view.month]} {view.year}
        </h3>
        <div className="flex gap-1">
          <button type="button" onClick={() => shift(-1)} aria-label="Previous month" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-muted hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-green">
            <ChevronLeft size={16} />
          </button>
          <button type="button" onClick={() => shift(1)} aria-label="Next month" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-muted hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-green">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((w) => (
          <div key={w} className="pb-2 text-xs font-600 uppercase tracking-wide text-muted">{w}</div>
        ))}
        {cells.map((d, i) => {
          if (d === null) return <div key={`e${i}`} />
          const date = new Date(view.year, view.month, d)
          const isPast = date < startOfToday
          const bookable = !isPast && !bookingOpen // every future date is "booked" for now
          return (
            <div
              key={d}
              className={`relative flex aspect-square items-center justify-center rounded-lg text-sm ${
                isPast
                  ? 'text-muted/30'
                  : bookable
                  ? 'border border-purple/20 bg-purple/5 text-muted'
                  : 'border border-green/30 bg-green/5 text-green'
              }`}
              title={isPast ? undefined : bookable ? 'Booked' : 'Available'}
            >
              {d}
              {bookable && (
                <Lock size={9} className="absolute bottom-1 right-1 text-purple-soft/70" aria-hidden="true" />
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-white/10 pt-4 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded border border-purple/30 bg-purple/10" /> Booked
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded border border-green/40 bg-green/10" /> Available
        </span>
      </div>
    </div>
  )
}
