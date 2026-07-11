import { useState } from 'react'
import { PageHeader, StubNote } from '../components/ui.jsx'
import {
  Upload, ScanLine, Leaf, AlertTriangle, CheckCircle2,
  Sparkles, Database, ShieldCheck, Loader2,
} from 'lucide-react'

const plantTypes = ['Cannabis', 'Leafy greens', 'Herbs', 'Tomatoes / fruiting', 'Peppers', 'Other']

// Demo diagnosis shown after "analyzing" — replaced by a real AI model later.
const demoResult = {
  issue: 'Likely nitrogen deficiency',
  confidence: 'Demo result',
  causes: [
    'Older/lower leaves yellowing from the tips inward',
    'Reservoir may be low on nitrogen or pH is out of range (nutrient lockout)',
  ],
  fixes: [
    'Check and correct pH to 5.5–6.5 for hydro',
    'Top up with a balanced nutrient / cal-mag per label',
    'Recheck new growth over the next 5–7 days',
  ],
}

export default function PlantAI() {
  const [status, setStatus] = useState('idle') // idle | loading | done
  const [plant, setPlant] = useState('Cannabis')

  function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => setStatus('done'), 1600) // simulate analysis
  }

  return (
    <>
      <PageHeader
        eyebrow="Plant AI · Community-trained"
        title="Diagnose a plant problem"
        description="Upload a photo, describe the symptoms, and get likely causes and fixes. Every submission helps train a model built by growers, for growers."
      />

      <div className="container-em py-12">
        <StubNote>
          This is a working demo of the interface. It returns a sample diagnosis for now — connecting a
          real AI model (and safely storing submissions to train it) is the next build step.
        </StubNote>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* Submission form */}
          <form onSubmit={handleSubmit} className="card p-6 sm:p-8">
            <h2 className="text-xl font-700 text-fg">Submit your plant</h2>

            {/* Upload */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-600 text-fg">Photo of the plant</label>
              <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/15 bg-surface/50 text-muted transition-colors hover:border-green/50">
                <Upload size={28} className="text-green" />
                <p className="text-sm font-medium">Drag a photo here or click to upload</p>
                <p className="text-xs text-muted/70">JPG or PNG · placeholder — not yet functional</p>
              </div>
            </div>

            {/* Plant type */}
            <div className="mt-6">
              <label htmlFor="plant-type" className="mb-2 block text-sm font-600 text-fg">Plant type</label>
              <select
                id="plant-type"
                value={plant}
                onChange={(e) => setPlant(e.target.value)}
                className="min-h-[44px] w-full rounded-xl border border-white/10 bg-surface px-4 text-sm text-fg focus:border-green/60 focus:outline-none"
              >
                {plantTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>

            {/* Symptoms */}
            <div className="mt-6">
              <label htmlFor="symptoms" className="mb-2 block text-sm font-600 text-fg">Describe the symptoms</label>
              <textarea
                id="symptoms"
                rows={4}
                placeholder="e.g. Lower leaves are turning yellow and curling. Growing in DWC, pH around 6.2…"
                className="w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm text-fg placeholder:text-muted/50 focus:border-green/60 focus:outline-none"
              />
              <p className="mt-1.5 text-xs text-muted">The more detail (setup, water, light, timeline), the better the guess.</p>
            </div>

            <button type="submit" className="btn-primary mt-6 w-full" disabled={status === 'loading'}>
              {status === 'loading' ? (
                <><Loader2 size={16} className="animate-spin" /> Analyzing…</>
              ) : (
                <><ScanLine size={16} /> Analyze plant</>
              )}
            </button>
          </form>

          {/* Result / info panel */}
          <div className="space-y-6">
            {status === 'done' ? (
              <div className="card p-6 sm:p-7 animate-fade-up">
                <div className="flex items-center gap-2">
                  <span className="chip"><Sparkles size={13} className="text-purple-soft" /> {demoResult.confidence}</span>
                </div>
                <h3 className="mt-4 flex items-center gap-2 text-xl font-700 text-fg">
                  <AlertTriangle size={20} className="text-purple-soft" /> {demoResult.issue}
                </h3>

                <h4 className="mt-5 text-sm font-600 uppercase tracking-wide text-muted">What we're seeing</h4>
                <ul className="mt-2 space-y-2">
                  {demoResult.causes.map((c) => (
                    <li key={c} className="flex gap-2 text-sm text-muted"><Leaf size={15} className="mt-0.5 shrink-0 text-green" /> {c}</li>
                  ))}
                </ul>

                <h4 className="mt-5 text-sm font-600 uppercase tracking-wide text-muted">Suggested fixes</h4>
                <ul className="mt-2 space-y-2">
                  {demoResult.fixes.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-muted"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-green" /> {f}</li>
                  ))}
                </ul>

                <p className="mt-5 rounded-lg bg-white/5 px-3 py-2 text-xs text-muted/80">
                  Demo output for layout purposes only — not real plant-health advice yet.
                </p>
              </div>
            ) : (
              <div className="card flex flex-col items-center justify-center p-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple/10 text-purple-soft">
                  <ScanLine size={30} />
                </span>
                <h3 className="mt-4 text-lg font-600 text-fg">Your diagnosis appears here</h3>
                <p className="mt-2 max-w-xs text-sm text-muted">Fill out the form and hit Analyze to see a sample result.</p>
              </div>
            )}

            {/* How it works */}
            <div className="card p-6">
              <h3 className="text-sm font-600 uppercase tracking-wide text-muted">How it works</h3>
              <ul className="mt-4 space-y-4">
                {[
                  { icon: Upload, t: 'You submit', d: 'A photo + symptoms of your plant.' },
                  { icon: Database, t: 'It learns', d: 'Submissions build a grower-sourced dataset.' },
                  { icon: Sparkles, t: 'You get answers', d: 'Likely causes and fixes in seconds.' },
                ].map(({ icon: Icon, t, d }) => (
                  <li key={t} className="flex gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green/10 text-green"><Icon size={17} /></span>
                    <span><span className="block font-600 text-fg">{t}</span><span className="block text-sm text-muted">{d}</span></span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex items-start gap-2 border-t border-white/10 pt-4 text-xs text-muted">
                <ShieldCheck size={15} className="mt-0.5 shrink-0 text-green" />
                Your submissions stay private and are only used to improve diagnoses. You'll control this when accounts launch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
