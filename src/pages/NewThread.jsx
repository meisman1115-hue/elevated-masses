import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Loader2, Send } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { forumCategories, createThread } from '../lib/forumApi.js'

export default function NewThread() {
  const { user, isConfigured, openAuthModal } = useAuth()
  const navigate = useNavigate()
  const [category, setCategory] = useState(forumCategories[0].key)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [posting, setPosting] = useState(false)
  const [error, setError] = useState('')

  // Prompt sign-in if not authenticated.
  useEffect(() => {
    if (isConfigured && !user) openAuthModal()
  }, [isConfigured, user, openAuthModal])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!user) return openAuthModal()
    if (title.trim().length < 3) {
      setError('Give your thread a title (at least 3 characters).')
      return
    }
    setPosting(true)
    setError('')
    try {
      const { id } = await createThread({
        category,
        title: title.trim(),
        body: body.trim(),
        authorId: user.id,
      })
      navigate(`/forum/${id}`)
    } catch (err) {
      setError(err.message ?? 'Could not create the thread.')
      setPosting(false)
    }
  }

  if (isConfigured && !user) {
    return (
      <div className="container-em max-w-2xl py-24 text-center">
        <h1 className="text-xl font-700 text-fg">Sign in to start a thread</h1>
        <p className="mt-2 text-muted">You need an account to post in the forum.</p>
        <button type="button" onClick={openAuthModal} className="btn-primary mt-6">Sign in</button>
      </div>
    )
  }

  return (
    <div className="container-em max-w-2xl py-12">
      <Link to="/forum" className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-green">
        <ArrowLeft size={15} /> Back to forum
      </Link>
      <h1 className="mt-6 text-3xl font-700 text-fg">Start a thread</h1>
      <p className="mt-2 text-muted">Ask a question, share a build, or start a conversation.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-2xl border border-white/10 bg-surface/50 p-6 sm:p-8">
        <div>
          <label htmlFor="nt-cat" className="mb-2 block text-sm font-600 text-fg">Category</label>
          <select
            id="nt-cat"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="min-h-[44px] w-full rounded-xl border border-white/10 bg-bg px-4 text-sm text-fg focus:border-green/60 focus:outline-none"
          >
            {forumCategories.map((c) => <option key={c.key} value={c.key}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="nt-title" className="mb-2 block text-sm font-600 text-fg">Title</label>
          <input
            id="nt-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={160}
            placeholder="e.g. First grow — leaves curling, need advice"
            className="min-h-[44px] w-full rounded-xl border border-white/10 bg-bg px-4 text-sm text-fg placeholder:text-muted/50 focus:border-green/60 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="nt-body" className="mb-2 block text-sm font-600 text-fg">Details</label>
          <textarea
            id="nt-body"
            rows={7}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Describe your setup, what you're seeing, and what you've tried…"
            className="w-full rounded-xl border border-white/10 bg-bg px-4 py-3 text-sm text-fg placeholder:text-muted/50 focus:border-green/60 focus:outline-none"
          />
        </div>
        {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
        <button type="submit" className="btn-primary" disabled={posting}>
          {posting ? <><Loader2 size={16} className="animate-spin" /> Posting…</> : <>Post thread <Send size={15} /></>}
        </button>
      </form>
    </div>
  )
}
