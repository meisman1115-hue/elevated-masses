import { useState, useRef, useEffect } from 'react'
import { PageHeader, StubNote } from '../components/ui.jsx'
import {
  Upload, ScanLine, Leaf, AlertTriangle, CheckCircle2,
  Sparkles, Database, ShieldCheck, Loader2, X, AlertCircle, Gauge,
} from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'
import { useAuth } from '../context/AuthContext.jsx'

const plantTypes = ['Cannabis', 'Leafy greens', 'Herbs', 'Tomatoes / fruiting', 'Peppers', 'Other']
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_MB = 15
const TIER_LABELS = { free: 'Free', seedling: 'Seedling', vegging: 'Vegging', flowering: 'Flowering', harvest: 'Harvest' }

// Resizes/compresses an image client-side before sending it anywhere — keeps
// the request small and image tokens cheap. Returns a JPEG blob + its base64
// data (for the API call) at a max of 1024px on the long edge.
function resizeImage(file, maxDim = 1024, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)
    img.onload = () => {
      let { width, height } = img
      if (width > height && width > maxDim) {
        height = Math.round((height * maxDim) / width)
        width = maxDim
      } else if (height > maxDim) {
        width = Math.round((width * maxDim) / height)
        height = maxDim
      }
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(img, 0, 0, width, height)
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectUrl)
          if (!blob) return reject(new Error('Could not process that image.'))
          const reader = new FileReader()
          reader.onload = () => resolve({ blob, base64: reader.result.split(',')[1], mediaType: 'image/jpeg' })
          reader.onerror = () => reject(new Error('Could not read that image.'))
          reader.readAsDataURL(blob)
        },
        'image/jpeg',
        quality,
      )
    }
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Could not load that image.'))
    }
    img.src = objectUrl
  })
}

// Best-effort: save the submission for the grower-sourced training dataset.
// Never blocks or breaks the diagnosis flow if it fails.
async function saveSubmission({ blob, plantType, symptoms, diagnosis, userId }) {
  if (!isSupabaseConfigured) return
  const path = `${crypto.randomUUID()}.jpg`
  const { error: uploadError } = await supabase.storage.from('plant-photos').upload(path, blob, {
    contentType: 'image/jpeg',
  })
  if (uploadError) throw uploadError
  const { data: urlData } = supabase.storage.from('plant-photos').getPublicUrl(path)
  await supabase.from('plant_submissions').insert({
    author_id: userId ?? null,
    plant_type: plantType,
    symptoms,
    image_url: urlData?.publicUrl,
    diagnosis,
  })
}

export default function PlantAI() {
  const { user, isConfigured, openAuthModal } = useAuth()
  const [status, setStatus] = useState('idle') // idle | analyzing | done | error
  const [plant, setPlant] = useState('Cannabis')
  const [symptoms, setSymptoms] = useState('')
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [diagnosis, setDiagnosis] = useState(null)
  const [usage, setUsage] = useState(null) // { tier, used, limit }
  const [errorMsg, setErrorMsg] = useState('')
  const fileInputRef = useRef(null)

  // Revoke the object URL when the preview changes or the component unmounts.
  useEffect(() => () => previewUrl && URL.revokeObjectURL(previewUrl), [previewUrl])

  // Prompt sign-in if not authenticated — Plant AI requires an account so
  // weekly usage can be tracked per person.
  useEffect(() => {
    if (isConfigured && !user) openAuthModal()
  }, [isConfigured, user, openAuthModal])

  function handleFileSelect(selected) {
    setErrorMsg('')
    if (!selected) return
    if (!ACCEPTED_TYPES.includes(selected.type)) {
      setErrorMsg('Please choose a JPG, PNG, or WebP photo.')
      return
    }
    if (selected.size > MAX_FILE_MB * 1024 * 1024) {
      setErrorMsg(`That photo is too large — please choose one under ${MAX_FILE_MB}MB.`)
      return
    }
    setFile(selected)
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(selected)
    })
  }

  function clearFile() {
    setFile(null)
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!file) {
      setErrorMsg('Please choose a photo of your plant first.')
      return
    }
    if (!user) {
      openAuthModal()
      return
    }
    setStatus('analyzing')
    setErrorMsg('')
    try {
      const { blob, base64, mediaType } = await resizeImage(file)
      const { data: sessionData } = await supabase.auth.getSession()
      const accessToken = sessionData?.session?.access_token
      if (!accessToken) throw new Error('Your session has expired — please sign in again.')

      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ imageBase64: base64, imageMediaType: mediaType, plantType: plant, symptoms }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        if (data.usage) setUsage(data.usage)
        throw new Error(data.error || 'Something went wrong analyzing that photo.')
      }

      setDiagnosis(data.diagnosis)
      if (data.usage) setUsage(data.usage)
      setStatus('done')

      // Fire-and-forget — helps build the dataset, never blocks the result.
      saveSubmission({ blob, plantType: plant, symptoms, diagnosis: data.diagnosis, userId: user.id }).catch(() => {})
    } catch (err) {
      setErrorMsg(err.message || 'Could not analyze the photo. Please try again.')
      setStatus('error')
    }
  }

  const confidenceLabel = { low: 'Low confidence', medium: 'Medium confidence', high: 'High confidence' }

  // Gate the whole page behind sign-in.
  if (isConfigured && !user) {
    return (
      <div className="container-em max-w-2xl py-24 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple/10 text-purple-soft">
          <ScanLine size={28} />
        </span>
        <h1 className="mt-5 text-2xl font-700 text-fg">Sign in to use Plant AI</h1>
        <p className="mt-3 text-muted">
          A free account keeps diagnoses tied to you and lets us give everyone a fair weekly limit.
        </p>
        <button type="button" onClick={openAuthModal} className="btn-primary mt-6">Sign in</button>
      </div>
    )
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
          Diagnoses are generated by AI from your photo and description — genuinely useful as a first read,
          but not a substitute for experience. Always keep monitoring your plant.
        </StubNote>

        {usage && (
          <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-white/10 bg-surface/50 px-4 py-3 text-sm text-muted">
            <Gauge size={16} className="text-green" />
            {usage.limit == null ? (
              <span><span className="font-600 text-fg">{TIER_LABELS[usage.tier] ?? usage.tier}</span> — unlimited diagnoses</span>
            ) : (
              <span>
                <span className="font-600 text-fg">{usage.used} of {usage.limit}</span> diagnoses used this week
                ({TIER_LABELS[usage.tier] ?? usage.tier} tier) — resets Sunday at midnight UTC
              </span>
            )}
          </div>
        )}

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* Submission form */}
          <form onSubmit={handleSubmit} className="card p-6 sm:p-8">
            <h2 className="text-xl font-700 text-fg">Submit your plant</h2>

            {/* Upload */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-600 text-fg">Photo of the plant</label>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_TYPES.join(',')}
                onChange={(e) => handleFileSelect(e.target.files?.[0])}
                className="sr-only"
                id="plant-photo"
              />
              {previewUrl ? (
                <div className="relative overflow-hidden rounded-2xl border border-white/15">
                  <img src={previewUrl} alt="Selected plant" className="aspect-[16/10] w-full object-cover" />
                  <button
                    type="button"
                    onClick={clearFile}
                    className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-bg/80 text-fg backdrop-blur hover:bg-bg"
                    aria-label="Remove photo"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="plant-photo"
                  className="flex aspect-[16/10] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/15 bg-surface/50 text-muted transition-colors hover:border-green/50"
                >
                  <Upload size={28} className="text-green" />
                  <p className="text-sm font-medium">Click to choose a photo</p>
                  <p className="text-xs text-muted/70">JPG, PNG, or WebP · up to {MAX_FILE_MB}MB</p>
                </label>
              )}
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
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g. Lower leaves are turning yellow and curling. Growing in DWC, pH around 6.2…"
                className="w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm text-fg placeholder:text-muted/50 focus:border-green/60 focus:outline-none"
              />
              <p className="mt-1.5 text-xs text-muted">The more detail (setup, water, light, timeline), the better the guess.</p>
            </div>

            {errorMsg && (
              <p role="alert" className="mt-4 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                <AlertCircle size={15} className="mt-0.5 shrink-0" /> {errorMsg}
              </p>
            )}

            <button type="submit" className="btn-primary mt-6 w-full" disabled={status === 'analyzing'}>
              {status === 'analyzing' ? (
                <><Loader2 size={16} className="animate-spin" /> Analyzing…</>
              ) : (
                <><ScanLine size={16} /> Analyze plant</>
              )}
            </button>
          </form>

          {/* Result / info panel */}
          <div className="space-y-6">
            {status === 'done' && diagnosis ? (
              <div className="card p-6 sm:p-7 animate-fade-up">
                <div className="flex items-center gap-2">
                  <span className="chip"><Sparkles size={13} className="text-purple-soft" /> {confidenceLabel[diagnosis.confidence] ?? 'AI diagnosis'}</span>
                </div>
                <h3 className="mt-4 flex items-center gap-2 text-xl font-700 text-fg">
                  <AlertTriangle size={20} className="text-purple-soft" /> {diagnosis.issue}
                </h3>

                <h4 className="mt-5 text-sm font-600 uppercase tracking-wide text-muted">What we're seeing</h4>
                <ul className="mt-2 space-y-2">
                  {diagnosis.causes.map((c) => (
                    <li key={c} className="flex gap-2 text-sm text-muted"><Leaf size={15} className="mt-0.5 shrink-0 text-green" /> {c}</li>
                  ))}
                </ul>

                <h4 className="mt-5 text-sm font-600 uppercase tracking-wide text-muted">Suggested fixes</h4>
                <ul className="mt-2 space-y-2">
                  {diagnosis.fixes.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-muted"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-green" /> {f}</li>
                  ))}
                </ul>

                <p className="mt-5 rounded-lg bg-white/5 px-3 py-2 text-xs text-muted/80">
                  AI-generated guidance, not a certain diagnosis — keep monitoring and change one variable at a time.
                </p>
              </div>
            ) : (
              <div className="card flex flex-col items-center justify-center p-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple/10 text-purple-soft">
                  <ScanLine size={30} />
                </span>
                <h3 className="mt-4 text-lg font-600 text-fg">Your diagnosis appears here</h3>
                <p className="mt-2 max-w-xs text-sm text-muted">Upload a photo and hit Analyze to get a real-time diagnosis.</p>
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
              <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs text-muted">
                <p className="flex items-start gap-2">
                  <ShieldCheck size={15} className="mt-0.5 shrink-0 text-green" />
                  Photos help train future diagnoses and aren't shown publicly.
                </p>
                <p className="flex items-start gap-2">
                  <Gauge size={15} className="mt-0.5 shrink-0 text-green" />
                  Free accounts get 10 diagnoses/week. Seedling ($5+) gets 25/week, Vegging &amp; Flowering ($20+)
                  get 100/week, and Harvest ($100+) gets unlimited — see{' '}
                  <a href="/membership" className="text-green hover:text-green-soft">Membership</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
