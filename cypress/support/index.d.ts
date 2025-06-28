/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to visit the home page and handle initial load
     */
    visitHomePage(): Chainable<void>

    /**
     * Custom command to wait for page load and dismiss dialogs
     */
    waitForPageLoad(): Chainable<void>

    /**
     * Custom command to wait for portfolio section to load
     */
    waitForPortfolioLoad(): Chainable<void>

    /**
     * Custom command to scroll to a specific section
     * @param sectionId - The ID of the section to scroll to
     */
    scrollToSection(sectionId: string): Chainable<void>

    /**
     * Custom command to check navigation elements
     */
    checkNavigation(): Chainable<void>

    /**
     * Custom command to check particle background canvas
     */
    checkParticleBackground(): Chainable<void>

    /**
     * Custom command to check GitHub integration
     */
    checkGitHubIntegration(): Chainable<void>

    /**
     * Custom command to check responsive layout
     * @param device - The device type (mobile, tablet, desktop)
     */
    checkResponsiveLayout(device: 'mobile' | 'tablet' | 'desktop'): Chainable<void>

    /**
     * Custom command to check SEO elements
     */
    checkSEOElements(): Chainable<void>

    /**
     * Custom command to check skip navigation functionality
     */
    checkSkipNavigation(): Chainable<void>

    /**
     * Custom command to set viewport size
     * @param size - The viewport size (mobile, tablet, desktop)
     */
    setViewport(size: 'mobile' | 'tablet' | 'desktop'): Chainable<void>

    /**
     * Custom command to check basic accessibility
     */
    checkA11y(): Chainable<void>

    /**
     * Custom command to toggle theme
     */
    toggleTheme(): Chainable<void>

    /**
     * Custom command to assert current theme
     * @param theme - The expected theme (dark or light)
     */
    assertTheme(theme: 'dark' | 'light'): Chainable<void>

    /**
     * Custom command to measure page load performance
     */
    measurePageLoad(): Chainable<void>
  }
}