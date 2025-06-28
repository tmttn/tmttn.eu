// Import commands.js using ES2015 syntax:
import './commands'

// Import Cypress Cucumber preprocessor
import '@badeball/cypress-cucumber-preprocessor/support'

import { mount } from 'cypress/react18'

// Augment the Cypress namespace to include type definitions for
// your custom command.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', mount)

// Example use:
// cy.mount(<MyComponent />)