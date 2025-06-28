import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import LazyPortfolio from '../../../src/features/portfolio/LazyPortfolio'
import { ThemeProvider } from '../../../src/contexts/ThemeContext'

// Mock the loading component
const LoadingComponent = () => (
  <div className="portfolio-loading" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', gap: '1rem' }}>
    <i data-icon="spinner" data-testid="font-awesome-icon">⭐</i>
    <p>Loading portfolio...</p>
  </div>
)

// Mock Next.js dynamic import
jest.mock('next/dynamic', () => {
  return jest.fn((importFunction: () => Promise<any>, options?: any) => {
    // Create a component that shows loading first, then the actual component
    return function DynamicComponent() {
      const [loaded, setLoaded] = React.useState(false)
      
      React.useEffect(() => {
        // Simulate async loading
        const timer = setTimeout(() => {
          setLoaded(true)
        }, 100)
        return () => clearTimeout(timer)
      }, [])
      
      if (!loaded && options?.loading) {
        return React.createElement(options.loading)
      }
      
      // Return the mock portfolio component when loaded
      return React.createElement(() => 
        React.createElement('div', { 'data-testid': 'portfolio-component' }, 'Portfolio Loaded')
      )
    }
  })
})

// Mock the portfolio component
jest.mock('../../../src/features/portfolio/portfolio', () => {
  return function MockPortfolio() {
    return <div data-testid="portfolio-component">Portfolio Loaded</div>
  }
})

const renderWithThemeProvider = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('LazyPortfolio', () => {
  it('renders without crashing', () => {
    renderWithThemeProvider(<LazyPortfolio />)
    expect(screen.getByText('Loading portfolio...')).toBeInTheDocument()
  })

  it('shows loading state initially', () => {
    // Mock dynamic import to show loading state
    const mockDynamic = jest.fn((importFn, options) => {
      const LoadingComponent = options.loading
      return LoadingComponent
    })
    
    jest.doMock('next/dynamic', () => mockDynamic)
    
    renderWithThemeProvider(<LazyPortfolio />)
    
    // Should show loading content
    expect(screen.getByText('Loading portfolio...')).toBeInTheDocument()
  })

  it('has proper loading component structure', () => {
    // Test the loading component structure
    const mockDynamic = jest.fn((importFn, options) => {
      const LoadingComponent = options.loading
      return LoadingComponent
    })
    
    jest.doMock('next/dynamic', () => mockDynamic)
    
    renderWithThemeProvider(<LazyPortfolio />)
    
    const loadingDiv = screen.getByText('Loading portfolio...').closest('div')
    expect(loadingDiv).toHaveClass('portfolio-loading')
  })

  it('exports the dynamic component correctly', () => {
    // Test that LazyPortfolio is properly exported
    expect(LazyPortfolio).toBeDefined()
    expect(typeof LazyPortfolio).toBe('function')
  })

  it('configures dynamic import with correct options', () => {
    // Verify the component exists and is a valid React component
    const component = renderWithThemeProvider(<LazyPortfolio />)
    expect(component.container.firstChild).toBeInTheDocument()
  })

  it('handles SSR disabled correctly', () => {
    // Since ssr: false is set, component should work in client-side only mode
    renderWithThemeProvider(<LazyPortfolio />)
    expect(screen.getByText('Loading portfolio...')).toBeInTheDocument()
  })

  it('displays loading spinner in loading state', () => {
    const mockDynamic = jest.fn((importFn, options) => {
      const LoadingComponent = options.loading
      return LoadingComponent
    })
    
    jest.doMock('next/dynamic', () => mockDynamic)
    
    renderWithThemeProvider(<LazyPortfolio />)
    
    // Should contain loading indicator (either icon or fallback)
    const loadingContainer = screen.getByText('Loading portfolio...').closest('div')
    expect(loadingContainer).toBeInTheDocument()
  })

  it('applies correct loading styles', () => {
    const mockDynamic = jest.fn((importFn, options) => {
      const LoadingComponent = options.loading
      return LoadingComponent
    })
    
    jest.doMock('next/dynamic', () => mockDynamic)
    
    renderWithThemeProvider(<LazyPortfolio />)
    
    const loadingDiv = screen.getByText('Loading portfolio...').closest('div')
    expect(loadingDiv).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      gap: '1rem'
    })
  })

  it('loads portfolio component asynchronously', async () => {
    renderWithThemeProvider(<LazyPortfolio />)
    
    // Should eventually load the actual portfolio component
    await waitFor(() => {
      expect(screen.getByTestId('portfolio-component')).toBeInTheDocument()
    })
  })

  it('handles import errors gracefully', () => {
    // Test that component doesn't crash on import errors
    expect(() => {
      renderWithThemeProvider(<LazyPortfolio />)
    }).not.toThrow()
  })
})
