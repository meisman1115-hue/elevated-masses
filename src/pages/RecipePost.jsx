import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, ChefHat, Users, FlaskConical, Leaf, AlertTriangle } from 'lucide-react'
import { getRecipe } from '../lib/recipes.js'
import { MediaPlaceholder } from '../components/ui.jsx'
import ContentBlocks from '../components/ContentBlocks.jsx'
import NotFound from './NotFound.jsx'

export default function RecipePost() {
  const { slug } = useParams()
  const r = getRecipe(slug)
  if (!r) return <NotFound />

  const infused = r.type === 'infused'

  return (
    <article className="pb-8">
      <div className="relative overflow-hidden border-b border-white/10">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-80"
          style={{ backgroundImage: 'radial-gradient(50% 60% at 15% 0%, rgba(139,255,60,0.10), transparent 70%), radial-gradient(45% 55% at 90% 10%, rgba(168,85,247,0.16), transparent 70%)' }}
        />
        <div className="container-em max-w-3xl py-14">
          <Link to="/recipes" className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-green">
            <ArrowLeft size={15} /> Back to recipes
          </Link>
          <span className={`chip mt-6 w-fit ${infused ? 'text-purple-soft' : 'text-green'}`}>
            {infused ? <FlaskConical size={12} /> : <Leaf size={12} />}
            {infused ? 'Infused' : 'Fresh from the grow'}
          </span>
          <h1 className="mt-4 text-3xl font-700 leading-tight text-fg sm:text-4xl">{r.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{r.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-muted">
            <span className="flex items-center gap-1.5"><Clock size={13} className="text-green" /> {r.time}</span>
            <span className="flex items-center gap-1.5"><ChefHat size={13} className="text-green" /> {r.difficulty}</span>
            <span className="flex items-center gap-1.5"><Users size={13} className="text-green" /> {r.yields}</span>
          </div>
        </div>
      </div>

      <div className="container-em max-w-3xl py-10">
        <MediaPlaceholder ratio="aspect-[16/9]" label="Finished dish photo" className="mb-8" />

        {infused && r.dose && (
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-purple/30 bg-purple/5 px-4 py-3">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-purple-soft" />
            <p className="text-sm leading-relaxed text-fg">
              <span className="font-600">Dosing:</span> {r.dose} Keep edibles away from children and pets, and never drive after consuming.
            </p>
          </div>
        )}

        <div className="grid gap-10 sm:grid-cols-[1fr_1.4fr]">
          {/* Ingredients */}
          <div>
            <h2 className="text-xl font-700 text-fg">Ingredients</h2>
            <ul className="mt-4 space-y-2.5">
              {r.ingredients.map((ing, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green" aria-hidden="true" />
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div>
            <h2 className="text-xl font-700 text-fg">Method</h2>
            <ol className="mt-4 space-y-4">
              {r.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-muted">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green/10 text-sm font-700 text-green" aria-hidden="true">{i + 1}</span>
                  <span className="pt-0.5 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {r.notes && r.notes.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-700 text-fg">Notes</h2>
            <ContentBlocks blocks={r.notes} />
          </div>
        )}
      </div>
    </article>
  )
}
