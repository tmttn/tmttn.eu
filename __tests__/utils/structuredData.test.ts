import { personStructuredData, websiteStructuredData, portfolioStructuredData } from '@utils/structuredData'

describe('structuredData', () => {
  describe('personStructuredData', () => {
    it('has correct schema.org context and type', () => {
      expect(personStructuredData['@context']).toBe('https://schema.org')
      expect(personStructuredData['@type']).toBe('Person')
    })

    it('contains required person information', () => {
      expect(personStructuredData.name).toBe('Tom Metten')
      expect(personStructuredData.url).toBe('https://tmttn.eu')
      expect(personStructuredData.image).toBe('https://tmttn.eu/static/square-profile-picture.jpg')
      expect(personStructuredData.jobTitle).toBe('Full-Stack Developer')
    })

    it('contains work information', () => {
      expect(personStructuredData.worksFor).toEqual({
        '@type': 'Organization',
        'name': 'ACA Group',
        'url': 'https://www.acagroup.be'
      })
    })

    it('contains address information', () => {
      expect(personStructuredData.address).toEqual({
        '@type': 'PostalAddress',
        'addressCountry': 'Belgium'
      })
    })

    it('contains social media links', () => {
      expect(personStructuredData.sameAs).toEqual([
        'https://github.com/tmttn',
        'https://www.linkedin.com/in/tmetten/',
        'https://github.com/less-is-code',
        'https://www.twitch.tv/bizarius',
        'https://discord.gg/G5E8XWR',
        'https://www.facebook.com/mettentom'
      ])
    })

    it('contains knowledge areas', () => {
      expect(personStructuredData.knowsAbout).toEqual([
        'JavaScript',
        'TypeScript',
        'React',
        'Next.js',
        'Node.js',
        'Full-Stack Development',
        'Web Development',
        'Software Engineering'
      ])
    })

    it('has a description', () => {
      expect(personStructuredData.description).toBe(
        'Tom Metten is a passionate full-stack developer from Belgium, specializing in modern web technologies, React, TypeScript, and cloud solutions.'
      )
    })
  })

  describe('websiteStructuredData', () => {
    it('has correct schema.org context and type', () => {
      expect(websiteStructuredData['@context']).toBe('https://schema.org')
      expect(websiteStructuredData['@type']).toBe('WebSite')
    })

    it('contains basic website information', () => {
      expect(websiteStructuredData.name).toBe('Tom Metten - Portfolio')
      expect(websiteStructuredData.url).toBe('https://tmttn.eu')
      expect(websiteStructuredData.description).toBe('Personal portfolio and blog of Tom Metten, a full-stack developer from Belgium')
      expect(websiteStructuredData.inLanguage).toBe('en-US')
    })

    it('contains author information', () => {
      expect(websiteStructuredData.author).toEqual({
        '@type': 'Person',
        'name': 'Tom Metten'
      })
    })

    it('contains copyright information', () => {
      const currentYear = new Date().getFullYear()
      expect(websiteStructuredData.copyrightYear).toBe(currentYear)
      expect(websiteStructuredData.copyrightHolder).toEqual({
        '@type': 'Person',
        'name': 'Tom Metten'
      })
    })
  })

  describe('portfolioStructuredData', () => {
    it('has correct schema.org context and type', () => {
      expect(portfolioStructuredData['@context']).toBe('https://schema.org')
      expect(portfolioStructuredData['@type']).toBe('CreativeWork')
    })

    it('contains portfolio information', () => {
      expect(portfolioStructuredData.name).toBe("Tom Metten's Development Portfolio")
      expect(portfolioStructuredData.description).toBe('A showcase of web development projects and open-source contributions')
      expect(portfolioStructuredData.url).toBe('https://tmttn.eu/#showcase')
      expect(portfolioStructuredData.genre).toBe('Software Development Portfolio')
    })

    it('contains author information', () => {
      expect(portfolioStructuredData.author).toEqual({
        '@type': 'Person',
        'name': 'Tom Metten'
      })
    })

    it('contains date information', () => {
      expect(portfolioStructuredData.dateCreated).toBe('2023-01-01')
      
      // Check that dateModified is today's date
      const today = new Date().toISOString().split('T')[0]
      expect(portfolioStructuredData.dateModified).toBe(today)
    })
  })

  describe('structured data validation', () => {
    it('all structured data objects are valid JSON', () => {
      expect(() => JSON.stringify(personStructuredData)).not.toThrow()
      expect(() => JSON.stringify(websiteStructuredData)).not.toThrow()
      expect(() => JSON.stringify(portfolioStructuredData)).not.toThrow()
    })

    it('person structured data contains all required fields for Person schema', () => {
      const requiredFields = ['@context', '@type', 'name']
      requiredFields.forEach(field => {
        expect(personStructuredData).toHaveProperty(field)
      })
    })

    it('website structured data contains all required fields for WebSite schema', () => {
      const requiredFields = ['@context', '@type', 'name', 'url']
      requiredFields.forEach(field => {
        expect(websiteStructuredData).toHaveProperty(field)
      })
    })

    it('portfolio structured data contains all required fields for CreativeWork schema', () => {
      const requiredFields = ['@context', '@type', 'name', 'author']
      requiredFields.forEach(field => {
        expect(portfolioStructuredData).toHaveProperty(field)
      })
    })

    it('URLs in structured data are valid', () => {
      const urlPattern = /^https?:\/\/.+/
      
      expect(personStructuredData.url).toMatch(urlPattern)
      expect(personStructuredData.image).toMatch(urlPattern)
      expect(personStructuredData.worksFor.url).toMatch(urlPattern)
      
      personStructuredData.sameAs.forEach(url => {
        expect(url).toMatch(urlPattern)
      })
      
      expect(websiteStructuredData.url).toMatch(urlPattern)
      expect(portfolioStructuredData.url).toMatch(urlPattern)
    })

    it('dates in structured data are in correct format', () => {
      const datePattern = /^\d{4}-\d{2}-\d{2}$/
      
      expect(portfolioStructuredData.dateCreated).toMatch(datePattern)
      expect(portfolioStructuredData.dateModified).toMatch(datePattern)
      
      // Copyright year should be a number
      expect(typeof websiteStructuredData.copyrightYear).toBe('number')
      expect(websiteStructuredData.copyrightYear).toBeGreaterThan(2020)
      expect(websiteStructuredData.copyrightYear).toBeLessThanOrEqual(new Date().getFullYear())
    })
  })
})