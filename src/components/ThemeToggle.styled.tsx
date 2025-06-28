import styled from 'styled-components'

export const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px) saturate(120%);
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
    background: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.borderHover};
    transform: translateY(-2px) scale(1.05);
    box-shadow: 
      0 8px 25px rgba(0, 0, 0, 0.15),
      0 0 0 1px ${({ theme }) => theme.colors.border};

    &::before {
      left: 100%;
    }
  }

  svg {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: all 0.3s ease;
  }

  &:hover svg {
    color: ${({ theme }) => theme.colors.primary};
    filter: drop-shadow(0 0 10px ${({ theme }) => theme.colors.primary}33);
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
    
    svg {
      font-size: 1rem;
    }
  }
`