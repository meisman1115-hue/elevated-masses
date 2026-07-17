import { Link } from 'react-router-dom'
import {
  ArrowRight, Sprout, FileText, Wrench, Users, ShoppingBag,
  Leaf, MessageSquare, Calendar, ScanLine,
} from 'lucide-react'
import { SectionHeading } from '../components/ui.jsx'
import { LeafMotif } from '../components/illustrations.jsx'
import GrowGallery from '../components/GrowGallery.jsx'
import { posts } from '../lib/posts.js'

const pillars = [
  { icon: FileText, title: 'Digital Blueprints', body: 'Downloadable hydroponic plans you can build at home — from a single bucket to a full vertical wall.' },
  { icon: Wrench, title: 'Build Guides', body: 'Step-by-step tutorials for DWC, NFT, ebb & flow and more, with parts lists and photos.' },
  { icon: ShoppingBag, title: 'Gear & Seeds', body: 'Hand-picked equipment and seed sources we actually trust, in one curated place.' },
  { icon: Users, title: 'The Community', body: 'A network of urban growers swapping wins, fixes and harvest pics in the forum.' },
]

const quickLinks = [
  { icon: ScanLine, title: 'Plant AI', body: 'Snap a photo, get a diagnosis.', to: '/plant-ai', accent: true },
  { icon: MessageSquare, title: 'Forum', body: 'Connect with growers.', to: '/forum' },
  { icon: Calendar, title: 'Events', body: 'Blunts & Brushes and more.', to: '/events' },
  { icon: Leaf, title: 'Seeds', body: 'Genetics worth growing.', to: '/seeds' },
]

const featuredPosts = posts.slice(0, 3)

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              'radial-gradient(50% 55% at 20% 0%, rgba(139,255,60,0.16), transparent 65%), radial-gradient(50% 60% at 85% 15%, rgba(168,85,247,0.22), transparent 65%)',
          }}
        />
        <div className="container-em grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <div className="animate-fade-up">
            <span className="chip">
              <Sprout size={14} className="text-green" /> Urban hydroponics · est. Elevated Masses
            </span>
            <h1 className="mt-5 text-5xl font-700 leading-[1.05] tracking-tight text-fg sm:text-6xl">
              Grow Higher.
              <span className="block bg-gradient-to-r from-green via-green-soft to-purple-soft bg-clip-text text-transparent">
                Elevate the masses.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Blueprints, builds, gear and community for next-level indoor growing.
              Whether it's your first bucket or your fiftieth harvest — join the movement.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/plant-ai" className="btn-primary">
                Diagnose a plant <ArrowRight size={16} />
              </Link>
              <Link to="/blog" className="btn-ghost">Read the blog</Link>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
              {[
                ['30+', 'Build guides'],
                ['1.2k', 'Growers'],
                ['Weekly', 'New drops'],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-2xl font-700 text-green">{n}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-wide text-muted">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="animate-fade-up [animation-delay:120ms]">
            <GrowGallery className="drop-shadow-[0_0_40px_rgba(139,255,60,0.15)]" />
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="container-em py-16 sm:py-20">
        <SectionHeading
          eyebrow="What we build"
          title="Everything you need to grow indoors"
          description="From the first blueprint to a thriving harvest — the tools, knowledge and people behind it."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, body }) => (
            <div key={title} className="card-hover p-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green/10 text-green">
                <Icon size={22} />
              </span>
              <h3 className="mt-5 text-lg font-600 text-fg">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick links band */}
      <section className="container-em">
        <div className="grid gap-4 rounded-3xl border border-white/10 bg-surface/50 p-4 sm:grid-cols-2 lg:grid-cols-4 sm:p-6">
          {quickLinks.map(({ icon: Icon, title, body, to, accent }) => (
            <Link
              key={title}
              to={to}
              className={`group flex items-center gap-4 rounded-2xl border p-4 transition-all ${
                accent
                  ? 'border-purple/30 bg-purple/5 hover:border-purple/60 hover:shadow-glow-purple'
                  : 'border-white/10 bg-bg/40 hover:border-green/40'
              }`}
            >
              <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent ? 'bg-purple/15 text-purple-soft' : 'bg-green/10 text-green'}`}>
                <Icon size={20} />
              </span>
              <span>
                <span className="block font-600 text-fg">{title}</span>
                <span className="block text-xs text-muted">{body}</span>
              </span>
              <ArrowRight size={16} className="ml-auto text-muted transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      {/* Featured blog */}
      <section className="container-em py-16 sm:py-20">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading eyebrow="From the blog" title="Grow smarter, every week" />
          <Link to="/blog" className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-green hover:text-green-soft sm:inline-flex">
            All posts <ArrowRight size={15} />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featuredPosts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="card-hover overflow-hidden">
              <img src={post.cover} alt={post.title} className="aspect-[16/10] w-full border-b border-white/10 object-cover" />
              <div className="p-5">
                <span className="chip">{post.tag}</span>
                <h3 className="mt-3 text-lg font-600 leading-snug text-fg">{post.title}</h3>
                <p className="mt-3 text-xs text-muted">{post.readTime} read</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Plant AI teaser */}
      <section className="container-em pb-8">
        <div className="relative overflow-hidden rounded-3xl border border-purple/25 bg-surface/60 p-8 sm:p-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-90"
            style={{ backgroundImage: 'radial-gradient(60% 120% at 100% 0%, rgba(168,85,247,0.22), transparent 60%)' }}
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="eyebrow text-purple-soft">Powered by community data</span>
              <h2 className="mt-3 text-3xl font-700 text-fg sm:text-4xl">Something wrong with your plant?</h2>
              <p className="mt-4 max-w-lg text-muted">
                Upload a photo and describe the symptoms. Our plant-health AI — trained on
                real issues submitted by growers like you — suggests likely causes and fixes.
              </p>
              <Link to="/plant-ai" className="btn-accent mt-6">
                Try Plant AI <ArrowRight size={16} />
              </Link>
            </div>
            <LeafMotif />
          </div>
        </div>
      </section>
    </>
  )
}
