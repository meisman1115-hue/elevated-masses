import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, MediaPlaceholder, StubNote } from '../components/ui.jsx'
import { Clock, ChefHat, Leaf, FlaskConical, ArrowRight } from 'lucide-react'
import { recipes } from '../lib/recipes.js'

const filters = [
  { key: 'all', label: 'All recipes' },
  { key: 'infused', label: 'Infused' },
  { key: 'fresh', label: 'Fresh from the grow' },
]

export default function Recipes() {
  const [filter, setFilter] = useState('all')
  const shown = filter === 'all' ? recipes : recipes.filter((r) => r.type === filter)

  return (
    <>
      <PageHeader
        eyebrow="Recipes"
        title="Cook with your harvest"
        description="Infused edibles and fresh dishes made with what you grow. Filter by type, and always follow the dosing notes on infused recipes."
      />

      <div className="container-em py-12">
        <StubNote>
          A starter set of recipes — add your own by editing <code className="text-green">src/lib/recipes.js</code>.
          Infused recipes include dosing reminders; grow and consume responsibly and legally.
        </StubNote>

        {/* Filter */}
        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                filter === f.key ? 'border-green/60 bg-green/10 text-green' : 'border-white/10 bg-white/5 text-muted hover:border-green/40 hover:text-fg'
              }`}
            >
              {f.key === 'infused' && <FlaskConical size={14} />}
              {f.key === 'fresh' && <Leaf size={14} />}
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((r) => (
            <Link key={r.slug} to={`/recipes/${r.slug}`} className="card-hover flex flex-col overflow-hidden">
              <MediaPlaceholder ratio="aspect-[16/10]" label="Recipe photo" className="rounded-none border-0 border-b border-white/10" />
              <div className="flex flex-1 flex-col p-5">
                <span className={`chip w-fit ${r.type === 'infused' ? 'text-purple-soft' : 'text-green'}`}>
                  {r.type === 'infused' ? <FlaskConical size={12} /> : <Leaf size={12} />}
                  {r.type === 'infused' ? 'Infused' : 'Fresh'}
                </span>
                <h3 className="mt-3 text-lg font-600 leading-snug text-fg">{r.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{r.excerpt}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1.5"><Clock size={12} /> {r.time}</span>
                  <span className="flex items-center gap-1.5"><ChefHat size={12} /> {r.difficulty}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {shown.length === 0 && (
          <p className="mt-10 rounded-2xl border border-dashed border-white/15 bg-surface/40 p-10 text-center text-muted">
            No recipes in this category yet.
          </p>
        )}
      </div>
    </>
  )
}
