"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSyncExternalStore } from "react"

// The inline script in app/layout.tsx applies the saved/system theme before first paint.
// This component just mirrors the "dark" class on <html> and flips it.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
  return () => observer.disconnect()
}

const isDarkNow = () => document.documentElement.classList.contains("dark")

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, isDarkNow, () => false)

  const toggleTheme = () => {
    const next = !isDark
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme" title="Toggle theme">
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}
