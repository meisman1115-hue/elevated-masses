import { Link } from 'react-router-dom'
import { PageHeader, StubNote } from '../components/ui.jsx'
import { Mail, MessageSquare, Instagram, Send } from 'lucide-react'
import { TikTokIcon } from '../components/icons.jsx'

const contactChannels = [
  { icon: Mail, title: 'Email', value: 'info@elevatedmasses.com', note: 'Best way to reach us', href: 'mailto:info@elevatedmasses.com' },
  { icon: Instagram, title: 'Instagram', value: '@mrgrowurown', note: 'Follow along', href: 'https://www.instagram.com/mrgrowurown/' },
  { icon: TikTokIcon, title: 'TikTok', value: '@elevatedmasses', note: 'Follow along', href: 'https://www.tiktok.com/@elevatedmasses' },
  { icon: MessageSquare, title: 'Forum', value: 'Ask the community', note: 'Public discussion', href: '/forum' },
]

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Say hello"
        description="Questions, collabs, event ideas or affiliate inquiries — reach out and we'll get back to you."
      />

      <div className="container-em py-12">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <form className="card p-6 sm:p-8" onSubmit={(e) => e.preventDefault()}>
            <StubNote>
              This form is a placeholder. It can be connected to your email (via a service like Formspree)
              or the site's backend once it's set up.
            </StubNote>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-600 text-fg">Name</label>
                <input id="name" type="text" autoComplete="name" className="min-h-[44px] w-full rounded-xl border border-white/10 bg-surface px-4 text-sm text-fg focus:border-green/60 focus:outline-none" />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-600 text-fg">Email</label>
                <input id="email" type="email" autoComplete="email" className="min-h-[44px] w-full rounded-xl border border-white/10 bg-surface px-4 text-sm text-fg focus:border-green/60 focus:outline-none" />
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="topic" className="mb-2 block text-sm font-600 text-fg">Topic</label>
              <select id="topic" className="min-h-[44px] w-full rounded-xl border border-white/10 bg-surface px-4 text-sm text-fg focus:border-green/60 focus:outline-none">
                <option>General question</option>
                <option>Affiliate / seed partnership</option>
                <option>Event / collaboration</option>
                <option>Feedback</option>
              </select>
            </div>
            <div className="mt-5">
              <label htmlFor="message" className="mb-2 block text-sm font-600 text-fg">Message</label>
              <textarea id="message" rows={5} className="w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm text-fg focus:border-green/60 focus:outline-none" />
            </div>
            <button type="submit" className="btn-primary mt-6">Send message <Send size={16} /></button>
          </form>

          <div className="space-y-4">
            {contactChannels.map(({ icon: Icon, title, value, note, href }) => {
              const inner = (
                <>
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green/10 text-green"><Icon size={20} /></span>
                  <div>
                    <p className="font-600 text-fg">{title}</p>
                    <p className="text-sm text-green">{value}</p>
                    <p className="text-xs text-muted/70">{note}</p>
                  </div>
                </>
              )
              if (!href) {
                return <div key={title} className="card flex items-center gap-4 p-5">{inner}</div>
              }
              if (href.startsWith('http') || href.startsWith('mailto:')) {
                const external = href.startsWith('http')
                return (
                  <a
                    key={title}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="card-hover flex items-center gap-4 p-5"
                  >
                    {inner}
                  </a>
                )
              }
              return (
                <Link key={title} to={href} className="card-hover flex items-center gap-4 p-5">
                  {inner}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
