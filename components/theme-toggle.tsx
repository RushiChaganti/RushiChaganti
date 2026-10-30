"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [asking, setAsking] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  // Close the flashbang prompt on outside click or Escape
  useEffect(() => {
    if (!asking) return
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setAsking(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAsking(false)
    document.addEventListener("pointerdown", onPointer)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onPointer)
      document.removeEventListener("keydown", onKey)
    }
  }, [asking])

  const applyTheme = (dark: boolean) => {
    setIsDark(dark)
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem("theme", dark ? "dark" : "light")
  }

  const toggleTheme = () => {
    // Going light from dark needs consent
    if (isDark) setAsking(!asking)
    else applyTheme(true)
  }

  const goLight = () => {
    setAsking(false)
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Appended straight to <body>: the header's backdrop blur would trap a fixed overlay inside the header
      const overlay = document.createElement("div")
      overlay.className = "flashbang pointer-events-none fixed inset-0 z-[100] bg-white"
      document.body.appendChild(overlay)
      setTimeout(() => overlay.remove(), 1100)
    }
    applyTheme(false)
  }

  return (
    <div ref={wrapRef} className="relative">
      <Button variant="ghost" size="icon" onClick={toggleTheme} aria-expanded={isDark ? asking : undefined} title="Toggle theme">
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>

      {asking && (
        <div
          role="dialog"
          aria-label="Switch to light mode"
          className="fade-up absolute right-0 top-full z-50 mt-2 w-60 rounded-xl border border-border bg-card p-4 text-left shadow-lg"
          style={{ animationDuration: "0.3s" }}
        >
          <p className="text-sm font-medium text-foreground">Do you want to get flashbanged?</p>
          <p className="mt-1 text-xs text-muted-foreground">Light mode is very bright from in here.</p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={goLight}
              autoFocus
              className="rounded-md bg-foreground px-3 py-1.5 text-sm font-semibold text-background transition-transform active:scale-[0.98]"
            >
              Yes, blind me
            </button>
            <button
              onClick={() => setAsking(false)}
              className="rounded-md border border-border px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              Stay dark
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
