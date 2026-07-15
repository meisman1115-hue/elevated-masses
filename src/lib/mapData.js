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

export async function loadMapPolygons() {
  const [world, us, ca, lakes] = await Promise.all([
    loadGeoJSON('/data/world-countries.min.geojson'),
    loadGeoJSON('/data/us-states.min.geojson'),
    loadGeoJSON('/data/canada-provinces.min.geojson'),
    loadGeoJSON('/data/lakes.min.geojson'),
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

  // Landlocked lakes/seas the country/state/province polygons treat as holes
  // (no land there) — colored by whichever jurisdiction each piece belongs
  // to, so they read as part of the surrounding legal-status color instead
  // of empty "ocean". Lakes that straddle a real border (Great Lakes, the
  // Caspian Sea, Reindeer Lake, ...) are pre-split into one piece per
  // jurisdiction — see scripts/prepare-lakes-data.mjs.
  const lakeFeatures = lakes.features.map((f) => {
    const { ownerKind, ownerKey, ownerName, name: lakeName } = f.properties
    const law =
      ownerKind === 'country'
        ? (countryLaws[ownerKey] ?? DEFAULT_COUNTRY_STATUS(ownerName))
        : ownerKind === 'us-state'
          ? (usStateLaws[ownerKey] ?? DEFAULT_COUNTRY_STATUS(ownerKey))
          : (canadaProvinceLaws[ownerKey] ?? DEFAULT_COUNTRY_STATUS(ownerKey))
    return { ...f, properties: { name: ownerName, lakeName, kind: 'lake', ...law } }
  })

  return [...worldFeatures, ...usFeatures, ...caFeatures, ...lakeFeatures]
}

export function colorForStatus(status) {
  // Neon green for legal, warm red for illegal — matches the site theme.
  return status === STATUS.LEGAL ? 'rgba(139, 255, 60, 0.75)' : 'rgba(239, 68, 68, 0.7)'
}

export function strokeForStatus(status) {
  return status === STATUS.LEGAL ? '#8BFF3C' : '#ef4444'
}
