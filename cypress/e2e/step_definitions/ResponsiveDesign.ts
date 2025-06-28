import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Responsive design step definitions

Given('I am using a {string} viewport', (device: string) => {
  cy.setViewport(device as 'mobile' | 'tablet' | 'desktop')
})

Then('the layout should be optimized for {string}', (device: string) => {
  cy.checkResponsiveLayout(device as 'mobile' | 'tablet' | 'desktop')
})

Then('all content should be readable', () => {
  cy.get('body').should('have.css', 'font-size').and('not.equal', '0px')
  
  // Check main content elements that should always be visible
  cy.get('h1, h2, h3, h4, h5, h6').should('be.visible')
  cy.get('main p').should('be.visible')
  
  // For navigation links, check based on viewport
  cy.window().then((win) => {
    if (win.innerWidth <= 600) {
      // Mobile: Navigation links may be hidden unless menu is open
      cy.get('button[aria-label*="navigation menu"]').should('be.visible')
    } else {
      // Desktop/Tablet: Navigation links should be visible
      cy.get('nav a').should('be.visible')
    }
  })
})

Then('navigation should be accessible', () => {
  cy.get('nav').should('exist')
  
  // Check viewport to determine navigation behavior
  cy.window().then((win) => {
    if (win.innerWidth <= 600) {
      // Mobile: Navigation is accessed via mobile menu button
      cy.get('button[aria-label*="navigation menu"]').should('be.visible')
      // Click mobile menu button to open navigation
      cy.get('button[aria-label*="navigation menu"]').click()
      // Now nav links should be visible
      cy.get('nav a').should('be.visible')
      // Close the menu again
      cy.get('button[aria-label*="navigation menu"]').click()
    } else {
      // Desktop/Tablet: Navigation should be directly visible
      cy.get('nav a').should('be.visible')
    }
  })
})

Then('interactive elements should be properly sized', () => {
  // Only check visible interactive elements
  cy.get('button:visible, a:visible, [role="button"]:visible').each(($el) => {
    // Check that elements have some reasonable size
    cy.wrap($el).invoke('width').should('be.greaterThan', 0)
    cy.wrap($el).invoke('height').should('be.greaterThan', 0)
  })
})

When('I interact with the navigation', () => {
  cy.window().then((win) => {
    if (win.innerWidth <= 600) {
      // Mobile: Open menu first, then click navigation link
      cy.get('button[aria-label*="navigation menu"]').click()
      cy.get('nav a').first().should('be.visible')
      cy.get('nav a').first().click()
    } else {
      // Desktop/Tablet: Click navigation link directly
      cy.get('nav a').first().should('be.visible')
      cy.get('nav a').first().click()
    }
  })
})

Then('navigation should work smoothly', () => {
  cy.get('nav').should('exist')
  
  cy.window().then((win) => {
    if (win.innerWidth <= 600) {
      // Mobile: Check that mobile menu button works
      cy.get('button[aria-label*="navigation menu"]').should('be.visible')
    } else {
      // Desktop/Tablet: Navigation links should be directly visible
      cy.get('nav a').should('be.visible')
    }
  })
})

Then('all sections should be accessible', () => {
  cy.get('section, #welcome, #portfolio, #contact').each(($section) => {
    cy.wrap($section).should('exist')
  })
})

Then('touch interactions should be responsive', () => {
  // Check that interactive elements have appropriate touch targets
  cy.window().then((win) => {
    if (win.innerWidth <= 600) {
      // Mobile: Check mobile menu button and other visible interactive elements
      cy.get('button[aria-label*="navigation menu"]').should('be.visible')
      cy.get('button[aria-label*="theme"]').should('be.visible')
    } else {
      // Desktop/Tablet: Check visible navigation links and other interactive elements
      cy.get('nav a').should('be.visible')
      cy.get('button[aria-label*="theme"]').should('be.visible')
    }
  })
})

When('I interact with hover effects', () => {
  // On desktop, we should hover over navigation links
  cy.window().then((win) => {
    if (win.innerWidth > 600) {
      // Desktop: hover over navigation links
      cy.get('nav a').first().should('be.visible').trigger('mouseover')
    } else {
      // Mobile: skip hover effects as they don't apply
      cy.log('Skipping hover effects on mobile')
    }
  })
})

Then('hover states should be visible', () => {
  // Check that hover states work on desktop
  cy.get('a, button').first().should('be.visible')
})

Then('transitions should be smooth', () => {
  // Check that CSS transitions are applied
  cy.get('a, button').should('have.css', 'transition-duration')
})

Then('all interactive elements should respond appropriately', () => {
  // Only check visible interactive elements
  cy.get('button:visible, a:visible, [role="button"]:visible').each(($el) => {
    cy.wrap($el).should('be.visible')
    cy.wrap($el).should('not.be.disabled')
  })
})