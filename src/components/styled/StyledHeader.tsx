import styled from 'styled-components'

export const StyledHeader = styled.header<{ $scrolled?: boolean }>`
  --border-width: 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  padding: 8px 16px;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  overflow: hidden;

  ${({ $scrolled, theme }) => $scrolled ? `
    background: ${theme.colors.glass.surface};
    backdrop-filter: blur(24px) saturate(200%);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  ` : `
    background: transparent;
  `}

  /* Enhanced gradient border for scrolled state */
  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    inset: 0;
    background: ${({ $scrolled, theme }) => $scrolled ? 
      `linear-gradient(135deg, 
        ${theme.colors.glass.borderTop}, 
        ${theme.colors.glass.borderBottom}) border-box` : 
      'transparent'};
    mask: ${({ $scrolled }) => $scrolled ? 
      `linear-gradient(black, black) border-box,
       linear-gradient(black, black) padding-box;
       mask-composite: subtract;` : 
      'none'};
    border: ${({ $scrolled }) => $scrolled ? 'var(--border-width) solid transparent' : 'none'};
    border-top: none;
    opacity: ${({ $scrolled }) => $scrolled ? '1' : '0'};
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
    animation: ${({ $scrolled }) => $scrolled ? 'headerGlow 4s ease-in-out infinite' : 'none'};
  }

  /* Floating shimmer effect when scrolled */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: ${({ $scrolled }) => $scrolled ? '-100%' : '0'};
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.1), 
      transparent);
    transition: left 3s ease-in-out;
    pointer-events: none;
    opacity: ${({ $scrolled }) => $scrolled ? '1' : '0'};
    animation: ${({ $scrolled }) => $scrolled ? 'headerShimmer 6s ease-in-out infinite' : 'none'};
  }

  @keyframes headerGlow {
    0%, 100% {
      filter: brightness(1) saturate(200%);
    }
    50% {
      filter: brightness(1.2) saturate(250%);
    }
  }

  @keyframes headerShimmer {
    0%, 100% {
      left: -100%;
    }
    50% {
      left: 100%;
    }
  }
`