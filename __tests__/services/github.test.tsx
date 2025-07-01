import { GitHubService } from '@services/github'

// Mock fetch globally
const mockFetch = jest.fn()
global.fetch = mockFetch

// Mock console methods to suppress test output
const consoleSpy = {
  log: jest.spyOn(console, 'log').mockImplementation(() => {}),
  warn: jest.spyOn(console, 'warn').mockImplementation(() => {}),
  error: jest.spyOn(console, 'error').mockImplementation(() => {}),
}

describe('GitHubService', () => {
  const originalWindow = globalThis.window

  beforeEach(() => {
    jest.clearAllMocks()
    GitHubService.resetRateLimit()
    // Reset environment variables
    process.env.NODE_ENV = 'test'
    delete process.env.ENABLE_GITHUB_API
    delete process.env.SKIP_GITHUB_API
    // Reset window
    if (originalWindow) {
      globalThis.window = originalWindow
    } else {
      delete (globalThis as any).window
    }
  })

  afterAll(() => {
    // Restore console methods
    Object.values(consoleSpy).forEach(spy => spy.mockRestore())
  })

  describe('getPublicRepositories', () => {
    const mockRepos = [
      {
        id: 1,
        name: 'test-repo',
        full_name: 'tmttn/test-repo',
        description: 'Test repository',
        html_url: 'https://github.com/tmttn/test-repo',
        homepage: null,
        language: 'TypeScript',
        stargazers_count: 5,
        forks_count: 2,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-06-01T00:00:00Z',
        topics: ['test'],
        archived: false,
        fork: false,
      },
    ]

    it('returns API_FAILURE when in test environment', async () => {
      process.env.NODE_ENV = 'test'
      
      const result = await GitHubService.getPublicRepositories()
      
      expect(result).toBe(GitHubService.API_FAILURE)
      // Console logging removed
    })

    it('returns API_FAILURE when in development environment', async () => {
      process.env.NODE_ENV = 'development'
      
      const result = await GitHubService.getPublicRepositories()
      
      expect(result).toBe(GitHubService.API_FAILURE)
      // Console logging removed
    })

    it('returns API_FAILURE when SKIP_GITHUB_API is true', async () => {
      process.env.NODE_ENV = 'production'
      process.env.SKIP_GITHUB_API = 'true'
      // Mock window to simulate client-side
      ;(globalThis as any).window = {}
      
      const result = await GitHubService.getPublicRepositories()
      
      expect(result).toBe(GitHubService.API_FAILURE)
      // Console logging removed
    })

    it('returns API_FAILURE when in production client without ENABLE_GITHUB_API', async () => {
      process.env.NODE_ENV = 'production'
      // Mock window to simulate client-side
      ;(globalThis as any).window = {}
      
      const result = await GitHubService.getPublicRepositories()
      
      expect(result).toBe(GitHubService.API_FAILURE)
    })

    it('makes API call when in production client with ENABLE_GITHUB_API=true', async () => {
      process.env.NODE_ENV = 'production'
      process.env.ENABLE_GITHUB_API = 'true'
      // Mock window to simulate client-side
      ;(globalThis as any).window = {}
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepos,
      })
      
      const result = await GitHubService.getPublicRepositories()
      
      expect(result).toEqual(mockRepos)
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.github.com/users/tmttn/repos?type=public&sort=updated&per_page=100'
      )
    })

    it('returns API_FAILURE on 403 error (forbidden)', async () => {
      process.env.NODE_ENV = 'production'
      process.env.ENABLE_GITHUB_API = 'true'
      ;(globalThis as any).window = {}
      
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
      })
      
      const result = await GitHubService.getPublicRepositories()
      
      expect(result).toBe(GitHubService.API_FAILURE)
      // Console logging removed
      
      // Check that rate limiting was applied
      const secondResult = await GitHubService.getPublicRepositories()
      expect(secondResult).toBe(GitHubService.API_FAILURE)
      // Console logging removed
    })

    it('returns API_FAILURE on 429 error (too many requests)', async () => {
      process.env.NODE_ENV = 'production'
      process.env.ENABLE_GITHUB_API = 'true'
      ;(globalThis as any).window = {}
      
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 429,
      })
      
      const result = await GitHubService.getPublicRepositories()
      
      expect(result).toBe(GitHubService.API_FAILURE)
      // Console logging removed
      
      // Check that rate limiting was applied
      const secondResult = await GitHubService.getPublicRepositories()
      expect(secondResult).toBe(GitHubService.API_FAILURE)
      // Console logging removed
    })

    it('returns API_FAILURE on 500 error (server error)', async () => {
      process.env.NODE_ENV = 'production'
      process.env.ENABLE_GITHUB_API = 'true'
      ;(globalThis as any).window = {}
      
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      })
      
      const result = await GitHubService.getPublicRepositories()
      
      expect(result).toBe(GitHubService.API_FAILURE)
      // Console logging removed
      
      // Check that rate limiting was applied
      const secondResult = await GitHubService.getPublicRepositories()
      expect(secondResult).toBe(GitHubService.API_FAILURE)
      // Console logging removed
    })

    it('returns API_FAILURE on 404 error without rate limiting', async () => {
      process.env.NODE_ENV = 'production'
      process.env.ENABLE_GITHUB_API = 'true'
      ;(globalThis as any).window = {}
      
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      })
      
      const result = await GitHubService.getPublicRepositories()
      
      expect(result).toBe(GitHubService.API_FAILURE)
      // Console logging removed
      
      // 404 should not trigger rate limiting, so second call should attempt API again
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepos,
      })
      
      const secondResult = await GitHubService.getPublicRepositories()
      expect(secondResult).toEqual(mockRepos)
    })

    it('returns API_FAILURE on network error', async () => {
      process.env.NODE_ENV = 'production'
      process.env.ENABLE_GITHUB_API = 'true'
      ;(globalThis as any).window = {}
      
      mockFetch.mockRejectedValueOnce(new Error('Network error'))
      
      const result = await GitHubService.getPublicRepositories()
      
      expect(result).toBe(GitHubService.API_FAILURE)
      // Console logging removed
      
      // Check that rate limiting was applied
      const secondResult = await GitHubService.getPublicRepositories()
      expect(secondResult).toBe(GitHubService.API_FAILURE)
      // Console logging removed
    })

    it('filters out forks and archived repositories', async () => {
      process.env.NODE_ENV = 'production'
      process.env.ENABLE_GITHUB_API = 'true'
      ;(globalThis as any).window = {}
      
      const reposWithForksAndArchived = [
        { ...mockRepos[0], id: 1, fork: false, archived: false },
        { ...mockRepos[0], id: 2, fork: true, archived: false },  // Should be filtered out
        { ...mockRepos[0], id: 3, fork: false, archived: true },  // Should be filtered out
        { ...mockRepos[0], id: 4, fork: true, archived: true },   // Should be filtered out
      ]
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => reposWithForksAndArchived,
      })
      
      const result = await GitHubService.getPublicRepositories()
      
      expect(result).toHaveLength(1)
      expect(result).toEqual([reposWithForksAndArchived[0]])
    })

    it('sorts repositories by stars then by updated date', async () => {
      process.env.NODE_ENV = 'production'
      process.env.ENABLE_GITHUB_API = 'true'
      ;(globalThis as any).window = {}
      
      const unsortedRepos = [
        { ...mockRepos[0], id: 1, stargazers_count: 5, updated_at: '2023-01-01T00:00:00Z' },
        { ...mockRepos[0], id: 2, stargazers_count: 10, updated_at: '2023-02-01T00:00:00Z' },
        { ...mockRepos[0], id: 3, stargazers_count: 5, updated_at: '2023-03-01T00:00:00Z' },
      ]
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => unsortedRepos,
      })
      
      const result = await GitHubService.getPublicRepositories()
      
      expect(result).toHaveLength(3)
      // Should be sorted by stars (10 first), then by updated date (newer first for same stars)
      expect(result[0].id).toBe(2) // 10 stars
      expect(result[1].id).toBe(3) // 5 stars, newer date
      expect(result[2].id).toBe(1) // 5 stars, older date
    })

    it('can reset rate limit for testing', async () => {
      process.env.NODE_ENV = 'production'
      process.env.ENABLE_GITHUB_API = 'true'
      ;(globalThis as any).window = {}
      
      // Trigger rate limit
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 429,
      })
      
      await GitHubService.getPublicRepositories()
      
      // Should be rate limited
      const rateLimitedResult = await GitHubService.getPublicRepositories()
      expect(rateLimitedResult).toBe(GitHubService.API_FAILURE)
      // Console logging removed
      
      // Reset rate limit
      GitHubService.resetRateLimit()
      
      // Should work again
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepos,
      })
      
      const result = await GitHubService.getPublicRepositories()
      expect(result).toEqual(mockRepos)
    })
  })
})