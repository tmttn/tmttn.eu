import styled from 'styled-components'
import { Z_INDEX } from '../../styles/zIndex'

export const SkipLink = styled.a`
  position: absolute;
  top: -100px;
  left: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  z-index: ${Z_INDEX.INTERFACE.SKIP_LINK};
  transition: top 0.2s ease;

  &:focus {
    top: 8px;
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHighlight};
  }
`

export const SkipContainer = styled.div`
  position: relative;
  z-index: ${Z_INDEX.INTERFACE.SKIP_LINK};
`