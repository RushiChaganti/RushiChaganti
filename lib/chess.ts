import axios from "axios"
import { apiCache, CACHE_KEYS, CACHE_DURATION } from "./cache"
import { ChessGame } from "./types"

const CHESS_API = "https://api.chess.com/pub/player"
export async function getRecentGames(username: string, forceRefresh = false): Promise<ChessGame[]> {
  const cacheKey = CACHE_KEYS.CHESS_GAMES(username)

  if (!forceRefresh) {
    const cachedData = apiCache.get<ChessGame[]>(cacheKey)
    if (cachedData) {
      console.log("Using cached chess games data")
      return cachedData
    }
  }

  try {
    console.log("Fetching fresh chess games data")
    const res = await axios.get(`${CHESS_API}/${username}/games/archives`)
    const archives: string[] = res.data.archives

    if (!archives?.length) {
      console.warn("No archives found for user:", username)
      return []
    }

    // Instead of just the latest, take the last 2 archives (to cover month rollover)
    const recentArchives = archives.slice(-2)

    let games: ChessGame[] = []
    for (const archive of recentArchives) {
      const gamesRes = await axios.get(archive)
      games = games.concat(gamesRes.data.games || [])
    }

    // Only rated games
    const ratedGames: ChessGame[] = games.filter((game: ChessGame) => game.rated)

    // Sort by end_time descending (most recent first)
    ratedGames.sort((a, b) => b.end_time - a.end_time)

    // Cache result
    apiCache.set(cacheKey, ratedGames, CACHE_DURATION.CHESS_GAMES)

    return ratedGames
  } catch (error) {
    console.error("Chess.com API error:", error)
    return []
  }
}
