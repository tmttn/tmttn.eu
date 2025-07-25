import React, { use, Suspense } from 'react'
import ClientOnlyIcon from '../../components/ClientOnlyIcon'
import { GitHubService } from '../../services/github'
import {
  HeatmapContainer,
  HeatmapGrid,
  HeatmapDay,
  HeatmapLegend,
  StatsContainer,
  StatItem,
  LoadingContainer
} from './GitHubHeatmap.styled'



function GitHubHeatmapContent() {
  const { contributions, stats } = use(GitHubService.getContributionData())

  return (
    <HeatmapContainer $intensity="heavy" $variant="neutral" data-testid="github-heatmap">
      <h3>
        <ClientOnlyIcon icon={["fab", "github"]} fallback="GH" />
        GitHub Activity - Past Year
      </h3>
      
      <HeatmapGrid>
        {contributions.map((day, index) => (
          <HeatmapDay
            key={index}
            $level={day.level}
            title={`${day.date}: ${day.count} contributions`}
            className="contribution-day"
          />
        ))}
      </HeatmapGrid>
      
      <HeatmapLegend>
        <span className="legend-text">Less</span>
        <div className="legend-levels">
          {[0, 1, 2, 3, 4].map(level => (
            <HeatmapDay key={level} $level={level} />
          ))}
        </div>
        <span className="legend-text">More</span>
      </HeatmapLegend>
      
      {stats && (
        <StatsContainer>
          <StatItem>
            <span className="stat-number">{stats.totalContributions}</span>
            <span className="stat-label">Total</span>
          </StatItem>
          <StatItem>
            <span className="stat-number">{stats.currentStreak}</span>
            <span className="stat-label">Current Streak</span>
          </StatItem>
          <StatItem>
            <span className="stat-number">{stats.longestStreak}</span>
            <span className="stat-label">Longest Streak</span>
          </StatItem>
          <StatItem>
            <span className="stat-number">{stats.thisWeek}</span>
            <span className="stat-label">This Week</span>
          </StatItem>
          <StatItem>
            <span className="stat-number">{stats.thisMonth}</span>
            <span className="stat-label">This Month</span>
          </StatItem>
        </StatsContainer>
      )}
    </HeatmapContainer>
  )
}

export default function GitHubHeatmap() {
  return (
    <Suspense fallback={
      <HeatmapContainer>
        <LoadingContainer>
          <ClientOnlyIcon icon="spinner" spin fallback="⟳" />
          <p>Loading GitHub activity...</p>
        </LoadingContainer>
      </HeatmapContainer>
    }>
      <GitHubHeatmapContent />
    </Suspense>
  )
}