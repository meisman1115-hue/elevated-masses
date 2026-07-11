// Central navigation config — used by the Navbar and Footer so links stay in sync.
export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' },
  { label: 'Gear', to: '/gear' },
  { label: 'Seeds', to: '/seeds' },
  { label: 'Events', to: '/events' },
  { label: 'Forum', to: '/forum' },
  { label: 'Plant AI', to: '/plant-ai' },
  { label: 'About', to: '/about' },
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
