import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  // Load the current session on mount and subscribe to auth changes.
  useEffect(() => {
    if (!isSupabaseConfigured) return
    let active = true

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [])

  // Fetch the profile (username) whenever the user changes.
  useEffect(() => {
    if (!isSupabaseConfigured || !user) {
      setProfile(null)
      return
    }
    let active = true
    supabase
      .from('profiles')
      .select('id, username')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        if (active) setProfile(data ?? null)
      })
    return () => {
      active = false
    }
  }, [user])

  const signUp = useCallback(async (email, password, username) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username }, emailRedirectTo: `${window.location.origin}/?confirmed=1` },
    })
    return { error }
  }, [])

  const signIn = useCallback(async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    setProfile(null)
  }, [])

  const value = {
    user,
    profile,
    loading,
    isConfigured: isSupabaseConfigured,
    signUp,
    signIn,
    signOut,
    authModalOpen,
    openAuthModal: useCallback(() => setAuthModalOpen(true), []),
    closeAuthModal: useCallback(() => setAuthModalOpen(false), []),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
