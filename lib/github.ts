import axios from "axios"
import { apiCache, CACHE_KEYS, CACHE_DURATION } from "./cache"
import { GitHubEvent } from "./types"

const GITHUB_API = "https://api.github.com"

export async function getUserActivity(username: string, forceRefresh: boolean = false): Promise<GitHubEvent[]> {
  const cacheKey = CACHE_KEYS.GITHUB_ACTIVITY(username)

  // Check cache first (unless force refresh is requested)
  if (!forceRefresh) {
    const cachedData = apiCache.get<GitHubEvent[]>(cacheKey)
    if (cachedData) {
      console.log("Using cached GitHub activity data")
      return cachedData
    }
  }

  try {
    console.log("Fetching fresh GitHub activity data")
    const res = await axios.get(`${GITHUB_API}/users/${username}/events/public`, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })

    // Filter only Push and Pull Request events
    const filteredEvents = res.data.filter((event: any) => ["PushEvent", "PullRequestEvent"].includes(event.type))

    // Cache the result
    apiCache.set(cacheKey, filteredEvents, CACHE_DURATION.GITHUB_ACTIVITY)

    return filteredEvents
  } catch (error) {
    console.error("GitHub API error:", error)
    return []
  }
}
