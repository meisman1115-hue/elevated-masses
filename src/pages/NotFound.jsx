import { Link } from 'react-router-dom'
import { Sprout, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="container-em flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green/10 text-green">
        <Sprout size={32} />
      </span>
      <p className="mt-6 font-display text-6xl font-700 text-green">404</p>
      <h1 className="mt-3 text-2xl font-700 text-fg">This page didn't take root</h1>
      <p className="mt-3 max-w-md text-muted">
        The page you're looking for doesn't exist or has been moved. Let's get you back to familiar soil.
      </p>
      <Link to="/" className="btn-primary mt-8">
        <ArrowLeft size={16} /> Back home
      </Link>
    </section>
  )
}
