import '@testing-library/jest-dom'
import React from 'react'

// Global mock for FontAwesome to avoid prop warnings
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, className, size, spin, ...props }: any) => {
    // Filter out FontAwesome-specific props that cause warnings
    const filteredProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => 
        !key.startsWith('$') && // Styled-components props
        !['spin', 'pulse', 'beat', 'fade', 'beatFade', 'bounce', 'flip', 'shake', 'spinPulse', 'spinReverse'].includes(key) // FontAwesome animation props
      )
    )
    
    return React.createElement('span', {
      'data-testid': 'font-awesome-icon',
      'data-icon': icon?.iconName || 'icon',
      className,
      'data-size': size,
      'data-spin': spin,
      ...filteredProps
    }, icon?.iconName || '⭐')
  }
}))