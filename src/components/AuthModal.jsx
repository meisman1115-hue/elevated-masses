import { useState, useEffect } from 'react'
import { X, Loader2, Sprout, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

// Sign in / sign up modal. Controlled via `open` + `onClose`.
export default function AuthModal({ open, onClose }) {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState('signin') // signin | signup
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success
  const [showPw, setShowPw] = useState(false)

  // Reset state and lock body scroll while open; close on Escape.
  useEffect(() => {
    if (!open) return
    setError('')
    setStatus('idle')
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setStatus('loading')
    if (mode === 'signup') {
      if (username.trim().length < 3) {
        setError('Username must be at least 3 characters.')
        setStatus('idle')
        return
      }
      const { error } = await signUp(email, password, username.trim())
      if (error) {
        setError(error.message)
        setStatus('idle')
      } else {
        setStatus('success')
      }
    } else {
      const { error } = await signIn(email, password)
      if (error) {
        setError(error.message)
        setStatus('idle')
      } else {
        onClose()
      }
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-title"
    >
      {/* Scrim */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-surface p-6 shadow-glow-purple sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-green"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {status === 'success' ? (
          <div className="py-6 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green/10 text-green">
              <CheckCircle2 size={30} />
            </span>
            <h2 className="mt-5 text-xl font-700 text-fg">Check your email</h2>
            <p className="mt-2 text-sm text-muted">
              We sent a confirmation link to <span className="text-fg">{email}</span>. Click it to activate
              your account, then sign in.
            </p>
            <button type="button" onClick={() => setMode('signin')} className="btn-ghost mt-6 w-full">
              Back to sign in
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <Sprout size={20} className="text-green" />
              <h2 id="auth-title" className="text-xl font-700 text-fg">
                {mode === 'signin' ? 'Welcome back' : 'Join the community'}
              </h2>
            </div>
            <p className="mt-2 text-sm text-muted">
              {mode === 'signin'
                ? 'Sign in to post in the forum and submit plants.'
                : 'Create a free account to start posting.'}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {mode === 'signup' && (
                <div>
                  <label htmlFor="au-username" className="mb-1.5 block text-sm font-600 text-fg">Username</label>
                  <input
                    id="au-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                    className="min-h-[44px] w-full rounded-xl border border-white/10 bg-bg px-4 text-sm text-fg focus:border-green/60 focus:outline-none"
                  />
                </div>
              )}
              <div>
                <label htmlFor="au-email" className="mb-1.5 block text-sm font-600 text-fg">Email</label>
                <input
                  id="au-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="min-h-[44px] w-full rounded-xl border border-white/10 bg-bg px-4 text-sm text-fg focus:border-green/60 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="au-password" className="mb-1.5 block text-sm font-600 text-fg">Password</label>
                <div className="relative">
                  <input
                    id="au-password"
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                    required
                    minLength={6}
                    className="min-h-[44px] w-full rounded-xl border border-white/10 bg-bg px-4 pr-16 text-sm text-fg focus:border-green/60 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted hover:text-fg"
                  >
                    {showPw ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {error && (
                <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                  {error}
                </p>
              )}

              <button type="submit" className="btn-primary w-full" disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <><Loader2 size={16} className="animate-spin" /> Please wait…</>
                ) : mode === 'signin' ? 'Sign in' : 'Create account'}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-muted">
              {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'signin' ? 'signup' : 'signin')
                  setError('')
                }}
                className="font-600 text-green hover:text-green-soft"
              >
                {mode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
