import { PageHeader } from '../components/ui.jsx'
import { FileText, Download, FileArchive, ClipboardList, Ruler } from 'lucide-react'

// Downloadable resources. Set `file` to a real path in /public (or a URL) when
// the file is ready; until then the button shows "Coming soon".
const resources = [
  { icon: Ruler, title: 'RDWC 1-Pot Build Guide', desc: 'Parts list + step-by-step assembly for a single-site recirculating DWC system.', type: 'PDF', size: '2 pages', file: '/downloads/rdwc-1-pot-build.pdf', cat: 'Blueprints' },
  { icon: Ruler, title: 'RDWC 2-Pot Build Guide', desc: 'Two grow buckets on a shared control reservoir — full build walkthrough.', type: 'PDF', size: '2 pages', file: '/downloads/rdwc-2-pot-build.pdf', cat: 'Blueprints' },
  { icon: Ruler, title: 'RDWC 4-Pot Build Guide', desc: 'A four-bucket recirculating loop with sizing for pumps and air.', type: 'PDF', size: '2 pages', file: '/downloads/rdwc-4-pot-build.pdf', cat: 'Blueprints' },
  { icon: ClipboardList, title: 'Nutrient Mixing Cheat Sheet', desc: 'Quick-reference EC/pH targets by growth stage.', type: 'PDF', size: '—', file: null, cat: 'Guides' },
  { icon: ClipboardList, title: 'Weekly Grow Checklist', desc: 'A printable routine so nothing slips between feedings.', type: 'PDF', size: '—', file: null, cat: 'Guides' },
  { icon: FileArchive, title: 'Beginner Starter Pack', desc: 'A bundle of the essentials to get your first grow going.', type: 'ZIP', size: '—', file: null, cat: 'Bundles' },
]

export default function Downloads() {
  return (
    <>
      <PageHeader
        eyebrow="Downloads"
        title="Blueprints & grow resources"
        description="Free digital blueprints, guides and checklists — no account needed."
      />

      <div className="container-em py-12">
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => {
            const Icon = r.icon
            const available = Boolean(r.file)
            return (
              <div key={r.title} className="card flex flex-col p-6">
                <div className="flex items-start justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-green/10 text-green">
                    <Icon size={20} />
                  </span>
                  <span className="chip">{r.cat}</span>
                </div>
                <h3 className="mt-4 text-lg font-600 text-fg">{r.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{r.desc}</p>
                <div className="mt-4 flex items-center gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1.5"><FileText size={12} /> {r.type}</span>
                  <span>·</span>
                  <span>{r.size}</span>
                </div>

                {available ? (
                  <a href={r.file} download className="btn-primary mt-5 w-full">
                    <Download size={15} /> Download
                  </a>
                ) : (
                  <button type="button" disabled className="btn-ghost mt-5 w-full opacity-50">
                    File coming soon
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
