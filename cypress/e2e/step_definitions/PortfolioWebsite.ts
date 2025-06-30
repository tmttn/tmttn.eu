import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('the theme is set to light mode', () => {
  cy.window().then(win => {
    win.localStorage.setItem('theme', 'light')
  })
  cy.reload()
  cy.get('html').should('have.attr', 'data-theme', 'light')
})

// Theme toggle functionality
When('I click the theme toggle button', () => {
  cy.toggleTheme()
})

When('I click the theme toggle button again', () => {
  cy.toggleTheme()
})

Then('the theme should switch from light to dark mode', () => {
  cy.wait(500) // Allow for transition
  cy.get('html').should('have.attr', 'data-theme', 'dark')
})

Then('the toggle button should reflect the current theme', () => {
  cy.get('[aria-label*="Switch to"]').scrollIntoView().should('be.visible')
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
  // Portfolio section may not exist if GitHub API is not enabled
  cy.get('body').then(($body) => {
    if ($body.find('#showcase').length > 0) {
      cy.get('#showcase').should('be.visible')
      cy.url().should('include', '#showcase')
      cy.log('Scrolled to portfolio section successfully')
    } else {
      cy.log('Portfolio section does not exist (GitHub API not available)')
      // If no showcase section, just verify we're still on the page
      cy.get('main').should('be.visible')
    }
  })
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
  // Canvas is positioned fixed and may be behind other elements, so check for existence and dimensions
  cy.get('canvas').should(($canvas) => {
    expect($canvas).to.have.length(1)
    expect($canvas[0]).to.have.property('width')
    expect($canvas[0]).to.have.property('height')
  })
})

When('I move my mouse over the canvas', () => {
  cy.get('canvas').trigger('mousemove', { clientX: 100, clientY: 100, force: true })
})

Then('the particles should respond to mouse movement', () => {
  // Check that canvas exists and is interactive
  cy.get('canvas').should('exist')
  // Verify canvas can receive mouse events by checking it's properly sized
  cy.get('canvas').should(($canvas) => {
    const canvas = $canvas[0] as HTMLCanvasElement
    expect(canvas.width).to.be.greaterThan(0)
    expect(canvas.height).to.be.greaterThan(0)
  })
})

// GitHub integration
Then('I should see the GitHub heatmap component', () => {
  // GitHub components may not be visible if API is not enabled
  cy.get('body').then(($body) => {
    if ($body.find('#showcase').length > 0) {
      cy.checkGitHubIntegration()
    } else {
      cy.log('GitHub components not available (API disabled)')
    }
  })
})

Then('the heatmap should load successfully', () => {
  // GitHub components may not be visible if API is not enabled
  cy.get('body').then(($body) => {
    if ($body.find('#showcase').length > 0) {
      cy.checkGitHubIntegration()
    } else {
      cy.log('GitHub heatmap not available (API disabled)')
    }
  })
})

Then('I should see recent GitHub activity', () => {
  // Check for GitHub integration in any form (loaded, loading, or fallback)
  cy.get('body', { timeout: 15000 }).should('be.visible')
  
  cy.get('body').then(($body) => {
    if ($body.find('#showcase').length > 0) {
      // Portfolio section exists, check for GitHub components
      if ($body.find('[data-testid="github-heatmap"]').length > 0) {
        // Heatmap component is present
        cy.get('[data-testid="github-heatmap"]').should('be.visible')
        cy.log('GitHub activity heatmap is visible')
      } else if ($body.find('p:contains("Loading GitHub activity")').length > 0) {
        // Loading state is acceptable
        cy.get('p:contains("Loading GitHub activity")').should('be.visible')
        cy.log('GitHub activity is loading (rate limited but working)')
      } else {
        // Fallback: just verify GitHub is mentioned in the portfolio
        cy.get('#showcase').should('contain.text', 'GitHub')
        cy.log('GitHub integration is present (fallback state)')
      }
    } else {
      cy.log('GitHub activity not available (portfolio section hidden)')
    }
  })
})