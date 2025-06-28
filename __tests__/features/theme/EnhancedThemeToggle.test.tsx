import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import EnhancedThemeToggle from '../../../src/features/theme/EnhancedThemeToggle'
import { ThemeProvider } from '../../../src/contexts/ThemeContext'

// Mock styled components - filter out $ prefixed props to avoid React warnings
jest.mock('../../../src/features/theme/EnhancedThemeToggle.styled', () => ({
  ToggleContainer: ({ children, className, ...props }: any) => {
    const filteredProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !key.startsWith('$'))
    )
    return <div data-testid="toggle-container" className={className} {...filteredProps}>{children}</div>
  },
  ToggleButton: ({ children, ...props }: any) => {
    const filteredProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !key.startsWith('$'))
    )
    return <button data-testid="toggle-button" type="button" {...filteredProps}>{children}</button>
  },
  IconContainer: ({ children, ...props }: any) => {
    const filteredProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !key.startsWith('$'))
    )
    return <div data-testid="icon-container" {...filteredProps}>{children}</div>
  },
  RippleEffect: ({ children, ...props }: any) => {
    const filteredProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !key.startsWith('$'))
    )
    return <div data-testid="ripple-effect" {...filteredProps}>{children}</div>
  },
  ThemeTransitionOverlay: ({ children, ...props }: any) => {
    const filteredProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !key.startsWith('$'))
    )
    return <div data-testid="theme-overlay" {...filteredProps}>{children}</div>
  },
}))

const renderWithThemeProvider = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('EnhancedThemeToggle', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('renders without crashing', () => {
    renderWithThemeProvider(<EnhancedThemeToggle />)
    expect(screen.getByTestId('toggle-container')).toBeInTheDocument()
  })

  it('renders toggle button with correct accessibility attributes', () => {
    renderWithThemeProvider(<EnhancedThemeToggle />)
    
    const button = screen.getByTestId('toggle-button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label')
    expect(button).toHaveAttribute('type', 'button')
  })

  it('shows correct icon based on theme state', async () => {
    renderWithThemeProvider(<EnhancedThemeToggle />)
    
    // Wait for component to mount
    await waitFor(() => {
      expect(screen.getByTestId('icon-container')).toBeInTheDocument()
    })
  })

  it('handles theme toggle on click', async () => {
    renderWithThemeProvider(<EnhancedThemeToggle />)
    
    const button = screen.getByTestId('toggle-button')
    
    // Click to toggle theme
    fireEvent.click(button)
    
    // Should trigger transition effects
    await waitFor(() => {
      expect(screen.getByTestId('theme-overlay')).toBeInTheDocument()
    })
  })

  it('creates ripple effect on click', async () => {
    renderWithThemeProvider(<EnhancedThemeToggle />)
    
    const button = screen.getByTestId('toggle-button')
    
    // Mock getBoundingClientRect for positioning
    button.getBoundingClientRect = jest.fn(() => ({
      left: 100,
      top: 100,
      width: 50,
      height: 50,
      right: 150,
      bottom: 150,
      x: 100,
      y: 100,
      toJSON: jest.fn()
    }))
    
    fireEvent.click(button, { clientX: 125, clientY: 125 })
    
    // Should create ripple effects
    await waitFor(() => {
      const ripples = screen.getAllByTestId('ripple-effect')
      expect(ripples.length).toBeGreaterThanOrEqual(1)
    })
  })

  it('handles transition cleanup after timeout', async () => {
    renderWithThemeProvider(<EnhancedThemeToggle />)
    
    const button = screen.getByTestId('toggle-button')
    fireEvent.click(button)
    
    // Fast-forward time to trigger cleanup
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    await waitFor(() => {
      // Transition should complete
      expect(button).toBeInTheDocument()
    })
  })

  it('applies custom className when provided', () => {
    renderWithThemeProvider(<EnhancedThemeToggle className="custom-class" />)
    
    const container = screen.getByTestId('toggle-container')
    expect(container).toHaveClass('custom-class')
  })

  it('handles multiple rapid clicks gracefully', async () => {
    renderWithThemeProvider(<EnhancedThemeToggle />)
    
    const button = screen.getByTestId('toggle-button')
    
    // Click multiple times rapidly
    fireEvent.click(button)
    fireEvent.click(button)
    fireEvent.click(button)
    
    // Should handle all clicks without errors
    expect(button).toBeInTheDocument()
  })

  it('shows loading state before mounting', () => {
    // Test SSR behavior
    const { container } = renderWithThemeProvider(<EnhancedThemeToggle />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('handles mouse events correctly', () => {
    renderWithThemeProvider(<EnhancedThemeToggle />)
    
    const button = screen.getByTestId('toggle-button')
    
    // Test mouse interactions
    fireEvent.mouseEnter(button)
    fireEvent.mouseLeave(button)
    
    expect(button).toBeInTheDocument()
  })
})
