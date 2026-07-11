import { PageHeader, MediaPlaceholder, StubNote } from '../components/ui.jsx'
import { ArrowRight, Clock } from 'lucide-react'

const categories = ['All', 'Beginner', 'Builds', 'Troubleshooting', 'Gear', 'Nutrients', 'Harvest']

const posts = [
  { tag: 'Beginner', title: 'Your first DWC bucket: a weekend build', excerpt: 'The cheapest, most forgiving way to start growing hydroponically — start to finish in two days.', read: '6 min', date: 'Coming soon' },
  { tag: 'Troubleshooting', title: 'Reading nutrient deficiencies by leaf color', excerpt: 'A visual guide to what yellowing, spotting and curling are really telling you.', read: '9 min', date: 'Coming soon' },
  { tag: 'Gear', title: 'LED grow lights: what the specs actually mean', excerpt: 'PPFD, PAR, efficacy — cut through the marketing and buy the right light.', read: '7 min', date: 'Coming soon' },
  { tag: 'Builds', title: 'Vertical NFT wall for small apartments', excerpt: 'Grow 24 plants in the footprint of a bookshelf. Full parts list inside.', read: '11 min', date: 'Coming soon' },
  { tag: 'Nutrients', title: 'Mixing your first nutrient reservoir', excerpt: 'EC, pH and the order you add things — a repeatable recipe for healthy roots.', read: '8 min', date: 'Coming soon' },
  { tag: 'Harvest', title: 'Drying and curing without ruining your crop', excerpt: 'Temperature, humidity and patience — the part most beginners rush.', read: '10 min', date: 'Coming soon' },
]

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
        <StubNote>
          These are placeholder articles. Once you're ready, real posts can be added here (or wired to a
          simple CMS so you can publish without touching code).
        </StubNote>

        {/* Category filter */}
        <div className="mt-8 flex flex-wrap gap-2">
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
        <article className="mt-10 grid overflow-hidden rounded-3xl border border-white/10 bg-surface/50 lg:grid-cols-2">
          <MediaPlaceholder ratio="aspect-[16/10] lg:aspect-auto lg:h-full" label="Featured cover" className="rounded-none border-0" />
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <span className="chip w-fit">Featured · {featured.tag}</span>
            <h2 className="mt-4 text-2xl font-700 text-fg sm:text-3xl">{featured.title}</h2>
            <p className="mt-4 text-muted">{featured.excerpt}</p>
            <div className="mt-6 flex items-center gap-4 text-xs text-muted">
              <span className="flex items-center gap-1.5"><Clock size={13} /> {featured.read} read</span>
              <span>{featured.date}</span>
            </div>
            <button type="button" className="btn-primary mt-6 w-fit">
              Read article <ArrowRight size={16} />
            </button>
          </div>
        </article>

        {/* Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <article key={post.title} className="card-hover flex flex-col overflow-hidden">
              <MediaPlaceholder ratio="aspect-[16/10]" label="Post cover" className="rounded-none border-0 border-b border-white/10" />
              <div className="flex flex-1 flex-col p-5">
                <span className="chip w-fit">{post.tag}</span>
                <h3 className="mt-3 text-lg font-600 leading-snug text-fg">{post.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1.5"><Clock size={12} /> {post.read}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}
