import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X, Sprout, LogOut, User } from 'lucide-react'
import { navLinks } from '../lib/nav.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { user, profile, isConfigured, openAuthModal, signOut } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-white/10 bg-bg/85 backdrop-blur-lg' : 'border-b border-transparent'
      }`}
    >
      <nav className="container-em flex h-16 items-center justify-between gap-4" aria-label="Primary">
        <Link to="/" className="flex items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green">
          <img
            src="/elevated-masses-logo.jpg"
            alt="Elevated Masses"
            className="h-9 w-auto rounded-md ring-1 ring-white/10"
          />
          <span className="hidden font-display text-sm font-700 tracking-wide text-fg sm:block">
            Elevated Masses
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'bg-green/10 text-green' : 'text-muted hover:text-fg'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {isConfigured && user ? (
            <div className="hidden items-center gap-2 md:flex">
              <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-fg">
                <User size={14} className="text-green" />
                {profile?.username ?? 'You'}
              </span>
              <button
                type="button"
                onClick={signOut}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-muted hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-green"
                aria-label="Sign out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : isConfigured ? (
            <button type="button" onClick={openAuthModal} className="hidden btn-ghost md:inline-flex">
              Sign in
            </button>
          ) : (
            <Link to="/plant-ai" className="hidden btn-primary md:inline-flex">
              <Sprout size={16} aria-hidden="true" />
              Diagnose a plant
            </Link>
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-fg lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-green"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-bg/95 backdrop-blur-lg lg:hidden">
          <ul className="container-em flex flex-col py-3">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-3 text-base font-medium ${
                      isActive ? 'bg-green/10 text-green' : 'text-fg hover:bg-white/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="mt-2">
              <Link to="/plant-ai" className="btn-primary w-full">
                <Sprout size={16} aria-hidden="true" />
                Diagnose a plant
              </Link>
            </li>
            {isConfigured && (
              <li className="mt-2">
                {user ? (
                  <button type="button" onClick={signOut} className="btn-ghost w-full">
                    <LogOut size={16} /> Sign out ({profile?.username ?? 'you'})
                  </button>
                ) : (
                  <button type="button" onClick={openAuthModal} className="btn-ghost w-full">
                    <User size={16} /> Sign in
                  </button>
                )}
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  )
}
