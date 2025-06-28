import styled from 'styled-components'

export const StyledSection = styled.section<{ $variant?: 'odd' | 'even' }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 9vw;
  position: relative;
  overflow: hidden;
  z-index: 2;
  
  /* Ensure content is above background layers */
  & > * {
    position: relative;
    z-index: 3;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.isDark ? `
      radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 60%),
      linear-gradient(135deg, rgba(15, 15, 35, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%)
    ` : `
      radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.03) 0%, transparent 60%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.9) 100%)
    `};
    backdrop-filter: blur(2px);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ $variant }) => $variant === 'odd' 
      ? 'rgba(0, 0, 0, 0.3)' 
      : 'rgba(255, 255, 255, 0.1)'};
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.6s ease;
  }

  /* Floating particles effect */
  &:nth-child(odd)::before {
    animation: sectionFloat 25s ease-in-out infinite;
  }

  &:nth-child(even)::before {
    animation: sectionFloat 20s ease-in-out infinite reverse;
  }

  @keyframes sectionFloat {
    0%, 100% { 
      transform: translateY(0px);
      filter: blur(2px);
    }
    50% { 
      transform: translateY(-10px);
      filter: blur(1px);
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: center !important;
    justify-items: center !important;
    text-align: center !important;

    h1,
    h2,
    h3 {
      padding-left: 0 !important;
    }
  }

  /* Enhanced typography with animations */
  h1 {
    animation: fadeInUp 1s ease-out 0.2s both;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  h2 {
    animation: fadeInUp 1s ease-out 0.4s both;
  }

  h3 {
    animation: fadeInUp 1s ease-out 0.6s both;
  }

  p {
    animation: fadeInUp 1s ease-out 0.8s both;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  color: ${({ theme }) => theme.colors.textSecondary};

  h1 {
    color: ${({ theme }) => theme.colors.text};
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.colors.text} 0%, 
      ${({ theme }) => theme.colors.primaryHighlight} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  h2,
  h3,
  h4 {
    color: ${({ theme }) => theme.colors.primary};
  }
`