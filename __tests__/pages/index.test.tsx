// Simple smoke test for the Home page
describe('Home Page Module', () => {
  it('should export a default function', () => {
    const Home = require('../../pages/index').default
    expect(typeof Home).toBe('function')
  })

  it('should have the expected component name', () => {
    const Home = require('../../pages/index').default
    expect(Home.name).toBe('Home')
  })
})