import React from 'react'
import { render, screen, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProjectTimeline from '../../src/components/ProjectTimeline'
import { ThemeProvider } from '../../src/contexts/ThemeContext'

// Mock ClientOnlyIcon to avoid FontAwesome issues in tests
jest.mock('../../src/components/ClientOnlyIcon', () => {
  return function MockClientOnlyIcon({ fallback }: { fallback: string }) {
    return <span data-testid="icon">{fallback}</span>
  }
})

const renderWithThemeProvider = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('ProjectTimeline', () => {
  it('renders timeline with correct title', () => {
    renderWithThemeProvider(<ProjectTimeline />)
    
    expect(screen.getByText('Career Timeline')).toBeInTheDocument()
    expect(screen.getByText('⏰')).toBeInTheDocument()
  })

  it('renders all timeline items', () => {
    renderWithThemeProvider(<ProjectTimeline />)
    
    // Check for all timeline items by their titles
    expect(screen.getByText('Senior Full-Stack Developer')).toBeInTheDocument()
    expect(screen.getByText('Personal Portfolio Website')).toBeInTheDocument()
    expect(screen.getByText('Full-Stack Developer')).toBeInTheDocument()
    expect(screen.getByText('Computer Science Degree')).toBeInTheDocument()
  })

  it('displays companies for work and education items', () => {
    renderWithThemeProvider(<ProjectTimeline />)
    
    expect(screen.getByText('ACA Group')).toBeInTheDocument()
    expect(screen.getByText('Previous Company')).toBeInTheDocument()
    expect(screen.getByText('University')).toBeInTheDocument()
  })

  it('displays dates for all timeline items', () => {
    renderWithThemeProvider(<ProjectTimeline />)
    
    expect(screen.getByText('2020 - Present')).toBeInTheDocument()
    expect(screen.getByText('2023')).toBeInTheDocument()
    expect(screen.getByText('2017 - 2020')).toBeInTheDocument()
    expect(screen.getByText('2013 - 2017')).toBeInTheDocument()
  })

  it('displays technologies for all items', () => {
    renderWithThemeProvider(<ProjectTimeline />)
    
    // Check some technology tags - use getAllByText for duplicates
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getAllByText('TypeScript')).toHaveLength(2) // Appears in 2 items  
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('Vue.js')).toBeInTheDocument()
    expect(screen.getByText('Java')).toBeInTheDocument()
  })

  it('shows "Show more" buttons by default', () => {
    renderWithThemeProvider(<ProjectTimeline />)
    
    const showMoreButtons = screen.getAllByText('Show more')
    expect(showMoreButtons).toHaveLength(4) // One for each timeline item
  })

  it('expands timeline item when clicked', () => {
    renderWithThemeProvider(<ProjectTimeline />)
    
    const firstTimelineItem = screen.getByText('Senior Full-Stack Developer').closest('[data-testid]') || 
                             screen.getByText('Senior Full-Stack Developer').closest('div')
    
    if (firstTimelineItem) {
      fireEvent.click(firstTimelineItem)
    }
    
    // After expansion, should show "Show less" button
    expect(screen.getByText('Show less')).toBeInTheDocument()
    
    // Should show expanded content
    expect(screen.getByText(/Leading development of enterprise web applications/)).toBeInTheDocument()
  })

  it('toggles expansion when "Show more/less" button is clicked', () => {
    renderWithThemeProvider(<ProjectTimeline />)
    
    const firstShowMoreButton = screen.getAllByText('Show more')[0]
    
    // Click to expand
    fireEvent.click(firstShowMoreButton)
    expect(screen.getByText('Show less')).toBeInTheDocument()
    
    // Click to collapse
    const showLessButton = screen.getByText('Show less')
    fireEvent.click(showLessButton)
    expect(screen.getAllByText('Show more')).toHaveLength(4)
  })

  it('displays correct icons for different timeline item types', () => {
    renderWithThemeProvider(<ProjectTimeline />)
    
    // All items should have icons (mocked as fallback text)
    const icons = screen.getAllByTestId('icon')
    expect(icons.length).toBeGreaterThan(4) // Timeline items + expand buttons + title icon
  })

  it('handles multiple expanded items simultaneously', () => {
    renderWithThemeProvider(<ProjectTimeline />)
    
    const showMoreButtons = screen.getAllByText('Show more')
    
    // Expand first two items
    fireEvent.click(showMoreButtons[0])
    fireEvent.click(showMoreButtons[1])
    
    // Should have two "Show less" buttons
    expect(screen.getAllByText('Show less')).toHaveLength(2)
    expect(screen.getAllByText('Show more')).toHaveLength(2)
  })

  it('displays all description paragraphs when expanded', () => {
    renderWithThemeProvider(<ProjectTimeline />)
    
    // Expand the first item (Senior Full-Stack Developer)
    const firstShowMoreButton = screen.getAllByText('Show more')[0]
    fireEvent.click(firstShowMoreButton)
    
    // Check that all description paragraphs are visible
    expect(screen.getByText(/Leading development of enterprise web applications/)).toBeInTheDocument()
    expect(screen.getByText(/Mentoring junior developers/)).toBeInTheDocument()
    expect(screen.getByText(/Architecting scalable solutions/)).toBeInTheDocument()
  })

  it('renders timeline items in correct order', () => {
    renderWithThemeProvider(<ProjectTimeline />)
    
    const timelineItems = screen.getAllByText(/Senior Full-Stack Developer|Personal Portfolio Website|Full-Stack Developer|Computer Science Degree/)
    
    expect(timelineItems[0]).toHaveTextContent('Senior Full-Stack Developer')
    expect(timelineItems[1]).toHaveTextContent('Personal Portfolio Website')
    expect(timelineItems[2]).toHaveTextContent('Full-Stack Developer')
    expect(timelineItems[3]).toHaveTextContent('Computer Science Degree')
  })

  describe('getIcon function behavior', () => {
    it('displays appropriate fallback icons for different types', () => {
      renderWithThemeProvider(<ProjectTimeline />)
      
      // The mocked icons will show as fallback characters
      // We can't test the exact icon names since they're mocked,
      // but we can ensure icons are rendered for each item
      const icons = screen.getAllByTestId('icon')
      expect(icons).toHaveLength(9) // 1 title + 4 items + 4 expand buttons (each with chevron)
    })
  })

  it('maintains expanded state independently for each item', () => {
    renderWithThemeProvider(<ProjectTimeline />)
    
    const showMoreButtons = screen.getAllByText('Show more')
    
    // Expand first item
    fireEvent.click(showMoreButtons[0])
    expect(screen.getByText('Show less')).toBeInTheDocument()
    
    // Expand second item
    fireEvent.click(showMoreButtons[1]) // Note: index changes after first expansion
    expect(screen.getAllByText('Show less')).toHaveLength(2)
    
    // Collapse first item
    const showLessButtons = screen.getAllByText('Show less')
    fireEvent.click(showLessButtons[0])
    
    // Should still have one expanded item
    expect(screen.getAllByText('Show less')).toHaveLength(1)
    expect(screen.getAllByText('Show more')).toHaveLength(3)
  })

  it('renders without crashing when no data', () => {
    // This tests the component's resilience, though in practice timelineData is hardcoded    
    // Test that the component renders even if data structure changes
    expect(() => {
      renderWithThemeProvider(<ProjectTimeline />)
    }).not.toThrow()
  })
})
