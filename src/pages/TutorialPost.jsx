import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, GraduationCap, Check, X } from 'lucide-react'
import { getTutorial } from '../lib/tutorials.js'
import { MediaPlaceholder } from '../components/ui.jsx'
import ContentBlocks from '../components/ContentBlocks.jsx'
import NotFound from './NotFound.jsx'

export default function TutorialPost() {
  const { slug } = useParams()
  const t = getTutorial(slug)
  if (!t) return <NotFound />

  return (
    <article className="pb-8">
      <div className="relative overflow-hidden border-b border-white/10">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-80"
          style={{ backgroundImage: 'radial-gradient(50% 60% at 15% 0%, rgba(139,255,60,0.10), transparent 70%), radial-gradient(45% 55% at 90% 10%, rgba(168,85,247,0.16), transparent 70%)' }}
        />
        <div className="container-em max-w-3xl py-14">
          <Link to="/tutorials" className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-green">
            <ArrowLeft size={15} /> Back to tutorials
          </Link>
          <span className="chip mt-6 w-fit"><GraduationCap size={12} className="text-green" /> {t.category}</span>
          <h1 className="mt-4 text-3xl font-700 leading-tight text-fg sm:text-4xl">{t.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{t.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-muted">
            <span className="flex items-center gap-1.5"><Clock size={13} className="text-green" /> {t.readTime}</span>
            <span>·</span>
            <span>{t.level}</span>
          </div>
        </div>
      </div>

      <div className="container-em max-w-3xl py-10">
        <MediaPlaceholder ratio="aspect-[16/9]" label="Tutorial cover image" className="mb-8" />

        <ContentBlocks blocks={t.body} />

        {/* Pairings table */}
        {t.pairings && t.pairings.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-700 text-fg">Quick pairing chart</h2>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="bg-surface/70 text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-5 py-4 font-600">Plant</th>
                    <th className="px-5 py-4 font-600"><span className="flex items-center gap-1.5"><Check size={13} className="text-green" /> Good with</span></th>
                    <th className="px-5 py-4 font-600"><span className="flex items-center gap-1.5"><X size={13} className="text-purple-soft" /> Keep apart</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {t.pairings.map((p) => (
                    <tr key={p.plant} className="transition-colors hover:bg-white/[0.03]">
                      <td className="px-5 py-4 font-600 text-fg">{p.plant}</td>
                      <td className="px-5 py-4 text-muted">{p.goodWith}</td>
                      <td className="px-5 py-4 text-muted">{p.avoid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-green/25 bg-green/5 p-6 text-center">
          <p className="text-fg">Got a companion combo that works for you?</p>
          <Link to="/forum" className="btn-primary mt-4">Share it in the forum <ArrowLeft size={16} className="rotate-180" /></Link>
        </div>
      </div>
    </article>
  )
}
