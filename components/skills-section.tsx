import { Brain, Code, ScanEye, Server, ShieldCheck, Workflow, type LucideIcon } from "lucide-react"
import { portfolioData } from "@/lib/portfolio-data"

const ICONS: Record<string, LucideIcon> = {
  "AI & LLMs": Brain,
  "ML & Vision": ScanEye,
  Languages: Code,
  "Web & Backend": Server,
  Automation: Workflow,
  Security: ShieldCheck,
}

export function SkillsSection() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground">Skills</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {portfolioData.skills.map(({ group, items, featured, learning }) => {
          const Icon = ICONS[group] ?? Code
          return (
            <div
              key={group}
              className={`rounded-xl border p-4 transition-colors ${featured || learning ? "sm:col-span-2" : ""} ${learning
                  ? "border-dashed border-border bg-transparent"
                  : featured
                    ? "border-primary/30 bg-primary/5"
                    : "border-border/60 bg-card/50 hover:border-border"
                }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon className={`h-4 w-4 ${featured ? "text-primary" : "text-muted-foreground"}`} aria-hidden />
                <h3 className="text-sm font-semibold text-foreground">{group}</h3>
                {learning && (
                  <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" aria-hidden />
                    Learning in progress
                  </span>
                )}
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <li
                    key={item}
                    className={`rounded-md px-2 py-1 text-xs ${learning
                        ? "border border-dashed border-border text-muted-foreground"
                        : featured
                          ? "border border-primary/20 bg-primary/10 text-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
