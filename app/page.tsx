"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, X, ExternalLink, Search, Mail } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { MusicToggle } from "@/components/music-toggle"
import { BuildsSection } from "@/components/builds-section"
import { LogsSection } from "@/components/logs-section"
import { StartupAnimation } from "@/components/startup-animation"
import { portfolioData } from "@/lib/portfolio-data"
import { getAssetPath } from "@/lib/utils"
import Image from 'next/image'

export default function Home() {
  const [activeSection, setActiveSection] = useState<"home" | "builds" | "articles" | "log">("home")
  const [showStartup, setShowStartup] = useState(true)

  const handleStartupComplete = () => {
    setShowStartup(false)
  }

  if (showStartup) {
    return <StartupAnimation onComplete={handleStartupComplete} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="flex items-center justify-center px-4 sm:px-6 py-3 max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 sm:space-x-8 text-sm sm:text-base">
            <button
              onClick={() => setActiveSection("home")}
              className="text-foreground hover:text-foreground/80 transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => setActiveSection("builds")}
              className={`hover:text-foreground transition-colors ${
                activeSection === "builds" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Builds
            </button>
            <button
              onClick={() => setActiveSection("articles")}
              className={`hover:text-foreground transition-colors ${
                activeSection === "articles" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Articles
            </button>
            <button
              onClick={() => setActiveSection("log")}
              className={`hover:text-foreground transition-colors ${
                activeSection === "log" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Log
            </button>
            <div className="flex items-center space-x-1 sm:space-x-2 ml-4 sm:ml-8">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-accent h-8 w-8 sm:h-9 sm:w-9">
                <Search className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <div className="text-muted-foreground">
                <MusicToggle />
              </div>
              <div className="text-muted-foreground">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className={`grid gap-8 sm:gap-12 ${activeSection === "home" ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-1"}`}>
          {/* Left Content */}
          <div className={`space-y-6 sm:space-y-8 ${activeSection === "home" ? "lg:col-span-2" : ""}`}>
            {activeSection === "home" && (
              <>
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
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8 sm:h-9 sm:w-9">
                    <a href={portfolioData.links.email}>
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8 sm:h-9 sm:w-9">
                    <a href={portfolioData.links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8 sm:h-9 sm:w-9">
                    <a href={portfolioData.links.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8 sm:h-9 sm:w-9">
                    <a href={portfolioData.links.twitter} target="_blank" rel="noopener noreferrer">
                      <X className="h-3 w-3 sm:h-4 sm:w-4" />
                    </a>
                  </Button>
                </div>

               {/* Bio Section */}
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">Bio</h2>
                  <div className="space-y-3 sm:space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
                    <p>
                      <span className="font-semibold">In a nutshell</span> — I’m an AI/ML engineer in the making, blending research with 
                      hands-on projects in automation, web technologies, and intelligent systems. From crafting AI-driven bots and 
                      document-query platforms to experimenting with neural networks and RAG pipelines, I thrive at the intersection of 
                      problem-solving and innovation.
                    </p>
                    <p>
                      Always curious, always building—whether it’s decoding models, engineering automation agents, or breaking things 
                      just enough to learn how they work.
                    </p>
                  </div>
                </div>


               {/* Miscellaneous Section */}
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">Miscellaneous</h2>
                <ul className="space-y-2 text-muted-foreground text-sm sm:text-base">
                  <li>
                    <strong>Yasha</strong> is a Japanese for <em> fierce night spirit </em>
                  </li>
                  <li>
                    Currently interested in <strong>Chess</strong> and <strong>Anime</strong>
                  </li>
                </ul>
              </div>
              </>
            )}

            {activeSection === "builds" && <BuildsSection />}

            {activeSection === "articles" && (
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Articles</h1>
                <p className="text-muted-foreground text-sm sm:text-base">Coming soon...</p>
              </div>
            )}

            {activeSection === "log" && <LogsSection />}
          </div>

          {/* Right Content - Brook Image */}
         {activeSection === "home" && (
          <div className="lg:col-span-1 flex justify-center lg:justify-start">
            <div className="sticky top-8 group cursor-pointer">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                <Image
                  src={getAssetPath('/Brook.jpg')}
                  alt="Brook character"
                  width={128}
                  height={128}
                  priority
                  className="object-contain w-full h-full transition-opacity duration-300 group-hover:opacity-0"
                />
                <Image
                  src={getAssetPath('/me.jpg')}
                  alt="Rushi Chaganti"
                  width={128}
                  height={128}
                  className="object-contain w-full h-full absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
            </div>
          </div>
        )}

        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <p className="text-muted-foreground text-xs sm:text-sm text-center sm:text-left">© Rushi 2025 - Music echoes beyond the grave.</p>
          <Button variant="ghost" size="sm" className="text-muted-foreground text-xs sm:text-sm">
            <a href="https://github.com/rushichaganti/" target="_blank" rel="noopener noreferrer">
              <code>Code</code>
            </a>
          </Button>

        </div>
      </footer>
    </div>
  )
}
