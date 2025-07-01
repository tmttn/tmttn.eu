export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  created_at: string
  updated_at: string
  topics: string[]
  archived: boolean
  fork: boolean
}

export interface ContributionDay {
  date: string
  count: number
  level: number
}

export interface GitHubStats {
  totalContributions: number
  currentStreak: number
  longestStreak: number
  thisWeek: number
  thisMonth: number
}

export interface GitHubEvent {
  id: string
  type: string
  created_at: string
  repo?: {
    name: string
  }
  payload?: {
    commits?: Array<{ message: string }>
  }
}

export class GitHubService {
  private static readonly API_BASE = 'https://api.github.com'
  private static readonly USERNAME = 'tmttn'
  private static rateLimitedUntil: number = 0
  private static readonly RATE_LIMIT_COOLDOWN = 60 * 1000 // 1 minute
  private static readonly MAX_REPOS_PER_PAGE = 100
  private static readonly DAYS_IN_YEAR = 365
  private static readonly MILLISECONDS_IN_MINUTE = 60 * 1000
  private static readonly MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000

  // Special symbol to indicate API failure vs empty results
  static readonly API_FAILURE = Symbol('API_FAILURE')

  private static shouldSkipAPICall(): boolean {
    // Always skip API calls in development and testing environments
    // This prevents rate limiting and makes development/testing more reliable
    const isTest = process.env.NODE_ENV === 'test'
    const isDevelopment = process.env.NODE_ENV === 'development'
    const isBuild = process.env.NODE_ENV === 'production' && globalThis.window === undefined
    const skipExplicit = process.env.SKIP_GITHUB_API === 'true'
    
    // In production client-side, only make API calls if explicitly enabled
    const isProductionClient = process.env.NODE_ENV === 'production' && globalThis.window !== undefined
    const enableAPIInProduction = process.env.ENABLE_GITHUB_API === 'true'
    
    if (isProductionClient && !enableAPIInProduction) {
      return true // Skip API calls in production unless explicitly enabled
    }
    
    return isTest || isDevelopment || isBuild || skipExplicit
  }

  private static isRateLimited(): boolean {
    return Date.now() < this.rateLimitedUntil
  }

  private static setRateLimited(): void {
    this.rateLimitedUntil = Date.now() + this.RATE_LIMIT_COOLDOWN
    // API rate limited - cooling down
  }

  // Method for testing - reset rate limit
  static resetRateLimit(): void {
    this.rateLimitedUntil = 0
  }

  static async getPublicRepositories(): Promise<GitHubRepository[] | typeof GitHubService.API_FAILURE> {
    if (this.shouldSkipAPICall()) {
      return this.API_FAILURE
    }

    if (this.isRateLimited()) {
      return this.API_FAILURE
    }

    try {
      const response = await fetch(
        `${this.API_BASE}/users/${this.USERNAME}/repos?type=public&sort=updated&per_page=${this.MAX_REPOS_PER_PAGE}`
      )
      
      if (!response.ok) {
        if (response.status === 403 || response.status === 429 || response.status >= 500) {
          // Rate limit (403, 429) or server errors (5xx) - implement cooldown
          this.setRateLimited()
        }
        return this.API_FAILURE
      }
      
      const repos: GitHubRepository[] = await response.json()
      
      // Filter out forks and archived repos, sort by stars/updated date
      return repos
        .filter(repo => !repo.fork && !repo.archived)
        .sort((a, b) => {
          // Sort by stars first, then by updated date
          if (a.stargazers_count !== b.stargazers_count) {
            return b.stargazers_count - a.stargazers_count
          }
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        })
    } catch {
      // Network errors should also trigger cooldown to prevent spam
      this.setRateLimited()
      return this.API_FAILURE
    }
  }

  static async getContributionData(): Promise<{ contributions: ContributionDay[], stats: GitHubStats }> {
    if (this.shouldSkipAPICall()) {
      return this.generateFallbackData()
    }

    if (this.isRateLimited()) {
      return this.generateFallbackData()
    }

    try {
      // Use public REST API to get user events (recent activity)
      const eventsResponse = await fetch(
        `${this.API_BASE}/users/${this.USERNAME}/events/public?per_page=${this.MAX_REPOS_PER_PAGE}`
      )

      if (!eventsResponse.ok) {
        if (eventsResponse.status === 403 || eventsResponse.status === 429 || eventsResponse.status >= 500) {
          // Rate limit (403, 429) or server errors (5xx) - implement cooldown
          this.setRateLimited()
        }
        return this.generateFallbackData()
      }

      const events = await eventsResponse.json()
      
      // Generate realistic contribution data based on actual repository activity
      const contributions = this.generateContributionDataFromEvents(events)
      const stats = this.calculateStats(contributions)

      return { contributions, stats }
    } catch {
      // Network errors should also trigger cooldown to prevent spam
      this.setRateLimited()
      return this.generateFallbackData()
    }
  }

  private static generateContributionDataFromEvents(events: GitHubEvent[]): ContributionDay[] {
    const contributions: ContributionDay[] = []
    const today = new Date()
    const oneYear = this.DAYS_IN_YEAR
    
    // Create a map of dates to track actual activity
    const activityMap = new Map<string, number>()
    
    // Process events to extract contribution dates
    for (const event of events) {
      const eventDate = new Date(event.created_at).toISOString().split('T')[0]
      const currentCount = activityMap.get(eventDate) ?? 0
      
      // Weight different event types
      let contributionWeight = 1
      switch (event.type) {
        case 'PushEvent': {
          contributionWeight = event.payload?.commits?.length ?? 1
          break
        }
        case 'CreateEvent':
        case 'ReleaseEvent': {
          contributionWeight = 2
          break
        }
        case 'PullRequestEvent':
        case 'IssuesEvent': {
          contributionWeight = 3
          break
        }
        default: {
          contributionWeight = 1
          break
        }
      }
      
      activityMap.set(eventDate, currentCount + contributionWeight)
    }
    
    // Generate data for the past year
    for (let index = oneYear; index >= 0; index--) {
      const date = new Date(today)
      date.setDate(date.getDate() - index)
      const dateString = date.toISOString().split('T')[0]
      
      const actualCount = activityMap.get(dateString) ?? 0
      
      // Add some realistic variation for days without recorded events
      let count = actualCount
      if (count === 0) {
        const dayOfWeek = date.getDay()
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
        const baseChance = isWeekend ? 0.2 : 0.4
        
        // SAFETY: Math.random() usage is safe here - used only for generating fallback UI data, not security-critical
        if (Math.random() < baseChance) { // NOSONAR: S2245
          count = Math.floor(Math.random() * 3) + 1 // NOSONAR: S2245
        }
      }
      
      const level = Math.min(Math.floor(count / 2), 4)
      
      contributions.push({
        date: dateString,
        count,
        level
      })
    }
    
    return contributions
  }

  private static generateFallbackData(): { contributions: ContributionDay[], stats: GitHubStats } {
    const contributions: ContributionDay[] = []
    const today = new Date()
    const oneYear = this.DAYS_IN_YEAR
    
    for (let index = oneYear; index >= 0; index--) {
      const date = new Date(today)
      date.setDate(date.getDate() - index)
      
      // Generate realistic contribution pattern
      const dayOfWeek = date.getDay()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
      const baseChance = isWeekend ? 0.3 : 0.6
      // SAFETY: Math.random() usage is safe here - used only for generating fallback UI data, not security-critical
      // NOSONAR: S2245 - Pseudorandom number generators are secure for fallback UI data generation
      const randomFactor = Math.random()
      
      let count = 0
      if (randomFactor < baseChance) {
        count = Math.floor(Math.random() * 6) + 1 // NOSONAR: S2245
        if (randomFactor < 0.1) count += Math.floor(Math.random() * 8) // NOSONAR: S2245
      }
      
      const level = Math.min(Math.floor(count / 2), 4)
      
      contributions.push({
        date: date.toISOString().split('T')[0],
        count,
        level
      })
    }
    
    const stats = this.calculateStats(contributions)
    return { contributions, stats }
  }


  private static calculateStats(contributions: ContributionDay[]): GitHubStats {
    const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0)
    
    let currentStreak = 0
    let longestStreak = 0
    let temporaryStreak = 0
    let thisWeek = 0
    let thisMonth = 0
    
    const today = new Date()
    const oneWeekAgo = new Date(today.getTime() - 7 * this.MILLISECONDS_IN_DAY)
    const oneMonthAgo = new Date(today.getTime() - 30 * this.MILLISECONDS_IN_DAY)
    
    // Calculate streaks and recent activity
    for (let index = contributions.length - 1; index >= 0; index--) {
      const day = contributions[index]
      const dayDate = new Date(day.date)
      
      // Calculate streaks
      if (day.count > 0) {
        temporaryStreak++
        if (index === contributions.length - 1) currentStreak = temporaryStreak
      } else {
        longestStreak = Math.max(longestStreak, temporaryStreak)
        if (index === contributions.length - 1) currentStreak = 0
        temporaryStreak = 0
      }
      
      // This week contributions
      if (dayDate >= oneWeekAgo) {
        thisWeek += day.count
      }
      
      // This month contributions
      if (dayDate >= oneMonthAgo) {
        thisMonth += day.count
      }
    }
    
    longestStreak = Math.max(longestStreak, temporaryStreak)
    
    return {
      totalContributions,
      currentStreak,
      longestStreak,
      thisWeek,
      thisMonth
    }
  }
}
