// One-time data prep: builds a lakes layer for the legality globe so major
// landlocked lakes/seas aren't rendered as gaps in the "ocean" material.
//
// Natural Earth's country/state/province polygons treat large lakes as holes
// (there's no land there), which is why they show through as plain globe
// "water" instead of picking up a legal-status color. This script:
//   1. Pulls the named lakes worth covering (Natural Earth 110m lakes, plus
//      the Caspian Sea and the two halves of the Aral Sea, which Natural
//      Earth classifies outside the "lakes" layer).
//   2. For each lake, samples a grid of points across its surface and finds
//      the nearest bordering country/state/province for each point (nearest
//      polygon boundary, not nearest centroid — matters for oddly-shaped
//      states like Michigan).
//   3. Groups the sampled grid cells by owner and unions each group into one
//      polygon per owner. A lake fully inside one entity collapses back to a
//      single piece (its whole shape); a lake that straddles a real border
//      (the Great Lakes, Reindeer Lake, etc.) comes out as 2+ pieces whose
//      shared edge approximates the real border, so the map can render each
//      piece in its owner's legal-status color with the border between them.
//
// Output pieces carry {name, ownerKind, ownerKey, ownerName} — mapData.js
// looks up legal status the same way it does for the real country/state/
// province polygons, keyed by ownerKind + ownerKey.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as turf from '@turf/turf'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, '..', 'public', 'data')

function read(file) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'))
}
function write(file, data) {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data))
}

// --- Gather the lake features worth covering ---
const lakes110 = read('lakes-raw.geojson')
const lakes10 = read('lakes-10m-raw.geojson')
const marine10 = read('marine-10m-raw.geojson')

const aral = lakes10.features.filter((f) => /aral sea/i.test(f.properties.name ?? ''))
const caspian = marine10.features.filter((f) => f.properties.name === 'Caspian Sea')

const lakeFeatures = [...lakes110.features, ...aral, ...caspian].map((f) => ({
  type: 'Feature',
  geometry: f.geometry,
  properties: { name: f.properties.name },
}))
console.log(`Covering ${lakeFeatures.length} lakes:`, lakeFeatures.map((f) => f.properties.name).join(', '))

// --- Load the political polygons these lakes can be "owned" by ---
const world = read('world-countries.min.geojson')
const us = read('us-states.min.geojson')
const ca = read('canada-provinces.min.geojson')

const owners = [
  ...world.features.map((f) => ({ ownerKind: 'country', ownerKey: f.properties.iso3, ownerName: f.properties.name, feature: f })),
  ...us.features.map((f) => ({ ownerKind: 'us-state', ownerKey: f.properties.name, ownerName: f.properties.name, feature: f })),
  ...ca.features.map((f) => ({ ownerKind: 'ca-province', ownerKey: f.properties.name, ownerName: f.properties.name, feature: f })),
].map((o) => ({ ...o, bbox: turf.bbox(o.feature), line: turf.polygonToLine(o.feature) }))

function bboxOverlaps(a, b, pad = 2) {
  return a[0] - pad <= b[2] && b[0] - pad <= a[2] && a[1] - pad <= b[3] && b[1] - pad <= a[3]
}

function nearestOwner(point, candidates) {
  let best = null
  let bestDist = Infinity
  for (const c of candidates) {
    if (turf.booleanPointInPolygon(point, c.feature)) return c
    const { properties } = turf.nearestPointOnLine(c.line, point)
    if (properties.dist < bestDist) {
      bestDist = properties.dist
      best = c
    }
  }
  return best
}

const GRID_STEP = 0.25 // degrees
const outputFeatures = []

for (const lake of lakeFeatures) {
  const bbox = turf.bbox(lake)
  const candidates = owners.filter((o) => bboxOverlaps(bbox, o.bbox))
  if (candidates.length === 0) {
    console.log(`  ! ${lake.properties.name}: no nearby owners found, skipping`)
    continue
  }

  // Sample a grid of cells covering the lake; keep the ones that actually
  // fall inside its shape.
  const cellsByOwner = new Map()
  let sampleCount = 0
  for (let lng = bbox[0]; lng <= bbox[2]; lng += GRID_STEP) {
    for (let lat = bbox[1]; lat <= bbox[3]; lat += GRID_STEP) {
      const center = turf.point([lng + GRID_STEP / 2, lat + GRID_STEP / 2])
      if (!turf.booleanPointInPolygon(center, lake)) continue
      sampleCount++
      const cellPoly = turf.bboxPolygon([lng, lat, lng + GRID_STEP, lat + GRID_STEP])
      let clipped
      try {
        clipped = turf.intersect(turf.featureCollection([cellPoly, lake]))
      } catch {
        continue
      }
      if (!clipped) continue

      const owner = nearestOwner(center, candidates)
      if (!owner) continue
      const key = `${owner.ownerKind}:${owner.ownerKey}`
      if (!cellsByOwner.has(key)) cellsByOwner.set(key, { owner, cells: [] })
      cellsByOwner.get(key).cells.push(clipped)
    }
  }

  // Very small/thin lakes can miss every grid center — fall back to a single
  // sample at the shape's center of mass.
  if (sampleCount === 0) {
    const center = turf.centerOfMass(lake)
    const owner = nearestOwner(center, candidates)
    if (owner) cellsByOwner.set(`${owner.ownerKind}:${owner.ownerKey}`, { owner, cells: [lake] })
  }

  const owners_ = [...cellsByOwner.values()]
  for (const { owner, cells } of owners_) {
    const merged = cells.length === 1 ? cells[0] : turf.union(turf.featureCollection(cells))
    if (!merged) continue
    outputFeatures.push({
      type: 'Feature',
      geometry: merged.geometry,
      properties: {
        name: lake.properties.name,
        ownerKind: owner.ownerKind,
        ownerKey: owner.ownerKey,
        ownerName: owner.ownerName,
      },
    })
  }
  console.log(`  ${lake.properties.name}: ${owners_.length} owner(s) -> ${owners_.map((o) => o.owner.ownerName).join(', ')}`)
}

write('lakes.min.geojson', { type: 'FeatureCollection', features: outputFeatures })
console.log(`\nWrote ${outputFeatures.length} lake pieces to lakes.min.geojson`)

// Clean up raw source files — only lakes.min.geojson ships to the site.
for (const f of ['lakes-raw.geojson', 'lakes-10m-raw.geojson', 'marine-10m-raw.geojson']) {
  fs.unlinkSync(path.join(DATA_DIR, f))
}
console.log('Removed raw source files.')
