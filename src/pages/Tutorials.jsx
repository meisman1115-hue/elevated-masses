import { Link } from 'react-router-dom'
import { PageHeader, MediaPlaceholder, StubNote } from '../components/ui.jsx'
import { Clock, Sprout, ArrowRight, GraduationCap } from 'lucide-react'
import { tutorials } from '../lib/tutorials.js'

export default function Tutorials() {
  return (
    <>
      <PageHeader
        eyebrow="Tutorials"
        title="Companion planting & grow guides"
        description="Step-by-step tutorials to help you grow smarter — starting with companion planting: pairing plants that protect and feed each other."
      />

      <div className="container-em py-12">
        <StubNote>
          Kicking off with companion planting. More tutorial tracks can be added by editing
          <code className="text-green"> src/lib/tutorials.js</code>.
        </StubNote>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {tutorials.map((t) => (
            <Link key={t.slug} to={`/tutorials/${t.slug}`} className="card-hover flex flex-col overflow-hidden">
              <MediaPlaceholder ratio="aspect-[16/10]" label="Tutorial image" icon={Sprout} className="rounded-none border-0 border-b border-white/10" />
              <div className="flex flex-1 flex-col p-5">
                <span className="chip w-fit"><GraduationCap size={12} className="text-green" /> {t.category}</span>
                <h3 className="mt-3 text-lg font-600 leading-snug text-fg">{t.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t.excerpt}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1.5"><Clock size={12} /> {t.readTime}</span>
                  <span>·</span>
                  <span>{t.level}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
