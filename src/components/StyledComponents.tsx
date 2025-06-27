import styled from 'styled-components'

export const StyledHeader = styled.header<{ $scrolled?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  top: 0;
  padding: 8px;

  ${({ $scrolled }) => $scrolled && `
    backdrop-filter: blur(10px) brightness(60%);
  `}
`

export const StyledLogo = styled.img<{ $scrolled?: boolean }>`
  width: ${({ $scrolled }) => $scrolled ? '50px' : '100px'};
  padding: 8px;
  margin: 0;
  transition: width ${({ theme }) => theme.transitions.transform};

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 60px !important;
    transition: width ${({ theme }) => theme.transitions.transform};
  }
`

export const StyledNav = styled.nav`
  padding: 8px;

  ul {
    list-style: none;
    margin: 0;
    display: flex;
    font-family: 'Inter', system-ui, sans-serif;

    li {
      margin: 0;

      a,
      a:visited,
      a:hover,
      a:active,
      a:focus {
        color: ${({ theme }) => theme.colors.secondary};
        margin: 8px;
        padding-bottom: 4px;
        background-image: none;
        font-weight: 500;
        font-size: 0.95rem;
        letter-spacing: -0.01em;
        transition: all ${({ theme }) => theme.transitions.default};

        &.current {
          border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
          font-weight: 600;
        }

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
`

export const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
`

export const StyledSection = styled.section<{ $variant?: 'odd' | 'even' }>`
  min-height: 101vh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  padding-top: 9vw;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: center !important;
    justify-items: center !important;
    scroll-snap-align: none !important;
    text-align: center !important;

    h1,
    h2,
    h3 {
      padding-left: 0 !important;
    }
  }

  ${({ $variant, theme }) => $variant === 'odd' && `
    background-color: ${theme.colors.black};
    color: ${theme.colors.primary};

    h1 {
      color: ${theme.colors.white};
    }

    h2,
    h3,
    h4 {
      color: ${theme.colors.primary};
    }
  `}

  ${({ $variant, theme }) => $variant === 'even' && `
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};

    h1,
    h2,
    h3,
    h4 {
      color: ${theme.colors.secondary};
    }
  `}
`

export const StyledWelcomeSection = styled(StyledSection)`
  justify-content: center;
  padding-top: 0;

  h1,
  h2,
  h3 {
    margin: 0;
  }
`

export const StyledSectionContent = styled.div`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: center !important;
    flex-direction: column !important;

    div {
      margin: 0px 32px !important;
    }
  }

  div:nth-of-type(1) {
    margin-left: 7vw;
  }

  div:nth-of-type(2) {
    margin-left: 16px;
    margin-right: 32px;
  }
`

export const StyledContactSection = styled(StyledSection)`
  h2 {
    padding-left: 8vw;
  }
`

export const StyledIconBar = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 7vw;
  align-items: center;
  justify-content: space-evenly;

  a,
  a:visited,
  a:hover,
  a:active,
  a:focus {
    background-image: none;
  }
`

export const StyledIcon = styled.a`
  margin: 32px;
  font-size: 116px;
  color: ${({ theme }) => theme.colors.secondary};
  transition: transform ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: scale(1.5);
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: 32px;
    font-size: 110px;
  }
`

export const StyledPortfolio = styled.div<{ $variant?: 'odd' | 'even' }>`
  padding: 0 7vw;

  .portfolio-loading,
  .portfolio-error,
  .portfolio-empty {
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;

    svg {
      margin-right: 0.5rem;
    }
  }

  .portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin: 2rem 0;

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      margin: 1rem 0;
    }
  }

  .portfolio-footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid ${({ $variant }) => 
      $variant === 'even' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};

    .github-profile-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      background: ${({ $variant }) => 
        $variant === 'even' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'};
      border: 1px solid ${({ $variant }) => 
        $variant === 'even' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 500;
      transition: all ${({ theme }) => theme.transitions.default};
      background-image: none;

      &:hover {
        background: ${({ $variant }) => 
          $variant === 'even' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
        transform: translateY(-2px);
      }

      svg {
        font-size: 1.2rem;
      }
    }
  }
`

export const StyledRepoCard = styled.div<{ $variant?: 'odd' | 'even' }>`
  background: ${({ $variant }) => 
    $variant === 'even' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${({ $variant }) => 
    $variant === 'even' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  padding: 1.5rem;
  transition: all ${({ theme }) => theme.transitions.default};
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ $variant }) => 
      $variant === 'even' ? '0 12px 24px rgba(0, 0, 0, 0.1)' : '0 12px 24px rgba(0, 0, 0, 0.3)'};
    border-color: ${({ $variant, theme }) => 
      $variant === 'even' ? theme.colors.secondary : theme.colors.primary};
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
      background: ${({ $variant }) => 
        $variant === 'even' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
      border: 1px solid ${({ $variant }) => 
        $variant === 'even' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
      border-radius: 16px;
      padding: 0.25rem 0.75rem;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: lowercase;
      letter-spacing: -0.005em;
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