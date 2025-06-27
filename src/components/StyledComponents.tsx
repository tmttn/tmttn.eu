import styled from 'styled-components'

export const StyledHeader = styled.header<{ $scrolled?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  top: 0;
  padding: 8px;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ $scrolled }) => $scrolled ? `
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  ` : `
    background: transparent;
  `}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      rgba(255, 255, 255, 0.05) 50%, 
      rgba(255, 255, 255, 0.1) 100%);
    opacity: ${({ $scrolled }) => $scrolled ? '1' : '0'};
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
`

export const StyledLogo = styled.img<{ $scrolled?: boolean }>`
  width: ${({ $scrolled }) => $scrolled ? '50px' : '100px'};
  padding: 8px;
  margin: 0;
  transition: width ${({ theme }) => theme.transitions.transform};

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 60px !important;
    transition: width ${({ theme }) => theme.transitions.transform};
  }
`

export const StyledNav = styled.nav`
  padding: 8px;

  ul {
    list-style: none;
    margin: 0;
    display: flex;
    font-family: 'Inter', system-ui, sans-serif;

    li {
      margin: 0;

      a,
      a:visited,
      a:hover,
      a:active,
      a:focus {
        color: ${({ theme }) => theme.colors.secondary};
        margin: 8px;
        padding-bottom: 4px;
        background-image: none;
        font-weight: 500;
        font-size: 0.95rem;
        letter-spacing: -0.01em;
        transition: all ${({ theme }) => theme.transitions.default};

        &.current {
          border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
          font-weight: 600;
        }

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
`

export const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
`

export const StyledSection = styled.section<{ $variant?: 'odd' | 'even' }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 9vw;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ $variant }) => $variant === 'odd' 
      ? `
        radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
        linear-gradient(135deg, rgba(15, 15, 35, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%)
      ` : `
        radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 70% 30%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
        linear-gradient(135deg, rgba(255, 252, 232, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)
      `};
    backdrop-filter: blur(2px);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ $variant }) => $variant === 'odd' 
      ? 'rgba(0, 0, 0, 0.3)' 
      : 'rgba(255, 255, 255, 0.1)'};
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.6s ease;
  }

  /* Floating particles effect */
  &:nth-child(odd)::before {
    animation: sectionFloat 25s ease-in-out infinite;
  }

  &:nth-child(even)::before {
    animation: sectionFloat 20s ease-in-out infinite reverse;
  }

  @keyframes sectionFloat {
    0%, 100% { 
      transform: translateY(0px);
      filter: blur(2px);
    }
    50% { 
      transform: translateY(-10px);
      filter: blur(1px);
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: center !important;
    justify-items: center !important;
    text-align: center !important;

    h1,
    h2,
    h3 {
      padding-left: 0 !important;
    }
  }

  /* Enhanced typography with animations */
  h1 {
    animation: fadeInUp 1s ease-out 0.2s both;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  h2 {
    animation: fadeInUp 1s ease-out 0.4s both;
  }

  h3 {
    animation: fadeInUp 1s ease-out 0.6s both;
  }

  p {
    animation: fadeInUp 1s ease-out 0.8s both;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${({ $variant, theme }) => $variant === 'odd' && `
    color: ${theme.colors.primary};

    h1 {
      color: ${theme.colors.white};
      background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    h2,
    h3,
    h4 {
      color: ${theme.colors.primary};
    }
  `}

  ${({ $variant, theme }) => $variant === 'even' && `
    color: ${theme.colors.black};

    h1,
    h2,
    h3,
    h4 {
      color: ${theme.colors.secondary};
    }
  `}
`

export const StyledWelcomeSection = styled(StyledSection)`
  justify-content: center;
  padding-top: 0;
  position: relative;
  overflow: hidden;

  &::before {
    background: 
      radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 70% 70%, rgba(16, 185, 129, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 60%),
      linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(26, 26, 46, 0.9) 100%);
    animation: welcomeFloat 30s ease-in-out infinite;
  }

  @keyframes welcomeFloat {
    0%, 100% { 
      transform: scale(1) rotate(0deg);
      filter: blur(2px) brightness(1);
    }
    33% { 
      transform: scale(1.02) rotate(0.5deg);
      filter: blur(1px) brightness(1.1);
    }
    66% { 
      transform: scale(0.98) rotate(-0.5deg);
      filter: blur(1.5px) brightness(0.9);
    }
  }

  h1 {
    margin: 0;
    font-size: 12vw;
    background: linear-gradient(135deg, 
      #ffffff 0%, 
      #e0e7ff 25%, 
      #c7d2fe 50%, 
      #a5b4fc 75%, 
      #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
    filter: drop-shadow(0 4px 20px rgba(59, 130, 246, 0.4));
    animation: titleGlow 3s ease-in-out infinite alternate;
    
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 16vw;
    }
  }

  @keyframes titleGlow {
    from {
      filter: drop-shadow(0 4px 20px rgba(59, 130, 246, 0.4));
    }
    to {
      filter: drop-shadow(0 8px 40px rgba(139, 92, 246, 0.6));
    }
  }

  h2 {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.8);
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    animation: subtitleFloat 4s ease-in-out infinite;
    
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 2rem;
    }
  }

  @keyframes subtitleFloat {
    0%, 100% {
      transform: translateY(0px);
      opacity: 0.8;
    }
    50% {
      transform: translateY(-5px);
      opacity: 1;
    }
  }

  h3 {
    margin: 0;
  }
`

export const StyledSectionContent = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 2rem 0;
  
  &::before {
    content: '';
    position: absolute;
    top: -1rem;
    left: 5vw;
    right: 5vw;
    bottom: -1rem;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px) saturate(120%);
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    pointer-events: none;
    z-index: -1;
    animation: contentGlow 8s ease-in-out infinite;
  }

  @keyframes contentGlow {
    0%, 100% {
      box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2),
        0 0 0 rgba(59, 130, 246, 0);
    }
    50% {
      box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.3),
        0 0 40px rgba(59, 130, 246, 0.1);
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: center !important;
    flex-direction: column !important;
    
    &::before {
      left: 2vw;
      right: 2vw;
    }

    div {
      margin: 0px 32px !important;
    }
  }

  div:nth-of-type(1) {
    margin-left: 7vw;
    position: relative;
    z-index: 1;
    
    /* Enhanced image styling */
    img {
      border-radius: 20px;
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.3),
        0 0 0 1px rgba(255, 255, 255, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      display: block;
      
      &:hover {
        transform: translateY(-8px) scale(1.02) rotate(1deg);
        box-shadow: 
          0 30px 60px rgba(0, 0, 0, 0.4),
          0 0 0 1px rgba(255, 255, 255, 0.2),
          0 0 80px rgba(59, 130, 246, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.3);
      }
    }

    /* Gradient overlay on hover */
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, 
        rgba(59, 130, 246, 0.1) 0%, 
        transparent 50%, 
        rgba(139, 92, 246, 0.1) 100%);
      border-radius: 20px;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    
    &:hover::after {
      opacity: 1;
    }

    /* Add floating animation to image */
    animation: profileFloat 6s ease-in-out infinite;
    
    @keyframes profileFloat {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }
  }

  div:nth-of-type(2) {
    margin-left: 16px;
    margin-right: 32px;
    position: relative;
    z-index: 1;
    
    p {
      animation: fadeInUp 1s ease-out 1s both;
      position: relative;
      padding: 1.5rem;
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(5px);
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      margin-bottom: 1.5rem;
      transition: all 0.3s ease;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, 
          rgba(255, 255, 255, 0.1) 0%, 
          transparent 50%, 
          rgba(255, 255, 255, 0.05) 100%);
        border-radius: 16px;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      }
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        border-color: rgba(255, 255, 255, 0.15);
        
        &::before {
          opacity: 1;
        }
      }
      
      &:nth-child(2) {
        animation-delay: 1.2s;
      }

      a {
        color: #60a5fa;
        font-weight: 500;
        text-decoration: none;
        background-image: linear-gradient(
          to right,
          #60a5fa 0%,
          #3b82f6 100%
        );
        background-size: 0% 2px;
        background-position: 0 100%;
        background-repeat: no-repeat;
        transition: all 0.3s ease;
        
        &:hover {
          background-size: 100% 2px;
          color: #3b82f6;
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
        }
      }
    }
  }
`

export const StyledContactSection = styled(StyledSection)`
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      ${({ $variant }) => $variant === 'odd' 
        ? 'rgba(59, 130, 246, 0.03)' 
        : 'rgba(139, 92, 246, 0.03)'} 0%,
      ${({ $variant }) => $variant === 'odd' 
        ? 'rgba(16, 185, 129, 0.03)' 
        : 'rgba(236, 72, 153, 0.03)'} 100%);
    pointer-events: none;
  }

  h1 {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, 
      ${({ $variant }) => $variant === 'odd' 
        ? '#3b82f6, #10b981' 
        : '#8b5cf6, #ec4899'});
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
    opacity: 0.8;
    letter-spacing: 0.02em;
    
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 1.3rem;
      margin-bottom: 2rem;
      padding: 0 2rem;
    }
  }
`

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

export const StyledIcon = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.1), 
      transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
    
    &::before {
      left: 100%;
    }
  }

  svg, span {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.secondary};
    transition: all 0.3s ease;
    margin-bottom: 0.5rem;
  }

  &:hover svg,
  &:hover span {
    color: ${({ theme }) => theme.colors.primary};
    filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.3));
  }

  &::after {
    content: attr(aria-label);
    font-size: 0.9rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.black};
    opacity: 0.7;
    transition: opacity 0.3s ease;
    text-align: center;
    letter-spacing: 0.02em;
  }

  &:hover::after {
    opacity: 1;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.2rem;
    border-radius: 16px;
    
    svg, span {
      font-size: 2.5rem;
    }
    
    &::after {
      font-size: 0.8rem;
    }
  }
`

export const StyledFooter = styled.footer`
  position: relative;
  background: linear-gradient(135deg, 
    rgba(15, 15, 35, 0.95) 0%, 
    rgba(26, 26, 46, 0.95) 50%,
    rgba(22, 33, 62, 0.95) 100%);
  backdrop-filter: blur(20px) saturate(180%);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 4rem 7vw 2rem;
  margin-top: 0;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 40%);
    animation: footerFloat 20s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes footerFloat {
    0%, 100% { 
      transform: scale(1) rotate(0deg);
      opacity: 0.8;
    }
    50% { 
      transform: scale(1.1) rotate(1deg);
      opacity: 1;
    }
  }

  .footer-content {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 3rem;
    margin-bottom: 2rem;

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      grid-template-columns: 1fr;
      gap: 2rem;
      text-align: center;
    }
  }

  .footer-section {
    h3 {
      color: #ffffff;
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      padding-left: 0;
      background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
    }

    p, li {
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.6;
      margin-bottom: 0.8rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: all 0.3s ease;
      background-image: none;
      
      &:hover {
        color: #ffffff;
        text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        transform: translateX(5px);
      }
    }
  }

  .footer-social {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      justify-content: center;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(10px);

      &:hover {
        background: rgba(59, 130, 246, 0.2);
        border-color: rgba(59, 130, 246, 0.4);
        transform: translateY(-2px) scale(1.1);
        box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
      }

      svg {
        font-size: 1.2rem;
      }
    }
  }

  .footer-bottom {
    position: relative;
    z-index: 1;
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;

    .footer-heart {
      color: #ff6b6b;
      animation: heartbeat 2s ease-in-out infinite;
    }

    @keyframes heartbeat {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
  }
`

export const StyledPortfolio = styled.div<{ $variant?: 'odd' | 'even' }>`
  padding: 0 7vw;
  position: relative;

  .portfolio-loading,
  .portfolio-error,
  .portfolio-empty {
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;

    svg {
      margin-right: 0.5rem;
    }
  }

  .portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin: 2rem 0;

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      margin: 1rem 0;
    }
  }

  .portfolio-footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid ${({ $variant }) => 
      $variant === 'even' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};

    .github-profile-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      background: ${({ $variant }) => 
        $variant === 'even' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'};
      border: 1px solid ${({ $variant }) => 
        $variant === 'even' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 500;
      transition: all ${({ theme }) => theme.transitions.default};
      background-image: none;

      &:hover {
        background: ${({ $variant }) => 
          $variant === 'even' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
        transform: translateY(-2px);
      }

      svg {
        font-size: 1.2rem;
      }
    }
  }
`

export const StyledRepoCard = styled.div<{ $variant?: 'odd' | 'even' }>`
  background: ${({ $variant }) => 
    $variant === 'even' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${({ $variant }) => 
    $variant === 'even' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  padding: 1.5rem;
  transition: all ${({ theme }) => theme.transitions.default};
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ $variant }) => 
      $variant === 'even' ? '0 12px 24px rgba(0, 0, 0, 0.1)' : '0 12px 24px rgba(0, 0, 0, 0.3)'};
    border-color: ${({ $variant, theme }) => 
      $variant === 'even' ? theme.colors.secondary : theme.colors.primary};
  }

  .repo-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;

    h3 {
      margin: 0;
      padding: 0;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 1.3rem;
      font-weight: 600;
      letter-spacing: -0.01em;

      a {
        background-image: none;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }

    .repo-link {
      background-image: none;
      opacity: 0.7;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 1;
      }
    }
  }

  .repo-description {
    margin: 0 0 1rem 0;
    padding: 0;
    opacity: 0.9;
    line-height: 1.5;
    max-width: none;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.95rem;
    letter-spacing: -0.005em;
  }

  .repo-topics {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;

    .topic-tag {
      background: ${({ $variant }) => 
        $variant === 'even' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
      border: 1px solid ${({ $variant }) => 
        $variant === 'even' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
      border-radius: 16px;
      padding: 0.25rem 0.75rem;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: lowercase;
      letter-spacing: -0.005em;
    }
  }

  .repo-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    opacity: 0.8;
    letter-spacing: -0.005em;

    .repo-meta {
      display: flex;
      gap: 1rem;
      align-items: center;

      .repo-language {
        display: flex;
        align-items: center;
        gap: 0.4rem;

        .language-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
      }

      .repo-stars,
      .repo-forks {
        display: flex;
        align-items: center;
        gap: 0.3rem;

        svg {
          width: 14px;
          height: 14px;
        }
      }
    }

    .repo-updated {
      font-size: 0.8rem;
      opacity: 0.7;
    }
  }
`