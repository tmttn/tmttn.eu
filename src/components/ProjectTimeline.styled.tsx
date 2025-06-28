import styled from 'styled-components'

export const TimelineContainer = styled.div`
  background: ${({ theme }) => theme.colors.glass.surface};
  backdrop-filter: blur(14px) saturate(160%);
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
  border: 1px solid ${({ theme }) => theme.colors.glass.border};
  
  h3 {
    margin: 0 0 2rem 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`

export const Timeline = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.accent}
    );
    
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      left: 15px;
    }
  }
`

export const TimelineItem = styled.div<{ $isExpanded: boolean }>`
  position: relative;
  padding-left: 60px;
  margin-bottom: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
  }
  
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-left: 45px;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 11px;
    top: 8px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    border: 3px solid ${({ theme }) => theme.colors.background};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary};
    transition: all 0.3s ease;
    
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      left: 6px;
      width: 16px;
      height: 16px;
    }
  }
  
  &:hover::before {
    transform: scale(1.2);
    box-shadow: 0 0 0 6px ${({ theme }) => theme.colors.primary}33;
  }
`

export const TimelineContent = styled.div`
  background: ${({ theme }) => theme.colors.glass.surface};
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.glass.border};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.glass.surfaceHover};
    border-color: ${({ theme }) => theme.colors.glass.borderHover};
  }
`

export const TimelineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`

export const TimelineTitle = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  font-weight: 600;
`

export const TimelineDate = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
`

export const TimelineCompany = styled.p`
  margin: 0.25rem 0 0.75rem 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
  font-size: 0.95rem;
`

export const TimelineDescription = styled.div<{ $isExpanded: boolean }>`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  max-height: ${({ $isExpanded }) => $isExpanded ? 'none' : '60px'};
  overflow: hidden;
  transition: max-height 0.3s ease;
  
  p {
    margin: 0 0 0.75rem 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`

export const TimelineTechnologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`

export const TechTag = styled.span`
  background: ${({ theme }) => theme.colors.primary}22;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.colors.primary}44;
`

export const ExpandButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  &:hover {
    text-decoration: underline;
  }
`