import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  MessageSquare, Users, Flame, Search, Plus, Loader2, AlertCircle,
} from 'lucide-react'
import { PageHeader, StubNote } from '../components/ui.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import {
  forumCategories, categoryName, listThreads, getForumStats, timeAgo,
} from '../lib/forumApi.js'

export default function Forum() {
  const { isConfigured, user, openAuthModal } = useAuth()
  const navigate = useNavigate()
  const [threads, setThreads] = useState([])
  const [stats, setStats] = useState({ members: 0, threads: 0 })
  const [state, setState] = useState(isConfigured ? 'loading' : 'demo') // loading | ready | error | demo
  const [activeCat, setActiveCat] = useState(null)
  const [q, setQ] = useState('')

  useEffect(() => {
    if (!isConfigured) return
    let active = true
    setState('loading')
    Promise.all([listThreads({ category: activeCat }), getForumStats()])
      .then(([t, s]) => {
        if (!active) return
        setThreads(t)
        setStats(s)
        setState('ready')
      })
      .catch(() => active && setState('error'))
    return () => {
      active = false
    }
  }, [isConfigured, activeCat])

  function handleStart() {
    if (!user) return openAuthModal()
    navigate('/forum/new')
  }

  const filtered = q
    ? threads.filter((t) => t.title.toLowerCase().includes(q.toLowerCase()))
    : threads

  return (
    <>
      <PageHeader
        eyebrow="Community Forum"
        title="Connect with growers"
        description="Ask questions, share builds, troubleshoot together — with growers who've been where you are."
      >
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={handleStart} className="btn-primary">
            <Plus size={16} /> Start a thread
          </button>
          {isConfigured && !user && (
            <button type="button" onClick={openAuthModal} className="btn-ghost">Sign in</button>
          )}
        </div>
      </PageHeader>

      <div className="container-em py-12">
        {!isConfigured && (
          <StubNote>
            The forum backend isn't connected yet. Once Supabase is set up (accounts + database), this page
            goes fully live — people can register, start threads, and reply. The layout below is ready for it.
          </StubNote>
        )}

        {/* Stats + search */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-6">
            <div className="flex items-center gap-2.5">
              <Users size={18} className="text-green" />
              <span><span className="font-700 text-fg">{isConfigured ? stats.members : '—'}</span> <span className="text-sm text-muted">Members</span></span>
            </div>
            <div className="flex items-center gap-2.5">
              <MessageSquare size={18} className="text-green" />
              <span><span className="font-700 text-fg">{isConfigured ? stats.threads : '—'}</span> <span className="text-sm text-muted">Threads</span></span>
            </div>
          </div>
          <div className="relative w-full sm:w-72">
            <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search threads"
              aria-label="Search threads"
              className="min-h-[44px] w-full rounded-full border border-white/10 bg-surface pl-10 pr-4 text-sm text-fg placeholder:text-muted/60 focus:border-green/60 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          {/* Categories */}
          <div>
            <h2 className="text-xl font-700 text-fg">Categories</h2>
            <div className="mt-5 space-y-2">
              <button
                type="button"
                onClick={() => setActiveCat(null)}
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                  activeCat === null ? 'border-green/50 bg-green/10 text-green' : 'border-white/10 bg-white/5 text-muted hover:text-fg'
                }`}
              >
                <span className="font-600">All discussions</span>
              </button>
              {forumCategories.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setActiveCat(c.key)}
                  className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                    activeCat === c.key ? 'border-green/50 bg-green/10' : 'border-white/10 bg-white/5 hover:border-green/30'
                  }`}
                >
                  <span className={`block text-sm font-600 ${activeCat === c.key ? 'text-green' : 'text-fg'}`}>{c.name}</span>
                  <span className="block text-xs text-muted">{c.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Threads */}
          <div>
            <h2 className="text-xl font-700 text-fg">
              {activeCat ? categoryName(activeCat) : 'Recent discussions'}
            </h2>

            {state === 'demo' && (
              <div className="mt-5 rounded-2xl border border-dashed border-white/15 bg-surface/40 p-10 text-center">
                <MessageSquare size={28} className="mx-auto text-muted" />
                <p className="mt-4 font-600 text-fg">Threads will appear here</p>
                <p className="mt-1 text-sm text-muted">Once the forum is connected, community discussions show up in this feed.</p>
              </div>
            )}

            {state === 'loading' && (
              <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-surface/40 p-12 text-muted">
                <Loader2 size={18} className="animate-spin" /> Loading discussions…
              </div>
            )}

            {state === 'error' && (
              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/5 p-6 text-sm text-red-300">
                <AlertCircle size={18} /> Couldn't load threads. Check your connection and refresh.
              </div>
            )}

            {state === 'ready' && filtered.length === 0 && (
              <div className="mt-5 rounded-2xl border border-dashed border-white/15 bg-surface/40 p-10 text-center">
                <MessageSquare size={28} className="mx-auto text-muted" />
                <p className="mt-4 font-600 text-fg">No threads yet</p>
                <p className="mt-1 text-sm text-muted">Be the first to start a discussion here.</p>
                <button type="button" onClick={handleStart} className="btn-primary mt-5">
                  <Plus size={16} /> Start a thread
                </button>
              </div>
            )}

            {state === 'ready' && filtered.length > 0 && (
              <div className="mt-5 divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/10">
                {filtered.map((t) => (
                  <Link key={t.id} to={`/forum/${t.id}`} className="flex items-start gap-4 p-4 transition-colors hover:bg-white/[0.03]">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface2 text-muted">
                      <MessageSquare size={16} />
                    </span>
                    <span className="flex-1">
                      <span className="block font-600 leading-snug text-fg">{t.title}</span>
                      <span className="mt-1 block text-xs text-muted">
                        {t.username} · {categoryName(t.category)} · {timeAgo(t.created_at)}
                      </span>
                    </span>
                    <span className="shrink-0 text-right text-xs text-muted">
                      <span className="block font-700 text-fg">{t.replyCount}</span>
                      replies
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
