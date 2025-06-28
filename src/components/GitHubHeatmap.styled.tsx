import styled from 'styled-components'
import { GlassCard } from './GlassmorphismComponents.styled'

export const HeatmapContainer = styled(GlassCard)`
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

export const HeatmapGrid = styled.div`
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

export const HeatmapDay = styled.div<{ $level: number }>`
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

export const HeatmapLegend = styled.div`
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

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`

export const StatItem = styled.div`
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

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.textMuted};
`