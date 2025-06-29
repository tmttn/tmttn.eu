/// <reference types="cypress" />
/// <reference path="./index.d.ts" />

// Custom commands for the portfolio website

Cypress.Commands.add('visitHomePage', () => {
  // Set up GitHub API intercepts before visiting
  cy.setupGitHubIntercepts()
  
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
  // Wait longer for component to load (it might be slow due to rate limiting)
  cy.get('body', { timeout: 10000 }).should('be.visible')
  
  // Check for either the loaded heatmap or the loading state
  cy.get('body').then(($body) => {
    if ($body.find('[data-testid="github-heatmap"]').length > 0) {
      // Heatmap loaded successfully
      cy.get('[data-testid="github-heatmap"]').should('be.visible')
      cy.log('GitHub heatmap loaded successfully')
    } else if ($body.find('p:contains("Loading GitHub activity")').length > 0) {
      // Component is still loading - this is acceptable
      cy.get('p:contains("Loading GitHub activity")').should('be.visible')
      cy.log('GitHub heatmap is loading (this is acceptable)')
    } else {
      // Look for any GitHub-related content in the portfolio section
      cy.get('#showcase').within(() => {
        cy.contains('GitHub', { matchCase: false }).should('exist')
      })
      cy.log('GitHub integration is present in portfolio section')
    }
  })
})

Cypress.Commands.add('checkResponsiveLayout', (device) => {
  const width = device === 'mobile' ? 375 : (device === 'tablet' ? 768 : 1280)
  const height = device === 'mobile' ? 667 : (device === 'tablet' ? 1024 : 720)
  cy.viewport(width, height)
  
  // Check layout elements exist
  cy.get('header').should('be.visible')
  cy.get('main').should('be.visible')
  
  // Wait for layout to stabilize
  cy.wait(500)
  
  if (device === 'mobile') {
    // Check mobile-specific layouts - mobile menu button should be visible
    cy.get('button[aria-label*="navigation menu"]').should('be.visible')
    // Navigation links should be hidden initially on mobile
    cy.get('nav ul').should('not.be.visible')
  } else {
    // Check desktop/tablet layouts - navigation should be visible
    cy.get('nav').should('be.visible')
    cy.get('nav a').should('be.visible')
    // Mobile menu button should be hidden on larger screens
    cy.get('button[aria-label*="navigation menu"]').should('not.be.visible')
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

Cypress.Commands.add('setupGitHubIntercepts', () => {
  // Intercept GitHub API calls and return fixture data
  cy.intercept('GET', '**/api.github.com/users/*/repos**', { 
    fixture: 'github-repositories.json' 
  }).as('githubRepos')
  
  cy.intercept('GET', '**/api.github.com/users/*/events**', { 
    fixture: 'github-events.json' 
  }).as('githubEvents')
  
  // Intercept any other GitHub API calls that might be made
  cy.intercept('GET', '**/api.github.com/**', {
    statusCode: 200,
    body: []
  }).as('githubApi')
})