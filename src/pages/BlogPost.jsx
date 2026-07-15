import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Clock, Calendar, User, Info } from 'lucide-react'
import { getPost, posts } from '../lib/posts.js'
import NotFound from './NotFound.jsx'

// Renders one content block from a post body.
function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="mt-10 text-2xl font-700 text-fg">{block.text}</h2>
    case 'h3':
      return <h3 className="mt-7 text-lg font-600 text-green">{block.text}</h3>
    case 'p':
      return <p className="mt-4 leading-relaxed text-muted">{block.text}</p>
    case 'ul':
      return (
        <ul className="mt-4 space-y-2">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3 text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green" aria-hidden="true" />
              <span className="leading-relaxed">{it}</span>
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className="mt-4 space-y-3">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3 text-muted">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green/10 text-xs font-700 text-green" aria-hidden="true">{i + 1}</span>
              <span className="pt-0.5 leading-relaxed">{it}</span>
            </li>
          ))}
        </ol>
      )
    case 'callout':
      return (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-green/25 bg-green/5 px-4 py-3">
          <Info size={18} className="mt-0.5 shrink-0 text-green" />
          <p className="text-sm leading-relaxed text-fg">{block.text}</p>
        </div>
      )
    case 'quote':
      return <blockquote className="mt-6 border-l-2 border-purple pl-4 text-lg italic text-fg">{block.text}</blockquote>
    default:
      return null
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)
  if (!post) return <NotFound />

  const more = posts.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <article className="pb-8">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-80"
          style={{ backgroundImage: 'radial-gradient(50% 60% at 15% 0%, rgba(139,255,60,0.10), transparent 70%), radial-gradient(45% 55% at 90% 10%, rgba(168,85,247,0.16), transparent 70%)' }}
        />
        <div className="container-em max-w-3xl py-14">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-green">
            <ArrowLeft size={15} /> Back to blog
          </Link>
          <span className="chip mt-6 w-fit">{post.tag}</span>
          <h1 className="mt-4 text-3xl font-700 leading-tight text-fg sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-muted">
            <span className="flex items-center gap-1.5"><User size={13} className="text-green" /> {post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={13} className="text-green" /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={13} className="text-green" /> {post.readTime} read</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container-em max-w-3xl py-10">
        <img src={post.cover} alt={post.title} className="mb-8 aspect-[16/9] w-full rounded-2xl border border-white/10 object-cover" />
        {post.body.map((block, i) => (
          <Block key={i} block={block} />
        ))}

        <div className="mt-12 rounded-2xl border border-purple/25 bg-surface/50 p-6 text-center">
          <p className="text-fg">Stuck on a plant problem?</p>
          <Link to="/plant-ai" className="btn-accent mt-4">Try Plant AI <ArrowRight size={16} /></Link>
        </div>
      </div>

      {/* More posts */}
      <div className="container-em max-w-5xl">
        <h2 className="text-xl font-700 text-fg">Keep reading</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {more.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="card-hover flex flex-col overflow-hidden">
              <img src={p.cover} alt={p.title} className="aspect-[16/10] w-full border-b border-white/10 object-cover" />
              <div className="flex flex-1 flex-col p-5">
                <span className="chip w-fit">{p.tag}</span>
                <h3 className="mt-3 text-base font-600 leading-snug text-fg">{p.title}</h3>
                <span className="mt-3 flex items-center gap-1.5 text-xs text-muted"><Clock size={12} /> {p.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}
