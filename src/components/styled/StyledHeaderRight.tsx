import styled from 'styled-components'

export const StyledHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 0.5rem;
  }
`