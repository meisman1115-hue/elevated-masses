import { createClient } from '@supabase/supabase-js'

// Vite exposes env vars prefixed with VITE_ to the browser.
// The anon key is a PUBLIC key (safe in frontend code) — access is controlled
// by Row Level Security policies in the database, not by hiding this key.
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// True only when both values are present, so the app can gracefully fall back
// to demo mode until Supabase is connected.
export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null
