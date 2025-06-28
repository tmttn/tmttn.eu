import styled from 'styled-components'

export const StyledRepoCard = styled.div<{ $variant?: 'odd' | 'even' }>`
  --border-width: 1px;
  position: relative;
  background: ${({ theme }) => theme.colors.glass.surface};
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(16px) saturate(180%);
  overflow: hidden;
  
  /* Enhanced gradient border with mask technique */
  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    border-radius: inherit;
    border: var(--border-width) solid transparent;
    background: ${({ $variant, theme }) => 
      $variant === 'even' 
        ? `linear-gradient(135deg, ${theme.colors.secondary}40, ${theme.colors.accent}30, ${theme.colors.secondary}20)` 
        : `linear-gradient(135deg, ${theme.colors.primary}40, ${theme.colors.primaryHighlight}30, ${theme.colors.primary}20)`
    } border-box;
    mask: linear-gradient(black, black) border-box,
      linear-gradient(black, black) padding-box;
    mask-composite: subtract;
    animation: borderGlow 4s ease-in-out infinite;
  }

  /* Floating shimmer effect */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.1), 
      transparent);
    transition: left 0.6s ease;
    pointer-events: none;
  }

  @keyframes borderGlow {
    0%, 100% {
      opacity: 0.8;
      filter: brightness(1);
    }
    50% {
      opacity: 1;
      filter: brightness(1.2);
    }
  }

  &:hover {
    transform: translateY(-6px) scale(1.02);
    background: ${({ theme }) => theme.colors.glass.surfaceHover};
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.25),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(20px) saturate(200%);
    
    &::before {
      background: ${({ $variant, theme }) => 
        $variant === 'even' 
          ? `linear-gradient(135deg, ${theme.colors.secondary}60, ${theme.colors.accent}50, ${theme.colors.secondary}30)` 
          : `linear-gradient(135deg, ${theme.colors.primary}60, ${theme.colors.primaryHighlight}50, ${theme.colors.primary}30)`
      } border-box;
      animation: borderPulse 2s ease-in-out infinite;
    }

    &::after {
      left: 100%;
    }
  }

  @keyframes borderPulse {
    0%, 100% {
      filter: brightness(1.2) saturate(150%);
    }
    50% {
      filter: brightness(1.5) saturate(200%);
    }
  }

  .repo-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;

    h3 {
      margin: 0;
      padding: 0;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 1.3rem;
      font-weight: 600;
      letter-spacing: -0.01em;

      a {
        background-image: none;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }

    .repo-link {
      background-image: none;
      opacity: 0.7;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 1;
      }
    }
  }

  .repo-description {
    margin: 0 0 1rem 0;
    padding: 0;
    opacity: 0.9;
    line-height: 1.5;
    max-width: none;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.95rem;
    letter-spacing: -0.005em;
  }

  .repo-topics {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;

    .topic-tag {
      background: ${({ theme }) => theme.colors.glass.surface};
      border: 1px solid ${({ theme }) => theme.colors.glass.border};
      border-radius: 16px;
      padding: 0.25rem 0.75rem;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: lowercase;
      letter-spacing: -0.005em;
      backdrop-filter: blur(8px) saturate(120%);
      transition: all 0.3s ease;
      
      &:hover {
        background: ${({ theme }) => theme.colors.glass.surfaceHover};
        border-color: ${({ theme }) => theme.colors.glass.borderHover};
        transform: translateY(-1px);
      }
    }
  }

  .repo-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    opacity: 0.8;
    letter-spacing: -0.005em;

    .repo-meta {
      display: flex;
      gap: 1rem;
      align-items: center;

      .repo-language {
        display: flex;
        align-items: center;
        gap: 0.4rem;

        .language-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
      }

      .repo-stars,
      .repo-forks {
        display: flex;
        align-items: center;
        gap: 0.3rem;

        svg {
          width: 14px;
          height: 14px;
        }
      }
    }

    .repo-updated {
      font-size: 0.8rem;
      opacity: 0.7;
    }
  }
`