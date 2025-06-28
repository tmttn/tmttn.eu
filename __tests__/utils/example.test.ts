// Example utility function tests
describe('Utility Functions', () => {
  describe('Math utilities', () => {
    it('should add two numbers correctly', () => {
      const add = (a: number, b: number) => a + b
      expect(add(2, 3)).toBe(5)
      expect(add(-1, 1)).toBe(0)
      expect(add(0, 0)).toBe(0)
    })

    it('should handle floating point numbers', () => {
      const multiply = (a: number, b: number) => a * b
      expect(multiply(0.1, 0.2)).toBeCloseTo(0.02, 5)
    })
  })

  describe('String utilities', () => {
    it('should capitalize first letter', () => {
      const capitalize = (str: string) => 
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
      
      expect(capitalize('hello')).toBe('Hello')
      expect(capitalize('WORLD')).toBe('World')
      expect(capitalize('')).toBe('')
    })

    it('should format URL slugs', () => {
      const createSlug = (str: string) => 
        str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      
      expect(createSlug('Hello World')).toBe('hello-world')
      expect(createSlug('Next.js & React!')).toBe('nextjs--react')
    })
  })
})