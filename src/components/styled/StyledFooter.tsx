import styled from 'styled-components'

export const StyledFooter = styled.footer`
  position: relative;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  backdrop-filter: blur(20px) saturate(180%);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 4rem 7vw 2rem;
  margin-top: 0;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 40%);
    animation: footerFloat 20s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes footerFloat {
    0%, 100% { 
      transform: scale(1) rotate(0deg);
      opacity: 0.8;
    }
    50% { 
      transform: scale(1.1) rotate(1deg);
      opacity: 1;
    }
  }

  .footer-content {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 3rem;
    margin-bottom: 2rem;

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      grid-template-columns: 1fr;
      gap: 2rem;
      text-align: center;
    }
  }

  .footer-section {
    h3 {
      color: ${({ theme }) => theme.colors.text};
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      padding-left: 0;
      background: linear-gradient(135deg, 
        ${({ theme }) => theme.colors.text} 0%, 
        ${({ theme }) => theme.colors.primaryHighlight} 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 2px 10px ${({ theme }) => theme.colors.primary}33;
    }

    p, li {
      color: ${({ theme }) => theme.colors.textSecondary};
      line-height: 1.6;
      margin-bottom: 0.8rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    a {
      color: ${({ theme }) => theme.colors.textMuted};
      text-decoration: none;
      transition: all 0.3s ease;
      background-image: none;
      
      &:hover {
        color: ${({ theme }) => theme.colors.text};
        text-shadow: 0 0 10px ${({ theme }) => theme.colors.primary}66;
        transform: translateX(5px);
      }
    }
  }

  .footer-social {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      justify-content: center;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: ${({ theme }) => theme.colors.glass.surface};
      border: 1px solid ${({ theme }) => theme.colors.glass.border};
      border-radius: 50%;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(12px) saturate(150%);

      &:hover {
        background: ${({ theme }) => theme.colors.glass.surfaceHover};
        border-color: ${({ theme }) => theme.colors.primary};
        transform: translateY(-2px) scale(1.1);
        box-shadow: 0 8px 25px ${({ theme }) => theme.colors.primary}33;
      }

      svg {
        font-size: 1.2rem;
        color: ${({ theme }) => theme.colors.textSecondary};
      }

      &:hover svg {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }

  .footer-bottom {
    position: relative;
    z-index: 1;
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.9rem;

    .footer-heart {
      color: ${({ theme }) => theme.colors.secondary};
      animation: heartbeat 2s ease-in-out infinite;
    }

    @keyframes heartbeat {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
  }
`