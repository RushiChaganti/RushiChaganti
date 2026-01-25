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
                    {build.firefoxLink && (
                      <a
                        href={build.firefoxLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-[#FF7139] transition-colors"
                        title="View on Firefox Add-ons"
                      >
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 sm:h-4 sm:w-4 fill-current"
                        >
                          <title>Firefox</title>
                          <path d="M22.627 15.86c-.52 3.118-2.73 5.696-5.63 6.834 2.15-1.52 3.11-4.103 2.51-6.495-.06.28-.14.55-.24.81-.88 2.37-3.07 4.1-5.64 4.45.62-.64.98-1.5.98-2.45 0-1.93-1.57-3.5-3.5-3.5-.5 0-.98.1-1.42.29.35-2.04 1.93-3.66 4.05-4.04.28-.05.57-.08.86-.08 1.45 0 2.78.53 3.82 1.41.04-.26.06-.53.06-.8 0-2.84-2.14-5.18-4.9-5.46.94 1.13 1.5 2.58 1.5 4.16 0 .22-.01.44-.04.65-.18-3.47-2.88-6.3-6.36-6.62.83.33 1.6.78 2.28 1.33-3.08 1.05-5.3 3.96-5.3 7.42 0 1.95.71 3.73 1.88 5.12C3.64 16.9 1.5 13.7 1.5 10c0-4.69 3.81-8.5 8.5-8.5 1.05 0 2.05.19 2.98.53C11.63.85 10.09 0 8.5 0 3.81 0 0 3.81 0 8.5c0 4.26 3.15 7.79 7.23 8.41-.08-.3-.13-.61-.13-.93 0-2.07 1.68-3.75 3.75-3.75 1.83 0 3.35 1.31 3.68 3.04.05.27.07.55.07.84 0 2.48-2.02 4.5-4.5 4.5-.29 0-.57-.03-.84-.08 1.6 1.06 3.52 1.68 5.59 1.68 5.66 0 10.25-4.59 10.25-10.25 0-2.2-.74-4.24-2-5.91.35 1.25.53 2.56.53 3.91 0 2.27-.51 4.41-1.41 6.3z" />
                        </svg>
                      </a>
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
