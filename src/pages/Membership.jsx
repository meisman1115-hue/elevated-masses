import { PageHeader, StubNote } from '../components/ui.jsx'
import { PATREON_URL } from '../lib/nav.js'
import { Check, Sprout, Leaf, Flower2, Wheat, ArrowRight } from 'lucide-react'

const tiers = [
  {
    name: 'Seedling',
    price: '$5',
    icon: Sprout,
    perks: [
      '25 AI grow-assistant searches/week',
      'Discord/community access',
      'Early access to content (24-48hrs before public)',
      'Patron-only posts (behind-the-scenes, bloopers)',
    ],
  },
  {
    name: 'Vegging',
    price: '$20',
    icon: Leaf,
    perks: [
      '100 AI searches/week',
      'Everything in Seedling',
      'Exclusive deep-dive content (long-form stuff too technical for TikTok)',
      'Vote on upcoming topics/polls',
    ],
  },
  {
    name: 'Flowering',
    price: '$50',
    icon: Flower2,
    perks: [
      '100 AI searches/week',
      'Everything in Vegging',
      'Name/handle listed as a supporter on the website',
      'Access to a patron-only monthly Q&A thread (written, answered in batch — no live call)',
    ],
  },
  {
    name: 'Harvest',
    price: '$100',
    icon: Wheat,
    perks: [
      'Unlimited AI searches',
      'Everything in Flowering',
      'Quarterly group video Q&A (one call, all Harvest patrons join together)',
      'Digital grow reference pack (PDFs/cheat sheets)',
    ],
  },
]

export default function Membership() {
  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title="Grow with us"
        description="Join on Patreon for AI grow-assistant access, community perks, and exclusive content — pick the tier that fits how deep you want to go."
      >
        <a href={PATREON_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Join on Patreon <ArrowRight size={16} />
        </a>
      </PageHeader>

      <div className="container-em py-12">
        <StubNote>
          Tiers are set manually for now (no live Patreon integration yet) — the Patreon link is a
          placeholder until your page is live. Set <code className="text-green">PATREON_URL</code> in{' '}
          <code className="text-green">src/lib/nav.js</code>.
        </StubNote>

        {/* Tiers */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => {
            const Icon = tier.icon
            return (
              <div key={tier.name} className="flex flex-col rounded-2xl border border-white/10 bg-surface/50 p-6 sm:p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-green/10 text-green">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 text-xl font-700 text-fg">{tier.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-700 text-fg">{tier.price}</span>
                  <span className="text-sm text-muted">/ month</span>
                </div>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex gap-2.5 text-sm text-muted">
                      <Check size={16} className="mt-0.5 shrink-0 text-green" /> {perk}
                    </li>
                  ))}
                </ul>
                <a href={PATREON_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-6 w-full">
                  Join on Patreon
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
