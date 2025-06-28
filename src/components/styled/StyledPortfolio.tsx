import styled from 'styled-components'

export const StyledPortfolio = styled.div<{ $variant?: 'odd' | 'even' }>`
  padding: 0 7vw;
  position: relative;

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
    padding: 2rem 0 4rem 0;
    border-top: 1px solid ${({ theme }) => theme.colors.border};

    .github-profile-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      margin-bottom: 2rem;
      background: ${({ theme }) => theme.colors.glass.surface};
      border: 1px solid ${({ theme }) => theme.colors.glass.border};
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textSecondary};
      transition: all ${({ theme }) => theme.transitions.default};
      background-image: none;
      backdrop-filter: blur(12px) saturate(150%);

      &:hover {
        background: ${({ theme }) => theme.colors.glass.surfaceHover};
        border-color: ${({ theme }) => theme.colors.glass.borderHover};
        color: ${({ theme }) => theme.colors.text};
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      }

      svg {
        font-size: 1.2rem;
      }
    }
  }
`