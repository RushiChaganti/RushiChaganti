"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

// Motion tokens (design-to-motion): in-out curve for fills and swaps
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

type Key = [number, number]

// Eased keyframe track: [[time, value], ...]
function track(keys: Key[], t: number) {
  if (t <= keys[0][0]) return keys[0][1]
  for (let i = 1; i < keys.length; i++) {
    const [t1, v1] = keys[i]
    const [t0, v0] = keys[i - 1]
    if (t <= t1) return v0 + (v1 - v0) * easeInOut(Math.min(1, (t - t0) / (t1 - t0 || 1)))
  }
  return keys[keys.length - 1][1]
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(query.matches)
    const onChange = () => setReduced(query.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])
  return reduced
}

// Seconds since the story started; only advances while `running`, so off-screen cards pause
function useStoryClock(running: boolean) {
  const [t, setT] = useState(0)
  const elapsed = useRef(0)

  useEffect(() => {
    if (!running) return
    let frame = 0
    let last = performance.now()
    const loop = (now: number) => {
      elapsed.current += (now - last) / 1000
      last = now
      setT(elapsed.current)
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [running])

  return t
}

// Grid card visual size; the docked rail renders the same visual scaled down
const VISUAL_W = 312
const VISUAL_H = 192
const RAIL_SCALE = 0.8

// Card shell: rises in once at ~30% visibility, reports whether the story should run
function FeatureCard({
  title,
  blurb,
  tech,
  href,
  delay = 0,
  compact = false,
  shown,
  visual,
}: {
  title: string
  blurb: string
  tech: string
  href?: string
  // Seconds to hold the design before this card's story starts, so neighbours don't move in unison
  delay?: number
  compact?: boolean
  // Set by a parent that already knows whether the card is on screen (the docked rail)
  shown?: boolean
  visual: (t: number, animate: boolean) => ReactNode
}) {
  const ref = useRef<HTMLElement>(null)
  const [enteredSelf, setEntered] = useState(false)
  const [visibleSelf, setVisible] = useState(false)
  const entered = enteredSelf || shown === true
  const visible = shown ?? visibleSelf
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || shown !== undefined) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting) setEntered(true)
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [shown])

  // Stories start after the card has landed
  const [landed, setLanded] = useState(false)
  useEffect(() => {
    if (!entered) return
    const id = setTimeout(() => setLanded(true), 1100)
    return () => clearTimeout(id)
  }, [entered])

  // `?story-t=3.2` freezes every story at that second, for screenshot checks
  const [forcedT, setForcedT] = useState<number | null>(null)
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("story-t")
    if (value !== null) setForcedT(Number(value))
  }, [])

  const animate = forcedT !== null || (!reduced && landed)
  const clock = useStoryClock(animate && visible && forcedT === null)
  const t = forcedT ?? clock

  return (
    <article ref={ref} className={`feature-card ${entered || reduced ? "is-in" : ""} rounded-2xl border border-border bg-card p-2`}>
      <div
        className="feature-visual relative overflow-hidden rounded-lg bg-background"
        style={{ width: compact ? VISUAL_W * RAIL_SCALE : undefined, height: compact ? VISUAL_H * RAIL_SCALE : VISUAL_H }}
      >
        <div
          className="h-full"
          style={compact ? { width: VISUAL_W, height: VISUAL_H, transform: `scale(${RAIL_SCALE})`, transformOrigin: "top left" } : undefined}
        >
          {visual(Math.max(0, t - delay), animate)}
        </div>
      </div>
      <div className={`feature-text space-y-1 px-2 ${compact ? "pb-1 pt-2 text-sm" : "pb-2 pt-4"}`}>
        <h3 className="font-medium text-foreground">
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        {!compact && (
          <>
            <p className="text-sm text-muted-foreground">{blurb}</p>
            <p className="font-mono text-xs text-muted-foreground/70">{tech}</p>
          </>
        )}
      </div>
    </article>
  )
}

/* ---------- Price comparator: bars refill, cheapest lights up, currency flips ---------- */

const PRICES = [
  { name: "Provider A", usd: 0.62 },
  { name: "Provider B", usd: 0.41 },
  { name: "Provider C", usd: 0.88 },
  { name: "Provider D", usd: 0.57 },
]
const USD_TO_INR = 84.3
const MAX = Math.max(...PRICES.map((p) => p.usd))
const CHEAPEST = PRICES.reduce((a, b) => (b.usd < a.usd ? b : a)).name
const PRICE_PERIOD = 8

function PriceVisual(time: number, animate: boolean) {
  // At rest (and with reduced motion) this equals the design: full bars, USD, cheapest marked
  const t = animate ? time % PRICE_PERIOD : 0
  const inr = track([[0, 0], [4.6, 0], [5.2, 1], [6.6, 1], [7.2, 0]], t)
  const glow = track([[0, 1], [0.8, 1], [1.1, 0], [3.3, 0], [3.7, 1]], t)

  return (
    <div className="flex h-full flex-col justify-center gap-2.5 px-4">
      <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span>1 video · 5s · 720p</span>
        <span className="relative inline-flex w-10 justify-end overflow-hidden">
          <span style={{ transform: `translateY(${-inr * 100}%)`, opacity: 1 - inr }}>USD</span>
          <span className="absolute right-0" style={{ transform: `translateY(${(1 - inr) * 100}%)`, opacity: inr }}>
            INR
          </span>
        </span>
      </div>
      {PRICES.map((p, i) => {
        // Bars empty quickly together, then refill one by one
        const fill = track([[0, 1], [0.9, 1], [1.3, 0], [1.6 + i * 0.3, 0], [2.5 + i * 0.3, 1]], t)
        const price = p.usd * fill * (1 + inr * (USD_TO_INR - 1))
        const isCheapest = p.name === CHEAPEST
        const highlight = isCheapest ? glow : 0
        return (
          <div key={p.name} className="grid grid-cols-[5.5rem_1fr_3.5rem] items-center gap-2 text-xs">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span
                className="h-1.5 w-1.5 rounded-full bg-primary"
                style={{ opacity: highlight, transform: `scale(${0.6 + highlight * 0.4})` }}
              />
              {p.name}
            </span>
            <span className="h-2.5 overflow-hidden rounded-full bg-muted">
              <span
                className="block h-full rounded-full"
                style={{
                  width: `${(p.usd / MAX) * 100}%`,
                  clipPath: `inset(0 ${(1 - fill) * 100}% 0 0 round 9999px)`,
                  background: highlight > 0.01 ? `hsl(var(--primary) / ${0.35 + highlight * 0.65})` : "hsl(var(--foreground) / 0.35)",
                }}
              />
            </span>
            <span className="text-right font-mono tabular-nums text-foreground">
              {inr > 0.5 ? "₹" : "$"}
              {price.toFixed(inr > 0.5 ? 0 : 2)}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- KetsuCheck: a weak password gets flagged, a passphrase passes ---------- */

const WEAK = "hunter2"
const STRONG = "violet-anvil-tide-42"
const KETSU_PERIOD = 9

// Typing helper: how many characters of `text` are visible at time t
function typedAt(t: number, start: number, text: string, step = 0.08) {
  return t < start ? 0 : Math.min(text.length, Math.floor((t - start) / step) + 1)
}

function KetsuVisual(time: number, animate: boolean) {
  // Design: the strong passphrase, meter full, verdict "strong"
  const t = animate ? time % KETSU_PERIOD : 0
  let text = STRONG
  let score = 0.94
  if (t >= 0.8 && t < 1.4) {
    text = STRONG.slice(0, Math.max(0, STRONG.length - Math.floor((t - 0.8) / 0.03))) // delete fast
    score = 0
  } else if (t >= 1.4 && t < 4.2) {
    text = WEAK.slice(0, typedAt(t, 1.6, WEAK))
    score = track([[2.3, 0], [2.9, 0.18]], t)
  } else if (t >= 4.2 && t < 4.6) {
    text = WEAK.slice(0, Math.max(0, WEAK.length - Math.floor((t - 4.2) / 0.05)))
    score = track([[4.2, 0.18], [4.5, 0]], t)
  } else if (t >= 4.6 && t < 8.2) {
    text = STRONG.slice(0, typedAt(t, 4.8, STRONG, 0.07))
    score = track([[4.8, 0], [6.2, 0.6], [6.8, 0.94]], t)
  }
  const weak = score < 0.5
  const verdict = text.length === 0 ? "…" : weak ? "weak" : "strong"
  const caretOn = Math.floor(t * 2) % 2 === 0

  return (
    <div className="flex h-full flex-col justify-center gap-3 px-4 font-mono text-xs">
      <div className="flex items-center rounded-md border border-border bg-muted/40 px-2.5 py-2 text-sm text-foreground">
        <span className="truncate">{text}</span>
        <span className="ml-px h-4 w-px bg-foreground" style={{ opacity: caretOn ? 1 : 0 }} />
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <span
          className="block h-full rounded-full transition-colors duration-300"
          style={{
            width: "100%",
            clipPath: `inset(0 ${(1 - score) * 100}% 0 0 round 9999px)`,
            background: weak ? "hsl(var(--destructive))" : "hsl(var(--foreground) / 0.8)",
          }}
        />
      </div>
      <div className="flex justify-between text-muted-foreground">
        <span>classifier</span>
        <span className={weak && text ? "text-destructive" : "text-foreground"}>
          {verdict} · {(score * 100).toFixed(0)}%
        </span>
      </div>
      <p className="text-muted-foreground/70">trained on leaked password patterns</p>
    </div>
  )
}

/* ---------- Omarchy PR: type a filter, Ctrl+Backspace clears it ---------- */

const APPS = ["alacritty", "chromium", "firefox", "obsidian"]
const QUERY = "firefox"
const OMARCHY_PERIOD = 7

function OmarchyVisual(time: number, animate: boolean) {
  // Design: empty filter, every app listed
  const t = animate ? time % OMARCHY_PERIOD : 0
  const typed = t < 0.8 ? 0 : t < 4.4 ? Math.min(QUERY.length, Math.floor((t - 0.8) / 0.12) + 1) : 0
  const query = QUERY.slice(0, typed)
  const keys = track([[0, 0], [3.6, 0], [3.9, 1], [5.0, 1], [5.4, 0]], t)
  const pressed = t > 4.2 && t < 4.5
  const caretOn = Math.floor(t * 2) % 2 === 0 || (t > 0.8 && t < 2)
  const matches = APPS.filter((app) => app.startsWith(query))

  return (
    <div className="flex h-full flex-col justify-center gap-2 px-4 font-mono text-xs">
      <div className="flex items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5 py-2 text-foreground">
        <span className="text-muted-foreground">›</span>
        <span>{query}</span>
        <span className="-ml-2 h-3.5 w-px bg-foreground" style={{ opacity: caretOn ? 1 : 0 }} />
      </div>
      <ul className="space-y-0.5">
        {APPS.map((app) => {
          const shown = matches.includes(app)
          return (
            <li
              key={app}
              className="rounded px-2.5 py-1 transition-all duration-300"
              style={{
                opacity: shown ? 1 : 0.2,
                background: shown && query && app === matches[0] ? "hsl(var(--accent))" : "transparent",
              }}
            >
              {app}
            </li>
          )
        })}
      </ul>
      <div className="flex items-center gap-1.5" style={{ opacity: keys, transform: `translateY(${(1 - keys) * 6}px)` }}>
        {["Ctrl", "Backspace"].map((k) => (
          <kbd
            key={k}
            className="rounded border border-border bg-background px-1.5 py-0.5 text-foreground transition-transform duration-200"
            style={{ transform: pressed ? "translateY(1px) scale(0.96)" : "none", boxShadow: pressed ? "none" : "0 2px 0 hsl(var(--border))" }}
          >
            {k}
          </kbd>
        ))}
        <span className="text-muted-foreground">clears it</span>
      </div>
    </div>
  )
}

/* ---------- ThinkPoint Arcade: the TrackPoint steers a cursor onto targets ---------- */

const TARGETS: [number, number][] = [[78, 28], [30, 70], [72, 76]] // % positions inside the game area
const HITS = [1.8, 3.6, 5.4]
const ARCADE_PERIOD = 7.4

function ArcadeVisual(time: number, animate: boolean) {
  // Design: cursor in the middle, first target waiting, score 0
  const t = animate ? time % ARCADE_PERIOD : 0
  const path: [number, [number, number]][] = [
    [0.6, [50, 50]], [HITS[0], TARGETS[0]], [HITS[1], TARGETS[1]], [HITS[2], TARGETS[2]], [6.6, [50, 50]],
  ]
  const at = (tt: number): [number, number] => [
    track(path.map(([k, v]) => [k, v[0]] as Key), tt),
    track(path.map(([k, v]) => [k, v[1]] as Key), tt),
  ]
  const [x, y] = at(t)
  const [nx, ny] = at(t + 0.08)
  // The nub leans the way the cursor is heading
  const lean = (d: number) => Math.max(-3, Math.min(3, d * 1.5))
  const score = HITS.filter((h) => t >= h).length
  const current = Math.min(score, TARGETS.length - 1)

  return (
    <div className="grid h-full grid-cols-[auto_1fr] items-center gap-4 px-4">
      <div className="relative grid grid-cols-2 gap-1">
        {["G", "H", "B", "N"].map((k) => (
          <span key={k} className="flex h-9 w-9 items-start rounded-md border border-border bg-muted/50 p-1 font-mono text-xs text-muted-foreground">
            {k}
          </span>
        ))}
        <span
          className="absolute left-1/2 top-1/2 h-3.5 w-3.5 rounded-full bg-[#d24646] shadow-[0_0_0_2px_hsl(var(--background))]"
          style={{ transform: `translate(-50%, -50%) translate(${lean(nx - x)}px, ${lean(ny - y)}px)` }}
        />
      </div>

      <div className="relative h-36 rounded-md border border-border bg-muted/30">
        <span className="absolute right-2 top-1.5 font-mono text-xs text-muted-foreground">score {score}</span>
        {TARGETS.map(([tx, ty], i) => {
          const pop = HITS[i] <= t ? Math.min(1, (t - HITS[i]) / 0.35) : 0
          const visible = i === current || (pop > 0 && pop < 1)
          return (
            <span
              key={i}
              className="absolute h-5 w-5 rounded-full border-2 border-primary"
              style={{
                left: `${tx}%`,
                top: `${ty}%`,
                transform: `translate(-50%, -50%) scale(${1 + pop * 0.8})`,
                opacity: visible ? (pop > 0 ? 1 - pop : 1) : 0,
              }}
            />
          )
        })}
        <span
          className="absolute h-2 w-2 rounded-full bg-foreground"
          style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
        />
      </div>
    </div>
  )
}

const CARDS = [
  {
    title: "KetsuCheck",
    blurb: "ML password strength classifier trained on real leaked password patterns. 90%+ accuracy, Dockerized.",
    tech: "Python · scikit-learn · Docker",
    href: "https://github.com/RushiChaganti/KetsuCheck",
    delay: 0,
    visual: KetsuVisual,
  },
  {
    title: "AI Price Comparator",
    blurb: "What one AI image or video costs across providers, in USD and INR.",
    tech: "Cloudflare Workers · Bun · scrapers",
    delay: 1.5,
    visual: PriceVisual,
  },
  {
    title: "Omarchy, merged PR",
    blurb: "Ctrl+Backspace now clears the launcher filter in Omarchy, the Linux setup I daily drive.",
    tech: "Linux · Hyprland · open source",
    href: "https://github.com/omacom/omarchy",
    delay: 0.75,
    visual: OmarchyVisual,
  },
  {
    title: "ThinkPoint Arcade",
    blurb: "12 browser games you play with nothing but the ThinkPad TrackPoint.",
    tech: "HTML · JavaScript · CSS",
    href: "https://github.com/RushiChaganti/ThinkPoint-Arcade",
    delay: 2.25,
    visual: ArcadeVisual,
  },
]

export function FeaturedWork() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [docked, setDocked] = useState(false)

  // Dock the cards into the right-hand gutter once the grid has scrolled up past the viewport
  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      setDocked(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={gridRef} className="grid gap-4 sm:grid-cols-2">
        {CARDS.map((card) => (
          <FeatureCard key={card.title} {...card} />
        ))}
      </div>

      {/* Only on screens wide enough to have an empty gutter beside the main column */}
      <aside
        aria-label="Featured work"
        aria-hidden={!docked}
        className={`featured-rail fixed right-6 top-1/2 z-30 hidden flex-col gap-3 min-[1400px]:flex ${docked ? "is-docked" : ""}`}
      >
        {CARDS.map((card) => (
          <FeatureCard key={card.title} {...card} compact shown={docked} />
        ))}
      </aside>
    </>
  )
}
