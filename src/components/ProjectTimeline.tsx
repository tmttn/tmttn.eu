import React, { useState } from 'react'
import ClientOnlyIcon from './ClientOnlyIcon'
import {
  TimelineContainer,
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineHeader,
  TimelineTitle,
  TimelineDate,
  TimelineCompany,
  TimelineDescription,
  TimelineTechnologies,
  TechTag,
  ExpandButton
} from './ProjectTimeline.styled'

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

const getIcon = (type: string) => {
  switch (type) {
    case 'work': {
      return 'briefcase'
    }
    case 'project': {
      return 'code'
    }
    case 'education': {
      return 'graduation-cap'
    }
    default: {
      return 'circle'
    }
  }
}

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
                
                <ExpandButton onClick={(event) => {
                  event.stopPropagation()
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