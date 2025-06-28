import styled, { keyframes } from 'styled-components'
import { Z_INDEX } from '../../styles/zIndex'

const rippleAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`

const rotateIn = keyframes`
  0% {
    transform: rotate(-180deg) scale(0);
    opacity: 0;
  }
  100% {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
`

export const ToggleContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ToggleButton = styled.button<{ $isTransitioning: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.colors.glass.surface};
  border: 1px solid ${({ theme }) => theme.colors.glass.border};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(14px) saturate(160%);
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);

  /* Gradient border effect */
  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    background: linear-gradient(45deg, 
      ${({ theme }) => theme.colors.primary}, 
      ${({ theme }) => theme.colors.accent}, 
      ${({ theme }) => theme.colors.secondary});
    border-radius: 50%;
    padding: 1px;
    mask: linear-gradient(black, black) content-box, linear-gradient(black, black);
    mask-composite: subtract;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px) scale(1.1);
    box-shadow: 
      0 8px 30px rgba(0, 0, 0, 0.2),
      0 0 0 4px ${({ theme }) => theme.colors.primary}22,
      inset 0 1px 0 rgba(255, 255, 255, 0.3);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0) scale(1.05);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: background-color 0.3s ease;
    
    &:hover {
      transform: none;
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 44px;
    height: 44px;
  }
`

export const IconContainer = styled.div<{ $isDark: boolean; $isTransitioning: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: ${({ theme, $isDark }) => $isDark ? theme.colors.accent : theme.colors.secondary};
  
  svg {
    animation: ${({ $isTransitioning }) => $isTransitioning ? rotateIn : 'none'} 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    filter: drop-shadow(0 0 8px ${({ theme, $isDark }) => $isDark ? theme.colors.accent : theme.colors.secondary}66);
    transition: filter 0.3s ease;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`

export const RippleEffect = styled.div<{ $x: number; $y: number }>`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary}44;
  left: ${({ $x }) => $x - 10}px;
  top: ${({ $y }) => $y - 10}px;
  animation: ${rippleAnimation} 0.6s ease-out;
  pointer-events: none;
`

export const ThemeTransitionOverlay = styled.div<{ $isVisible: boolean; $isDark: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${Z_INDEX.INTERFACE.THEME_TOGGLE};
  pointer-events: none;
  opacity: ${({ $isVisible }) => $isVisible ? 1 : 0};
  transition: opacity 0.3s ease;
  
  /* Create a radial gradient transition effect */
  background: ${({ $isDark, theme }) => 
    $isDark 
      ? `radial-gradient(circle at var(--click-x, 50%) var(--click-y, 50%), 
          ${theme.colors.background} 0%, 
          ${theme.colors.background} 20%, 
          transparent  50%)`
      : `radial-gradient(circle at var(--click-x, 50%) var(--click-y, 50%), 
          ${theme.colors.background} 0%, 
          ${theme.colors.background} 20%, 
          transparent 50%)`
  };
`