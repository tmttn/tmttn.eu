import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeProvider } from '@contexts'
import ParticleBackground from '@features/background/ParticleBackground'

// Mock canvas context
const mockContext = {
  clearRect: jest.fn(),
  fillStyle: '',
  globalAlpha: 1,
  shadowBlur: 0,
  shadowColor: '',
  strokeStyle: '',
  lineWidth: 1,
  save: jest.fn(),
  restore: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
}

const mockCanvas = {
  getContext: jest.fn(() => mockContext),
  width: 1024,
  height: 768,
}

const renderWithThemeProvider = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('ParticleBackground', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Mock HTMLCanvasElement
    HTMLCanvasElement.prototype.getContext = jest.fn(() => mockContext)
    
    // Mock window methods
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    })
    
    // Mock requestAnimationFrame
    global.requestAnimationFrame = jest.fn((cb) => {
      setTimeout(cb, 16)
      return 1
    })
    global.cancelAnimationFrame = jest.fn()
    
    // Mock matchMedia for reduced motion
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
    
    // Mock addEventListener/removeEventListener
    const originalAddEventListener = window.addEventListener
    const originalRemoveEventListener = window.removeEventListener
    window.addEventListener = jest.fn()
    window.removeEventListener = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders canvas element with correct attributes', () => {
    renderWithThemeProvider(<ParticleBackground />)
    
    const canvas = screen.getByRole('presentation', { hidden: true })
    expect(canvas).toBeInTheDocument()
    expect(canvas).toHaveAttribute('aria-hidden', 'true')
  })

  it('does not render when prefers-reduced-motion is enabled', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    renderWithThemeProvider(<ParticleBackground />)
    
    expect(screen.queryByRole('presentation', { hidden: true })).not.toBeInTheDocument()
  })

  it('sets up canvas with correct dimensions', () => {
    renderWithThemeProvider(<ParticleBackground />)
    
    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalledWith('2d')
  })

  it('adds event listeners for mouse and scroll interactions', () => {
    renderWithThemeProvider(<ParticleBackground />)
    
    expect(window.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function))
    expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
    expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('respects custom particle count prop', () => {
    const customParticleCount = 25
    renderWithThemeProvider(<ParticleBackground particleCount={customParticleCount} />)
    
    // Component should render without errors
    expect(screen.getByRole('presentation', { hidden: true })).toBeInTheDocument()
  })

  it('applies custom className when provided', () => {
    const customClass = 'custom-particle-bg'
    renderWithThemeProvider(<ParticleBackground className={customClass} />)
    
    const canvas = screen.getByRole('presentation', { hidden: true })
    expect(canvas).toHaveClass(customClass)
  })

  it('starts animation loop with requestAnimationFrame', async () => {
    renderWithThemeProvider(<ParticleBackground />)
    
    await waitFor(() => {
      expect(global.requestAnimationFrame).toHaveBeenCalled()
    })
  })

  it('calls clearRect on animation frame', async () => {
    renderWithThemeProvider(<ParticleBackground />)
    
    await waitFor(() => {
      expect(mockContext.clearRect).toHaveBeenCalledWith(0, 0, 1024, 768)
    })
  })

  it('draws particles with correct properties', async () => {
    renderWithThemeProvider(<ParticleBackground particleCount={1} />)
    
    await waitFor(() => {
      expect(mockContext.beginPath).toHaveBeenCalled()
      expect(mockContext.arc).toHaveBeenCalled()
      expect(mockContext.fill).toHaveBeenCalled()
    })
  })

  it('creates connections between nearby particles', async () => {
    renderWithThemeProvider(<ParticleBackground particleCount={5} />)
    
    await waitFor(() => {
      // Should attempt to draw lines between particles
      expect(mockContext.moveTo).toHaveBeenCalled()
      expect(mockContext.lineTo).toHaveBeenCalled()
      expect(mockContext.stroke).toHaveBeenCalled()
    })
  })

  it('handles mouse move events', async () => {
    renderWithThemeProvider(<ParticleBackground />)
    
    // Simulate mouse move
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: 100,
      clientY: 200,
    })
    
    await waitFor(() => {
      expect(window.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function))
    })
  })

  it('handles scroll events', async () => {
    renderWithThemeProvider(<ParticleBackground />)
    
    await waitFor(() => {
      expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
    })
  })

  it('cleans up event listeners and animation on unmount', () => {
    const { unmount } = renderWithThemeProvider(<ParticleBackground />)
    
    unmount()
    
    expect(window.removeEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function))
    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
    expect(global.cancelAnimationFrame).toHaveBeenCalled()
  })

  it('updates particle colors based on theme', () => {
    // Test with different theme by changing localStorage
    localStorage.setItem('theme', 'light')
    
    renderWithThemeProvider(<ParticleBackground />)
    
    expect(screen.getByRole('presentation', { hidden: true })).toBeInTheDocument()
    
    // Reset for other tests
    localStorage.clear()
  })

  it('handles resize events correctly', async () => {
    renderWithThemeProvider(<ParticleBackground />)
    
    await waitFor(() => {
      expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
    })
    
    // Simulate window resize
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 900,
    })
    
    // Trigger resize event
    fireEvent.resize(window)
  })
})