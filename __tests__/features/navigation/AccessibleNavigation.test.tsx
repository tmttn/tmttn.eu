import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeProvider } from '@contexts'
import AccessibleNavigation from '@features/navigation/AccessibleNavigation'

const renderWithThemeProvider = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

// Mock window dimensions to simulate mobile viewport for button visibility
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 480,
})
Object.defineProperty(window, 'innerHeight', {
  writable: true,
  configurable: true,
  value: 800,
})

describe('AccessibleNavigation', () => {
  beforeEach(() => {
    // Mock next/link
    jest.mock('next/link', () => {
      return ({ children, href, onClick, ...props }: any) => (
        <a href={href} onClick={onClick} {...props}>
          {children}
        </a>
      )
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders navigation container with correct attributes', () => {
    renderWithThemeProvider(<AccessibleNavigation />)
    
    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveAttribute('aria-label', 'Main navigation')
  })

  it('renders mobile menu button with correct initial state', () => {
    renderWithThemeProvider(<AccessibleNavigation />)
    
    // Find button by its attributes since role might be affected by CSS
    const menuButton = screen.getByLabelText('Open navigation menu')
    expect(menuButton).toBeInTheDocument()
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    expect(menuButton).toHaveAttribute('aria-controls', 'main-navigation')
    expect(menuButton).toHaveAttribute('aria-label', 'Open navigation menu')
    expect(menuButton).toHaveTextContent('☰')
  })

  it('renders all navigation items', () => {
    renderWithThemeProvider(<AccessibleNavigation />)
    
    expect(screen.getByLabelText('Go to welcome section')).toBeInTheDocument()
    expect(screen.getByLabelText('Learn about Tom')).toBeInTheDocument()
    expect(screen.getByLabelText('Get in touch')).toBeInTheDocument()
    expect(screen.getByLabelText('View portfolio')).toBeInTheDocument()
  })

  it('toggles mobile menu when button is clicked', () => {
    renderWithThemeProvider(<AccessibleNavigation />)
    
    const menuButton = screen.getByLabelText('Open navigation menu')
    
    // Menu should be closed initially
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    expect(menuButton).toHaveTextContent('☰')
    
    // Click to open menu
    fireEvent.click(menuButton)
    
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    expect(menuButton).toHaveTextContent('✕')
    expect(menuButton).toHaveAttribute('aria-label', 'Close navigation menu')
  })

  it('closes menu when navigation link is clicked', () => {
    renderWithThemeProvider(<AccessibleNavigation />)
    
    const menuButton = screen.getByLabelText('Open navigation menu')
    
    // Open menu
    fireEvent.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    
    // Click navigation link
    const welcomeLink = screen.getByLabelText('Go to welcome section')
    fireEvent.click(welcomeLink)
    
    // Menu should be closed
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes menu when escape key is pressed', async () => {
    renderWithThemeProvider(<AccessibleNavigation />)
    
    const menuButton = screen.getByLabelText('Open navigation menu')
    
    // Open menu
    fireEvent.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    
    // Press escape key
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })
    
    await waitFor(() => {
      expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    })
  })

  it('closes menu when clicking outside', async () => {
    renderWithThemeProvider(<AccessibleNavigation />)
    
    const menuButton = screen.getByLabelText('Open navigation menu')
    
    // Open menu
    fireEvent.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    
    // Click outside the navigation
    fireEvent.mouseDown(document.body)
    
    await waitFor(() => {
      expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    })
  })

  it('focuses menu button when escape is pressed', async () => {
    renderWithThemeProvider(<AccessibleNavigation />)
    
    const menuButton = screen.getByLabelText('Open navigation menu')
    
    // Open menu
    fireEvent.click(menuButton)
    
    // Press escape
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })
    
    await waitFor(() => {
      expect(menuButton).toHaveFocus()
    })
  })

  it('applies custom className when provided', () => {
    const customClass = 'custom-nav-class'
    renderWithThemeProvider(<AccessibleNavigation className={customClass} />)
    
    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    expect(nav).toHaveClass(customClass)
  })

  it('has proper list structure for navigation items', () => {
    renderWithThemeProvider(<AccessibleNavigation />)
    
    const navList = screen.getByRole('list')
    expect(navList).toBeInTheDocument()
    expect(navList).toHaveAttribute('id', 'main-navigation')
    
    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(4)
  })

  it('navigation links have correct href attributes', () => {
    renderWithThemeProvider(<AccessibleNavigation />)
    
    expect(screen.getByLabelText('Go to welcome section')).toHaveAttribute('href', '/#welcome')
    expect(screen.getByLabelText('Learn about Tom')).toHaveAttribute('href', '/#about')
    expect(screen.getByLabelText('Get in touch')).toHaveAttribute('href', '/#contact')
    expect(screen.getByLabelText('View portfolio')).toHaveAttribute('href', '/#showcase')
  })

  it('navigation links are keyboard accessible', () => {
    renderWithThemeProvider(<AccessibleNavigation />)
    
    const links = [
      screen.getByLabelText('Go to welcome section'),
      screen.getByLabelText('Learn about Tom'),
      screen.getByLabelText('Get in touch'),
      screen.getByLabelText('View portfolio'),
    ]
    
    links.forEach(link => {
      expect(link).toHaveAttribute('tabIndex', '0')
    })
  })

  it('does not close menu when clicking inside navigation', () => {
    renderWithThemeProvider(<AccessibleNavigation />)
    
    const menuButton = screen.getByLabelText('Open navigation menu')
    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    
    // Open menu
    fireEvent.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    
    // Click inside navigation
    fireEvent.mouseDown(nav)
    
    // Menu should still be open
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  })
})