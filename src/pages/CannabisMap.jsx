import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import * as THREE from 'three'
import Globe from 'react-globe.gl'
import { loadMapPolygons } from '../lib/mapData.js'
import { STATUS, LAST_UPDATED } from '../lib/cannabisLaws.js'
import LawPopup from '../components/LawPopup.jsx'
import { PageHeader } from '../components/ui.jsx'
import { Loader2, Info, Play, Pause, RotateCcw } from 'lucide-react'

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function capColor(feature, isHovered) {
  const legal = feature.properties.status === STATUS.LEGAL
  const [r, g, b] = legal ? [139, 255, 60] : [239, 68, 68]
  return `rgba(${r},${g},${b},${isHovered ? 0.92 : 0.55})`
}
function strokeColor(feature) {
  return feature.properties.status === STATUS.LEGAL ? '#8BFF3C' : '#ef4444'
}

export default function CannabisMap() {
  const globeRef = useRef()
  const containerRef = useRef()
  const resumeTimer = useRef(null)

  const [polygons, setPolygons] = useState([])
  const [loadState, setLoadState] = useState('loading') // loading | ready | error
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [autoRotate, setAutoRotate] = useState(!prefersReducedMotion)
  const [size, setSize] = useState({ width: 320, height: 420 })

  // Elevated Masses ultraviolet purple for the globe's "water" surface —
  // land is fully covered by the country/state/province polygon overlays.
  const globeMaterial = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: new THREE.Color('#5b1fa8'),
        emissive: new THREE.Color('#3a0f75'),
        emissiveIntensity: 0.35,
        shininess: 12,
      }),
    [],
  )

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
    function updateSize() {
      if (!containerRef.current) return
      const w = containerRef.current.clientWidth
      setSize({ width: w, height: Math.max(420, Math.min(w * 0.72, window.innerHeight * 0.72)) })
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Keep the OrbitControls' autoRotate flag in sync with our toggle state.
  useEffect(() => {
    const controls = globeRef.current?.controls()
    if (controls) controls.autoRotate = autoRotate
  }, [autoRotate, loadState])

  function handleGlobeReady() {
    const controls = globeRef.current?.controls()
    if (controls) {
      controls.autoRotate = autoRotate
      controls.autoRotateSpeed = 0.45
      controls.enableDamping = true
    }
    globeRef.current?.pointOfView({ lat: 25, lng: -40, altitude: 2.3 }, 0)
  }

  // Pause auto-rotate while the user is actively dragging/zooming, then
  // resume after a few seconds of inactivity — keeps it feeling alive
  // without fighting the user's own rotation.
  const handleInteractionStart = useCallback(() => {
    if (prefersReducedMotion || !autoRotate) return
    const controls = globeRef.current?.controls()
    if (!controls) return
    controls.autoRotate = false
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => {
      if (controls) controls.autoRotate = true
    }, 5000)
  }, [autoRotate])

  return (
    <>
      <PageHeader
        eyebrow="Legal Map"
        title="Where can you legally grow?"
        description="Drag to rotate the globe, scroll to zoom. Neon green regions allow home cannabis cultivation; red regions don't. Click any region for details."
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

        {/* Legend + controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-5 text-sm text-muted">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-green shadow-glow-green" /> Legal to grow at home
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500" /> Not legal
            </span>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setAutoRotate((v) => !v)} className="btn-ghost !py-2 !px-4 text-xs">
              {autoRotate ? <Pause size={14} /> : <Play size={14} />}
              {autoRotate ? 'Pause rotation' : 'Resume rotation'}
            </button>
            <button
              type="button"
              onClick={() => globeRef.current?.pointOfView({ lat: 25, lng: -40, altitude: 2.3 }, 800)}
              className="btn-ghost !py-2 !px-4 text-xs"
            >
              <RotateCcw size={14} /> Reset view
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative mt-6 overflow-hidden rounded-3xl border border-white/10 bg-surface/30"
          onPointerDown={handleInteractionStart}
          onWheel={handleInteractionStart}
        >
          {loadState === 'loading' && (
            <div className="flex h-[420px] items-center justify-center gap-2 text-muted">
              <Loader2 className="animate-spin" size={20} /> Loading map data…
            </div>
          )}
          {loadState === 'error' && (
            <div className="flex h-[420px] items-center justify-center text-muted">
              Couldn't load map data — refresh to try again.
            </div>
          )}
          {loadState === 'ready' && (
            <Globe
              ref={globeRef}
              width={size.width}
              height={size.height}
              backgroundColor="rgba(0,0,0,0)"
              globeMaterial={globeMaterial}
              showAtmosphere
              atmosphereColor="#8BFF3C"
              atmosphereAltitude={0.18}
              showGraticules
              polygonsData={polygons}
              polygonGeoJsonGeometry="geometry"
              polygonCapColor={(d) => capColor(d, d === hovered)}
              polygonSideColor={() => 'rgba(15,17,20,0.35)'}
              polygonStrokeColor={strokeColor}
              polygonAltitude={(d) => (d === hovered ? 0.05 : 0.01)}
              polygonLabel={(d) =>
                `<div style="font-family:Inter,sans-serif;padding:5px 10px;background:#10131A;border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#EAF3E4;font-size:12px;">${d.properties.name}</div>`
              }
              onPolygonHover={setHovered}
              onPolygonClick={setSelected}
              onGlobeReady={handleGlobeReady}
            />
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
