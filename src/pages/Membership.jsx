import { PageHeader, StubNote } from '../components/ui.jsx'
import BookingCalendar from '../components/BookingCalendar.jsx'
import { PATREON_URL } from '../lib/nav.js'
import { Check, Phone, Star, Crown, ArrowRight, Info } from 'lucide-react'

// Tiers. The $10 tier is defined; higher tiers are placeholders to refine.
const tiers = [
  {
    name: 'Elevated',
    price: '$10',
    icon: Star,
    highlight: true,
    tagline: 'Get one-on-one time every month.',
    perks: [
      '10-minute phone or Zoom call each month',
      'Members-only forum badge',
      'Early access to new blueprints & recipes',
      'A say in upcoming content',
    ],
  },
  {
    name: 'Elevated+',
    price: '$25',
    icon: Crown,
    highlight: false,
    tagline: 'More time, more perks. (Coming soon)',
    perks: [
      'Everything in Elevated',
      'Longer monthly call',
      'Exclusive build walkthroughs',
      'Priority Q&A',
    ],
    comingSoon: true,
  },
  {
    name: 'Cultivator',
    price: '$50',
    icon: Crown,
    highlight: false,
    tagline: 'For the serious grower. (Coming soon)',
    perks: [
      'Everything in Elevated+',
      'Monthly deep-dive session',
      'Direct message access',
      'Early product drops',
    ],
    comingSoon: true,
  },
]

export default function Membership() {
  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title="Grow with us, one-on-one"
        description="Become a member for direct access, exclusive content, and a monthly call to talk through your grow. Memberships are handled through Patreon."
      >
        <a href={PATREON_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Join on Patreon <ArrowRight size={16} />
        </a>
      </PageHeader>

      <div className="container-em py-12">
        <StubNote>
          Tiers and perks are a starting point — refine them anytime. The Patreon link is a placeholder
          until your page is live (set <code className="text-green">PATREON_URL</code> in <code className="text-green">src/lib/nav.js</code>).
        </StubNote>

        {/* Tiers */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => {
            const Icon = tier.icon
            return (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl border p-6 sm:p-7 ${
                  tier.highlight ? 'border-green/40 bg-green/[0.04] shadow-glow-green' : 'border-white/10 bg-surface/50'
                }`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-6 rounded-full bg-green px-3 py-1 text-xs font-700 text-bg">Most popular</span>
                )}
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${tier.highlight ? 'bg-green/15 text-green' : 'bg-white/5 text-purple-soft'}`}>
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 text-xl font-700 text-fg">{tier.name}</h3>
                <p className="mt-1 text-sm text-muted">{tier.tagline}</p>
                <div className="mt-4 flex items-baseline gap-1">
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
                <a
                  href={PATREON_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 w-full ${tier.highlight ? 'btn-primary' : 'btn-ghost'} ${tier.comingSoon ? 'pointer-events-none opacity-50' : ''}`}
                  aria-disabled={tier.comingSoon || undefined}
                >
                  {tier.comingSoon ? 'Coming soon' : 'Join on Patreon'}
                </a>
              </div>
            )
          })}
        </div>

        {/* Booking */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="eyebrow">Your monthly call</span>
            <h2 className="mt-3 text-3xl font-700 text-fg">Book your 1-on-1</h2>
            <p className="mt-4 leading-relaxed text-muted">
              Every <span className="text-fg">Elevated</span> member gets a 10-minute phone or Zoom call each
              month — bring your grow questions, a plant problem, or just talk shop.
            </p>
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-purple/30 bg-purple/5 px-4 py-3">
              <Info size={18} className="mt-0.5 shrink-0 text-purple-soft" />
              <p className="text-sm leading-relaxed text-fg">
                Booking opens once we reach our <span className="font-600">first subscriber</span>. Until then,
                all dates show as booked — join on Patreon to be first in line.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-surface/50 px-4 py-3 text-sm text-muted">
              <Phone size={18} className="text-green" />
              Calls happen by phone or Zoom — you'll get a link after booking.
            </div>
          </div>

          <BookingCalendar bookingOpen={false} />
        </div>
      </div>
    </>
  )
}
