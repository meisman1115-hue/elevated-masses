// Loads and merges the three boundary layers (world countries minus USA/CAN,
// US states, Canada provinces) into one polygon array for the globe, joining
// each feature with its cannabis home-cultivation legal status.
import {
  STATUS, usStateLaws, canadaProvinceLaws, countryLaws, DEFAULT_COUNTRY_STATUS,
} from './cannabisLaws.js'

async function loadGeoJSON(path) {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`)
  return res.json()
}

// Note: this used to also merge in a `lakes.min.geojson` layer (built by
// scripts/prepare-lakes-data.mjs) so major landlocked lakes/seas picked up
// their surrounding jurisdiction's color instead of showing plain "ocean".
// Reverted — the extra ~54 polygons it added pushed the globe's polygon
// count past whatever threshold triggers a recurring react-globe.gl
// rendering-corruption bug (whole globe turns solid-color and the hover
// tooltip gets stuck on one place). The data/script are still in the repo
// if this is ever worth revisiting with a fix or a different map library.
export async function loadMapPolygons() {
  const [world, us, ca] = await Promise.all([
    loadGeoJSON('/data/world-countries.min.geojson'),
    loadGeoJSON('/data/us-states.min.geojson'),
    loadGeoJSON('/data/canada-provinces.min.geojson'),
  ])

  const worldFeatures = world.features.map((f) => {
    const law = countryLaws[f.properties.iso3] ?? DEFAULT_COUNTRY_STATUS(f.properties.name)
    return { ...f, properties: { ...f.properties, kind: 'country', ...law } }
  })

  const usFeatures = us.features.map((f) => {
    const law = usStateLaws[f.properties.name] ?? DEFAULT_COUNTRY_STATUS(f.properties.name)
    return { ...f, properties: { ...f.properties, kind: 'us-state', ...law } }
  })

  const caFeatures = ca.features.map((f) => {
    const law = canadaProvinceLaws[f.properties.name] ?? DEFAULT_COUNTRY_STATUS(f.properties.name)
    return { ...f, properties: { ...f.properties, kind: 'ca-province', ...law } }
  })

  return [...worldFeatures, ...usFeatures, ...caFeatures]
}

export function colorForStatus(status) {
  // Neon green for legal, warm red for illegal — matches the site theme.
  return status === STATUS.LEGAL ? 'rgba(139, 255, 60, 0.75)' : 'rgba(239, 68, 68, 0.7)'
}

export function strokeForStatus(status) {
  return status === STATUS.LEGAL ? '#8BFF3C' : '#ef4444'
}
