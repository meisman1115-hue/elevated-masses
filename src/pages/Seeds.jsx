import { Link } from 'react-router-dom'
import { PageHeader, StubNote } from '../components/ui.jsx'
import ContentBlocks from '../components/ContentBlocks.jsx'
import { seedsGuideBlocks } from '../lib/seedsGuide.js'
import { ExternalLink, Info, Leaf, Tag, Handshake } from 'lucide-react'

const companies = [
  {
    name: 'FastBuds',
    logo: '/logos/fastbuds.svg',
    blurb: 'Autoflower specialists known for fast, resilient genetics that finish quick without sacrificing yield — a solid pick for indoor and hydro growers.',
    tags: ['Autoflower', 'Feminized'],
    url: 'https://2fast4buds.com/us',
    promoCode: 'UROWN',
    promoText: '15% off your order',
  },
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
          FastBuds is our live seed partner. Breeders looking to get featured can apply directly below.
        </StubNote>

        {/* Companies */}
        <h2 className="mt-12 text-2xl font-700 text-fg">Featured seed companies</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {companies.map((c) => (
            <div key={c.name} className="card-hover flex flex-col p-6">
              <div className="mb-5 flex aspect-[16/9] w-full items-center justify-center rounded-2xl border border-white/10 bg-surface2 p-8">
                <img src={c.logo} alt={`${c.name} logo`} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="chip"><Leaf size={12} className="text-green" /> {t}</span>
                ))}
              </div>
              <h3 className="mt-3 text-lg font-600 text-fg">{c.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.blurb}</p>

              {c.promoCode && (
                <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-green/30 bg-green/5 px-4 py-3">
                  <span className="flex items-center gap-2 text-sm text-fg">
                    <Tag size={15} className="text-green" /> {c.promoText}
                  </span>
                  <span className="rounded-full bg-green px-3 py-1 font-mono text-xs font-700 text-bg">{c.promoCode}</span>
                </div>
              )}

              {c.url ? (
                <a
                  href={c.url}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="btn-primary mt-5 w-full"
                >
                  Shop {c.name} <ExternalLink size={15} />
                </a>
              ) : (
                <button type="button" className="btn-ghost mt-5 w-full" disabled>
                  Link coming soon <ExternalLink size={15} />
                </button>
              )}
            </div>
          ))}

          <div className="card-hover flex flex-col items-center p-6 text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-purple/10 text-purple">
              <Handshake size={26} />
            </span>
            <h3 className="mt-5 text-lg font-600 text-fg">Are you a breeder?</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              We're always looking for more genetics to feature. If you run a seed company and want your
              strains in front of our growers, tell us about it.
            </p>
            <Link to="/contact" className="btn-primary mt-5 w-full">
              Submit your info <Handshake size={15} />
            </Link>
          </div>
        </div>

        {/* Variety guide */}
        <h2 className="mt-16 text-2xl font-700 text-fg">Know your seeds</h2>
        <div className="mt-2">
          <ContentBlocks blocks={seedsGuideBlocks} />
        </div>
      </div>
    </>
  )
}
