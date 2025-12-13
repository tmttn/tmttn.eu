import React, { useState, useEffect, useRef, useOptimistic, startTransition } from 'react'
import { useTheme } from '@contexts'
import { ClientOnlyIcon } from '@components'
import {
  ToggleContainer,
  ToggleButton,
  IconContainer,
  RippleEffect,
  ThemeTransitionOverlay
} from './EnhancedThemeToggle.styled'


interface EnhancedThemeToggleProperties {
  className?: string
}

export default function EnhancedThemeToggle({ className }: Readonly<EnhancedThemeToggleProperties>) {
  const { isDark, toggleTheme } = useTheme()
  const [optimisticTheme, setOptimisticTheme] = useOptimistic(isDark)
  const [hasMounted, setHasMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])
  const [showOverlay, setShowOverlay] = useState(false)
  const buttonReference = useRef<HTMLButtonElement>(null)
  const rippleIdReference = useRef(0)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const cleanupRipple = (rippleId: number) => {
    setRipples(previous => previous.filter(ripple => ripple.id !== rippleId))
  }

  const endTransition = () => {
    setIsTransitioning(false)
    setShowOverlay(false)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonReference.current) return

    const rect = buttonReference.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Create ripple effect
    const rippleId = rippleIdReference.current++
    setRipples(previous => [...previous, { id: rippleId, x, y }])

    // Set CSS custom properties for the overlay animation
    const clickX = (event.clientX / window.innerWidth) * 100
    const clickY = (event.clientY / window.innerHeight) * 100
    document.documentElement.style.setProperty('--click-x', `${clickX}%`)
    document.documentElement.style.setProperty('--click-y', `${clickY}%`)

    // Start transition animation with optimistic update
    setIsTransitioning(true)
    setShowOverlay(true)
    startTransition(() => {
      setOptimisticTheme(!optimisticTheme)
    })

    // Toggle theme with slight delay for smooth transition
    setTimeout(toggleTheme, 150)

    // Clean up animations
    setTimeout(() => cleanupRipple(rippleId), 600)
    setTimeout(endTransition, 800)
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
      <ThemeTransitionOverlay $isVisible={showOverlay} $isDark={!optimisticTheme} />
      
      <ToggleButton 
        ref={buttonReference}
        onClick={handleClick}
        aria-label={`Switch to ${optimisticTheme ? 'light' : 'dark'} theme`}
        $isTransitioning={isTransitioning}
        disabled={isTransitioning}
      >
        <IconContainer $isDark={optimisticTheme} $isTransitioning={isTransitioning}>
          <ClientOnlyIcon 
            icon={optimisticTheme ? 'sun' : 'moon'} 
            fallback={optimisticTheme ? '☀️' : '🌙'} 
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