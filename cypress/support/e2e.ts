// Import commands.js using ES2015 syntax:
import './commands'

// Import Cypress Cucumber preprocessor
import '@badeball/cypress-cucumber-preprocessor/support'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Hide fetch/XHR logs in Cypress runner for cleaner output
Cypress.on('window:before:load', (win) => {
  // Disable service worker registration during tests
  if (win.navigator && 'serviceWorker' in win.navigator) {
    Object.defineProperty(win.navigator, 'serviceWorker', {
      value: undefined,
      configurable: true
    })
  }
})

// Configure viewport for consistent testing
Cypress.Commands.add('setViewport', (size: 'mobile' | 'tablet' | 'desktop') => {
  const viewports = {
    mobile: [375, 667],
    tablet: [768, 1024], 
    desktop: [1280, 720]
  }
  
  const [width, height] = viewports[size]
  cy.viewport(width, height)
})

// Add custom assertion for accessibility
Cypress.Commands.add('checkA11y', () => {
  // Basic accessibility checks
  cy.get('main').should('exist')
  cy.get('h1').should('exist')
  cy.get('[role="navigation"]').should('exist')
})

// Add theme testing utilities
Cypress.Commands.add('toggleTheme', () => {
  cy.get('[aria-label*="theme"]', { timeout: 10000 }).click()
})

Cypress.Commands.add('assertTheme', (theme: 'light' | 'dark') => {
  cy.get('html').should('have.attr', 'data-theme', theme)
})

// Add performance testing utilities
Cypress.Commands.add('measurePageLoad', () => {
  cy.window().then((win) => {
    const performance = win.performance
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    const loadTime = navigation.loadEventEnd - navigation.fetchStart
    cy.wrap(loadTime).should('be.lessThan', 3000) // 3 seconds
  })
})

declare global {
  namespace Cypress {
    interface Chainable {
      setViewport(size: 'mobile' | 'tablet' | 'desktop'): Chainable<Element>
      checkA11y(): Chainable<Element>
      toggleTheme(): Chainable<Element>
      assertTheme(theme: 'light' | 'dark'): Chainable<Element>
      measurePageLoad(): Chainable<Element>
    }
  }
}