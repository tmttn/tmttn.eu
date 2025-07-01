import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { darkTheme, lightTheme, Theme } from '@styles'

export interface ThemeContextType {
  readonly isDark: boolean
  readonly toggleTheme: () => void
  readonly theme: Theme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    } else {
      // Detect system color scheme preference
      const prefersDark = globalThis.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(prefersDark)
    }
  }, [])

  // Set data-theme attribute on HTML element whenever theme changes
  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
  }, [isDark])

  const toggleTheme = useCallback(() => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }, [isDark])

  const theme = isDark ? darkTheme : lightTheme

  const contextValue = useMemo(() => ({
    isDark,
    toggleTheme,
    theme
  }), [isDark, theme, toggleTheme])

  return (
    <ThemeContext value={contextValue}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext>
  )
}