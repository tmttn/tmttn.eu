import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useTheme } from '../contexts/ThemeContext'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const TransitionWrapper = styled.div<{ $isVisible: boolean }>`
  opacity: ${({ $isVisible }) => $isVisible ? 1 : 0};
  transform: translateY(${({ $isVisible }) => $isVisible ? '0' : '10px'});
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Add staggered animation for children */
  & > * {
    animation: ${fadeIn} 0.8s cubic-bezier(0.4, 0, 0.2, 1) backwards;
  }
  
  & > *:nth-child(1) { animation-delay: 0.1s; }
  & > *:nth-child(2) { animation-delay: 0.2s; }
  & > *:nth-child(3) { animation-delay: 0.3s; }
  & > *:nth-child(4) { animation-delay: 0.4s; }
  & > *:nth-child(5) { animation-delay: 0.5s; }
  
  @media (prefers-reduced-motion: reduce) {
    transition: opacity 0.3s ease;
    transform: none;
    
    & > * {
      animation: none;
    }
  }
`

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export default function PageTransition({ children, className }: PageTransitionProps) {
  const { isDark } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [prevTheme, setPrevTheme] = useState(isDark)

  useEffect(() => {
    // On initial mount
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // On theme change
    if (prevTheme !== isDark) {
      setIsVisible(false)
      const timer = setTimeout(() => {
        setIsVisible(true)
        setPrevTheme(isDark)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [isDark, prevTheme])

  return (
    <TransitionWrapper $isVisible={isVisible} className={className}>
      {children}
    </TransitionWrapper>
  )
}