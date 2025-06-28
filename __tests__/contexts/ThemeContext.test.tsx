import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider, useTheme } from '@contexts'

// Test component to use the ThemeContext
const TestComponent: React.FC = () => {
  const { isDark, toggleTheme, theme } = useTheme()
  return (
    <div>
      <div data-testid="theme-state">{isDark ? 'dark' : 'light'}</div>
      <div data-testid="theme-name">{theme.isDark ? 'dark' : 'light'}</div>
      <button data-testid="toggle-button" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  )
}

const renderWithThemeProvider = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear()
    // Reset matchMedia mock
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  it('throws error when useTheme is used outside ThemeProvider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      render(<TestComponent />)
    }).toThrow('useTheme must be used within a ThemeProvider')
    
    spy.mockRestore()
  })

  it('provides default based on system preference when no saved preference exists', () => {
    renderWithThemeProvider(<TestComponent />)
    
    // With our mock, matchMedia returns false for prefers-color-scheme: dark
    expect(screen.getByTestId('theme-state')).toHaveTextContent('light')
    expect(screen.getByTestId('theme-name')).toHaveTextContent('light')
  })

  it('respects system preference when no saved theme exists', () => {
    // Mock system preference for dark theme
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    renderWithThemeProvider(<TestComponent />)
    
    expect(screen.getByTestId('theme-state')).toHaveTextContent('dark')
    expect(screen.getByTestId('theme-name')).toHaveTextContent('dark')
  })

  it('loads saved theme from localStorage', () => {
    localStorage.setItem('theme', 'light')
    
    renderWithThemeProvider(<TestComponent />)
    
    expect(screen.getByTestId('theme-state')).toHaveTextContent('light')
    expect(screen.getByTestId('theme-name')).toHaveTextContent('light')
  })

  it('toggles theme and saves to localStorage', () => {
    renderWithThemeProvider(<TestComponent />)
    
    // Should start with light theme (default)
    expect(screen.getByTestId('theme-state')).toHaveTextContent('light')
    
    // Toggle to dark theme
    fireEvent.click(screen.getByTestId('toggle-button'))
    
    expect(screen.getByTestId('theme-state')).toHaveTextContent('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    
    // Toggle back to light theme
    fireEvent.click(screen.getByTestId('toggle-button'))
    
    expect(screen.getByTestId('theme-state')).toHaveTextContent('light')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('provides correct theme object based on isDark state', () => {
    renderWithThemeProvider(<TestComponent />)
    
    // Light theme should be active initially
    expect(screen.getByTestId('theme-name')).toHaveTextContent('light')
    
    // Toggle to dark theme
    fireEvent.click(screen.getByTestId('toggle-button'))
    
    expect(screen.getByTestId('theme-name')).toHaveTextContent('dark')
  })
})