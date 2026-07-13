import { useState } from 'react'
import { PageHeader, MediaPlaceholder } from '../components/ui.jsx'
import { ExternalLink, Info, Package } from 'lucide-react'
import { affiliateHref } from '../lib/nav.js'
import { gearCategories as categories, gearProducts as products } from '../lib/gear.js'
import KitBuilder from '../components/KitBuilder.jsx'

export default function Gear() {
  const [filter, setFilter] = useState('All')
  const shown = filter === 'All' ? products : products.filter((p) => p.cat === filter)

  return (
    <>
      <PageHeader
        eyebrow="Gear · Amazon affiliate"
        title="Grow gear we actually trust"
        description="Hand-picked equipment for every stage of your grow. Every link goes straight to Amazon — buying through them supports Elevated Masses at no extra cost to you."
      />

      <div className="container-em py-12">
        {/* FTC affiliate disclosure — required for affiliate programs */}
        <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-surface/60 px-4 py-3 text-sm text-muted">
          <Info size={18} className="mt-0.5 shrink-0 text-green" />
          <p>
            <span className="font-600 text-fg">Affiliate disclosure:</span> As an Amazon Associate,
            Elevated Masses earns from qualifying purchases. Prices and availability are shown on Amazon.
          </p>
        </div>

        {/* Budget-based complete-kit builder */}
        <div className="mt-8">
          <KitBuilder />
        </div>

        <h2 className="mt-14 text-2xl font-700 text-fg">Or browse gear individually</h2>
        <p className="mt-2 text-muted">Tap through to Amazon for current prices, sizes and reviews.</p>

        {/* Category filter */}
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                filter === c
                  ? 'border-green/60 bg-green/10 text-green'
                  : 'border-white/10 bg-white/5 text-muted hover:border-green/40 hover:text-fg'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((p) => (
            <div key={p.title} className="card-hover flex flex-col overflow-hidden">
              <MediaPlaceholder ratio="aspect-square" label={p.brand} icon={Package} className="rounded-none border-0 border-b border-white/10" />
              <div className="flex flex-1 flex-col p-5">
                <span className="chip w-fit">{p.brand}</span>
                <h3 className="mt-3 flex-1 text-base font-600 leading-snug text-fg">{p.title}</h3>
                <a
                  href={affiliateHref(p.url)}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="btn-primary mt-4 w-full"
                >
                  View on Amazon <ExternalLink size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
