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

// Card shell: rises in once at ~30% visibility, reports whether the story should run
function FeatureCard({
  title,
  blurb,
  tech,
  href,
  delay = 0,
  visual,
}: {
  title: string
  blurb: string
  tech: string
  href?: string
  // Seconds to hold the design before this card's story starts, so neighbours don't move in unison
  delay?: number
  visual: (t: number, animate: boolean) => ReactNode
}) {
  const ref = useRef<HTMLElement>(null)
  const [entered, setEntered] = useState(false)
  const [visible, setVisible] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting) setEntered(true)
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

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
      <div className="feature-visual relative h-48 overflow-hidden rounded-lg bg-background">{visual(Math.max(0, t - delay), animate)}</div>
      <div className="feature-text space-y-1 px-2 pb-2 pt-4">
        <h3 className="font-medium text-foreground">
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        <p className="text-sm text-muted-foreground">{blurb}</p>
        <p className="font-mono text-xs text-muted-foreground/70">{tech}</p>
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

/* ---------- Episode localizer: playhead processes clips, subtitle swaps language ---------- */

const CLIPS = [18, 26, 14, 22, 20] // widths in % of the timeline
const LOCALIZER_PERIOD = 8

function LocalizerVisual(time: number, animate: boolean) {
  // Design: playhead parked at the start, every clip processed, English subtitle
  const t = animate ? time % LOCALIZER_PERIOD : 0
  const reset = track([[0, 0], [0.8, 0], [1.2, 1], [6.4, 1], [6.9, 0]], t) // 1 while clips are being redone
  const head = track([[0, 0], [1.2, 0], [6.0, 100], [6.4, 100], [7.2, 0]], t)
  const english = track([[0, 1], [0.8, 1], [1.1, 0], [3.6, 0], [4.0, 1]], t)

  let start = 0
  return (
    <div className="flex h-full flex-col justify-center gap-3 px-4">
      <div className="relative h-24 overflow-hidden rounded-md border border-border bg-muted/40">
        <span className="absolute left-2 top-2 rounded border border-border bg-background/70 px-1.5 font-mono text-xs text-muted-foreground">
          {english > 0.5 ? "EN" : "HI"}
        </span>
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary/80" />
        <div className="absolute inset-x-0 bottom-2 flex h-5 justify-center overflow-hidden text-sm text-foreground">
          <span className="absolute" style={{ opacity: 1 - english, transform: `translateY(${english * -12}px)` }}>
            मैं कल वापस आऊँगा।
          </span>
          <span className="absolute" style={{ opacity: english, transform: `translateY(${(1 - english) * 12}px)` }}>
            I&apos;ll be back tomorrow.
          </span>
        </div>
      </div>

      <div className="relative">
        <div className="flex h-6 gap-1">
          {CLIPS.map((w, i) => {
            const clipStart = start
            start += w
            // A clip counts as processed once the playhead has passed its middle
            const passed = head >= clipStart + w / 2 ? 1 : 0
            const done = reset > 0.5 ? passed : 1
            return (
              <span
                key={i}
                className="rounded-sm border transition-colors duration-300"
                style={{
                  width: `${w}%`,
                  background: done ? "hsl(var(--foreground) / 0.45)" : "transparent",
                  borderColor: done ? "transparent" : "hsl(var(--foreground) / 0.3)",
                  borderStyle: done ? "solid" : "dashed",
                }}
              />
            )
          })}
        </div>
        <span className="absolute -bottom-1 -top-1 w-0.5 rounded-full bg-primary" style={{ left: `${head}%` }} />
      </div>
      <div className="flex justify-between font-mono text-xs text-muted-foreground">
        <span>ep 04 · 22:31</span>
        <span>{reset > 0.5 && head < 100 ? "localizing…" : "5 / 5 clips"}</span>
      </div>
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

export function FeaturedWork() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FeatureCard
        title="Episode Localizer"
        blurb="Turns a regional-language episode into English: new cast, new locations, dub fitted line by line."
        tech="Electron · Supabase · AI video · internal"
        visual={LocalizerVisual}
      />
      <FeatureCard
        title="AI Price Comparator"
        blurb="What one AI image or video costs across providers, in USD and INR."
        tech="Cloudflare Workers · Bun · scrapers"
        delay={1.5}
        visual={PriceVisual}
      />
      <FeatureCard
        title="Omarchy, merged PR"
        blurb="Ctrl+Backspace now clears the launcher filter in Omarchy, the Linux setup I daily drive."
        tech="Linux · Hyprland · open source"
        href="https://github.com/omacom/omarchy"
        delay={0.75}
        visual={OmarchyVisual}
      />
      <FeatureCard
        title="ThinkPoint Arcade"
        blurb="12 browser games you play with nothing but the ThinkPad TrackPoint."
        tech="HTML · JavaScript · CSS"
        href="https://github.com/RushiChaganti/ThinkPoint-Arcade"
        delay={2.25}
        visual={ArcadeVisual}
      />
    </div>
  )
}
