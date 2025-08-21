"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Trophy } from "lucide-react"
import { portfolioData } from "@/lib/portfolio-data"
import { getUserActivity } from "@/lib/github"
import { getRecentGames } from "@/lib/chess"
import { GitHubEvent, ChessGame } from "@/lib/types"

export function LogsSection() {
  const [githubActivity, setGithubActivity] = useState<GitHubEvent[]>([])
  const [chessGames, setChessGames] = useState<ChessGame[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activity = await getUserActivity("RushiChaganti")
        setGithubActivity(activity.slice(0, 5)) // Show latest 5 events

        const games = await getRecentGames("RushiChaganti")
        setChessGames(games.slice(0, 3)) // Show latest 3 games
      } catch (error) {
        console.error("Error fetching activity:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatChessDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <section id="log" className="space-y-6 sm:space-y-8">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground">Log</h2>

      {/* Personal Log first */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground border-b border-border pb-2">Personal Log</h3>
          <p className="text-xs text-muted-foreground">Last updated: August 2025</p>
        </div>
        <div className="space-y-4">
          {portfolioData.logs.map((log, index) => (
            <Card key={index} className="border border-border">
              <CardHeader className="pb-3 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                  <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                    {log.title}
                    <Button variant="ghost" size="sm" asChild className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                      <a href={portfolioData.links.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      </a>
                    </Button>
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">{log.date}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{log.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* GitHub Activity second */}
      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold text-foreground border-b border-border pb-2 flex items-center gap-2">
          <Github className="h-4 w-4 sm:h-5 sm:w-5" />
          GitHub Activity
        </h3>
        {loading ? (
          <Card className="border border-border">
            <CardContent className="p-4 sm:p-6">
              <p className="text-muted-foreground text-sm">Loading GitHub activity...</p>
            </CardContent>
          </Card>
        ) : githubActivity.length > 0 ? (
          <div className="space-y-3">
            {githubActivity.map((event, index) => (
              <Card key={index} className="border border-border">
                <CardHeader className="pb-3 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                      {event.type === "PushEvent" ? "🚀" : "🔀"}
                      {event.type === "PushEvent" ? "Pushed to" : "Pull Request"} {event.repo.name}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">{formatDate(event.created_at)}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {event.type === "PushEvent"
                      ? `${event.payload.commits?.length || 0} commits pushed`
                      : "Pull request activity"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border border-border">
            <CardContent className="p-6">
              <p className="text-muted-foreground">No recent GitHub activity found.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Chess Games last */}
      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold text-foreground border-b border-border pb-2 flex items-center gap-2">
          <Trophy className="h-4 w-4 sm:h-5 sm:w-5" />
          Recent Chess Games
        </h3>
        {loading ? (
          <Card className="border border-border">
            <CardContent className="p-4 sm:p-6">
              <p className="text-muted-foreground text-sm">Loading chess games...</p>
            </CardContent>
          </Card>
        ) : chessGames.length > 0 ? (
          <div className="space-y-3">
            {chessGames.map((game, index) => (
              <Card key={index} className="border border-border">
                <CardHeader className="pb-3 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <CardTitle className="text-sm sm:text-base">
                      ♟️ {game.white.username} vs {game.black.username}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">{formatChessDate(game.end_time)}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                    <div className="flex gap-1 sm:gap-2">
                      <Badge variant="secondary" className="text-xs">{game.time_control}</Badge>
                      {game.rated && <Badge variant="outline" className="text-xs">Rated</Badge>}
                    </div>
                    <Button variant="ghost" size="sm" asChild className="text-xs sm:text-sm h-7 sm:h-8">
                      <a href={game.url} target="_blank" rel="noopener noreferrer">
                        View Game <ExternalLink className="ml-1 h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border border-border">
            <CardContent className="p-4 sm:p-6">
              <p className="text-muted-foreground text-sm">No recent chess games found.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
