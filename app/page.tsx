"use client"

import { useState, useEffect, type ReactNode } from "react"
import { ArrowUpRight, Search } from "lucide-react"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { BuildsSection } from "@/components/builds-section"
import { WorkSection } from "@/components/work-section"
import { SearchDialog } from "@/components/search-dialog"
import { portfolioData } from "@/lib/portfolio-data"
import { getAssetPath } from "@/lib/utils"

const NAME = "Rushi Chaganti"
const TAGLINE = "I like building things people actually use."

const BELIEFS = [
  "Show the price before you spend it.",
  "Ship small, ship often, keep a human in the loop.",
  "Break things just enough to learn how they work.",
]

const SOCIALS = [
  { label: "GitHub", href: portfolioData.links.github },
  { label: "LinkedIn", href: portfolioData.links.linkedin },
  { label: "X", href: portfolioData.links.twitter },
  { label: "CV", href: portfolioData.links.cv },
]

function LocalTime() {
  // Rendered client-side only so the static export doesn't bake in a build-time clock
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" }).format(new Date())
    setTime(format())
    const id = setInterval(() => setTime(format()), 10_000)
    return () => clearInterval(id)
  }, [])

  return (
    <span>
      India · {time ?? "--:--"} IST
    </span>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 space-y-6">
      <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{title}</h2>
      {children}
    </section>
  )
}

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [highlightedWorkId, setHighlightedWorkId] = useState<number | null>(null)

  const handleNavigation = (section: "home" | "builds" | "work", id?: number) => {
    if (id) {
      setHighlightedWorkId(id)
      setTimeout(() => setHighlightedWorkId(null), 2000)
      return
    }
    document.getElementById(section === "home" ? "about" : section)?.scrollIntoView({ behavior: "smooth" })
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

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-3 text-sm">
          <a href="#top" className="font-medium text-foreground">
            rushi
          </a>
          <nav className="flex items-center gap-4 text-muted-foreground sm:gap-5">
            <a href="#work" className="transition-colors hover:text-foreground">work</a>
            <a href="#builds" className="transition-colors hover:text-foreground">builds</a>
            <a href="#contact" className="transition-colors hover:text-foreground">contact</a>
            <button
              onClick={() => setIsSearchOpen(true)}
              title="Search (Ctrl+K)"
              className="flex items-center gap-1 transition-colors hover:text-foreground"
            >
              <Search className="h-3.5 w-3.5" />
              <kbd className="hidden font-mono text-[10px] sm:inline">⌘K</kbd>
            </button>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-2xl space-y-24 px-6 pb-24 pt-16 sm:pt-28">
        {/* Hero */}
        <section className="space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl" aria-label={NAME}>
            {NAME.split("").map((char, i) => (
              <span key={i} aria-hidden className="letter-in" style={{ animationDelay: `${i * 35}ms` }}>
                {char === " " ? " " : char}
              </span>
            ))}
          </h1>
          <p className="fade-up text-lg text-muted-foreground sm:text-xl" style={{ animationDelay: "550ms" }}>
            {TAGLINE}
          </p>
          <p className="fade-up font-mono text-xs text-muted-foreground" style={{ animationDelay: "750ms" }}>
            AI Engineer at{" "}
            <a href="https://www.11fps.com/" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4">
              11FPS
            </a>{" "}
            · <LocalTime />
          </p>
        </section>

        {/* About */}
        <Section id="about" title="About">
          <div className="flex items-start gap-6">
            <div className="space-y-4 leading-relaxed text-muted-foreground">
              <p>
                I&apos;m Rushi, also called <span className="text-foreground">Yasha</span> (Japanese for &quot;fierce night spirit&quot;).
                I like taking a rough idea and turning it into something people can use the same week: AI tools, automations,
                browser extensions and the odd ThinkPad game.
              </p>
              <p>
                Along the way: RAG systems, automation agents and a fair amount of breaking things to see how they work. Off the
                keyboard, it&apos;s chess and anime.
              </p>
            </div>
            <div className="group relative hidden h-24 w-24 shrink-0 sm:block">
              <Image
                src={getAssetPath("/Brook.jpg")}
                alt="Brook"
                width={96}
                height={96}
                priority
                className="h-full w-full rounded-md object-cover transition-opacity duration-300 group-hover:opacity-0"
              />
              <Image
                src={getAssetPath("/me.jpg")}
                alt="Rushi Chaganti"
                width={96}
                height={96}
                className="absolute inset-0 h-full w-full rounded-md object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-foreground">3 things I believe in</p>
            <ol className="space-y-2 text-muted-foreground">
              {BELIEFS.map((belief, i) => (
                <li key={belief} className="flex gap-3">
                  <span className="font-mono text-xs leading-6 text-muted-foreground/70">0{i + 1}</span>
                  <span>{belief}</span>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section id="work" title="Work">
          <WorkSection highlightedId={highlightedWorkId} />
        </Section>

        <Section id="builds" title="Builds">
          <BuildsSection />
        </Section>

        <Section id="contact" title="Contact">
          <p className="text-2xl text-foreground sm:text-3xl">
            Building something with AI and video?{" "}
            <a href={portfolioData.links.email} className="underline decoration-muted-foreground underline-offset-8 hover:decoration-foreground">
              let&apos;s chat
            </a>
            .
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {SOCIALS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 transition-colors hover:text-foreground"
              >
                {label}
                <ArrowUpRight className="h-3 w-3" />
              </a>
            ))}
          </div>
        </Section>
      </main>

      <footer className="mx-auto flex max-w-2xl justify-between px-6 py-8 font-mono text-xs text-muted-foreground">
        <span>© Rushi {new Date().getFullYear()}. Music echoes beyond the grave.</span>
        <a href="https://github.com/RushiChaganti/RushiChaganti" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
          source
        </a>
      </footer>

      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} onNavigateToSection={handleNavigation} />
    </div>
  )
}
