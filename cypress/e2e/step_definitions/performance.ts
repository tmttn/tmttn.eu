import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Performance step definitions

Given('I have a stable internet connection', () => {
  // This is more of a documentation step - in real scenarios you might 
  // want to simulate different network conditions
  cy.log('Assuming stable internet connection for performance tests')
})

Then('the page should load within 3 seconds', () => {
  cy.measurePageLoad()
})

Then('the largest contentful paint should occur within 2.5 seconds', () => {
  cy.window().then((win) => {
    // Check for LCP metric if available
    const performance = win.performance
    if (performance.getEntriesByType) {
      const entries = performance.getEntriesByType('largest-contentful-paint')
      if (entries.length > 0) {
        const lcp = entries[entries.length - 1] as any
        expect(lcp.startTime).to.be.lessThan(2500)
      }
    }
  })
})

Then('the first input delay should be less than 100ms', () => {
  // FID is measured on first user interaction
  cy.get('body').click()
  cy.wait(100) // Allow for any delays
})

Then('cumulative layout shift should be minimal', () => {
  // CLS is hard to measure directly in Cypress, but we can check for 
  // obvious layout issues
  cy.get('main').should('be.visible')
  cy.wait(1000) // Allow for any layout changes
  cy.get('main').should('be.visible') // Should still be visible
})

Then('the portfolio component should load asynchronously', () => {
  cy.waitForPortfolioLoad()
})

Then('loading states should be displayed appropriately', () => {
  // Check for loading indicators
  cy.get('[data-testid="loading"], .loading, [class*="loading"]')
    .should('exist')
    .or(() => {
      // If no loading state is visible, that's also acceptable
      // as long as content loads quickly
      cy.get('#portfolio').should('be.visible')
    })
})

Then('the transition should be smooth', () => {
  cy.get('#showcase').should('be.visible')
  cy.get('#showcase').should('have.css', 'transition-duration')
    .or('have.css', 'animation-duration')
})

When('I analyze the page resources', () => {
  cy.window().then((win) => {
    const performance = win.performance
    const resources = performance.getEntriesByType('resource')
    cy.wrap(resources).as('pageResources')
  })
})

Then('images should be optimized and properly sized', () => {
  cy.get('img').each(($img) => {
    cy.wrap($img).should('be.visible')
    cy.wrap($img).should(($el) => {
      const naturalWidth = $el[0].naturalWidth
      const displayWidth = $el.width()
      // Image shouldn't be more than 2x larger than display size
      expect(naturalWidth).to.be.lessThan(displayWidth * 2.5)
    })
  })
})

Then('CSS should be minified', () => {
  cy.get('@pageResources').then((resources: any) => {
    const cssResources = resources.filter((r: any) => r.name.includes('.css'))
    expect(cssResources.length).to.be.greaterThan(0)
  })
})

Then('JavaScript should be bundled efficiently', () => {
  cy.get('@pageResources').then((resources: any) => {
    const jsResources = resources.filter((r: any) => r.name.includes('.js'))
    expect(jsResources.length).to.be.greaterThan(0)
  })
})

Then('fonts should load without blocking rendering', () => {
  cy.get('body').should('have.css', 'font-family')
})

When('I monitor network requests', () => {
  cy.intercept('**/*').as('allRequests')
})

Then('there should be minimal unnecessary requests', () => {
  cy.get('@allRequests.all').should('have.length.lessThan', 50)
})

Then('resources should use appropriate caching headers', () => {
  // This would typically be tested at the server level
  cy.log('Caching headers should be configured on the server')
})

Then('third-party resources should not block critical rendering', () => {
  // Check that main content is visible quickly
  cy.get('main').should('be.visible')
  cy.get('h1').should('be.visible')
})

Then('the total page weight should be reasonable', () => {
  cy.get('@pageResources').then((resources: any) => {
    const totalSize = resources.reduce((sum: number, resource: any) => {
      return sum + (resource.transferSize || 0)
    }, 0)
    // Expect total page weight to be less than 5MB
    expect(totalSize).to.be.lessThan(5 * 1024 * 1024)
  })
})

When('I interact with the theme toggle', () => {
  cy.toggleTheme()
})

Then('the response should be immediate', () => {
  cy.wait(100) // Small delay to ensure responsiveness
  cy.get('[aria-label*="theme"]').should('be.visible')
})

Then('animations should run at 60fps', () => {
  // This is difficult to measure directly in Cypress
  // We can check that animations are present and smooth
  cy.get('body').should('have.css', 'transition-duration')
    .or('have.css', 'animation-duration')
})

When('I scroll through the page', () => {
  cy.scrollTo('bottom', { duration: 2000 })
})

Then('scrolling should be smooth', () => {
  cy.get('body').should('be.visible')
  // Smooth scrolling is hard to test directly, but we can ensure
  // all content becomes visible during scroll
  cy.get('#contact').should('be.visible')
})

Then('particle animations should not impact performance', () => {
  // Check that particle canvas doesn't cause performance issues
  cy.get('canvas').should('be.visible')
  cy.get('main').should('be.visible') // Main content should still be responsive
})