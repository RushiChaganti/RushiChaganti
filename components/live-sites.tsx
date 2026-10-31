"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { getAssetPath } from "@/lib/utils"
import { DockRail, useCollapseDock } from "@/components/dock-rail"

// Screenshots live in public/shots (1200x750 WebP). Retake them if a site's design changes.
const SITES = [
  {
    title: "Metro Portfolio",
    blurb: "My old portfolio as a Windows Metro tile UI, fully keyboard navigable.",
    url: "https://rushichaganti.github.io/Metro-Portfolio/",
    shot: "/shots/metro.webp",
  },
  {
    title: "11fps.com",
    blurb: "Website for 11FPS, an AI-native film studio in Bangalore.",
    url: "https://www.11fps.com/",
    shot: "/shots/11fps.webp",
  },
  {
    title: "NeuralSim",
    blurb: "Interactive neural network and brain simulations for students.",
    url: "https://rushichaganti.github.io/NeuralSim/",
    shot: "/shots/neuralsim.webp",
  },
  {
    title: "araise",
    blurb: "The Araise org site, with a retro terminal entrance. I built its component library.",
    url: "https://araise25.github.io/araise_Web/",
    shot: "/shots/araise.webp",
  },
]

const domain = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")

function SiteCard({ site, compact = false, shown }: { site: (typeof SITES)[number]; compact?: boolean; shown?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [enteredSelf, setEntered] = useState(false)
  // The docked rail already knows when its cards are on screen
  const entered = enteredSelf || shown === true

  // Rise in once when a third of the card is visible
  useEffect(() => {
    const el = ref.current
    if (!el || shown !== undefined) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [shown])

  return (
    <a
      ref={ref}
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={compact && !shown ? -1 : undefined}
      className={`feature-card site-card group block rounded-2xl border border-border bg-card p-2 ${compact ? "w-64" : ""} ${entered ? "is-in" : ""}`}
    >
      <div className="overflow-hidden rounded-lg border border-border bg-background">
        {/* Browser chrome */}
        <div className={`items-center gap-2 border-b border-border px-3 py-2 ${compact ? "hidden" : "flex"}`}>
          <span className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
            <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
            <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
          </span>
          <span className="flex-1 truncate rounded bg-muted/60 px-2 py-0.5 text-center font-mono text-xs text-muted-foreground">
            {domain(site.url)}
          </span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={getAssetPath(site.shot)}
            alt={`Screenshot of ${site.title}`}
            fill
            sizes={compact ? "256px" : "(min-width: 640px) 320px, 100vw"}
            className="object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
        </div>
      </div>
      <div className={`feature-text space-y-1 px-2 ${compact ? "pb-1 pt-2 text-sm" : "pb-2 pt-4"}`}>
        <h3 className="flex items-center gap-1 font-medium text-foreground">
          {site.title}
          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </h3>
        {!compact && <p className="text-sm text-muted-foreground">{site.blurb}</p>}
      </div>
    </a>
  )
}

export function LiveSites() {
  const gridRef = useRef<HTMLDivElement>(null)
  const docked = useCollapseDock(gridRef)

  return (
    <>
      <div ref={gridRef} className="grid gap-4 sm:grid-cols-2">
        {SITES.map((site) => (
          <div key={site.url} className="collapse-item collapse-left">
            <SiteCard site={site} />
          </div>
        ))}
      </div>

      <DockRail side="left" docked={docked} label="Live sites">
        {SITES.map((site) => (
          <SiteCard key={site.url} site={site} compact shown={docked} />
        ))}
      </DockRail>
    </>
  )
}
