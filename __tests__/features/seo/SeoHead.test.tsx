import React from 'react'
import { render } from '@testing-library/react'
import SEOHead from '@features/seo/SeoHead'

// Import the interface from the component file
type SEOHeadProps = React.ComponentProps<typeof SEOHead>

// Mock Next.js Head component to capture props for testing
const mockHeadChildren: React.ReactNode[] = []
jest.mock('next/head', () => {
  return function MockHead({ children }: { children: React.ReactNode }) {
    mockHeadChildren.length = 0 // Clear previous children
    React.Children.forEach(children, (child) => {
      mockHeadChildren.push(child)
    })
    return null // Don't render anything
  }
})

interface RenderedTag {
  type: string
  props: Record<string, any>
}

const getRenderedTags = (): RenderedTag[] => {
  return mockHeadChildren
    .map((child: any) => {
      if (React.isValidElement(child)) {
        return {
          type: child.type,
          props: child.props,
        }
      }
      return null
    })
    .filter((tag): tag is RenderedTag => tag !== null)
}

describe('SEOHead', () => {
  beforeEach(() => {
    mockHeadChildren.length = 0
  })

  it('renders with default props', () => {
    render(<SEOHead />)
    
    const tags = getRenderedTags()
    
    // Check title
    const titleTag = tags.find(tag => tag.type === 'title')
    expect(titleTag).toBeTruthy()
    expect((titleTag as any)?.props?.children).toBe('Tom Metten - Full-Stack Developer & Tech Enthusiast')
    
    // Check description meta tag
    const descriptionTag = tags.find(tag => 
      tag.type === 'meta' && (tag as any).props?.name === 'description'
    )
    expect(descriptionTag).toBeTruthy()
    expect((descriptionTag as any)?.props?.content).toBe(
      'Tom Metten is a passionate full-stack developer from Belgium, specializing in modern web technologies, React, TypeScript, and cloud solutions. Explore my portfolio and get in touch.'
    )
  })

  it('renders custom title correctly', () => {
    const customTitle = 'About Me'
    render(<SEOHead title={customTitle} />)
    
    const tags = getRenderedTags()
    const titleTag = tags.find(tag => tag.type === 'title')
    expect(titleTag?.props.children).toBe('About Me | Tom Metten')
  })

  it('renders full custom title when it matches default', () => {
    const defaultTitle = 'Tom Metten - Full-Stack Developer & Tech Enthusiast'
    render(<SEOHead title={defaultTitle} />)
    
    const tags = getRenderedTags()
    const titleTag = tags.find(tag => tag.type === 'title')
    expect(titleTag?.props.children).toBe(defaultTitle)
  })

  it('renders custom description', () => {
    const customDescription = 'Custom description for SEO'
    render(<SEOHead description={customDescription} />)
    
    const tags = getRenderedTags()
    const descriptionTag = tags.find(tag => 
      tag.type === 'meta' && tag.props.name === 'description'
    )
    expect(descriptionTag?.props.content).toBe(customDescription)
  })

  it('renders custom keywords', () => {
    const customKeywords = 'react, typescript, developer'
    render(<SEOHead keywords={customKeywords} />)
    
    const tags = getRenderedTags()
    const keywordsTag = tags.find(tag => 
      tag.type === 'meta' && tag.props.name === 'keywords'
    )
    expect(keywordsTag?.props.content).toBe(customKeywords)
  })

  it('renders Open Graph meta tags', () => {
    const props = {
      ogTitle: 'OG Title',
      ogDescription: 'OG Description',
      ogImage: '/custom-image.jpg',
      ogUrl: 'https://example.com'
    }
    
    render(<SEOHead {...props} />)
    
    const tags = getRenderedTags()
    
    const ogTitleTag = tags.find(tag => 
      tag.type === 'meta' && tag.props.property === 'og:title'
    )
    expect(ogTitleTag?.props.content).toBe(props.ogTitle)
    
    const ogDescriptionTag = tags.find(tag => 
      tag.type === 'meta' && tag.props.property === 'og:description'
    )
    expect(ogDescriptionTag?.props.content).toBe(props.ogDescription)
    
    const ogImageTag = tags.find(tag => 
      tag.type === 'meta' && tag.props.property === 'og:image'
    )
    expect(ogImageTag?.props.content).toBe(props.ogImage)
    
    const ogUrlTag = tags.find(tag => 
      tag.type === 'meta' && tag.props.property === 'og:url'
    )
    expect(ogUrlTag?.props.content).toBe(props.ogUrl)
  })

  it('renders Twitter Card meta tags', () => {
    const props = {
      twitterCard: 'summary' as const,
      ogTitle: 'Twitter Title',
      ogDescription: 'Twitter Description',
      ogImage: '/twitter-image.jpg'
    } as Partial<SEOHeadProps>
    
    render(<SEOHead {...props} />)
    
    const tags = getRenderedTags()
    
    const twitterCardTag = tags.find(tag => 
      tag.type === 'meta' && tag.props.name === 'twitter:card'
    )
    expect(twitterCardTag?.props.content).toBe('summary')
    
    const twitterTitleTag = tags.find(tag => 
      tag.type === 'meta' && tag.props.name === 'twitter:title'
    )
    expect(twitterTitleTag?.props.content).toBe(props.ogTitle)
  })

  it('renders canonical URL when provided', () => {
    const canonicalUrl = 'https://tmttn.eu/about'
    render(<SEOHead canonicalUrl={canonicalUrl} />)
    
    const tags = getRenderedTags()
    const canonicalTag = tags.find(tag => 
      tag.type === 'link' && tag.props.rel === 'canonical'
    )
    expect(canonicalTag?.props.href).toBe(canonicalUrl)
  })

  it('does not render canonical URL when not provided', () => {
    render(<SEOHead />)
    
    const tags = getRenderedTags()
    const canonicalTag = tags.find(tag => 
      tag.type === 'link' && tag.props.rel === 'canonical'
    )
    expect(canonicalTag).toBeUndefined()
  })

  it('renders noindex meta tag when noindex is true', () => {
    render(<SEOHead noindex={true} />)
    
    const tags = getRenderedTags()
    const robotsTag = tags.find(tag => 
      tag.type === 'meta' && tag.props.name === 'robots'
    )
    expect(robotsTag?.props.content).toBe('noindex, nofollow')
  })

  it('does not render noindex meta tag when noindex is false', () => {
    render(<SEOHead noindex={false} />)
    
    const tags = getRenderedTags()
    const robotsTag = tags.find(tag => 
      tag.type === 'meta' && tag.props.name === 'robots'
    )
    expect(robotsTag).toBeUndefined()
  })

  it('renders structured data when provided', () => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Tom Metten'
    }
    
    render(<SEOHead structuredData={structuredData} />)
    
    const tags = getRenderedTags()
    const scriptTag = tags.find(tag => 
      tag.type === 'script' && tag.props.type === 'application/ld+json'
    )
    expect(scriptTag).toBeDefined()
    expect(scriptTag?.props.dangerouslySetInnerHTML.__html).toBe(JSON.stringify(structuredData))
  })

  it('does not render structured data when not provided', () => {
    render(<SEOHead />)
    
    const tags = getRenderedTags()
    const scriptTag = tags.find(tag => 
      tag.type === 'script' && tag.props.type === 'application/ld+json'
    )
    expect(scriptTag).toBeUndefined()
  })

  it('renders all required meta tags', () => {
    render(<SEOHead />)
    
    const tags = getRenderedTags()
    
    // Basic meta tags
    const authorTag = tags.find(tag => 
      tag.type === 'meta' && tag.props.name === 'author'
    )
    expect(authorTag?.props.content).toBe('Tom Metten')
    
    const viewportTag = tags.find(tag => 
      tag.type === 'meta' && tag.props.name === 'viewport'
    )
    expect(viewportTag?.props.content).toBe('width=device-width, initial-scale=1')
    
    // Theme colors
    const themeColorTag = tags.find(tag => 
      tag.type === 'meta' && tag.props.name === 'theme-color'
    )
    expect(themeColorTag?.props.content).toBe('#60a5fa')
    
    // Favicon
    const faviconTag = tags.find(tag => 
      tag.type === 'link' && tag.props.rel === 'icon'
    )
    expect(faviconTag?.props.href).toBe('/favicon.ico')
  })

  it('uses ogTitle and ogDescription defaults from title and description when not specified', () => {
    const title = 'Custom Page Title'
    const description = 'Custom page description'
    
    render(<SEOHead title={title} description={description} />)
    
    const tags = getRenderedTags()
    
    const ogTitleTag = tags.find(tag => 
      tag.type === 'meta' && tag.props.property === 'og:title'
    )
    // ogTitle defaults to the raw title parameter, not the formatted fullTitle
    expect(ogTitleTag?.props.content).toBe('Custom Page Title')
    
    const ogDescriptionTag = tags.find(tag => 
      tag.type === 'meta' && tag.props.property === 'og:description'
    )
    expect(ogDescriptionTag?.props.content).toBe(description)
  })

  it('handles complex structured data correctly', () => {
    const complexStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Tom Metten Portfolio',
      'author': {
        '@type': 'Person',
        'name': 'Tom Metten',
        'jobTitle': 'Full-Stack Developer'
      },
      'dateCreated': '2023-01-01'
    }
    
    render(<SEOHead structuredData={complexStructuredData} />)
    
    const tags = getRenderedTags()
    const scriptTag = tags.find(tag => 
      tag.type === 'script' && tag.props.type === 'application/ld+json'
    )
    expect(scriptTag).toBeDefined()
    
    const parsedData = JSON.parse(scriptTag?.props.dangerouslySetInnerHTML.__html ?? '{}')
    expect(parsedData).toEqual(complexStructuredData)
  })
})