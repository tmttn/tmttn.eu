import styled from 'styled-components'
import { StyledSection } from './StyledSection'

export const StyledWelcomeSection = styled(StyledSection)`
  justify-content: center;
  padding-top: 0;
  position: relative;
  overflow: hidden;

  &::before {
    background: ${({ theme }) => theme.isDark ? `
      radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 70% 70%, rgba(16, 185, 129, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 60%),
      linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(26, 26, 46, 0.9) 100%)
    ` : `
      radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 40%),
      radial-gradient(circle at 70% 70%, rgba(16, 185, 129, 0.08) 0%, transparent 40%),
      radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.05) 0%, transparent 60%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.95) 100%)
    `};
    animation: welcomeFloat 30s ease-in-out infinite;
  }

  @keyframes welcomeFloat {
    0%, 100% { 
      transform: scale(1) rotate(0deg);
      filter: blur(2px) brightness(1);
    }
    33% { 
      transform: scale(1.02) rotate(0.5deg);
      filter: blur(1px) brightness(1.1);
    }
    66% { 
      transform: scale(0.98) rotate(-0.5deg);
      filter: blur(1.5px) brightness(0.9);
    }
  }

  h1 {
    margin: 0;
    font-size: 12vw;
    background: ${({ theme }) => theme.isDark ? `
      linear-gradient(135deg, 
        #ffffff 0%, 
        #e0e7ff 25%, 
        #c7d2fe 50%, 
        #a5b4fc 75%, 
        #8b5cf6 100%)
    ` : `
      linear-gradient(135deg, 
        #1f2937 0%, 
        #3b82f6 25%, 
        #1d4ed8 50%, 
        #7c3aed 75%, 
        #e11d48 100%)
    `};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: ${({ theme }) => theme.isDark 
      ? '0 8px 32px rgba(59, 130, 246, 0.3)' 
      : '0 8px 32px rgba(59, 130, 246, 0.2)'};
    filter: ${({ theme }) => theme.isDark 
      ? 'drop-shadow(0 4px 20px rgba(59, 130, 246, 0.4))' 
      : 'drop-shadow(0 4px 20px rgba(59, 130, 246, 0.2))'};
    animation: titleGlow 3s ease-in-out infinite alternate;
    
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 16vw;
    }
  }

  @keyframes titleGlow {
    from {
      filter: ${({ theme }) => theme.isDark 
        ? 'drop-shadow(0 4px 20px rgba(59, 130, 246, 0.4))' 
        : 'drop-shadow(0 4px 20px rgba(59, 130, 246, 0.2))'};
    }
    to {
      filter: ${({ theme }) => theme.isDark 
        ? 'drop-shadow(0 8px 40px rgba(139, 92, 246, 0.6))' 
        : 'drop-shadow(0 8px 40px rgba(139, 92, 246, 0.3))'};
    }
  }

  h2 {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-shadow: ${({ theme }) => theme.isDark 
      ? '0 2px 10px rgba(0, 0, 0, 0.5)' 
      : '0 2px 10px rgba(255, 255, 255, 0.8)'};
    animation: subtitleFloat 4s ease-in-out infinite;
    
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 2rem;
    }
  }

  @keyframes subtitleFloat {
    0%, 100% {
      transform: translateY(0px);
      opacity: 0.8;
    }
    50% {
      transform: translateY(-5px);
      opacity: 1;
    }
  }

  h3 {
    margin: 0;
  }
`