// One-time data prep: trims the raw downloaded GeoJSON boundary files down to
// only the fields the map needs, and removes the USA/Canada country-level
// polygons from the world file since those two are represented at the
// state/province level instead (law varies sharply within them).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, '..', 'public', 'data')

function read(file) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'))
}
function write(file, data) {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data))
}

// --- World countries (Natural Earth 110m) ---
const world = read('world-countries.geojson')
const worldTrimmed = {
  type: 'FeatureCollection',
  features: world.features
    .filter((f) => !['USA', 'CAN'].includes(f.properties.ADM0_A3))
    .map((f) => ({
      type: 'Feature',
      geometry: f.geometry,
      properties: { name: f.properties.ADMIN, iso3: f.properties.ADM0_A3 },
    })),
}
write('world-countries.min.geojson', worldTrimmed)
console.log(`world: ${world.features.length} -> ${worldTrimmed.features.length} features (USA/CAN removed)`)

// --- US states ---
const us = read('us-states.geojson')
const usTrimmed = {
  type: 'FeatureCollection',
  features: us.features.map((f) => ({
    type: 'Feature',
    geometry: f.geometry,
    properties: { name: f.properties.name },
  })),
}
write('us-states.min.geojson', usTrimmed)
console.log(`us-states: ${us.features.length} features`)

// --- Canada provinces ---
const ca = read('canada-provinces.geojson')
const caTrimmed = {
  type: 'FeatureCollection',
  features: ca.features.map((f) => ({
    type: 'Feature',
    geometry: f.geometry,
    properties: { name: f.properties.name },
  })),
}
write('canada-provinces.min.geojson', caTrimmed)
console.log(`canada-provinces: ${ca.features.length} features`)

// Clean up the large raw source files — only the .min ones ship to the site.
for (const f of ['world-countries.geojson', 'us-states.geojson', 'canada-provinces.geojson']) {
  fs.unlinkSync(path.join(DATA_DIR, f))
}
console.log('Removed raw source files, kept .min.geojson only.')
