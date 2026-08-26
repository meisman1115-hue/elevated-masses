import { Link } from 'react-router-dom'
import { PageHeader, StubNote } from '../components/ui.jsx'
import { Clock, ChefHat, FlaskConical } from 'lucide-react'
import { recipes } from '../lib/recipes.js'

export default function Recipes() {
  return (
    <>
      <PageHeader
        eyebrow="Recipes"
        title="Cook with your harvest"
        description="Infused edibles made with what you grow. Always follow the dosing notes."
      />

      <div className="container-em py-12">
        <StubNote>
          Infused recipes include dosing reminders; grow and consume responsibly and legally.
        </StubNote>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((r) => (
            <Link key={r.slug} to={`/recipes/${r.slug}`} className="card-hover flex flex-col overflow-hidden">
              <img src={r.cover} alt={r.title} className="aspect-[16/10] w-full border-b border-white/10 object-cover" />
              <div className="flex flex-1 flex-col p-5">
                <span className="chip w-fit text-purple-soft">
                  <FlaskConical size={12} /> Infused
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
      </div>
    </>
  )
}
