import type React from "react"
import { Github, Linkedin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WorkSection } from "@/components/work-section"
import { SkillsSection } from "@/components/skills-section"
import { portfolioData } from "@/lib/portfolio-data"

// X (Twitter) logo; lucide's X icon is a close cross
function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  )
}

const SOCIAL_LINKS = [
  { href: portfolioData.links.github, label: "GitHub", Icon: Github },
  { href: portfolioData.links.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: portfolioData.links.twitter, label: "X (Twitter)", Icon: XLogo },
]

function OutLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-0.5 font-semibold text-foreground underline underline-offset-4 hover:text-primary transition-colors"
    >
      {children}
      <ExternalLink className="h-3 w-3" />
    </a>
  )
}

export default function Home() {
  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Hero Section */}
      <div className="space-y-5">
        <div className="space-y-3 sm:space-y-4">
          <p className="text-muted-foreground text-sm sm:text-base">Hello, this is</p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
            Rushi Chaganti
            <span className="ml-2 sm:ml-3 align-baseline text-base sm:text-xl lg:text-2xl font-normal text-muted-foreground">aka Yasha</span>
          </h1>
          <p className="text-lg sm:text-xl font-medium text-foreground">
            AI Engineer at{" "}
            <a href="https://www.11fps.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-primary transition-colors">
              11FPS
            </a>
          </p>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Building LLM, image and video pipelines that turn scripts into films.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" size="sm" asChild className="text-xs sm:text-sm">
            <a href={portfolioData.links.cv} target="_blank" rel="noopener noreferrer">
              CV <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </Button>
          {SOCIAL_LINKS.map(({ href, label, Icon }) => (
            <Button key={label} variant="ghost" size="icon" asChild className="h-8 w-8 sm:h-9 sm:w-9">
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
                <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
            </Button>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">About</h2>
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
          I build the AI tools behind 11FPS films: episode localization, screenplay-to-storyboard, and an idea-to-short-film
          pipeline. Before that, RAG systems, LLM bots and browser automation at startups.
        </p>
      </div>

      <SkillsSection />

      <WorkSection compact />

      {/* Miscellaneous Section */}
      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">Off the clock</h2>
        <ul className="space-y-2 text-muted-foreground text-sm sm:text-base">
          <li>
            <strong className="text-foreground">Yasha</strong> is Japanese for <em>fierce night spirit</em>
          </li>
          <li>
            Into <OutLink href={portfolioData.links.chess}>Chess</OutLink> (click to challenge me) and{" "}
            <OutLink href={portfolioData.links.anime}>Anime</OutLink> (my list)
          </li>
        </ul>
      </div>
    </div>
  )
}
