import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ClientOnlyIcon from './ClientOnlyIcon'
import { GlassCard } from './GlassmorphismComponents'

const HeatmapContainer = styled(GlassCard)`
  margin: 2rem 7vw;
  
  /* Enhanced contrast for light mode */
  background: ${({ theme }) => theme.isDark 
    ? `rgba(255, 255, 255, 0.12)` 
    : `rgba(255, 255, 255, 0.95)`
  };
  border: ${({ theme }) => theme.isDark 
    ? `1px solid ${theme.colors.glass.border}` 
    : `1px solid rgba(0, 0, 0, 0.15)`
  };
  box-shadow: ${({ theme }) => theme.isDark 
    ? `0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)` 
    : `0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)`
  };
  
  h3 {
    margin: 0 0 1rem 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-align: left;
    padding-left: 0;
  }
`

const HeatmapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(53, 1fr);
  gap: 2px;
  margin: 1rem 0;
  max-width: 100%;
  overflow-x: auto;
  
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(26, 1fr);
    gap: 1px;
  }
`

const HeatmapDay = styled.div<{ $level: number }>`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background: ${({ $level, theme }) => {
    const baseColor = theme.colors.primary
    const opacity = $level * 0.2 + 0.1
    return $level === 0 ? theme.colors.surface : `${baseColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`
  }};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.2);
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 8px;
    height: 8px;
  }
`

const HeatmapLegend = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 1rem;
  
  .legend-text {
    margin-right: 0.5rem;
  }
  
  .legend-levels {
    display: flex;
    gap: 2px;
  }
`

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`

const StatItem = styled.div`
  text-align: center;
  
  .stat-number {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
    display: block;
  }
  
  .stat-label {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

interface ContributionDay {
  date: string
  count: number
  level: number
}

interface GitHubStats {
  totalContributions: number
  currentStreak: number
  longestStreak: number
  thisWeek: number
  thisMonth: number
}

export default function GitHubHeatmap() {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Generate mock data for the heatmap (in a real app, you'd fetch from GitHub API)
    const generateMockData = () => {
      const data: ContributionDay[] = []
      const today = new Date()
      const oneYear = 365
      
      let totalContributions = 0
      let currentStreak = 0
      let longestStreak = 0
      let tempStreak = 0
      let thisWeek = 0
      let thisMonth = 0
      
      for (let i = oneYear; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        
        // Generate realistic contribution pattern
        const dayOfWeek = date.getDay()
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
        const baseChance = isWeekend ? 0.3 : 0.7
        const randomFactor = Math.random()
        
        let count = 0
        if (randomFactor < baseChance) {
          count = Math.floor(Math.random() * 8) + 1
          if (randomFactor < 0.1) count += Math.floor(Math.random() * 10) // Occasional high activity days
        }
        
        const level = Math.min(Math.floor(count / 2), 4)
        
        data.push({
          date: date.toISOString().split('T')[0],
          count,
          level
        })
        
        totalContributions += count
        
        // Calculate streaks
        if (count > 0) {
          tempStreak++
          if (i === 0) currentStreak = tempStreak
        } else {
          longestStreak = Math.max(longestStreak, tempStreak)
          if (i === 0) currentStreak = 0
          tempStreak = 0
        }
        
        // This week contributions
        if (i <= 7) thisWeek += count
        
        // This month contributions
        if (i <= 30) thisMonth += count
      }
      
      longestStreak = Math.max(longestStreak, tempStreak)
      
      setContributions(data)
      setStats({
        totalContributions,
        currentStreak,
        longestStreak,
        thisWeek,
        thisMonth
      })
    }

    // Simulate API call delay
    setTimeout(() => {
      try {
        generateMockData()
        setLoading(false)
      } catch (err) {
        setError('Failed to load GitHub activity')
        setLoading(false)
      }
    }, 1000)
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