// Generates the two remaining Downloads-page PDFs and zips a starter bundle
// from files already in public/downloads/. Run with:
//   node scripts/generate-build-pdfs.mjs && node scripts/generate-more-downloads.mjs
import PDFDocument from 'pdfkit'
import archiver from 'archiver'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '..', 'public', 'downloads')
fs.mkdirSync(OUT_DIR, { recursive: true })

const GREEN = '#2f8f10'
const INK = '#14181d'
const MUTED = '#55606b'

function newDoc(title, subtitle) {
  const doc = new PDFDocument({ size: 'LETTER', margin: 54, bufferPages: true })
  const left = doc.page.margins.left
  const width = doc.page.width - doc.page.margins.left - doc.page.margins.right
  doc.rect(0, 0, doc.page.width, 96).fill('#0a0e0a')
  doc.fillColor(GREEN).font('Helvetica-Bold').fontSize(9).text('ELEVATED MASSES', left, 30, { characterSpacing: 2 })
  doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(20).text(title, left, 44)
  doc.fillColor('#b9c7b4').font('Helvetica').fontSize(10).text(subtitle, left, 70)
  doc.y = 120
  return { doc, left, width }
}

function heading(doc, left, width, text) {
  if (doc.y > doc.page.height - 120) doc.addPage()
  doc.moveDown(0.6)
  doc.fillColor(GREEN).font('Helvetica-Bold').fontSize(13).text(text, left, doc.y)
  doc.moveTo(left, doc.y + 2).lineTo(left + width, doc.y + 2).lineWidth(1).strokeColor('#dfe6da').stroke()
  doc.moveDown(0.5)
}

function footer(doc, left, width) {
  const range = doc.bufferedPageRange()
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i)
    doc.fillColor(MUTED).font('Helvetica').fontSize(8).text(
      'Elevated Masses LLC  •  elevatedmasses.com',
      left,
      doc.page.height - 42,
      { width, align: 'center', lineBreak: false },
    )
  }
  doc.flushPages()
}

function finish(doc, outPath) {
  doc.pipe(fs.createWriteStream(outPath))
  doc.end()
  return new Promise((res) => doc.on('end', res))
}

// ---------------------------------------------------------------------------
// Nutrient Mixing Cheat Sheet — same PPM/EC/pH targets as the blog's
// "PPM, EC, and pH" guide (src/lib/posts.js), kept in sync by hand.
// ---------------------------------------------------------------------------
async function nutrientCheatSheet() {
  const outPath = path.join(OUT_DIR, 'nutrient-mixing-cheat-sheet.pdf')
  const { doc, left, width } = newDoc('Nutrient Mixing Cheat Sheet', 'Quick-reference EC / PPM / pH targets by growth stage')
  const filePipe = fs.createWriteStream(outPath)
  doc.pipe(filePipe)

  heading(doc, left, width, 'Targets by growth stage')
  const rows = [
    ['Stage', 'PPM (500 scale)', 'EC (mS/cm)'],
    ['Seedling / Clone', '100–350', '0.2–0.7'],
    ['Early Veg', '350–500', '0.7–1.0'],
    ['Full Veg', '500–800', '1.0–1.6'],
    ['Transition (pre-flower)', '800–1,000', '1.6–2.0'],
    ['Early Flower', '1,000–1,200', '2.0–2.4'],
    ['Peak Flower', '1,200–1,600', '2.4–3.2'],
    ['Late Flower / Flush', '0–50 (flush only)', '0.0–0.1 (flush only)'],
  ]
  const colW = [width * 0.42, width * 0.29, width * 0.29]
  rows.forEach((r, i) => {
    if (doc.y > doc.page.height - 90) doc.addPage()
    const y = doc.y
    const header = i === 0
    let x = left
    r.forEach((cell, ci) => {
      doc.fillColor(header ? MUTED : INK).font(header ? 'Helvetica-Bold' : ci === 0 ? 'Helvetica-Bold' : 'Helvetica').fontSize(header ? 9 : 10)
        .text(cell, x, y, { width: colW[ci] })
      x += colW[ci]
    })
    doc.moveDown(header ? 0.3 : 0.4)
    if (header) {
      doc.moveTo(left, doc.y).lineTo(left + width, doc.y).lineWidth(0.75).strokeColor('#dfe6da').stroke()
      doc.moveDown(0.3)
    }
  })

  heading(doc, left, width, 'pH targets')
  doc.fillColor(INK).font('Helvetica').fontSize(10.5)
  doc.text('Hydroponic (soilless): 5.5–6.2', left, doc.y)
  doc.moveDown(0.2)
  doc.text('Soil: 6.0–7.0', left, doc.y)
  doc.moveDown(0.5)

  heading(doc, left, width, 'PPM / EC conversion')
  const formulas = [
    '500 scale (Hanna, most common in the US): EC × 500 = PPM',
    '700 scale (Truncheon / Bluelab): EC × 700 = PPM',
    '640 scale (Eutech): EC × 640 = PPM',
  ]
  formulas.forEach((f) => {
    if (doc.y > doc.page.height - 90) doc.addPage()
    const y = doc.y
    doc.circle(left + 3, y + 6, 2).fill(GREEN)
    doc.fillColor(INK).font('Helvetica').fontSize(10.5).text(f, left + 14, y, { width: width - 14, lineGap: 2 })
    doc.moveDown(0.3)
  })
  doc.moveDown(0.2)
  doc.fillColor(MUTED).font('Helvetica-Oblique').fontSize(9.5).text(
    'Check your meter’s documentation to confirm which scale it uses — most American meters default to the 500 scale.',
    left, doc.y, { width },
  )

  heading(doc, left, width, 'Reading the runoff')
  doc.fillColor(INK).font('Helvetica').fontSize(10.5).text(
    'PPM/EC readings drift as plants feed — check every 1–2 days and adjust your reservoir or feed strength to stay in range for the current stage. When in doubt, underfeed rather than overfeed: nutrient burn is harder to recover from than a light deficiency.',
    left, doc.y, { width, lineGap: 2 },
  )

  footer(doc, left, width)
  doc.end()
  return new Promise((res) => filePipe.on('finish', () => res('nutrient-mixing-cheat-sheet.pdf')))
}

// ---------------------------------------------------------------------------
// Weekly Grow Checklist — printable routine, grouped by frequency.
// ---------------------------------------------------------------------------
async function weeklyChecklist() {
  const outPath = path.join(OUT_DIR, 'weekly-grow-checklist.pdf')
  const { doc, left, width } = newDoc('Weekly Grow Checklist', 'A printable routine so nothing slips between feedings')
  const filePipe = fs.createWriteStream(outPath)
  doc.pipe(filePipe)

  function checklist(items) {
    items.forEach((it) => {
      if (doc.y > doc.page.height - 90) doc.addPage()
      const y = doc.y
      doc.rect(left, y + 1, 10, 10).lineWidth(1).strokeColor(GREEN).stroke()
      doc.fillColor(INK).font('Helvetica').fontSize(10.5).text(it, left + 18, y, { width: width - 18, lineGap: 2 })
      doc.moveDown(0.45)
    })
  }

  heading(doc, left, width, 'Every day')
  checklist([
    'Check reservoir water level or soil moisture',
    'Visually inspect leaves for pests, discoloration, or wilting',
    'Confirm lights and timers are running on schedule',
    'Confirm air pump / water pump is running (hydro setups)',
  ])

  heading(doc, left, width, 'Every 2–3 days')
  checklist([
    'Check and adjust pH to target range',
    'Check EC/PPM and top up nutrients as needed',
    'Check reservoir temperature — keep under 68°F (20°C) in hydro',
  ])

  heading(doc, left, width, 'Weekly')
  checklist([
    'Full reservoir change (hydro) or thorough watering with fresh pH\'d nutrient solution (soil)',
    'Clean pH/EC meter probes per manufacturer instructions',
    'Wipe down grow light and check fans/filters for dust buildup',
    'Check and adjust light height as plants grow',
    'Log notes: height, new growth, and anything unusual',
    'Prune or train as appropriate for the current stage (LST, defoliation)',
  ])

  heading(doc, left, width, 'As needed')
  checklist([
    'Flush with plain pH\'d water for the last 1–2 weeks before harvest',
    'Rinse or replace carbon filter media',
    'Re-calibrate pH/EC meters every few weeks per manufacturer instructions',
  ])

  footer(doc, left, width)
  doc.end()
  return new Promise((res) => filePipe.on('finish', () => res('weekly-grow-checklist.pdf')))
}

// ---------------------------------------------------------------------------
// Beginner Starter Pack — zips the 1-pot build guide + both cheat sheets
// above, plus a short welcome readme, into one bundle.
// ---------------------------------------------------------------------------
async function starterPack() {
  const readme = `ELEVATED MASSES — BEGINNER STARTER PACK
========================================

Welcome! This pack has everything you need to get your first grow going:

1. RDWC 1-Pot Build Guide (rdwc-1-pot-build.pdf)
   The simplest recirculating hydro build — one grow bucket, one weekend.

2. Nutrient Mixing Cheat Sheet (nutrient-mixing-cheat-sheet.pdf)
   PPM/EC/pH targets by growth stage, plus quick conversion formulas.

3. Weekly Grow Checklist (weekly-grow-checklist.pdf)
   A printable routine so nothing slips between feedings.

Print the checklist and stick it near your grow space — the two-minute
daily check is the single best habit for catching problems early.

Questions? info@elevatedmasses.com
Grow, share, and stay elevated. — Elevated Masses LLC
`
  fs.writeFileSync(path.join(OUT_DIR, '_readme.txt'), readme)

  const outPath = path.join(OUT_DIR, 'beginner-starter-pack.zip')
  const output = fs.createWriteStream(outPath)
  const archive = archiver('zip', { zlib: { level: 9 } })
  const done = new Promise((res, rej) => {
    output.on('close', res)
    archive.on('error', rej)
  })
  archive.pipe(output)
  archive.file(path.join(OUT_DIR, 'rdwc-1-pot-build.pdf'), { name: 'rdwc-1-pot-build.pdf' })
  archive.file(path.join(OUT_DIR, 'nutrient-mixing-cheat-sheet.pdf'), { name: 'nutrient-mixing-cheat-sheet.pdf' })
  archive.file(path.join(OUT_DIR, 'weekly-grow-checklist.pdf'), { name: 'weekly-grow-checklist.pdf' })
  archive.file(path.join(OUT_DIR, '_readme.txt'), { name: 'README.txt' })
  await archive.finalize()
  await done
  fs.unlinkSync(path.join(OUT_DIR, '_readme.txt'))
  return 'beginner-starter-pack.zip'
}

await nutrientCheatSheet()
await weeklyChecklist()
const zipName = await starterPack()
console.log('Generated: nutrient-mixing-cheat-sheet.pdf, weekly-grow-checklist.pdf,', zipName)
