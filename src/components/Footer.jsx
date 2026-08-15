import { Link } from 'react-router-dom'
import { Instagram, Youtube, Mail, Leaf } from 'lucide-react'
import { TikTokIcon } from './icons.jsx'

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Blog', to: '/blog' },
      { label: 'Tutorials', to: '/tutorials' },
      { label: 'Recipes', to: '/recipes' },
      { label: 'Plant AI', to: '/plant-ai' },
      { label: 'Legal Map', to: '/legal-map' },
      { label: 'Downloads', to: '/downloads' },
    ],
  },
  {
    title: 'Grow',
    links: [
      { label: 'Gear', to: '/gear' },
      { label: 'Seeds', to: '/seeds' },
      { label: 'About', to: '/about' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-surface/40">
      <div className="container-em grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <div>
          <div className="flex items-center gap-2">
            <img src="/elevated-masses-wordmark.jpg" alt="Elevated Masses" className="h-11 w-auto rounded-md" />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Urban hydroponics for the modern grower. Blueprints, builds, gear, seeds
            and community for next-level indoor growing.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {[
              { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/mrgrowurown/' },
              { icon: TikTokIcon, label: 'TikTok', href: 'https://www.tiktok.com/@elevatedmasses' },
              { icon: Youtube, label: 'YouTube', href: '#' },
              { icon: Mail, label: 'Email', href: '/contact' },
            ].map(({ icon: Icon, label, href }) => {
              const external = href.startsWith('http')
              return (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:border-green/50 hover:text-green"
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-600 text-fg">{col.title}</h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-muted transition-colors hover:text-green">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-sm font-600 text-fg">Stay Elevated</h3>
          <p className="mt-4 text-sm text-muted">Get new blueprints, drops and events in your inbox.</p>
          <form
            className="mt-4 flex flex-col gap-2 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              id="footer-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="min-h-[44px] flex-1 rounded-full border border-white/10 bg-bg px-4 text-sm text-fg placeholder:text-muted/60 focus:border-green/60 focus:outline-none"
            />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted/70">
            <Leaf size={13} /> No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-em flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted/70 sm:flex-row">
          <p>© {new Date().getFullYear()} Elevated Masses LLC. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-fg">Privacy</Link>
            <Link to="/terms" className="hover:text-fg">Terms</Link>
            <span className="text-muted/50">Affiliate disclosure on Gear &amp; Seeds pages</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
