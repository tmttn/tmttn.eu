import styled from 'styled-components'

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
  z-index: 10000;
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
  z-index: 10000;
`