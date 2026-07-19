import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import AuthModal from './AuthModal.jsx'
import AgeGate from './AgeGate.jsx'
import SmokeBackground from './SmokeBackground.jsx'
import { useAuth } from '../context/AuthContext.jsx'

// Scrolls to top on route change so each page starts at the top.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function Layout({ children }) {
  const { authModalOpen, openAuthModal, closeAuthModal } = useAuth()

  // Land here after clicking the email confirmation link — pop the sign-in
  // modal straight open instead of leaving the user on a bare homepage.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('confirmed') === '1') {
      openAuthModal()
      params.delete('confirmed')
      const search = params.toString()
      window.history.replaceState({}, '', window.location.pathname + (search ? `?${search}` : ''))
    }
  }, [openAuthModal])

  return (
    <div className="flex min-h-dvh flex-col">
      <SmokeBackground />
      <ScrollToTop />
      <AgeGate />
      <AuthModal open={authModalOpen} onClose={closeAuthModal} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-green focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
