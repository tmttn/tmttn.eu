import React, { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import ClientOnlyIcon from './ClientOnlyIcon'
import { ToggleButton } from './ThemeToggle.styled'


const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return (
      <ToggleButton aria-label="Theme toggle loading">
        <span style={{ fontSize: '1.2rem' }}>🌓</span>
      </ToggleButton>
    )
  }

  return (
    <ToggleButton onClick={toggleTheme} aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}>
      <ClientOnlyIcon 
        icon={isDark ? 'sun' : 'moon'} 
        fallback={isDark ? '☀️' : '🌙'} 
      />
    </ToggleButton>
  )
}

export default ThemeToggle