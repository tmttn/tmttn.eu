import { render, screen, act } from '@testing-library/react'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import ClientOnlyIcon from '../../src/components/ClientOnlyIcon'

// Mock FontAwesome Icon to avoid rendering issues in tests
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, className, size, ...props }: any) => (
    <span 
      data-testid="font-awesome-icon" 
      data-icon={icon?.iconName || 'mug-saucer'} 
      className={className}
      data-size={size}
      {...props} 
    />
  ),
}))

// Mock useState to control the component state
const mockSetState = jest.fn()
const mockUseState = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
  // Reset useState mock
  jest.spyOn(require('react'), 'useState').mockRestore()
})

describe('ClientOnlyIcon', () => {
  it('should render fallback initially before hydration', () => {
    // Mock useState to return false for hasMounted
    jest.spyOn(require('react'), 'useState').mockReturnValue([false, mockSetState])
    
    const fallback = <span data-testid="fallback">Loading...</span>
    
    render(<ClientOnlyIcon icon={faCoffee} fallback={fallback} />)
    
    expect(screen.getByTestId('fallback')).toBeInTheDocument()
  })

  it('should render FontAwesome icon after hydration', () => {
    // Mock useState to return true for hasMounted
    jest.spyOn(require('react'), 'useState').mockReturnValue([true, mockSetState])
    
    render(<ClientOnlyIcon icon={faCoffee} />)
    
    expect(screen.getByTestId('font-awesome-icon')).toBeInTheDocument()
    expect(screen.getByTestId('font-awesome-icon')).toHaveAttribute('data-icon', 'mug-saucer')
  })

  it('should render null fallback when no fallback is provided', () => {
    // Mock useState to return false for hasMounted
    jest.spyOn(require('react'), 'useState').mockReturnValue([false, mockSetState])
    
    const { container } = render(<ClientOnlyIcon icon={faCoffee} />)
    
    // Initially should render nothing (null fallback)
    expect(container.firstChild).toBeNull()
  })

  it('should pass through FontAwesome props', () => {
    // Mock useState to return true for hasMounted
    jest.spyOn(require('react'), 'useState').mockReturnValue([true, mockSetState])
    
    render(<ClientOnlyIcon icon={faCoffee} className="test-class" size="lg" />)
    
    const icon = screen.getByTestId('font-awesome-icon')
    
    expect(icon).toHaveClass('test-class')
    expect(icon).toHaveAttribute('data-size', 'lg')
  })
})