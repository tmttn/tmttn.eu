import React, { useEffect, useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { TransitionWrapper } from './PageTransition.styled'


interface PageTransitionProperties {
  className?: string
}

export default function PageTransition({ children, className }: React.PropsWithChildren<Readonly<PageTransitionProperties>>) {
  const { isDark } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [previousTheme, setPreviousTheme] = useState(isDark)

  useEffect(() => {
    // On initial mount
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // On theme change
    if (previousTheme !== isDark) {
      setIsVisible(false)
      const timer = setTimeout(() => {
        setIsVisible(true)
        setPreviousTheme(isDark)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [isDark, previousTheme])

  return (
    <TransitionWrapper $isVisible={isVisible} className={className}>
      {children}
    </TransitionWrapper>
  )
}