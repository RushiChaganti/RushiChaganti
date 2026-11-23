"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Search, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { StartupAnimation } from "@/components/startup-animation"
import { SearchDialog } from "@/components/search-dialog"
import { portfolioData } from "@/lib/portfolio-data"

type Section = "home" | "builds" | "work"

const SECTION_PATHS: Record<Section, string> = { home: "/", work: "/work/", builds: "/builds/" }

const NAV_ITEMS = [
  { label: "About", href: "/" },
  { label: "Work", href: "/work/" },
  { label: "Builds", href: "/builds/" },
]

// Lets the search dialog (in the shell) tell the work page which job to scroll to.
const HighlightedWorkContext = createContext<number | null>(null)
export const useHighlightedWork = () => useContext(HighlightedWorkContext)

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const current = pathname.replace(/\/$/, "") || "/"

  const [showStartup, setShowStartup] = useState(true)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [highlightedWorkId, setHighlightedWorkId] = useState<number | null>(null)
  const [showContactPopup, setShowContactPopup] = useState(false)

  const handleStartupComplete = useCallback(() => setShowStartup(false), [])

  const handleNavigation = (section: Section, id?: number) => {
    router.push(SECTION_PATHS[section])
    if (id) {
      setHighlightedWorkId(id)
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

  // Auto-show contact popup 2s after the greeting, hide it 5s later
  useEffect(() => {
    if (!showStartup) {
      let hide: ReturnType<typeof setTimeout>
      const show = setTimeout(() => {
        setShowContactPopup(true)
        hide = setTimeout(() => setShowContactPopup(false), 5000)
      }, 2000)
      return () => {
        clearTimeout(show)
        clearTimeout(hide)
      }
    }
  }, [showStartup])

  return (
    <HighlightedWorkContext.Provider value={highlightedWorkId}>
      <div className="min-h-screen bg-background">
        <nav className="bg-card border-b border-border">
          <div className="flex items-center justify-center px-4 sm:px-6 py-3 max-w-6xl mx-auto">
            <div className="flex items-center space-x-4 sm:space-x-8 text-sm sm:text-base">
              {NAV_ITEMS.map(({ label, href }) => {
                const active = current === (href.replace(/\/$/, "") || "/")
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`hover:text-foreground transition-colors ${active ? "text-foreground font-medium" : "text-muted-foreground"}`}
                  >
                    {label}
                  </Link>
                )
              })}
              <div className="flex items-center space-x-1 sm:space-x-2 ml-4 sm:ml-8">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground hover:bg-accent h-8 w-8 sm:h-9 sm:w-9"
                  onClick={() => setIsSearchOpen(true)}
                  title="Search (Ctrl+K)"
                  aria-label="Search"
                >
                  <Search className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 ml-1">
                  <span className="text-xs">⌘K</span>
                </kbd>

                <div className="text-muted-foreground">
                  <ThemeToggle />
                </div>

                <div className="relative group">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground hover:bg-accent h-8 w-8 sm:h-9 sm:w-9 animate-bounce-subtle"
                    title="Contact me"
                    aria-label="Contact me"
                    onClick={() => setShowContactPopup(!showContactPopup)}
                  >
                    <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>

                  <div
                    className={`absolute right-0 top-full mt-2 w-64 p-4 bg-card border border-border rounded-lg shadow-lg transition-all duration-300 z-50 ${showContactPopup ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
                      }`}
                  >
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

        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">{children}</main>

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
              <Button variant="ghost" size="sm" asChild className="text-muted-foreground text-xs sm:text-sm p-0 h-auto">
                <a href="https://github.com/RushiChaganti/RushiChaganti" target="_blank" rel="noopener noreferrer">
                  <code>Code</code>
                </a>
              </Button>
            </div>
          </div>
        </footer>

        <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} onNavigateToSection={handleNavigation} />
      </div>

      {/* Overlay on top of the already-rendered page, so the content is in the HTML for search engines */}
      {showStartup && <StartupAnimation onComplete={handleStartupComplete} />}
    </HighlightedWorkContext.Provider>
  )
}
