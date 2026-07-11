import { PageHeader, StubNote } from '../components/ui.jsx'
import {
  MessageSquare, Users, Flame, Pin, ArrowRight, Search,
  Sprout, Wrench, Bug, Trophy, HelpCircle, Leaf,
} from 'lucide-react'

const categories = [
  { icon: Sprout, name: 'New Growers', desc: 'Start here — no question too basic.', threads: 128, color: 'text-green' },
  { icon: Wrench, name: 'Builds & Setups', desc: 'Show your system, share your parts list.', threads: 214, color: 'text-green' },
  { icon: Bug, name: 'Pests & Problems', desc: 'Diagnose issues with the community.', threads: 176, color: 'text-purple-soft' },
  { icon: Leaf, name: 'Nutrients & Feeding', desc: 'Recipes, schedules, pH & EC talk.', threads: 143, color: 'text-green' },
  { icon: Trophy, name: 'Harvest & Wins', desc: 'Show off the payoff.', threads: 98, color: 'text-green' },
  { icon: HelpCircle, name: 'Off-Topic', desc: 'Everything else, growers lounge.', threads: 87, color: 'text-purple-soft' },
]

const threads = [
  { pinned: true, title: 'Welcome + community rules — read before posting', author: 'Elevated Masses', replies: 12, cat: 'Announcements' },
  { hot: true, title: 'First grow, leaves curling up at the edges — help?', author: 'grower_mike', replies: 34, cat: 'Pests & Problems' },
  { title: 'My 2x2 vertical NFT wall build (pic heavy)', author: 'urbanroots', replies: 27, cat: 'Builds & Setups' },
  { hot: true, title: 'Best budget pH meter that actually lasts?', author: 'hydroholly', replies: 41, cat: 'Nutrients & Feeding' },
  { title: 'Autoflower vs photoperiod for a first-timer', author: 'greenthumb22', replies: 19, cat: 'New Growers' },
  { title: 'Harvest update: 3 weeks of curing done right', author: 'sundialsam', replies: 15, cat: 'Harvest & Wins' },
]

export default function Forum() {
  return (
    <>
      <PageHeader
        eyebrow="Community Forum"
        title="Connect with growers"
        description="Ask questions, share builds, troubleshoot together. This is the layout — accounts and live posting get wired up next."
      >
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn-primary">Start a thread <ArrowRight size={16} /></button>
          <button type="button" className="btn-ghost">Sign in</button>
        </div>
      </PageHeader>

      <div className="container-em py-12">
        <StubNote>
          The forum needs user accounts and a database to go live. This page shows the full design —
          the next step is wiring it to a backend (e.g. Supabase) so people can register and post for real.
        </StubNote>

        {/* Stats + search */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-6">
            {[
              { icon: Users, n: '1,204', l: 'Members' },
              { icon: MessageSquare, n: '3,410', l: 'Threads' },
              { icon: Flame, n: '128', l: 'Online' },
            ].map(({ icon: Icon, n, l }) => (
              <div key={l} className="flex items-center gap-2.5">
                <Icon size={18} className="text-green" />
                <span><span className="font-700 text-fg">{n}</span> <span className="text-sm text-muted">{l}</span></span>
              </div>
            ))}
          </div>
          <div className="relative w-full sm:w-72">
            <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search the forum"
              aria-label="Search the forum"
              className="min-h-[44px] w-full rounded-full border border-white/10 bg-surface pl-10 pr-4 text-sm text-fg placeholder:text-muted/60 focus:border-green/60 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1.4fr]">
          {/* Categories */}
          <div>
            <h2 className="text-xl font-700 text-fg">Categories</h2>
            <div className="mt-5 space-y-3">
              {categories.map(({ icon: Icon, name, desc, threads: t, color }) => (
                <button key={name} type="button" className="card-hover flex w-full items-center gap-4 p-4 text-left">
                  <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 ${color}`}>
                    <Icon size={20} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-600 text-fg">{name}</span>
                    <span className="block text-xs text-muted">{desc}</span>
                  </span>
                  <span className="text-xs text-muted">{t} threads</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent threads */}
          <div>
            <h2 className="text-xl font-700 text-fg">Recent discussions</h2>
            <div className="mt-5 divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/10">
              {threads.map((t) => (
                <button key={t.title} type="button" className="flex w-full items-start gap-4 p-4 text-left transition-colors hover:bg-white/[0.03]">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface2 text-muted">
                    {t.pinned ? <Pin size={16} className="text-purple-soft" /> : t.hot ? <Flame size={16} className="text-green" /> : <MessageSquare size={16} />}
                  </span>
                  <span className="flex-1">
                    <span className="block font-600 leading-snug text-fg">{t.title}</span>
                    <span className="mt-1 block text-xs text-muted">by {t.author} · {t.cat}</span>
                  </span>
                  <span className="shrink-0 text-right text-xs text-muted">
                    <span className="block font-700 text-fg">{t.replies}</span>
                    replies
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
