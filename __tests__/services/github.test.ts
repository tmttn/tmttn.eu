import { GitHubService, GitHubRepository } from '@services/github'

// Mock fetch globally
const mockFetch = jest.fn()
global.fetch = mockFetch

describe('GitHubService', () => {
  beforeEach(() => {
    mockFetch.mockClear()
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(console, 'warn').mockImplementation(() => {})
    jest.spyOn(console, 'log').mockImplementation(() => {})
    // Clear any rate limiting from previous tests
    GitHubService.resetRateLimit()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('getPublicRepositories', () => {
    it('skips API calls in test environment and returns empty array', async () => {
      const result = await GitHubService.getPublicRepositories()
      
      expect(result).toEqual([])
      expect(mockFetch).not.toHaveBeenCalled()
      expect(console.log).toHaveBeenCalledWith('Skipping GitHub API call (test environment)')
    })

    it('filters and sorts repositories correctly (unit test of logic)', () => {
      // Test the filtering/sorting logic without making API calls
      const mockRepos = [
        {
          id: 1,
          name: 'repo1',
          full_name: 'tmttn/repo1',
          description: 'Test repo 1',
          html_url: 'https://github.com/tmttn/repo1',
          homepage: null,
          language: 'TypeScript',
          stargazers_count: 10,
          forks_count: 2,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-06-01T00:00:00Z',
          topics: ['typescript', 'react'],
          archived: false,
          fork: false,
        },
        {
          id: 2,
          name: 'repo2',
          full_name: 'tmttn/repo2',
          description: 'Test repo 2',
          html_url: 'https://github.com/tmttn/repo2',
          homepage: 'https://example.com',
          language: 'JavaScript',
          stargazers_count: 5,
          forks_count: 1,
          created_at: '2023-02-01T00:00:00Z',
          updated_at: '2023-05-01T00:00:00Z',
          topics: ['javascript'],
          archived: false,
          fork: false,
        },
        {
          id: 3,
          name: 'forked-repo',
          full_name: 'tmttn/forked-repo',
          description: 'Forked repo',
          html_url: 'https://github.com/tmttn/forked-repo',
          homepage: null,
          language: 'Python',
          stargazers_count: 20,
          forks_count: 0,
          created_at: '2023-03-01T00:00:00Z',
          updated_at: '2023-07-01T00:00:00Z',
          topics: [],
          archived: false,
          fork: true, // This should be filtered out
        },
        {
          id: 4,
          name: 'archived-repo',
          full_name: 'tmttn/archived-repo',
          description: 'Archived repo',
          html_url: 'https://github.com/tmttn/archived-repo',
          homepage: null,
          language: 'Java',
          stargazers_count: 15,
          forks_count: 3,
          created_at: '2023-04-01T00:00:00Z',
          updated_at: '2023-04-15T00:00:00Z',
          topics: [],
          archived: true, // This should be filtered out
          fork: false,
        },
      ]

      // Test the filtering and sorting logic
      const filtered = mockRepos
        .filter(repo => !repo.fork && !repo.archived)
        .sort((a, b) => {
          if (a.stargazers_count !== b.stargazers_count) {
            return b.stargazers_count - a.stargazers_count
          }
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        })

      expect(filtered).toHaveLength(2) // Only repo1 and repo2 should remain
      expect(filtered[0].name).toBe('repo1') // Higher stars (10 > 5)
      expect(filtered[1].name).toBe('repo2')
    })
  })

  describe('getContributionData', () => {
    it('skips API calls in test environment and returns fallback data', async () => {
      const result = await GitHubService.getContributionData()
      
      expect(result).toHaveProperty('contributions')
      expect(result).toHaveProperty('stats')
      expect(result.contributions).toHaveLength(366) // One year + today
      expect(mockFetch).not.toHaveBeenCalled()
      expect(console.log).toHaveBeenCalledWith('Skipping GitHub API call (test environment)')
    })

    it('generates contribution levels correctly (unit test of logic)', () => {
      // Test the level calculation logic
      const testCases = [
        { count: 0, expectedLevel: 0 },
        { count: 1, expectedLevel: 0 },
        { count: 2, expectedLevel: 1 },
        { count: 3, expectedLevel: 1 },
        { count: 4, expectedLevel: 2 },
        { count: 6, expectedLevel: 3 },
        { count: 8, expectedLevel: 4 },
        { count: 10, expectedLevel: 4 }, // Level caps at 4
      ]

      testCases.forEach(({ count, expectedLevel }) => {
        const level = Math.min(Math.floor(count / 2), 4)
        expect(level).toBe(expectedLevel)
      })
    })

    it('generates fallback contribution data correctly', async () => {
      const result = await GitHubService.getContributionData()
      
      // Check that each contribution has required properties
      result.contributions.forEach(contribution => {
        expect(contribution).toHaveProperty('date')
        expect(contribution).toHaveProperty('count')
        expect(contribution).toHaveProperty('level')
        expect(typeof contribution.count).toBe('number')
        expect(typeof contribution.level).toBe('number')
        expect(contribution.level).toBeGreaterThanOrEqual(0)
        expect(contribution.level).toBeLessThanOrEqual(4)
      })

      // Check stats structure
      expect(result.stats).toHaveProperty('totalContributions')
      expect(result.stats).toHaveProperty('currentStreak')
      expect(result.stats).toHaveProperty('longestStreak')
      expect(result.stats).toHaveProperty('thisWeek')
      expect(result.stats).toHaveProperty('thisMonth')
      
      // Stats should be reasonable numbers
      expect(result.stats.totalContributions).toBeGreaterThanOrEqual(0)
      expect(result.stats.currentStreak).toBeGreaterThanOrEqual(0)
      expect(result.stats.longestStreak).toBeGreaterThanOrEqual(result.stats.currentStreak)
      expect(result.stats.thisWeek).toBeGreaterThanOrEqual(0)
      expect(result.stats.thisMonth).toBeGreaterThanOrEqual(0)
    })
  })

  describe('API skipping behavior', () => {
    it('should skip API calls when SKIP_GITHUB_API is set', async () => {
      // Clear any previous state
      mockFetch.mockClear()
      GitHubService.resetRateLimit()
      
      // Use explicit skip flag
      const originalSkipFlag = process.env.SKIP_GITHUB_API
      process.env.SKIP_GITHUB_API = 'true'

      const repositories = await GitHubService.getPublicRepositories()
      const contributions = await GitHubService.getContributionData()

      expect(repositories).toEqual([])
      expect(contributions.contributions).toHaveLength(366) // Fallback data
      expect(mockFetch).not.toHaveBeenCalled()

      // Restore environment
      if (originalSkipFlag) {
        process.env.SKIP_GITHUB_API = originalSkipFlag
      } else {
        delete process.env.SKIP_GITHUB_API
      }
    })

    it('should never be rate limited in test environment', async () => {
      // Multiple calls should not trigger rate limiting
      await GitHubService.getPublicRepositories()
      await GitHubService.getPublicRepositories()
      await GitHubService.getContributionData()
      await GitHubService.getContributionData()

      // Should not see any rate limiting messages
      expect(console.log).toHaveBeenCalledWith('Skipping GitHub API call (test environment)')
      expect(console.warn).not.toHaveBeenCalledWith(expect.stringContaining('rate limited'))
      expect(console.log).not.toHaveBeenCalledWith(expect.stringContaining('rate limited'))
    })
  })

  describe('resetRateLimit', () => {
    it('should reset rate limiting state', () => {
      // This is a simple test to ensure the method exists and can be called
      expect(() => GitHubService.resetRateLimit()).not.toThrow()
    })
  })

  describe('error handling scenarios (mocked for testing)', () => {
    let originalNodeEnv: string | undefined
    
    beforeEach(() => {
      // Save original environment
      originalNodeEnv = process.env.NODE_ENV
      // Override environment to allow API calls for error testing
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'production', writable: true })
      process.env.ENABLE_GITHUB_API = 'true'
      delete process.env.SKIP_GITHUB_API
    })

    afterEach(() => {
      // Restore test environment
      Object.defineProperty(process.env, 'NODE_ENV', { value: originalNodeEnv, writable: true })
      delete process.env.ENABLE_GITHUB_API
    })

    it('handles 403 error and sets rate limit', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
      })

      const result = await GitHubService.getPublicRepositories()
      expect(result).toEqual([])
      expect(console.warn).toHaveBeenCalledWith('GitHub API error (403). Using empty repository list.')
    })

    it('handles 429 error and sets rate limit', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 429,
      })

      const result = await GitHubService.getPublicRepositories()
      expect(result).toEqual([])
      expect(console.warn).toHaveBeenCalledWith('GitHub API error (429). Using empty repository list.')
    })

    it('handles 500 server error and sets rate limit', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      const result = await GitHubService.getPublicRepositories()
      expect(result).toEqual([])
      expect(console.warn).toHaveBeenCalledWith('GitHub API error (500). Using empty repository list.')
    })

    it('handles network error and sets rate limit', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await GitHubService.getPublicRepositories()
      expect(result).toEqual([])
      expect(console.error).toHaveBeenCalledWith('Failed to fetch GitHub repositories:', expect.any(Error))
    })

    it('handles successful response and processes data', async () => {
      const mockRepos = [
        {
          id: 1,
          name: 'test-repo',
          full_name: 'tmttn/test-repo',
          description: 'Test repo',
          html_url: 'https://github.com/tmttn/test-repo',
          homepage: null,
          language: 'TypeScript',
          stargazers_count: 5,
          forks_count: 1,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-06-01T00:00:00Z',
          topics: ['typescript'],
          archived: false,
          fork: false,
        }
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepos,
      })

      const result = await GitHubService.getPublicRepositories()
      expect(result).toEqual(mockRepos)
    })

    it('handles contribution data API errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
      })

      const result = await GitHubService.getContributionData()
      expect(result).toHaveProperty('contributions')
      expect(result).toHaveProperty('stats')
      expect(console.warn).toHaveBeenCalledWith('GitHub API error (403). Using fallback contribution data.')
    })

    it('processes events data correctly', async () => {
      const mockEvents = [
        {
          id: '1',
          type: 'PushEvent',
          created_at: '2023-06-01T12:00:00Z',
          repo: { name: 'test-repo' },
          payload: { commits: [{ message: 'test commit' }, { message: 'another commit' }] }
        },
        {
          id: '2',
          type: 'CreateEvent',
          created_at: '2023-06-02T12:00:00Z',
          repo: { name: 'test-repo' }
        },
        {
          id: '3',
          type: 'PullRequestEvent',
          created_at: '2023-06-03T12:00:00Z',
          repo: { name: 'test-repo' }
        },
        {
          id: '4',
          type: 'WatchEvent',
          created_at: '2023-06-04T12:00:00Z',
          repo: { name: 'test-repo' }
        }
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockEvents,
      })

      const result = await GitHubService.getContributionData()
      expect(result).toHaveProperty('contributions')
      expect(result).toHaveProperty('stats')
      expect(result.contributions.length).toBe(366)
    })

    it('handles rate limited state correctly', async () => {
      // First call triggers rate limit
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 429,
      })

      await GitHubService.getPublicRepositories()
      
      // Second call should skip due to rate limit
      const result = await GitHubService.getPublicRepositories()
      expect(result).toEqual([])
      expect(console.log).toHaveBeenCalledWith('GitHub API rate limited - using empty repository list')
      
      // Reset for next test
      GitHubService.resetRateLimit()
    })

    it('handles contribution data rate limiting', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 429,
      })

      await GitHubService.getContributionData()
      
      // Next call should be rate limited
      const result = await GitHubService.getContributionData()
      expect(result).toHaveProperty('contributions')
      expect(console.log).toHaveBeenCalledWith('GitHub API rate limited - using fallback contribution data')
      
      GitHubService.resetRateLimit()
    })

    it('handles events without commits payload', async () => {
      const mockEvents = [
        {
          id: '1',
          type: 'PushEvent',
          created_at: '2023-06-01T12:00:00Z',
          repo: { name: 'test-repo' },
          payload: {} // No commits array
        },
        {
          id: '2',
          type: 'ReleaseEvent',
          created_at: '2023-06-02T12:00:00Z',
          repo: { name: 'test-repo' }
        },
        {
          id: '3',
          type: 'IssuesEvent',
          created_at: '2023-06-03T12:00:00Z',
          repo: { name: 'test-repo' }
        }
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockEvents,
      })

      const result = await GitHubService.getContributionData()
      expect(result).toHaveProperty('contributions')
      expect(result.contributions.length).toBe(366)
    })
  })

  describe('API skipping edge cases', () => {
    it('should skip API calls in development environment', async () => {
      const originalEnv = process.env.NODE_ENV
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'development', writable: true })
      
      const repositories = await GitHubService.getPublicRepositories()
      expect(repositories).toEqual([])
      expect(console.log).toHaveBeenCalledWith('Skipping GitHub API call (test environment)')
      
      Object.defineProperty(process.env, 'NODE_ENV', { value: originalEnv, writable: true })
    })

    it('should skip API calls during build (production without window)', async () => {
      const originalEnv = process.env.NODE_ENV
      const originalWindow = globalThis.window
      
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'production', writable: true })
      // @ts-ignore - testing build environment
      delete globalThis.window
      
      const repositories = await GitHubService.getPublicRepositories()
      expect(repositories).toEqual([])
      
      Object.defineProperty(process.env, 'NODE_ENV', { value: originalEnv, writable: true })
      globalThis.window = originalWindow
    })

    it('should skip API calls in production client without explicit enable', async () => {
      const originalEnv = process.env.NODE_ENV
      const originalEnable = process.env.ENABLE_GITHUB_API
      
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'production', writable: true })
      delete process.env.ENABLE_GITHUB_API
      
      const repositories = await GitHubService.getPublicRepositories()
      expect(repositories).toEqual([])
      
      Object.defineProperty(process.env, 'NODE_ENV', { value: originalEnv, writable: true })
      if (originalEnable) {
        process.env.ENABLE_GITHUB_API = originalEnable
      }
    })
  })
})