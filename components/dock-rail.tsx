"use client"

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react"

// Docking only happens where there is an empty gutter beside the main column
const DOCK_QUERY = "(min-width: 1400px) and (min-height: 520px)"

// As `ref` scrolls away, write a 0..1 progress to its --collapse variable (its cards slide out to
// their side via CSS) and report docked near the end. rAF-throttled; the CSS variable avoids a
// React render per frame.
export function useCollapseDock(ref: RefObject<HTMLElement | null>) {
  const [docked, setDocked] = useState(false)
  const dockedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const wide = window.matchMedia(DOCK_QUERY)
    let frame = 0

    const setDock = (next: boolean) => {
      if (next !== dockedRef.current) setDocked((dockedRef.current = next))
    }
    const update = () => {
      frame = 0
      if (!wide.matches) {
        el.style.setProperty("--collapse", "0")
        setDock(false)
        return
      }
      const { bottom } = el.getBoundingClientRect()
      const start = window.innerHeight * 0.6 // collapse begins when the bottom passes 60% of the screen
      const progress = Math.min(1, Math.max(0, (start - bottom) / start))
      el.style.setProperty("--collapse", progress.toFixed(3))
      setDock(progress > 0.8)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    wide.addEventListener("change", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      wide.removeEventListener("change", onScroll)
    }
  }, [ref])

  return docked
}

// Fixed column in a side gutter; scales itself down so it always fits the viewport height
export function DockRail({ side, docked, label, children }: { side: "left" | "right"; docked: boolean; label: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => {
      // Keep 72px clear above and below so the sticky header never covers the top card
      const scale = Math.min(1, (window.innerHeight - 144) / el.offsetHeight)
      el.style.setProperty("--rail-fit", scale.toFixed(3))
    }
    fit()
    window.addEventListener("resize", fit)
    return () => window.removeEventListener("resize", fit)
  }, [])

  return (
    <aside
      ref={ref}
      aria-label={label}
      aria-hidden={!docked}
      className={`featured-rail featured-rail-${side} fixed top-1/2 z-30 hidden flex-col gap-3 min-[1400px]:flex ${
        side === "left" ? "left-6" : "right-6"
      } ${docked ? "is-docked" : ""}`}
    >
      {children}
    </aside>
  )
}
