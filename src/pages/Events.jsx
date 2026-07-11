import { PageHeader, MediaPlaceholder, VideoPlaceholder, StubNote } from '../components/ui.jsx'
import { Calendar, MapPin, Clock, ArrowRight, Ticket } from 'lucide-react'

const events = [
  { month: 'AUG', day: '16', title: 'Blunts & Brushes — Paint Night', type: 'Community', place: 'Placeholder venue · City, ST', time: '7:00 PM', blurb: 'Our signature creative night. Bring your vibe, we bring the canvases.' },
  { month: 'SEP', day: '07', title: 'Beginner Hydro Build Workshop', type: 'Workshop', place: 'Placeholder venue · City, ST', time: '1:00 PM', blurb: 'Hands-on: build your own DWC bucket and take it home.' },
  { month: 'SEP', day: '21', title: 'Harvest Meetup & Swap', type: 'Meetup', place: 'Placeholder venue · City, ST', time: '4:00 PM', blurb: 'Show your grow, swap clones and cuttings, trade tips.' },
  { month: 'OCT', day: '12', title: 'Grow Room Tour (Livestream)', type: 'Online', place: 'Online · YouTube Live', time: '6:00 PM', blurb: 'A virtual walkthrough of a full vertical setup, Q&A after.' },
]

export default function Events() {
  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Come grow with us"
        description="Workshops, meetups and our signature Blunts & Brushes nights. Placeholders for now — real dates and tickets drop in here."
      >
        <a href="#calendar" className="btn-primary">See upcoming <ArrowRight size={16} /></a>
      </PageHeader>

      <div className="container-em py-12">
        {/* Featured event */}
        <div className="grid overflow-hidden rounded-3xl border border-purple/25 bg-surface/50 lg:grid-cols-2">
          <VideoPlaceholder label="Event highlight reel" ratio="aspect-video lg:aspect-auto lg:h-full" className="rounded-none border-0" />
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <span className="chip w-fit"><Ticket size={13} className="text-purple-soft" /> Featured event</span>
            <h2 className="mt-4 text-2xl font-700 text-fg sm:text-3xl">Blunts &amp; Brushes — Paint Night</h2>
            <p className="mt-4 text-muted">Our most-loved community night: relaxed, creative, and welcoming to every skill level. Canvases and good company provided.</p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted">
              <span className="flex items-center gap-2"><Calendar size={15} className="text-green" /> Aug 16</span>
              <span className="flex items-center gap-2"><Clock size={15} className="text-green" /> 7:00 PM</span>
              <span className="flex items-center gap-2"><MapPin size={15} className="text-green" /> Placeholder venue</span>
            </div>
            <button type="button" className="btn-accent mt-6 w-fit">Reserve a spot <ArrowRight size={16} /></button>
          </div>
        </div>

        <StubNote>
          Event RSVPs and ticketing can be wired to a tool like Eventbrite, or built into the site once
          user accounts are live. For now the buttons are placeholders.
        </StubNote>

        {/* Event list */}
        <h2 id="calendar" className="mt-14 scroll-mt-24 text-2xl font-700 text-fg">Upcoming</h2>
        <div className="mt-6 space-y-4">
          {events.map((e) => (
            <div key={e.title} className="card-hover flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl border border-green/30 bg-green/5 text-green">
                <span className="text-xs font-600 tracking-wide">{e.month}</span>
                <span className="font-display text-3xl font-700 leading-none">{e.day}</span>
              </div>
              <div className="flex-1">
                <span className="chip">{e.type}</span>
                <h3 className="mt-2 text-lg font-600 text-fg">{e.title}</h3>
                <p className="mt-1 text-sm text-muted">{e.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1.5"><Clock size={12} /> {e.time}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={12} /> {e.place}</span>
                </div>
              </div>
              <button type="button" className="btn-ghost shrink-0">Details</button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
