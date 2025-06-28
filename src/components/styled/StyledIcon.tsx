import styled from 'styled-components'

export const StyledIcon = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.glass.surface};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid ${({ theme }) => theme.colors.glass.border};
  backdrop-filter: blur(12px) saturate(150%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      ${({ theme }) => theme.colors.surfaceHover}, 
      transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: ${({ theme }) => theme.colors.glass.borderHover};
    background: ${({ theme }) => theme.colors.glass.surfaceHover};
    
    &::before {
      left: 100%;
    }
  }

  svg, span {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: all 0.3s ease;
    margin-bottom: 0.5rem;
  }

  &:hover svg,
  &:hover span {
    color: ${({ theme }) => theme.colors.primary};
    filter: drop-shadow(0 0 20px ${({ theme }) => theme.colors.primary}33);
  }

  &::after {
    content: attr(aria-label);
    font-size: 0.9rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.7;
    transition: opacity 0.3s ease;
    text-align: center;
    letter-spacing: 0.02em;
  }

  &:hover::after {
    opacity: 1;
    color: ${({ theme }) => theme.colors.text};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.2rem;
    border-radius: 16px;
    
    svg, span {
      font-size: 2.5rem;
    }
    
    &::after {
      font-size: 0.8rem;
    }
  }
`