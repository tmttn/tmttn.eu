import React, { useEffect, useState } from 'react'
import ClientOnlyIcon from './ClientOnlyIcon'
import { GitHubService, ContributionDay, GitHubStats } from '../services/github'
import {
  HeatmapContainer,
  HeatmapGrid,
  HeatmapDay,
  HeatmapLegend,
  StatsContainer,
  StatItem,
  LoadingContainer
} from './GitHubHeatmap.styled'



export default function GitHubHeatmap() {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContributionData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const { contributions, stats } = await GitHubService.getContributionData()
        
        setContributions(contributions)
        setStats(stats)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching GitHub contributions:', err)
        setError('Failed to load GitHub activity. Please try again later.')
        setLoading(false)
      }
    }

    fetchContributionData()
  }, [])

  if (loading) {
    return (
      <HeatmapContainer>
        <LoadingContainer>
          <ClientOnlyIcon icon="spinner" spin fallback="⟳" />
          <p>Loading GitHub activity...</p>
        </LoadingContainer>
      </HeatmapContainer>
    )
  }

  if (error) {
    return (
      <HeatmapContainer>
        <h3>
          <ClientOnlyIcon icon={["fab", "github"]} fallback="GH" />
          GitHub Activity
        </h3>
        <p style={{ color: 'var(--color-text-muted)' }}>{error}</p>
      </HeatmapContainer>
    )
  }

  return (
    <HeatmapContainer $intensity="heavy" $variant="neutral">
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