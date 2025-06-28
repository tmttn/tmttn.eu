import styled from 'styled-components'

export const StyledNav = styled.nav`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 0.5rem;
    font-family: 'Inter', system-ui, sans-serif;

    li {
      margin: 0;

      a,
      a:visited,
      a:hover,
      a:active,
      a:focus {
        --border-width: 1px;
        position: relative;
        display: block;
        color: ${({ theme }) => theme.colors.textSecondary};
        padding: 0.75rem 1.25rem;
        background: ${({ theme }) => theme.colors.glass.surface};
        backdrop-filter: blur(8px) saturate(130%);
        border-radius: 14px;
        background-image: none;
        font-weight: 500;
        font-size: 0.9rem;
        letter-spacing: -0.01em;
        text-decoration: none;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
        will-change: transform;

        /* Enhanced gradient border with mask technique */
        &::before {
          content: "";
          position: absolute;
          z-index: -1;
          inset: 0;
          border-radius: inherit;
          border: var(--border-width) solid transparent;
          background: linear-gradient(135deg, 
            ${({ theme }) => theme.colors.glass.borderTop}, 
            ${({ theme }) => theme.colors.glass.borderBottom}) border-box;
          mask: linear-gradient(black, black) border-box,
            linear-gradient(black, black) padding-box;
          mask-composite: subtract;
          animation: navBorderFloat 3s ease-in-out infinite;
        }

        /* Enhanced shimmer effect */
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.15), 
            transparent);
          transition: left 0.6s ease;
          pointer-events: none;
        }

        @keyframes navBorderFloat {
          0%, 100% {
            opacity: 0.8;
            filter: brightness(1);
          }
          50% {
            opacity: 1;
            filter: brightness(1.3);
          }
        }

        &:hover {
          color: ${({ theme }) => theme.colors.text};
          background: ${({ theme }) => theme.colors.glass.surfaceHover};
          transform: translateY(-2px) scale(1.01);
          backdrop-filter: blur(10px) saturate(150%);
          box-shadow: 
            0 8px 20px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.18);

          &::before {
            background: linear-gradient(135deg, 
              ${({ theme }) => theme.colors.primary}40, 
              ${({ theme }) => theme.colors.primaryHighlight}40, 
              ${({ theme }) => theme.colors.primary}20) border-box;
            animation: navBorderHover 2s ease-in-out infinite;
          }

          &::after {
            left: 100%;
          }
        }

        @keyframes navBorderHover {
          0%, 100% {
            filter: brightness(1.3) saturate(150%);
          }
          50% {
            filter: brightness(1.6) saturate(200%);
          }
        }

        &.current {
          color: ${({ theme }) => theme.colors.primary};
          background: ${({ theme }) => theme.colors.glass.surfaceHover};
          font-weight: 600;
          backdrop-filter: blur(10px) saturate(160%);
          box-shadow: 
            0 4px 16px ${({ theme }) => theme.colors.primary}30,
            0 0 0 1px rgba(255, 255, 255, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);

          &::before {
            background: linear-gradient(135deg, 
              ${({ theme }) => theme.colors.primary}60, 
              ${({ theme }) => theme.colors.primaryHighlight}50, 
              ${({ theme }) => theme.colors.primary}40) border-box;
            animation: navCurrentGlow 3s ease-in-out infinite;
          }
        }

        @keyframes navCurrentGlow {
          0%, 100% {
            filter: brightness(1.4) saturate(180%);
            opacity: 0.9;
          }
          50% {
            filter: brightness(1.8) saturate(220%);
            opacity: 1;
          }
        }
      }
    }

    hr {
      display: none;
    }

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      flex-direction: column;
      gap: 0.25rem;
      
      li a {
        padding: 0.6rem 1rem;
        font-size: 0.85rem;
      }
    }
  }
`