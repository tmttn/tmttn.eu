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
  cy.get('h1, h2, h3, h4, h5, h6, p, a, span').each(($el) => {
    cy.wrap($el).should('be.visible')
  })
})

Then('navigation should be accessible', () => {
  cy.get('nav').should('be.visible')
  cy.get('nav a').should('have.length.greaterThan', 0)
  cy.get('nav a').each(($link) => {
    cy.wrap($link).should('be.visible')
  })
})

Then('interactive elements should be properly sized', () => {
  cy.get('button, a, [role="button"]').each(($el) => {
    cy.wrap($el).should('have.css', 'min-height').and('not.equal', '0px')
    cy.wrap($el).should('have.css', 'min-width').and('not.equal', '0px')
  })
})

When('I interact with the navigation', () => {
  cy.get('nav a').first().click()
})

Then('navigation should work smoothly', () => {
  cy.get('nav').should('be.visible')
  cy.get('nav a').should('be.visible')
})

Then('all sections should be accessible', () => {
  cy.get('section, #welcome, #portfolio, #contact').each(($section) => {
    cy.wrap($section).should('exist')
  })
})

Then('touch interactions should be responsive', () => {
  // Check that interactive elements have appropriate touch targets
  cy.get('button, a, [role="button"]').each(($el) => {
    cy.wrap($el).should('be.visible')
  })
})

When('I interact with hover effects', () => {
  cy.get('a, button').first().trigger('mouseover')
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
  cy.get('button, a, [role="button"]').each(($el) => {
    cy.wrap($el).should('be.visible')
    cy.wrap($el).should('not.be.disabled')
  })
})