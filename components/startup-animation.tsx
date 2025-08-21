"use client"

import { useState, useEffect } from "react"

const greetings = [
  { text: "Hello", lang: "English" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "नमस्ते", lang: "Hindi" },
  { text: "Hola", lang: "Spanish" },
  { text: "Bonjour", lang: "French" },
  { text: "Guten Tag", lang: "German" },
  { text: "Ciao", lang: "Italian" },
  { text: "안녕하세요", lang: "Korean" },
]

export function StartupAnimation({ onComplete }: { onComplete: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // total animation time (in ms)
    const totalDuration = 900
    const intervalTime = totalDuration / greetings.length

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= greetings.length - 1) {
          clearInterval(interval)
          setTimeout(() => {
            setIsVisible(false)
            setTimeout(onComplete, 200)
          }, 100)
          return prev
        }
        return prev + 1
      })
    }, intervalTime)

    return () => clearInterval(interval)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl font-bold text-foreground animate-pulse">
          {greetings[currentIndex].text}
        </div>
        <div className="text-sm text-muted-foreground mt-4 opacity-60">
          {greetings[currentIndex].lang}
        </div>
      </div>
    </div>
  )
}
