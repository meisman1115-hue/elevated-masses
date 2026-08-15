import { useEffect, useRef, useState, useMemo } from 'react'
import { geoMercator, geoPath } from 'd3-geo'
import { loadMapPolygons } from '../lib/mapData.js'
import { STATUS, LAST_UPDATED } from '../lib/cannabisLaws.js'
import LawPopup from '../components/LawPopup.jsx'
import { PageHeader } from '../components/ui.jsx'
import { Loader2, Info } from 'lucide-react'

function fillColor(feature, isHovered) {
  const legal = feature.properties.status === STATUS.LEGAL
  const [r, g, b] = legal ? [139, 255, 60] : [239, 68, 68]
  return `rgba(${r},${g},${b},${isHovered ? 0.85 : 0.55})`
}
function strokeColor(feature) {
  return feature.properties.status === STATUS.LEGAL ? '#8BFF3C' : '#ef4444'
}

// A flat Mercator SVG map — simpler and far more robust than the interactive
// 3D globe (react-globe.gl) this replaced, which had a recurring
// rendering-corruption bug on hover that several rounds of fixes couldn't
// fully resolve. No pan/zoom/rotation here on purpose — click a region for
// details, that's the whole interaction.
export default function CannabisMap() {
  const containerRef = useRef()
  const [polygons, setPolygons] = useState([])
  const [loadState, setLoadState] = useState('loading') // loading | ready | error
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [width, setWidth] = useState(320)

  useEffect(() => {
    let active = true
    loadMapPolygons()
      .then((polys) => {
        if (active) {
          setPolygons(polys)
          setLoadState('ready')
        }
      })
      .catch(() => active && setLoadState('error'))
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) setWidth(containerRef.current.clientWidth)
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const height = Math.round(width * 0.52)

  const pathGenerator = useMemo(() => {
    if (!polygons.length || !width) return null
    const featureCollection = { type: 'FeatureCollection', features: polygons }
    const projection = geoMercator().fitSize([width, height], featureCollection)
    return geoPath(projection)
  }, [polygons, width, height])

  return (
    <>
      <PageHeader
        eyebrow="Legal Map"
        title="Where can you legally grow?"
        description="Neon green regions allow home cannabis cultivation; red regions don't. Click any region for details."
      />

      <div className="container-em py-12">
        <div className="flex items-start gap-3 rounded-xl border border-purple/30 bg-purple/5 px-4 py-3 text-sm text-purple-soft">
          <Info size={18} className="mt-0.5 shrink-0" />
          <p>
            <span className="font-600 text-fg">Not legal advice.</span> Cannabis law changes often, and
            local city/county rules can be stricter than what's shown here. Always verify current law
            before cultivating or carrying cannabis anywhere.{' '}
            <span className="text-muted">Data last reviewed {LAST_UPDATED}.</span>
          </p>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-5 text-sm text-muted">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green shadow-glow-green" /> Legal to grow at home
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500" /> Not legal
          </span>
        </div>

        <div
          ref={containerRef}
          className="relative mt-6 overflow-hidden rounded-3xl border border-white/10 bg-[#12081f]"
        >
          {loadState === 'loading' && (
            <div className="flex h-[320px] items-center justify-center gap-2 text-muted">
              <Loader2 className="animate-spin" size={20} /> Loading map data…
            </div>
          )}
          {loadState === 'error' && (
            <div className="flex h-[320px] items-center justify-center text-muted">
              Couldn't load map data — refresh to try again.
            </div>
          )}
          {loadState === 'ready' && pathGenerator && (
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="World map of cannabis home-cultivation legality">
              {polygons.map((feature, i) => (
                <path
                  key={`${feature.properties.kind}-${feature.properties.name}-${i}`}
                  d={pathGenerator(feature)}
                  fill={fillColor(feature, feature === hovered)}
                  stroke={strokeColor(feature)}
                  strokeWidth={feature === hovered ? 1.3 : 0.6}
                  className="cursor-pointer transition-colors"
                  onMouseEnter={() => setHovered(feature)}
                  onMouseLeave={() => setHovered((h) => (h === feature ? null : h))}
                  onClick={() => setSelected(feature)}
                >
                  <title>{feature.properties.name}</title>
                </path>
              ))}
            </svg>
          )}
        </div>

        <p className="mt-4 text-xs text-muted/70">
          Covers all 50 US states + DC, all Canadian provinces/territories, and a curated set of other
          countries with well-documented status. Everywhere else defaults to "not legal" pending review —
          see a country's popup for details.
        </p>
      </div>

      <LawPopup feature={selected} onClose={() => setSelected(null)} />
    </>
  )
}
