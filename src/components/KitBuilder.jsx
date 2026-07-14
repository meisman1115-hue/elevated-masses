import { useState, useMemo } from 'react'
import { ExternalLink, Wand2, Info, AlertCircle } from 'lucide-react'
import { buildKit, MIN_BUILD, MAX_BUILD, kitCategories } from '../lib/kits.js'
import { affiliateHref } from '../lib/nav.js'

const tierColor = {
  Starter: 'text-muted',
  Better: 'text-green',
  Premium: 'text-purple-soft',
}

export default function KitBuilder() {
  const [budget, setBudget] = useState(500)
  const result = useMemo(() => buildKit(budget), [budget])
  const sliderMax = MAX_BUILD

  return (
    <section className="rounded-3xl border border-green/25 bg-surface/60 p-6 shadow-glow-green sm:p-8">
      <div className="flex items-center gap-2">
        <Wand2 size={20} className="text-green" />
        <h2 className="text-2xl font-700 text-fg">Build my kit</h2>
      </div>
      <p className="mt-2 max-w-2xl text-muted">
        Enter your budget and we'll assemble a complete grow setup — everything you need, matched to what you
        can spend. Minimum complete build is <span className="font-600 text-fg">${MIN_BUILD}</span>.
      </p>

      {/* Budget input */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <label htmlFor="budget" className="text-sm font-600 text-fg">Your budget</label>
        <div className="flex items-center gap-2">
          <span className="text-lg font-700 text-green">$</span>
          <input
            id="budget"
            type="number"
            min={MIN_BUILD}
            step={10}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value) || 0)}
            className="w-32 rounded-xl border border-white/10 bg-bg px-4 py-2.5 text-lg font-700 text-fg focus:border-green/60 focus:outline-none"
          />
        </div>
        <input
          type="range"
          min={MIN_BUILD}
          max={sliderMax}
          step={10}
          value={Math.min(Math.max(budget, MIN_BUILD), sliderMax)}
          onChange={(e) => setBudget(Number(e.target.value))}
          aria-label="Budget slider"
          className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-white/10 accent-green"
        />
      </div>

      {/* Below minimum */}
      {!result.feasible ? (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-purple/30 bg-purple/5 px-4 py-3">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-purple-soft" />
          <p className="text-sm text-fg">
            A complete build starts at <span className="font-600">${result.minimum}</span>. Bump your budget up
            to at least that and we'll put your kit together.
          </p>
        </div>
      ) : (
        <>
          {/* Summary */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-bg/50 p-4">
              <p className="text-xs uppercase tracking-wide text-muted">Kit total</p>
              <p className="mt-1 font-display text-2xl font-700 text-green">${result.total}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-bg/50 p-4">
              <p className="text-xs uppercase tracking-wide text-muted">Your budget</p>
              <p className="mt-1 font-display text-2xl font-700 text-fg">${budget}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-bg/50 p-4">
              <p className="text-xs uppercase tracking-wide text-muted">Left over</p>
              <p className="mt-1 font-display text-2xl font-700 text-purple-soft">${result.remaining}</p>
            </div>
          </div>

          {/* Items */}
          <div className="mt-6 divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/10">
            {result.items.map((item) => (
              <div key={item.category} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wide text-muted">{item.category}</p>
                  <p className="mt-0.5 font-600 text-fg">
                    {item.name}
                    <span className={`ml-2 text-xs font-600 ${tierColor[item.tier]}`}>{item.tier}</span>
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-display text-lg font-700 text-green">${item.price}</span>
                  <a
                    href={affiliateHref(item.url)}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="btn-ghost !py-2 !px-4 text-xs"
                  >
                    Amazon <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 flex items-start gap-2 text-xs text-muted">
            <Info size={14} className="mt-0.5 shrink-0 text-green" />
            Tents, lights, ventilation, nutrients, meters, and the Premium climate-control option are real
            products (prices are estimates — check Amazon for current pricing). Grow System and Air Pump are
            still placeholders. Purchases through these links support Elevated Masses at no extra cost to you.
          </p>
        </>
      )}
    </section>
  )
}
