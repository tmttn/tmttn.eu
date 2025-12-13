import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@contexts'
import SkipNavigation from '@features/navigation/SkipNavigation'

const renderWithThemeProvider = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('SkipNavigation', () => {
  it('renders skip links with correct text', () => {
    renderWithThemeProvider(<SkipNavigation />)
    
    expect(screen.getByText('Skip to main content')).toBeInTheDocument()
    expect(screen.getByText('Skip to navigation')).toBeInTheDocument()
  })

  it('has correct href attributes for skip links', () => {
    renderWithThemeProvider(<SkipNavigation />)
    
    const mainContentLink = screen.getByLabelText('Skip to main content')
    const navigationLink = screen.getByLabelText('Skip to navigation')
    
    expect(mainContentLink).toHaveAttribute('href', '#main-content')
    expect(navigationLink).toHaveAttribute('href', '#navigation')
  })

  it('has proper accessibility attributes', () => {
    renderWithThemeProvider(<SkipNavigation />)

    const mainContentLink = screen.getByLabelText('Skip to main content')
    const navigationLink = screen.getByLabelText('Skip to navigation')

    expect(mainContentLink).toHaveAttribute('aria-label', 'Skip to main content')
    expect(navigationLink).toHaveAttribute('aria-label', 'Skip to navigation')
  })

  it('renders two skip links', () => {
    renderWithThemeProvider(<SkipNavigation />)

    const skipLinks = screen.getAllByRole('link')
    expect(skipLinks).toHaveLength(2)
  })

  it('skip links are focusable for keyboard navigation', () => {
    renderWithThemeProvider(<SkipNavigation />)
    
    const mainContentLink = screen.getByLabelText('Skip to main content')
    const navigationLink = screen.getByLabelText('Skip to navigation')
    
    expect(mainContentLink).toBeVisible()
    expect(navigationLink).toBeVisible()
    
    // Links should be tabbable (not have tabIndex=-1)
    expect(mainContentLink).not.toHaveAttribute('tabindex', '-1')
    expect(navigationLink).not.toHaveAttribute('tabindex', '-1')
  })
})