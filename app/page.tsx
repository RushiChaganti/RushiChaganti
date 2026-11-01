"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, X, ExternalLink, Search, MessageCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { BuildsSection } from "@/components/builds-section"

import { StartupAnimation } from "@/components/startup-animation"
import { WorkSection } from "@/components/work-section"
import { portfolioData } from "@/lib/portfolio-data"
import { getAssetPath } from "@/lib/utils"
import Image from 'next/image'
import { SearchDialog } from "@/components/search-dialog"

export default function Home() {
  const [activeSection, setActiveSection] = useState<"home" | "builds" | "work">("home")
  const [showStartup, setShowStartup] = useState(true)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [highlightedWorkId, setHighlightedWorkId] = useState<number | null>(null)
  const [showContactPopup, setShowContactPopup] = useState(false)

  const handleNavigation = (section: "home" | "builds" | "work", id?: number) => {
    setActiveSection(section)
    if (id) {
      setHighlightedWorkId(id)
      // Reset highlight after animation
      setTimeout(() => setHighlightedWorkId(null), 2000)
    }
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsSearchOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleStartupComplete = () => {
    setShowStartup(false)
  }

  // Auto-show contact popup after 2 seconds
  useEffect(() => {
    if (!showStartup) {
      const timer = setTimeout(() => {
        setShowContactPopup(true)
        // Auto-hide after 5 seconds
        setTimeout(() => setShowContactPopup(false), 5000)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showStartup])

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
              onClick={() => setActiveSection("work")}
              className={`hover:text-foreground transition-colors ${activeSection === "work" ? "text-foreground" : "text-muted-foreground"
                }`}
            >
              Work
            </button>
            <button
              onClick={() => setActiveSection("builds")}
              className={`hover:text-foreground transition-colors ${activeSection === "builds" ? "text-foreground" : "text-muted-foreground"
                }`}
            >
              Builds
            </button>
            <div className="flex items-center space-x-1 sm:space-x-2 ml-4 sm:ml-8">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground hover:bg-accent h-8 w-8 sm:h-9 sm:w-9"
                onClick={() => setIsSearchOpen(true)}
                title="Search (Ctrl+K)"
              >
                <Search className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 ml-1">
                <span className="text-xs">⌘K</span>
              </kbd>

              <div className="text-muted-foreground">
                <ThemeToggle />
              </div>

              {/* Chat Contact Icon with Popup */}
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground hover:bg-accent h-8 w-8 sm:h-9 sm:w-9 animate-bounce-subtle"
                  title="Contact me"
                  onClick={() => setShowContactPopup(!showContactPopup)}
                >
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>

                {/* Popup - shows on hover or auto-trigger */}
                <div className={`absolute right-0 top-full mt-2 w-64 p-4 bg-card border border-border rounded-lg shadow-lg transition-all duration-300 z-50 ${showContactPopup ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'
                  }`}>
                  <p className="text-sm font-medium text-foreground mb-2">Want to have a chat? 💬</p>
                  <a
                    href={portfolioData.links.email}
                    className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                  >
                    rushichaganti@gmail.com
                  </a>
                </div>
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

                {/* Work Experience Section */}
                <WorkSection onViewAll={() => setActiveSection("work")} limit={1} />



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



            {activeSection === "work" && <WorkSection highlightedId={highlightedWorkId} />}
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
          <p className="text-muted-foreground text-xs sm:text-sm text-center sm:text-left">© Rushi 2026 - Music echoes beyond the grave.</p>
          <div className="flex items-center gap-2">
            <a
              href={portfolioData.links.email}
              className="text-muted-foreground hover:text-foreground text-xs sm:text-sm underline underline-offset-4 transition-colors"
            >
              rushichaganti@gmail.com
            </a>
            <span className="text-muted-foreground">•</span>
            <Button variant="ghost" size="sm" className="text-muted-foreground text-xs sm:text-sm p-0 h-auto">
              <a href="https://github.com/rushichaganti/" target="_blank" rel="noopener noreferrer">
                <code>Code</code>
              </a>
            </Button>
          </div>
        </div>
      </footer>
      <SearchDialog
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        onNavigateToSection={handleNavigation}
      />
    </div>
  )
}
