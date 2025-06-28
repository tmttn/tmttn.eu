import styled from 'styled-components'

export const StyledIconBar = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 2rem;
  padding: 0 7vw;
  max-width: 800px;
  margin: 0 auto;
  
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1.5rem;
    padding: 0 4vw;
  }

  a,
  a:visited,
  a:hover,
  a:active,
  a:focus {
    background-image: none;
  }
`