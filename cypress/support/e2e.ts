// Import commands.js using ES2015 syntax:
import './commands'

// Global happy path fixture setup
beforeEach(() => {
  // Set up global mocks by default
  setupHappyPathMocks()
  
  // Reset theme state before each test
  cy.window().then((win) => {
    win.localStorage.removeItem('theme')
    if (win.document.documentElement) {
      win.document.documentElement.dataset.theme = 'light'
    }
    
    // Set up page resources alias for performance tests
    const performance = win.performance
    if (performance && performance.getEntriesByType) {
      const resources = performance.getEntriesByType('resource')
      cy.wrap(resources).as('pageResources')
    }
  })
})

// GitHub API mocking setup for happy path scenarios
export function setupHappyPathMocks() {
  // Mock GitHub repositories API
  cy.fixture('github-repositories').then((repositories) => {
    cy.intercept('GET', 'https://api.github.com/users/tmttn/repos*', {
      statusCode: 200,
      body: repositories,
      headers: {
        'content-type': 'application/json'
      }
    }).as('getRepositories')
  })

  // Mock GitHub events API for contribution data
  cy.fixture('github-events').then((events) => {
    cy.intercept('GET', 'https://api.github.com/users/tmttn/events/public*', {
      statusCode: 200,
      body: events,
      headers: {
        'content-type': 'application/json'
      }
    }).as('getEvents')
  })
}

// Hide fetch/XHR logs in Cypress runner for cleaner output
Cypress.on('window:before:load', (win) => {
  // Disable service worker registration during tests
  if (win.navigator && 'serviceWorker' in win.navigator) {
    Object.defineProperty(win.navigator, 'serviceWorker', {
      value: undefined,
      configurable: true
    })
  }
})