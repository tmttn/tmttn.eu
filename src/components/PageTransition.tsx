import React, { useEffect, useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { TransitionWrapper } from './PageTransition.styled'


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