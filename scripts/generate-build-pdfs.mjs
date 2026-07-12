// Generates the RDWC build-guide PDFs into public/downloads/.
// Run with: node scripts/generate-build-pdfs.mjs
import PDFDocument from 'pdfkit'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '..', 'public', 'downloads')
fs.mkdirSync(OUT_DIR, { recursive: true })

const GREEN = '#2f8f10'
const PURPLE = '#7c3aed'
const INK = '#14181d'
const MUTED = '#55606b'

function partsFor(pots) {
  const buckets = pots + 1
  const waterPump = pots <= 1 ? '160+ GPH submersible' : pots <= 2 ? '400+ GPH submersible' : '800+ GPH submersible'
  const airPump = pots <= 2 ? 'Dual-outlet air pump (~10W)' : 'Commercial 4-outlet air pump (~35W)'
  const hydroton = Math.max(1, Math.ceil(pots / 2))
  return [
    ['5-gallon buckets with lids', `${buckets} (${pots} grow + 1 control/reservoir)`],
    ['6" mesh net-pot lids', `${pots}`],
    ['3/4" uniseal or bulkhead fittings', `${pots * 2 + 2}`],
    ['3/4" flexible tubing / PVC', `~${pots * 2 + 3} ft (to link buckets in a loop)`],
    ['Submersible water pump', `1 × ${waterPump}`],
    ['Air pump', `1 × ${airPump}`],
    ['Air stones (large)', `${pots + 1} (one per bucket + control)`],
    ['Airline tubing', `~${(pots + 1) * 3} ft`],
    ['Clay pebbles (hydroton)', `${hydroton} × 10L bag${hydroton > 1 ? 's' : ''}`],
    ['Net cups (if not using mesh lids)', `${pots}`],
    ['Hydroponic nutrients', '1 starter set'],
    ['pH & EC meter + pH Up/Down', '1 set'],
  ]
}

const builds = [
  {
    pots: 1,
    title: 'RDWC 1-Pot Build Guide',
    subtitle: 'A single-site recirculating deep water culture system',
    file: 'rdwc-1-pot-build.pdf',
    intro:
      'This is the simplest recirculating deep water culture (RDWC) build: one grow bucket linked to a control/reservoir bucket. Water and nutrients circulate and stay oxygenated, giving you the fast growth of DWC with easier monitoring and top-ups from a single control bucket. Great as a first recirculating system or a compact single-plant setup.',
    difficulty: 'Beginner',
    time: 'A weekend',
  },
  {
    pots: 2,
    title: 'RDWC 2-Pot Build Guide',
    subtitle: 'A two-site recirculating deep water culture system',
    file: 'rdwc-2-pot-build.pdf',
    intro:
      'This RDWC build links two grow buckets to a shared control/reservoir bucket. Because all buckets share the same water, you dose and check pH/EC in one place and every plant gets the same feed. A great step up once you are comfortable with a single bucket.',
    difficulty: 'Beginner–Intermediate',
    time: 'A weekend',
  },
  {
    pots: 4,
    title: 'RDWC 4-Pot Build Guide',
    subtitle: 'A four-site recirculating deep water culture system',
    file: 'rdwc-4-pot-build.pdf',
    intro:
      'This RDWC build connects four grow buckets in a loop around a central control/reservoir bucket, driven by a larger water pump and air pump. It is the most productive of the three builds and still only needs one place to check and adjust your nutrient solution. Plan your space and power before you start.',
    difficulty: 'Intermediate',
    time: 'A weekend',
  },
]

const toolsList = [
  'Cordless drill',
  '2" or 3" hole saw (for net-pot lids, if not pre-cut)',
  '1-1/2" hole saw or step bit (for uniseal fittings)',
  'Tape measure and marker',
  'Utility knife',
  'Bucket of clean water (to leak-test)',
]

function assemblySteps(pots) {
  return [
    'Lay out your buckets: place the control/reservoir bucket where you can easily reach it, with the grow bucket(s) around it.',
    'Drill the linking holes: near the base of each bucket, cut a 1-1/2" hole for the 3/4" uniseal. Keep all holes at the same height so water levels equalize.',
    'Fit the uniseals and connect the buckets in a loop with 3/4" tubing or PVC, running through the control bucket. Push fittings in fully for a watertight seal.',
    'Install the mesh net-pot lids on the grow bucket(s).',
    `Place the air stones — one in each of the ${pots} grow bucket(s) and one in the control bucket — and run airline tubing back to the air pump.`,
    'Set the water pump in the control bucket to circulate solution through the loop (or plumb it to your return line).',
    'Leak-test with plain water: run the system for an hour and check every fitting before adding plants or nutrients.',
    'Add clay pebbles to the net pots, seat your seedlings, then fill with pH-balanced nutrient solution until it just touches the bottom of the net pots.',
    'Turn on the air pump (24/7) and the water pump, and you are growing.',
  ]
}

const maintenance = [
  'Check pH every 1–2 days and keep it at 5.5–6.5.',
  'Keep the reservoir cool — under 68°F (20°C) — to hold oxygen and prevent root rot.',
  'Top up with pH-balanced plain water as the level drops; do a full change every 1–2 weeks.',
  'Watch the roots: bright white = healthy; brown/slimy = raise oxygen and lower temperature.',
]

function render(build) {
  const doc = new PDFDocument({ size: 'LETTER', margin: 54, bufferPages: true })
  const outPath = path.join(OUT_DIR, build.file)
  doc.pipe(fs.createWriteStream(outPath))

  const left = doc.page.margins.left
  const width = doc.page.width - doc.page.margins.left - doc.page.margins.right

  // Header band
  doc.rect(0, 0, doc.page.width, 96).fill('#0a0e0a')
  doc.fillColor(GREEN).font('Helvetica-Bold').fontSize(9).text('ELEVATED MASSES', left, 30, { characterSpacing: 2 })
  doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(20).text(build.title, left, 44)
  doc.fillColor('#b9c7b4').font('Helvetica').fontSize(10).text(build.subtitle, left, 70)
  doc.y = 120

  function heading(text) {
    if (doc.y > doc.page.height - 120) doc.addPage()
    doc.moveDown(0.6)
    doc.fillColor(GREEN).font('Helvetica-Bold').fontSize(13).text(text, left, doc.y)
    doc.moveTo(left, doc.y + 2).lineTo(left + width, doc.y + 2).lineWidth(1).strokeColor('#dfe6da').stroke()
    doc.moveDown(0.5)
  }
  function para(text) {
    doc.fillColor(INK).font('Helvetica').fontSize(10.5).text(text, { width, lineGap: 2 })
  }
  function bullets(items) {
    items.forEach((it) => {
      if (doc.y > doc.page.height - 90) doc.addPage()
      const y = doc.y
      doc.circle(left + 3, y + 6, 2).fill(GREEN)
      doc.fillColor(INK).font('Helvetica').fontSize(10.5).text(it, left + 14, y, { width: width - 14, lineGap: 2 })
      doc.moveDown(0.2)
    })
  }
  function steps(items) {
    items.forEach((it, i) => {
      if (doc.y > doc.page.height - 90) doc.addPage()
      const y = doc.y
      doc.fillColor(GREEN).font('Helvetica-Bold').fontSize(10.5).text(`${i + 1}.`, left, y, { width: 16 })
      doc.fillColor(INK).font('Helvetica').fontSize(10.5).text(it, left + 18, y, { width: width - 18, lineGap: 2 })
      doc.moveDown(0.35)
    })
  }
  function partsTable(rows) {
    rows.forEach((r) => {
      if (doc.y > doc.page.height - 90) doc.addPage()
      const y = doc.y
      doc.fillColor(INK).font('Helvetica-Bold').fontSize(10).text(r[0], left, y, { width: width * 0.55 })
      doc.fillColor(MUTED).font('Helvetica').fontSize(10).text(r[1], left + width * 0.56, y, { width: width * 0.44 })
      doc.moveDown(0.3)
    })
  }

  doc.fillColor(MUTED).font('Helvetica-Oblique').fontSize(9.5)
    .text(`Difficulty: ${build.difficulty}    •    Build time: ${build.time}`, left, doc.y)
  doc.moveDown(0.5)
  para(build.intro)

  heading('Parts list')
  partsTable(partsFor(build.pots))

  heading('Tools')
  bullets(toolsList)

  heading('Assembly')
  steps(assemblySteps(build.pots))

  heading('First run & maintenance')
  bullets(maintenance)

  heading('Safety & legal')
  para('Keep all electrical connections (pumps, timers) off the floor and use a drip loop. Grow and consume only what is legal in your area, and keep your setup away from children and pets. This guide is provided for educational purposes by Elevated Masses LLC.')

  // Footer on every page (drawn on buffered pages so it never adds a page)
  const range = doc.bufferedPageRange()
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i)
    doc.fillColor(MUTED).font('Helvetica').fontSize(8).text(
      'Elevated Masses LLC  •  elevatedmasses.com',
      left,
      doc.page.height - 42,
      { width, align: 'center', lineBreak: false }
    )
  }
  doc.flushPages()

  doc.end()
  return new Promise((res) => doc.on('end', () => res(build.file)))
}

const results = await Promise.all(builds.map(render))
console.log('Generated:', results.join(', '))
