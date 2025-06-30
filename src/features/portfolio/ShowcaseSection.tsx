import React, { use, Suspense } from "react"
import { GitHubService } from '@services'
import { StyledSection } from '@components'
import { GitHubHeatmap } from '@features'
import Portfolio from './portfolio'

interface ShowcaseSectionProperties {
  variant?: 'odd' | 'even'
}

function ShowcaseSectionContent({ variant }: Readonly<ShowcaseSectionProperties>) {
  const repositories = use(GitHubService.getPublicRepositories())

  // Hide the entire showcase section if API failed or no repositories
  if (repositories === GitHubService.API_FAILURE || repositories.length === 0) {
    return null
  }

  return (
    <StyledSection id="showcase" $variant={variant} role="region" aria-labelledby="showcase-heading" data-testid="portfolio-section">
      <h1 id="showcase-heading">Showcase</h1>
      <GitHubHeatmap />
      <Portfolio variant={variant} />
    </StyledSection>
  )
}

export default function ShowcaseSection({ variant = 'even' }: ShowcaseSectionProperties) {
  return (
    <Suspense fallback={null}>
      <ShowcaseSectionContent variant={variant} />
    </Suspense>
  )
}