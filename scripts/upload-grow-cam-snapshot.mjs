// Uploads one local snapshot image to Supabase Storage as `grow-cam/latest.jpg`,
// which the Home page hero displays as an auto-refreshing "live" view into
// the grow tent. Run this locally/periodically (e.g. Windows Task Scheduler,
// cron, or a loop on whatever machine grabs the snapshot from your camera) —
// it does NOT run on Vercel and does NOT talk to your camera directly.
//
// Usage:
//   node --env-file=.env scripts/upload-grow-cam-snapshot.mjs path/to/snapshot.jpg
//
// Needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env (see
// .env.example) — the service role key bypasses Row Level Security, which is
// what lets this script overwrite latest.jpg even though the bucket has no
// public upload policy. Never commit that key or expose it to the browser.
import fs from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const filePath = process.argv[2]
if (!filePath) {
  console.error('Usage: node --env-file=.env scripts/upload-grow-cam-snapshot.mjs <path-to-snapshot.jpg>')
  process.exit(1)
}

const url = process.env.SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !serviceKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY — copy .env.example to .env and fill them in.')
  process.exit(1)
}

const supabase = createClient(url, serviceKey)
const bytes = fs.readFileSync(filePath)

const { error } = await supabase.storage.from('grow-cam').upload('latest.jpg', bytes, {
  contentType: 'image/jpeg',
  upsert: true,
})

if (error) {
  console.error('Upload failed:', error.message)
  process.exit(1)
}

console.log(`Uploaded ${filePath} (${bytes.length} bytes) -> grow-cam/latest.jpg at ${new Date().toISOString()}`)
