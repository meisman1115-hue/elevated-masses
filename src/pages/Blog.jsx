import { Link } from 'react-router-dom'
import { PageHeader, MediaPlaceholder } from '../components/ui.jsx'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import { posts } from '../lib/posts.js'

const categories = ['All', 'Beginner', 'Builds', 'Troubleshooting', 'Gear', 'Nutrients', 'Harvest']

export default function Blog() {
  const [featured, ...rest] = posts
  return (
    <>
      <PageHeader
        eyebrow="The Blog"
        title="Grow smarter, every week"
        description="Guides, builds and troubleshooting from the Elevated Masses community. Real setups, real results."
      />

      <div className="container-em py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c, i) => (
            <button
              key={c}
              type="button"
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                i === 0
                  ? 'border-green/60 bg-green/10 text-green'
                  : 'border-white/10 bg-white/5 text-muted hover:border-green/40 hover:text-fg'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured */}
        <Link
          to={`/blog/${featured.slug}`}
          className="mt-10 grid overflow-hidden rounded-3xl border border-white/10 bg-surface/50 transition-all hover:border-green/40 hover:shadow-glow-green lg:grid-cols-2"
        >
          <MediaPlaceholder ratio="aspect-[16/10] lg:aspect-auto lg:h-full" label="Featured cover" className="rounded-none border-0" />
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <span className="chip w-fit">Featured · {featured.tag}</span>
            <h2 className="mt-4 text-2xl font-700 text-fg sm:text-3xl">{featured.title}</h2>
            <p className="mt-4 text-muted">{featured.excerpt}</p>
            <div className="mt-6 flex items-center gap-4 text-xs text-muted">
              <span className="flex items-center gap-1.5"><Clock size={13} /> {featured.readTime} read</span>
              <span className="flex items-center gap-1.5"><Calendar size={13} /> {featured.date}</span>
            </div>
            <span className="btn-primary mt-6 w-fit">Read article <ArrowRight size={16} /></span>
          </div>
        </Link>

        {/* Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="card-hover flex flex-col overflow-hidden">
              <MediaPlaceholder ratio="aspect-[16/10]" label="Post cover" className="rounded-none border-0 border-b border-white/10" />
              <div className="flex flex-1 flex-col p-5">
                <span className="chip w-fit">{post.tag}</span>
                <h3 className="mt-3 text-lg font-600 leading-snug text-fg">{post.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
