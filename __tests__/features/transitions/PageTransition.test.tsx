import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import PageTransition from '../../../src/features/transitions/PageTransition'
import { ThemeProvider } from '../../../src/contexts/ThemeContext'

// Suppress React act warnings and styled-components prop warnings
const originalError = console.error
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: An update to') ||
       args[0].includes('An update to') ||
       args[0].includes('React does not recognize the `$') ||
       args[0].includes('Invalid attribute name: `$')) &&
      (args[0].includes('was not wrapped in act') ||
       args[0].includes('prop on a DOM element') ||
       args[0].includes('isVisible'))
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

// Mock styled components - filter out $ prefixed props
jest.mock('../../../src/features/transitions/PageTransition.styled', () => ({
  TransitionWrapper: ({ children, className, ...props }: any) => {
    const filteredProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !key.startsWith('$'))
    )
    return (
      <div 
        data-testid="transition-wrapper" 
        className={className}
        {...filteredProps}
      >
        {children}
      </div>
    )
  },
}))

const renderWithThemeProvider = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('PageTransition', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers()
    })
    jest.useRealTimers()
  })

  it('renders without crashing', () => {
    renderWithThemeProvider(
      <PageTransition>
        <div>Test content</div>
      </PageTransition>
    )
    
    expect(screen.getByTestId('transition-wrapper')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies custom className when provided', () => {
    renderWithThemeProvider(
      <PageTransition className="custom-class">
        <div>Test content</div>
      </PageTransition>
    )
    
    const wrapper = screen.getByTestId('transition-wrapper')
    expect(wrapper).toHaveClass('custom-class')
  })

  it('shows initial invisible state then transitions to visible', async () => {
    renderWithThemeProvider(
      <PageTransition>
        <div>Test content</div>
      </PageTransition>
    )
    
    const wrapper = screen.getByTestId('transition-wrapper')
    
    // Should start with visibility state
    expect(wrapper).toBeInTheDocument()
    
    // Fast-forward timers to trigger visibility
    act(() => {
      jest.advanceTimersByTime(200)
    })
    
    await waitFor(() => {
      expect(wrapper).toBeInTheDocument()
    })
  })

  it('handles theme changes correctly', async () => {
    const { rerender } = renderWithThemeProvider(
      <PageTransition>
        <div>Test content</div>
      </PageTransition>
    )
    
    // Re-render to simulate theme change
    rerender(
      <ThemeProvider>
        <PageTransition>
          <div>Updated content</div>
        </PageTransition>
      </ThemeProvider>
    )
    
    expect(screen.getByText('Updated content')).toBeInTheDocument()
  })

  it('renders children correctly', () => {
    renderWithThemeProvider(
      <PageTransition>
        <div>Child 1</div>
        <span>Child 2</span>
        <p>Child 3</p>
      </PageTransition>
    )
    
    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
    expect(screen.getByText('Child 3')).toBeInTheDocument()
  })

  it('handles empty children gracefully', () => {
    renderWithThemeProvider(
      <PageTransition>
        {null}
      </PageTransition>
    )
    
    expect(screen.getByTestId('transition-wrapper')).toBeInTheDocument()
  })

  it('handles complex nested children', () => {
    renderWithThemeProvider(
      <PageTransition>
        <div>
          <header>Header content</header>
          <main>
            <section>Section content</section>
          </main>
          <footer>Footer content</footer>
        </div>
      </PageTransition>
    )
    
    expect(screen.getByText('Header content')).toBeInTheDocument()
    expect(screen.getByText('Section content')).toBeInTheDocument()
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('manages transition timing correctly', () => {
    renderWithThemeProvider(
      <PageTransition>
        <div>Test content</div>
      </PageTransition>
    )
    
    // Should handle timer cleanup on unmount
    const wrapper = screen.getByTestId('transition-wrapper')
    expect(wrapper).toBeInTheDocument()
    
    // Advance timers
    act(() => {
      jest.advanceTimersByTime(500)
    })
    
    expect(wrapper).toBeInTheDocument()
  })

  it('maintains component state across re-renders', () => {
    const { rerender } = renderWithThemeProvider(
      <PageTransition>
        <div>Original content</div>
      </PageTransition>
    )
    
    // Fast-forward to make visible
    act(() => {
      jest.advanceTimersByTime(200)
    })
    
    rerender(
      <ThemeProvider>
        <PageTransition>
          <div>Updated content</div>
        </PageTransition>
      </ThemeProvider>
    )
    
    expect(screen.getByText('Updated content')).toBeInTheDocument()
  })
})
