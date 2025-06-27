import React, { useState } from 'react'
import styled from 'styled-components'
import ClientOnlyIcon from './ClientOnlyIcon'

const TimelineContainer = styled.div`
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

const Timeline = styled.div`
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

const TimelineItem = styled.div<{ $isExpanded: boolean }>`
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

const TimelineContent = styled.div`
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

const TimelineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`

const TimelineTitle = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  font-weight: 600;
`

const TimelineDate = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
`

const TimelineCompany = styled.p`
  margin: 0.25rem 0 0.75rem 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
  font-size: 0.95rem;
`

const TimelineDescription = styled.div<{ $isExpanded: boolean }>`
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

const TimelineTechnologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`

const TechTag = styled.span`
  background: ${({ theme }) => theme.colors.primary}22;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.colors.primary}44;
`

const ExpandButton = styled.button`
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

interface TimelineEvent {
  id: string
  title: string
  company?: string
  date: string
  description: string[]
  technologies: string[]
  type: 'work' | 'project' | 'education'
}

const timelineData: TimelineEvent[] = [
  {
    id: '1',
    title: 'Senior Full-Stack Developer',
    company: 'ACA Group',
    date: '2020 - Present',
    description: [
      'Leading development of enterprise web applications using modern JavaScript frameworks and cloud technologies.',
      'Mentoring junior developers and establishing best practices for code quality and development workflows.',
      'Architecting scalable solutions for complex business requirements with focus on performance and maintainability.'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL', 'Docker'],
    type: 'work'
  },
  {
    id: '2',
    title: 'Personal Portfolio Website',
    date: '2023',
    description: [
      'Built a modern, responsive portfolio website showcasing my skills and projects.',
      'Implemented advanced features like dynamic GitHub integration, particle animations, and accessible design.',
      'Optimized for performance with SSG, proper SEO, and mobile-first responsive design.'
    ],
    technologies: ['Next.js', 'TypeScript', 'Styled Components', 'Canvas API', 'GitHub API'],
    type: 'project'
  },
  {
    id: '3',
    title: 'Full-Stack Developer',
    company: 'Previous Company',
    date: '2017 - 2020',
    description: [
      'Developed and maintained multiple client projects using various web technologies.',
      'Collaborated with design teams to implement pixel-perfect, responsive user interfaces.',
      'Integrated third-party APIs and payment systems for e-commerce solutions.'
    ],
    technologies: ['Vue.js', 'PHP', 'Laravel', 'MySQL', 'Bootstrap'],
    type: 'work'
  },
  {
    id: '4',
    title: 'Computer Science Degree',
    company: 'University',
    date: '2013 - 2017',
    description: [
      'Bachelor\'s degree in Computer Science with focus on software engineering and web development.',
      'Completed coursework in algorithms, data structures, database design, and software architecture.',
      'Participated in coding competitions and hackathons, winning several awards.'
    ],
    technologies: ['Java', 'C++', 'Python', 'SQL', 'Web Development'],
    type: 'education'
  }
]

export default function ProjectTimeline() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'work':
        return 'briefcase'
      case 'project':
        return 'code'
      case 'education':
        return 'graduation-cap'
      default:
        return 'circle'
    }
  }

  return (
    <TimelineContainer>
      <h3>
        <ClientOnlyIcon icon="clock" fallback="⏰" />
        Career Timeline
      </h3>
      
      <Timeline>
        {timelineData.map((item) => {
          const isExpanded = expandedItems.has(item.id)
          
          return (
            <TimelineItem 
              key={item.id} 
              $isExpanded={isExpanded}
              onClick={() => toggleExpanded(item.id)}
            >
              <TimelineContent>
                <TimelineHeader>
                  <div>
                    <TimelineTitle>
                      <ClientOnlyIcon icon={getIcon(item.type)} fallback="•" />
                      {item.title}
                    </TimelineTitle>
                    {item.company && (
                      <TimelineCompany>{item.company}</TimelineCompany>
                    )}
                  </div>
                  <TimelineDate>{item.date}</TimelineDate>
                </TimelineHeader>
                
                <TimelineDescription $isExpanded={isExpanded}>
                  {item.description.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </TimelineDescription>
                
                <TimelineTechnologies>
                  {item.technologies.map((tech) => (
                    <TechTag key={tech}>{tech}</TechTag>
                  ))}
                </TimelineTechnologies>
                
                <ExpandButton onClick={(e) => {
                  e.stopPropagation()
                  toggleExpanded(item.id)
                }}>
                  {isExpanded ? 'Show less' : 'Show more'}
                  <ClientOnlyIcon 
                    icon={isExpanded ? 'chevron-up' : 'chevron-down'} 
                    fallback={isExpanded ? '↑' : '↓'} 
                  />
                </ExpandButton>
              </TimelineContent>
            </TimelineItem>
          )
        })}
      </Timeline>
    </TimelineContainer>
  )
}