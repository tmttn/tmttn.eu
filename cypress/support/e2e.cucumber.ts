// Import commands
import './commands'

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

// Mock GitHub API responses and dismiss dialogs before each test
beforeEach(() => {
  // Mock GitHub API to prevent rate limiting
  cy.intercept('GET', '**/api.github.com/**', {
    statusCode: 200,
    body: {
      total_count: 365,
      weeks: Array.from({ length: 52 }, (_, weekIndex) => ({
        w: Date.now() - (52 - weekIndex) * 7 * 24 * 60 * 60 * 1000,
        a: Math.floor(Math.random() * 10),
        d: Math.floor(Math.random() * 10),
        c: Math.floor(Math.random() * 10)
      }))
    }
  }).as('githubAPI')

  // Mock GitHub repos API
  cy.intercept('GET', '**/repos/**', {
    statusCode: 200,
    body: []
  }).as('githubRepos')

  // Dismiss any existing Next.js dialogs
  cy.get('body').then(($body) => {
    if ($body.find('[data-nextjs-dialog-backdrop]').length > 0) {
      cy.get('[data-nextjs-dialog-backdrop]').click({ force: true })
    }
  })
  
  // Clear any potential overlays
  cy.window().then((win) => {
    // Dismiss any error overlays that might interfere with tests
    const overlays = win.document.querySelectorAll('[data-nextjs-dialog-backdrop]')
    overlays.forEach(overlay => overlay.remove())
  })
})