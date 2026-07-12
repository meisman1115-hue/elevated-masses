import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X, Sprout, LogOut, User, ChevronDown } from 'lucide-react'
import { navGroups, navSingles } from '../lib/nav.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const [open, setOpen] = useState(false) // mobile menu
  const [openGroup, setOpenGroup] = useState(null) // desktop dropdown label
  const [mobileGroup, setMobileGroup] = useState(null) // mobile accordion label
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navRef = useRef(null)
  const { user, profile, isConfigured, openAuthModal, signOut } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close everything on route change.
  useEffect(() => {
    setOpen(false)
    setOpenGroup(null)
    setMobileGroup(null)
  }, [location.pathname])

  // Desktop: close dropdown on outside click or Escape.
  useEffect(() => {
    if (!openGroup) return
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenGroup(null)
    }
    const onKey = (e) => e.key === 'Escape' && setOpenGroup(null)
    document.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [openGroup])

  const groupIsActive = (group) => group.links.some((l) => location.pathname === l.to || location.pathname.startsWith(l.to + '/'))

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-white/10 bg-bg/85 backdrop-blur-lg' : 'border-b border-transparent'
      }`}
    >
      <nav ref={navRef} className="container-em flex h-16 items-center justify-between gap-4" aria-label="Primary">
        <Link to="/" aria-label="Elevated Masses — home" className="flex items-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green">
          <img src="/elevated-masses-wordmark.jpg" alt="Elevated Masses" className="h-9 w-auto rounded-md sm:h-10" />
        </Link>

        {/* Desktop grouped nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navGroups.map((group) => (
            <li key={group.label} className="relative">
              <button
                type="button"
                onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                aria-expanded={openGroup === group.label}
                aria-haspopup="true"
                className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  groupIsActive(group) || openGroup === group.label ? 'bg-green/10 text-green' : 'text-muted hover:text-fg'
                }`}
              >
                {group.label}
                <ChevronDown size={14} className={`transition-transform ${openGroup === group.label ? 'rotate-180' : ''}`} />
              </button>
              {openGroup === group.label && (
                <div className="absolute left-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-white/10 bg-surface/95 p-2 shadow-glow-green backdrop-blur-lg">
                  {group.links.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        `block rounded-xl px-3 py-2.5 transition-colors ${isActive ? 'bg-green/10' : 'hover:bg-white/5'}`
                      }
                    >
                      <span className="block text-sm font-600 text-fg">{link.label}</span>
                      {link.desc && <span className="block text-xs text-muted">{link.desc}</span>}
                    </NavLink>
                  ))}
                </div>
              )}
            </li>
          ))}
          {navSingles.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-green/10 text-green' : 'text-muted hover:text-fg'}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right cluster */}
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
          <ul className="container-em flex max-h-[70vh] flex-col overflow-y-auto py-3">
            <li>
              <NavLink to="/" end className={({ isActive }) => `block rounded-lg px-3 py-3 text-base font-medium ${isActive ? 'bg-green/10 text-green' : 'text-fg hover:bg-white/5'}`}>
                Home
              </NavLink>
            </li>
            {navGroups.map((group) => (
              <li key={group.label}>
                <button
                  type="button"
                  onClick={() => setMobileGroup(mobileGroup === group.label ? null : group.label)}
                  aria-expanded={mobileGroup === group.label}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-fg hover:bg-white/5"
                >
                  {group.label}
                  <ChevronDown size={16} className={`transition-transform ${mobileGroup === group.label ? 'rotate-180' : ''}`} />
                </button>
                {mobileGroup === group.label && (
                  <div className="ml-3 border-l border-white/10 pl-3">
                    {group.links.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) => `block rounded-lg px-3 py-2.5 text-sm ${isActive ? 'text-green' : 'text-muted hover:text-fg'}`}
                      >
                        {link.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </li>
            ))}
            {navSingles.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={({ isActive }) => `block rounded-lg px-3 py-3 text-base font-medium ${isActive ? 'bg-green/10 text-green' : 'text-fg hover:bg-white/5'}`}>
                  {link.label}
                </NavLink>
              </li>
            ))}

            {isConfigured && (
              <li className="mt-2 border-t border-white/10 pt-2">
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
