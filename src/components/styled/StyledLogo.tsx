import styled from 'styled-components'

export const StyledLogo = styled.img<{ $scrolled?: boolean }>`
  width: ${({ $scrolled }) => $scrolled ? '50px' : '100px'};
  height: auto;
  padding: 8px;
  margin: 0;
  transition: width ${({ theme }) => theme.transitions.transform};

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 60px !important;
    transition: width ${({ theme }) => theme.transitions.transform};
  }
`