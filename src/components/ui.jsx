import { ImageIcon, Play } from 'lucide-react'

// Reusable image placeholder. Swap `src` in later to drop in real photos.
export function MediaPlaceholder({ label = 'Image placeholder', ratio = 'aspect-[4/3]', className = '', icon: Icon = ImageIcon }) {
  return (
    <div
      className={`relative flex ${ratio} w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-surface ${className}`}
      role="img"
      aria-label={label}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(60% 60% at 30% 20%, rgba(139,255,60,0.10), transparent 60%), radial-gradient(60% 60% at 80% 90%, rgba(168,85,247,0.14), transparent 60%)',
        }}
      />
      <div className="relative flex flex-col items-center gap-2 text-muted/70">
        <Icon size={28} aria-hidden="true" />
        <span className="text-xs font-medium">{label}</span>
      </div>
    </div>
  )
}

// Video placeholder with a play affordance. Pass `image` to show a real photo
// behind the play button instead of the plain gradient (e.g. an event poster).
export function VideoPlaceholder({ label = 'Video placeholder', ratio = 'aspect-video', className = '', image }) {
  return (
    <div
      className={`relative flex ${ratio} w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-surface ${className}`}
      role="img"
      aria-label={label}
    >
      {image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: image
            ? 'linear-gradient(180deg, rgba(8,10,12,0.15), rgba(8,10,12,0.75))'
            : 'radial-gradient(70% 70% at 50% 40%, rgba(168,85,247,0.16), transparent 60%)',
        }}
      />
      <div className="relative flex flex-col items-center gap-3">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green text-bg shadow-glow-green">
          <Play size={26} fill="currentColor" aria-hidden="true" />
        </span>
        <span className="text-xs font-medium text-muted/80">{label}</span>
      </div>
    </div>
  )
}

// Section heading with an optional eyebrow label + description.
export function SectionHeading({ eyebrow, title, description, align = 'left', className = '' }) {
  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-700 tracking-tight text-fg sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>}
    </div>
  )
}

// Page hero header used at the top of interior pages.
export function PageHeader({ eyebrow, title, description, children }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
        style={{
          backgroundImage:
            'radial-gradient(50% 60% at 15% 0%, rgba(139,255,60,0.10), transparent 70%), radial-gradient(45% 55% at 90% 10%, rgba(168,85,247,0.16), transparent 70%)',
        }}
      />
      <div className="container-em py-16 sm:py-20">
        {eyebrow && <p className="eyebrow animate-fade-up">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-4xl font-700 tracking-tight text-fg sm:text-5xl">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  )
}

// Small "coming soon / placeholder" note so it's clear what's wired vs mock.
export function StubNote({ children }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-purple/30 bg-purple/5 px-4 py-3 text-sm text-purple-soft">
      <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-purple-soft animate-pulse-glow" aria-hidden="true" />
      <p>{children}</p>
    </div>
  )
}
