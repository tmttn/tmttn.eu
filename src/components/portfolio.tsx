import React, { useEffect, useState } from "react"
import { GitHubService, GitHubRepository } from "../services/github"
import ClientOnlyIcon from "./ClientOnlyIcon"
import { StyledPortfolio, StyledRepoCard } from "./StyledComponents"

interface RepositoryCardProps {
  repo: GitHubRepository
  variant?: 'odd' | 'even'
}

function RepositoryCard({ repo, variant }: RepositoryCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  }

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      'JavaScript': '#f1e05a',
      'TypeScript': '#2b7489',
      'Python': '#3572A5',
      'Java': '#b07219',
      'C#': '#239120',
      'PHP': '#4F5D95',
      'Ruby': '#701516',
      'Go': '#00ADD8',
      'Rust': '#dea584',
      'Swift': '#fa7343',
      'Kotlin': '#F18E33',
      'Dart': '#00B4AB',
      'C++': '#f34b7d',
      'C': '#555555',
      'HTML': '#e34c26',
      'CSS': '#1572B6',
      'SCSS': '#c6538c',
      'Vue': '#4FC08D',
      'React': '#61DAFB'
    }
    return colors[language || ''] || '#858585'
  }

  return (
    <StyledRepoCard $variant={variant}>
      <div className="repo-header">
        <h3>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            {repo.name}
          </a>
        </h3>
        {repo.homepage && (
          <a 
            href={repo.homepage} 
            target="_blank" 
            rel="noopener noreferrer"
            className="repo-link"
            title="Visit project"
          >
            <ClientOnlyIcon icon="external-link-alt" fallback="→" />
          </a>
        )}
      </div>
      
      {repo.description && (
        <p className="repo-description">{repo.description}</p>
      )}
      
      {repo.topics && repo.topics.length > 0 && (
        <div className="repo-topics">
          {repo.topics.slice(0, 5).map(topic => (
            <span key={topic} className="topic-tag">{topic}</span>
          ))}
        </div>
      )}
      
      <div className="repo-footer">
        <div className="repo-meta">
          {repo.language && (
            <span className="repo-language">
              <span 
                className="language-dot" 
                style={{ backgroundColor: getLanguageColor(repo.language) }}
              ></span>
              {repo.language}
            </span>
          )}
          
          {repo.stargazers_count > 0 && (
            <span className="repo-stars">
              <ClientOnlyIcon icon="star" fallback="★" />
              {repo.stargazers_count}
            </span>
          )}
          
          {repo.forks_count > 0 && (
            <span className="repo-forks">
              <ClientOnlyIcon icon="code-branch" fallback="⑂" />
              {repo.forks_count}
            </span>
          )}
        </div>
        
        <span className="repo-updated">
          Updated {formatDate(repo.updated_at)}
        </span>
      </div>
    </StyledRepoCard>
  )
}

interface PortfolioProps {
  variant?: 'odd' | 'even'
}

export default function Portfolio({ variant = 'odd' }: PortfolioProps) {
  const [repositories, setRepositories] = useState<GitHubRepository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true)
        const repos = await GitHubService.getPublicRepositories()
        setRepositories(repos)
        setError(null)
      } catch (err) {
        setError('Failed to load repositories')
        console.error('Error fetching repositories:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRepositories()
  }, [])

  if (loading) {
    return (
      <div className="portfolio-loading">
        <ClientOnlyIcon icon="spinner" spin fallback="⟳" />
        <p>Loading repositories...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="portfolio-error">
        <p>{error}</p>
        <p>
          <a href="https://github.com/tmttn" target="_blank" rel="noopener noreferrer">
            View on GitHub <ClientOnlyIcon icon="external-link-alt" fallback="→" />
          </a>
        </p>
      </div>
    )
  }

  if (repositories.length === 0) {
    return (
      <div className="portfolio-empty">
        <p>No repositories found.</p>
      </div>
    )
  }

  return (
    <StyledPortfolio $variant={variant}>
      <div className="portfolio-grid">
        {repositories.map(repo => (
          <RepositoryCard key={repo.id} repo={repo} variant={variant} />
        ))}
      </div>
      
      <div className="portfolio-footer">
        <a 
          href="https://github.com/tmttn" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-profile-link"
        >
          <ClientOnlyIcon icon={["fab", "github"]} fallback="GitHub" />
          View all repositories on GitHub
        </a>
      </div>
    </StyledPortfolio>
  )
}