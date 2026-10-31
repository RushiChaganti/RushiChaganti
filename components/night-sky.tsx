// Quiet night behind the hero: fixed-formula stars (identical on server and client), a faint
// halftone moon and a vignette. Dark mode only, so the flashbang also switches the night off.

const STARS = Array.from({ length: 110 }, (_, i) => {
  // Golden-angle spread keeps stars evenly scattered without randomness
  const x = (i * 137.508) % 1600
  const y = ((i * 211.3) % 820) * (0.35 + ((i * 7) % 13) / 20)
  const r = i % 9 === 0 ? 1.6 : i % 3 === 0 ? 1.1 : 0.7
  return { x, y, r, twinkle: i % 6 === 0, delay: (i % 11) * 0.45 }
})

export function NightSky() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 hidden h-[110vh] dark:block">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMin slice" className="h-full w-full">
        <defs>
          <pattern id="moon-tone" width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="3.5" cy="3.5" r="1.6" fill="#0a0a0a" />
          </pattern>
          <radialGradient id="moon-shade" cx="0.7" cy="0.3" r="0.8">
            <stop offset="0.45" stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="white" stopOpacity="1" />
          </radialGradient>
          <mask id="moon-mask">
            <circle cx="1290" cy="190" r="86" fill="url(#moon-shade)" />
          </mask>
          <radialGradient id="moon-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#f1e6d2" stopOpacity="0.12" />
            <stop offset="1" stopColor="#f1e6d2" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="1290" cy="190" r="240" fill="url(#moon-glow)" />
        <g className="moon-rise">
          <circle cx="1290" cy="190" r="86" fill="#f1e6d2" opacity="0.16" />
          <circle cx="1290" cy="190" r="86" fill="url(#moon-tone)" mask="url(#moon-mask)" opacity="0.9" />
          <circle cx="1262" cy="168" r="12" fill="#f1e6d2" opacity="0.06" />
          <circle cx="1312" cy="220" r="8" fill="#f1e6d2" opacity="0.06" />
        </g>

        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#f1e6d2"
            opacity={s.r > 1.2 ? 0.7 : 0.4}
            className={s.twinkle ? "twinkle" : undefined}
            style={s.twinkle ? { animationDelay: `${s.delay}s` } : undefined}
          />
        ))}
      </svg>
      {/* Fade into the page. An overlay, not mask-image: a mask next to the header's backdrop blur renders with tile seams in Chrome */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-background" />
    </div>
  )
}
