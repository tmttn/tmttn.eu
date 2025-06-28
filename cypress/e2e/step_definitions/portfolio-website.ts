import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Theme toggle functionality
When('I click the theme toggle button', () => {
  cy.toggleTheme()
})

Then('the theme should switch from light to dark mode', () => {
  cy.wait(500) // Allow for transition
  cy.get('html').should('have.attr', 'data-theme', 'dark')
})

Then('the toggle button should reflect the current theme', () => {
  cy.get('[aria-label*="theme"]').should('be.visible')
})

Then('the theme should switch back to light mode', () => {
  cy.wait(500) // Allow for transition
  cy.get('html').should('have.attr', 'data-theme', 'light')
})

// Navigation functionality
When('I click on the {string} navigation link', (linkText: string) => {
  cy.get('nav').contains(linkText).click()
})

Then('I should be scrolled to the portfolio section', () => {
  cy.get('#showcase').should('be.visible')
  cy.url().should('include', '#showcase')
})

Then('I should be scrolled to the contact section', () => {
  cy.get('#contact').should('be.visible')
  cy.url().should('include', '#contact')
})

// Particle background functionality
Then('I should see an animated particle background', () => {
  cy.checkParticleBackground()
})

Then('the particles should be interactive', () => {
  cy.get('canvas').should('exist')
  cy.get('canvas').should('be.visible')
})

When('I move my mouse over the canvas', () => {
  cy.get('canvas').trigger('mousemove', { clientX: 100, clientY: 100 })
})

Then('the particles should respond to mouse movement', () => {
  // Check that canvas exists and is interactive
  cy.get('canvas').should('exist')
  cy.get('canvas').should('be.visible')
})

// GitHub integration
Then('I should see the GitHub heatmap component', () => {
  cy.checkGitHubIntegration()
})

Then('the heatmap should load successfully', () => {
  cy.get('[data-testid="github-heatmap"]').should('be.visible')
})

Then('I should see recent GitHub activity', () => {
  cy.get('[data-testid="github-heatmap"]').within(() => {
    cy.get('.contribution-day, .heatmap-cell, [class*="contribution"]')
      .should('have.length.greaterThan', 0)
  })
})