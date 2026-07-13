// Weekly affiliate link health check.
//
// Amazon does not allow scraping product data (no official way to pull
// current prices/titles without the Product Advertising API, which requires
// 3+ qualifying sales in the last 180 days to unlock). Until that's
// available, this script does the next best thing: it verifies every
// affiliate link on the site still resolves to a live Amazon product page,
// and flags anything that looks dead, delisted, or redirected to a generic
// search/error page so it can be swapped out by hand.
//
// Run manually:   node scripts/check-affiliate-links.mjs
// Scheduled:      see docs/link-checker-schedule.md for the weekly cron setup.

import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { gearProducts } from '../src/lib/gear.js'
import { kitCategories } from '../src/lib/kits.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPORT_PATH = path.join(__dirname, '..', 'link-check-report.md')

// Collect every affiliate link on the site, tagged with where it's used.
function collectLinks() {
  const links = []
  for (const p of gearProducts) {
    links.push({ label: `${p.brand} ${p.title}`, source: 'Gear page', url: p.url })
  }
  for (const cat of kitCategories) {
    for (const opt of cat.options) {
      links.push({ label: `${cat.name} (${opt.tier}): ${opt.name}`, source: 'Kit builder', url: opt.url })
    }
  }
  return links
}

// Patterns that mean "the link technically loaded, but not to a real product"
// — Amazon's dog-themed 404 page, a bare search results page, etc.
const DEAD_PATTERNS = [/\/errors\//i, /\/gp\/error/i, /dogs-of-amazon/i, /404/i]

async function checkOne({ url }) {
  // Known-placeholder URLs (categories waiting on real products) aren't
  // "broken" — they were never real. Amazon's response to garbage ASINs is
  // also inconsistent (200/404/405 for the same fake ID on different runs),
  // so checking them as if they were real links would just produce noise.
  if (/PLACEHOLDER/i.test(url)) {
    return { ok: null, placeholder: true, status: 'N/A', finalUrl: null }
  }
  try {
    const res = await fetch(url, { redirect: 'follow', method: 'GET' })
    const finalUrl = res.url || url
    const looksDead =
      !res.ok ||
      DEAD_PATTERNS.some((p) => p.test(finalUrl)) ||
      // A product link that redirected to Amazon's bare homepage or a search
      // page (no product path in the final URL) usually means the ASIN was
      // delisted. Amazon serves valid product pages at a few different path
      // shapes (/dp/, /gp/product/, /gp/aw/d/ — a mobile-friendly format).
      (/amazon\./i.test(finalUrl) && !/\/(dp|gp\/product|gp\/aw\/d)\//i.test(finalUrl) && !/amzn\.to/i.test(finalUrl))

    return { ok: !looksDead, status: res.status, finalUrl }
  } catch (err) {
    return { ok: false, status: 'ERROR', finalUrl: null, error: err.message }
  }
}

async function main() {
  const links = collectLinks()
  console.log(`Checking ${links.length} affiliate links...\n`)

  const results = []
  for (const link of links) {
    const result = await checkOne(link)
    results.push({ ...link, ...result })
    const icon = result.placeholder ? '·' : result.ok ? '✓' : '✗'
    const tag = result.placeholder ? '  [placeholder]' : result.ok ? '' : `  [${result.status}]`
    console.log(`${icon} ${link.label} — ${link.source}${tag}`)
  }

  const broken = results.filter((r) => !r.placeholder && !r.ok)
  const placeholders = results.filter((r) => r.placeholder)
  const live = results.filter((r) => !r.placeholder && r.ok)
  const timestamp = new Date().toISOString()

  const lines = [
    `# Affiliate Link Check — ${timestamp}`,
    '',
    `Checked **${live.length + broken.length}** real links (**${broken.length}** broken) plus **${placeholders.length}** slots still waiting on real products.`,
    '',
  ]
  if (broken.length > 0) {
    lines.push('## Needs attention — links that used to work and now don\'t', '')
    for (const r of broken) {
      lines.push(`- **${r.label}** (${r.source}) — status ${r.status}${r.error ? `: ${r.error}` : ''}`)
      lines.push(`  - ${r.url}`)
    }
    lines.push('')
  } else {
    lines.push('## Needs attention', '', 'None — every real affiliate link resolved fine this week.', '')
  }
  if (placeholders.length > 0) {
    lines.push('## Still waiting on real products (not counted as broken)', '')
    for (const r of placeholders) {
      lines.push(`- ${r.label} (${r.source})`)
    }
    lines.push('')
  }
  lines.push('## All checked links', '')
  for (const r of results) {
    const icon = r.placeholder ? '⬜' : r.ok ? '✅' : '❌'
    lines.push(`- ${icon} ${r.label} (${r.source}) — ${r.placeholder ? 'placeholder, not yet a real link' : r.url}`)
  }
  lines.push(
    '',
    '---',
    '_Note: this checks that links resolve to a live product page. It cannot verify current price or stock',
    '— Amazon does not allow scraping that data. Prices update automatically once the site is connected to',
    'the official Amazon Product Advertising API (requires 3+ qualifying sales in the last 180 days)._',
  )

  fs.writeFileSync(REPORT_PATH, lines.join('\n'))
  console.log(`\n${broken.length === 0 ? 'All real links OK.' : `${broken.length} link(s) need attention.`} (${placeholders.length} still placeholder.) Report written to ${path.relative(process.cwd(), REPORT_PATH)}`)

  process.exitCode = broken.length > 0 ? 1 : 0
}

main()
