import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Section from '../../src/features/section'

describe('Section', () => {
  it('renders with correct id', () => {
    render(
      <Section id="test-section">
        <p>Test content</p>
      </Section>
    )
    
    const section = document.querySelector('section')
    expect(section).toHaveAttribute('id', 'test-section')
  })

  it('renders children content', () => {
    render(
      <Section id="content-section">
        <h2>Section Title</h2>
        <p>Section content</p>
      </Section>
    )
    
    expect(screen.getByText('Section Title')).toBeInTheDocument()
    expect(screen.getByText('Section content')).toBeInTheDocument()
  })

  it('renders without id when not provided', () => {
    render(
      <Section>
        <p>Content without id</p>
      </Section>
    )
    
    const section = document.querySelector('section')
    expect(section).not.toHaveAttribute('id')
    expect(screen.getByText('Content without id')).toBeInTheDocument()
  })

  it('renders multiple children', () => {
    render(
      <Section id="multi-content">
        <div>First child</div>
        <div>Second child</div>
        <span>Third child</span>
      </Section>
    )
    
    expect(screen.getByText('First child')).toBeInTheDocument()
    expect(screen.getByText('Second child')).toBeInTheDocument()
    expect(screen.getByText('Third child')).toBeInTheDocument()
  })

  it('handles complex nested content', () => {
    render(
      <Section id="nested-content">
        <div>
          <h3>Nested Title</h3>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      </Section>
    )
    
    expect(screen.getByText('Nested Title')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('renders as a semantic section element', () => {
    render(
      <Section id="semantic-test">
        Content
      </Section>
    )
    
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(section!.tagName).toBe('SECTION')
  })

  it('passes through all props correctly', () => {
    render(
      <Section id="props-test">
        Content
      </Section>
    )
    
    const section = document.querySelector('section')
    expect(section).toHaveAttribute('id', 'props-test')
    expect(section).toBeInTheDocument()
  })

  it('handles empty children gracefully', () => {
    render(<Section id="empty-section" />)
    
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('id', 'empty-section')
    expect(section).toBeEmptyDOMElement()
  })

  it('handles null and undefined children', () => {
    render(
      <Section id="null-children">
        {null}
        {undefined}
        <p>Valid content</p>
      </Section>
    )
    
    expect(screen.getByText('Valid content')).toBeInTheDocument()
  })

  it('handles boolean children (should not render)', () => {
    render(
      <Section id="boolean-children">
        {true}
        {false}
        <p>Visible content</p>
      </Section>
    )
    
    expect(screen.getByText('Visible content')).toBeInTheDocument()
    // Boolean values should not render as text
    expect(screen.queryByText('true')).not.toBeInTheDocument()
    expect(screen.queryByText('false')).not.toBeInTheDocument()
  })

  it('handles string children', () => {
    render(
      <Section id="string-children">
        This is a string child
      </Section>
    )
    
    expect(screen.getByText('This is a string child')).toBeInTheDocument()
  })

  it('handles numeric children', () => {
    render(
      <Section id="numeric-children">
        {42}
        {0}
        {-1}
      </Section>
    )
    
    expect(screen.getByText(/42/)).toBeInTheDocument()
    expect(screen.getByText(/0/)).toBeInTheDocument() 
    expect(screen.getByText(/-1/)).toBeInTheDocument()
  })

  it('handles array children', () => {
    const items = ['Item A', 'Item B', 'Item C']
    
    render(
      <Section id="array-children">
        {items.map(item => <div key={item}>{item}</div>)}
      </Section>
    )
    
    expect(screen.getByText('Item A')).toBeInTheDocument()
    expect(screen.getByText('Item B')).toBeInTheDocument()
    expect(screen.getByText('Item C')).toBeInTheDocument()
  })

  it('preserves accessibility attributes', () => {
    render(
      <Section id="accessible-section">
        <p id="section-description">This section contains main content</p>
      </Section>
    )
    
    const section = document.querySelector('section')
    expect(section).toHaveAttribute('id', 'accessible-section')
    expect(screen.getByText('This section contains main content')).toBeInTheDocument()
  })
})
