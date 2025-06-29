import { GitHubService, GitHubRepository } from '@services/github'

// Mock fetch globally
const mockFetch = jest.fn()
global.fetch = mockFetch

describe('GitHubService', () => {
  beforeEach(() => {
    mockFetch.mockClear()
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('getPublicRepositories', () => {
    const mockRepos: GitHubRepository[] = [
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

    it('fetches and filters repositories correctly', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepos,
      })

      const result = await GitHubService.getPublicRepositories()

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.github.com/users/tmttn/repos?type=public&sort=updated&per_page=100'
      )

      // Should filter out forks and archived repos
      expect(result).toHaveLength(2)
      expect(result[0].name).toBe('repo1') // Higher stars (10 > 5)
      expect(result[1].name).toBe('repo2')
      
      // Verify sorting by stars then by updated date
      expect(result[0].stargazers_count).toBeGreaterThan(result[1].stargazers_count)
    })

    it('sorts repositories by stars then by updated date', async () => {
      const reposWithSameStars: GitHubRepository[] = [
        {
          ...mockRepos[0],
          stargazers_count: 5,
          updated_at: '2023-05-01T00:00:00Z',
        },
        {
          ...mockRepos[1],
          stargazers_count: 5,
          updated_at: '2023-06-01T00:00:00Z', // More recent
        },
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => reposWithSameStars,
      })

      const result = await GitHubService.getPublicRepositories()

      expect(result[0].updated_at).toBe('2023-06-01T00:00:00Z')
      expect(result[1].updated_at).toBe('2023-05-01T00:00:00Z')
    })

    it('handles API errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      })

      const result = await GitHubService.getPublicRepositories()

      expect(result).toEqual([])
      expect(console.error).toHaveBeenCalledWith(
        'Failed to fetch GitHub repositories:',
        expect.any(Error)
      )
    })

    it('handles network errors gracefully', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await GitHubService.getPublicRepositories()

      expect(result).toEqual([])
      expect(console.error).toHaveBeenCalledWith(
        'Failed to fetch GitHub repositories:',
        expect.any(Error)
      )
    })
  })

  describe('getContributionData', () => {
    const mockEvents = [
      {
        type: 'PushEvent',
        created_at: '2023-06-01T10:00:00Z',
        payload: {
          commits: [{ sha: 'abc123' }, { sha: 'def456' }],
        },
      },
      {
        type: 'CreateEvent',
        created_at: '2023-06-02T15:30:00Z',
        payload: {},
      },
      {
        type: 'PullRequestEvent',
        created_at: '2023-06-03T09:45:00Z',
        payload: {},
      },
    ]

    it('fetches and processes contribution data correctly', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockEvents,
      })

      const result = await GitHubService.getContributionData()

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.github.com/users/tmttn/events/public?per_page=100'
      )

      expect(result).toHaveProperty('contributions')
      expect(result).toHaveProperty('stats')
      
      expect(Array.isArray(result.contributions)).toBe(true)
      expect(result.contributions.length).toBe(366) // One year + today
      
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
    })

    it('generates contribution levels correctly', async () => {
      const heavyActivityEvents = Array(10).fill(null).map((_, i) => ({
        type: 'PushEvent',
        created_at: new Date().toISOString(),
        payload: {
          commits: Array(5).fill(null).map((_, j) => ({ sha: `commit${i}${j}` })),
        },
      }))

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => heavyActivityEvents,
      })

      const result = await GitHubService.getContributionData()
      
      // Find today's contribution
      const today = new Date().toISOString().split('T')[0]
      const todayContribution = result.contributions.find(c => c.date === today)
      
      expect(todayContribution).toBeDefined()
      expect(todayContribution!.count).toBeGreaterThan(0)
      expect(todayContribution!.level).toBeGreaterThanOrEqual(0)
    })

    it('handles API errors and provides fallback data', async () => {
      // Mock console.warn to suppress the warning output during tests
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
      })

      const result = await GitHubService.getContributionData()

      expect(result).toHaveProperty('contributions')
      expect(result).toHaveProperty('stats')
      expect(result.contributions.length).toBe(366)
      
      // Restore console.warn
      consoleSpy.mockRestore()
    })

    it('handles network errors and provides fallback data', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await GitHubService.getContributionData()

      expect(result).toHaveProperty('contributions')
      expect(result).toHaveProperty('stats')
      expect(console.error).toHaveBeenCalledWith(
        'Failed to fetch GitHub contributions:',
        expect.any(Error)
      )
    })
  })

  describe('contribution stats calculation', () => {
    it('calculates stats correctly with realistic data', async () => {
      // Mock consistent activity for testing
      const consistentEvents = Array(30).fill(null).map((_, i) => ({
        type: 'PushEvent',
        created_at: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
        payload: {
          commits: [{ sha: `commit${i}` }],
        },
      }))

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => consistentEvents,
      })

      const result = await GitHubService.getContributionData()

      expect(result.stats.totalContributions).toBeGreaterThan(0)
      expect(result.stats.currentStreak).toBeGreaterThanOrEqual(0)
      expect(result.stats.longestStreak).toBeGreaterThanOrEqual(result.stats.currentStreak)
      expect(result.stats.thisWeek).toBeGreaterThanOrEqual(0)
      expect(result.stats.thisMonth).toBeGreaterThanOrEqual(result.stats.thisWeek)
      expect(result.stats.thisMonth).toBeLessThanOrEqual(result.stats.totalContributions)
    })
  })
})