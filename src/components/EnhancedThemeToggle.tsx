import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import ClientOnlyIcon from './ClientOnlyIcon'
import {
  ToggleContainer,
  ToggleButton,
  IconContainer,
  RippleEffect,
  ThemeTransitionOverlay
} from './EnhancedThemeToggle.styled'


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