import React, { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { useTheme } from '../contexts/ThemeContext'
import ClientOnlyIcon from './ClientOnlyIcon'

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

const ToggleContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ToggleButton = styled.button<{ $isTransitioning: boolean }>`
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

const IconContainer = styled.div<{ $isDark: boolean; $isTransitioning: boolean }>`
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

const RippleEffect = styled.div<{ $x: number; $y: number }>`
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

const ThemeTransitionOverlay = styled.div<{ $isVisible: boolean; $isDark: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
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

interface EnhancedThemeToggleProps {
  className?: string
}

export default function EnhancedThemeToggle({ className }: EnhancedThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme()
  const [hasMounted, setHasMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])
  const [showOverlay, setShowOverlay] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const rippleIdRef = useRef(0)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Create ripple effect
    const rippleId = rippleIdRef.current++
    setRipples(prev => [...prev, { id: rippleId, x, y }])

    // Set CSS custom properties for the overlay animation
    const clickX = (event.clientX / window.innerWidth) * 100
    const clickY = (event.clientY / window.innerHeight) * 100
    document.documentElement.style.setProperty('--click-x', `${clickX}%`)
    document.documentElement.style.setProperty('--click-y', `${clickY}%`)

    // Start transition animation
    setIsTransitioning(true)
    setShowOverlay(true)

    // Toggle theme with slight delay for smooth transition
    setTimeout(() => {
      toggleTheme()
    }, 150)

    // Clean up animations
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== rippleId))
    }, 600)

    setTimeout(() => {
      setIsTransitioning(false)
      setShowOverlay(false)
    }, 800)
  }

  if (!hasMounted) {
    return (
      <ToggleButton 
        aria-label="Theme toggle loading"
        $isTransitioning={false}
        disabled
      >
        <IconContainer $isDark={true} $isTransitioning={false}>
          <span>🌓</span>
        </IconContainer>
      </ToggleButton>
    )
  }

  return (
    <ToggleContainer className={className}>
      <ThemeTransitionOverlay $isVisible={showOverlay} $isDark={!isDark} />
      
      <ToggleButton 
        ref={buttonRef}
        onClick={handleClick}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        $isTransitioning={isTransitioning}
        disabled={isTransitioning}
      >
        <IconContainer $isDark={isDark} $isTransitioning={isTransitioning}>
          <ClientOnlyIcon 
            icon={isDark ? 'sun' : 'moon'} 
            fallback={isDark ? '☀️' : '🌙'} 
          />
        </IconContainer>
        
        {ripples.map(ripple => (
          <RippleEffect
            key={ripple.id}
            $x={ripple.x}
            $y={ripple.y}
          />
        ))}
      </ToggleButton>
    </ToggleContainer>
  )
}