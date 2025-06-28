describe('Portfolio Website - Basic E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.wait(1000) // Allow for initial load
  })

  it('loads the homepage successfully', () => {
    cy.get('main').should('be.visible')
    cy.get('header').should('be.visible')
    cy.title().should('not.be.empty')
  })

  it('displays essential sections', () => {
    cy.get('#welcome').should('be.visible')
    cy.get('#welcome h1').should('contain.text', 'Tom Metten')
    cy.get('#about').should('be.visible')
    cy.get('#contact').should('be.visible')
    cy.get('#showcase').should('be.visible')
  })

  it('has working navigation', () => {
    cy.get('nav').should('be.visible')
    cy.get('nav a').should('have.length.greaterThan', 0)
  })

  it('displays particle background', () => {
    cy.get('canvas').should('exist')
    // Canvas exists as background element
  })

  it('has theme toggle functionality', () => {
    cy.get('[aria-label*="theme"]').should('be.visible')
    cy.get('[aria-label*="theme"]').click()
    cy.wait(500) // Allow for theme transition
  })

  it('displays GitHub heatmap', () => {
    cy.get('[data-testid="github-heatmap"]').should('be.visible')
  })

  it('has proper SEO elements', () => {
    cy.title().should('not.be.empty')
    cy.get('meta[name="description"]').should('exist')
    cy.get('meta[property="og:title"]').should('exist')
    cy.get('meta[property="og:description"]').should('exist')
  })

  it('is responsive on mobile viewport', () => {
    cy.viewport(375, 667)
    cy.get('header').should('be.visible')
    cy.get('main').should('be.visible')
  })

  it('is responsive on tablet viewport', () => {
    cy.viewport(768, 1024)
    cy.get('nav').should('be.visible')
    cy.get('header').should('be.visible')
    cy.get('main').should('be.visible')
  })

  it('loads within reasonable time', () => {
    cy.window().then((win) => {
      const performance = win.performance
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      const loadTime = navigation.loadEventEnd - navigation.fetchStart
      expect(loadTime).to.be.lessThan(5000) // 5 seconds for safe CI execution
    })
  })

  it('has accessible navigation', () => {
    cy.get('nav').should('exist')
    cy.get('main').should('exist')
    cy.get('h1').should('exist')
  })
})