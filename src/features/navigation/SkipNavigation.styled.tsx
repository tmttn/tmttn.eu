import styled from 'styled-components'
import { Z_INDEX } from '../../styles/zIndex'

export const SkipLink = styled.a`
  position: absolute;
  top: -100px;
  left: 8px;
  background: ${({ theme }) => theme.isDark ? '#1f2937' : '#1f2937'};
  color: ${({ theme }) => theme.isDark ? '#ffffff' : '#ffffff'};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  z-index: ${Z_INDEX.INTERFACE.SKIP_LINK};
  transition: top 0.1s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);

  &:focus {
    top: 8px;
    outline: 3px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
    background: ${({ theme }) => theme.isDark ? '#111827' : '#111827'};
  }

  &:hover {
    background: ${({ theme }) => theme.isDark ? '#111827' : '#111827'};
    border-color: ${({ theme }) => theme.colors.primaryHighlight};
  }
`

export const SkipContainer = styled.div`
  position: relative;
  z-index: ${Z_INDEX.INTERFACE.SKIP_LINK};
`