import type React from "react"
import { portfolioData } from "@/lib/portfolio-data"

const { core, also, learning } = portfolioData.skills

function TierLabel({ children }: { children: React.ReactNode }) {
  return <h3 className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-muted-foreground">{children}</h3>
}

// Plain words separated by dots: lighter than chips for the long secondary lists
function DotList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-y-1 text-sm text-muted-foreground leading-relaxed">
      {items.map((item, i) => (
        <li key={item} className="whitespace-nowrap">
          {item}
          {i < items.length - 1 && <span className="mx-2 text-border" aria-hidden>·</span>}
        </li>
      ))}
    </ul>
  )
}

export function SkillsSection() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground">Skills</h2>

      <div className="space-y-6">
        <div className="space-y-3">
          <TierLabel>Core</TierLabel>
          <ul className="flex flex-wrap gap-2">
            {core.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <TierLabel>Also work with</TierLabel>
          <DotList items={also} />
        </div>

        <div className="space-y-2">
          <TierLabel>
            <span className="inline-flex items-center gap-2">
              Learning
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" aria-hidden />
              <span className="normal-case tracking-normal">in progress</span>
            </span>
          </TierLabel>
          <DotList items={learning} />
        </div>
      </div>
    </div>
  )
}
