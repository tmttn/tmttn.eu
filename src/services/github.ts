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

export class GitHubService {
  private static readonly API_BASE = 'https://api.github.com'
  private static readonly USERNAME = 'tmttn'

  static async getPublicRepositories(): Promise<GitHubRepository[]> {
    try {
      const response = await fetch(
        `${this.API_BASE}/users/${this.USERNAME}/repos?type=public&sort=updated&per_page=100`
      )
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
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
    } catch (error) {
      console.error('Failed to fetch GitHub repositories:', error)
      return []
    }
  }
}