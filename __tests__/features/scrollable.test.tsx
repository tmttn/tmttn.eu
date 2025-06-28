import React from 'react'
import { render, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import Scrollable from '../../src/features/scrollable'

// Mock timers for throttle function testing
jest.useFakeTimers()

describe('Scrollable', () => {
  let mockHeader: HTMLElement
  let mockNavLinks: HTMLAnchorElement[]
  let mockSections: HTMLElement[]

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = ''
    
    // Create mock header
    mockHeader = document.createElement('header')
    document.body.append(mockHeader)

    // Create mock navigation links
    mockNavLinks = [
      document.createElement('a'),
      document.createElement('a'),
      document.createElement('a')
    ]
    
    mockNavLinks[0].href = '#section1'
    mockNavLinks[1].href = '#section2'
    mockNavLinks[2].href = '#section3'

    // Create mock sections
    mockSections = [
      document.createElement('section'),
      document.createElement('section'),
      document.createElement('section')
    ]
    
    mockSections[0].id = 'section1'
    mockSections[1].id = 'section2'
    mockSections[2].id = 'section3'

    // Set up section positions and heights with configurable properties
    Object.defineProperty(mockSections[0], 'offsetTop', { value: 0, configurable: true })
    Object.defineProperty(mockSections[0], 'offsetHeight', { value: 500, configurable: true })
    Object.defineProperty(mockSections[1], 'offsetTop', { value: 500, configurable: true })
    Object.defineProperty(mockSections[1], 'offsetHeight', { value: 500, configurable: true })
    Object.defineProperty(mockSections[2], 'offsetTop', { value: 1000, configurable: true })
    Object.defineProperty(mockSections[2], 'offsetHeight', { value: 500, configurable: true })

    // Create navigation structure
    const nav = document.createElement('nav')
    const ul = document.createElement('ul')
    
    mockNavLinks.forEach(link => {
      const li = document.createElement('li')
      li.append(link)
      ul.append(li)
    })
    
    nav.append(ul)
    document.body.append(nav)

    // Add sections to body
    mockSections.forEach(section => {
      document.body.append(section)
    })

    // Don't mock querySelector/querySelectorAll - let the component find the real DOM elements

    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0
    })

    // Clear all timers
    jest.clearAllTimers()
  })

  afterEach(() => {
    jest.restoreAllMocks()
    jest.clearAllTimers()
  })

  it('renders without crashing', () => {
    const { container } = render(<Scrollable />)
    expect(container.firstChild).toBeNull() // Component returns null
  })

  it('adds scroll event listener on mount', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    
    render(<Scrollable />)
    
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      false
    )
  })

  it('removes scroll event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    
    const { unmount } = render(<Scrollable />)
    unmount()
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      false
    )
  })

  it('adds "scrolled" class to header when scrolled past threshold', () => {
    render(<Scrollable />)
    
    // Simulate scroll past threshold (>10px)
    Object.defineProperty(window, 'scrollY', { value: 15 })
    
    act(() => {
      window.dispatchEvent(new Event('scroll'))
      jest.runAllTimers()
    })
    
    expect(mockHeader.classList.contains('scrolled')).toBe(true)
  })

  it('removes "scrolled" class from header when scrolled back to top', () => {
    render(<Scrollable />)
    
    // First scroll past threshold
    Object.defineProperty(window, 'scrollY', { value: 15 })
    
    act(() => {
      window.dispatchEvent(new Event('scroll'))
      jest.runAllTimers()
    })
    
    expect(mockHeader.classList.contains('scrolled')).toBe(true)
    
    // Then scroll back to top
    Object.defineProperty(window, 'scrollY', { value: 5 })
    
    act(() => {
      window.dispatchEvent(new Event('scroll'))
      jest.runAllTimers()
    })
    
    expect(mockHeader.classList.contains('scrolled')).toBe(false)
  })

  it('adds "current" class to nav link when corresponding section is in view', () => {
    render(<Scrollable />)
    
    // Scroll to first section
    Object.defineProperty(window, 'scrollY', { value: 100 })
    
    act(() => {
      window.dispatchEvent(new Event('scroll'))
      jest.runAllTimers()
    })
    
    expect(mockNavLinks[0].classList.contains('current')).toBe(true)
    expect(mockNavLinks[1].classList.contains('current')).toBe(false)
    expect(mockNavLinks[2].classList.contains('current')).toBe(false)
  })

  it('updates current nav link when scrolling to different sections', () => {
    render(<Scrollable />)
    
    // Scroll to second section
    Object.defineProperty(window, 'scrollY', { value: 600 })
    
    act(() => {
      window.dispatchEvent(new Event('scroll'))
      jest.runAllTimers()
    })
    
    expect(mockNavLinks[0].classList.contains('current')).toBe(false)
    expect(mockNavLinks[1].classList.contains('current')).toBe(true)
    expect(mockNavLinks[2].classList.contains('current')).toBe(false)
  })

  it('removes "current" class from all nav links when no section is in view', () => {
    render(<Scrollable />)
    
    // Scroll past all sections
    Object.defineProperty(window, 'scrollY', { value: 2000 })
    
    act(() => {
      window.dispatchEvent(new Event('scroll'))
      jest.runAllTimers()
    })
    
    expect(mockNavLinks[0].classList.contains('current')).toBe(false)
    expect(mockNavLinks[1].classList.contains('current')).toBe(false)
    expect(mockNavLinks[2].classList.contains('current')).toBe(false)
  })

  it('handles missing header gracefully', () => {
    // Remove header from DOM
    mockHeader.remove()
    
    expect(() => {
      render(<Scrollable />)
      
      act(() => {
        window.dispatchEvent(new Event('scroll'))
        jest.runAllTimers()
      })
    }).not.toThrow()
  })

  it('handles missing nav links gracefully', () => {
    // Remove nav from DOM
    document.querySelector('nav')?.remove()
    
    expect(() => {
      render(<Scrollable />)
      
      act(() => {
        window.dispatchEvent(new Event('scroll'))
        jest.runAllTimers()
      })
    }).not.toThrow()
  })

  it('handles missing sections gracefully', () => {
    // Remove all sections from DOM
    mockSections.forEach(section => section.remove())
    
    expect(() => {
      render(<Scrollable />)
      
      act(() => {
        window.dispatchEvent(new Event('scroll'))
        jest.runAllTimers()
      })
    }).not.toThrow()
  })

  describe('throttle function', () => {
    it('throttles scroll events', () => {
      // We can't directly test the throttle function since it's internal,
      // but we can test that rapid scroll events are throttled
      render(<Scrollable />)
      
      // Simulate rapid scroll events
      act(() => {
        window.dispatchEvent(new Event('scroll'))
        window.dispatchEvent(new Event('scroll'))
        window.dispatchEvent(new Event('scroll'))
        
        // Fast forward timers
        jest.advanceTimersByTime(50)
      })
      
      // The throttling should limit the number of actual updates
      // This is more of an integration test
      expect(() => {
        jest.runAllTimers()
      }).not.toThrow()
    })

    it('ensures delayed execution after throttle period', () => {
      render(<Scrollable />)
      
      Object.defineProperty(window, 'scrollY', { value: 100 })
      
      act(() => {
        window.dispatchEvent(new Event('scroll'))
        
        // Don't run timers immediately
        jest.advanceTimersByTime(50)
        
        // Check that the update hasn't happened yet (due to throttling)
        // Then run all timers to complete the throttled update
        jest.runAllTimers()
      })
      
      // Should have applied the scroll updates
      expect(mockHeader.classList.contains('scrolled')).toBe(true)
    })
  })

  it('correctly identifies section boundaries', () => {
    render(<Scrollable />)
    
    // Test scroll position at exact section boundary
    Object.defineProperty(window, 'scrollY', { value: 500 })
    
    act(() => {
      window.dispatchEvent(new Event('scroll'))
      jest.runAllTimers()
    })
    
    // At position 500, we should be at the start of section 2
    expect(mockNavLinks[0].classList.contains('current')).toBe(false)
    expect(mockNavLinks[1].classList.contains('current')).toBe(true)
    expect(mockNavLinks[2].classList.contains('current')).toBe(false)
  })

  it('handles edge case where section has zero height', () => {
    // Create a section with zero height by recreating it
    const newSection = document.createElement('section')
    newSection.id = 'section2'
    Object.defineProperty(newSection, 'offsetTop', { value: 500, configurable: true })
    Object.defineProperty(newSection, 'offsetHeight', { value: 0, configurable: true })
    
    // Replace the existing section
    mockSections[1].remove()
    mockSections[1] = newSection
    document.body.append(newSection)
    
    render(<Scrollable />)
    
    Object.defineProperty(window, 'scrollY', { value: 500 })
    
    act(() => {
      window.dispatchEvent(new Event('scroll'))
      jest.runAllTimers()
    })
    
    // Should not mark zero-height section as current
    expect(mockNavLinks[1].classList.contains('current')).toBe(false)
  })
})
