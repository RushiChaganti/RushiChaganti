interface CacheEntry<T> {
  data: T
  timestamp: number
  expiresIn: number
}

class APICache {
  private cache = new Map<string, CacheEntry<any>>()

  set<T>(key: string, data: T, expiresInMs: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresIn: expiresInMs,
    })
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    const isExpired = Date.now() - entry.timestamp > entry.expiresIn
    if (isExpired) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  clear(key?: string): void {
    if (key) {
      this.cache.delete(key)
    } else {
      this.cache.clear()
    }
  }

  has(key: string): boolean {
    const entry = this.cache.get(key)
    if (!entry) return false

    const isExpired = Date.now() - entry.timestamp > entry.expiresIn
    if (isExpired) {
      this.cache.delete(key)
      return false
    }

    return true
  }
}

export const apiCache = new APICache()

// Cache keys
export const CACHE_KEYS = {
  GITHUB_ACTIVITY: (username: string) => `github_activity_${username}`,
  CHESS_GAMES: (username: string) => `chess_games_${username}`,
} as const

// Cache durations (in milliseconds)
export const CACHE_DURATION = {
  GITHUB_ACTIVITY: 5 * 60 * 1000, // 5 minutes
  CHESS_GAMES: 10 * 60 * 1000, // 10 minutes
} as const
