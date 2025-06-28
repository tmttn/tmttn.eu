import styled from 'styled-components'
import { StyledSection } from './StyledSection'

export const StyledContactSection = styled(StyledSection)`
  h1 {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.colors.primary} 0%, 
      ${({ theme }) => theme.colors.secondary} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 2.5rem;
    }
  }

  h2 {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 1.5rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.textSecondary};
    letter-spacing: 0.02em;
    
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 1.3rem;
      margin-bottom: 2rem;
      padding: 0 2rem;
    }
  }
`