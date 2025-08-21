"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"
import { getAssetPath } from "@/lib/utils"

export function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Check for saved music preference
    const savedMusicState = localStorage.getItem("musicEnabled")
    const savedMuteState = localStorage.getItem("musicMuted")
    
    if (savedMusicState === "true") {
      setIsPlaying(true)
    }
    if (savedMuteState === "true") {
      setIsMuted(true)
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && !isMuted) {
        audioRef.current.play().catch((error) => {
          console.warn("Could not play audio:", error)
          // If audio fails to play, reset the playing state
          setIsPlaying(false)
          localStorage.setItem("musicEnabled", "false")
        })
      } else {
        audioRef.current.pause()
      }
      audioRef.current.muted = isMuted
    }
  }, [isPlaying, isMuted])

  const toggleMusic = () => {
    const newPlayingState = !isPlaying
    setIsPlaying(newPlayingState)
    localStorage.setItem("musicEnabled", newPlayingState.toString())
  }

  const toggleMute = () => {
    const newMuteState = !isMuted
    setIsMuted(newMuteState)
    localStorage.setItem("musicMuted", newMuteState.toString())
  }

  return (
    <div className="flex items-center space-x-1">
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={getAssetPath('/music/Bink_sake.mp3')}
      />
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleMusic}
        className="text-muted-foreground hover:text-foreground hover:bg-accent"
        title={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <div className="h-4 w-4 flex items-center justify-center">
            <div className="flex space-x-0.5">
              <div className="w-0.5 h-3 bg-current animate-pulse"></div>
              <div className="w-0.5 h-2 bg-current animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-0.5 h-4 bg-current animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-0.5 h-2 bg-current animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>
        ) : (
          <div className="h-4 w-4 flex items-center justify-center">
            <div className="flex space-x-0.5">
              <div className="w-0.5 h-3 bg-current opacity-50"></div>
              <div className="w-0.5 h-2 bg-current opacity-50"></div>
              <div className="w-0.5 h-4 bg-current opacity-50"></div>
              <div className="w-0.5 h-2 bg-current opacity-50"></div>
            </div>
          </div>
        )}
      </Button>

      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleMute}
        className="text-muted-foreground hover:text-foreground hover:bg-accent"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>
    </div>
  )
}
