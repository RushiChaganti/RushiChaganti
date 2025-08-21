import React from "react"
import { portfolioData } from "@/lib/portfolio-data"
import { Build } from "@/lib/types"
import { ExternalLink, Github, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function BuildsSection() {
  return (
    <section id="builds" className="space-y-6 sm:space-y-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Builds</h2>
      {Object.entries(portfolioData.builds).map(([language, projects]) => (
        <div key={language} className="space-y-4 sm:space-y-6">
          <h3 className="text-base sm:text-lg font-semibold text-muted-foreground uppercase tracking-wide">
            {language}
          </h3>
          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
            {projects.map((build: Build) => (
              <div
                key={build.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-muted/30 rounded-xl p-3 sm:p-4 hover:bg-muted/50 transition space-y-3 sm:space-y-0"
              >
                {/* Left side */}
                <div className="flex flex-col space-y-2 flex-1">
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {build.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <h4 className="text-sm sm:text-base font-medium">{build.title}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {build.description}
                  </p>
                  <div className="flex gap-2 sm:gap-3 mt-1">
                    {build.githubLink && (
                      <a
                        href={build.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                      </a>
                    )}
                    {build.link && (
                      <a
                        href={build.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                      </a>
                    )}
                    {build.demo && (
                      <a
                        href={build.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                      </a>
                    )}
                    {build.oss && (
                      <div
                        className="text-muted-foreground"
                        title="Open Source Software"
                      >
                        <Heart className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                      </div>
                    )}
                  </div>
                </div>

                
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
