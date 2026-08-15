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

// A ring whose points all share the same longitude or latitude has zero
// area — geometrically degenerate. Both Virginia and Maryland's source data
// carry one of these (a barrier-island sliver simplified down to a flat
// line), and feeding it into d3-geo's path/clip pipeline produces a
// full-canvas rectangle artifact instead of just silently doing nothing.
// Stripping these out before rendering sidesteps that entirely.
function ringIsDegenerate(ring) {
  let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity
  for (const [lon, lat] of ring) {
    if (lon < minLon) minLon = lon
    if (lon > maxLon) maxLon = lon
    if (lat < minLat) minLat = lat
    if (lat > maxLat) maxLat = lat
  }
  return minLon === maxLon || minLat === maxLat
}

function sanitizeGeometry(geometry) {
  if (geometry.type === 'Polygon') {
    return { ...geometry, coordinates: geometry.coordinates.filter((ring) => !ringIsDegenerate(ring)) }
  }
  if (geometry.type === 'MultiPolygon') {
    return {
      ...geometry,
      coordinates: geometry.coordinates
        .map((rings) => rings.filter((ring) => !ringIsDegenerate(ring)))
        .filter((rings) => rings.length > 0),
    }
  }
  return geometry
}

// Note: this used to also merge in a `lakes.min.geojson` layer (built by
// scripts/prepare-lakes-data.mjs) so major landlocked lakes/seas picked up
// their surrounding jurisdiction's color instead of showing plain "ocean".
// Reverted after it aggravated a rendering-corruption bug in the old 3D
// globe (react-globe.gl) — no longer relevant now that the map is a flat
// SVG projection, but re-adding it wasn't asked for, so the data/script
// just sit unused in the repo if it's ever worth revisiting.
export async function loadMapPolygons() {
  const [world, us, ca] = await Promise.all([
    loadGeoJSON('/data/world-countries.min.geojson'),
    loadGeoJSON('/data/us-states.min.geojson'),
    loadGeoJSON('/data/canada-provinces.min.geojson'),
  ])

  // Antarctica has no meaningful cannabis-law status and its geometry
  // approaches -90° latitude, which breaks a Mercator projection's fitSize
  // (Mercator's y-coordinate diverges toward the poles).
  const worldFeatures = world.features
    .filter((f) => f.properties.iso3 !== 'ATA')
    .map((f) => {
      const law = countryLaws[f.properties.iso3] ?? DEFAULT_COUNTRY_STATUS(f.properties.name)
      return { ...f, geometry: sanitizeGeometry(f.geometry), properties: { ...f.properties, kind: 'country', ...law } }
    })

  const usFeatures = us.features.map((f) => {
    const law = usStateLaws[f.properties.name] ?? DEFAULT_COUNTRY_STATUS(f.properties.name)
    return { ...f, geometry: sanitizeGeometry(f.geometry), properties: { ...f.properties, kind: 'us-state', ...law } }
  })

  const caFeatures = ca.features.map((f) => {
    const law = canadaProvinceLaws[f.properties.name] ?? DEFAULT_COUNTRY_STATUS(f.properties.name)
    return { ...f, geometry: sanitizeGeometry(f.geometry), properties: { ...f.properties, kind: 'ca-province', ...law } }
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
