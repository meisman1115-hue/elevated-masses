import { useEffect, useRef } from 'react'

// Atmospheric site background: the Elevated Masses smoke/logo image, sitting
// behind all content. It drifts and rotates slightly on scroll (parallax
// "swirl"), plus a slow ambient drift so it feels alive. A dark scrim keeps
// content readable. All motion respects prefers-reduced-motion.
export default function SmokeBackground() {
  const layerRef = useRef(null)

  useEffect(() => {
    const el = layerRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      const y = window.scrollY
      const rot = Math.min(y * 0.004, 6) // gentle, capped rotation
      el.style.transform = `translate3d(0, ${y * 0.06}px, 0) rotate(${rot}deg)`
      raf = 0
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg" aria-hidden="true">
      {/* Parallax layer (moved on scroll) */}
      <div ref={layerRef} className="absolute inset-0 will-change-transform">
        {/* Smoke image with slow ambient drift */}
        <div
          className="absolute inset-0 animate-smoke-drift"
          style={{
            backgroundImage: 'url(/elevated-masses-logo.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'scale(1.25)',
            opacity: 0.3,
          }}
        />
      </div>
      {/* Readability scrim + neon tint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(8,10,12,0.82) 0%, rgba(8,10,12,0.72) 40%, rgba(8,10,12,0.9) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(60% 40% at 85% 0%, rgba(168,85,247,0.12), transparent 70%), radial-gradient(55% 40% at 0% 100%, rgba(139,255,60,0.08), transparent 70%)',
        }}
      />
    </div>
  )
}
