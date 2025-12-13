import React from 'react'
import { SkipLink, SkipContainer } from './SkipNavigation.styled'


export default function SkipNavigation() {
  return (
    <SkipContainer>
      <SkipLink
        data-testid="skip-nav"
        href="#main-content"
        aria-label="Skip to main content"
      >
        Skip to main content
      </SkipLink>
      <SkipLink
        href="#navigation"
        aria-label="Skip to navigation"
      >
        Skip to navigation
      </SkipLink>
    </SkipContainer>
  )
}