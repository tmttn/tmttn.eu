import styled from 'styled-components'
import { Z_INDEX } from '../../styles/zIndex'

export const StyledNavList = styled.ul<{ $isOpen: boolean }>`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 0.5rem;
  font-family: 'Inter', system-ui, sans-serif;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: ${({ theme }) => theme.colors.glass.surface};
    backdrop-filter: blur(24px) saturate(200%);
    border-radius: 14px;
    padding: 1rem;
    min-width: 200px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    z-index: ${Z_INDEX.INTERFACE.MOBILE_NAV};
    border: 1px solid ${({ theme }) => theme.colors.glass.border};
    display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
    opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
    transform: ${({ $isOpen }) => $isOpen ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)'};
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Above mobile breakpoint, always show navigation */
  @media only screen and (min-width: calc(${({ theme }) => theme.breakpoints.mobile} + 1px)) {
    display: flex !important;
    position: static;
    background: transparent;
    backdrop-filter: none;
    border-radius: 0;
    padding: 0;
    box-shadow: none;
    z-index: auto;
    border: none;
    opacity: 1;
    transform: none;
    transition: none;
  }
`

export const StyledNavItem = styled.li`
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

export const MobileMenuButton = styled.button`
  display: none;
  background: ${({ theme }) => theme.colors.glass.surface};
  backdrop-filter: blur(14px) saturate(160%);
  border: none;
  border-radius: 14px;
  padding: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: ${Z_INDEX.INTERFACE.MOBILE_NAV};
  
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

export const NavContainer = styled.nav`
  position: relative;
  z-index: ${Z_INDEX.INTERFACE.NAVIGATION};
  
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    /* Ensure mobile dropdown has space to appear */
    overflow: visible;
  }
`