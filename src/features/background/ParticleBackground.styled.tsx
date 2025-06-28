import styled from 'styled-components'

export const ParticleCanvas = styled.canvas<{ $isDark: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  opacity: ${({ $isDark }) => $isDark ? 0.7 : 0.4};
  mix-blend-mode: ${({ $isDark }) => $isDark ? 'screen' : 'multiply'};
  
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`