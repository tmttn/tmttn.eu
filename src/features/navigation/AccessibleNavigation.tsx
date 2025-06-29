import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  StyledNavList,
  StyledNavItem,
  MobileMenuButton,
  NavContainer
} from './AccessibleNavigation.styled'


interface NavigationProperties {
  className?: string
}

const navigationItems = [
  { href: "/#welcome", label: "Welcome", description: "Go to welcome section" },
  { href: "/#about", label: "About", description: "Learn about Tom" },
  { href: "/#contact", label: "Contact", description: "Get in touch" },
  { href: "/#showcase", label: "Showcase", description: "View portfolio" },
]

export default function AccessibleNavigation({ className }: NavigationProperties) {
  const [isOpen, setIsOpen] = useState(false)
  const navReference = useRef<HTMLElement>(null)
  const buttonReference = useRef<HTMLButtonElement>(null)

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navReference.current && !navReference.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
        buttonReference.current?.focus()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <NavContainer ref={navReference} className={className} role="navigation" aria-label="Main navigation">
      <MobileMenuButton
        ref={buttonReference}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="main-navigation"
        aria-label={`${isOpen ? 'Close' : 'Open'} navigation menu`}
      >
        {isOpen ? '✕' : '☰'}
      </MobileMenuButton>
      
      <StyledNavList 
        id="main-navigation"
        role="list"
        $isOpen={isOpen}
      >
        {navigationItems.map((item) => (
          <StyledNavItem key={item.href} role="listitem">
            <Link 
              href={item.href}
              onClick={closeMenu}
              aria-label={item.description}
              tabIndex={0}
            >
              {item.label}
            </Link>
          </StyledNavItem>
        ))}
      </StyledNavList>
    </NavContainer>
  )
}