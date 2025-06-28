/// <reference types="cypress" />
/// <reference path="./index.d.ts" />

// Custom commands for the portfolio website

Cypress.Commands.add('visitHomePage', () => {
  cy.visit('/')
  
  // Reset theme state for consistent testing
  cy.window().then((win) => {
    win.localStorage.removeItem('theme')
    win.document.documentElement.dataset.theme = 'light'
  })
  
  cy.wait(1000) // Allow for initial load
  
  // Dismiss any Next.js error dialogs that might appear
  cy.get('body').then(($body) => {
    if ($body.find('[data-nextjs-dialog-backdrop]').length > 0) {
      cy.get('[data-nextjs-dialog-backdrop]').click({ force: true })
      cy.wait(500)
    }
  })
})

Cypress.Commands.add('waitForPageLoad', () => {
  // Dismiss any dialogs first
  cy.get('body').then(($body) => {
    if ($body.find('[data-nextjs-dialog-backdrop]').length > 0) {
      cy.get('[data-nextjs-dialog-backdrop]').click({ force: true })
      cy.wait(500)
    }
  })
  
  cy.get('main').should('be.visible')
  cy.get('header').should('be.visible')
})

Cypress.Commands.add('waitForPortfolioLoad', () => {
  cy.get('[data-testid="portfolio-section"]').should('be.visible')
})

Cypress.Commands.add('scrollToSection', (sectionId) => {
  cy.get(`#${sectionId}`).scrollIntoView({ duration: 1000 })
  cy.get(`#${sectionId}`).should('be.visible')
})

Cypress.Commands.add('checkNavigation', () => {
  cy.get('nav').should('be.visible')
  cy.get('nav a').should('have.length.greaterThan', 0)
})

Cypress.Commands.add('checkParticleBackground', () => {
  // Canvas exists as background element (may be behind other elements)
  cy.get('canvas').should('exist')
  // Verify it's positioned as a background
  cy.get('canvas').should('have.css', 'position', 'fixed')
})

Cypress.Commands.add('checkGitHubIntegration', () => {
  cy.get('[data-testid="github-heatmap"]').should('be.visible')
})

Cypress.Commands.add('checkResponsiveLayout', (device) => {
  const width = device === 'mobile' ? 375 : (device === 'tablet' ? 768 : 1280)
  const height = device === 'mobile' ? 667 : (device === 'tablet' ? 1024 : 720)
  cy.viewport(width, height)
  
  if (device === 'mobile') {
    // Check mobile-specific layouts
    cy.get('header').should('be.visible')
    cy.get('main').should('be.visible')
  } else {
    // Check desktop/tablet layouts
    cy.get('nav').should('be.visible')
    cy.get('header').should('be.visible')
  }
})

Cypress.Commands.add('checkSEOElements', () => {
  cy.title().should('not.be.empty')
  cy.get('meta[name="description"]').should('exist')
  cy.get('meta[property="og:title"]').should('exist')
  cy.get('meta[property="og:description"]').should('exist')
})

Cypress.Commands.add('checkSkipNavigation', () => {
  cy.get('a, button, input, select, textarea, [tabindex]').first().focus()
  cy.get('[data-testid="skip-nav"]').should('be.visible')
  cy.get('[data-testid="skip-nav"]').click()
  cy.get('main').should('be.focused')
})

Cypress.Commands.add('setViewport', (size) => {
  const viewports = {
    mobile: [375, 667],
    tablet: [768, 1024], 
    desktop: [1280, 720]
  }
  
  const [width, height] = viewports[size]
  cy.viewport(width, height)
})

Cypress.Commands.add('checkA11y', () => {
  // Basic accessibility checks
  cy.get('main').should('exist')
  cy.get('h1').should('exist')
  cy.get('[role="navigation"]').should('exist')
})

Cypress.Commands.add('toggleTheme', () => {
  cy.get('[aria-label*="theme"]').click()
})

Cypress.Commands.add('assertTheme', (theme) => {
  // Give the theme system time to update the data-theme attribute
  cy.wait(100)
  cy.get('html').should('have.attr', 'data-theme', theme)
})

Cypress.Commands.add('measurePageLoad', () => {
  cy.window().then((win) => {
    const performance = win.performance
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    const loadTime = navigation.loadEventEnd - navigation.fetchStart
    cy.wrap(loadTime).should('be.lessThan', 3000) // 3 seconds
  })
})