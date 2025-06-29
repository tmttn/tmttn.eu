import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { ThemeProvider } from '@contexts'
import GitHubHeatmap from '@features/portfolio/GitHubHeatmap'

// Suppress React act warnings for async useEffect hooks in tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: An update to') ||
       args[0].includes('An update to')) &&
      args[0].includes('was not wrapped in act')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

// Mock GitHubService
jest.mock('@services/github', () => ({
  GitHubService: {
    getContributionData: jest.fn(),
  },
}))

import { GitHubService, ContributionDay, GitHubStats } from '@services/github'
const mockGetContributionData = GitHubService.getContributionData as jest.MockedFunction<typeof GitHubService.getContributionData>

const renderWithThemeProvider = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('GitHubHeatmap', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const mockContributionData = {
    contributions: [
      { date: '2023-06-01', count: 5, level: 2 },
      { date: '2023-06-02', count: 0, level: 0 },
      { date: '2023-06-03', count: 10, level: 4 },
    ],
    stats: {
      totalContributions: 150,
      currentStreak: 5,
      longestStreak: 25,
      thisWeek: 20,
      thisMonth: 75,
    },
  }

  it('shows loading state initially', async () => {
    mockGetContributionData.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(mockContributionData), 100))
    )

    renderWithThemeProvider(<GitHubHeatmap />)

    expect(screen.getByText('Loading GitHub activity...')).toBeInTheDocument()
    // The loading icon is mocked and doesn't have an aria-label
    expect(screen.getByTestId('font-awesome-icon')).toBeInTheDocument()
  })

  it('renders contribution heatmap successfully', async () => {
    mockGetContributionData.mockResolvedValue(mockContributionData)

    renderWithThemeProvider(<GitHubHeatmap />)

    await waitFor(() => {
      expect(screen.getByText('GitHub Activity - Past Year')).toBeInTheDocument()
    })

    // Check that contribution days are rendered (should match our mock data length)
    const contributionDays = screen.getAllByTitle(/contributions/)
    expect(contributionDays.length).toBeGreaterThan(0)

    // Check specific tooltip content from our mock
    expect(screen.getByTitle('2023-06-01: 5 contributions')).toBeInTheDocument()
    expect(screen.getByTitle('2023-06-02: 0 contributions')).toBeInTheDocument()
    expect(screen.getByTitle('2023-06-03: 10 contributions')).toBeInTheDocument()
  })

  it('renders heatmap legend correctly', async () => {
    mockGetContributionData.mockResolvedValue(mockContributionData)

    renderWithThemeProvider(<GitHubHeatmap />)

    await waitFor(() => {
      expect(screen.getByText('Less')).toBeInTheDocument()
      expect(screen.getByText('More')).toBeInTheDocument()
    })
  })

  it('renders statistics correctly', async () => {
    mockGetContributionData.mockResolvedValue(mockContributionData)

    renderWithThemeProvider(<GitHubHeatmap />)

    await waitFor(() => {
      expect(screen.getByText('150')).toBeInTheDocument()
      expect(screen.getByText('Total')).toBeInTheDocument()
      
      expect(screen.getByText('5')).toBeInTheDocument()
      expect(screen.getByText('Current Streak')).toBeInTheDocument()
      
      expect(screen.getByText('25')).toBeInTheDocument()
      expect(screen.getByText('Longest Streak')).toBeInTheDocument()
      
      expect(screen.getByText('20')).toBeInTheDocument()
      expect(screen.getByText('This Week')).toBeInTheDocument()
      
      expect(screen.getByText('75')).toBeInTheDocument()
      expect(screen.getByText('This Month')).toBeInTheDocument()
    })
  })

  it('handles error state correctly', async () => {
    // Mock console.error to suppress error output during tests
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    const errorMessage = 'Failed to fetch contributions'
    mockGetContributionData.mockRejectedValue(new Error(errorMessage))

    renderWithThemeProvider(<GitHubHeatmap />)

    await waitFor(() => {
      expect(screen.getByText('GitHub Activity')).toBeInTheDocument()
      expect(screen.getByText('Failed to load GitHub activity. Please try again later.')).toBeInTheDocument()
    })

    // Should not show loading state anymore
    expect(screen.queryByText('Loading GitHub activity...')).not.toBeInTheDocument()
    
    // Should not show stats when error occurs
    
    // Restore console.error
    consoleErrorSpy.mockRestore()
    expect(screen.queryByText('Total')).not.toBeInTheDocument()
  })

  it('handles empty contribution data', async () => {
    const emptyData = {
      contributions: [],
      stats: {
        totalContributions: 0,
        currentStreak: 0,
        longestStreak: 0,
        thisWeek: 0,
        thisMonth: 0,
      },
    }

    mockGetContributionData.mockResolvedValue(emptyData)

    renderWithThemeProvider(<GitHubHeatmap />)

    await waitFor(() => {
      expect(screen.getByText('GitHub Activity - Past Year')).toBeInTheDocument()
      // Check that "Total" stat shows 0 (there are multiple 0s, so find the one next to "Total")
      expect(screen.getByText('Total')).toBeInTheDocument()
      const totalStat = screen.getByText('Total').previousElementSibling
      expect(totalStat).toHaveTextContent('0')
    })
  })

  it('displays correct GitHub icon', async () => {
    mockGetContributionData.mockResolvedValue(mockContributionData)

    renderWithThemeProvider(<GitHubHeatmap />)

    await waitFor(() => {
      // Should show GitHub icon in the header
      expect(screen.getByText('GitHub Activity - Past Year')).toBeInTheDocument()
    })
  })

  it('handles loading state transition correctly', async () => {
    let resolvePromise: (value: { contributions: ContributionDay[]; stats: GitHubStats }) => void
    const promise = new Promise<{ contributions: ContributionDay[]; stats: GitHubStats }>(resolve => {
      resolvePromise = resolve
    })

    mockGetContributionData.mockReturnValue(promise)

    renderWithThemeProvider(<GitHubHeatmap />)

    // Should show loading initially
    expect(screen.getByText('Loading GitHub activity...')).toBeInTheDocument()

    // Resolve the promise
    resolvePromise!(mockContributionData)

    await waitFor(() => {
      expect(screen.queryByText('Loading GitHub activity...')).not.toBeInTheDocument()
      expect(screen.getByText('GitHub Activity - Past Year')).toBeInTheDocument()
    })
  })

  it('calls GitHubService.getContributionData on mount', () => {
    mockGetContributionData.mockResolvedValue(mockContributionData)

    renderWithThemeProvider(<GitHubHeatmap />)

    expect(mockGetContributionData).toHaveBeenCalledTimes(1)
  })

  it('does not render stats when stats data is null', async () => {
    const dataWithoutStats = {
      contributions: mockContributionData.contributions,
      stats: null,
    }

    mockGetContributionData.mockResolvedValue(dataWithoutStats as any)

    renderWithThemeProvider(<GitHubHeatmap />)

    await waitFor(() => {
      expect(screen.getByText('GitHub Activity - Past Year')).toBeInTheDocument()
    })

    // Should not render stats section
    expect(screen.queryByText('Total')).not.toBeInTheDocument()
    expect(screen.queryByText('Current Streak')).not.toBeInTheDocument()
  })
})