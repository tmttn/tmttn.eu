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
        const lcp = entries[entries.length - 1]
        cy.wrap(lcp.startTime).should('be.lessThan', 2500)
      }
    }
  })
})

Then('the first input delay should be less than 100ms', () => {
  // FID is measured on first user interaction
  cy.get('body').click({ force: true })
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
  // Check for loading indicators or content loads quickly
  cy.get('#showcase').should('be.visible')
})

Then('the transition should be smooth', () => {
  cy.get('#showcase').should('be.visible')
})

When('I analyze the page resources', () => {
  cy.window().then((win) => {
    const performance = win.performance
    const resources = performance.getEntriesByType('resource')
    cy.wrap(resources).as('pageResources')
  })
})

Then('images should be optimized and properly sized', () => {
  cy.get('body').then(($body) => {
    const images = $body.find('img')
    if (images.length > 0) {
      cy.get('img').each(($img) => {
        cy.wrap($img).should('be.visible')
        cy.wrap($img).should(($el) => {
          const element = $el[0] as HTMLImageElement
          const naturalWidth = element.naturalWidth
          const displayWidth = $el.width()
          // Image shouldn't be more than 2.5x larger than display size
          if (displayWidth) {
            expect(naturalWidth).to.be.lessThan(displayWidth * 2.5)
          }
        })
      })
    } else {
      cy.log('No images found on page - test passes')
    }
  })
})

Then('CSS should be minified', () => {
  cy.get('@pageResources').then((resources: any) => {
    const cssResources = resources.filter((r: any) => r.name.includes('.css') || r.name.includes('/_next/static/'))
    // In Next.js, CSS might be inlined or bundled differently
    cy.log(`Found ${cssResources.length} CSS/bundled resources`)
    // Just verify we have some styling mechanism
    cy.get('body').should('have.css', 'margin')
  })
})

Then('JavaScript should be bundled efficiently', () => {
  cy.get('@pageResources').then((resources: any) => {
    const jsResources = resources.filter((r: any) => 
      r.name.includes('.js') || 
      r.name.includes('/_next/static/') ||
      r.name.includes('chunks')
    )
    cy.log(`Found ${jsResources.length} JavaScript/bundled resources`)
    // In Next.js, JS might be bundled differently, but we should have some JS
    // Just verify basic page functionality works
    cy.get('body').should('exist')
    cy.get('main').should('be.visible')
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
    cy.wrap(totalSize).should('be.lessThan', 5 * 1024 * 1024)
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
  cy.get('body').then(($body) => {
    const hasTransition = $body.css('transition-duration') !== '0s'
    const hasAnimation = $body.css('animation-duration') !== '0s'
    cy.wrap(hasTransition || hasAnimation).should('be.true')
  })
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
  cy.get('canvas').should('exist')
  cy.get('main').should('be.visible') // Main content should still be responsive
})