// On-brand vector illustrations (neon-green x ultraviolet). Crisp at any size,
// theme-matched, and lightweight. Used in place of gray placeholder boxes on
// high-impact spots. Real photos/videos can still replace these later.

// A stylized indoor hydroponic grow scene: LED bar, glowing plant, net pot,
// reservoir with roots and bubbles. Used as the homepage hero visual.
export function GrowRoomScene({ className = '' }) {
  return (
    <svg
      viewBox="0 0 640 480"
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label="Illustration of an indoor hydroponic grow setup with an LED light, a glowing plant, and a reservoir of roots"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gr-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#12161C" />
          <stop offset="1" stopColor="#0A0D12" />
        </linearGradient>
        <radialGradient id="gr-lightglow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#8BFF3C" stopOpacity="0.55" />
          <stop offset="1" stopColor="#8BFF3C" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gr-purpleglow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#A855F7" stopOpacity="0.5" />
          <stop offset="1" stopColor="#A855F7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gr-leaf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A3E635" />
          <stop offset="1" stopColor="#4F9E24" />
        </linearGradient>
        <linearGradient id="gr-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1C3A2A" />
          <stop offset="1" stopColor="#0E211A" />
        </linearGradient>
        <linearGradient id="gr-led" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5FBF2A" />
          <stop offset="0.5" stopColor="#8BFF3C" />
          <stop offset="1" stopColor="#5FBF2A" />
        </linearGradient>
      </defs>

      {/* Panel */}
      <rect x="0" y="0" width="640" height="480" rx="24" fill="url(#gr-panel)" />
      <rect x="0.5" y="0.5" width="639" height="479" rx="23.5" fill="none" stroke="#ffffff" strokeOpacity="0.08" />

      {/* Ambient glows */}
      <ellipse cx="520" cy="60" rx="220" ry="180" fill="url(#gr-purpleglow)" />
      <ellipse cx="320" cy="150" rx="260" ry="200" fill="url(#gr-lightglow)" className="animate-pulse-glow" />

      {/* LED grow bar */}
      <g>
        <rect x="150" y="52" width="340" height="26" rx="13" fill="url(#gr-led)" />
        <rect x="150" y="52" width="340" height="26" rx="13" fill="none" stroke="#EAF3E4" strokeOpacity="0.25" />
        {Array.from({ length: 11 }).map((_, i) => (
          <circle key={i} cx={172 + i * 30} cy="65" r="3.4" fill="#EAF3E4" fillOpacity="0.9" />
        ))}
        {/* hanging wires */}
        <line x1="230" y1="24" x2="230" y2="52" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="2" />
        <line x1="410" y1="24" x2="410" y2="52" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="2" />
      </g>

      {/* Plant */}
      <g>
        {/* stem */}
        <path d="M320 300 L320 190" stroke="#4F9E24" strokeWidth="6" strokeLinecap="round" />
        {/* leaves */}
        <g fill="url(#gr-leaf)" stroke="#2E6416" strokeOpacity="0.4">
          <path d="M320 250 C 270 250 232 226 214 196 C 262 186 306 206 320 246 Z" />
          <path d="M320 250 C 370 250 408 226 426 196 C 378 186 334 206 320 246 Z" />
          <path d="M320 220 C 280 214 250 190 240 160 C 284 156 314 180 320 216 Z" />
          <path d="M320 220 C 360 214 390 190 400 160 C 356 156 326 180 320 216 Z" />
          <path d="M320 196 C 300 182 292 156 296 128 C 322 142 330 170 320 194 Z" />
          <path d="M320 196 C 340 182 348 156 344 128 C 318 142 310 170 320 194 Z" />
        </g>
      </g>

      {/* Net pot */}
      <g>
        <path d="M292 300 L348 300 L340 336 L300 336 Z" fill="#1B2027" stroke="#ffffff" strokeOpacity="0.12" />
        <line x1="300" y1="312" x2="340" y2="312" stroke="#ffffff" strokeOpacity="0.14" />
        <line x1="302" y1="324" x2="338" y2="324" stroke="#ffffff" strokeOpacity="0.14" />
      </g>

      {/* Reservoir */}
      <g>
        <rect x="180" y="336" width="280" height="104" rx="16" fill="url(#gr-water)" stroke="#ffffff" strokeOpacity="0.1" />
        <rect x="180" y="336" width="280" height="12" rx="6" fill="#8BFF3C" fillOpacity="0.18" />
        {/* roots */}
        <g stroke="#DDEFD0" strokeOpacity="0.5" strokeWidth="1.6" fill="none">
          <path d="M312 336 C 306 360 316 380 308 410" />
          <path d="M320 336 C 322 366 314 388 322 420" />
          <path d="M328 336 C 334 358 326 384 332 408" />
          <path d="M320 360 C 300 372 296 392 302 410" />
          <path d="M320 360 C 340 372 344 392 338 410" />
        </g>
        {/* bubbles */}
        <g fill="#8BFF3C" fillOpacity="0.6">
          <circle cx="250" cy="418" r="3" />
          <circle cx="262" cy="400" r="2.2" />
          <circle cx="395" cy="414" r="3.2" />
          <circle cx="405" cy="396" r="2" />
          <circle cx="330" cy="424" r="2.4" />
        </g>
      </g>
    </svg>
  )
}

// A softer leaf/sprout motif for secondary spots (About, teasers).
export function LeafMotif({ className = '' }) {
  return (
    <svg
      viewBox="0 0 480 360"
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label="Illustration of a sprouting plant with glowing leaves"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lm-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#12161C" />
          <stop offset="1" stopColor="#0A0D12" />
        </linearGradient>
        <radialGradient id="lm-glow" cx="0.5" cy="0.4" r="0.5">
          <stop offset="0" stopColor="#A855F7" stopOpacity="0.4" />
          <stop offset="1" stopColor="#A855F7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lm-leaf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A3E635" />
          <stop offset="1" stopColor="#4F9E24" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="480" height="360" rx="20" fill="url(#lm-panel)" />
      <rect x="0.5" y="0.5" width="479" height="359" rx="19.5" fill="none" stroke="#ffffff" strokeOpacity="0.08" />
      <ellipse cx="240" cy="150" rx="200" ry="150" fill="url(#lm-glow)" />
      {/* pot */}
      <path d="M196 262 L284 262 L272 316 L208 316 Z" fill="#1B2027" stroke="#ffffff" strokeOpacity="0.12" />
      {/* soil line */}
      <ellipse cx="240" cy="262" rx="44" ry="8" fill="#2A3140" />
      {/* stem + leaves */}
      <path d="M240 262 L240 176" stroke="#4F9E24" strokeWidth="6" strokeLinecap="round" />
      <g fill="url(#lm-leaf)" stroke="#2E6416" strokeOpacity="0.4">
        <path d="M240 226 C 196 226 164 204 150 176 C 192 168 230 186 240 222 Z" />
        <path d="M240 226 C 284 226 316 204 330 176 C 288 168 250 186 240 222 Z" />
        <path d="M240 196 C 216 180 208 150 214 120 C 244 138 252 168 240 194 Z" />
        <path d="M240 196 C 264 180 272 150 266 120 C 236 138 228 168 240 194 Z" />
      </g>
      {/* sparkles */}
      <g fill="#8BFF3C">
        <circle cx="150" cy="120" r="2.5" />
        <circle cx="330" cy="140" r="2" />
        <circle cx="300" cy="90" r="1.8" />
        <circle cx="180" cy="80" r="1.8" />
      </g>
    </svg>
  )
}
