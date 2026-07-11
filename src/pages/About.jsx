import { Link } from 'react-router-dom'
import { PageHeader, MediaPlaceholder, SectionHeading } from '../components/ui.jsx'
import { Target, Users, Sprout, ArrowRight } from 'lucide-react'

const values = [
  { icon: Sprout, title: 'Grow anywhere', body: 'Small apartment or spare closet — we prove you don\'t need a backyard to grow serious plants.' },
  { icon: Users, title: 'Community first', body: 'Every guide, event and forum thread exists to help the next grower level up.' },
  { icon: Target, title: 'No gatekeeping', body: 'Clear, honest info and gear we\'d actually use ourselves. No fluff, no hype.' },
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Urban hydroponics, for the masses"
        description="Elevated Masses exists to make next-level indoor growing accessible to anyone — with blueprints, builds, gear and a community that has your back."
      />

      <div className="container-em py-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <MediaPlaceholder ratio="aspect-[4/3]" label="Founder / grow room photo" />
          <div>
            <SectionHeading eyebrow="Our story" title="Built by growers, for growers" />
            <div className="mt-5 space-y-4 text-muted">
              <p>
                Elevated Masses started with a simple idea: great indoor growing shouldn't be locked
                behind expensive setups or gatekept knowledge. <span className="text-fg">This is placeholder copy</span> —
                drop in your real story, mission and background here.
              </p>
              <p>
                From digital blueprints and step-by-step build guides to curated gear, seeds and a
                community forum, everything here is designed to help you grow higher — wherever you are.
              </p>
            </div>
            <Link to="/contact" className="btn-primary mt-7">Get in touch <ArrowRight size={16} /></Link>
          </div>
        </div>

        <div className="mt-20">
          <SectionHeading align="center" eyebrow="What we stand for" title="Our values" className="mx-auto" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map(({ icon: Icon, title, body }) => (
              <div key={title} className="card p-6 text-center">
                <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green/10 text-green"><Icon size={22} /></span>
                <h3 className="mt-5 text-lg font-600 text-fg">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
