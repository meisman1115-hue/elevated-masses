// Central navigation config — used by the Navbar and Footer so links stay in sync.

// Grouped primary navigation (rendered as dropdown menus on desktop).
export const navGroups = [
  {
    label: 'Learn',
    links: [
      { label: 'Blog', to: '/blog', desc: 'Guides & troubleshooting' },
      { label: 'Tutorials', to: '/tutorials', desc: 'Companion planting & more' },
      { label: 'Recipes', to: '/recipes', desc: 'Infused & fresh-grown' },
      { label: 'Plant AI', to: '/plant-ai', desc: 'Diagnose a plant problem' },
      { label: 'Legal Map', to: '/legal-map', desc: 'Cannabis laws by region' },
    ],
  },
  {
    label: 'Grow',
    links: [
      { label: 'Gear', to: '/gear', desc: 'Equipment we trust' },
      { label: 'Seeds', to: '/seeds', desc: 'Genetics worth growing' },
      { label: 'Downloads', to: '/downloads', desc: 'Blueprints & guides' },
    ],
  },
  // Community (Forum, Events) is hidden from nav until real user accounts
  // exist — the pages themselves still work at /forum and /events, just
  // not linked from navigation. Re-add here when ready to launch it.
]

// Standalone top-level links (no dropdown).
export const navSingles = [{ label: 'About', to: '/about' }]

// Flat list of every primary destination (handy for the mobile menu fallback).
export const allNavLinks = [
  { label: 'Home', to: '/' },
  ...navGroups.flatMap((g) => g.links),
  ...navSingles,
]

export const AMAZON_TAG = 'mrgrowurown-20'

// Helper to append the Amazon Associates tag to any amazon.com product URL.
export function amazonLink(url) {
  try {
    const u = new URL(url)
    u.searchParams.set('tag', AMAZON_TAG)
    return u.toString()
  } catch {
    return url
  }
}

// Use for any affiliate link. amzn.to short links already carry the tag, so
// pass them through untouched; full amazon.com URLs get the tag appended.
export function affiliateHref(url) {
  if (/amzn\.to/i.test(url)) return url
  return amazonLink(url)
}
