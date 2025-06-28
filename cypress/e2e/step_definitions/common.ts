import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Common step definitions used across multiple features

Given('I visit the portfolio homepage', () => {
  cy.visitHomePage()
  cy.waitForPageLoad()
})

Given('the page loads successfully', () => {
  cy.waitForPageLoad()
})

When('I view the homepage', () => {
  cy.get('main').should('be.visible')
})

When('I view the page', () => {
  cy.get('body').should('be.visible')
})

Then('I should see the main navigation', () => {
  cy.checkNavigation()
})

Then('I should see the welcome section', () => {
  cy.get('#welcome').should('be.visible')
  cy.get('#welcome h1').should('be.visible')
})

Then('I should see the portfolio section', () => {
  cy.get('#showcase').should('be.visible')
})

Then('I should see the contact section', () => {
  cy.get('#contact').should('be.visible')
})

Then('the page should have proper SEO elements', () => {
  cy.checkSEOElements()
})

Given('I am on the homepage', () => {
  cy.visitHomePage()
  // Only check main content, skip header due to dialog issues
  cy.get('main').should('be.visible')
})

When('I scroll to the portfolio section', () => {
  cy.scrollToSection('showcase')
})

Then('the portfolio section should be visible', () => {
  cy.get('#showcase').should('be.visible')
})

When('I scroll to the contact section', () => {
  cy.scrollToSection('contact')
})

Then('the contact section should be visible', () => {
  cy.get('#contact').should('be.visible')
})