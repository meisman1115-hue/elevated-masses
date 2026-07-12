import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Loader2, AlertCircle, User, Send, MessageSquare } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { getThread, listReplies, createReply, categoryName, timeAgo } from '../lib/forumApi.js'

export default function ForumThread() {
  const { id } = useParams()
  const { user, isConfigured, openAuthModal } = useAuth()
  const [thread, setThread] = useState(null)
  const [replies, setReplies] = useState([])
  const [state, setState] = useState('loading') // loading | ready | error
  const [body, setBody] = useState('')
  const [posting, setPosting] = useState(false)
  const [postError, setPostError] = useState('')

  useEffect(() => {
    if (!isConfigured) {
      setState('error')
      return
    }
    let active = true
    setState('loading')
    Promise.all([getThread(id), listReplies(id)])
      .then(([t, r]) => {
        if (!active) return
        setThread(t)
        setReplies(r)
        setState('ready')
      })
      .catch(() => active && setState('error'))
    return () => {
      active = false
    }
  }, [id, isConfigured])

  async function handleReply(e) {
    e.preventDefault()
    if (!user) return openAuthModal()
    if (!body.trim()) return
    setPosting(true)
    setPostError('')
    try {
      await createReply({ threadId: id, body: body.trim(), authorId: user.id })
      const r = await listReplies(id)
      setReplies(r)
      setBody('')
    } catch (err) {
      setPostError(err.message ?? 'Could not post your reply.')
    } finally {
      setPosting(false)
    }
  }

  if (state === 'loading') {
    return (
      <div className="container-em flex items-center justify-center gap-2 py-32 text-muted">
        <Loader2 size={18} className="animate-spin" /> Loading thread…
      </div>
    )
  }

  if (state === 'error' || !thread) {
    return (
      <div className="container-em max-w-2xl py-24 text-center">
        <AlertCircle size={28} className="mx-auto text-muted" />
        <h1 className="mt-4 text-xl font-700 text-fg">Thread unavailable</h1>
        <p className="mt-2 text-muted">
          {isConfigured ? "This discussion couldn't be loaded or doesn't exist." : 'The forum backend isn\'t connected yet.'}
        </p>
        <Link to="/forum" className="btn-primary mt-6"><ArrowLeft size={16} /> Back to forum</Link>
      </div>
    )
  }

  return (
    <div className="container-em max-w-3xl py-12">
      <Link to="/forum" className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-green">
        <ArrowLeft size={15} /> Back to forum
      </Link>

      {/* Original post */}
      <article className="mt-6 rounded-2xl border border-white/10 bg-surface/50 p-6 sm:p-8">
        <span className="chip w-fit">{categoryName(thread.category)}</span>
        <h1 className="mt-4 text-2xl font-700 leading-tight text-fg sm:text-3xl">{thread.title}</h1>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted">
          <span className="flex items-center gap-1.5"><User size={13} className="text-green" /> {thread.username}</span>
          <span>·</span>
          <span>{timeAgo(thread.created_at)}</span>
        </div>
        <p className="mt-5 whitespace-pre-wrap leading-relaxed text-muted">{thread.body}</p>
      </article>

      {/* Replies */}
      <h2 className="mt-10 flex items-center gap-2 text-lg font-700 text-fg">
        <MessageSquare size={18} className="text-green" /> {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
      </h2>

      <div className="mt-5 space-y-4">
        {replies.map((r) => (
          <div key={r.id} className="rounded-xl border border-white/10 bg-surface/40 p-5">
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="flex items-center gap-1.5 font-600 text-fg"><User size={13} className="text-green" /> {r.username}</span>
              <span>·</span>
              <span>{timeAgo(r.created_at)}</span>
            </div>
            <p className="mt-3 whitespace-pre-wrap leading-relaxed text-muted">{r.body}</p>
          </div>
        ))}
        {replies.length === 0 && (
          <p className="rounded-xl border border-dashed border-white/15 bg-surface/30 p-6 text-center text-sm text-muted">
            No replies yet — start the conversation.
          </p>
        )}
      </div>

      {/* Reply form */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-surface/50 p-6">
        {user ? (
          <form onSubmit={handleReply}>
            <label htmlFor="reply" className="mb-2 block text-sm font-600 text-fg">Add a reply</label>
            <textarea
              id="reply"
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Share your experience, ask a follow-up, or offer a fix…"
              className="w-full rounded-xl border border-white/10 bg-bg px-4 py-3 text-sm text-fg placeholder:text-muted/50 focus:border-green/60 focus:outline-none"
            />
            {postError && <p role="alert" className="mt-2 text-sm text-red-300">{postError}</p>}
            <button type="submit" className="btn-primary mt-4" disabled={posting || !body.trim()}>
              {posting ? <><Loader2 size={16} className="animate-spin" /> Posting…</> : <>Post reply <Send size={15} /></>}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-muted">Sign in to join the discussion.</p>
            <button type="button" onClick={openAuthModal} className="btn-primary mt-4">Sign in to reply</button>
          </div>
        )}
      </div>
    </div>
  )
}
