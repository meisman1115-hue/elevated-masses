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
  {
    label: 'Community',
    links: [
      { label: 'Forum', to: '/forum', desc: 'Connect with growers' },
      { label: 'Events', to: '/events', desc: 'Meetups & workshops' },
      { label: 'Membership', to: '/membership', desc: 'Perks & 1-on-1 calls' },
    ],
  },
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

// Elevated Masses Patreon page.
export const PATREON_URL = 'https://www.patreon.com/MrGrowUrOwn'

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
