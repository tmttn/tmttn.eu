import styled from 'styled-components'

export const StyledSectionContent = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 2rem 0;
  
  &::before {
    content: '';
    position: absolute;
    top: -1rem;
    left: 5vw;
    right: 5vw;
    bottom: -1rem;
    background: ${({ theme }) => theme.colors.glass.surface};
    backdrop-filter: blur(12px) saturate(150%);
    border-radius: 24px;
    border: 1px solid ${({ theme }) => theme.colors.glass.border};
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    pointer-events: none;
    z-index: -1;
    animation: contentGlow 8s ease-in-out infinite;
  }

  @keyframes contentGlow {
    0%, 100% {
      box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2),
        0 0 0 rgba(59, 130, 246, 0);
    }
    50% {
      box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.3),
        0 0 40px rgba(59, 130, 246, 0.1);
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: center !important;
    flex-direction: column !important;
    
    &::before {
      left: 2vw;
      right: 2vw;
    }

    div {
      margin: 0px 32px !important;
    }
  }

  div:nth-of-type(1) {
    margin-left: 7vw;
    position: relative;
    z-index: 1;
    
    /* Enhanced image styling for Next.js Image */
    img, 
    span[style*="box-sizing: border-box"] {
      border-radius: 20px;
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.3),
        0 0 0 1px rgba(255, 255, 255, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      display: block;
      
      &:hover {
        transform: translateY(-8px) scale(1.02) rotate(1deg);
        box-shadow: 
          0 30px 60px rgba(0, 0, 0, 0.4),
          0 0 0 1px rgba(255, 255, 255, 0.2),
          0 0 80px rgba(59, 130, 246, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.3);
      }
    }

    /* Gradient overlay on hover */
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, 
        rgba(59, 130, 246, 0.1) 0%, 
        transparent 50%, 
        rgba(139, 92, 246, 0.1) 100%);
      border-radius: 20px;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    
    &:hover::after {
      opacity: 1;
    }

    /* Add floating animation to image */
    animation: profileFloat 6s ease-in-out infinite;
    
    @keyframes profileFloat {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }
  }

  div:nth-of-type(2) {
    margin-left: 16px;
    margin-right: 32px;
    position: relative;
    z-index: 1;
    
    p {
      animation: fadeInUp 1s ease-out 1s both;
      position: relative;
      padding: 1.5rem;
      background: ${({ theme }) => theme.colors.glass.surface};
      backdrop-filter: blur(12px) saturate(150%);
      border-radius: 16px;
      border: 1px solid ${({ theme }) => theme.colors.glass.border};
      margin-bottom: 1.5rem;
      color: ${({ theme }) => theme.colors.textSecondary};
      
      &:nth-child(2) {
        animation-delay: 1.2s;
      }

      a {
        color: ${({ theme }) => theme.colors.primary};
        font-weight: 500;
        text-decoration: none;
        background-image: linear-gradient(
          to right,
          ${({ theme }) => theme.colors.primary} 0%,
          ${({ theme }) => theme.colors.primaryHighlight} 100%
        );
        background-size: 0% 2px;
        background-position: 0 100%;
        background-repeat: no-repeat;
        transition: all 0.3s ease;
        
        &:hover {
          background-size: 100% 2px;
          color: ${({ theme }) => theme.colors.primaryHighlight};
          text-shadow: 0 0 10px ${({ theme }) => theme.colors.primary}33;
        }
      }
    }
  }
`