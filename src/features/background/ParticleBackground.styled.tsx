import styled from 'styled-components'
import { Z_INDEX } from '../../styles/zIndex'

export const ParticleCanvas = styled.canvas<{ $isDark: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${Z_INDEX.BACKGROUND.PARTICLES};
  pointer-events: none;
  opacity: ${({ $isDark }) => $isDark ? 0.7 : 0.4};
  mix-blend-mode: ${({ $isDark }) => $isDark ? 'screen' : 'multiply'};
  
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`