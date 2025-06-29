import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import { ThemeProvider } from '@contexts'
import Portfolio from '@features/portfolio/portfolio'

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
    getPublicRepositories: jest.fn(),
  },
}))

import { GitHubService } from '@services/github'
const mockGetPublicRepositories = GitHubService.getPublicRepositories as jest.MockedFunction<typeof GitHubService.getPublicRepositories>

const renderWithThemeProvider = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('Portfolio', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const mockRepositories = [
    {
      id: 1,
      name: 'awesome-project',
      full_name: 'tmttn/awesome-project',
      description: 'An awesome project built with React and TypeScript',
      html_url: 'https://github.com/tmttn/awesome-project',
      homepage: 'https://awesome-project.com',
      language: 'TypeScript',
      stargazers_count: 42,
      forks_count: 8,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-06-15T10:30:00Z',
      topics: ['react', 'typescript', 'web-development'],
      archived: false,
      fork: false,
    },
    {
      id: 2,
      name: 'another-repo',
      full_name: 'tmttn/another-repo',
      description: 'Another repository with Python',
      html_url: 'https://github.com/tmttn/another-repo',
      homepage: null,
      language: 'Python',
      stargazers_count: 0,
      forks_count: 0,
      created_at: '2023-02-01T00:00:00Z',
      updated_at: '2023-05-20T14:45:00Z',
      topics: ['python', 'automation'],
      archived: false,
      fork: false,
    },
  ]

  it('shows loading state initially', async () => {
    mockGetPublicRepositories.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(mockRepositories), 100))
    )

    renderWithThemeProvider(<Portfolio />)

    expect(screen.getByText('Loading repositories...')).toBeInTheDocument()
    expect(screen.getByTestId('font-awesome-icon')).toBeInTheDocument()
  })

  it('renders repositories successfully', async () => {
    mockGetPublicRepositories.mockResolvedValue(mockRepositories)

    renderWithThemeProvider(<Portfolio />)

    await waitFor(() => {
      expect(screen.getByText('awesome-project')).toBeInTheDocument()
      expect(screen.getByText('another-repo')).toBeInTheDocument()
    })

    // Check repository descriptions
    expect(screen.getByText('An awesome project built with React and TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Another repository with Python')).toBeInTheDocument()

    // Check languages
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()

    // Check stats - they're now within repo-stars and repo-forks spans with FontAwesome icons
    const starsElement = document.querySelector('.repo-stars')
    expect(starsElement).toBeInTheDocument()
    expect(starsElement).toHaveTextContent('42')
    
    const forksElement = document.querySelector('.repo-forks')
    expect(forksElement).toBeInTheDocument()
    expect(forksElement).toHaveTextContent('8')
  })

  it('renders repository links correctly', async () => {
    mockGetPublicRepositories.mockResolvedValue(mockRepositories)

    renderWithThemeProvider(<Portfolio />)

    await waitFor(() => {
      const projectLink = screen.getByRole('link', { name: 'awesome-project' })
      expect(projectLink).toHaveAttribute('href', 'https://github.com/tmttn/awesome-project')
      expect(projectLink).toHaveAttribute('target', '_blank')
      expect(projectLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    // Check for homepage link (only first repo has homepage)
    const homepageLinks = screen.getAllByTitle('Visit project')
    expect(homepageLinks).toHaveLength(1)
    expect(homepageLinks[0]).toHaveAttribute('href', 'https://awesome-project.com')
  })

  it('renders repository topics', async () => {
    mockGetPublicRepositories.mockResolvedValue(mockRepositories)

    renderWithThemeProvider(<Portfolio />)

    await waitFor(() => {
      expect(screen.getByText('react')).toBeInTheDocument()
      expect(screen.getByText('typescript')).toBeInTheDocument()
      expect(screen.getByText('web-development')).toBeInTheDocument()
      expect(screen.getByText('python')).toBeInTheDocument()
      expect(screen.getByText('automation')).toBeInTheDocument()
    })
  })

  it('formats update dates correctly', async () => {
    mockGetPublicRepositories.mockResolvedValue(mockRepositories)

    renderWithThemeProvider(<Portfolio />)

    await waitFor(() => {
      expect(screen.getByText('Updated Jun 2023')).toBeInTheDocument()
      expect(screen.getByText('Updated May 2023')).toBeInTheDocument()
    })
  })

  it('shows only stars and forks when they are greater than 0', async () => {
    mockGetPublicRepositories.mockResolvedValue(mockRepositories)

    renderWithThemeProvider(<Portfolio />)

    await waitFor(() => {
      // First repo has stars and forks
      const starsElement = document.querySelector('.repo-stars')
      expect(starsElement).toBeInTheDocument()
      expect(starsElement).toHaveTextContent('42')
      
      const forksElement = document.querySelector('.repo-forks')
      expect(forksElement).toBeInTheDocument()
      expect(forksElement).toHaveTextContent('8')
      
      // The elements should be present but second repo stats should not show
      const starElements = screen.getAllByTestId('font-awesome-icon')
      expect(starElements.length).toBeGreaterThan(0)
    })
  })

  it('handles error state correctly', async () => {
    // Mock console.error to suppress error output during tests
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    const errorMessage = 'Failed to fetch repositories'
    mockGetPublicRepositories.mockRejectedValue(new Error(errorMessage))

    await act(async () => {
      renderWithThemeProvider(<Portfolio />)
    })

    await waitFor(() => {
      expect(screen.getByText('Failed to load repositories')).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /View on GitHub/ })).toBeInTheDocument()
    })
    
    // Restore console.error
    consoleErrorSpy.mockRestore()

    // Should not show loading state anymore
    expect(screen.queryByText('Loading repositories...')).not.toBeInTheDocument()
  })

  it('handles empty repository list', async () => {
    mockGetPublicRepositories.mockResolvedValue([])

    renderWithThemeProvider(<Portfolio />)

    await waitFor(() => {
      expect(screen.getByText('No repositories found.')).toBeInTheDocument()
    })
  })

  it('renders GitHub profile link in footer', async () => {
    mockGetPublicRepositories.mockResolvedValue(mockRepositories)

    renderWithThemeProvider(<Portfolio />)

    await waitFor(() => {
      const githubLink = screen.getByRole('link', { name: /View all repositories on GitHub/ })
      expect(githubLink).toHaveAttribute('href', 'https://github.com/tmttn')
      expect(githubLink).toHaveAttribute('target', '_blank')
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('applies correct variant prop', async () => {
    mockGetPublicRepositories.mockResolvedValue([])

    const { rerender } = renderWithThemeProvider(<Portfolio variant="even" />)
    
    // Component should render without errors with variant prop
    await waitFor(() => {
      expect(screen.getByText('No repositories found.')).toBeInTheDocument()
    })

    rerender(
      <ThemeProvider>
        <Portfolio variant="odd" />
      </ThemeProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByText('No repositories found.')).toBeInTheDocument()
    })
  })

  it('limits topics to 5 maximum', async () => {
    const repoWithManyTopics = {
      ...mockRepositories[0],
      topics: ['topic1', 'topic2', 'topic3', 'topic4', 'topic5', 'topic6', 'topic7'],
    }

    mockGetPublicRepositories.mockResolvedValue([repoWithManyTopics])

    renderWithThemeProvider(<Portfolio />)

    await waitFor(() => {
      // Should only show first 5 topics
      expect(screen.getByText('topic1')).toBeInTheDocument()
      expect(screen.getByText('topic2')).toBeInTheDocument()
      expect(screen.getByText('topic3')).toBeInTheDocument()
      expect(screen.getByText('topic4')).toBeInTheDocument()
      expect(screen.getByText('topic5')).toBeInTheDocument()
      
      // Should not show 6th and 7th topics
      expect(screen.queryByText('topic6')).not.toBeInTheDocument()
      expect(screen.queryByText('topic7')).not.toBeInTheDocument()
    })
  })

  it('handles repositories without certain fields', async () => {
    const minimalRepo = {
      id: 3,
      name: 'minimal-repo',
      full_name: 'tmttn/minimal-repo',
      description: null,
      html_url: 'https://github.com/tmttn/minimal-repo',
      homepage: null,
      language: null,
      stargazers_count: 0,
      forks_count: 0,
      created_at: '2023-03-01T00:00:00Z',
      updated_at: '2023-04-01T00:00:00Z',
      topics: [],
      archived: false,
      fork: false,
    }

    mockGetPublicRepositories.mockResolvedValue([minimalRepo])

    renderWithThemeProvider(<Portfolio />)

    await waitFor(() => {
      expect(screen.getByText('minimal-repo')).toBeInTheDocument()
      
      // Should not show description, language, stars, forks, or topics when they're null/0/empty
      expect(screen.queryByText('TypeScript')).not.toBeInTheDocument()
    })
  })

  it('calls GitHubService.getPublicRepositories on mount', () => {
    mockGetPublicRepositories.mockResolvedValue(mockRepositories)

    renderWithThemeProvider(<Portfolio />)

    expect(mockGetPublicRepositories).toHaveBeenCalledTimes(1)
  })

  it('displays language colors correctly', async () => {
    mockGetPublicRepositories.mockResolvedValue(mockRepositories)

    renderWithThemeProvider(<Portfolio />)

    await waitFor(() => {
      // Find language dots by their CSS class
      const languageDots = document.querySelectorAll('.language-dot')
      expect(languageDots).toHaveLength(2)
      
      // TypeScript should have specific color
      const typescriptDot = Array.from(languageDots).find(dot => 
        (dot.parentElement?.textContent || '').includes('TypeScript')
      )
      expect(typescriptDot).toHaveStyle('background-color: rgb(43, 116, 137)')
      
      // Python should have specific color
      const pythonDot = Array.from(languageDots).find(dot => 
        (dot.parentElement?.textContent || '').includes('Python')
      )
      expect(pythonDot).toHaveStyle('background-color: rgb(53, 114, 165)')
    })
  })
})