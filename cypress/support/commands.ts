/// <reference types="cypress" />

// Custom commands for the portfolio website

// Define the interface first
declare global {
  namespace Cypress {
    interface Chainable {
      visitHomePage(): Chainable<Element>
      waitForPageLoad(): Chainable<Element>
      waitForPortfolioLoad(): Chainable<Element>
      scrollToSection(sectionId: string): Chainable<Element>
      checkNavigation(): Chainable<Element>
      checkParticleBackground(): Chainable<Element>
      checkGitHubIntegration(): Chainable<Element>
      checkResponsiveLayout(device: 'mobile' | 'tablet' | 'desktop'): Chainable<Element>
      checkSEOElements(): Chainable<Element>
      checkSkipNavigation(): Chainable<Element>
    }
  }
}

Cypress.Commands.add('visitHomePage', () => {
  cy.visit('/')
  cy.wait(1000) // Allow for initial load
})

Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('main').should('be.visible')
  cy.get('header').should('be.visible')
})

Cypress.Commands.add('waitForPortfolioLoad', () => {
  cy.get('[data-testid="portfolio-section"]', { timeout: 15000 }).should('be.visible')
})

Cypress.Commands.add('scrollToSection', (sectionId: string) => {
  cy.get(`#${sectionId}`).scrollIntoView({ duration: 1000 })
  cy.get(`#${sectionId}`).should('be.visible')
})

Cypress.Commands.add('checkNavigation', () => {
  cy.get('nav').should('be.visible')
  cy.get('nav a').should('have.length.greaterThan', 0)
})

Cypress.Commands.add('checkParticleBackground', () => {
  cy.get('canvas').should('exist')
  cy.get('canvas').should('be.visible')
})

Cypress.Commands.add('checkGitHubIntegration', () => {
  cy.get('[data-testid="github-heatmap"]', { timeout: 10000 }).should('be.visible')
})

Cypress.Commands.add('checkResponsiveLayout', (device: 'mobile' | 'tablet' | 'desktop') => {
  (cy as any).setViewport(device)
  
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
  cy.get('body').type('{tab}')
  cy.get('[data-testid="skip-nav"]').should('be.visible')
  cy.get('[data-testid="skip-nav"]').click()
  cy.get('main').should('be.focused')
})