import { supabase } from './supabase.js'

// Category list is defined in code (simple, no extra table). Threads store the
// category name as a string.
export const forumCategories = [
  { key: 'new-growers', name: 'New Growers', desc: 'Start here — no question too basic.' },
  { key: 'builds', name: 'Builds & Setups', desc: 'Show your system, share your parts list.' },
  { key: 'problems', name: 'Pests & Problems', desc: 'Diagnose issues with the community.' },
  { key: 'nutrients', name: 'Nutrients & Feeding', desc: 'Recipes, schedules, pH & EC talk.' },
  { key: 'harvest', name: 'Harvest & Wins', desc: 'Show off the payoff.' },
  { key: 'off-topic', name: 'Off-Topic', desc: 'Everything else, growers lounge.' },
]

export function categoryName(key) {
  return forumCategories.find((c) => c.key === key)?.name ?? key
}

// List recent threads with author username and reply count.
export async function listThreads({ category = null, limit = 50 } = {}) {
  let query = supabase
    .from('threads')
    .select('id, category, title, body, created_at, author_id, profiles(username), replies(count)')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (category) query = query.eq('category', category)
  const { data, error } = await query
  if (error) throw error
  return (data ?? []).map((t) => ({
    ...t,
    username: t.profiles?.username ?? 'grower',
    replyCount: t.replies?.[0]?.count ?? 0,
  }))
}

export async function getThread(id) {
  const { data, error } = await supabase
    .from('threads')
    .select('id, category, title, body, created_at, author_id, profiles(username)')
    .eq('id', id)
    .single()
  if (error) throw error
  return { ...data, username: data.profiles?.username ?? 'grower' }
}

export async function createThread({ category, title, body, authorId }) {
  const { data, error } = await supabase
    .from('threads')
    .insert({ category, title, body, author_id: authorId })
    .select('id')
    .single()
  if (error) throw error
  return data
}

export async function listReplies(threadId) {
  const { data, error } = await supabase
    .from('replies')
    .select('id, body, created_at, author_id, profiles(username)')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return (data ?? []).map((r) => ({ ...r, username: r.profiles?.username ?? 'grower' }))
}

export async function createReply({ threadId, body, authorId }) {
  const { error } = await supabase
    .from('replies')
    .insert({ thread_id: threadId, body, author_id: authorId })
  if (error) throw error
}

// Community stats for the forum header.
export async function getForumStats() {
  const [members, threads] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase.from('threads').select('id', { count: 'exact', head: true }),
  ])
  return { members: members.count ?? 0, threads: threads.count ?? 0 }
}

// Relative time helper for display.
export function timeAgo(iso) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (s < 60) return 'just now'
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d < 30) return `${d}d ago`
  return new Date(iso).toLocaleDateString()
}
