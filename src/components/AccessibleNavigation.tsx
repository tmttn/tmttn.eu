import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const StyledNavList = styled.ul<{ $isOpen: boolean }>`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 0.5rem;
  font-family: 'Inter', system-ui, sans-serif;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    position: absolute;
    top: 100%;
    right: 0;
    background: ${({ theme }) => theme.colors.glass.surface};
    backdrop-filter: blur(24px) saturate(200%);
    border-radius: 14px;
    padding: 1rem;
    min-width: 200px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
  }
`

const StyledNavItem = styled.li`
  margin: 0;

  a {
    --border-width: 1px;
    position: relative;
    display: block;
    color: ${({ theme }) => theme.colors.textSecondary};
    padding: 0.75rem 1.25rem;
    background: ${({ theme }) => theme.colors.glass.surface};
    backdrop-filter: blur(14px) saturate(160%);
    border-radius: 14px;
    font-weight: 500;
    font-size: 0.9rem;
    letter-spacing: -0.01em;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    
    /* Focus styles for accessibility */
    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
      color: ${({ theme }) => theme.colors.text};
      background: ${({ theme }) => theme.colors.glass.surfaceHover};
    }

    &:hover, &:focus {
      color: ${({ theme }) => theme.colors.text};
      background: ${({ theme }) => theme.colors.glass.surfaceHover};
      transform: translateY(-1px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0px);
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;
      &:hover, &:focus {
        transform: none;
      }
    }
  }
`

const MobileMenuButton = styled.button`
  display: none;
  background: ${({ theme }) => theme.colors.glass.surface};
  backdrop-filter: blur(14px) saturate(160%);
  border: none;
  border-radius: 14px;
  padding: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.glass.surfaceHover};
  }

  &:hover, &:focus {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.glass.surfaceHover};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
  }
`

const NavContainer = styled.nav`
  position: relative;
  
  /* Hide desktop nav on mobile */
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${StyledNavList} {
      &:not([aria-expanded="true"]) {
        display: none;
      }
    }
  }
`

interface NavigationProps {
  className?: string
}

const navigationItems = [
  { href: "/#welcome", label: "Welcome", description: "Go to welcome section" },
  { href: "/#about", label: "About", description: "Learn about Tom" },
  { href: "/#contact", label: "Contact", description: "Get in touch" },
  { href: "/#showcase", label: "Showcase", description: "View portfolio" },
]

export default function AccessibleNavigation({ className }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
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
        buttonRef.current?.focus()
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
    <NavContainer ref={navRef} className={className} role="navigation" aria-label="Main navigation">
      <MobileMenuButton
        ref={buttonRef}
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