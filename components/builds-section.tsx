"use client"

import { useState } from "react"
import { portfolioData } from "@/lib/portfolio-data"
import { Build } from "@/lib/types"
import { ArrowUpRight } from "lucide-react"

const { lastUpdated, ...categories } = portfolioData.builds

export function BuildsSection() {
  const [active, setActive] = useState<string>("All")

  const items = Object.entries(categories)
    .filter(([category]) => active === "All" || category === active)
    .flatMap(([category, builds]) => (builds as Build[]).map((build) => ({ category, build })))
    // New builds first, otherwise keep the data order
    .sort((a, b) => Number(!!b.build.isNew) - Number(!!a.build.isNew))

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs">
        {["All", ...Object.keys(categories)].map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={`transition-colors ${active === category ? "text-foreground underline underline-offset-4" : "text-muted-foreground hover:text-foreground"}`}
          >
            {category}
          </button>
        ))}
      </div>

      <ul className="divide-y divide-border">
        {items.map(({ category, build }) => (
          <li key={`${category}-${build.id}`} className="group py-4">
            <div className="flex items-baseline gap-2">
              <a
                href={build.link || build.demo || build.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-foreground underline-offset-4 hover:underline"
              >
                {build.title}
                <ArrowUpRight className="h-3 w-3 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              {build.isNew && <span className="font-mono text-[10px] uppercase text-primary">new</span>}
              {build.oss && <span className="font-mono text-[10px] uppercase text-muted-foreground">oss</span>}
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{build.description}</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-muted-foreground/80">
              <span>{build.tech.join(" / ")}</span>
              {(build.link || build.demo) && build.githubLink && (
                <a href={build.githubLink} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">
                  code
                </a>
              )}
              {build.firefoxLink && (
                <a href={build.firefoxLink} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">
                  firefox add-on
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>

      <p className="font-mono text-xs text-muted-foreground">last updated {lastUpdated}</p>
    </div>
  )
}
