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
  visual,
}: {
  title: string
  blurb: string
  tech: string
  href?: string
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
      <div className="feature-visual relative h-48 overflow-hidden rounded-lg bg-background">{visual(t, animate)}</div>
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

export function FeaturedWork() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FeatureCard
        title="AI Price Comparator"
        blurb="What one AI image or video costs across providers, in USD and INR."
        tech="Cloudflare Workers · Bun · scrapers"
        visual={PriceVisual}
      />
    </div>
  )
}
