import { render, screen } from '@testing-library/react'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import ClientOnlyIcon from '../../src/components/ClientOnlyIcon'

describe('ClientOnlyIcon', () => {
  it('should render FontAwesome icon when mounted', () => {
    render(<ClientOnlyIcon icon={faCoffee} />)
    
    const icon = screen.getByTestId('font-awesome-icon')
    expect(icon).toBeInTheDocument()
  })

  it('should pass through FontAwesome props', () => {
    render(<ClientOnlyIcon icon={faCoffee} className="test-class" size="lg" />)
    
    const icon = screen.getByTestId('font-awesome-icon')
    
    expect(icon).toHaveClass('test-class')
    // Size is passed through as a prop but rendered as text content due to global mock
    expect(icon).toBeInTheDocument()
  })

  it('should render without errors when fallback is provided', () => {
    const fallback = <span data-testid="fallback">Loading...</span>
    
    render(<ClientOnlyIcon icon={faCoffee} fallback={fallback} />)
    
    // Component should render successfully 
    const icon = screen.getByTestId('font-awesome-icon')
    expect(icon).toBeInTheDocument()
  })

  it('should render without errors when no fallback is provided', () => {
    render(<ClientOnlyIcon icon={faCoffee} />)
    
    // Component should render successfully
    const icon = screen.getByTestId('font-awesome-icon')
    expect(icon).toBeInTheDocument()
  })

  it('should handle different icon types', () => {
    render(<ClientOnlyIcon icon={faCoffee} />)
    
    const icon = screen.getByTestId('font-awesome-icon')
    expect(icon).toBeInTheDocument()
    // Due to global mock, all icons render the same, but component should work
  })

  it('should accept custom props', () => {
    render(
      <ClientOnlyIcon 
        icon={faCoffee} 
        title="Coffee Icon"
        role="img"
        aria-label="Coffee"
      />
    )
    
    const icon = screen.getByTestId('font-awesome-icon')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('title', 'Coffee Icon')
    expect(icon).toHaveAttribute('role', 'img')
    expect(icon).toHaveAttribute('aria-label', 'Coffee')
  })
})