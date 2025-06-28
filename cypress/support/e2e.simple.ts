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