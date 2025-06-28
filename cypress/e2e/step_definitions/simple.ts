import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Additional step definitions that don't duplicate existing ones

When('I look at the page', () => {
  cy.get('body').should('be.visible')
})

Then('I should see the main content area', () => {
  cy.get('main').should('be.visible')
})

Then('I should see the main content', () => {
  cy.get('main').should('be.visible')
})