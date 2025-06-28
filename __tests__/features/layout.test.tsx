import React from 'react'
import { render, screen } from '@testing-library/react'
import Layout from '@features/layout'

describe('Layout', () => {
  it('renders children correctly', () => {
    const testContent = 'Test content for layout'
    
    render(
      <Layout>
        <div>{testContent}</div>
      </Layout>
    )
    
    expect(screen.getByText(testContent)).toBeInTheDocument()
  })

  it('renders multiple children', () => {
    render(
      <Layout>
        <div>First child</div>
        <div>Second child</div>
        <span>Third child</span>
      </Layout>
    )
    
    expect(screen.getByText('First child')).toBeInTheDocument()
    expect(screen.getByText('Second child')).toBeInTheDocument()
    expect(screen.getByText('Third child')).toBeInTheDocument()
  })

  it('renders as a div wrapper', () => {
    const { container } = render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('handles empty children', () => {
    const { container } = render(<Layout>{null}</Layout>)
    
    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild?.textContent).toBe('')
  })

  it('handles React fragment as children', () => {
    render(
      <Layout>
        <>
          <div>Fragment child 1</div>
          <div>Fragment child 2</div>
        </>
      </Layout>
    )
    
    expect(screen.getByText('Fragment child 1')).toBeInTheDocument()
    expect(screen.getByText('Fragment child 2')).toBeInTheDocument()
  })

  it('handles complex nested children', () => {
    render(
      <Layout>
        <header>
          <h1>Header Title</h1>
        </header>
        <main>
          <section>
            <p>Main content</p>
          </section>
        </main>
        <footer>
          <p>Footer content</p>
        </footer>
      </Layout>
    )
    
    expect(screen.getByText('Header Title')).toBeInTheDocument()
    expect(screen.getByText('Main content')).toBeInTheDocument()
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })
})