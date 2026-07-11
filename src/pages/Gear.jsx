import { PageHeader, MediaPlaceholder, StubNote } from '../components/ui.jsx'
import { ExternalLink, Star, Info } from 'lucide-react'
import { amazonLink } from '../lib/nav.js'

const categories = ['All', 'Grow Lights', 'Tents', 'Nutrients', 'Meters & Testers', 'Pumps & Air', 'Media & Pots']

// Placeholder products. Replace title/price and set `url` to the real Amazon
// product link — the affiliate tag (mrgrowurown-20) is added automatically.
const products = [
  { cat: 'Grow Lights', title: 'Full-Spectrum LED Grow Light 150W', price: '$—', rating: 4.6, url: 'https://www.amazon.com/dp/PLACEHOLDER1' },
  { cat: 'Tents', title: '2x2 Reflective Grow Tent', price: '$—', rating: 4.7, url: 'https://www.amazon.com/dp/PLACEHOLDER2' },
  { cat: 'Meters & Testers', title: 'Digital pH & EC Meter Combo', price: '$—', rating: 4.5, url: 'https://www.amazon.com/dp/PLACEHOLDER3' },
  { cat: 'Nutrients', title: 'Hydroponic Nutrient Starter Kit', price: '$—', rating: 4.8, url: 'https://www.amazon.com/dp/PLACEHOLDER4' },
  { cat: 'Pumps & Air', title: 'Quiet Air Pump + Stones Bundle', price: '$—', rating: 4.4, url: 'https://www.amazon.com/dp/PLACEHOLDER5' },
  { cat: 'Media & Pots', title: 'Net Cups & Clay Pebbles Pack', price: '$—', rating: 4.6, url: 'https://www.amazon.com/dp/PLACEHOLDER6' },
  { cat: 'Grow Lights', title: 'Clip-On Seedling LED', price: '$—', rating: 4.3, url: 'https://www.amazon.com/dp/PLACEHOLDER7' },
  { cat: 'Nutrients', title: 'Cal-Mag Supplement 1L', price: '$—', rating: 4.7, url: 'https://www.amazon.com/dp/PLACEHOLDER8' },
]

export default function Gear() {
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

        <StubNote>
          These are placeholder products. Swap in real Amazon links and your affiliate tag
          (<code className="text-green">mrgrowurown-20</code>) is appended automatically to every link.
        </StubNote>

        {/* Category filter */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c, i) => (
            <button
              key={c}
              type="button"
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                i === 0
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
          {products.map((p) => (
            <div key={p.title} className="card-hover flex flex-col overflow-hidden">
              <MediaPlaceholder ratio="aspect-square" label="Product image" className="rounded-none border-0 border-b border-white/10" />
              <div className="flex flex-1 flex-col p-5">
                <span className="chip w-fit">{p.cat}</span>
                <h3 className="mt-3 flex-1 text-base font-600 leading-snug text-fg">{p.title}</h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-display text-lg font-700 text-green">{p.price}</span>
                  <span className="flex items-center gap-1 text-xs text-muted">
                    <Star size={13} className="fill-green text-green" /> {p.rating}
                  </span>
                </div>
                <a
                  href={amazonLink(p.url)}
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
