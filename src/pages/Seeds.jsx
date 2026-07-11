import { PageHeader, MediaPlaceholder, StubNote } from '../components/ui.jsx'
import { ExternalLink, Info, Leaf, Sun, Timer } from 'lucide-react'

const companies = [
  { name: 'Seed Company One', blurb: 'Feminized & autoflower genetics. Placeholder — partnership pending.', tags: ['Autoflower', 'Feminized'] },
  { name: 'Seed Company Two', blurb: 'Heirloom vegetable & herb seeds for hydro. Placeholder — partnership pending.', tags: ['Heirloom', 'Herbs'] },
  { name: 'Seed Company Three', blurb: 'High-yield hydroponic strains. Placeholder — partnership pending.', tags: ['High-yield', 'Indoor'] },
]

const strains = [
  { name: 'Strain / Variety A', type: 'Autoflower', flower: '9–10 wks', yield: 'Medium' },
  { name: 'Strain / Variety B', type: 'Photoperiod', flower: '8–9 wks', yield: 'High' },
  { name: 'Strain / Variety C', type: 'Autoflower', flower: '10–11 wks', yield: 'Medium' },
  { name: 'Strain / Variety D', type: 'Photoperiod', flower: '9 wks', yield: 'High' },
]

export default function Seeds() {
  return (
    <>
      <PageHeader
        eyebrow="Seeds · Affiliate partners"
        title="Genetics worth growing"
        description="Curated seed companies and varieties suited to indoor and hydroponic setups. We link you straight to the source."
      />

      <div className="container-em py-12">
        <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-surface/60 px-4 py-3 text-sm text-muted">
          <Info size={18} className="mt-0.5 shrink-0 text-green" />
          <p>
            <span className="font-600 text-fg">Affiliate disclosure:</span> Some seed links are affiliate
            links — Elevated Masses may earn a commission at no extra cost to you. Grow responsibly and
            follow the laws in your area.
          </p>
        </div>

        <StubNote>
          Seed partnerships are in progress. These are placeholders — company names, logos and links
          drop in here as affiliate inquiries come back.
        </StubNote>

        {/* Companies */}
        <h2 className="mt-12 text-2xl font-700 text-fg">Featured seed companies</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {companies.map((c) => (
            <div key={c.name} className="card-hover flex flex-col p-6">
              <MediaPlaceholder ratio="aspect-[16/9]" label="Company logo" className="mb-5" />
              <div className="flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="chip"><Leaf size={12} className="text-green" /> {t}</span>
                ))}
              </div>
              <h3 className="mt-3 text-lg font-600 text-fg">{c.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.blurb}</p>
              <button type="button" className="btn-ghost mt-5 w-full" disabled>
                Link coming soon <ExternalLink size={15} />
              </button>
            </div>
          ))}
        </div>

        {/* Strain table */}
        <h2 className="mt-16 text-2xl font-700 text-fg">Variety guide</h2>
        <p className="mt-2 text-muted">A quick-reference table — fill in real varieties as partners come on board.</p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-surface/70 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-4 font-600">Variety</th>
                <th className="px-5 py-4 font-600"><span className="flex items-center gap-1.5"><Leaf size={13} /> Type</span></th>
                <th className="px-5 py-4 font-600"><span className="flex items-center gap-1.5"><Timer size={13} /> Flower time</span></th>
                <th className="px-5 py-4 font-600"><span className="flex items-center gap-1.5"><Sun size={13} /> Yield</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {strains.map((s) => (
                <tr key={s.name} className="transition-colors hover:bg-white/[0.03]">
                  <td className="px-5 py-4 font-600 text-fg">{s.name}</td>
                  <td className="px-5 py-4 text-muted">{s.type}</td>
                  <td className="px-5 py-4 text-muted">{s.flower}</td>
                  <td className="px-5 py-4 text-muted">{s.yield}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
