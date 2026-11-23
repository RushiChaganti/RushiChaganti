import Image from "next/image"
import { Github, Linkedin, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WorkSection } from "@/components/work-section"
import { portfolioData } from "@/lib/portfolio-data"
import { getAssetPath } from "@/lib/utils"

const SOCIAL_LINKS = [
  { href: portfolioData.links.github, label: "GitHub", Icon: Github },
  { href: portfolioData.links.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: portfolioData.links.twitter, label: "X (Twitter)", Icon: X },
]

export default function Home() {
  return (
    <div className="grid gap-8 sm:gap-12 grid-cols-1 lg:grid-cols-3">
      <div className="space-y-6 sm:space-y-8 lg:col-span-2">
        {/* Hero Section */}
        <div className="space-y-3 sm:space-y-4">
          <p className="text-muted-foreground text-sm sm:text-base">Hello, this is</p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
            Rushi Chaganti<span className="text-muted-foreground text-sm sm:text-lg font-normal">(Yasha)</span>
            <span className="text-muted-foreground">.</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Where neural nets meet exploits — building, breaking, and learning.
          </p>
        </div>

        {/* Social Links */}
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

        {/* Bio Section */}
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Bio</h2>
          <div className="space-y-3 sm:space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
            <p>
              I’m an AI engineer at{" "}
              <a href="https://www.11fps.com/" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4">
                11FPS
              </a>
              , where I build the tools behind AI-made films: a desktop app that turns a regional-language episode into an
              English one, a screenplay-to-storyboard studio, and a pipeline that takes an idea to a finished short.
            </p>
            <p>Before that I tested RAG systems, built LLM-powered bots and automated browsers for a few startups.</p>
            <p>
              I like AI tools people can trust: show the price before every paid call, keep a human in the loop, and break
              things just enough to learn how they work.
            </p>
          </div>
        </div>

        <WorkSection limit={3} />

        {/* Miscellaneous Section */}
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Miscellaneous</h2>
          <ul className="space-y-2 text-muted-foreground text-sm sm:text-base">
            <li>
              <strong>Yasha</strong> is Japanese for <em>fierce night spirit</em>
            </li>
            <li>
              Currently interested in <strong>Chess</strong> and <strong>Anime</strong>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Content - Brook Image */}
      <div className="lg:col-span-1 flex justify-center lg:justify-start">
        <div className="sticky top-8 group cursor-pointer">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32">
            <Image
              src={getAssetPath("/Brook.jpg")}
              alt="Brook character"
              width={128}
              height={128}
              priority
              className="object-contain w-full h-full transition-opacity duration-300 group-hover:opacity-0"
            />
            <Image
              src={getAssetPath("/me.jpg")}
              alt="Rushi Chaganti"
              width={128}
              height={128}
              className="object-contain w-full h-full absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
